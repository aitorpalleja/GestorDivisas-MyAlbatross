import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrencyListScreen from '../screens/CurrencyListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { Home, User } from 'lucide-react-native';
import { useThemeStore } from '../stores/themeStore';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme } = useThemeStore();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Currencies"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Currencies') {
              return <Home color={color} size={size} />;
            } else if (route.name === 'User') {
              return <User color={color} size={size} />;
            }
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {
            color: theme.text,
          },
        })}
      >
        <Tab.Screen name="Currencies" component={CurrencyListScreen} />
        <Tab.Screen name="User" component={UserProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
