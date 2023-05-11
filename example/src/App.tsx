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

  const bridPlayerRef = React.useRef<BridPlayer>(null);

  React.useEffect(() => {
    // Poziv metode start
    if (bridPlayerRef.current) {
      bridPlayerRef.current.play();
    }
  }, []);

  const [videoId, setVideoId] = React.useState('');
  const [playlistId, setPlaylistId] = React.useState('');
  const [useVpaid, setUseVpaid] = React.useState(false);
  const [playerId, setPlayerId] = React.useState('');


  const onLoadConfigPress = React.useCallback(() => {
    bridPlayerRef.current?.play()}, []);

  const onLoadVideoPress = React.useCallback(() => {
    bridPlayerRef.current?.loadVideo(+playerId,+videoId);
  }, [playerId, videoId]);

  const onLoadPlaylistPress = React.useCallback(() => {}, []);

  const onSwitchValueChange = () => {};

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>

    <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setPlayerId}
            value={playerId}
            defaultValue = "36872"
            placeholder="Player ID"
            keyboardType="numeric"
          />
          <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setVideoId}
            value={videoId}
            placeholder="Video ID"
            defaultValue="511770"
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
            <Button title="Load Video" onPress={onLoadVideoPress} />
            <Button title="Load Playlist" onPress={onLoadPlaylistPress} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <Switch value={useVpaid} onValueChange={onSwitchValueChange} />
            <Text>Use VPAID</Text>
          </View>
          <BridPlayer 
              ref={bridPlayerRef}
              bridPlayerConfig = {{
                playerID : 36872,
                mediaID : 442012,
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
          <View style={styles.buttonContainer}>
            <Button
              title="Play"
              onPress={() => bridPlayerRef.current?.play()} 
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Pause"
              onPress={() => bridPlayerRef.current?.pause()} 
            />
          </View>
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
    height: 200,
    width: 300,
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    width: 100,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default App;