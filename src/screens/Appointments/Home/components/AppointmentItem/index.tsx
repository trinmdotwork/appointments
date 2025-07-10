import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Appointment} from '@/types/appointment';
import {formatDate} from '@/utils/moment';
import {navigationServices} from '@/utils/navigationServices';
import {useTranslation} from 'react-i18next';

type AppointmentItemProps = {
  item: Appointment;
  deleteAppointment: () => void;
};

export const AppointmentItem = (props: AppointmentItemProps) => {
  const {deleteAppointment, item} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text>{formatDate(new Date(item?.date), 'DD/MM/YYYY')}</Text>
      <Text>{item?.location || ''}</Text>
      <Text>{item?.notes || ''}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigationServices.navigate('FormAppointment', {initialData: item})
          }>
          <Text style={styles.buttonText}>{t('button.edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.delete]}
          onPress={deleteAppointment}>
          <Text style={styles.buttonText}>{t('button.delete')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {fontSize: 18, fontWeight: '500'},
  row: {flexDirection: 'row', marginTop: 8},
  button: {
    marginRight: 8,
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 4,
  },
  delete: {backgroundColor: '#F44336'},
  buttonText: {color: '#fff'},
});
