import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useThemeStore } from '../stores/themeStore';

const DarkModeSwitch = () => {
  const { isDarkMode, toggleTheme, theme } = useThemeStore();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? theme.primary : '#f4f3f4'}
        trackColor={{ false: '#767577', true: theme.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default DarkModeSwitch;
