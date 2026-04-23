# Weiyun Yu · Portfolio

純 HTML / CSS / JS 的個人作品集網站，無需建置流程，直接雙擊 `index.html` 就能在瀏覽器開啟，也可放到任何靜態託管（GitHub Pages / Netlify / Vercel）。

## 檔案結構

```
weiyun-site/
├── index.html                    主頁
├── assets/
│   ├── styles.css                全域設計系統（Tokens、RWD、元件）
│   ├── project.css               作品子頁樣式
│   ├── main.js                   導覽、雙語切換、滑入動畫
│   └── images/
│       └── profile.png           大頭照
└── projects/
    ├── jingchi/index.html        君綺醫美開單系統
    ├── oneanswer/index.html      OneAnswer 解題 APP
    ├── intemeta/index.html       InteMeta 元宇宙活動平台
    └── qubby/index.html          Qubby 線上購課平台
```

## 配色

- 主色 Purple：`#7533B7`
- 主色 Teal：`#12A3A0`
- 漸層：`linear-gradient(135deg, #7533B7 0%, #12A3A0 100%)`

在 `assets/styles.css` 的 `:root` 可集中調整。

## 雙語切換

文字節點用 `data-zh` / `data-en` 雙屬性：
```html
<span data-zh="關於" data-en="About">關於</span>
```

需要整段切換時，用 `data-i18n-show="zh"` / `data-i18n-show="en"` 對兩個區塊做顯隱。

## 更換大頭照

替換 `assets/images/profile.png` 即可（建議正方形、至少 640×640）。

## 放上履歷 PDF

把 PDF 放到 `assets/resume.pdf`，再把首頁「下載完整履歷」連結的 `href="#"` 改成 `href="assets/resume.pdf"`。

## RWD 斷點

- 桌機 `≥1024px`
- 平板 `768–1023px`
- 手機 `≤767px`
