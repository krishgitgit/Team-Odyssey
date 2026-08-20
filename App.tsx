import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BottomNav } from './components/BottomNav';
import { AttendancePage } from './screens/AttendancePage';
import { HomePage } from './screens/HomePage';
import { LoginPage } from './screens/LoginPage';
import { MissionsPage } from './screens/MissionsPage';
import { colors } from './theme/tokens';

type Tab = 'home' | 'missions';
type Screen = 'tabs' | 'attendance';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const [screen, setScreen] = useState<Screen>('tabs');

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
        <StatusBar style="dark" />
      </>
    );
  }

  if (screen === 'attendance') {
    return (
      <>
        <AttendancePage onBack={() => setScreen('tabs')} />
        <StatusBar style="dark" />
      </>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {tab === 'home' ? (
          <HomePage onOpenAttendance={() => setScreen('attendance')} />
        ) : (
          <MissionsPage />
        )}
      </View>
      <BottomNav active={tab} onChange={setTab} />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
  },
});
