#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { stockDatabase } = require('./stock-database.js');

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

// 股票資料庫從外部檔案載入 (stock-database.js)
// 在 stock-database.js 中統一管理，方便維護

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

// 從域名提取公司名稱 (如 netflix.com -> netflix)
// 或使用自訂的 logoName（如果有指定）
function getCompanyName(symbol) {
  const stockInfo = getStockInfo(symbol);
  // 優先使用自訂的 logoName
  if (stockInfo.logoName) {
    return stockInfo.logoName;
  }
  // 否則從 domain 提取
  const domain = stockInfo.domain;
  // 移除 .com, .net, .io 等後綴
  return domain.split('.')[0];
}

// Logo 來源配置 (按優先順序)
const logoSources = [
  // TradingView CDN - 最可靠的來源
  (symbol) => `https://s3-symbol-logo.tradingview.com/${getCompanyName(symbol)}.svg`,
  (symbol) => `https://s3-symbol-logo.tradingview.com/${getCompanyName(symbol)}--big.svg`,

  // 備用來源 - 按可靠性排序
  (symbol) => `https://logo.clearbit.com/${getCompanyDomain(symbol)}`,
  (symbol) => `https://img.logo.dev/${getCompanyDomain(symbol)}`,

  // 簡單的 favicon 作為最後選擇
  (symbol) => `https://${getCompanyDomain(symbol)}/favicon.ico`,
];

// 下載 Logo 的函數
async function downloadLogo(symbol, force = false) {
  const symbolLower = symbol.toLowerCase();
  const iconsDir = path.join(__dirname, 'icons');

  // 檢查是否已存在 SVG 或 PNG 格式的 icon
  const svgPath = path.join(iconsDir, `${symbolLower}.svg`);
  const pngPath = path.join(iconsDir, `${symbolLower}.png`);

  if (!force && (fs.existsSync(svgPath) || fs.existsSync(pngPath))) {
    const existingFormat = fs.existsSync(svgPath) ? 'svg' : 'png';
    console.log(`📁 Icon 已存在: icons/${symbolLower}.${existingFormat}`);
    return true;
  }

  // 確保 icons 目錄存在
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log(`🔍 正在搜尋 ${symbol} 的 Logo...`);

  // 嘗試各個 Logo 來源
  for (let i = 0; i < logoSources.length; i++) {
    const logoUrl = logoSources[i](symbol);
    console.log(`   嘗試來源 ${i + 1}: ${logoUrl}`);

    try {
      // 根據 URL 決定文件類型
      const fileExt = logoUrl.endsWith('.svg') ? 'svg' : 'png';
      const iconPath = path.join(iconsDir, `${symbolLower}.${fileExt}`);

      const success = await downloadFromUrl(logoUrl, iconPath);
      if (success) {
        console.log(`✅ Logo 下載成功: icons/${symbolLower}.${fileExt}`);
        return true;
      }
    } catch (error) {
      console.log(`   ❌ 來源 ${i + 1} 失敗: ${error.message}`);
    }
  }

  // 所有來源都失敗，創建佔位符
  console.log(`⚠️  無法下載 ${symbol} 的 Logo，創建佔位符`);
  createPlaceholderIcon(symbolLower, svgPath);
  return false;
}

