[![Playwright E2E Tests](https://github.com/Mihhail-Karuzin/qa-react-spa/actions/workflows/playwright.yml/badge.svg)](https://github.com/Mihhail-Karuzin/qa-react-spa/actions/workflows/playwright.yml)

# QA React SPA — Playwright E2E Automation

## 📌 Project Overview
This project demonstrates end-to-end (E2E) testing of a React Single Page Application (SPA)
using Playwright and TypeScript.

The focus is on **stable, CI-ready UI automation** for modern SPAs, including async behavior,
predictable selectors, and real-world test execution in GitHub Actions.

---

## 🧪 Tech Stack
- **Frontend:** React (Vite, TypeScript)
- **Testing:** Playwright (TypeScript)
- **CI/CD:** GitHub Actions
- **Environment:** Linux (WSL), Node.js

---

## 🎯 Testing Goals
- Validate critical user flows (login → products)
- Handle async UI behavior without flaky waits
- Use stable selectors (`data-testid`)
- Run tests locally and in CI with the same configuration

---

## 🚀 How to Run Locally

```bash
# install root dependencies
npm install

# start React SPA
npm run dev

# run Playwright tests
npm test

# To view the HTML report after test execution:
npm run test:report

