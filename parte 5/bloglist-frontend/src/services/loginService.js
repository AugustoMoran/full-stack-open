import axios from 'axios'
import API_URL from '../config'

const client = axios.create({
  baseURL: API_URL
})

const login = async (username, password) => {
  try {
    const response = await client.post('/api/login', { username, password })
    return response.data
  } catch {
    throw new Error('Invalid credentials')
  }
}

export default { login }
