import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage'
import { useFavorites } from '../../context/FavoritesContext'
import { colors } from '../../constants/colors'

const FavoritesScreen = () => {
  const { favorites } = useFavorites()
  const count = favorites.length

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Header title="Mis favoritas" subtitle="Las películas que guardaste" />
        <Text style={styles.count}>
          {count === 0
            ? 'Ninguna película guardada'
            : `${count} ${count === 1 ? 'película guardada' : 'películas guardadas'}`}
        </Text>

        {count === 0 ? (
          <EmptyMessage message="Aún no agregaste películas. Tocá la estrella en una tarjeta para guardarla." />
        ) : (
          <MovieList movies={favorites} />
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
  count: {
    color: colors.textMuted,
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
})

export default FavoritesScreen
