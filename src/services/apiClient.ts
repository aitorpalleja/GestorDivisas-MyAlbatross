import useSWR from 'swr';

const API_BASE_URL = 'https://myalbatross-technical-proof-api.pages.dev';

// Fetcher genérico para SWR
const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Error al obtener datos');
    return res.json();
  });

// Hook para obtener la lista de divisas
export const useCurrencies = () => {
  const {data, error} = useSWR(`${API_BASE_URL}/currencies`, fetcher);
  return {
    currencies: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Hook para obtener los detalles de una divisa específica
export const useCurrencyDetails = (currencyCode: string) => {
  const {data, error} = useSWR(
    currencyCode ? `${API_BASE_URL}/currencies/${currencyCode}` : null,
    fetcher,
  );
  return {
    currencyDetails: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Hook para obtener datos de usuario
export const useUserData = () => {
  const {data, error} = useSWR(`${API_BASE_URL}/user`, fetcher);
  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Función para actualizar datos del usuario
export const updateUserData = async (userId: number, updatedData: Partial<{ name: string; username: string; email: string; birthDate: string }>) => {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar datos del usuario');
  }

  return response.json();
};

