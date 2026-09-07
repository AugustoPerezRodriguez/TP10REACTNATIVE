import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/colors'

const Loading = ({ message = 'Cargando información...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.gold} />
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
    marginTop: 12,
    textAlign: 'center',
  },
})

export default Loading
