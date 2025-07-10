import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  heading: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  label: {fontSize: 16, marginTop: 12},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  inputContainer: {marginTop: 4},
  area: {height: 80, textAlignVertical: 'top'},
  button: {
    backgroundColor: '#4CAF50',
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16},
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginTop: 4,
    justifyContent: 'center',
  },
});

export default styles;
