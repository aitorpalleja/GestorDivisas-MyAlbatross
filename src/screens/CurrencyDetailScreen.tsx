import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useCurrencyDetails } from '../services/apiClient';
import { LineChart } from 'react-native-gifted-charts';
import { useThemeStore } from '../stores/themeStore';
import { CurrencyStackParamList } from '../navigation/types';

const CurrencyDetailScreen = () => {
    const route = useRoute<RouteProp<CurrencyStackParamList, 'CurrencyDetail'>>();
    const { currencyCode } = route.params;
    const { theme } = useThemeStore();
    const { currencyDetails, isLoading, isError } = useCurrencyDetails(currencyCode);

    if (isLoading) return <ActivityIndicator size="large" color={theme.primary} />;
    if (isError) return <Text style={{ color: theme.text }}>Error al cargar detalles de la divisa</Text>;

    const chartData = currencyDetails.history.map((entry: { rate: number; date: string }) => ({
        value: entry.rate,
        label: entry.date.slice(5), 
    }));

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>{currencyDetails.code} Details</Text>
            <LineChart
                data={chartData}
                thickness={2}
                color={theme.primary}
                adjustToWidth
                hideDataPoints
                startFillColor={`${theme.primary}50`}
                endFillColor={`${theme.primary}10`}
                initialSpacing={10}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
});

export default CurrencyDetailScreen;
