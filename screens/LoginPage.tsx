import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, radius, space, type } from '../theme/tokens';

const headerImage = require('../assets/odyssey/header.jpg');
const logoImage = require('../assets/odyssey/logo.png');

const HEADER_HEIGHT = 200;

type Props = {
  onLoginSuccess?: () => void;
};

export function LoginPage({ onLoginSuccess }: Props) {
  const [netId, setNetId] = useState('');
  const [password, setPassword] = useState('');

  const finishLogin = () => {
    onLoginSuccess?.();
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <Image source={headerImage} style={styles.header} resizeMode="cover" />

          <View style={styles.body}>
            <View style={styles.logoCard}>
              <Image source={logoImage} style={styles.logo} resizeMode="contain" />
            </View>

            <Text style={styles.welcome}>Welcome to Odyssey</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="SVV Net ID"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                value={netId}
                onChangeText={setNetId}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Pressable style={styles.forgotWrap} onPress={() => {}}>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.loginBtn, pressed && styles.pressed]}
                onPress={finishLogin}
              >
                <Text style={styles.loginBtnText}>LOGIN</Text>
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable
                style={({ pressed }) => [styles.googleBtn, pressed && styles.pressed]}
                onPress={finishLogin}
              >
                <Text style={styles.googleG}>G</Text>
                <Text style={styles.googleBtnText}>Login with Google</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: HEADER_HEIGHT,
    backgroundColor: colors.border,
  },
  body: {
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: space.lg,
    paddingBottom: space.xxl,
    marginTop: -36,
  },
  logoCard: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: {
    width: 200,
    height: 72,
  },
  welcome: {
    marginTop: space.lg,
    marginBottom: space.lg,
    textAlign: 'center',
    fontSize: type.title,
    fontWeight: '700',
    color: colors.text,
  },
  form: {
    gap: space.md,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    backgroundColor: colors.inputBg,
    paddingHorizontal: space.md,
    fontSize: type.body,
    color: colors.text,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: -space.sm,
  },
  forgot: {
    fontSize: type.label,
    color: colors.link,
    fontWeight: '500',
  },
  loginBtn: {
    height: 52,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: space.sm,
  },
  loginBtnText: {
    color: colors.primaryText,
    fontSize: type.button,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    marginVertical: space.sm,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
  dividerText: {
    fontSize: type.label,
    color: colors.textMuted,
  },
  googleBtn: {
    height: 52,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
  googleG: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
  },
  googleBtnText: {
    fontSize: type.button,
    fontWeight: '600',
    color: colors.text,
  },
  pressed: {
    opacity: 0.85,
  },
});
