import axios from 'axios'
import API_URL from '../config'

const client = axios.create({
  baseURL: API_URL
})

// Obtener lista de todos los usuarios
const getUsers = async () => {
  const response = await client.get('/api/users')
  return response.data
}

// Obtener un usuario específico por ID
const getUserById = async (id) => {
  const response = await client.get(`/api/users/${id}`)
  return response.data
}

export default { getUsers, getUserById }
