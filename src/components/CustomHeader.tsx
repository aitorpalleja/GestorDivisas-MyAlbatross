import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useThemeStore } from '../stores/themeStore';
import { useUserData } from '../services/apiClient';

const CustomHeader = () => {
  const { theme } = useThemeStore();
  const { userData } = useUserData();

  if (!userData) return null;

  const initials = `${userData.name.charAt(0)}${userData.username.charAt(0)}`;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: 'https://myalbatross.ai/images/logo.svg' }} style={styles.logo} />
      <View style={styles.userInfo}>
        <Text style={[styles.greeting, { color: theme.text }]}>Hi,</Text>
        <Text style={[styles.name, { color: theme.text }]}>{userData.name}</Text>
      </View>
      <View style={[styles.initialsBox, { backgroundColor: theme.primary }]}>
        <Text style={[styles.initialsText, { color: theme.background }]}>{initials}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '400',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  initialsBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
