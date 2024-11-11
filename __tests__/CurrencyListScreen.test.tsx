import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CurrencyListScreen from '../src/features/currencies/screens/CurrencyListScreen';
import {useCurrencies} from '../src/services/apiClient';
import {useThemeStore} from '../src/stores/themeStore';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../src/services/apiClient');
jest.mock('../src/stores/themeStore');
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
describe('CurrencyListScreen', () => {
  beforeEach(() => {
    // Mockear el hook useCurrencies
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

    // Mockear el hook useThemeStore
    (useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: {
        background: '#ffffff',
        text: '#000000',
        cardBackground: '#f0f0f0',
        primary: '#6200ee',
        backgroundHeader: '#ffffff',
      },
    });
  });

  it('debe renderizar una lista de monedas', async () => {
    const {getByText, getAllByTestId} = render(
      <NavigationContainer>
        <CurrencyListScreen />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByText('USD')).toBeTruthy();
      expect(getByText('EUR')).toBeTruthy();
    });

    const currencyCards = getAllByTestId('currency-card');
    expect(currencyCards.length).toBe(2);
  });
});
it('debe navegar a CurrencyDetailScreen al presionar una moneda', async () => {
  const mockNavigate = jest.fn();
  jest
    .spyOn(require('@react-navigation/native'), 'useNavigation')
    .mockReturnValue({
      navigate: mockNavigate,
    });

  const {getByText} = render(
    <NavigationContainer>
      <CurrencyListScreen />
    </NavigationContainer>,
  );

  await waitFor(() => {
    expect(getByText('USD')).toBeTruthy();
  });

  const usdCurrency = getByText('USD');
  fireEvent.press(usdCurrency);

  expect(mockNavigate).toHaveBeenCalledWith('CurrencyDetail', {
    currencyCode: 'USD',
  });
});
