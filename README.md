# Stock Watch - Technical Analysis Dashboard

股票技術分析即時儀表板，支援多個標的，使用 TradingView 圖表展示多時間範圍和多種技術指標組合。

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
- **四組技術指標組合**：
  - **組合 1**：Multi-Time Period Charts、MA Cross、Williams Alligator
  - **組合 2**：Bollinger Bands、Keltner Channels、Supertrend
  - **組合 3**：多條移動平均線（SMA 20/50、EMA 20/50/100）
  - **組合 4**：MA Ribbon、PSAR、Pivot Points High Low
- **3x4 網格布局**：12 個圖表同時顯示，便於多角度分析
- **深色主題**：舒適的深色介面，適合長時間觀看
- **即時數據**：透過 TradingView API 獲取即時市場數據

## 快速開始

### 使用方法

1. **瀏覽現有標的**：
   - ETF：打開 `etf/` 目錄下的任一檔案
   - 股票：打開 `stock/` 目錄下的任一檔案  
   - 加密貨幣：打開 `crypto/` 目錄下的任一檔案

2. **添加新標的**：
   ```bash
   # 一鍵生成新股票頁面
   node generate-stock.js MSFT
   ```

3. 等待圖表載入完成（首次載入可能需要幾秒鐘）
4. 開始分析股票的技術指標

### 檔案結構

```
stock-watch/
├── generate-stock.js  # 🚀 股票頁面自動生成器
├── stocks-config.json # 股票配置檔案
├── chart-config.js    # 共用的 JavaScript 邏輯（TradingView 配置）
├── styles.css         # 共用樣式表（網格布局和主題設定）
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
├── crypto/            # 加密貨幣分析頁面
│   └── xaut.html      # Tether Gold
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

### 第一列（1小時週期）

- **Col 1**：多時間週期圖表、移動平均交叉、鱷魚線指標
- **Col 2**：布林通道、肯特納通道、超級趨勢
- **Col 3**：SMA(20/50) + EMA(20/50/100)
- **Col 4**：移動平均帶、拋物線 SAR、樞軸高低點

### 第二列（4小時週期）

相同的四組指標配置，用於觀察中期趨勢

### 第三列（日線週期）

相同的四組指標配置，用於觀察長期趨勢

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

#### 方法 1：自動生成器（推薦）⭐

使用 `generate-stock.js` 腳本可以**一鍵生成**新的股票頁面，包含自動下載 Logo：

```bash
# 生成單個股票（自動偵測交易所）
node generate-stock.js ORCL     # Oracle - 自動使用 NYSE
node generate-stock.js AAPL     # Apple - 自動使用 NASDAQ
node generate-stock.js TSM      # 台積電 - 自動使用 NYSE

# 批量生成多個股票
node generate-stock.js ORCL,MSFT,AMZN,BABA

# 強制指定交易所（覆蓋預設）
node generate-stock.js ORCL NASDAQ

# 跳過 Logo 下載（更快速）
node generate-stock.js MSFT --no-icon

# 強制重新下載 Logo
node generate-stock.js AAPL --force
```

**功能特點：**
- ✅ **自動交易所偵測**：內建 100+ 股票的正確交易所資訊
- ✅ **自動 Logo 下載**：嘗試多個來源，失敗時創建文字佔位符
- ✅ **智能檔案管理**：自動處理 PNG/SVG 格式，避免重複下載
- ✅ **批量處理**：一次生成多個股票頁面
- ✅ **完整錯誤處理**：網路失敗、超時、格式錯誤等

**內建股票資料庫包含：**
- 科技股：AAPL, GOOG, META, NVDA, TSLA, MSFT, AMZN 等
- 傳統企業：ORCL, IBM, CRM, V, MA 等  
- 國際股票：TSM, BABA, NIO 等
- 生技醫療：MRNA, PFE, JNJ 等

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
使用 `generate-stock.js` 會自動嘗試從多個來源下載 Logo：
- Brandfetch API
- Logo.dev API  
- Clearbit API
- Favicone API

**手動下載：**
- TSMC Logo: [SeekLogo - tsmc](https://seeklogo.com/free-vector-logos/tsmc)
- 其他標的 Logo 可在 [SeekLogo](https://seeklogo.com) 或 [LogoWik](https://logowik.com) 搜尋下載   
- Clearbit logo 範例：[nvda](https://logo.clearbit.com/nvidia.com) [goog](https://logo.clearbit.com/google.com) [tsla](https://logo.clearbit.com/tesla.com) [qqq](https://logo.clearbit.com/invesco.com)  

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

## License

本專案僅供個人學習和研究使用。

TradingView 商標和圖表 API 版權歸 TradingView 所有。
