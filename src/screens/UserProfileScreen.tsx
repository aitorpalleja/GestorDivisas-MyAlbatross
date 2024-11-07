import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useUserData } from '../services/apiClient';
import { useThemeStore } from '../stores/themeStore';
import LanguageSwitch from '../components/LanguageSwitch';
import DarkModeSwitch from '../components/DarkModeSwitch';
import { useTranslation } from 'react-i18next';

const UserProfileScreen = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const { userData, isLoading, isError } = useUserData();

  if (isLoading) return <ActivityIndicator size="large" color={theme.primary} />;
  if (isError) return <Text style={{ color: theme.text }}>Error al cargar datos</Text>;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{t('user.profile')}</Text>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.text, { color: theme.text }]}>Name: {userData.name}</Text>
        <Text style={[styles.text, { color: theme.text }]}>Username: {userData.username}</Text>
        <Text style={[styles.text, { color: theme.text }]}>Email: {userData.email}</Text>
        <Text style={[styles.text, { color: theme.text }]}>Birth Date: {userData.birthDate}</Text>
      </View>

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
  infoContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  switchContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#333',
    alignSelf: 'center',
    width: '90%',
  },
});

export default UserProfileScreen;
