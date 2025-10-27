# TSM Stock Technical Analysis Dashboard

台積電（NYSE:TSM）股票技術分析即時儀表板，使用 TradingView 圖表展示多時間範圍和多種技術指標組合。

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

1. 直接在瀏覽器中打開 `tsm.html` 檔案
2. 等待圖表載入完成（首次載入可能需要幾秒鐘）
3. 開始分析 TSM 股票的技術指標

### 檔案結構

```
stock-watch/
├── tsm.html           # 主 HTML 檔案
├── script_tsm.js      # TradingView 圖表配置和初始化腳本
├── styles.css         # 樣式表（包含網格布局和主題設定）
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

### Logo

SeekLogo - [tsmc](https://seeklogo.com/free-vector-logos/tsmc)

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
