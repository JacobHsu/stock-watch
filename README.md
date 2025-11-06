# Stock Watch - Technical Analysis Dashboard

股票技術分析即時儀表板，支援多個標的，使用 TradingView 圖表展示多時間範圍和多種技術指標組合。

## 支援的標的

- **EWT** (iShares MSCI Taiwan ETF) - `index.html`
- **TSM** (台積電 Taiwan Semiconductor) - `tsm.html`

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

1. 選擇要分析的標的：
   - EWT (台灣 ETF)：打開 `index.html`
   - TSM (台積電)：打開 `tsm.html`
2. 等待圖表載入完成（首次載入可能需要幾秒鐘）
3. 開始分析股票的技術指標

### 檔案結構

```
stock-watch/
├── index.html         # EWT (iShares MSCI Taiwan ETF) 儀表板
├── tsm.html           # TSM (台積電) 儀表板
├── chart-config.js    # 唯一的 JavaScript 檔案（包含所有配置和邏輯）
├── styles.css         # 共用樣式表（網格布局和主題設定）
├── icons/             # 圖標資源目錄
│   ├── ewt.png        # EWT 圖標
│   └── tsm.svg        # TSM 圖標
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

要添加新的股票或 ETF 分析頁面，**只需要複製一個 HTML 檔案並修改 3 個地方**：

1. 複製 `index.html` 並重新命名（例如 `aapl.html`）
2. 修改以下 3 個地方：
   - `<title>` 標題（第 6 行）
   - `data-symbol` 屬性（第 33 行）：股票代碼，例如 `"NASDAQ:AAPL"`
   - `data-prefix` 屬性（第 33 行）：容器前綴，例如 `"aapl"`
3. 更新所有圖表容器的 ID（第 35-50 行）：將 `ewt` 替換為新的前綴（例如 `aapl`）
4. （可選）更新 favicon 路徑

**就這樣！不需要寫任何 JavaScript 代碼。**

範例：
```html
<div class="charts-grid-3x4" data-symbol="NASDAQ:AAPL" data-prefix="aapl">
  <div id="tradingview_aapl_1h_col1"></div>
  ...
</div>
```

### Logo 資源

- TSMC Logo: [SeekLogo - tsmc](https://seeklogo.com/free-vector-logos/tsmc)
- 其他標的 Logo 可在 [SeekLogo](https://seeklogo.com) 或 [LogoWik](https://logowik.com) 搜尋下載   
- Clearbit logo [nvda](https://logo.clearbit.com/nvidia.com) [goog](https://logo.clearbit.com/google.com) [tsla](https://logo.clearbit.com/tesla.com) [qqq](https://logo.clearbit.com/invesco.com)  

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
