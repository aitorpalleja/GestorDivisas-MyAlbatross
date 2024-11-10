import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Moon, Sun} from 'lucide-react-native';
import {useThemeStore} from '../../../stores/themeStore';

const DarkModeSwitch = () => {
  const {isDarkMode, toggleTheme, theme} = useThemeStore();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleTheme}
      style={styles.button}>
      {isDarkMode ? (
        <Moon size={20} color="#FFD700" />
      ) : (
        <Sun size={20} color="#FFA500" />
      )}
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

export default DarkModeSwitch;
