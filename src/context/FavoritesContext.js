import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const isFavorite = (movieId) =>
    favorites.some((favorite) => favorite.id === movieId)

  const addFavorite = (movie) => {
    setFavorites((current) => {
      const alreadyExists = current.some((item) => item.id === movie.id)
      if (alreadyExists) return current
      return [...current, movie]
    })
  }

  const removeFavorite = (movieId) => {
    setFavorites((current) => current.filter((item) => item.id !== movieId))
  }

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}
