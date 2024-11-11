export const colors = {
  primary: '#58d3a4',
  backgroundDark: '#202327',
  backgroundDarker: '#181A1B',
  backgroundLight: '#f3f6f4',
  cardBackground: '#2A2F33',
  textDark: '#ffffff',
  textLight: '#202327',
  headerLightBackground: '#f3f3f3',

};

export type Theme = {
  background: string;
  text: string;
  primary: string;
  cardBackground: string;
  border: string;
  backgroundHeader: string;
  textHeader: string;
};

export const darkTheme: Theme = {
  background: colors.backgroundDark,
  backgroundHeader: colors.backgroundDarker,
  cardBackground: colors.cardBackground,
  text: colors.textDark,
  primary: colors.primary,
  border: colors.primary,
  textHeader: colors.textDark
};

export const lightTheme: Theme = {
  background: colors.backgroundLight,
  backgroundHeader: colors.cardBackground,
  text: colors.textLight,
  primary: colors.primary,
  cardBackground: colors.headerLightBackground,
  border: colors.textLight,
  textHeader: colors.textDark
};
