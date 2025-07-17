Edu-Ecommerce
Một nền tảng thương mại điện tử giáo dục được xây dựng bằng React và Vite, cung cấp trải nghiệm mua sắm khóa học trực tuyến hiện đại và thân thiện với người dùng.

🚀 Tính năng

Giao diện hiện đại: Được thiết kế với React và các công nghệ web hiện đại
Hiệu suất cao: Sử dụng Vite để phát triển nhanh với Hot Module Replacement (HMR)
TypeScript: Hỗ trợ TypeScript để phát triển an toàn và bảo trì dễ dàng
ESLint: Tích hợp ESLint để đảm bảo chất lượng code
Responsive Design: Tương thích với mọi thiết bị


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
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## DOCUMENTATION

# RUN PROJECT

1. npm install
2. npm run dev
