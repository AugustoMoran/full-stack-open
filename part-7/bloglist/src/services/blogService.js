import axios from 'axios'
import API_URL from '../config'

const client = axios.create({
  baseURL: API_URL
})

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

const getBlogs = async (token) => {
  const response = await client.get('/api/blogs', getConfig(token))
  return response.data
}

const create = async (token, blogData) => {
  const response = await client.post('/api/blogs', blogData, getConfig(token))
  return response.data
}

const update = async (token, id, blogData) => {
  const response = await client.put(`/api/blogs/${id}`, blogData, getConfig(token))
  return response.data
}

const deleteBlog = async (token, id) => {
  const response = await client.delete(`/api/blogs/${id}`, getConfig(token))
  return response.data
}

export default { getBlogs, create, update, deleteBlog }
