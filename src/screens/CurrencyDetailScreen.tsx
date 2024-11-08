import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useCurrencyDetails} from '../services/apiClient';
import {LineChart} from 'react-native-gifted-charts';
import {useThemeStore} from '../stores/themeStore';
import {CurrencyStackParamList} from '../navigation/types';

interface HistoryEntry {
  rate: number;
  date: string;
}

const CurrencyDetailScreen = () => {
  const route = useRoute<RouteProp<CurrencyStackParamList, 'CurrencyDetail'>>();
  const {currencyCode} = route.params;
  const {theme} = useThemeStore();
  const {currencyDetails, isLoading, isError} =
    useCurrencyDetails(currencyCode);

  if (isLoading)
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          {backgroundColor: theme.background},
        ]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );

  if (isError)
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          {backgroundColor: theme.background},
        ]}>
        <Text style={[styles.errorText, {color: theme.text}]}>
          Error al cargar detalles de la divisa
        </Text>
      </View>
    );

  const chartData = currencyDetails.history.map((entry: HistoryEntry) => ({
    value: entry.rate,
    label: entry.date.slice(5),
  }));

  const maxRate = Math.max(
    ...currencyDetails.history.map((entry: HistoryEntry) => entry.rate),
  );
  const minRate = Math.min(
    ...currencyDetails.history.map((entry: HistoryEntry) => entry.rate),
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.title, {color: theme.text}]}>
        {currencyDetails.code} Details
      </Text>

      <LineChart
        data={chartData}
        thickness={2}
        color={theme.primary}
        adjustToWidth
        hideDataPoints
        startFillColor={`${theme.primary}50`}
        endFillColor={`${theme.primary}10`}
        initialSpacing={10}
        xAxisColor={theme.text}
        yAxisColor={theme.text}
        yAxisTextStyle={{color: theme.text}}
      />

      <View style={styles.cardsContainer}>
        <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
          <Text style={[styles.cardTitle, {color: theme.text}]}>
            Current Rate
          </Text>
          <Text style={[styles.cardValue, {color: theme.primary}]}>
            {currencyDetails.currentRate.toFixed(4)}
          </Text>
        </View>
        <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
          <Text style={[styles.cardTitle, {color: theme.text}]}>
            Change (Yesterday)
          </Text>
          <Text
            style={[
              styles.cardValue,
              {
                color:
                  currencyDetails.differenceBetweenYesterdayRate >= 0
                    ? '#22c55e'
                    : '#ef4444',
              },
            ]}>
            {currencyDetails.differenceBetweenYesterdayRate.toFixed(4)}
          </Text>
        </View>
        <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
          <Text style={[styles.cardTitle, {color: theme.text}]}>Max / Min</Text>
          <Text style={[styles.cardValue, {color: theme.text}]}>
            {maxRate.toFixed(4)} / {minRate.toFixed(4)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cardsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    width: '30%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CurrencyDetailScreen;
