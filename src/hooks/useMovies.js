import { useEffect, useState } from 'react'
import { getMovies } from '../services/api'

export const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMovies()

      if (!Array.isArray(data)) {
        throw new Error('La API no devolvió un listado válido')
      }

      setMovies(data)
    } catch (err) {
      console.error('Error al obtener las películas:', err)
      setError('No se pudo cargar la información. Intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return { movies, loading, error, reloadMovies: loadMovies }
}
