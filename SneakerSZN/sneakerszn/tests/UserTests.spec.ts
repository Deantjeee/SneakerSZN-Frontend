// @ts-check
import { test, expect } from '@playwright/test';

test('Admin Login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'DASHBOARD' })).toHaveCount(0);
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page.getByRole('link', { name: 'DASHBOARD' })).toHaveCount(1);
});