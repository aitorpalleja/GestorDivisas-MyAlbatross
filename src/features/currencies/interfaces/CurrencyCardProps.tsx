export interface CurrencyCardProps {
  code: string;
  currentRate: number;
  difference: number;
  onPress: () => void;
  theme: {
    cardBackground: string;
    text: string;
  };
}
