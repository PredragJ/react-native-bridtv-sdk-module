import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import BridPlayer from 'react-native-bridtv-sdk-module';

const App = () => {
  const bridPlayerRef = React.useRef<BridPlayer>(null);
  const [playerState, setPlayerState] = React.useState<string>('');

  const updatePlayerState = (newValue: string) => {
    setPlayerState(newValue);
  };

  const handleVideoLoad = () => {
    console.log('VIDEO LOADED');
  };
  const handleVideoAdStart = () => {
    console.log('VIDEO AD STARTED');
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.container, { alignItems: 'flex-start' }]}>
          <BridPlayer
            ref={bridPlayerRef}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 36872, // PlayerID from BridTV cms
              mediaID: 511771, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoAdStart}
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
          <Text>{playerState}</Text>
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
