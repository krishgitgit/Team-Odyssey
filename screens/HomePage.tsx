import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, shadow, space, type } from '../theme/tokens';

const logoImage = require('../assets/odyssey/logo.png');
const clubPhoto = require('../assets/odyssey/header.jpg');

const SCREEN_W = Dimensions.get('window').width;
const H_PAD = space.lg;
const CARD_W = Math.min(SCREEN_W, 420) - H_PAD * 2;
const SNAP = CARD_W + space.md;
const AUTO_MS = 4000;

type ReelItem = {
  id: string;
  title: string;
  image: number;
};

type EventItem = {
  id: string;
  name: string;
  date: string;
  place: string;
  detail: string;
  image: number;
};

const REELS: ReelItem[] = [
  { id: 'r1', title: 'Workshop week behind the scenes', image: clubPhoto },
  { id: 'r2', title: 'Flight bay: tuning day highlights', image: clubPhoto },
  { id: 'r3', title: 'Meet the build team', image: clubPhoto },
];

const EVENTS: EventItem[] = [
  {
    id: 'e1',
    name: 'NIDAR 2026',
    date: '10–16 Jan 2026',
    place: 'Gautam Buddha University, Greater Noida',
    detail: 'National drone innovation challenge · MeitY × DFI',
    image: clubPhoto,
  },
  {
    id: 'e2',
    name: 'NIDAR 2026-27',
    date: 'Registrations open',
    place: 'India-wide · nidar.org.in',
    detail: '₹65+ lakh prize pool · autonomous drone missions',
    image: clubPhoto,
  },
];

function BellIcon() {
  return (
    <View style={iconStyles.bellWrap}>
      <View style={iconStyles.bellBody} />
      <View style={iconStyles.bellClapper} />
    </View>
  );
}

function MenuIcon() {
  return (
    <View style={iconStyles.menuWrap}>
      <View style={iconStyles.menuLine} />
      <View style={iconStyles.menuLine} />
      <View style={iconStyles.menuLine} />
    </View>
  );
}

function PlayIcon() {
  return (
    <View style={iconStyles.playCircle}>
      <View style={iconStyles.playTriangle} />
    </View>
  );
}

function AttendanceIcon() {
  return (
    <View style={[iconStyles.actionBox, { backgroundColor: '#EEF4FF' }]}>
      <View style={iconStyles.clipboard} />
    </View>
  );
}

function ProjectsIcon() {
  return (
    <View style={[iconStyles.actionBox, { backgroundColor: '#F3F4F6' }]}>
      <View style={iconStyles.folder} />
    </View>
  );
}

function ProgressIcon() {
  return (
    <View style={[iconStyles.actionBox, { backgroundColor: '#ECFDF5' }]}>
      <View style={iconStyles.barTall} />
      <View style={iconStyles.barMid} />
      <View style={iconStyles.barShort} />
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable onPress={() => {}} hitSlop={8}>
        <Text style={styles.viewAll}>View All</Text>
      </Pressable>
    </View>
  );
}

function Dots({ count, index }: { count: number; index: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
      ))}
    </View>
  );
}

function useAutoCarousel(length: number) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => {
      const next = (indexRef.current + 1) % length;
      indexRef.current = next;
      setIndex(next);
      scrollRef.current?.scrollTo({ x: next * SNAP, animated: true });
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [length]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / SNAP);
    const clamped = Math.max(0, Math.min(length - 1, i));
    indexRef.current = clamped;
    setIndex(clamped);
  };

  return { index, scrollRef, onScrollEnd };
}

