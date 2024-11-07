import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LanguageSwitch from '../components/LanguageSwitch';
import { useTranslation } from 'react-i18next';

const UserProfileScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <LanguageSwitch />
      <Text style={styles.title}>{t('user.profile')}</Text>
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
  },
});

export default UserProfileScreen;
