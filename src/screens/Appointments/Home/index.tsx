import Container from '@/components/Container';
import PaginationList from '@/components/PaginationList';
import {Appointment} from '@/types/appointment';
import {navigationServices} from '@/utils/navigationServices';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {AppointmentItem} from './components';
import {useAppointment} from './hooks';
import styles from './styles';

const Home = () => {
  const {
    state: {appointments, fetchLoading},
    handler: {deleteAppointment, fetchAppointments, t},
  } = useAppointment();

  const renderItem = ({item}: {item: Appointment}) => (
    <AppointmentItem
      item={item}
      deleteAppointment={() => deleteAppointment(item?.id)}
    />
  );

  return (
    <Container
      headerRight={
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigationServices.navigate('FormAppointment')}>
          <Text style={styles.addButtonText}>+ {t('button.add')}</Text>
        </TouchableOpacity>
      }
      scrollable={false}>
      <PaginationList
        dataPaging={{
          data: appointments,
          pagination: {
            currentPage: 1,
            totalPage: 1,
          },
        }}
        contentContainerStyle={styles.container}
        isFetching={fetchLoading}
        keyExtractor={item => item?.id}
        renderItem={renderItem}
        onFetch={fetchAppointments}
        onRefresh={fetchAppointments}
      />
    </Container>
  );
};

export default Home;
