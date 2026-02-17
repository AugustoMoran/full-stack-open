const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let token

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'secreto123'
    }

    await api.post('/api/users').send(newUser)
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'secreto123' })

    token = loginResponse.body.token
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 0)
  })

  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => {
      assert.ok(blog.id, 'Blog should have id property')
      assert.strictEqual(blog._id, undefined, 'Blog should not have _id property')
    })
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Edsger W. Dijkstra',
      url: 'https://example.com',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, 1)

    const titles = blogsAtEnd.body.map(b => b.title)
    assert.ok(titles.includes('async/await simplifies making async calls'))
  })

  test('likes defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Test Author',
      url: 'https://example.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await api.get('/api/blogs')
    const addedBlog = blogsAtEnd.body.find(b => b.title === 'Blog without likes')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'https://example.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, 0)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, 0)
  })

  test('a blog can be deleted', async () => {
    const newBlog = { title: 'To Delete', author: 'Test', url: 'http://test.com' }
    const createdBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    await api
      .delete(`/api/blogs/${createdBlog.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, 0)
  })

  test('deleting non-existing blog returns 404', async () => {
    const nonExistingId = '507f1f77bcf86cd799439011'
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('a blog can be updated', async () => {
    const newBlog = { title: 'To Update', author: 'Test', url: 'http://test.com', likes: 5 }
    const createdBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const updatedLikes = { likes: 10 }
    const response = await api.put(`/api/blogs/${createdBlog.body.id}`).send(updatedLikes).expect(200)

    assert.strictEqual(response.body.likes, 10)
    assert.strictEqual(response.body.title, 'To Update')
  })

  test('updating non-existing blog returns 404', async () => {
    const nonExistingId = '507f1f77bcf86cd799439011'
    const updatedLikes = { likes: 10 }
    await api.put(`/api/blogs/${nonExistingId}`).send(updatedLikes).expect(404)
  })

  test('adding a blog fails with 401 if token missing', async () => {
    const newBlog = {
      title: 'No Token Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, 0)
  })
})

after(async () => {
  await mongoose.connection.close()
})