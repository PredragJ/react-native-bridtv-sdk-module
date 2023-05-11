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

export default function App() {
  const [videoId, setVideoId] = React.useState('');
  const [playlistId, setPlaylistId] = React.useState('');
  const [useVpaid, setUseVpaid] = React.useState(false);
  const [playerId, setPlayerId] = React.useState('');
  const [videoButtonText, setVideoButtonText] = React.useState('Load Video');
  const bridPlayerRef = React.createRef();

  const onLoadConfigPress = React.useCallback(() => {}, []);

  const onLoadVideoPress = React.useCallback(() => {
    setVideoButtonText('Kliknuo sam i loadovao video');
  }, []);

  const onLoadPlaylistPress = React.useCallback(() => {}, []);

  const onSwitchValueChange = () => {};

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>

    <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setPlayerId}
            value={playerId}
            placeholder="Player ID"
            keyboardType="numeric"
          />
          <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setVideoId}
            value={videoId}
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
              ref={bridPlayerRef}
              bridPlayerConfig = {{
                playerID : "36872",
                mediaID : "442013",
                typeOfPlayer: "Single"
              }}
               style={styles.square}
            />

        <BridPlayer 
                      ref={bridPlayerRef}
                      bridPlayerConfig = {{
                        playerID : "36872",
                        mediaID : "442013",
                        typeOfPlayer: "Single"
                      }}
                      style={styles.square}
                    />

        <BridPlayer 
                      ref={bridPlayerRef}
                      bridPlayerConfig = {{
                        playerID : "36872",
                        mediaID : "442013",
                        typeOfPlayer: "Single"
                      }}
                      style={styles.square}
                    />
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
