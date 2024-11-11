import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {useThemeStore} from '../../../stores/themeStore';
import {
  useCurrencies,
  useAllCurrencyDetails,
} from '../../../services/apiClient';
import {useTranslation} from 'react-i18next';
import {HistoryEntryProps} from '../../currencies/interfaces/HistoryEntryProps';
import {CurrencyProps} from '../interfaces/CurrencyProps';

const TrendsScreen = () => {
  const {theme} = useThemeStore();
  const {
    currencies,
    isLoading: isCurrenciesLoading,
    isError: isCurrenciesError,
  } = useCurrencies();
  const {t} = useTranslation();

  const currencyCodes =
    currencies?.map((currency: CurrencyProps) => currency.code) || [];

  const {
    allCurrencyDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useAllCurrencyDetails(currencyCodes);

  if (isCurrenciesLoading || isDetailsLoading)
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          {backgroundColor: theme.background},
        ]}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color={theme.primary}
        />
      </View>
    );

  if (isCurrenciesError || isDetailsError || !currencies || !allCurrencyDetails)
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          {backgroundColor: theme.background},
        ]}>
        <Text
          testID="error-text"
          style={[styles.errorText, {color: theme.text}]}>
          {t('trends.errorLoading')}
        </Text>
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={[styles.container, {backgroundColor: theme.background}]}>
      {currencies.map((currency: CurrencyProps, index: number) => {
        const currencyDetails = allCurrencyDetails[index];

        const isPositive = currency.differenceBetweenYesterdayRate >= 0;
        const chartData = currencyDetails.history.map(
          (entry: HistoryEntryProps) => ({
            value: entry.rate,
          }),
        );

        return (
          <View
            key={currency.code}
            testID={`currency-card-${currency.code}`}
            style={[styles.card, {backgroundColor: theme.cardBackground}]}>
            <View style={styles.cardHeader}>
              <View
                testID={`trend-indicator-${currency.code}`}
                style={[
                  styles.trendIndicator,
                  {backgroundColor: isPositive ? '#22c55e' : '#ef4444'},
                ]}
              />
              <Text
                testID={`currency-code-${currency.code}`}
                style={[styles.cardTitle, {color: theme.text}]}>
                {currency.code}
              </Text>
            </View>
            <LineChart
              data={chartData}
              thickness={2}
              color={theme.primary}
              adjustToWidth
              hideDataPoints
              hideRules
              startFillColor={`${theme.primary}50`}
              endFillColor={`${theme.primary}10`}
              hideAxesAndRules={true}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
  },
});

export default TrendsScreen;
