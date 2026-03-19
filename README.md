# Stock Watch - Technical Analysis Dashboard

股票技術分析即時儀表板，支援多個標的，使用 TradingView 圖表展示多時間範圍和多種技術指標組合。

## 🚀 新功能亮點

- **動態頁面**：無需生成 HTML，直接使用 `stock/?s=TSM` 訪問任何股票
- **智能 Icon 管理**：自動檢測 Icon 狀態，顯示可用股票列表
- **集中式資料庫**：`stock-database.js` 統一管理所有股票資訊
- **靈活生成策略**：預設只下載 Icon，需要時才生成靜態 HTML

## 支援的標的

### ETF
- **EWT** (iShares MSCI Taiwan ETF) - `etf/ewt.html`
- **GLD** (SPDR Gold Trust) - `etf/gld.html`
- **QQQ** (Invesco QQQ Trust) - `etf/qqq.html`
- **VT** (Vanguard Total World Stock ETF) - `etf/vt.html`
- **VTI** (Vanguard Total Stock Market ETF) - `etf/vti.html`
- **VXUS** (Vanguard Total International Stock ETF) - `etf/vxus.html`

### 股票 (Stock)
- **AAPL** (Apple Inc.) - `stock/aapl.html`
- **GOOG** (Alphabet Inc.) - `stock/goog.html`
- **META** (Meta Platforms Inc.) - `stock/meta.html`
- **NVDA** (NVIDIA Corporation) - `stock/nvda.html`
- **ORCL** (Oracle Corporation) - `stock/orcl.html`
- **TSLA** (Tesla Inc.) - `stock/tsla.html`
- **TSM** (Taiwan Semiconductor) - `stock/tsm.html`

### 加密貨幣
- **XAUT** (Tether Gold) - `crypto/xaut.html`

## 功能特點

- **多時間範圍分析**：同時顯示 1小時、4小時、1天 三個時間週期
- **月度長線分析**：`stock/m/` 頁面提供 1週、1月、3月 長線視角
- **四組技術指標組合**：
  - **組合 1**：Multi-Time Period Charts、MA Cross、Williams Alligator
  - **組合 2**：Bollinger Bands、Keltner Channels、Supertrend
  - **組合 3**：多條移動平均線（SMA 20/50、EMA 20/50）+ Donchian Channels
  - **組合 4**：Zig Zag、PSAR、Linear Regression
- **3x4 網格布局**：12 個圖表同時顯示，便於多角度分析
- **深色主題**：舒適的深色介面，適合長時間觀看
- **即時數據**：透過 TradingView API 獲取即時市場數據

## 快速開始

### 使用方法

#### 方式 1：動態頁面（推薦）⭐
```
# 短線分析（1小時 / 4小時 / 日線）
https://jacobhsu.github.io/stock-watch/stock/?s=TSM
https://jacobhsu.github.io/stock-watch/stock/?s=AAPL

# 月度長線分析（1週 / 1月 / 3月）
https://jacobhsu.github.io/stock-watch/stock/m/?s=TSM
https://jacobhsu.github.io/stock-watch/stock/m/?s=NVDA
```

#### 方式 2：瀏覽股票列表
```
# 查看所有可用股票（按 Icon 狀態分類）
https://jacobhsu.github.io/stock-watch/stock/
```

#### 方式 3：靜態頁面
```
# 使用預先生成的靜態 HTML（如果有）
https://jacobhsu.github.io/stock-watch/stock/tsm.html
```

### 添加新股票

```bash
# 1. 只下載 Icon（預設）
node generate-stock.js SBUX
ㄕ
# 2. 訪問動態版（不用 commit HTML）
# stock/?s=SBUX

# 3. 如果需要靜態 HTML
node generate-stock.js SBUX --html
```

### 檔案結構

