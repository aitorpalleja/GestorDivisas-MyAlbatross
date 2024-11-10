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
import {useCurrencies} from '../../../services/apiClient';
import {useTranslation} from 'react-i18next';
import {CurrencyProps} from '../interfaces/CurrencyProps';

const InsightsScreen = () => {
  const {theme} = useThemeStore();
  const {currencies, isLoading, isError} = useCurrencies();
  const {t} = useTranslation();

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
          {t('insights.errorLoading')}
        </Text>
      </View>
    );

  const sortedCurrencies = [...currencies].sort(
    (a, b) =>
      Math.abs(b.differenceBetweenYesterdayRate) -
      Math.abs(a.differenceBetweenYesterdayRate),
  );

  const topGainers = sortedCurrencies.slice(0, 3);
  const topLosers = sortedCurrencies.slice(-3);

  const averageChange =
    currencies.reduce(
      (acc: number, curr: CurrencyProps) =>
        acc + curr.differenceBetweenYesterdayRate,
      0,
    ) / currencies.length;

  const chartData = currencies.map((currency: CurrencyProps) => ({
    value: currency.currentRate,
    label: currency.code,
  }));

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.text}]}>
          {t('insights.dailyHighlights')}
        </Text>
        <View style={styles.cardContainer}>
          <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
            <Text style={[styles.cardTitle, {color: theme.text}]}>
              {t('insights.topGainers')}
            </Text>
            {topGainers.map(currency => (
              <Text
                key={currency.code}
                style={[styles.cardText, {color: '#22c55e'}]}>
                {currency.code}: +
                {currency.differenceBetweenYesterdayRate.toFixed(4)}
              </Text>
            ))}
          </View>
          <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
            <Text style={[styles.cardTitle, {color: theme.text}]}>
              {t('insights.topLosers')}
            </Text>
            {topLosers.map(currency => (
              <Text
                key={currency.code}
                style={[styles.cardText, {color: '#ef4444'}]}>
                {currency.code}:{' '}
                {currency.differenceBetweenYesterdayRate.toFixed(4)}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.text}]}>
          {t('insights.globalTrends')}
        </Text>
        <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
          <Text style={[styles.cardText, {color: theme.text}]}>
            {t('insights.averageChange')}: {averageChange.toFixed(4)}
          </Text>
        </View>
        <LineChart
          data={chartData}
          thickness={2}
          color={theme.primary}
          adjustToWidth
          hideDataPoints
          startFillColor={`${theme.primary}50`}
          endFillColor={`${theme.primary}10`}
          initialSpacing={10}
          yAxisColor={theme.text}
          xAxisColor={theme.text}
          yAxisTextStyle={{color: theme.text}}
          xAxisLabelTextStyle={{color: theme.text}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.text}]}>
          {t('insights.mostPopularCurrencies')}
        </Text>
        <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
          {currencies.slice(0, 5).map((currency: CurrencyProps) => (
            <Text
              key={currency.code}
              style={[styles.cardText, {color: theme.text}]}>
              {currency.code}: {currency.currentRate.toFixed(4)}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    padding: 10,
    borderRadius: 8,
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
  cardText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});

export default InsightsScreen;
