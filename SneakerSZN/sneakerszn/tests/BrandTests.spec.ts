// @ts-check
import { test, expect } from '@playwright/test';

test('Loading brands', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Brand', async route => {
    const json = [
      {
        "id": 1,
        "name": "Nike",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

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
  await page.getByLabel('Your email').fill('admin@gmail.com');
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
  await expect(
    page.getByRole('alert')
  ).toHaveText('Created a new brand');
  await expect(page.getByRole('cell', { name: 'Puma' })).toBeVisible();
});

test('Creating new brand, with empty name', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Brand', async route => {
    const json = [
      {
        "id": 1,
        "name": "Nike",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

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
  await page.getByRole('button', { name: 'CREATE NEW' }).click();

  await expect(
    page.getByRole('alert')
  ).toHaveText('Every field needs to be filled in!');

});

test('Editing a brand', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Brand', async route => {
    const json = [
      {
        "id": 1,
        "name": "Nike",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

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
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('Name').fill("Adidas");

  await page.route('*/**/api/Brand/**', async route => {
    const json = { "name": "Adidas"}
    await route.fulfill({ json });
  });

  await page.route('*/**/api/Brand', async route => {
    const json = [
      {
        "id": 1,
        "name": "Adidas",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('button', { name: 'FINALIZE EDIT' }).click();
  await expect(
    page.getByRole('alert')
  ).toHaveText('Succesfully updated brand');
  await expect(page.getByRole('cell', { name: 'Adidas' })).toBeVisible();

});

test('Deleting a brand', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('**/api/Brand', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Nike', sneakers: null },
        { id: 2, name: 'Adidas', sneakers: null }
      ]),
    });
  });

  await page.getByRole('button', { name: 'LOG IN' }).click();

  await page.route('**/api/Brand', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Nike', sneakers: null },
        { id: 2, name: 'Adidas', sneakers: null }
      ]),
    });
  });

  await page.getByRole('link', { name: 'BRANDS' }).click();
  await expect(page.getByRole('cell', { name: 'Nike' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Adidas' })).toBeVisible();

  await page.route('**/api/Brand/1', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Deleted successfully' }),
    });
  });

  await page.route('**/api/Brand', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 2, name: 'Adidas', sneakers: null }
      ]),
    });
  });

  await page.getByRole('row', { name: 'Nike Edit Delete' })
    .getByRole('button', { name: 'Delete' })
    .click();

    await expect(
      page.getByRole('alert')
    ).toHaveText('Deleted brand');

  await expect(page.getByRole('cell', { name: 'Nike' })).not.toBeVisible();
  await expect(page.getByRole('cell', { name: 'Adidas' })).toBeVisible();
});

