import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  attendancePercent,
  formatDayHeading,
  formatDuration,
  groupSessionsByDate,
  intensityLevel,
  monthDays,
  sessions,
  totalMinutes,
  weekDays,
  type DaySummary,
} from '../data/attendanceSample';
import { colors, radius, shadow, space, type } from '../theme/tokens';

type Range = 'week' | 'month';

type Props = {
  onBack: () => void;
};

const INTENSITY = ['#EBEDF0', '#C5CAD3', '#8B929E', '#4B5563', '#111111'] as const;

const GAUGE_W = 280;
const GAUGE_H = 150;
const CX = GAUGE_W / 2;
const CY = GAUGE_H - 8;
const RADIUS = 108;

function Gauge({ days }: { days: DaySummary[] }) {
  const n = days.length;
  const barW = n > 14 ? 4 : 8;
  const barH = n > 14 ? 22 : 32;

  return (
    <View style={styles.gauge}>
      {days.map((day, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const angleDeg = -90 + t * 180;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = CX + RADIUS * Math.sin(angleRad);
        const y = CY - RADIUS * Math.cos(angleRad);
        const level = intensityLevel(day.minutes);
        return (
          <View
            key={day.date}
            style={[
              styles.gaugeBar,
              {
                width: barW,
                height: barH,
                borderRadius: barW / 2,
                backgroundColor: INTENSITY[level],
                left: x - barW / 2,
                top: y - barH / 2,
                transform: [{ rotate: `${angleDeg}deg` }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

export function AttendancePage({ onBack }: Props) {
  const [range, setRange] = useState<Range>('week');
  const days = range === 'week' ? weekDays : monthDays;
  const percent = attendancePercent(days);
  const hoursLabel = formatDuration(totalMinutes(days));
  const periodLabel = range === 'week' ? 'This Week' : 'This Month';
  const grouped = useMemo(() => groupSessionsByDate(sessions), []);

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={onBack} hitSlop={8}>
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <Text style={styles.topTitle}>Attendance</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attendance</Text>
          <Text style={styles.cardHint}>Time spent inside the club</Text>

          <View style={styles.toggle}>
            <Pressable
              style={[styles.toggleItem, range === 'week' && styles.toggleActive]}
              onPress={() => setRange('week')}
            >
              <Text style={[styles.toggleText, range === 'week' && styles.toggleTextActive]}>
                Week
              </Text>
            </Pressable>
            <Pressable
              style={[styles.toggleItem, range === 'month' && styles.toggleActive]}
              onPress={() => setRange('month')}
            >
              <Text style={[styles.toggleText, range === 'month' && styles.toggleTextActive]}>
                Month
              </Text>
            </Pressable>
          </View>

          <View style={styles.gaugeWrap}>
            <Gauge days={days} />
            <View style={styles.gaugeCenter} pointerEvents="none">
              <Text style={styles.percent}>{percent}%</Text>
              <Text style={styles.percentCaption}>{periodLabel}</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryChip}>
              <Text style={styles.summaryLabel}>{periodLabel}</Text>
              <Text style={styles.summaryValue}>{percent}%</Text>
            </View>
            <View style={styles.summaryChip}>
              <Text style={styles.summaryLabel}>Total hours</Text>
              <Text style={styles.summaryValue}>{hoursLabel}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.recordsHeading}>Daily records</Text>

        {grouped.map((group) => (
          <View key={group.date} style={styles.dayBlock}>
            <Text style={styles.dayHeading}>{formatDayHeading(group.date)}</Text>
            <View style={styles.tableCard}>
              <View style={styles.tableHeader}>
                <Text style={[styles.col, styles.colHead]}>Check-in</Text>
                <Text style={[styles.col, styles.colHead]}>Check-out</Text>
                <Text style={[styles.col, styles.colHead]}>Work Duration</Text>
              </View>
              {group.sessions.map((s) => (
                <View key={s.id} style={styles.tableRow}>
                  <Text style={styles.col}>{s.checkIn}</Text>
                  <Text style={styles.col}>{s.checkOut}</Text>
                  <Text style={styles.col}>{formatDuration(s.durationMinutes)}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: space.md,
    paddingTop: space.lg + 8,
    paddingBottom: space.md,
    ...shadow.header,
    zIndex: 2,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.text,
    fontWeight: '300',
  },
  topTitle: {
    fontSize: type.section,
    fontWeight: '700',
    color: colors.text,
  },
  scroll: {
    padding: space.lg,
    paddingBottom: space.xxl,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: space.lg,
    ...shadow.card,
  },
  cardTitle: {
    fontSize: type.section,
    fontWeight: '700',
    color: colors.text,
  },
  cardHint: {
    marginTop: 2,
    fontSize: type.label,
    color: colors.textMuted,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderRadius: radius.input,
    padding: 4,
    marginTop: space.md,
  },
  toggleItem: {
    flex: 1,
    paddingVertical: space.sm,
    alignItems: 'center',
    borderRadius: radius.input - 2,
  },
  toggleActive: {
    backgroundColor: colors.surface,
    ...shadow.header,
  },
  toggleText: {
    fontSize: type.label,
    fontWeight: '500',
    color: colors.textMuted,
  },
  toggleTextActive: {
    color: colors.text,
    fontWeight: '700',
  },
  gaugeWrap: {
    alignItems: 'center',
    marginTop: space.lg,
    height: GAUGE_H + 28,
  },
  gauge: {
    width: GAUGE_W,
    height: GAUGE_H,
    position: 'relative',
  },
  gaugeBar: {
    position: 'absolute',
  },
  gaugeCenter: {
    position: 'absolute',
    bottom: 8,
    alignItems: 'center',
  },
  percent: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  percentCaption: {
    marginTop: 2,
    fontSize: type.label,
    color: colors.textMuted,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: space.md,
    marginTop: space.lg,
  },
  summaryChip: {
    flex: 1,
    backgroundColor: colors.bg,
    borderRadius: radius.input,
    paddingVertical: space.md,
    paddingHorizontal: space.md,
  },
  summaryLabel: {
    fontSize: type.label,
    color: colors.textMuted,
  },
  summaryValue: {
    marginTop: 4,
    fontSize: type.title,
    fontWeight: '700',
    color: colors.text,
  },
  recordsHeading: {
    marginTop: space.xl,
    marginBottom: space.md,
    fontSize: type.section,
    fontWeight: '700',
    color: colors.text,
  },
  dayBlock: {
    marginBottom: space.lg,
  },
  dayHeading: {
    fontSize: type.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: space.sm,
  },
  tableCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    ...shadow.card,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: space.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  col: {
    flex: 1,
    fontSize: type.label,
    color: colors.text,
    textAlign: 'center',
  },
  colHead: {
    fontWeight: '600',
    color: colors.textMuted,
  },
});