```
stock-watch/
├── stock-database.js  # 📊 股票資料庫（統一管理）
├── generate-stock.js  # 🚀 Icon 下載器 + HTML 生成器
├── chart-config.js    # 共用的 JavaScript 邏輯（TradingView 配置）
├── styles.css         # 共用樣式表（網格布局和主題設定）
├── stock/
│   ├── index.html     # 🆕 動態股票頁面 + 智能列表（1h/4h/1D）
│   ├── m/
│   │   ├── index.html     # 月度分析頁面（1W/1M/3M）
│   │   └── chart-config.js
│   ├── tsm.html       # 靜態頁面（可選）
│   └── ...
├── etf/               # ETF 分析頁面
│   ├── ewt.html       # iShares MSCI Taiwan ETF
│   ├── gld.html       # SPDR Gold Trust
│   ├── qqq.html       # Invesco QQQ Trust
│   ├── vt.html        # Vanguard Total World Stock ETF
│   ├── vti.html       # Vanguard Total Stock Market ETF
│   └── vxus.html      # Vanguard Total International Stock ETF
├── stock/             # 股票分析頁面
│   ├── aapl.html      # Apple Inc.
│   ├── goog.html      # Alphabet Inc.
│   ├── meta.html      # Meta Platforms Inc.
│   ├── nvda.html      # NVIDIA Corporation
│   ├── orcl.html      # Oracle Corporation
│   ├── tsla.html      # Tesla Inc.
│   └── tsm.html       # Taiwan Semiconductor
├── icons/             # Logo 資源目錄
│   ├── aapl.png       # Apple Logo
│   ├── gld.png        # Gold ETF Logo
│   ├── goog.png       # Google Logo
│   ├── meta.png       # Meta Logo
│   ├── nvda.png       # NVIDIA Logo
│   ├── orcl.png       # Oracle Logo (自動下載)
│   ├── qqq.png        # QQQ ETF Logo
│   ├── tsla.png       # Tesla Logo
│   ├── tsm.svg        # TSMC Logo
│   ├── vanguard.png   # Vanguard Logo
│   └── xaut.svg       # Tether Gold Logo
└── README.md          # 本說明文件
```

## 技術指標說明

### 短線頁面 `stock/?s=XXX`（1小時 / 4小時 / 日線）

| 組合 | 指標 |
|------|------|
| **Col 1** | Multi-Time Period Charts、MA Cross、Williams Alligator |
| **Col 2** | Bollinger Bands、Keltner Channels、Supertrend |
| **Col 3** | SMA(20/50)、EMA(20/50)、Donchian Channels |
| **Col 4** | Zig Zag、PSAR、Linear Regression |

三列分別對應 1小時、4小時、日線週期。

### 月度頁面 `stock/m/?s=XXX`（1週 / 1月 / 3月）

| 組合 | 指標 |
|------|------|
| **Col 1** | Multi-Time Period Charts、Williams Fractals、Williams Alligator |
| **Col 2** | Bollinger Bands、Keltner Channels、Supertrend |
| **Col 3** | SMA(20/50)、EMA(20/50)、Donchian Channels |
| **Col 4** | MA Ribbon、PSAR、Linear Regression（3月欄改為 Technical Ratings）|

## 技術細節

### 使用的技術

- TradingView Widget API
- 原生 JavaScript（無需額外框架）
- CSS Grid 布局
- 響應式設計（支援桌面瀏覽器）

### 圖表配置

- **主題**：深色模式
- **K線顏色**：綠漲（#089981）紅跌（#f23645）
- **時區**：Asia/Taipei
- **語言**：繁體中文（zh_TW）

### 代碼架構

本專案採用高度模組化的設計，**所有 JavaScript 邏輯都在一個檔案** `chart-config.js` 中：
- **baseChartConfig**: 基礎圖表配置（主題、顏色、樣式）
- **indicatorSets**: 四組技術指標配置
- **column3ChartConfig**: 第三組（移動平均線）的特殊配置
- **createChart()**: 創建圖表的通用函數
- **initializeIfReady()**: TradingView 載入檢測函數
- **initializeChartsAuto()**: 自動從 HTML 容器讀取配置並初始化

