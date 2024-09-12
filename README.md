## 作成手順

### プロジェクトの作成

`npm create vite@latest`

```
✔ Project name: … app
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC
```

`cd app`

`npm install`

`npm run dev`

ページが表示されることを確認する

### TailwindCSS の導入

`npm install -D tailwindcss postcss autoprefixer`

`npx tailwindcss init -p`

#### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Reactのファイル拡張子を含む
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### GitHub Pages の設定

#### vite.config.ts

```typescript
export default defineConfig({
  base: "/Template_Vite-React-TailwindCSS/",
  plugins: [react()],
});
```

#### gh-pages.yml

```yaml
name: Deploy React App to GitHub Pages

on:
  push:
    branches:
      - main # デプロイをトリガーするブランチを指定

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      APP_DIR: ./app
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Git
        run: |
          git config --global user.name "LiamAltie"
          git config --global user.email "liam@altie.dev"

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install
        working-directory: ${{ env.APP_DIR }}

      - name: Build the React app
        run: npm run build
        working-directory: ${{ env.APP_DIR }}

      - name: Deploy to GitHub Pages
        run: npm run deploy
        working-directory: ${{ env.APP_DIR }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### microCMS 接続設定

`npm install microcms-js-sdk`
