import { Pressable, StyleSheet, Text } from 'react-native'
import { useFavorites } from '../../context/FavoritesContext'
import { colors } from '../../constants/colors'

const FavoriteButton = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)

  const handlePress = () => {
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        favorite ? styles.buttonActive : null,
        pressed ? styles.buttonPressed : null,
      ]}
      accessibilityRole="button"
      accessibilityLabel={
        favorite
          ? `Quitar ${movie.title} de favoritos`
          : `Agregar ${movie.title} a favoritos`
      }
    >
      <Text style={styles.icon}>{favorite ? '★' : '☆'}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonActive: {
    borderColor: colors.gold,
    backgroundColor: '#2A2308',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  icon: {
    color: colors.gold,
    fontSize: 22,
  },
})

export default FavoriteButton
