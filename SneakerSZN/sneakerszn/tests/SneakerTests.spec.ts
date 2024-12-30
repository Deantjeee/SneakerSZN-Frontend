// @ts-check
import { test, expect } from '@playwright/test';

test('Loading Products', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').click();
  await page.getByLabel('Your password').fill('test1234');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  
  await expect(page.getByText("Air Jordan 4 'Military Blue'")).toBeVisible();
  await page.getByRole('link', { name: 'PRODUCTS' }).click();

});