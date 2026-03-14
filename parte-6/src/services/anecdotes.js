import axios from 'axios'

const baseUrl = import.meta.env.VITE_ANECDOTES_BASE_URL ?? 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const update = async (id, anecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, anecdote)
  return response.data
}

export default {
  getAll,
  createNew,
  update
}
