// @ts-check
import { test, expect } from '@playwright/test';

test('Loading Brands', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').click();
  await page.getByLabel('Your password').fill('test1234');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  
  await page.route('*/**/api/Brand', async route => {
    const json = [
      {
        "id": 1,
        "name": "Nike",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('link', { name: 'BRANDS' }).click();
  await expect(page.getByRole('cell', { name: 'Nike' })).toBeVisible();

});

test('Creating new brand', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').click();
  await page.getByLabel('Your password').fill('test1234');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  
  await page.route('*/**/api/Brand', async route => {
    const json = [
      {
        "id": 1,
        "name": "Nike",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('link', { name: 'BRANDS' }).click();
  await page.getByRole('button', { name: 'CREATE NEW' }).click();
  await page.getByLabel('Name').fill('Puma');

  await page.route('*/**/api/Brand', async route => {
    const json = {
      "name": "Puma"
    }
    await route.fulfill({ json });
  });

  await page.route('*/**/api/Brand', async route => {
    const json = [
      {
        "id": 1,
        "name": "Nike",
        "sneakers": null
      },
      {
        "id": 2,
        "name": "Puma",
        "sneakers": null
      }
    ]
    await route.fulfill({ json });
  });

  await page.getByRole('button', { name: 'CREATE NEW' }).click();
  await expect(page.locator('[id="\\31 "]')).toBeVisible(); //Toast Notification Box
  await expect(page.getByRole('cell', { name: 'Puma' })).toBeVisible();
});


