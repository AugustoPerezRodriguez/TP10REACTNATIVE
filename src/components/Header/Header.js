import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/colors'

const Header = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>CINE</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  kicker: {
    color: colors.gold,
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
})

export default Header
