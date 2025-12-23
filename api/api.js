/**
 * Umami 统计数据转发器 - Vercel 版
 * 适配 2025 年最新 Node.js ESM 环境
 */

export default async function handler(req, res) {
  // --- 1. 配置信息 ---
  const CONFIG = {
    baseUrl: 'https://umami.zhang-wentao.cn',
    token: 'SoeORJvt3pxNeaiD5cyttdZWAfXNP7SFAB9niQE/HWpOZxUMmK+Nc3pDsG1FODL/kilItut1sysFmvdh5Yp8RJ0NSMeQ+EYiE3OmDXE+xpcDZAYige93byrrqBd+Je0LIibcpE7MsAb/fof7i/xkxjSE/aTOuITIqVs37NkirFgcPQpuJwfcsBR9la3JOgEOiadXwlnoCeMa6BNs/3fPYUelQuCu+WVv31ATa67PE2itHaeQkzBujNPb2UOnwcoO+/hILjQKBKTeU0xaQf6ZY8e0lv36z7hnBMmBa2uh2YxDgvKB3YolpuL0CQ2jlaf2QQvs0tcnYEg8Md+zdqllT1dDoaVTzOd8uucOrzyptTAX8whIA4uDeUu/evCF',
    websiteId: '17d8d22d-5c41-42af-86f0-8475924be01d'
  };

  // --- 2. 跨域头处理 (CORS) ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // 处理浏览器的预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- 3. 时间范围逻辑 ---
  const TIME_CONFIGS = {
    today: () => {
      const now = new Date();
      return {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime(),
        unit: 'hour'
      };
    },
    yesterday: () => {
      const now = new Date();
      return {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime(),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
        unit: 'day'
      };
    },
    lastMonth: () => {
      const now = new Date();
      return {
        start: new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime(),
        end: new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
        unit: 'month'
      };
    },
    total: () => ({
      start: new Date(2000, 0, 1).getTime(),
      end: new Date().getTime(),
      unit: 'year'
    }),
    now: () => {
      const now = new Date();
      return {
        start: now.getTime() - 15 * 60 * 1000, // 最近15分钟
        end: now.getTime(),
        unit: 'hour'
      };
    }
  };

  // --- 4. 内部数据抓取函数 ---
  async function fetchStats(timeRange) {
    const config = TIME_CONFIGS[timeRange]();
    const params = new URLSearchParams({
      startAt: config.start,
      endAt: config.end,
      unit: config.unit
    });
    
    const url = `${CONFIG.baseUrl}/api/websites/${CONFIG.websiteId}/stats?${params.toString()}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET', // Umami 官方 API 始终使用 GET
        headers: {
          'Authorization': `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) return { visits: 0, pageviews: 0 };
      
      const data = await response.json();
      
      // 提取核心指标
      const extractMetric = (key) => {
        // 兼容实时数据判断
        if (timeRange === 'now' && data.comparison?.[key]) {
          return parseInt(data.comparison[key]) || 0;
        }
        // 兼容对象格式和数值格式
        if (data[key] !== undefined && data[key] !== null) {
          return typeof data[key] === 'object' ? (data[key].value || 0) : (parseInt(data[key]) || 0);
        }
        return 0;
      };
      
      return {
        visits: extractMetric('visits'),
        pageviews: extractMetric('pageviews')
      };
    } catch (error) {
      return { visits: 0, pageviews: 0 };
    }
  }

  // --- 5. 执行并发请求并返回 ---
  try {
    const timeRanges = ['today', 'yesterday', 'lastMonth', 'total', 'now'];
    // 2025 标准：使用 Promise.all 并发请求，提高响应速度
    const statsResults = await Promise.all(timeRanges.map(range => fetchStats(range)));
    
    const stats = {
      today: statsResults[0],
      yesterday: statsResults[1],
      lastMonth: statsResults[2],
      total: statsResults[3],
      now: statsResults[4]
    };

    res.status(200).json({
      today_uv: stats.today.visits,
      today_pv: stats.today.pageviews,
      online_users: stats.now.visits,
      yesterday_uv: stats.yesterday.visits,
      yesterday_pv: stats.yesterday.pageviews,
      last_month_pv: stats.lastMonth.pageviews,
      total_uv: stats.total.visits,
      total_pv: stats.total.pageviews,
      update_time: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: '服务器内部错误', message: error.message });
  }
}
