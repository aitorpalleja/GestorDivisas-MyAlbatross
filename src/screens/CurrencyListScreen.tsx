import React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCurrencies } from '../services/apiClient';
import { useThemeStore } from '../stores/themeStore';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CurrencyStackParamList } from '../navigation/types';

const CurrencyListScreen = () => {
  const { theme } = useThemeStore();
  const { currencies, isLoading, isError } = useCurrencies();
  const navigation = useNavigation<NavigationProp<CurrencyStackParamList>>();
  console.log(currencies);
  

  if (isLoading) return <ActivityIndicator size="large" color={theme.primary} />;
  if (isError) return <Text style={{ color: theme.text }}>Error al cargar datos</Text>;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CurrencyDetail', { currencyCode: item.code })}>
            <View style={styles.item}>
              <Text style={[styles.text, { color: theme.text }]}>
                {item.code}: {item.currentRate}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default CurrencyListScreen;
