// @ts-check
import { test, expect } from '@playwright/test';

test('Loading sneakers', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Sneaker', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan 4 'Military Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('button', { name: 'LOG IN' }).click();

  await expect(page.getByRole('cell', { name: 'Air Jordan 4 \'Military Blue\'' })).toBeVisible();
});

test('Creating new sneaker', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Sneaker', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan 4 'Military Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
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
      },
      {
        "id": 2,
        "name": "Adidas",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

  const path = require('path');

  // Resolve the path to the image file
  const imagePath = path.resolve(__dirname, 'testimage/AF1.webp');

  await page.getByRole('button', { name: 'CREATE NEW' }).click();
  await page.getByLabel('Name').fill("Test");
  await page.getByLabel('Size').fill('41');
  await page.getByLabel('Price').fill('160');
  await page.getByLabel('Stock').fill('200');
  await page.getByLabel('Brand').selectOption('1');

  // Set the input file to the resolved image path
  await page.getByLabel('Sneaker Image').setInputFiles(imagePath);

  await page.route('*/**/api/Sneaker', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan 4 'Military Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
      },
      {
        "id": 2,
        "name": "Airforce 1",
        "size": 41,
        "price": 160,
        "stock": 200,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('button', { name: 'CREATE NEW' }).click();

  await expect(
    page.getByRole('alert')
  ).toHaveText('Created a new sneaker');
});

test('Creating new sneaker, with some empty inputs', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Sneaker', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan 4 'Military Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
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
      },
      {
        "id": 2,
        "name": "Adidas",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

  const path = require('path');

  // Resolve the path to the image file
  const imagePath = path.resolve(__dirname, 'testimage/AF1.webp');

  await page.getByRole('button', { name: 'CREATE NEW' }).click();
  await page.getByLabel('Size').fill('41');
  await page.getByLabel('Brand').selectOption('1');

  // Set the input file to the resolved image path
  await page.getByLabel('Sneaker Image').setInputFiles(imagePath);

  await page.getByRole('button', { name: 'CREATE NEW' }).click();

  await expect(page.getByText('Sneaker name is required.')).toBeVisible();
  await expect(page.getByText('Sneaker price is required.')).toBeVisible();
  await expect(page.getByText('Sneaker stock is required.')).toBeVisible();
});

test('Editing a sneaker', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Sneaker', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan 4 'Military Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
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
      },
      {
        "id": 2,
        "name": "Adidas",
        "sneakers": null
      }]
    await route.fulfill({ json });
  });

  await page.route('*/**/api/Sneaker/**', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan 4 'Military Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('Name').fill("Air Jordan");

  await page.route('*/**/api/Sneaker', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('button', { name: 'FINALIZE EDIT' }).click();
  await expect(
    page.getByRole('alert')
  ).toHaveText('Updated sneaker');
  await expect(page.getByRole('cell', { name: 'Air Jordan' })).toBeVisible();

});

test('Deleting a sneaker', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByLabel('Your email').fill('admin@gmail.com');
  await page.getByLabel('Your password').fill('test1234');

  await page.route('*/**/api/Sneaker', async route => {
    const json = [
      {
        "id": 1,
        "name": "Air Jordan 4 'Military Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
      },
      {
        "id": 2,
        "name": "Air Jordan 3 'Blue'",
        "size": 41,
        "price": 450,
        "stock": 70,
        "image": "",
        "brandId": 1,
        "brand": {
          "id": 1,
          "name": "Nike"
        }
      }]
    await route.fulfill({ json });
  });

  await page.getByRole('button', { name: 'LOG IN' }).click();

  await expect(page.getByRole('cell', { name: "Air Jordan 4 'Military Blue'" })).toBeVisible();
  await expect(page.getByRole('cell', { name: "Air Jordan 3 'Blue'" })).toBeVisible();

  await page.route('**/api/Sneaker/2', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Deleted successfully' }),
    });
  });

  await page.route('**/api/Sneaker', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          "id": 1,
          "name": "Air Jordan 4 'Military Blue'",
          "size": 41,
          "price": 450,
          "stock": 70,
          "image": "",
          "brandId": 1,
          "brand": {
            "id": 1,
            "name": "Nike"
          }
        }
      ]),
    });
  });

  await page.getByRole('row', { name: 'Nike Air Jordan 3 \'Blue\' 41 €' }).getByRole('button').click();

  await expect(
    page.getByRole('alert')
  ).toHaveText('Deleted sneaker');

  await expect(page.getByRole('cell', { name: "Air Jordan 3 'Blue'" })).not.toBeVisible();
  await expect(page.getByRole('cell', { name: "Air Jordan 4 'Military Blue'" })).toBeVisible();
});