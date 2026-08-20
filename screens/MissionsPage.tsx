import { StyleSheet, Text, View } from 'react-native';
import { colors, space, type } from '../theme/tokens';

export function MissionsPage() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Missions</Text>
      <Text style={styles.sub}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    paddingBottom: 80,
  },
  title: {
    fontSize: type.title,
    fontWeight: '700',
    color: colors.text,
  },
  sub: {
    marginTop: space.sm,
    fontSize: type.body,
    color: colors.textMuted,
  },
});
