import { FlatList, StyleSheet } from 'react-native'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = ({ movies }) => {
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <MovieCard movie={item} />}
      keyExtractor={(item) => String(item.id)}
      style={styles.list}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
})

export default MovieList
