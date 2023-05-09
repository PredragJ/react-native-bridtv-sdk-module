import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import  BridPlayer  from 'react-native-bridtv-sdk-module';

export default function App() {
  return (
    <View style={styles.container}>
      <BridPlayer 
            style={styles.square}
            bridPlayerConfig = {{
              playerID : "36872",
              mediaID : "442013",
              typeOfPlayer: "Single"
            }}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  subContainer: {
    position: 'absolute',
    top: 100,
    left: 50,
    flex: 1,
  },
  square: {
    height: 200,
    width: 300,
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
});