每個標的只需要一個 HTML 檔案，在主容器上設定兩個 data 屬性：
- `data-symbol`: 股票代碼（如 `AMEX:EWT`、`NYSE:TSM`）
- `data-prefix`: 容器 ID 前綴（如 `ewt`、`tsm`）

### 添加新標的

#### 方法 1：動態頁面（最簡單）⭐⭐⭐

使用 `stock-database.js` + 動態頁面，**只需兩步**：

```bash
# 1. 編輯 stock-database.js，加入新股票
'SBUX': {
  exchange: 'NASDAQ',
  domain: 'starbucks.com',
  name: 'Starbucks Corporation',
  logoName: 'starbucks'  # 可選：自訂 TradingView Logo 名稱
}

# 2. 下載 Icon
node generate-stock.js SBUX

# 3. 完成！訪問動態版
# stock/?s=SBUX
```

**特殊案例**：有些股票的 Logo 名稱需要手動指定
```javascript
'DIS': {
  exchange: 'NYSE',
  domain: 'disney.com',
  name: 'The Walt Disney Company',
  logoName: 'walt-disney'  // TradingView 使用 "walt-disney" 而非 "disney"
}
```

#### 方法 2：使用生成器（傳統方式）

`generate-stock.js` 提供完整的 Icon 下載和 HTML 生成功能：

```bash
# 🎯 預設：只下載 Icon（配合動態頁面使用）
node generate-stock.js SBUX

# 📄 生成靜態 HTML（需要 SEO 或特定需求時）
node generate-stock.js SBUX --html

# 🔄 批量下載 Icon
node generate-stock.js SBUX,DIS,WMT,TGT

# 🔄 批量生成 HTML + Icon
node generate-stock.js SBUX,DIS,WMT,TGT --html

# 🔁 強制重新下載 Icon
node generate-stock.js SBUX --force

# 🚫 跳過 Icon 下載（僅生成 HTML）
node generate-stock.js SBUX --html --no-icon

# 🏛️ 強制指定交易所（覆蓋資料庫）
node generate-stock.js ORCL NYSE
```

**新的工作流程：**
```bash
# 大多數情況（推薦）
node generate-stock.js SBUX        # 只下載 Icon
# → 訪問 stock/?s=SBUX

# 需要靜態頁面時
node generate-stock.js TSM --html  # Icon + HTML
# → 訪問 stock/tsm.html 或 stock/?s=TSM
```

**功能特點：**
- ✅ **預設 Icon-only**：配合動態頁面，不產生冗餘 HTML
- ✅ **自動交易所偵測**：內建 85+ 股票的正確交易所資訊
- ✅ **自動 Logo 下載**：優先 TradingView CDN，多重備援來源
- ✅ **智能檔案管理**：自動處理 PNG/SVG 格式，避免重複下載
- ✅ **批量處理**：一次處理多個股票
- ✅ **自訂 Logo 名稱**：支援特殊案例（如 Disney 使用 walt-disney）
- ✅ **集中式資料庫**：`stock-database.js` 統一管理，兩邊自動同步

**內建股票資料庫包含：**
- 科技股：AAPL, GOOG, META, NVDA, TSLA, MSFT, NFLX, AVGO 等
- 傳統企業：ORCL, IBM, CRM, HON, SBUX, DIS 等
- 國際股票：TSM, BABA, NIO 等
- 其他：MU, PAYX, WBD, CEG 等（共 85+ 支股票）

#### 方法 2：手動複製（傳統方式）

要手動添加新的股票或 ETF 分析頁面：

1. 複製 `stock/aapl.html` 並重新命名（例如 `stock/msft.html`）
2. 修改以下 3 個地方：
   - `<title>` 標題：`MSFT Stock Technical Analysis`
   - `data-symbol` 屬性：股票代碼，例如 `"NASDAQ:MSFT"`
   - `data-prefix` 屬性：容器前綴，例如 `"msft"`
