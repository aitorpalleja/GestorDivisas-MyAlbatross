import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CurrencyListScreen from '../screens/CurrencyListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import CurrencyDetailScreen from '../screens/CurrencyDetailScreen';
import { Home, User } from 'lucide-react-native';
import { useThemeStore } from '../stores/themeStore';
import { CurrencyStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<CurrencyStackParamList>();

const CurrencyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CurrencyList" component={CurrencyListScreen} options={{ title: 'Currencies' }} />
    <Stack.Screen name="CurrencyDetail" component={CurrencyDetailScreen} options={{ title: 'Currency Detail' }} />
  </Stack.Navigator>
);

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
        })}
      >
        <Tab.Screen
          name="Currencies"
          component={CurrencyStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="User" component={UserProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
