import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import TrendsScreen from '../src/features/trends/screens/TrendsScreen';
import {useThemeStore} from '../src/stores/themeStore';
import {useCurrencies, useAllCurrencyDetails} from '../src/services/apiClient';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../src/stores/themeStore');
jest.mock('../src/services/apiClient');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('TrendsScreen', () => {
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
      ],
      isLoading: false,
      isError: false,
    });

    (useAllCurrencyDetails as jest.Mock).mockReturnValue({
      allCurrencyDetails: [
        {
          history: [
            {date: '2023-10-01', rate: 1.2},
            {date: '2023-10-02', rate: 1.21},
            {date: '2023-10-03', rate: 1.22},
          ],
        },
        {
          history: [
            {date: '2023-10-01', rate: 0.98},
            {date: '2023-10-02', rate: 0.985},
            {date: '2023-10-03', rate: 0.99},
          ],
        },
      ],
      isLoading: false,
      isError: false,
    });
  });

  it('debe renderizar correctamente', async () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <TrendsScreen />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByTestId('currency-card-USD')).toBeTruthy();
      expect(getByTestId('currency-card-EUR')).toBeTruthy();

      expect(getByTestId('trend-indicator-USD')).toBeTruthy();
      expect(getByTestId('trend-indicator-EUR')).toBeTruthy();

      expect(getByTestId('currency-code-USD')).toBeTruthy();
      expect(getByTestId('currency-code-EUR')).toBeTruthy();
    });
  });
});
