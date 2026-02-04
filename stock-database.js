// 股票資料庫 - 統一管理所有股票資訊
// 可同時用於 Node.js (generate-stock.js) 和瀏覽器 (stock/index.html)
// 資料來源：docs/sp500-config.ts (S&P 500 / VTI 成分股)

const stockDatabase = {
  // ========== NYSE 股票 ==========

  // 金融
  'BRK.B': { exchange: 'NYSE', name: 'Berkshire Hathaway Inc.' },
  'JPM': { exchange: 'NYSE', name: 'JPMorgan Chase & Co.' },
  'V': { exchange: 'NYSE', name: 'Visa Inc.' },
  'MA': { exchange: 'NYSE', name: 'Mastercard Incorporated' },
  'BAC': { exchange: 'NYSE', name: 'Bank of America Corp.' },
  'WFC': { exchange: 'NYSE', name: 'Wells Fargo & Company' },
  'GS': { exchange: 'NYSE', name: 'Goldman Sachs Group Inc.' },
  'MS': { exchange: 'NYSE', name: 'Morgan Stanley' },
  'C': { exchange: 'NYSE', name: 'Citigroup Inc.' },
  'SCHW': { exchange: 'NYSE', name: 'Charles Schwab Corp.' },
  'BLK': { exchange: 'NYSE', name: 'BlackRock Inc.' },
  'AXP': { exchange: 'NYSE', name: 'American Express Co.' },
  'COF': { exchange: 'NYSE', name: 'Capital One Financial Corp.' },
  'PNC': { exchange: 'NYSE', name: 'PNC Financial Services Group Inc.' },
  'USB': { exchange: 'NYSE', name: 'US Bancorp' },
  'TFC': { exchange: 'NYSE', name: 'Truist Financial Corp.' },
  'BK': { exchange: 'NYSE', name: 'Bank of New York Mellon Corp.' },
  'BX': { exchange: 'NYSE', name: 'Blackstone Inc.' },
  'KKR': { exchange: 'NYSE', name: 'KKR & Co. Inc.' },
  'ICE': { exchange: 'NYSE', name: 'Intercontinental Exchange Inc.' },
  'SPGI': { exchange: 'NYSE', name: 'S&P Global Inc.' },
  'MCO': { exchange: 'NYSE', name: "Moody's Corp." },
  'MMC': { exchange: 'NYSE', name: 'Marsh & McLennan Cos. Inc.' },
  'AON': { exchange: 'NYSE', name: 'Aon plc' },
  'AJG': { exchange: 'NYSE', name: 'Arthur J Gallagher & Co.' },
  'CB': { exchange: 'NYSE', name: 'Chubb Ltd.' },
  'PGR': { exchange: 'NYSE', name: 'Progressive Corp.' },
  'ALL': { exchange: 'NYSE', name: 'Allstate Corp.' },
  'AFL': { exchange: 'NYSE', name: 'Aflac Inc.' },
  'TRV': { exchange: 'NYSE', name: 'Travelers Cos. Inc.' },

  // 科技與企業服務
  'ORCL': { exchange: 'NYSE', name: 'Oracle Corporation' },
  'IBM': { exchange: 'NYSE', name: 'IBM Corp.' },
  'CRM': { exchange: 'NYSE', name: 'Salesforce Inc.' },
  'NOW': { exchange: 'NYSE', name: 'ServiceNow Inc.' },
  'ACN': { exchange: 'NYSE', name: 'Accenture plc' },
  'UBER': { exchange: 'NYSE', name: 'Uber Technologies Inc.' },
  'SNOW': { exchange: 'NYSE', name: 'Snowflake Inc.' },
  'RBLX': { exchange: 'NYSE', name: 'Roblox Corporation' },
  'NET': { exchange: 'NYSE', name: 'Cloudflare Inc.' },
  'ANET': { exchange: 'NYSE', name: 'Arista Networks Inc.' },
  'APH': { exchange: 'NYSE', name: 'Amphenol Corp.' },
  'TEL': { exchange: 'NYSE', name: 'TE Connectivity plc' },
  'GLW': { exchange: 'NYSE', name: 'Corning Inc.' },
  'MSI': { exchange: 'NYSE', name: 'Motorola Solutions Inc.' },

  // 醫療健康
  'LLY': { exchange: 'NYSE', name: 'Eli Lilly and Company' },
  'ABBV': { exchange: 'NYSE', name: 'AbbVie Inc.' },
  'TMO': { exchange: 'NYSE', name: 'Thermo Fisher Scientific Inc.' },
  'DHR': { exchange: 'NYSE', name: 'Danaher Corporation' },
  'ABT': { exchange: 'NYSE', name: 'Abbott Laboratories' },
  'BSX': { exchange: 'NYSE', name: 'Boston Scientific Corporation' },
  'PFE': { exchange: 'NYSE', name: 'Pfizer Inc.' },
  'BMY': { exchange: 'NYSE', name: 'Bristol-Myers Squibb Company' },
  'ZTS': { exchange: 'NYSE', name: 'Zoetis Inc.' },
  'JNJ': { exchange: 'NYSE', name: 'Johnson & Johnson' },
  'MRK': { exchange: 'NYSE', name: 'Merck & Co. Inc.' },
  'SYK': { exchange: 'NYSE', name: 'Stryker Corporation' },
  'MDT': { exchange: 'NYSE', name: 'Medtronic plc' },
  'BDX': { exchange: 'NYSE', name: 'Becton Dickinson & Co.' },
  'CI': { exchange: 'NYSE', name: 'Cigna Group' },
  'ELV': { exchange: 'NYSE', name: 'Elevance Health Inc.' },
  'UNH': { exchange: 'NYSE', name: 'UnitedHealth Group Inc.' },
  'HCA': { exchange: 'NYSE', name: 'HCA Healthcare Inc.' },
  'CVS': { exchange: 'NYSE', name: 'CVS Health Corp.' },
  'MCK': { exchange: 'NYSE', name: 'McKesson Corp.' },
  'COR': { exchange: 'NYSE', name: 'Cencora Inc.' },

  // 零售與消費
  'HD': { exchange: 'NYSE', name: 'Home Depot Inc.' },
  'TJX': { exchange: 'NYSE', name: 'TJX Companies Inc.' },
  'AZO': { exchange: 'NYSE', name: 'AutoZone Inc.' },
  'LOW': { exchange: 'NYSE', name: "Lowe's Companies Inc." },
  'KR': { exchange: 'NYSE', name: 'Kroger Co.' },
  'TGT': { exchange: 'NYSE', name: 'Target Corporation' },
  'DG': { exchange: 'NYSE', name: 'Dollar General Corp.' },
  'MCD': { exchange: 'NYSE', name: "McDonald's Corporation" },
  'DIS': { exchange: 'NYSE', name: 'Walt Disney Company' },
  'RCL': { exchange: 'NYSE', name: 'Royal Caribbean Cruises Ltd.' },
  'HLT': { exchange: 'NYSE', name: 'Hilton Worldwide Holdings Inc.' },
  'CMG': { exchange: 'NYSE', name: 'Chipotle Mexican Grill Inc.' },
  'LYV': { exchange: 'NYSE', name: 'Live Nation Entertainment Inc.' },
  'YUM': { exchange: 'NYSE', name: 'Yum! Brands Inc.' },
  'CCL': { exchange: 'NYSE', name: 'Carnival Corporation' },
  'LVS': { exchange: 'NYSE', name: 'Las Vegas Sands Corp.' },
  'NKE': { exchange: 'NYSE', name: 'Nike Inc.' },
  'TKO': { exchange: 'NYSE', name: 'TKO Group Holdings Inc.' },

  // 工業與製造
  'CAT': { exchange: 'NYSE', name: 'Caterpillar Inc.' },
  'DE': { exchange: 'NYSE', name: 'Deere & Company' },
  'MMM': { exchange: 'NYSE', name: '3M Company' },
  'ITW': { exchange: 'NYSE', name: 'Illinois Tool Works Inc.' },
  'JCI': { exchange: 'NYSE', name: 'Johnson Controls International plc' },
  'GEV': { exchange: 'NYSE', name: 'GE Vernova Inc.' },
  'GE': { exchange: 'NYSE', name: 'General Electric Co.' },
  'PH': { exchange: 'NYSE', name: 'Parker-Hannifin Corporation' },
  'CMI': { exchange: 'NYSE', name: 'Cummins Inc.' },
  'ETN': { exchange: 'NYSE', name: 'Eaton Corporation plc' },
  'TT': { exchange: 'NYSE', name: 'Trane Technologies plc' },
  'AME': { exchange: 'NYSE', name: 'AMETEK Inc.' },
  'ROK': { exchange: 'NYSE', name: 'Rockwell Automation Inc.' },
  'XYL': { exchange: 'NYSE', name: 'Xylem Inc.' },
  'WAB': { exchange: 'NYSE', name: 'Westinghouse Air Brake Technologies Corp.' },
  'CARR': { exchange: 'NYSE', name: 'Carrier Global Corporation' },
  'EMR': { exchange: 'NYSE', name: 'Emerson Electric Co.' },
  'ECL': { exchange: 'NYSE', name: 'Ecolab Inc.' },
  'SHW': { exchange: 'NYSE', name: 'Sherwin-Williams Co.' },
  'APD': { exchange: 'NYSE', name: 'Air Products & Chemicals Inc.' },
  'CRH': { exchange: 'NYSE', name: 'CRH plc' },

  // 航太國防
  'BA': { exchange: 'NYSE', name: 'The Boeing Company' },
  'RTX': { exchange: 'NYSE', name: 'Raytheon Technologies Corp.' },
  'LMT': { exchange: 'NYSE', name: 'Lockheed Martin Corp.' },
  'NOC': { exchange: 'NYSE', name: 'Northrop Grumman Corp.' },
  'GD': { exchange: 'NYSE', name: 'General Dynamics Corp.' },
  'LHX': { exchange: 'NYSE', name: 'L3Harris Technologies Inc.' },
  'TDG': { exchange: 'NYSE', name: 'TransDigm Group Inc.' },
  'HWM': { exchange: 'NYSE', name: 'Howmet Aerospace Inc.' },

  // 能源
  'XOM': { exchange: 'NYSE', name: 'Exxon Mobil Corporation' },
  'CVX': { exchange: 'NYSE', name: 'Chevron Corp.' },
  'COP': { exchange: 'NYSE', name: 'ConocoPhillips' },
  'EOG': { exchange: 'NYSE', name: 'EOG Resources Inc.' },
  'PSX': { exchange: 'NYSE', name: 'Phillips 66' },
  'MPC': { exchange: 'NYSE', name: 'Marathon Petroleum Corp.' },
  'WMB': { exchange: 'NYSE', name: 'Williams Cos. Inc.' },
  'KMI': { exchange: 'NYSE', name: 'Kinder Morgan Inc.' },
  'FCX': { exchange: 'NYSE', name: 'Freeport-McMoRan Inc.' },
  'NEM': { exchange: 'NYSE', name: 'Newmont Corp.' },

  // 公用事業
  'NEE': { exchange: 'NYSE', name: 'NextEra Energy Inc.' },
  'DUK': { exchange: 'NYSE', name: 'Duke Energy Corp.' },
  'SO': { exchange: 'NYSE', name: 'Southern Co.' },
  'SRE': { exchange: 'NYSE', name: 'Sempra' },
  'VST': { exchange: 'NYSE', name: 'Vistra Corp.' },

  // 不動產
  'PLD': { exchange: 'NYSE', name: 'Prologis Inc.' },
  'AMT': { exchange: 'NYSE', name: 'American Tower Corp.' },
  'WELL': { exchange: 'NYSE', name: 'Welltower Inc.' },
  'SPG': { exchange: 'NYSE', name: 'Simon Property Group Inc.' },
  'DLR': { exchange: 'NYSE', name: 'Digital Realty Trust Inc.' },
  'O': { exchange: 'NYSE', name: 'Realty Income Corp.' },

  // 交通運輸
  'UNP': { exchange: 'NYSE', name: 'Union Pacific Corp.' },
  'NSC': { exchange: 'NYSE', name: 'Norfolk Southern Corp.' },
  'UPS': { exchange: 'NYSE', name: 'United Parcel Service Inc.' },
  'FDX': { exchange: 'NYSE', name: 'FedEx Corp.' },
  'URI': { exchange: 'NYSE', name: 'United Rentals Inc.' },
  'PWR': { exchange: 'NYSE', name: 'Quanta Services Inc.' },

  // 消費品
  'PG': { exchange: 'NYSE', name: 'Procter & Gamble Co.' },
  'KO': { exchange: 'NYSE', name: 'Coca-Cola Co.' },
  'PM': { exchange: 'NYSE', name: 'Philip Morris International Inc.' },
  'MO': { exchange: 'NYSE', name: 'Altria Group Inc.' },
  'CL': { exchange: 'NYSE', name: 'Colgate-Palmolive Co.' },
  'GM': { exchange: 'NYSE', name: 'General Motors Co.' },
  'F': { exchange: 'NYSE', name: 'Ford Motor Co.' },
  'WM': { exchange: 'NYSE', name: 'Waste Management Inc.' },

  // 電信
  'T': { exchange: 'NYSE', name: 'AT&T Inc.' },
  'VZ': { exchange: 'NYSE', name: 'Verizon Communications Inc.' },

  // 國際股票
  'TSM': { exchange: 'NYSE', name: 'Taiwan Semiconductor Manufacturing' },
  'BABA': { exchange: 'NYSE', name: 'Alibaba Group Holding Limited' },
  'NIO': { exchange: 'NYSE', name: 'NIO Inc.' },
  'XPEV': { exchange: 'NYSE', name: 'XPeng Inc.' },

  // ========== NASDAQ 股票 ==========

  // 科技巨頭
  'NVDA': { exchange: 'NASDAQ', name: 'NVIDIA Corporation' },
  'MSFT': { exchange: 'NASDAQ', name: 'Microsoft Corporation' },
  'AAPL': { exchange: 'NASDAQ', name: 'Apple Inc.' },
  'AMZN': { exchange: 'NASDAQ', name: 'Amazon.com Inc.' },
  'GOOGL': { exchange: 'NASDAQ', name: 'Alphabet Inc. Class A' },
  'GOOG': { exchange: 'NASDAQ', name: 'Alphabet Inc. Class C' },
  'META': { exchange: 'NASDAQ', name: 'Meta Platforms Inc.' },
  'TSLA': { exchange: 'NASDAQ', name: 'Tesla Inc.' },
  'AVGO': { exchange: 'NASDAQ', name: 'Broadcom Inc.' },
  'NFLX': { exchange: 'NASDAQ', name: 'Netflix Inc.' },

  // 半導體
  'AMD': { exchange: 'NASDAQ', name: 'Advanced Micro Devices Inc.' },
  'INTC': { exchange: 'NASDAQ', name: 'Intel Corp.' },
  'QCOM': { exchange: 'NASDAQ', name: 'QUALCOMM Inc.' },
  'MU': { exchange: 'NASDAQ', name: 'Micron Technology Inc.' },
  'AMAT': { exchange: 'NASDAQ', name: 'Applied Materials Inc.' },
  'LRCX': { exchange: 'NASDAQ', name: 'Lam Research Corporation' },
  'KLAC': { exchange: 'NASDAQ', name: 'KLA Corp.' },
  'ADI': { exchange: 'NASDAQ', name: 'Analog Devices Inc.' },
  'TXN': { exchange: 'NASDAQ', name: 'Texas Instruments Inc.' },
  'MRVL': { exchange: 'NASDAQ', name: 'Marvell Technology Inc.' },

  // 軟體與服務
  'PLTR': { exchange: 'NASDAQ', name: 'Palantir Technologies Inc.' },
  'ADBE': { exchange: 'NASDAQ', name: 'Adobe Inc.' },
  'INTU': { exchange: 'NASDAQ', name: 'Intuit Inc.' },
  'PANW': { exchange: 'NASDAQ', name: 'Palo Alto Networks Inc.' },
  'CRWD': { exchange: 'NASDAQ', name: 'CrowdStrike Holdings Inc.' },
  'FTNT': { exchange: 'NASDAQ', name: 'Fortinet Inc.' },
  'ADSK': { exchange: 'NASDAQ', name: 'Autodesk Inc.' },
  'CDNS': { exchange: 'NASDAQ', name: 'Cadence Design Systems Inc.' },
  'SNPS': { exchange: 'NASDAQ', name: 'Synopsys Inc.' },
  'CSCO': { exchange: 'NASDAQ', name: 'Cisco Systems Inc.' },
  'ADP': { exchange: 'NASDAQ', name: 'Automatic Data Processing Inc.' },
  'FISV': { exchange: 'NASDAQ', name: 'Fiserv Inc.' },
  'PYPL': { exchange: 'NASDAQ', name: 'PayPal Holdings Inc.' },

  // 電商與網路
  'BKNG': { exchange: 'NASDAQ', name: 'Booking Holdings Inc.' },
  'ABNB': { exchange: 'NASDAQ', name: 'Airbnb Inc.' },
  'EBAY': { exchange: 'NASDAQ', name: 'eBay Inc.' },
  'EXPE': { exchange: 'NASDAQ', name: 'Expedia Group Inc.' },
  'DASH': { exchange: 'NASDAQ', name: 'DoorDash Inc.' },
  'CPRT': { exchange: 'NASDAQ', name: 'Copart Inc.' },

  // 零售
  'WMT': { exchange: 'NASDAQ', name: 'Walmart Inc.' },
  'COST': { exchange: 'NASDAQ', name: 'Costco Wholesale Corp.' },
  'ORLY': { exchange: 'NASDAQ', name: "O'Reilly Automotive Inc." },
  'ROST': { exchange: 'NASDAQ', name: 'Ross Stores Inc.' },

  // 醫療健康
  'ISRG': { exchange: 'NASDAQ', name: 'Intuitive Surgical Inc.' },
  'AMGN': { exchange: 'NASDAQ', name: 'Amgen Inc.' },
  'REGN': { exchange: 'NASDAQ', name: 'Regeneron Pharmaceuticals Inc.' },
  'GILD': { exchange: 'NASDAQ', name: 'Gilead Sciences Inc.' },
  'VRTX': { exchange: 'NASDAQ', name: 'Vertex Pharmaceuticals Inc.' },
  'IDXX': { exchange: 'NASDAQ', name: 'IDEXX Laboratories Inc.' },
  'ALNY': { exchange: 'NASDAQ', name: 'Alnylam Pharmaceuticals Inc.' },

  // 消費與媒體
  'SBUX': { exchange: 'NASDAQ', name: 'Starbucks Corporation' },
  'MAR': { exchange: 'NASDAQ', name: 'Marriott International Inc.' },
  'CMCSA': { exchange: 'NASDAQ', name: 'Comcast Corporation' },
  'CHTR': { exchange: 'NASDAQ', name: 'Charter Communications Inc.' },
  'FOX': { exchange: 'NASDAQ', name: 'Fox Corporation' },
  'FOXA': { exchange: 'NASDAQ', name: 'Fox Corporation Class A' },
  'WBD': { exchange: 'NASDAQ', name: 'Warner Bros. Discovery Inc.' },
  'EA': { exchange: 'NASDAQ', name: 'Electronic Arts Inc.' },

  // 工業
  'PCAR': { exchange: 'NASDAQ', name: 'PACCAR Inc.' },
  'CTAS': { exchange: 'NASDAQ', name: 'Cintas Corporation' },
  'FAST': { exchange: 'NASDAQ', name: 'Fastenal Co.' },
  'CSX': { exchange: 'NASDAQ', name: 'CSX Corp.' },
  'HON': { exchange: 'NASDAQ', name: 'Honeywell International Inc.' },
  'LIN': { exchange: 'NASDAQ', name: 'Linde plc' },

  // 金融科技與加密
  'COIN': { exchange: 'NASDAQ', name: 'Coinbase Global Inc.' },
  'HOOD': { exchange: 'NASDAQ', name: 'Robinhood Markets Inc.' },
  'MSTR': { exchange: 'NASDAQ', name: 'MicroStrategy Inc.' },

  // 電信
  'TMUS': { exchange: 'NASDAQ', name: 'T-Mobile US Inc.' },

  // 消費品
  'PEP': { exchange: 'NASDAQ', name: 'PepsiCo Inc.' },
  'MDLZ': { exchange: 'NASDAQ', name: 'Mondelez International Inc.' },

  // 公用事業
  'AEP': { exchange: 'NASDAQ', name: 'American Electric Power Co. Inc.' },
  'CEG': { exchange: 'NASDAQ', name: 'Constellation Energy Corp.' },

  // 不動產
  'EQIX': { exchange: 'NASDAQ', name: 'Equinix Inc.' },

  // 其他科技
  'APP': { exchange: 'NASDAQ', name: 'AppLovin Corp.' },
  'VRT': { exchange: 'NYSE', name: 'Vertiv Holdings Co.' },
  'CME': { exchange: 'NASDAQ', name: 'CME Group Inc.' },

  // ========== AMEX ETF ==========
  'SPY': { exchange: 'AMEX', name: 'SPDR S&P 500 ETF Trust' },
  'VOO': { exchange: 'AMEX', name: 'Vanguard S&P 500 ETF' },
  'IVV': { exchange: 'AMEX', name: 'iShares Core S&P 500 ETF' },
  'SPLG': { exchange: 'AMEX', name: 'SPDR Portfolio S&P 500 ETF' },
  'SPYG': { exchange: 'AMEX', name: 'SPDR Portfolio S&P 500 Growth ETF' },
  'SPYV': { exchange: 'AMEX', name: 'SPDR Portfolio S&P 500 Value ETF' },
};

// ========== 匯出 (支援 Node.js 和瀏覽器) ==========
if (typeof module !== 'undefined' && module.exports) {
  // Node.js 環境
  module.exports = { stockDatabase };
} else if (typeof window !== 'undefined') {
  // 瀏覽器環境
  window.stockDatabase = stockDatabase;
}
