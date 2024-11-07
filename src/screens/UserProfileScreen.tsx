// src/screens/UserProfileScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LanguageSwitch from '../components/LanguageSwitch';
import DarkModeSwitch from '../components/DarkModeSwitch';
import {useThemeStore} from '../stores/themeStore';
import {useTranslation} from 'react-i18next';

const UserProfileScreen = () => {
  const {theme} = useThemeStore();
  const {t} = useTranslation();

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.title, {color: theme.text}]}>
        {t('user.profile')}
      </Text>

      <View style={styles.switchContainer}>
        <LanguageSwitch />
        <DarkModeSwitch />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  switchContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#333', 
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '90%',
  },
});

export default UserProfileScreen;
