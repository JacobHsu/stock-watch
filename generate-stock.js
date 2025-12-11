#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// 股票模板
const stockTemplate = `<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{SYMBOL}} Stock Technical Analysis</title>
    <link rel="icon" type="image/{{ICON_EXT}}" href="../icons/{{SYMBOL_LOWER}}.{{ICON_EXT}}">
    <link rel="stylesheet" href="../styles.css" />

    <script>
      // 載入超時檢查和錯誤處理
      let tvTimeout = setTimeout(() => {
        if (typeof TradingView === "undefined") {
          document.querySelectorAll('[id^="tradingview_"]').forEach((el) => {
            el.innerHTML =
              '<div class="fallback-content"><p>圖表暫時無法載入</p><button onclick="location.reload()">重新載入</button></div>';
          });
        }
      }, 10000);

      window.addEventListener("load", () => clearTimeout(tvTimeout));
    </script>

    <!-- 使用 defer 載入腳本,加上錯誤處理 -->
    <script
      defer
      src="https://s3.tradingview.com/tv.js"
      onerror="document.querySelectorAll('[id^=tradingview_]').forEach(el => el.innerHTML='<div class=fallback-content><p>圖表載入失敗</p><button onclick=location.reload()>重新載入</button></div>')"
    ></script>
    <script defer src="../chart-config.js"></script>
  </head>
  <body>
    <div class="charts-grid-3x4" data-symbol="{{EXCHANGE}}:{{SYMBOL}}" data-prefix="{{SYMBOL_LOWER}}">
      <!-- 第一行 - 1小時 -->
      <div id="tradingview_{{SYMBOL_LOWER}}_1h_col1"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_1h_col2"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_1h_col3"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_1h_col4"></div>

      <!-- 第二行 - 4小時 -->
      <div id="tradingview_{{SYMBOL_LOWER}}_4h_col1"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_4h_col2"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_4h_col3"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_4h_col4"></div>

      <!-- 第三行 - 1天 -->
      <div id="tradingview_{{SYMBOL_LOWER}}_1d_col1"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_1d_col2"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_1d_col3"></div>
      <div id="tradingview_{{SYMBOL_LOWER}}_1d_col4"></div>
    </div>

    <script>
      // 顯示載入狀態
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll('[id^="tradingview_"]').forEach((el) => {
          el.innerHTML = '<div class="loading-placeholder"></div>';
        });
      });
    </script>
  </body>
</html>
`;

// 完整的股票資料庫 (包含交易所和域名)
const stockDatabase = {
  // 科技股 - NASDAQ
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

  // 傳統科技與企業 - NYSE
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

  // 金融 - NYSE
  'V': { exchange: 'NYSE', domain: 'visa.com', name: 'Visa Inc.' },
  'MA': { exchange: 'NYSE', domain: 'mastercard.com', name: 'Mastercard Incorporated' },
  'SQ': { exchange: 'NYSE', domain: 'squareup.com', name: 'Block Inc.' },

  // 國際股票 - NYSE
  'TSM': { exchange: 'NYSE', domain: 'tsmc.com', name: 'Taiwan Semiconductor Manufacturing' },
  'BABA': { exchange: 'NYSE', domain: 'alibaba.com', name: 'Alibaba Group Holding Limited' },
  'NIO': { exchange: 'NYSE', domain: 'nio.com', name: 'NIO Inc.' },
  'XPEV': { exchange: 'NYSE', domain: 'xiaopeng.com', name: 'XPeng Inc.' },

  // 傳統產業 - NYSE
  'WMT': { exchange: 'NYSE', domain: 'walmart.com', name: 'Walmart Inc.' },
  'TGT': { exchange: 'NYSE', domain: 'target.com', name: 'Target Corporation' },
  'PFE': { exchange: 'NYSE', domain: 'pfizer.com', name: 'Pfizer Inc.' },
  'JNJ': { exchange: 'NYSE', domain: 'jnj.com', name: 'Johnson & Johnson' },
  'ABBV': { exchange: 'NYSE', domain: 'abbvie.com', name: 'AbbVie Inc.' },
  'DIS': { exchange: 'NYSE', domain: 'disney.com', name: 'The Walt Disney Company' },
  'T': { exchange: 'NYSE', domain: 'att.com', name: 'AT&T Inc.' },
  'VZ': { exchange: 'NYSE', domain: 'verizon.com', name: 'Verizon Communications Inc.' }
};

