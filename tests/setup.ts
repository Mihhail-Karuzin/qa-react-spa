import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Nothing needed here, but file must exist
}

export default globalSetup;
