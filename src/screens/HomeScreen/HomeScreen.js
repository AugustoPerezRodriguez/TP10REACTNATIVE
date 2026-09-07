import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import MovieList from '../../components/MovieList/MovieList'
import Loading from '../../components/Loading/Loading'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage'
import { useMovies } from '../../hooks/useMovies'
import { colors } from '../../constants/colors'

const HomeScreen = () => {
  const { movies, loading, error, reloadMovies } = useMovies()
  const [searchTerm, setSearchTerm] = useState('')

  const term = searchTerm.trim().toLowerCase()
  const filteredMovies = movies.filter((movie) => {
    if (!term) return true

    const titleMatch = movie.title?.toLowerCase().includes(term)
    const genreMatch = Array.isArray(movie.genre)
      ? movie.genre.some((genre) => genre.toLowerCase().includes(term))
      : false

    return titleMatch || genreMatch
  })

  const showSearch = !loading && !error

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Header
          title="Explorador de Películas"
          subtitle="Descubrí títulos, géneros y tus favoritas"
        />

        {showSearch && (
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        )}

        {loading && <Loading />}

        {error && <ErrorMessage message={error} onRetry={reloadMovies} />}

        {!loading && !error && filteredMovies.length === 0 && (
          <EmptyMessage message="No encontramos películas para tu búsqueda." />
        )}

        {!loading && !error && filteredMovies.length > 0 && (
          <MovieList movies={filteredMovies} />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})

export default HomeScreen
