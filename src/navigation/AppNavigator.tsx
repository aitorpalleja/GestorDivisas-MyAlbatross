import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, User, Settings} from 'lucide-react-native';
import CurrencyListScreen from '../screens/CurrencyListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import CurrencyDetailScreen from '../screens/CurrencyDetailScreen';
import CustomHeader from '../components/CustomHeader';
import FloatingMenu from '../components/FloatingMenu';
import {useThemeStore} from '../stores/themeStore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CurrencyStack = () => {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CurrencyList"
        component={CurrencyListScreen}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="CurrencyDetail"
        component={CurrencyDetailScreen}
        options={{
          title: 'Currency Detail',
          headerStyle: {backgroundColor: theme.background},
          headerTitleStyle: {color: theme.text},
          headerTintColor: theme.text,
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const {theme} = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Currencies"
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'Currencies') {
              return <Home color={color} size={size} />;
            } else if (route.name === 'User') {
              return <User color={color} size={size} />;
            } else if (route.name === 'Settings') {
              return <Settings color={color} size={size} />;
            }
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Currencies"
          component={CurrencyStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="User"
          component={UserProfileScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Tab.Screen
          name="Settings"
          listeners={{
            tabPress: e => {
              e.preventDefault();
              setIsMenuOpen(prev => !prev);
            },
          }}>
          {() => null}
        </Tab.Screen>
      </Tab.Navigator>

      <FloatingMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </NavigationContainer>
  );
};

export default AppNavigator;
