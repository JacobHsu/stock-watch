// stock/m/ 月度級別圖表配置 (1W / 1M / 3M)

const baseChartConfig = {
  width: "100%",
  height: "100%",
  theme: "dark",
  style: "1",
  locale: "zh_TW",
  toolbar_bg: "#131722",
  enable_publishing: false,
  hide_top_toolbar: true,
  hide_legend: false,
  save_image: false,
  hide_side_toolbar: true,
  allow_symbol_change: false,
  container_id: "",
  overrides: {
    "paneProperties.background": "#131722",
    "paneProperties.backgroundType": "solid",
    "paneProperties.vertGridProperties.color": "#363c4e",
    "paneProperties.horzGridProperties.color": "#363c4e",
    "symbolWatermarkProperties.transparency": 90,
    "scalesProperties.textColor": "#d1d4dc",
    "scalesProperties.backgroundColor": "#131722",
    "mainSeriesProperties.candleStyle.upColor": "#089981",
    "mainSeriesProperties.candleStyle.downColor": "#f23645",
    "mainSeriesProperties.candleStyle.drawWick": true,
    "mainSeriesProperties.candleStyle.drawBorder": true,
    "mainSeriesProperties.candleStyle.borderUpColor": "#089981",
    "mainSeriesProperties.candleStyle.borderDownColor": "#f23645",
    "mainSeriesProperties.candleStyle.wickUpColor": "#089981",
    "mainSeriesProperties.candleStyle.wickDownColor": "#f23645",
  },
};

const indicatorSets = {
  column1: [
    "STD;Multi-Time%Period%Charts",
    "STD;Whilliams_Fractals",
    "STD;Williams_Alligator"
  ],
  column2: [
    "BB@tv-basicstudies",
    "KLTNR@tv-basicstudies",
    "STD;Supertrend"
  ],
  column3: [
    { "id": "MASimple@tv-basicstudies", "inputs": { "length": 20 } },
    { "id": "MASimple@tv-basicstudies", "inputs": { "length": 50 } },
    { "id": "MAExp@tv-basicstudies",    "inputs": { "length": 20 } },
    { "id": "MAExp@tv-basicstudies",    "inputs": { "length": 50 } },
    { "id": "STD;Donchian_Channels" },
  ],
  column4: [
    "STD;MA%Ribbon",
    "STD;PSAR",
    "STD;Linear_Regression",
  ],
  // 3M 最後一欄：用 Technical Ratings 取代 Linear Regression
  column4Monthly: [
    "STD;MA%Ribbon",
    "STD;PSAR",
    "STD;Technical%1Ratings",
  ],
};

const column3ChartConfig = {
  ...baseChartConfig,
  hide_side_toolbar: false,
  studies: indicatorSets.column3,
  studies_overrides: {
    "moving average.ma.color.0": "#ff9800",
    "moving average exponential.ma.color.0": "#00bcd4",
  },
};

function createChart(containerId, symbol, interval, indicatorSet, isColumn3 = false) {
  const config = isColumn3
    ? { ...column3ChartConfig, container_id: containerId, symbol, interval, timezone: "Asia/Taipei", autosize: true }
    : { ...baseChartConfig,   container_id: containerId, symbol, interval, timezone: "Asia/Taipei", autosize: true, studies: indicatorSet };

  try {
    new TradingView.widget(config);
    console.log(`圖表已創建: ${symbol} - ${interval} - ${containerId}`);
  } catch (error) {
    console.error(`創建圖表失敗 ${containerId}:`, error);
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = '<div class="fallback-content"><p>載入失敗</p></div>';
  }
}

function initializeIfReady(cb) {
  if (typeof TradingView !== "undefined") {
    cb();
  } else {
    setTimeout(() => initializeIfReady(cb), 100);
  }
}

function initializeChartsMonthly() {
  const container = document.querySelector('.charts-grid-3x4');
  if (!container) { console.error("找不到圖表容器"); return; }

  const symbol = container.dataset.symbol;
  const prefix = container.dataset.prefix;

  console.log(`TradingView 已載入，開始創建 ${symbol} 月度技術分析圖表...`);

  // 1週
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col1`, symbol, "1W", indicatorSets.column1, false), 100);
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col2`, symbol, "1W", indicatorSets.column2, false), 200);
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col3`, symbol, "1W", indicatorSets.column3, true),  300);
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col4`, symbol, "1W", indicatorSets.column4, false), 400);

  // 1月
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col1`, symbol, "1M", indicatorSets.column1, false), 500);
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col2`, symbol, "1M", indicatorSets.column2, false), 600);
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col3`, symbol, "1M", indicatorSets.column3, true),  700);
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col4`, symbol, "1M", indicatorSets.column4, false), 800);

  // 3月
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col1`, symbol, "3M", indicatorSets.column1, false),        900);
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col2`, symbol, "3M", indicatorSets.column2, false),        1000);
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col3`, symbol, "3M", indicatorSets.column3, true),         1100);
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col4`, symbol, "3M", indicatorSets.column4Monthly, false), 1200);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initializeIfReady(initializeChartsMonthly));
} else {
  initializeIfReady(initializeChartsMonthly);
}