export function HomePage({ onOpenAttendance }: { onOpenAttendance?: () => void }) {
  const reels = useAutoCarousel(REELS.length);
  const events = useAutoCarousel(EVENTS.length);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => {}} hitSlop={8}>
          <BellIcon />
        </Pressable>
        <Image source={logoImage} style={styles.headerLogo} resizeMode="contain" />
        <Pressable style={styles.iconBtn} onPress={() => {}} hitSlop={8}>
          <MenuIcon />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Welcome back, Krish!</Text>
          <Text style={styles.greetingSub}>Ready for today's mission?</Text>
        </View>

        <SectionHeader title="Odyssey Reels" />
        <ScrollView
          ref={reels.scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SNAP}
          snapToAlignment="start"
          disableIntervalMomentum
          contentContainerStyle={styles.carouselPad}
          onMomentumScrollEnd={reels.onScrollEnd}
        >
          {REELS.map((item, i) => (
            <View
              key={item.id}
              style={[styles.reelCard, i < REELS.length - 1 && styles.cardGap]}
            >
              <View style={styles.reelThumbWrap}>
                <Image source={item.image} style={styles.reelThumb} resizeMode="cover" />
                <View style={styles.playOverlay}>
                  <PlayIcon />
                </View>
                <View style={styles.reelsBadge}>
                  <Text style={styles.reelsBadgeText}>Reels</Text>
                </View>
              </View>
              <Text style={styles.reelTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
        <Dots count={REELS.length} index={reels.index} />

        <Text style={[styles.sectionTitle, styles.actionsHeading]}>Quick Actions</Text>
        <View style={styles.actionsList}>
          <Pressable style={styles.actionCard} onPress={() => onOpenAttendance?.()}>
            <AttendanceIcon />
            <Text style={styles.actionTitle}>Check Your Attendance</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => {}}>
            <ProjectsIcon />
            <Text style={styles.actionTitle}>Your Projects</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => {}}>
            <ProgressIcon />
            <Text style={styles.actionTitle}>Track Your Progress</Text>
          </Pressable>
        </View>

        <SectionHeader title="Upcoming Events" />
        <ScrollView
          ref={events.scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SNAP}
          snapToAlignment="start"
          disableIntervalMomentum
          contentContainerStyle={styles.carouselPad}
          onMomentumScrollEnd={events.onScrollEnd}
        >
          {EVENTS.map((item, i) => (
            <View
              key={item.id}
              style={[styles.eventCard, i < EVENTS.length - 1 && styles.cardGap]}
            >
              <View style={styles.eventThumbWrap}>
                <Image source={item.image} style={styles.eventThumb} resizeMode="cover" />
                <View style={styles.dateBadge}>
                  <Text style={styles.dateBadgeText}>{item.date}</Text>
                </View>
              </View>
              <View style={styles.eventBody}>
                <Text style={styles.eventName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.eventPlace} numberOfLines={1}>
                  {item.place}
                </Text>
                <Text style={styles.eventDetail} numberOfLines={1}>
                  {item.detail}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <Dots count={EVENTS.length} index={events.index} />
      </ScrollView>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  bellWrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bellBody: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.text,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  bellClapper: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text,
    marginTop: 1,
  },
  menuWrap: {
    width: 22,
    height: 16,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 1.5,
    backgroundColor: colors.text,
    borderRadius: 1,
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playTriangle: {
    marginLeft: 3,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: '#fff',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  actionBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  clipboard: {
    width: 16,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
  },
  folder: {
    width: 20,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#6B7280',
  },
  barTall: {
    width: 5,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#10B981',
  },
  barMid: {
    width: 5,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#34D399',
  },
  barShort: {
    width: 5,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#6EE7B7',
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: H_PAD,
    paddingTop: space.lg + 8,
    paddingBottom: space.md,
    ...shadow.header,
    zIndex: 2,
  },
  headerLogo: {
    width: 168,
    height: 52,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingBottom: 100,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  greeting: {
    paddingHorizontal: H_PAD,
    paddingTop: space.lg,
    paddingBottom: space.md,
  },
  greetingTitle: {
    fontSize: type.greeting,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  greetingSub: {
    marginTop: space.xs,
    fontSize: type.body,
    color: colors.textMuted,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    marginTop: space.md,
    marginBottom: space.sm,
  },
  sectionTitle: {
    fontSize: type.section,
    fontWeight: '700',
    color: colors.text,
  },
  viewAll: {
    fontSize: type.label,
    color: colors.textMuted,
    fontWeight: '500',
  },
  carouselPad: {
    paddingHorizontal: H_PAD,
  },
  cardGap: {
    marginRight: space.md,
  },
  reelCard: {
    width: CARD_W,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: 'hidden',
    ...shadow.card,
  },
  reelThumbWrap: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  reelThumb: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reelsBadge: {
    position: 'absolute',
    top: space.sm,
    left: space.sm,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: 8,
  },
  reelsBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  reelTitle: {
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    fontSize: type.body,
    fontWeight: '600',
    color: colors.text,
  },
  eventCard: {
    width: CARD_W,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: 'hidden',
    ...shadow.card,
  },
  eventThumbWrap: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  eventThumb: {
    width: '100%',
    height: '100%',
  },
  eventBody: {
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    gap: 4,
  },
  dateBadge: {
    position: 'absolute',
    top: space.sm,
    left: space.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dateBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  eventName: {
    fontSize: type.body,
    fontWeight: '700',
    color: colors.text,
  },
  eventPlace: {
    fontSize: type.label,
    color: colors.textMuted,
  },
  eventDetail: {
    fontSize: 12,
    color: colors.textMuted,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: space.sm,
    marginBottom: space.sm,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.divider,
  },
  dotActive: {
    backgroundColor: colors.textMuted,
  },
  actionsHeading: {
    paddingHorizontal: H_PAD,
    marginTop: space.md,
    marginBottom: space.sm,
  },
  actionsList: {
    paddingHorizontal: H_PAD,
    gap: space.md,
  },
  actionCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    paddingVertical: space.md,
    paddingHorizontal: space.md,
    gap: space.md,
    ...shadow.card,
  },
  actionTitle: {
    flex: 1,
    fontSize: type.body,
    fontWeight: '600',
    color: colors.text,
  },
});
