<h1 align="center">🚀 QUEST-BOARD-FRONTEND</h1>

<p align="center"><em>Empowering Seamless Task Management and Collaboration</em></p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/Abdul-Ikram/quest-board-frontend?style=for-the-badge&label=last%20commit" />
  <img src="https://img.shields.io/github/languages/top/Abdul-Ikram/quest-board-frontend?style=for-the-badge&label=typescript" />
  <img src="https://img.shields.io/github/languages/count/Abdul-Ikram/quest-board-frontend?style=for-the-badge&label=languages" />
</p>

---

### <p align="center"><em>Built with the tools and technologies:</em></p>

<p align="center">
  <img src="https://img.shields.io/badge/-JSON-000?style=for-the-badge&logo=json&logoColor=white" />
  <img src="https://img.shields.io/badge/-Markdown-000?style=for-the-badge&logo=markdown&logoColor=white" />
  <img src="https://img.shields.io/badge/-npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/-Autoprefixer-DD3735?style=for-the-badge&logo=autoprefixer&logoColor=white" />
  <img src="https://img.shields.io/badge/-PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white" />
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <br />
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/-Zod-4B4B4B?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/-ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/-dateFns-0078D4?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/-React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
</p>

<br>


**Quest-Board** is a task management frontend built with **React**. It enables uploaders to post tasks, users to complete them, and admins to review submissions. Approved tasks reward users with points, encouraging accountability and engagement through a rewarding experience.

---

## 🚀 Features

- 📥 Uploaders submit tasks for users
- ✅ Admins approve or reject completed tasks
- 🎮 Users earn points for approved tasks
- 🔄 Smooth workflow with a gamified touch
- 🔐 Modular components ready for backend integration

---

## 📦 Tech Stack

- **React** (Frontend UI)
- **React Router** for navigation
- **Tailwind CSS** or custom styling
---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Abdul-Ikram/Quest-Board-FrontEnd.git
cd Quest-Board-FrontEnd
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Or if using Create React App:

```bash
npm start
```
----------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
----------
## 📌 Contributing

Pull requests are welcome! Please ensure any changes follow the current coding style and include relevant updates.
