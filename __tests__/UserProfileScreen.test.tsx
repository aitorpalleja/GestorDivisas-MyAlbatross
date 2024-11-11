import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import UserProfileScreen from '../src/features/user/screens/UserProfileScreen';
import {useThemeStore} from '../src/stores/themeStore';
import {useUserData} from '../src/services/apiClient';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../src/stores/themeStore');
jest.mock('../src/services/apiClient');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

describe('UserProfileScreen', () => {
  beforeEach(() => {
    (useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: {
        background: '#ffffff',
        text: '#000000',
        cardBackground: '#f0f0f0',
        primary: '#6200ee',
        border: '#cccccc',
      },
    });

    (useUserData as jest.Mock).mockReturnValue({
      userData: {
        id: 1,
        name: 'Juan Pérez',
        username: 'juanp',
        email: 'juanp@example.com',
        birthDate: '1990-01-01',
      },
      isLoading: false,
      isError: false,
    });
  });

  it('debe renderizar correctamente', async () => {
    const {getByPlaceholderText, getByDisplayValue} = render(
      <NavigationContainer>
        <UserProfileScreen />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByPlaceholderText('user.name')).toBeTruthy();
    });

    expect(getByDisplayValue('Juan Pérez')).toBeTruthy();
    expect(getByDisplayValue('juanp')).toBeTruthy();
    expect(getByDisplayValue('juanp@example.com')).toBeTruthy();
  });
});
