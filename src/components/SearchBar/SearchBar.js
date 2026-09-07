import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../../constants/colors'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Buscar películas</Text>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={onSearchChange}
        placeholder="Buscar por título o género..."
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
})

export default SearchBar