3. 更新所有圖表容器的 ID：將 `aapl` 替換為新的前綴（例如 `msft`）
4. 添加對應的 Logo 到 `icons/` 目錄

**就這樣！不需要寫任何 JavaScript 代碼。**

範例：
```html
<div class="charts-grid-3x4" data-symbol="NASDAQ:MSFT" data-prefix="msft">
  <div id="tradingview_msft_1h_col1"></div>
  ...
</div>
```

### Logo 資源

**自動下載（推薦）：**
使用 `generate-stock.js` 會自動嘗試從多個來源下載 Logo（按優先順序）：
1. **TradingView CDN**（主要來源，最可靠）
   - `https://s3-symbol-logo.tradingview.com/{company}.svg`
   - `https://s3-symbol-logo.tradingview.com/{company}--big.svg`
2. **Clearbit Logo API**
   - `https://logo.clearbit.com/{domain}`
3. **Logo.dev API**
   - `https://img.logo.dev/{domain}`
4. **Favicon 備援**
   - `https://{domain}/favicon.ico`

**特殊處理：**
- Icon < 500 bytes → 判定為佔位符（下載失敗）
- 支援 SVG/PNG 雙格式
- 自動創建文字佔位符（下載失敗時）

**手動下載：**
- TSMC Logo: [SeekLogo - tsmc](https://seeklogo.com/free-vector-logos/tsmc)
- 其他標的 Logo 可在 [SeekLogo](https://seeklogo.com) 或 [LogoWik](https://logowik.com) 搜尋下載
- Clearbit logo 範例：[nvda](https://logo.clearbit.com/nvidia.com) [goog](https://logo.clearbit.com/google.com) [tsla](https://logo.clearbit.com/tesla.com)  

### 錯誤處理

- 自動載入超時檢測（10秒）
- TradingView API 載入失敗提示
- 重新載入按鈕

## 瀏覽器支援

建議使用現代瀏覽器以獲得最佳體驗：

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 注意事項

1. 需要網路連線以載入 TradingView API 和市場數據
2. 建議使用大螢幕（1920x1080 或更高解析度）以便同時查看所有圖表
3. 首次載入時，圖表會依序初始化（間隔 100ms），避免同時請求造成延遲
4. **動態頁面需要 HTTP Server**：本地測試請使用 `python -m http.server` 或 Live Server，不能直接開啟 HTML 檔案（TradingView API 限制）

## 系統架構

### 核心檔案

1. **stock-database.js** - 股票資料庫
   - 統一管理所有股票資訊（交易所、域名、公司名稱）
   - 支援 Node.js 和瀏覽器雙環境
   - 支援自訂 `logoName` 處理特殊案例

2. **generate-stock.js** - Icon 下載器 + HTML 生成器
   - 從 `stock-database.js` 讀取股票資訊
   - 自動下載 Logo（多重來源）
   - 可選生成靜態 HTML

3. **stock/index.html** - 動態股票頁面
   - 讀取 URL 參數 `?s=XXX`
   - 從 `stock-database.js` 獲取股票資訊
   - 動態生成圖表容器
   - 無參數時顯示股票列表（按 Icon 狀態分類）

4. **chart-config.js** - TradingView 圖表配置
   - 讀取容器的 `data-symbol` 和 `data-prefix`
   - 自動初始化 12 個圖表

### 雙模式設計

| 模式 | URL 格式 | 優點 | 缺點 |
|------|----------|------|------|
| **動態** | `stock/?s=TSM` | 不用生成 HTML，即時添加股票 | URL 較長，SEO 較差 |
| **靜態** | `stock/tsm.html` | URL 簡潔，SEO 友好 | 需要預先生成 HTML |

**推薦策略**：
- 日常使用：動態模式（靈活快速）
- 正式發布：靜態模式（SEO 優化）

## License

本專案僅供個人學習和研究使用。

TradingView 商標和圖表 API 版權歸 TradingView 所有。
