import { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import { colors } from '../../constants/colors'

const MovieCard = ({ movie }) => {
  const { title, year, image_url, genre, stars } = movie
  const [imageError, setImageError] = useState(false)
  const genreLabel = Array.isArray(genre) ? genre.join(', ') : genre

  return (
    <View style={styles.card}>
      {image_url && !imageError ? (
        <Image
          source={{ uri: image_url }}
          style={styles.poster}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.poster, styles.posterFallback]}>
          <Text style={styles.posterFallbackText}>Sin imagen</Text>
        </View>
      )}

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.meta}>
          {year}
          {genreLabel ? `  ·  ${genreLabel}` : ''}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.stars}>★ {stars}</Text>
          <FavoriteButton movie={movie} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 12,
  },
  poster: {
    width: 96,
    height: 140,
    backgroundColor: colors.surface,
  },
  posterFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  posterFallbackText: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stars: {
    color: colors.goldSoft,
    fontSize: 15,
    fontWeight: '600',
  },
})

export default MovieCard
