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
  const bridPlayerRef2 = React.useRef<BridPlayer>(null);
  const bridPlayerRef3 = React.useRef<BridPlayer>(null);

  const [playerState, setPlayerState] = React.useState<{ message: string }[]>(
    []
  );

  const updatePlayerState = (newValue: string) => {
    setPlayerState((prevState) => [...prevState, { message: newValue }]);
  };

  const handleVideoLoad = () => {
    console.log('VIDEO LOADED');
  };

  const handleVideoPlay = () => {
    console.log('VIDEO PLAYED');
  };

  const handleVideoBuffering = () => {
    console.log('VIDEO BUFFERING');
  };

  const handleVideoStart = () => {
    console.log('VIDEO STARTED');
  };

  const handeVideoPause = () => {
    console.log('VIDEO PAUSED');
  };
  const handeVideoPause2 = () => {
    console.log('VIDEO PAUSED - REF 2');
  };
  const handeVideoPause3 = () => {
    console.log('VIDEO PAUSED - REF 3');
  };
  const handleVideoProgress = () => {
    console.log('VIDEO PROGRESS');
  };

  const handleVideoSeek = () => {
    console.log('VIDEO SEEK');
  };

  const handleVideoEnd = () => {
    console.log('VIDEO END');
  };

  const handleFulscreenOpen = () => {
    console.log('FULL SCREEN OPEN');
  };

  const handleFulscreenClose = () => {
    console.log('FULL SCREEN CLOSE');
  };

  // Ad Events
  const handlevideoAdLoaded = () => {
    console.log('AD LOADED');
  };
  const handlevideoAdCompleted = () => {
    console.log('AD COMPLETED');
  };
  const handlevideoAdResumed = () => {
    console.log('AD RESUMED');
  };
  const handleVideoAdStart = () => {
    console.log('AD STARTED');
  };
  const handlevideoAdPaused = () => {
    console.log('AD PAUSED');
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
 

type BridError = {
    name: string,
    message:string,
    code: string,
}

  const handleVideoError = (error: BridError) => {
    console.log(error.code, error.message);
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.container]}>
          <BridPlayer
            ref={bridPlayerRef2}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39437, // PlayerID from BridTV cms
              mediaID: 1092011, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
            //Video
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoStart}
            handleVideoPlay={handleVideoPlay}
            handleVideoBuffering={handleVideoBuffering}
            handleVideoAdEnd={handleVideoAdEnd}
            handleVideoProgress={handleVideoProgress}
            handleVideoSeek={handleVideoSeek}
            handleVideoPaused={handeVideoPause}
            handleVideoEnd={handleVideoEnd}
            handleFulscreenOpen={handleFulscreenOpen}
            handleFulscreenClose={handleFulscreenClose}
            //Ad
            handlevideoAdLoaded={handlevideoAdLoaded}
            handlevideoAdCompleted={handlevideoAdCompleted}
            handlevideoAdResumed={handlevideoAdResumed}
            handleVideoAdStart={handleVideoAdStart}
            handlevideoAdPaused={handlevideoAdPaused}
            // handleAdProgress={handleVideoAdProgress}
            handleVideoAdTapped={handleVideoAdTapped}
            handleVideoAdSkiped={handleVideoAdSkiped}
            handleVideoError={handleVideoError}
          />
          {/* 
            <BridPlayer
            ref={bridPlayerRef2}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39437, // PlayerID from BridTV cms
              mediaID: 1092011, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
            //Video
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoStart}
            handleVideoPlay={handleVideoPlay}
            handleVideoBuffering={handleVideoBuffering}
            handleVideoAdEnd={handleVideoAdEnd}
            handleVideoProgress={handleVideoProgress}
            handleVideoError={handleVideoError}
            handleVideoSeek={handleVideoSeek}
            handleVideoPaused={handeVideoPause2}
            handleVideoEnd={handleVideoEnd}
            handleFulscreenOpen={handleFulscreenOpen}
            handleFulscreenClose={handleFulscreenClose}
            //Ad
            handlevideoAdLoaded={handlevideoAdLoaded}
            handlevideoAdCompleted={handlevideoAdCompleted}
            handlevideoAdResumed={handlevideoAdResumed}
            handleVideoAdStart={handleVideoAdStart}
            handlevideoAdPaused={handlevideoAdPaused}
            // handleAdProgress={handleVideoAdProgress}
            handleVideoAdTapped={handleVideoAdTapped}
            handleVideoAdSkiped={handleVideoAdSkiped}

          />

        <BridPlayer
            ref={bridPlayerRef2}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39437, // PlayerID from BridTV cms
              mediaID: 1092011, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
            //Video
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoStart}
            handleVideoPlay={handleVideoPlay}
            handleVideoBuffering={handleVideoBuffering}
            handleVideoAdEnd={handleVideoAdEnd}
            handleVideoProgress={handleVideoProgress}
            handleVideoError={handleVideoError}
            handleVideoSeek={handleVideoSeek}
            handleVideoPaused={handeVideoPause3}
            handleVideoEnd={handleVideoEnd}
            handleFulscreenOpen={handleFulscreenOpen}
            handleFulscreenClose={handleFulscreenClose}
            //Ad
            handlevideoAdLoaded={handlevideoAdLoaded}
            handlevideoAdCompleted={handlevideoAdCompleted}
            handlevideoAdResumed={handlevideoAdResumed}
            handleVideoAdStart={handleVideoAdStart}
            handlevideoAdPaused={handlevideoAdPaused}
            // handleAdProgress={handleVideoAdProgress}
            handleVideoAdTapped={handleVideoAdTapped}
            handleVideoAdSkiped={handleVideoAdSkiped}

          /> */}
          <View style={styles.buttonContainer}>
            <Button
              title="Prev"
              onPress={() => bridPlayerRef.current?.play()}
            />

            <Button
              title="Play"
              onPress={() => bridPlayerRef2.current?.play()}
            />

            <Button
              title="Pause"
              onPress={() => bridPlayerRef3.current?.play()}
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
    width: 380,
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
