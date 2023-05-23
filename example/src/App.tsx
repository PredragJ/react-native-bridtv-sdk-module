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
  const [playerState, setPlayerState] = React.useState<{ message: string }[]>([]);

  const updatePlayerState = (newValue: string) => {
    setPlayerState(prevState => [...prevState, { message: newValue }]);
  };

  const handleVideoLoad = () => {
    console.log('VIDEO LOADED');
  };

  const handleVideoAdStart = () => {
    console.log('AD STARTED');
  };
  
  const handeVideoPause = () => {
    console.log('VIDEO PAUSED');
  }

  const handleVideoProgress = () => {
    console.log('VIDEO PROGRESS');
  };

  const handleVideoSeek = () => {
    console.log('VIDEO SEEK');
  };

  const handleVideoEnd = () => {
    console.log('VIDEO END');
  };

  const handleVideoError = () => {
    console.log('VIDEO ERROR');
  };

  const handleVideoAdProgress = () => {
    console.log('AD PROGRESS');
  };

  const handleVideoAdEnd = () => {
    console.log('AD END');
  };

  const handleVideoAdTapped = () => {
    console.log('AD TAPPED');
  };

  const handleVideoAdSkiped = () => {
    console.log('AD SKIPPED');
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.container]}>
          <BridPlayer
            ref={bridPlayerRef}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39437, // PlayerID from BridTV cms
              mediaID: 1248134, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoAdStart}
            handleAdProgress={handleVideoAdProgress}
            handleVideoAdTapped={handleVideoAdTapped}
            handleVideoAdSkiped={handleVideoAdSkiped}
            handleVideoAdEnd={handleVideoAdEnd}
            handleVideoProgress={handleVideoProgress}
            handleVideoEnd={handleVideoEnd}
            handleVideoError={handleVideoError}
            handleVideoSeek={handleVideoSeek}
            // onVideoAdStart={e => alert(e.nativeEvent?.error || 'Player Error.')}
          />

          <BridPlayer
            ref={bridPlayerRef}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39118, // PlayerID from BridTV cms
              mediaID: 1248130, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoAdStart}
            handleAdProgress={handleVideoAdProgress}
            handleVideoAdTapped={handleVideoAdTapped}
            handleVideoAdSkiped={handleVideoAdSkiped}
            handleVideoAdEnd={handleVideoAdEnd}
            handleVideoProgress={handleVideoProgress}
            handleVideoEnd={handleVideoEnd}
            handleVideoError={handleVideoError}
            handleVideoSeek={handleVideoSeek}
            // onVideoAdStart={e => alert(e.nativeEvent?.error || 'Player Error.')}
          />


           <BridPlayer
            ref={bridPlayerRef}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39437, // PlayerID from BridTV cms
              mediaID: 1248134, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoAdStart}
            handleAdProgress={handleVideoAdProgress}
            handleVideoAdTapped={handleVideoAdTapped}
            handleVideoAdSkiped={handleVideoAdSkiped}
            handleVideoAdEnd={handleVideoAdEnd}
            handleVideoProgress={handleVideoProgress}
            handleVideoEnd={handleVideoEnd}
            handleVideoError={handleVideoError}
            handleVideoSeek={handleVideoSeek}
            handleVideoPaused={handeVideoPause}
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
              onPress={() => bridPlayerRef.current?.setFullscreen(true)}
            />
          </View>
          <Text style={{ textAlign: 'center', margin: 20 }}>
          {playerState.map((event, index) => (
            <Text key={index}>
              {event.message}
              {'\n'}
            </Text>
          ))}
        </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
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
    height: 213,
    width: 380  ,
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
