import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    // Reset database
    await request.post('http://localhost:3003/api/testing/reset')
    
    // Create test user
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'testpass123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Blog List')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testuser')
      await page.getByRole('textbox').nth(1).fill('testpass123')
      await page.getByRole('button', { name: 'login' }).click()

      // Wait for logout button to appear (indicates successful login)
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testuser')
      await page.getByRole('textbox').nth(1).fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      // Login
      await page.getByRole('textbox').first().fill('testuser')
      await page.getByRole('textbox').nth(1).fill('testpass123')
      await page.getByRole('button', { name: 'login' }).click()
      // Wait for logout button to appear (indicates successful login)
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      
      await page.getByRole('textbox').first().fill('Test Blog Title')
      await page.getByRole('textbox').nth(1).fill('Test Author')
      await page.getByRole('textbox').nth(2).fill('http://testurl.com')
      await page.getByRole('button', { name: 'create' }).click()

      // Wait for blog to be added
      await page.waitForTimeout(500)
      
      // Check that blog title appears
      await expect(page.locator('strong').filter({ hasText: 'Test Blog Title' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      // Create a blog first
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('Blog to Like')
      await page.getByRole('textbox').nth(1).fill('Author')
      await page.getByRole('textbox').nth(2).fill('http://test.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.waitForTimeout(500)

      // Access the last blog item
      const lastBlogItem = page.locator('ul li').last()
      
      // View the blog
      await lastBlogItem.locator('button').filter({ hasText: 'view' }).click()
      
      // Click like button
      await lastBlogItem.locator('button').filter({ hasText: 'like' }).click()
      
      // Verify like button was clicked
      await expect(lastBlogItem.locator('button').filter({ hasText: 'like' })).toBeVisible()
    })

    test('user can delete their own blog', async ({ page }) => {
      // Create a blog
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('Blog to Delete')
      await page.getByRole('textbox').nth(1).fill('Author')
      await page.getByRole('textbox').nth(2).fill('http://test.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.waitForTimeout(500)

      // Access the last blog item
      const lastBlogItem = page.locator('ul li').last()
      
      // View the blog
      await lastBlogItem.locator('button').filter({ hasText: 'view' }).click()

      // Accept the confirmation dialog
      page.on('dialog', dialog => dialog.accept())
      
      // Click remove button
      await lastBlogItem.locator('button').filter({ hasText: 'remove' }).click()

      // Verify blog is removed
      await page.waitForTimeout(500)
      await expect(page.locator('strong').filter({ hasText: 'Blog to Delete' })).not.toBeVisible()
    })
  })
})
