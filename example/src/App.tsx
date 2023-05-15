import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  SafeAreaView,
  NativeEventEmitter,
} from 'react-native';
import BridPlayer from 'react-native-bridtv-sdk-module';

const App = () => {
  const bridPlayerRef = React.useRef<BridPlayer>(null);
  const [log, setLog] = React.useState('');
  const eventEmitter = new NativeEventEmitter();
  let eventListener
  
  React.useEffect(() => {
    // Poziv metode start
    // if (bridPlayerRef.current) {
    //   bridPlayerRef.current.loadVideo(39118,1248134);
    // }
    eventListener = eventEmitter.addListener('RNBridPlayerEvent', handleBridPlayerEvent);
  
  }, []);

  
  const handleBridPlayerEvent = (eventData: any) => {
    //Here you can add the logic to handle the event.
    console.log('Primljen događaj iz BridPlayer:', eventData);
    setLog((prevLog) => prevLog + '\n' + eventData);


  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.container, { alignItems: 'flex-start' }]}>
          <BridPlayer
            ref={bridPlayerRef}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39420,
              mediaID: 1080418,
              typeOfPlayer: 'Single',
            }}
            // onVideoAdStart={e => alert(e.nativeEvent?.error || 'Player Error.')}

          />
          <View style={styles.buttonContainer}>
            <Button
              title="Prev"
              onPress={() => bridPlayerRef.current?.play()}
            />

            <Button
              title="Play"
              onPress={() => bridPlayerRef.current?.play()}
            />

            <Button
              title="Pause"
              onPress={() => bridPlayerRef.current?.pause()}
            />

            <Button
              title="Next"
              onPress={() => bridPlayerRef.current?.pause()}
            />
          </View>
          <Text style={{ textAlign: 'center', margin: 20 }}>{log}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 20,
    justifyContent: 'flex-start',
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
    height: 222,
    width: '100%',
  },
  buttonContainer: {
    borderRadius: 10,
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default App;
