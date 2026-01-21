[![Playwright E2E Tests](https://github.com/Mihhail-Karuzin/qa-react-spa/actions/workflows/playwright.yml/badge.svg)](https://github.com/Mihhail-Karuzin/qa-react-spa/actions/workflows/playwright.yml)

# QA React SPA — Playwright E2E Automation

## 📌 Project Overview

This repository demonstrates **end-to-end (E2E) UI automation** for a modern **React Single Page Application (SPA)** using **Playwright and TypeScript**.

The frontend application is intentionally simple, while the **testing architecture reflects real-world, production-level QA practices**, including:

- deterministic and stable E2E tests
- async-safe UI validation
- Page Object Model (POM)
- CI-ready execution with GitHub Actions

This project is built as a **QA / SDET portfolio project**, showcasing how modern UI automation frameworks are structured, stabilized, and maintained in professional teams.

---

## 🧪 Tech Stack

- **Frontend:** React, Vite, TypeScript  
- **Testing:** Playwright (TypeScript)  
- **Architecture:** Page Object Model (POM)  
- **CI/CD:** GitHub Actions  
- **Environment:** Linux (WSL), Node.js  

---

## 🧱 Project Structure

```text
qa-react-spa/
├── frontend/                  # React SPA (Vite)
├── tests/
│   ├── pages/                 # Page Objects
│   │   ├── LoginPage.ts
│   │   └── ProductsPage.ts
│   ├── utils/                 # Shared helpers
│   │   └── auth.ts
│   ├── login.spec.ts          # Positive login flow
│   ├── login-negative.spec.ts # Invalid credentials scenario
│   └── logout.spec.ts         # Logout flow
├── playwright.config.ts       # Playwright configuration
├── .github/workflows/
│   └── playwright.yml         # CI pipeline
└── README.md
