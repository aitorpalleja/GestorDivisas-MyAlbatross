import {NavigatorScreenParams} from '@react-navigation/native';

export type CurrencyStackParamList = {
  CurrencyList: undefined;
  CurrencyDetail: {currencyCode: string};
};

export type RootTabParamList = {
  Currencies: NavigatorScreenParams<CurrencyStackParamList>;
  User: undefined;
};
