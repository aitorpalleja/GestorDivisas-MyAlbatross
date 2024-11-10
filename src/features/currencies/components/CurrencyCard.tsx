import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TrendingDown, TrendingUp} from 'lucide-react-native';
import {CurrencyCardProps} from '../interfaces/CurrencyCardProps';

const CurrencyCard = ({
  code,
  currentRate,
  difference,
  onPress,
  theme,
}: CurrencyCardProps) => {
  const isPositive = difference >= 0;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
        },
      ]}>
      <View style={styles.content}>
        <Text style={[styles.code, {color: theme.text}]}>{code}</Text>
        <Text style={[styles.rate, {color: theme.text}]}>
          {currentRate.toFixed(4)}
        </Text>
        <View style={styles.differenceContainer}>
          {isPositive ? (
            <TrendingUp size={16} color="#22c55e" />
          ) : (
            <TrendingDown size={16} color="#ef4444" />
          )}
          <Text
            style={[
              styles.difference,
              {
                color: isPositive ? '#22c55e' : '#ef4444',
              },
            ]}>
            {difference.toFixed(4)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 6,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    alignItems: 'center',
  },
  code: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  rate: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  differenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  difference: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CurrencyCard;
