// 股票資料庫 - 統一管理所有股票資訊
// 可同時用於 Node.js (generate-stock.js) 和瀏覽器 (stock/index.html)

const stockDatabase = {
  // ========== 科技股 - NASDAQ ==========
  'AAPL': { exchange: 'NASDAQ', domain: 'apple.com', name: 'Apple Inc.' },
  'GOOG': { exchange: 'NASDAQ', domain: 'google.com', name: 'Alphabet Inc.' },
  'GOOGL': { exchange: 'NASDAQ', domain: 'google.com', name: 'Alphabet Inc.' },
  'META': { exchange: 'NASDAQ', domain: 'meta.com', name: 'Meta Platforms Inc.' },
  'NVDA': { exchange: 'NASDAQ', domain: 'nvidia.com', name: 'NVIDIA Corporation' },
  'TSLA': { exchange: 'NASDAQ', domain: 'tesla.com', name: 'Tesla Inc.' },
  'MSFT': { exchange: 'NASDAQ', domain: 'microsoft.com', name: 'Microsoft Corporation' },
  'AMZN': { exchange: 'NASDAQ', domain: 'amazon.com', name: 'Amazon.com Inc.' },
  'NFLX': { exchange: 'NASDAQ', domain: 'netflix.com', name: 'Netflix Inc.' },
  'ADBE': { exchange: 'NASDAQ', domain: 'adobe.com', name: 'Adobe Inc.' },
  'INTC': { exchange: 'NASDAQ', domain: 'intel.com', name: 'Intel Corporation' },
  'AMD': { exchange: 'NASDAQ', domain: 'amd.com', name: 'Advanced Micro Devices' },
  'QCOM': { exchange: 'NASDAQ', domain: 'qualcomm.com', name: 'QUALCOMM Incorporated' },
  'AVGO': { exchange: 'NASDAQ', domain: 'broadcom.com', name: 'Broadcom Inc.' },
  'CSCO': { exchange: 'NASDAQ', domain: 'cisco.com', name: 'Cisco Systems Inc.' },
  'PYPL': { exchange: 'NASDAQ', domain: 'paypal.com', name: 'PayPal Holdings Inc.' },
  'SHOP': { exchange: 'NASDAQ', domain: 'shopify.com', name: 'Shopify Inc.' },
  'ABNB': { exchange: 'NASDAQ', domain: 'airbnb.com', name: 'Airbnb Inc.' },
  'ZOOM': { exchange: 'NASDAQ', domain: 'zoom.us', name: 'Zoom Video Communications' },
  'ZM': { exchange: 'NASDAQ', domain: 'zoom.us', name: 'Zoom Video Communications' },
  'DOCU': { exchange: 'NASDAQ', domain: 'docusign.com', name: 'DocuSign Inc.' },
  'ROKU': { exchange: 'NASDAQ', domain: 'roku.com', name: 'Roku Inc.' },
  'CRWD': { exchange: 'NASDAQ', domain: 'crowdstrike.com', name: 'CrowdStrike Holdings Inc.' },
  'OKTA': { exchange: 'NASDAQ', domain: 'okta.com', name: 'Okta Inc.' },
  'DDOG': { exchange: 'NASDAQ', domain: 'datadoghq.com', name: 'Datadog Inc.' },
  'MDB': { exchange: 'NASDAQ', domain: 'mongodb.com', name: 'MongoDB Inc.' },
  'TEAM': { exchange: 'NASDAQ', domain: 'atlassian.com', name: 'Atlassian Corporation' },
  'WDAY': { exchange: 'NASDAQ', domain: 'workday.com', name: 'Workday Inc.' },
  'SPLK': { exchange: 'NASDAQ', domain: 'splunk.com', name: 'Splunk Inc.' },
  'PANW': { exchange: 'NASDAQ', domain: 'paloaltonetworks.com', name: 'Palo Alto Networks Inc.' },
  'FTNT': { exchange: 'NASDAQ', domain: 'fortinet.com', name: 'Fortinet Inc.' },
  'TXN': { exchange: 'NASDAQ', domain: 'ti.com', name: 'Texas Instruments Incorporated' },
  'LYFT': { exchange: 'NASDAQ', domain: 'lyft.com', name: 'Lyft Inc.' },
  'COST': { exchange: 'NASDAQ', domain: 'costco.com', name: 'Costco Wholesale Corporation' },
  'MRNA': { exchange: 'NASDAQ', domain: 'modernatx.com', name: 'Moderna Inc.' },
  'LI': { exchange: 'NASDAQ', domain: 'lixiang.com', name: 'Li Auto Inc.' },
  'RIVN': { exchange: 'NASDAQ', domain: 'rivian.com', name: 'Rivian Automotive Inc.' },
  'LCID': { exchange: 'NASDAQ', domain: 'lucidmotors.com', name: 'Lucid Group Inc.' },
  'CMCSA': { exchange: 'NASDAQ', domain: 'comcast.com', name: 'Comcast Corporation' },
  'HON': { exchange: 'NASDAQ', domain: 'honeywell.com', name: 'Honeywell International Inc.' },
  'SBUX': { exchange: 'NASDAQ', domain: 'starbucks.com', name: 'Starbucks Corporation' },
  'MU': { exchange: 'NASDAQ', domain: 'micron.com', name: 'Micron Technology Inc.' },
  'PAYX': { exchange: 'NASDAQ', domain: 'paychex.com', name: 'Paychex Inc.' },
  'WBD': { exchange: 'NASDAQ', domain: 'wbd.com', name: 'Warner Bros. Discovery Inc.' },
  'CEG': { exchange: 'NASDAQ', domain: 'constellationenergy.com', name: 'Constellation Energy Corporation' },

  // ========== 傳統科技與企業 - NYSE ==========
  'ORCL': { exchange: 'NYSE', domain: 'oracle.com', name: 'Oracle Corporation' },
  'IBM': { exchange: 'NYSE', domain: 'ibm.com', name: 'International Business Machines' },
  'CRM': { exchange: 'NYSE', domain: 'salesforce.com', name: 'Salesforce Inc.' },
  'NOW': { exchange: 'NYSE', domain: 'servicenow.com', name: 'ServiceNow Inc.' },
  'UBER': { exchange: 'NYSE', domain: 'uber.com', name: 'Uber Technologies Inc.' },
  'SNOW': { exchange: 'NYSE', domain: 'snowflake.com', name: 'Snowflake Inc.' },
  'PLTR': { exchange: 'NYSE', domain: 'palantir.com', name: 'Palantir Technologies Inc.' },
  'RBLX': { exchange: 'NYSE', domain: 'roblox.com', name: 'Roblox Corporation' },
  'U': { exchange: 'NYSE', domain: 'unity.com', name: 'Unity Software Inc.' },
  'SNAP': { exchange: 'NYSE', domain: 'snap.com', name: 'Snap Inc.' },
  'PINS': { exchange: 'NYSE', domain: 'pinterest.com', name: 'Pinterest Inc.' },
  'SPOT': { exchange: 'NYSE', domain: 'spotify.com', name: 'Spotify Technology S.A.' },
  'VEEV': { exchange: 'NYSE', domain: 'veeva.com', name: 'Veeva Systems Inc.' },
  'NET': { exchange: 'NYSE', domain: 'cloudflare.com', name: 'Cloudflare Inc.' },
  'FSLY': { exchange: 'NYSE', domain: 'fastly.com', name: 'Fastly Inc.' },
  'ESTC': { exchange: 'NYSE', domain: 'elastic.co', name: 'Elastic N.V.' },

  // ========== 金融 - NYSE ==========
  'V': { exchange: 'NYSE', domain: 'visa.com', name: 'Visa Inc.' },
  'MA': { exchange: 'NYSE', domain: 'mastercard.com', name: 'Mastercard Incorporated' },
  'SQ': { exchange: 'NYSE', domain: 'squareup.com', name: 'Block Inc.' },

  // ========== 國際股票 - NYSE ==========
  'TSM': { exchange: 'NYSE', domain: 'tsmc.com', name: 'Taiwan Semiconductor Manufacturing' },
  'BABA': { exchange: 'NYSE', domain: 'alibaba.com', name: 'Alibaba Group Holding Limited' },
  'NIO': { exchange: 'NYSE', domain: 'nio.com', name: 'NIO Inc.' },
  'XPEV': { exchange: 'NYSE', domain: 'xiaopeng.com', name: 'XPeng Inc.' },

  // ========== 傳統產業 - NYSE ==========
  'WMT': { exchange: 'NYSE', domain: 'walmart.com', name: 'Walmart Inc.' },
  'TGT': { exchange: 'NYSE', domain: 'target.com', name: 'Target Corporation' },
  'PFE': { exchange: 'NYSE', domain: 'pfizer.com', name: 'Pfizer Inc.' },
  'JNJ': { exchange: 'NYSE', domain: 'jnj.com', name: 'Johnson & Johnson' },
  'ABBV': { exchange: 'NYSE', domain: 'abbvie.com', name: 'AbbVie Inc.' },
  'T': { exchange: 'NYSE', domain: 'att.com', name: 'AT&T Inc.' },
  'VZ': { exchange: 'NYSE', domain: 'verizon.com', name: 'Verizon Communications Inc.' },
  'DIS': { exchange: 'NYSE', domain: 'disney.com', name: 'The Walt Disney Company', logoName: 'walt-disney' }
};

// ========== 匯出 (支援 Node.js 和瀏覽器) ==========
if (typeof module !== 'undefined' && module.exports) {
  // Node.js 環境
  module.exports = { stockDatabase };
} else if (typeof window !== 'undefined') {
  // 瀏覽器環境
  window.stockDatabase = stockDatabase;
}
