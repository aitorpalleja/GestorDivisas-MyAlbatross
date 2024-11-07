import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { t } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18next.language === 'en');

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'es' : 'en';
    i18next.changeLanguage(newLanguage);
    setIsEnglish(!isEnglish);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isEnglish ? 'EN' : 'ES'}</Text>
      <Switch
        value={isEnglish}
        onValueChange={toggleLanguage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  label: {
    marginRight: 8,
    fontSize: 16,
  },
});

export default LanguageSwitch;
