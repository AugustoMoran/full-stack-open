import axios from 'axios'

const baseUrl = '/api/blogs'

// Ejercicio 7.18-7.19: Comments
// Servicios para obtener y crear comentarios

const getComments = async (blogId) => {
  try {
    const response = await axios.get(`${baseUrl}/${blogId}/comments`)
    return response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

const createComment = async (blogId, commentData) => {
  try {
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentData)
    return response.data
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}

export default {
  getComments,
  createComment
}
