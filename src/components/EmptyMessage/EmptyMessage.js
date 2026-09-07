import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/colors'

const EmptyMessage = ({
  message = 'No encontramos películas para tu búsqueda.',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  message: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
})

export default EmptyMessage
