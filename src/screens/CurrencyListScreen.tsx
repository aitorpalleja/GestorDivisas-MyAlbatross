import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCurrencies } from '../services/apiClient';
import { useThemeStore } from '../stores/themeStore';
import CurrencyCard from '../components/CurrencyCard';

const CurrencyListScreen = () => {
  const { theme } = useThemeStore();
  const { currencies, isLoading, isError } = useCurrencies();
  const navigation = useNavigation<NavigationProp<any>>();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={[styles.error, { color: theme.text }]}>Error al cargar datos</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.code}
        numColumns={2}
        renderItem={({ item }) => (
          <CurrencyCard
            code={item.code}
            currentRate={item.currentRate}
            difference={item.differenceBetweenYesterdayRate}
            onPress={() => navigation.navigate('CurrencyDetail', { currencyCode: item.code })}
            theme={{
              cardBackground: theme.cardBackground,
              text: theme.text,
            }}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 12,
  },
  error: {
    fontSize: 16,
  },
});

export default CurrencyListScreen;
