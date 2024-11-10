import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, User, BarChart3, Settings, TrendingUp} from 'lucide-react-native';
import CurrencyListScreen from '../screens/CurrencyListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import CurrencyDetailScreen from '../screens/CurrencyDetailScreen';
import InsightsScreen from '../screens/InsightsScreen';
import CustomHeader from '../components/CustomHeader';
import FloatingMenu from '../components/FloatingMenu';
import {useThemeStore} from '../stores/themeStore';
import TrendsScreen from '../screens/TrendsScreen';
import {useTranslation} from 'react-i18next';
import SplashScreen from '../screens/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CurrencyStack = () => {
  const {theme} = useThemeStore();
  const {t} = useTranslation();

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
          title: t('currencyDetail.title'),
          headerStyle: {backgroundColor: theme.background},
          headerTitleStyle: {color: theme.text},
          headerTintColor: theme.text,
        }}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  const {theme} = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Currencies"
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'Currencies') {
              return <Home color={color} size={size} />;
            } else if (route.name === 'User') {
              return <User color={color} size={size} />;
            } else if (route.name === 'Insights') {
              return <BarChart3 color={color} size={size} />;
            } else if (route.name === 'Trends') {
              return <TrendingUp color={color} size={size} />;
            } else if (route.name === 'Settings') {
              return <Settings color={color} size={size} />;
            }
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: theme.backgroundHeader,
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
          name="Insights"
          component={InsightsScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Tab.Screen
          name="Trends"
          component={TrendsScreen}
          options={{
            header: () => <CustomHeader />,
          }}
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
    </>
  );
};

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <Stack.Screen name="MainApp" component={MainApp} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
