import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  ScrollView
} from 'react-native';
import BridPlayer from 'react-native-bridtv-sdk-module';

const App = () => {
  const [videoId, setVideoId] = React.useState('');
  const [playlistId, setPlaylistId] = React.useState('');
  const [useVpaid, setUseVpaid] = React.useState(false);
  const [playerID, setPlayerId] = React.useState('');
  const [mediaID, setMediaId] = React.useState('');
  const [videoButtonText, setVideoButtonText] = React.useState('Load Video');
  const bridPlayerRef1 = React.useRef<BridPlayer>(null);
  const bridPlayerRef2 = React.useRef<BridPlayer>(null);
  const bridPlayerRef3 = React.useRef<BridPlayer>(null);

  const onLoadConfigPress = React.useCallback(() => {}, []);

  React.useEffect(() => {
    // Poziv metode start
    if (bridPlayerRef1.current) {
      bridPlayerRef1.current.start();
    }
    // if (bridPlayerRef2.current) {
    //   bridPlayerRef2.current.start();
    // }
    // if (bridPlayerRef3.current) {
    //   bridPlayerRef3.current.start();
    // }
  }, []);

  const onLoadVideoPress = React.useCallback(() => {
    bridPlayerRef1.current?.loadVideo(+playerID, +mediaID);
    // bridPlayerRef2.current?.loadVideo(playerID, mediaID);
    // bridPlayerRef3.current?.loadVideo(playerID, mediaID);
  }, [bridPlayerRef1, bridPlayerRef2, bridPlayerRef3, playerID, mediaID]);

  const onLoadPlaylistPress = React.useCallback(() => {}, []);

  const onSwitchValueChange = () => {};

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>

    <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setPlayerId}
            value={playerID}
            placeholder="Player ID"
            keyboardType="numeric"
          />
          <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setMediaId}
            value={mediaID}
            placeholder="Video ID"
            keyboardType="numeric"
          />
          <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setPlaylistId}
            value={playlistId}
            placeholder="Playlist ID"
            keyboardType="numeric"
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 10 }}>
            <Button title="Load Config" onPress={onLoadConfigPress} />
            <Button title={videoButtonText} onPress={onLoadVideoPress} />
            <Button title="Load Playlist" onPress={onLoadPlaylistPress} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <Switch value={useVpaid} onValueChange={onSwitchValueChange} />
            <Text>Use VPAID</Text>
          </View>
      <BridPlayer 
              ref={bridPlayerRef1}
              bridPlayerConfig = {{
                playerID : "36872",
                mediaID : "442012",
                typeOfPlayer: "Single"
              }}
               style={styles.square}
            />

        {/* <BridPlayer 
                      ref={bridPlayerRef2}
                      bridPlayerConfig = {{
                        playerID : "36872",
                        mediaID : "511768",
                        typeOfPlayer: "Single"
                      }}
                      style={styles.square}
                    />

        <BridPlayer 
                      ref={bridPlayerRef3}
                      bridPlayerConfig = {{
                        playerID : "36872",
                        mediaID : "442010",
                        typeOfPlayer: "Single"
                      }}
                      style={styles.square}
                    /> */}
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    height: 250,
    width: 400,
    marginVertical: 20,
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default App;
