# TradingView 自動讀取 URL `?symbol=` 參數導致股票符號錯誤

## 問題描述

使用 `stock/index.html?symbol=BA` 訪問 Boeing 股票時，TradingView 圖表顯示的是 **BitMEX BA (US Dollar Index)** 而非 **NYSE:BA (Boeing)**。

其他短代碼股票如 `V` (Visa)、`T` (AT&T) 則正常顯示。

## 重現步驟

1. 訪問 `stock/index.html?symbol=BA`
2. 觀察 TradingView 圖表顯示的是 BitMEX 的 BA 符號

## 預期行為

應顯示 NYSE:BA (The Boeing Company) 的股票圖表。

## 調查過程

### 排除的可能原因

1. **stock-database.js 設定錯誤** - 已確認 BA 設定為 `{ exchange: 'NYSE' }`
2. **DOM 生成問題** - DevTools 確認 `data-symbol="NYSE:BA"` 正確
3. **chart-config.js 傳遞問題** - Console 顯示 `圖表已創建: NYSE:BA`
4. **字元編碼問題** - 比對 charCode 完全一致：`[78, 89, 83, 69, 58, 66, 65]`

### 關鍵測試

建立靜態測試檔 `ba.html`，內容與動態版相同，唯一差異是 HTML 寫死 vs JavaScript 動態生成：

| 測試 | data-symbol | 結果 |
|------|-------------|------|
| `ba.html` (靜態) | `NYSE:BA` | ✅ 正確顯示 Boeing |
| `index.html?symbol=BA` (動態) | `NYSE:BA` | ❌ 顯示 BitMEX |

兩者的 `data-symbol` 值完全相同，但結果不同。

## 根本原因

**TradingView Widget 會自動讀取 URL 的 `?symbol=` 參數，並覆蓋程式碼中設定的 symbol。**

當 URL 包含 `?symbol=BA` 時：
1. 我們的程式碼正確設定 `symbol: "NYSE:BA"`
2. TradingView Widget 偵測到 URL 有 `?symbol=BA`
3. TradingView 使用 URL 的 `BA`（無交易所前綴）覆蓋我們的設定
4. `BA` 在 TradingView 的符號解析中優先匹配到 BitMEX

這解釋了為什麼：
- 靜態 `ba.html`（無 URL 參數）正常
- 動態 `index.html?symbol=BA`（有 URL 參數）異常

## 解決方案

將 URL 參數從 `?symbol=` 改為 `?s=`，避免被 TradingView 攔截。

### 修改檔案

**stock/index.html**
```javascript
// Before
return urlParams.get('symbol')?.toUpperCase() || null;

// After
return urlParams.get('s')?.toUpperCase() || null;
```

**generate-stock.js** - 更新提示訊息中的 URL 格式

**README.md** - 更新所有範例 URL

## 使用方式變更

```
# Before
stock/index.html?symbol=BA

# After
stock/index.html?s=BA
```

## 影響範圍

- 所有使用動態頁面 `stock/index.html` 的 URL 需更新
- 靜態 HTML 檔案（如 `nvda.html`）不受影響

## 相關資源

- TradingView Widget API 文件並未明確記載此行為
- 此為 TradingView Widget 的隱藏功能/副作用
