// 股票資料庫 - 統一管理所有股票資訊
// 可同時用於 Node.js (generate-stock.js) 和瀏覽器 (stock/index.html)
//
// 策略：只記錄非 NASDAQ 交易所的股票（主要是 NYSE）
// NASDAQ 股票會自動使用預設值，不需要在此列出

const stockDatabase = {
  // ========== NYSE 股票 ==========
  // 科技與企業
  'ORCL': { exchange: 'NYSE', name: 'Oracle Corporation' },
  'IBM': { exchange: 'NYSE', name: 'International Business Machines' },
  'CRM': { exchange: 'NYSE', name: 'Salesforce Inc.' },
  'NOW': { exchange: 'NYSE', name: 'ServiceNow Inc.' },
  'UBER': { exchange: 'NYSE', name: 'Uber Technologies Inc.' },
  'SNOW': { exchange: 'NYSE', name: 'Snowflake Inc.' },
  'PLTR': { exchange: 'NYSE', name: 'Palantir Technologies Inc.' },
  'RBLX': { exchange: 'NYSE', name: 'Roblox Corporation' },
  'U': { exchange: 'NYSE', name: 'Unity Software Inc.' },
  'SNAP': { exchange: 'NYSE', name: 'Snap Inc.' },
  'PINS': { exchange: 'NYSE', name: 'Pinterest Inc.' },
  'SPOT': { exchange: 'NYSE', name: 'Spotify Technology S.A.' },
  'VEEV': { exchange: 'NYSE', name: 'Veeva Systems Inc.' },
  'NET': { exchange: 'NYSE', name: 'Cloudflare Inc.' },
  'FSLY': { exchange: 'NYSE', name: 'Fastly Inc.' },
  'ESTC': { exchange: 'NYSE', name: 'Elastic N.V.' },

  // ========== 金融 - NYSE ==========
  'V': { exchange: 'NYSE', name: 'Visa Inc.' },
  'MA': { exchange: 'NYSE', name: 'Mastercard Incorporated' },
  'SQ': { exchange: 'NYSE', name: 'Block Inc.' },

  // ========== 國際股票 - NYSE ==========
  'TSM': { exchange: 'NYSE', name: 'Taiwan Semiconductor Manufacturing' },
  'BABA': { exchange: 'NYSE', name: 'Alibaba Group Holding Limited' },
  'NIO': { exchange: 'NYSE', name: 'NIO Inc.' },
  'XPEV': { exchange: 'NYSE', name: 'XPeng Inc.' },

  // ========== 傳統產業 - NYSE ==========
  'BA': { exchange: 'NYSE', name: 'The Boeing Company' },
  'WMT': { exchange: 'NYSE', name: 'Walmart Inc.' },
  'TGT': { exchange: 'NYSE', name: 'Target Corporation' },
  'PFE': { exchange: 'NYSE', name: 'Pfizer Inc.' },
  'JNJ': { exchange: 'NYSE', name: 'Johnson & Johnson' },
  'ABBV': { exchange: 'NYSE', name: 'AbbVie Inc.' },
  'T': { exchange: 'NYSE', name: 'AT&T Inc.' },
  'VZ': { exchange: 'NYSE', name: 'Verizon Communications Inc.' },
  'DIS': { exchange: 'NYSE', name: 'The Walt Disney Company' }
};

// ========== 匯出 (支援 Node.js 和瀏覽器) ==========
if (typeof module !== 'undefined' && module.exports) {
  // Node.js 環境
  module.exports = { stockDatabase };
} else if (typeof window !== 'undefined') {
  // 瀏覽器環境
  window.stockDatabase = stockDatabase;
}
