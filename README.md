# QA React SPA — Playwright E2E Automation

[![Playwright E2E Tests](https://github.com/Mihhail-Karuzin/qa-react-spa/actions/workflows/playwright.yml/badge.svg)](https://github.com/Mihhail-Karuzin/qa-react-spa/actions/workflows/playwright.yml)

---

## Overview

Production-style end-to-end (E2E) UI automation framework for a React Single Page Application
built with Vite and tested using Playwright with TypeScript.

The project focuses on test automation architecture, stability, and CI readiness,
reflecting real-world QA / SDET practices.

---

## Key Features

- End-to-end UI automation with Playwright
- Stable selectors using `data-testid`
- Centralized setup via custom Playwright fixtures
- API failure simulation using `page.route`
- Visual regression testing
- Basic accessibility checks
- Continuous Integration with GitHub Actions

---

## Tech Stack

- React, Vite, TypeScript
- Playwright (TypeScript)
- Page Object Model (POM)
- GitHub Actions
- Node.js

---

## Project Structure

qa-react-spa/
├── frontend/                       # React SPA (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.tsx                 # Main application entry
│   ├── index.html
│   └── package.json
│
├── tests/
│   ├── fixtures/                   # Custom Playwright fixtures (critical setup)
│   │   └── index.ts                # Centralized test/expect + mocking
│   │
│   ├── pages/                      # Page Object Model
│   │   ├── LoginPage.ts
│   │   └── ProductsPage.ts
│   │
│   ├── utils/                      # Shared test helpers
│   │   └── auth.ts                 # Login helper using fixtures
│   │
│   ├── visual/
│   │   ├── products.visual.spec.ts # Visual regression test
│   │   └── __snapshots__/           # Playwright snapshots
│   │       └── products-page-Chromium-linux.png
│   │
│   ├── accessibility.spec.ts       # Accessibility checks
│   ├── login.spec.ts               # Positive login flow
│   ├── login-negative.spec.ts      # Invalid credentials scenario
│   ├── logout.spec.ts              # Logout flow
│   └── products-api-failure.spec.ts# API failure handling (route mocking)
│
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI pipeline
│
├── playwright.config.ts            # Playwright configuration + webServer
├── package.json
├── package-lock.json
└── README.md

> ⚠️ Important: All tests import `test` and `expect` from custom fixtures  
> (`tests/fixtures`) to ensure consistent mocking, setup, and stability.


---

## How to Run Locally

### Prerequisites

```bash
node -v
npm -v
git --version

### Clone and Install

git clone git@github.com:Mihhail-Karuzin/qa-react-spa.git
cd qa-react-spa
npm install
cd frontend
npm install
cd ..

### Run Application

cd frontend
npm run dev

### Application runs at:

http://localhost:5173

## Run Tests

npm test

## Run a single test:

npx playwright test tests/login.spec.ts

## Run tests in headed mode:

npx playwright test --headed

### Visual Regression

npx playwright test tests/visual/products.visual.spec.ts

## Update snapshots:

npx playwright test tests/visual/products.visual.spec.ts --update-snapshots

### Test Report

npx playwright show-report

### CI

## Tests run automatically on every push and pull request using GitHub Actions.

---


