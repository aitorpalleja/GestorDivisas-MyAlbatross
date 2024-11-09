import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {useThemeStore} from '../stores/themeStore';
import {useCurrencies} from '../services/apiClient';
import {useTranslation} from 'react-i18next';

type Currency = {
  code: string;
  currentRate: number;
  differenceBetweenYesterdayRate: number;
};

type CurrencyDetail = {
  history: {rate: number; date: string}[];
};

const fetchCurrencyDetails = async (code: string): Promise<CurrencyDetail> => {
  const response = await fetch(
    `https://myalbatross-technical-proof-api.pages.dev/currencies/${code}`,
  );
  return response.json();
};

const TrendsScreen = () => {
  const {theme} = useThemeStore();
  const {currencies, isLoading, isError} = useCurrencies();
  const [currencyDetails, setCurrencyDetails] = useState<
    Record<string, CurrencyDetail>
  >({});
  const [loadingDetails, setLoadingDetails] = useState(true);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchAllDetails = async () => {
      const details: Record<string, CurrencyDetail> = {};
      for (const currency of currencies) {
        const detail = await fetchCurrencyDetails(currency.code);
        details[currency.code] = detail;
      }
      setCurrencyDetails(details);
      setLoadingDetails(false);
    };

    if (currencies.length > 0) {
      fetchAllDetails();
    }
  }, [currencies]);

  if (isLoading || loadingDetails)
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
          {t('trends.errorLoading')}
        </Text>
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.title, {color: theme.text}]}>
        {t('trends.title')}
      </Text>

      {currencies.map((currency: Currency) => {
        const detail = currencyDetails[currency.code];
        if (!detail) return null;

        const isPositive = currency.differenceBetweenYesterdayRate >= 0;
        const chartData = detail.history.map(entry => ({
          value: entry.rate,
        }));

        return (
          <View
            key={currency.code}
            style={[styles.card, {backgroundColor: theme.cardBackground}]}>
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.trendIndicator,
                  {backgroundColor: isPositive ? '#22c55e' : '#ef4444'},
                ]}
              />
              <Text style={[styles.cardTitle, {color: theme.text}]}>
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
