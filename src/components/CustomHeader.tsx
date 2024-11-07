import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useThemeStore} from '../stores/themeStore';
import {useUserData} from '../services/apiClient';

const CustomHeader = () => {
  const {theme} = useThemeStore();
  const {userData} = useUserData();

  if (!userData) return null;

  const nameParts = userData.name.split(' ');
  const firstName = nameParts[0];
  const initials =
    nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : '');

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundHeader}]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.userInfo}>
        <Text style={[styles.greeting, {color: theme.text}]}>Hi,</Text>
        <Text style={[styles.name, {color: theme.text}]}>{firstName}</Text>
      </View>
      <View style={[styles.initialsBox, {backgroundColor: theme.primary}]}>
        <Text style={[styles.initialsText, {color: theme.background}]}>
          {initials.toUpperCase()}
        </Text>
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
    width: 130,
    height: 40,
    resizeMode: 'contain',
  },
  userInfo: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
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