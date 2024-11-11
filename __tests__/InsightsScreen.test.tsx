import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import InsightsScreen from '../src/features/insights/screens/InsightsScreen';
import {useThemeStore} from '../src/stores/themeStore';
import {useCurrencies} from '../src/services/apiClient';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../src/stores/themeStore');
jest.mock('../src/services/apiClient');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key}),
}));

describe('InsightsScreen', () => {
  beforeEach(() => {
    (useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: {
        background: '#ffffff',
        text: '#000000',
        cardBackground: '#f0f0f0',
        primary: '#6200ee',
        backgroundHeader: '#ffffff',
        border: '#cccccc',
      },
    });

    (useCurrencies as jest.Mock).mockReturnValue({
      currencies: [
        {
          code: 'USD',
          currentRate: 1.2345,
          differenceBetweenYesterdayRate: 0.0123,
        },
        {
          code: 'EUR',
          currentRate: 0.9876,
          differenceBetweenYesterdayRate: -0.0056,
        },
        {
          code: 'GBP',
          currentRate: 1.5678,
          differenceBetweenYesterdayRate: 0.0089,
        },
        {
          code: 'JPY',
          currentRate: 0.0091,
          differenceBetweenYesterdayRate: -0.0022,
        },
      ],
      isLoading: false,
      isError: false,
    });
  });

  it('debe renderizar correctamente', async () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <InsightsScreen />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByTestId('daily-highlights-title')).toBeTruthy();
    });

    expect(getByTestId('top-gainers-title')).toBeTruthy();
    expect(getByTestId('top-losers-title')).toBeTruthy();
    expect(getByTestId('global-trends-title')).toBeTruthy();
    expect(getByTestId('most-popular-currencies-title')).toBeTruthy();

    expect(getByTestId('top-gainer-USD')).toBeTruthy();
    expect(getByTestId('top-loser-EUR')).toBeTruthy();
    expect(getByTestId('popular-currency-USD')).toBeTruthy();
    expect(getByTestId('popular-currency-EUR')).toBeTruthy();
  });
});
