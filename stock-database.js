// 股票資料庫 - 統一管理所有股票資訊
// 可同時用於 Node.js (generate-stock.js) 和瀏覽器 (stock/index.html)

const stockDatabase = {
  // ========== 科技股 - NASDAQ ==========
  'AAPL': { exchange: 'NASDAQ', name: 'Apple Inc.' },
  'GOOG': { exchange: 'NASDAQ', name: 'Alphabet Inc.' },
  'GOOGL': { exchange: 'NASDAQ', name: 'Alphabet Inc.' },
  'META': { exchange: 'NASDAQ', name: 'Meta Platforms Inc.' },
  'NVDA': { exchange: 'NASDAQ', name: 'NVIDIA Corporation' },
  'TSLA': { exchange: 'NASDAQ', name: 'Tesla Inc.' },
  'MSFT': { exchange: 'NASDAQ', name: 'Microsoft Corporation' },
  'AMZN': { exchange: 'NASDAQ', name: 'Amazon.com Inc.' },
  'NFLX': { exchange: 'NASDAQ', name: 'Netflix Inc.' },
  'ADBE': { exchange: 'NASDAQ', name: 'Adobe Inc.' },
  'INTC': { exchange: 'NASDAQ', name: 'Intel Corporation' },
  'AMD': { exchange: 'NASDAQ', name: 'Advanced Micro Devices' },
  'QCOM': { exchange: 'NASDAQ', name: 'QUALCOMM Incorporated' },
  'AVGO': { exchange: 'NASDAQ', name: 'Broadcom Inc.' },
  'CSCO': { exchange: 'NASDAQ', name: 'Cisco Systems Inc.' },
  'PYPL': { exchange: 'NASDAQ', name: 'PayPal Holdings Inc.' },
  'SHOP': { exchange: 'NASDAQ', name: 'Shopify Inc.' },
  'ABNB': { exchange: 'NASDAQ', name: 'Airbnb Inc.' },
  'ZOOM': { exchange: 'NASDAQ', name: 'Zoom Video Communications' },
  'ZM': { exchange: 'NASDAQ', name: 'Zoom Video Communications' },
  'DOCU': { exchange: 'NASDAQ', name: 'DocuSign Inc.' },
  'ROKU': { exchange: 'NASDAQ', name: 'Roku Inc.' },
  'CRWD': { exchange: 'NASDAQ', name: 'CrowdStrike Holdings Inc.' },
  'OKTA': { exchange: 'NASDAQ', name: 'Okta Inc.' },
  'DDOG': { exchange: 'NASDAQ', name: 'Datadog Inc.' },
  'MDB': { exchange: 'NASDAQ', name: 'MongoDB Inc.' },
  'TEAM': { exchange: 'NASDAQ', name: 'Atlassian Corporation' },
  'WDAY': { exchange: 'NASDAQ', name: 'Workday Inc.' },
  'SPLK': { exchange: 'NASDAQ', name: 'Splunk Inc.' },
  'PANW': { exchange: 'NASDAQ', name: 'Palo Alto Networks Inc.' },
  'FTNT': { exchange: 'NASDAQ', name: 'Fortinet Inc.' },
  'TXN': { exchange: 'NASDAQ', name: 'Texas Instruments Incorporated' },
  'LYFT': { exchange: 'NASDAQ', name: 'Lyft Inc.' },
  'COST': { exchange: 'NASDAQ', name: 'Costco Wholesale Corporation' },
  'MRNA': { exchange: 'NASDAQ', name: 'Moderna Inc.' },
  'LI': { exchange: 'NASDAQ', name: 'Li Auto Inc.' },
  'RIVN': { exchange: 'NASDAQ', name: 'Rivian Automotive Inc.' },
  'LCID': { exchange: 'NASDAQ', name: 'Lucid Group Inc.' },
  'CMCSA': { exchange: 'NASDAQ', name: 'Comcast Corporation' },
  'HON': { exchange: 'NASDAQ', name: 'Honeywell International Inc.' },
  'SBUX': { exchange: 'NASDAQ', name: 'Starbucks Corporation' },
  'MU': { exchange: 'NASDAQ', name: 'Micron Technology Inc.' },
  'PAYX': { exchange: 'NASDAQ', name: 'Paychex Inc.' },
  'WBD': { exchange: 'NASDAQ', name: 'Warner Bros. Discovery Inc.' },
  'CEG': { exchange: 'NASDAQ', name: 'Constellation Energy Corporation' },
  'FAST': { exchange: 'NASDAQ', name: 'Fastenal Company' },

  // ========== 傳統科技與企業 - NYSE ==========
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
