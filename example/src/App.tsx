import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Switch,
} from 'react-native';
import BridPlayer from 'react-native-bridtv-sdk-module';

export default function App() {
  const [playerId, setPlayerId] = React.useState('');
  const [videoId, setVideoId] = React.useState('');
  const [playlistId, setPlaylistId] = React.useState('');
  const [useVpaid, setUseVpaid] = React.useState(false);

  const onLoadConfigPress = React.useCallback(() => {}, []);

  const onLoadVideoPress = React.useCallback(() => {
    BridPlayer.play();
  }, []);

  const onLoadPlaylistPress = React.useCallback(() => {}, []);

  const onSwitchValueChange = () => {};

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={setPlayerId}
        value={playerId}
        placeholder="Player ID"
        keyboardType="numeric"
      />
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={setVideoId}
        value={videoId}
        placeholder="Video ID"
        keyboardType="numeric"
      />
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={setPlaylistId}
        value={playlistId}
        placeholder="Playlist ID"
        keyboardType="numeric"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '80%',
          marginVertical: 10,
        }}
      >
        <Button title="Load Config" onPress={onLoadConfigPress} />
        <Button title="Load Video" onPress={onLoadVideoPress} />
        <Button title="Load Playlist" onPress={onLoadPlaylistPress} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Switch value={useVpaid} onValueChange={onSwitchValueChange} />
        <Text>Use VPAID</Text>
      </View>

      <BridPlayer
        bridPlayerConfig={{
          playerID: '39118',
          mediaID: '19601',
          typeofPlayer: 'Playlist',
        }}
        style={styles.square}
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
      height: 3,
    },
  },
});
