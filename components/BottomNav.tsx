import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, shadow, space, type } from '../theme/tokens';

type Tab = 'home' | 'missions';

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
  onHelp?: () => void;
};

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? colors.text : colors.textMuted;
  return (
    <View style={[iconStyles.homeOuter, { borderColor: c }]}>
      <View style={[iconStyles.homeRoof, { borderBottomColor: c }]} />
      <View style={[iconStyles.homeDoor, { backgroundColor: c }]} />
    </View>
  );
}

function MissionsIcon({ active }: { active: boolean }) {
  const c = active ? colors.text : colors.textMuted;
  return (
    <View style={iconStyles.missionsWrap}>
      <View style={[iconStyles.missionsRing, { borderColor: c }]} />
      <View style={[iconStyles.missionsDot, { backgroundColor: c }]} />
    </View>
  );
}

export function BottomNav({ active, onChange, onHelp }: Props) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.item} onPress={() => onChange('home')}>
        <HomeIcon active={active === 'home'} />
        <Text style={[styles.label, active === 'home' && styles.labelActive]}>Home</Text>
      </Pressable>

      <Pressable style={styles.helpWrap} onPress={onHelp ?? (() => {})} hitSlop={6}>
        <View style={styles.helpCircle}>
          <Text style={styles.helpMark}>?</Text>
        </View>
      </Pressable>

      <Pressable style={styles.item} onPress={() => onChange('missions')}>
        <MissionsIcon active={active === 'missions'} />
        <Text style={[styles.label, active === 'missions' && styles.labelActive]}>
          Missions
        </Text>
      </Pressable>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  homeOuter: {
    width: 22,
    height: 18,
    borderWidth: 1.5,
    borderRadius: 3,
    borderTopWidth: 0,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 3,
  },
  homeRoof: {
    position: 'absolute',
    top: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeDoor: {
    width: 6,
    height: 8,
    borderRadius: 1,
  },
  missionsWrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionsRing: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
  },
  missionsDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
  },
});

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: space.sm,
    paddingBottom: space.md,
    ...shadow.nav,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  helpWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  helpCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    ...shadow.card,
  },
  helpMark: {
    color: colors.primaryText,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
  },
  label: {
    fontSize: type.label,
    color: colors.textMuted,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.text,
    fontWeight: '700',
  },
});
