import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  heading: {fontSize: 24, fontWeight: 'bold', marginBottom: 12},
  addButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {color: '#fff', fontSize: 16},
  error: {color: 'red', marginVertical: 8},
});

export default styles;
