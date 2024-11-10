import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useUserData, updateUserData} from '../../../services/apiClient';
import {useThemeStore} from '../../../stores/themeStore';
import {useTranslation} from 'react-i18next';

const UserProfileScreen = () => {
  const {theme} = useThemeStore();
  const {t} = useTranslation();
  const {userData, isLoading, isError} = useUserData();

  const [editingData, setEditingData] = useState({
    name: '',
    username: '',
    email: '',
    birthDate: new Date(),
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  if (isLoading)
    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );

  if (isError)
    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={[styles.error, {color: theme.text}]}>
          {t('error.loadData')}
        </Text>
      </View>
    );

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const dataToUpdate = {
        ...editingData,
        birthDate: editingData.birthDate.toISOString(),
      };
      await updateUserData(userData.id, dataToUpdate);
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
      console.error('Error updating user data:', error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.infoContainer}>
        {['name', 'username', 'email'].map(field => (
          <View
            key={field}
            style={[styles.card, {backgroundColor: theme.cardBackground}]}>
            <Text style={[styles.label, {color: theme.text}]}>
              {t(`user.${field}`)}
            </Text>
            <TextInput
              style={[
                styles.input,
                {color: theme.text, borderColor: theme.border},
              ]}
              defaultValue={userData[field]}
              onChangeText={value =>
                setEditingData(prev => ({...prev, [field]: value}))
              }
              placeholderTextColor={theme.text + '90'}
            />
          </View>
        ))}

        <View style={[styles.card, {backgroundColor: theme.cardBackground}]}>
          <Text style={[styles.label, {color: theme.text}]}>
            {t('user.birthDate')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setOpenDatePicker(true)}
            style={[
              styles.input,
              {justifyContent: 'center', borderColor: theme.border},
            ]}>
            <Text style={{color: theme.text}}>
              {editingData.birthDate
                ? editingData.birthDate.toLocaleDateString()
                : t('user.selectDate')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDatePicker}
            date={editingData.birthDate || new Date()}
            mode="date"
            onConfirm={date => {
              setOpenDatePicker(false);
              setEditingData(prev => ({...prev, birthDate: date}));
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
            theme={'dark'}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleUpdate}
        style={[styles.button, {backgroundColor: theme.primary}]}
        disabled={isUpdating}>
        {isUpdating ? (
          <ActivityIndicator size="small" color={theme.background} />
        ) : (
          <Text style={[styles.buttonText, {color: theme.background}]}>
            {t('user.update')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  infoContainer: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    fontSize: 16,
  },
});

export default UserProfileScreen;
