import axios from 'axios'

export const API_BASE_URL = 'https://devsapihub.com/api-movies'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const getMovies = async () => {
  const response = await apiClient.get('')
  return response.data
}
