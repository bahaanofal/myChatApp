import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from "react-native";
import StackNavigation from './navigation/StackNavigation';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0C6157',
  },
};


const App = () => {

  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle='light-content' backgroundColor='#0C6157' />
        <View style={styles.container}>
          <StackNavigation />
        </View>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default App;