// Logo 來源配置 (按優先順序)
const logoSources = [
  (symbol) => `https://img.brandfetch.io/${getCompanyDomain(symbol)}`,
  (symbol) => `https://img.logo.dev/${getCompanyDomain(symbol)}`,
  (symbol) => `https://logo.clearbit.com/${getCompanyDomain(symbol)}`,
  (symbol) => `https://favicone.com/${getCompanyDomain(symbol)}`,
];

// 獲取股票完整資訊
function getStockInfo(symbol) {
  const symbolUpper = symbol.toUpperCase();
  return stockDatabase[symbolUpper] || {
    exchange: 'NASDAQ',
    domain: `${symbol.toLowerCase()}.com`,
    name: `${symbolUpper} Corporation`
  };
}

function getCompanyDomain(symbol) {
  const stockInfo = getStockInfo(symbol);
  return stockInfo.domain;
}

// 下載 Logo 的函數
async function downloadLogo(symbol, force = false) {
  const symbolLower = symbol.toLowerCase();
  const iconPath = path.join(__dirname, 'icons', `${symbolLower}.png`);
  
  // 如果 icon 已存在且不強制更新，跳過
  if (fs.existsSync(iconPath) && !force) {
    console.log(`📁 Icon 已存在: icons/${symbolLower}.png`);
    return true;
  }
  
  // 確保 icons 目錄存在
  const iconsDir = path.join(__dirname, 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  console.log(`🔍 正在搜尋 ${symbol} 的 Logo...`);
  
  // 嘗試各個 Logo 來源
  for (let i = 0; i < logoSources.length; i++) {
    const logoUrl = logoSources[i](symbol);
    console.log(`   嘗試來源 ${i + 1}: ${logoUrl}`);
    
    try {
      const success = await downloadFromUrl(logoUrl, iconPath);
      if (success) {
        console.log(`✅ Logo 下載成功: icons/${symbolLower}.png`);
        return true;
      }
    } catch (error) {
      console.log(`   ❌ 來源 ${i + 1} 失敗: ${error.message}`);
    }
  }
  
  // 所有來源都失敗，創建佔位符
  console.log(`⚠️  無法下載 ${symbol} 的 Logo，創建佔位符`);
  createPlaceholderIcon(symbolLower, iconPath);
  return false;
}

// 從 URL 下載檔案
function downloadFromUrl(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    const request = https.get(url, (response) => {
      // 檢查回應狀態
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      // 檢查內容類型
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.startsWith('image/')) {
        reject(new Error(`不是圖片格式: ${contentType}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        // 檢查檔案大小
        const stats = fs.statSync(filePath);
        if (stats.size < 100) {
          fs.unlinkSync(filePath);
          reject(new Error('檔案太小，可能是錯誤頁面'));
        } else {
          resolve(true);
        }
      });
    });
    
    request.on('error', (error) => {
      fs.unlink(filePath, () => {}); // 刪除部分下載的檔案
      reject(error);
    });
    
    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error('下載超時'));
    });
  });
}

// 創建佔位符 icon (SVG 格式)
function createPlaceholderIcon(symbolLower, iconPath) {
  const symbol = symbolLower.toUpperCase();
  const svgContent = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="#1a1a1a" rx="8"/>
  <text x="32" y="40" font-family="Arial, sans-serif" font-size="18" font-weight="bold" 
        text-anchor="middle" fill="#ffffff">${symbol}</text>
</svg>`;
  
  // 將 .png 改為 .svg
  const svgPath = iconPath.replace('.png', '.svg');
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  console.log(`📝 已創建佔位符: icons/${symbolLower}.svg`);
}

async function generateStock(symbol, exchange = null, downloadIcon = true) {
  const symbolLower = symbol.toLowerCase();
  const symbolUpper = symbol.toUpperCase();
  
  // 如果沒有指定交易所，從資料庫獲取
  const stockInfo = getStockInfo(symbol);
  const finalExchange = exchange || stockInfo.exchange;
  
  console.log(`\n🚀 正在生成 ${symbolUpper} 股票頁面...`);
  console.log(`📊 公司名稱: ${stockInfo.name}`);
  console.log(`🏛️  交易所: ${finalExchange}`);
  
  // 1. 下載 Logo (如果需要)
  if (downloadIcon) {
    await downloadLogo(symbol);
  }
  
  // 2. 檢查 icon 檔案存在性並決定副檔名
  const iconDir = path.join(__dirname, 'icons');
  let iconExtension = 'png';
  
  if (fs.existsSync(path.join(iconDir, `${symbolLower}.svg`))) {
    iconExtension = 'svg';
  } else if (!fs.existsSync(path.join(iconDir, `${symbolLower}.png`))) {
    console.log(`⚠️  找不到 ${symbolLower} 的 icon 檔案`);
  }
  
  // 3. 替換模板中的變數
  let content = stockTemplate
    .replace(/{{SYMBOL}}/g, symbolUpper)
    .replace(/{{SYMBOL_LOWER}}/g, symbolLower)
    .replace(/{{EXCHANGE}}/g, finalExchange)
    .replace(/{{ICON_EXT}}/g, iconExtension);
  
  // 4. 確保 stock 目錄存在
  const stockDir = path.join(__dirname, 'stock');
  if (!fs.existsSync(stockDir)) {
    fs.mkdirSync(stockDir, { recursive: true });
  }
  
  // 5. 寫入檔案
  const filePath = path.join(stockDir, `${symbolLower}.html`);
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log(`✅ 已生成: stock/${symbolLower}.html`);
  console.log(`📊 股票代碼: ${finalExchange}:${symbolUpper}`);
  console.log(`🔗 URL: stock/${symbolLower}.html`);
  console.log(`🎨 Icon: icons/${symbolLower}.${iconExtension}`);
  
  return filePath;
}

// 批量生成股票頁面
async function generateMultipleStocks(stocks, downloadIcons = true) {
  console.log(`🚀 開始生成 ${stocks.length} 個股票頁面...\n`);
  
  for (let i = 0; i < stocks.length; i++) {
    const stock = stocks[i];
    const { symbol, exchange = null } = typeof stock === 'string' 
      ? { symbol: stock } 
      : stock;
    
    console.log(`[${i + 1}/${stocks.length}]`);
    await generateStock(symbol, exchange, downloadIcons);
    
    // 避免請求過於頻繁
    if (downloadIcons && i < stocks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n🎉 所有股票頁面生成完成！');
}

// 命令行使用
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📈 股票頁面生成器 (含 Logo 自動下載)

使用方式:
  node generate-stock.js ORCL                    # 自動使用正確交易所 (NYSE)
  node generate-stock.js ORCL NASDAQ             # 強制指定交易所 (覆蓋預設)
  node generate-stock.js ORCL,MSFT,AMZN         # 批量生成 (自動交易所)
  node generate-stock.js ORCL --no-icon         # 跳過 Logo 下載

參數:
  --no-icon    跳過 Logo 下載，使用現有 icon 或創建佔位符
  --force      強制重新下載 Logo (覆蓋現有檔案)

範例:
  node generate-stock.js ORCL                   # 自動使用 NYSE
  node generate-stock.js TSM                    # 自動使用 NYSE  
  node generate-stock.js AAPL                   # 自動使用 NASDAQ
  node generate-stock.js "ORCL:NASDAQ,TSM:NYSE" # 強制指定交易所
  node generate-stock.js ORCL --no-icon
  node generate-stock.js MSFT --force
    `);
    process.exit(1);
  }
  
  const input = args[0];
  const flags = args.slice(1);
  const downloadIcons = !flags.includes('--no-icon');
  const force = flags.includes('--force');
  
  // 解析交易所 (如果不是 flag)
  const exchange = flags.find(f => !f.startsWith('--')) || null;
  
  async function run() {
    if (input.includes(',')) {
      // 批量處理
      const stocks = input.split(',').map(item => {
        const [symbol, ex] = item.trim().split(':');
        return { symbol, exchange: ex || exchange };
      });
      await generateMultipleStocks(stocks, downloadIcons);
    } else {
      // 單個處理
      await generateStock(input, exchange, downloadIcons);
    }
  }
  
  run().catch(console.error);
}

module.exports = { generateStock, generateMultipleStocks };