import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import i18next from 'i18next';
import {Flag} from 'lucide-react-native';

const LanguageSwitch = () => {
  const [isEnglish, setIsEnglish] = useState(i18next.language === 'en');

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'es' : 'en';
    i18next.changeLanguage(newLanguage);
    setIsEnglish(!isEnglish);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleLanguage}
      style={styles.button}>
      <Flag size={20} color={isEnglish ? '#FFD700' : '#C70039'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2A2F33',
    borderWidth: 1,
    borderColor: '#58d3a4',
  },
});

export default LanguageSwitch;
