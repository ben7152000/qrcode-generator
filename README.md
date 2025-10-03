# 🔲 QR Code 產生器

一個使用 Vue 3 開發的現代化 QR Code 產生工具，具備精美的 UI 設計與強大的功能。

## ✨ 功能特色

- 🎨 美觀的漸層色 UI 設計
- ⚡ 即時產生 QR Code
- 📋 一鍵複製 QR Code 圖片（可直接貼到其他應用程式）
- 📥 下載 QR Code PNG 圖片
- 📱 響應式設計，支援手機與桌面裝置
- 🌐 輸入網址即可快速產生
- 🎯 高容錯率（Error Correction Level H）

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 建置生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 📖 使用方式

1. 在輸入框中輸入網址（例如：`https://example.com`）
2. 點擊「產生 QR Code」按鈕
3. QR Code 會立即顯示
4. 可選擇：
   - **複製 QR Code**：點擊後可直接貼到任何應用程式（Ctrl+V / Cmd+V）
   - **下載 QR Code**：下載為 PNG 圖片檔案

## 🛠️ 技術架構

- **框架**：Vue 3 (Composition API)
- **建置工具**：Vite
- **QR Code 生成**：qrcode.js
- **樣式**：Scoped CSS with 漸層設計
- **包管理**：npm

## 📁 專案結構

```
qrcode-generator/
├── index.html              # 應用程式入口
├── package.json            # 依賴配置
├── vite.config.js          # Vite 設定
└── src/
    ├── main.js             # Vue 應用程式啟動
    ├── App.vue             # 根組件
    └── components/
        └── QRCodeGenerator.vue  # QR Code 產生器組件
```

## 🎯 特色說明

### 複製功能
使用 Clipboard API 實現一鍵複製，產生的 QR Code 可以直接貼到：
- 文件編輯器（Word、Google Docs）
- 圖片編輯軟體（Photoshop、Figma）
- 聊天軟體（Line、Telegram）
- 任何支援圖片貼上的應用程式

### 精美設計
- 紫色漸層外框
- 懸停光暈特效
- 淡入動畫效果
- 響應式按鈕設計

## 📄 授權

ISC License
