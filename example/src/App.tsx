import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
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

  const [videoId, setVideoId] = React.useState('1080418');
  const [playlistId, setPlaylistId] = React.useState('20678');
  const [useVpaid, setUseVpaid] = React.useState(false);
  const [playerId, setPlayerId] = React.useState('39420');

  const onLoadConfigPress = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onLoadVideoPress = React.useCallback(() => {
    bridPlayerRef.current?.isMuted();
    Keyboard.dismiss();
  }, []);

  const onLoadPlaylistPress = React.useCallback(() => {
    bridPlayerRef.current?.loadPlaylist(+playerId, +playlistId);
    Keyboard.dismiss();
  }, [playerId, playlistId]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={[styles.container, { alignItems: 'center' }]}>
        <TextInput
          style={{
            height: 40,
            width: '100%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={setPlayerId}
          value={playerId}
          defaultValue={playerId}
          placeholder="Player ID"
          keyboardType="numeric"
        />
        <TextInput
          style={{
            height: 40,
            width: '100%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={setVideoId}
          value={videoId}
          placeholder="Video ID"
          defaultValue={videoId}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            height: 40,
            width: '100%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={setPlaylistId}
          value={playlistId}
          defaultValue={playlistId}
          placeholder="Playlist ID"
          keyboardType="numeric"
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginVertical: 10,
          }}
        >
          <Button title="Load Config" onPress={onLoadConfigPress} />
          <Button title="Load Video" onPress={onLoadVideoPress} />
          <Button title="Load Playlist" onPress={onLoadPlaylistPress} />
        </View>
        <BridPlayer
          ref={bridPlayerRef}
          style={styles.square}
          bridPlayerConfig={{
            playerID: 39420,
            mediaID: 1080418,
            typeOfPlayer: 'Single',
          }}
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
          <Button title="Play" onPress={() => bridPlayerRef.current?.play()} />

          <Button
            title="Pause"
            onPress={() => bridPlayerRef.current?.pause()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
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
    height: 222,
    width: 400,
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    width: '50%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default App;
