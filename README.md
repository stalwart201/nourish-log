# 🍴 NourishLog

A small personal nutrition logger built to keep my daily intake on track. No accounts, no social features — just a fast, offline-capable PWA I can open from my phone's home screen and log meals in seconds.

## 🥗 What it does

- 🍳 Log meals across breakfast, pre-gym, lunch, snack, and dinner
- 📊 Track calories and macros against a daily target
- 🔁 Three phases with different calorie targets to match diet cycles
- 🛒 Grocery list tied to the meal plan
- ⚖️ Weight tracking over time
- 📴 Works fully offline — syncs when back online
- 📱 Installable as a PWA on Android/iOS

## 🛠 Stack

- Vue 3 + TypeScript (`<script setup>`)
- Vite + Tailwind CSS v4
- Pinia for state
- IndexedDB for local persistence
- Vite PWA plugin (Workbox) for service worker + offline support

## 🚀 Dev setup

```sh
npm install
npm run dev
```

```sh
npm run build   # production build
npm run lint    # ESLint
```
