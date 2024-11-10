import React, {useState} from 'react';
import {View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import {Sun, Moon, Flag, Languages} from 'lucide-react-native';
import {useThemeStore} from '../stores/themeStore';
import i18next from 'i18next';

interface FloatingMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingMenu = ({isOpen, onClose}: FloatingMenuProps) => {
  const {isDarkMode, toggleTheme, theme} = useThemeStore();
  const [animation] = useState(new Animated.Value(0));

  if (isOpen) {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const handleLanguageToggle = () => {
    const newLanguage = i18next.language === 'en' ? 'es' : 'en';
    i18next.changeLanguage(newLanguage);
    onClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    onClose();
  };

  return (
    isOpen && (
      <Animated.View
        style={[
          styles.menu,
          {
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [60, -10],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
    activeOpacity={0.7}
          onPress={handleThemeToggle}
          style={[styles.menuItem, {backgroundColor: theme.cardBackground}]}>
          {isDarkMode ? (
            <Sun size={20} color={theme.text} />
          ) : (
            <Moon size={20} color={theme.text} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
    activeOpacity={0.7}
          onPress={handleLanguageToggle}
          style={[styles.menuItem, {backgroundColor: theme.cardBackground}]}>
          <Languages size={20} color={theme.text} />
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    right: 20,
    flexDirection: 'column',
    gap: 15,
  },
  menuItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default FloatingMenu;