// 從 URL 下載檔案
function downloadFromUrl(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    const request = https.get(url, (response) => {
      // 檢查回應狀態
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      // 檢查內容類型（放寬限制以支持各種格式）
      const contentType = response.headers['content-type'] || '';
      const validTypes = ['image/', 'text/xml', 'application/octet-stream', 'text/plain'];
      const isValidType = validTypes.some(type => contentType.includes(type));

      if (!isValidType && contentType) {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`不支援的格式: ${contentType}`));
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

async function generateStock(symbol, exchange = null, options = {}) {
  const { downloadIcon = true, generateHtml = false, force = false } = options;
  const symbolLower = symbol.toLowerCase();
  const symbolUpper = symbol.toUpperCase();

  // 如果沒有指定交易所，從資料庫獲取
  const stockInfo = getStockInfo(symbol);
  const finalExchange = exchange || stockInfo.exchange;

  console.log(`\n🚀 正在處理 ${symbolUpper}...`);
  console.log(`📊 公司名稱: ${stockInfo.name}`);
  console.log(`🏛️  交易所: ${finalExchange}`);

  // 1. 下載 Logo (如果需要)
  if (downloadIcon) {
    await downloadLogo(symbol, force);
  }

  // 2. 檢查 icon 檔案存在性並決定副檔名
  const iconDir = path.join(__dirname, 'icons');
  let iconExtension = 'png';

  if (fs.existsSync(path.join(iconDir, `${symbolLower}.svg`))) {
    iconExtension = 'svg';
  } else if (!fs.existsSync(path.join(iconDir, `${symbolLower}.png`))) {
    console.log(`⚠️  找不到 ${symbolLower} 的 icon 檔案`);
  }

  console.log(`🎨 Icon: icons/${symbolLower}.${iconExtension}`);

  // 3. 生成 HTML（僅在指定 --html 時）
  if (generateHtml) {
    // 替換模板中的變數
    let content = stockTemplate
      .replace(/{{SYMBOL}}/g, symbolUpper)
      .replace(/{{SYMBOL_LOWER}}/g, symbolLower)
      .replace(/{{EXCHANGE}}/g, finalExchange)
      .replace(/{{ICON_EXT}}/g, iconExtension);

    // 確保 stock 目錄存在
    const stockDir = path.join(__dirname, 'stock');
    if (!fs.existsSync(stockDir)) {
      fs.mkdirSync(stockDir, { recursive: true });
    }

    // 寫入檔案
    const filePath = path.join(stockDir, `${symbolLower}.html`);
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`✅ 已生成 HTML: stock/${symbolLower}.html`);
    console.log(`🔗 靜態 URL: stock/${symbolLower}.html`);
  } else {
    console.log(`ℹ️  僅下載 icon（使用動態版: stock/?symbol=${symbolUpper}）`);
  }

  return symbolLower;
}

// 批量生成股票頁面
async function generateMultipleStocks(stocks, options = {}) {
  const { downloadIcons = true, generateHtml = false } = options;
  const mode = generateHtml ? 'Icon + HTML' : '僅 Icon';

  console.log(`🚀 開始處理 ${stocks.length} 個股票（模式: ${mode}）...\n`);

  for (let i = 0; i < stocks.length; i++) {
    const stock = stocks[i];
    const { symbol, exchange = null } = typeof stock === 'string'
      ? { symbol: stock }
      : stock;

    console.log(`[${i + 1}/${stocks.length}]`);
    await generateStock(symbol, exchange, { downloadIcons, generateHtml });

    // 避免請求過於頻繁
    if (downloadIcons && i < stocks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n🎉 完成！已處理 ${stocks.length} 個股票`);
  if (generateHtml) {
    console.log(`📄 靜態 HTML: stock/[symbol].html`);
  }
  console.log(`🌐 動態版: stock/?symbol=[SYMBOL]`);
}

// 命令行使用
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📈 股票 Icon 下載器 + HTML 生成器 (改良版)

🎯 預設行為: 只下載 icon（配合動態版使用）

使用方式:
  node generate-stock.js TSM                     # 只下載 icon
  node generate-stock.js TSM --html              # 下載 icon + 生成靜態 HTML
  node generate-stock.js TSM,AAPL,GOOG           # 批量下載 icon
  node generate-stock.js TSM,AAPL,GOOG --html    # 批量下載 icon + 生成 HTML

參數:
  --html       生成靜態 HTML 檔案（預設只下載 icon）
  --no-icon    跳過 icon 下載（僅生成 HTML，需搭配 --html）
  --force      強制重新下載 icon（覆蓋現有檔案）
  NASDAQ/NYSE  強制指定交易所（覆蓋預設）

範例:
  # 新增股票（只要 icon，用動態版）
  node generate-stock.js SBUX
  → 下載 icons/sbux.svg
  → 訪問 stock/?symbol=SBUX

  # 新增股票（需要靜態 HTML）
  node generate-stock.js SBUX --html
  → 下載 icons/sbux.svg
  → 生成 stock/sbux.html

  # 批量新增股票（只要 icon）
  node generate-stock.js SBUX,DIS,NFLX
  → 下載所有 icons
  → 訪問 stock/?symbol=SBUX 等

  # 批量新增股票（包含 HTML）
  node generate-stock.js SBUX,DIS,NFLX --html
  → 下載所有 icons + 生成所有 HTML

  # 強制指定交易所
  node generate-stock.js ORCL NYSE
  node generate-stock.js "ORCL:NASDAQ,TSM:NYSE" --html

💡 提示:
  - 現在有動態版（stock/?symbol=XXX），大多數情況只需要 icon
  - 只有需要靜態頁面時才加 --html 參數
    `);
    process.exit(1);
  }

  const input = args[0];
  const flags = args.slice(1);
  const downloadIcons = !flags.includes('--no-icon');
  const generateHtml = flags.includes('--html');
  const force = flags.includes('--force');

  // 解析交易所 (如果不是 flag)
  const exchange = flags.find(f => !f.startsWith('--')) || null;

  async function run() {
    const options = { downloadIcons, generateHtml, force };

    if (input.includes(',')) {
      // 批量處理
      const stocks = input.split(',').map(item => {
        const [symbol, ex] = item.trim().split(':');
        return { symbol, exchange: ex || exchange };
      });
      await generateMultipleStocks(stocks, options);
    } else {
      // 單個處理
      await generateStock(input, exchange, options);
    }
  }

  run().catch(console.error);
}

module.exports = { generateStock, generateMultipleStocks };