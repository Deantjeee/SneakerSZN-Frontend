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

test('Login with empty email', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'DASHBOARD' })).toHaveCount(0);
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your password').fill('test1234');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page.getByText('Email is required.')).toBeVisible();
});

test('Login with empty password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'DASHBOARD' })).toHaveCount(0);
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page.getByText('Password is required.')).toBeVisible();
});

test('User register', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'DASHBOARD' })).toHaveCount(0);
  await page.getByRole('button', { name: 'REGISTER' }).click();

  await page.getByPlaceholder('name@example.com').fill("test@gmail.com");
  await page.getByLabel('Your password').fill("test1234");
  await page.getByLabel('Repeat password').fill("test1234");
  await page.locator('form').getByRole('button', { name: 'REGISTER' }).click();

  await page.route('*/**/register', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Successfully signed up!' }),
    });
  });

  await expect(
    page.getByRole('alert')
  ).toHaveText('Successfully signed up!');
});

test('Register with already in use email', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'DASHBOARD' })).toHaveCount(0);
  await page.getByRole('button', { name: 'REGISTER' }).click();
  await page.getByPlaceholder('name@example.com').fill("test@gmail.com");
  await page.getByLabel('Your password').fill("test1234");
  await page.getByLabel('Repeat password').fill("test1234");
  await page.locator('form').getByRole('button', { name: 'REGISTER' }).click();
  await expect(page.getByText("Username 'test@gmail.com' is already taken.")).toBeVisible();
});