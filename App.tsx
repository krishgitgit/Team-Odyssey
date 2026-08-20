import { StatusBar } from 'expo-status-bar';
import { LoginPage } from './screens/LoginPage';

export default function App() {
  return (
    <>
      <LoginPage />
      <StatusBar style="dark" />
    </>
  );
}
