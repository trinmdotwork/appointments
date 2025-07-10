/**
 * @format
 */
import '@/i18n';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

import {Text, TextInput} from 'react-native';

AppRegistry.registerComponent(appName, () => App);

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.clearButtonMode = 'never';
}
