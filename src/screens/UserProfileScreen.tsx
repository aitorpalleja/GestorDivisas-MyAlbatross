import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useThemeStore } from '../stores/themeStore';
import LanguageSwitch from '../components/LanguageSwitch';
import { useTranslation } from 'react-i18next';

const UserProfileScreen = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme, theme } = useThemeStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LanguageSwitch />
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { color: theme.text }]}>{t('user.profile')}</Text>
        <Text style={{ color: theme.text }}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  switchContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
