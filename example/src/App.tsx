import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import BridPlayer from 'react-native-bridtv-sdk-module';
import { BridPlayerError } from 'src/BridPlayerError';

const App = () => {
  const bridPlayerRef = React.useRef<BridPlayer>(null);
  // const bridPlayerRef2 = React.useRef<BridPlayer>(null);
  // const bridPlayerRef3 = React.useRef<BridPlayer>(null);

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
    // console.log('AD PROGRESS');
  };

  const handleVideoAdTapped = () => {
    console.log('AD TAPPED');
  };

  const handleVideoAdSkipped = () => {
    console.log('AD SKIPPED');
  };

  const handleVideoAutoplay = () => {
    console.log('VIDEO AUTOPLAY');
  };

  //VIDEO ERROR EVENTS
  const handleVideoError = (errorEvent?: BridPlayerError) => {
    console.log(
      'Error Code => ' +
        errorEvent?.code +
        ' | Error Name => ' +
        errorEvent?.name +
        ' | Error Message => ' +
        errorEvent?.message
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.container]}>
          <BridPlayer
            ref={bridPlayerRef}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39910, // PlayerID from BridTV cms
              mediaID: 21751, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Playlist', //Single or Playlist
              controlAutoplay: false, //enables the client to take control over autoplay
            }}
            //Video
            handleVideoLoad={handleVideoLoad}
            handleVideoStart={handleVideoStart}
            handleVideoPlay={handleVideoPlay}
            handleVideoBuffering={handleVideoBuffering}
            handleVideoProgress={handleVideoProgress}
            handleVideoSeek={handleVideoSeek}
            handleVideoPaused={handeVideoPause}
            handleVideoEnd={handleVideoEnd}
            handleFulscreenOpen={handleFulscreenOpen}
            handleFulscreenClose={handleFulscreenClose}
            handleVideoAutoplay={handleVideoAutoplay}
            //Ad
            handlevideoAdLoaded={handlevideoAdLoaded}
            handlevideoAdCompleted={handlevideoAdCompleted}
            handlevideoAdResumed={handlevideoAdResumed}
            handleVideoAdStart={handleVideoAdStart}
            handlevideoAdPaused={handlevideoAdPaused}
            handleAdProgress={handleVideoAdProgress}
            handleVideoAdTapped={handleVideoAdTapped}
            handleVideoAdSkipped={handleVideoAdSkipped}
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
          />

        <BridPlayer
            ref={bridPlayerRef3}
            setPlayerState={updatePlayerState}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 39437, // PlayerID from BridTV cms
              mediaID: 1092011, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
          /> */}
          <View style={styles.buttonContainer}>
            <Button
              title="Prev"
              onPress={() => bridPlayerRef.current?.previous()}
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
              onPress={() => bridPlayerRef.current?.next()}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="SHOW POSTER"
              onPress={() => bridPlayerRef.current?.showPoster()}
            />

            <Button
              title="HIDE POSTER"
              onPress={() => bridPlayerRef.current?.hidePoster()}
            />

            <Button
              title="MUTE"
              onPress={() => bridPlayerRef.current?.mute()}
            />

            <Button
              title="UNMUTE"
              onPress={() => bridPlayerRef.current?.unMute()}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="set Fullscreen"
              onPress={() => bridPlayerRef.current?.setFullscreen(true)}
            />

            <Button
              title="seek To Time"
              onPress={() => bridPlayerRef.current?.seekToTime(30)}
            />

            <Button
              title="Current Time"
              onPress={() => bridPlayerRef.current?.getPlayerCurrentTime()}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="destroy Player"
              onPress={() => bridPlayerRef.current?.destroyPlayer()}
            />

            <Button
              title="load Video"
              onPress={() => bridPlayerRef.current?.loadVideo(40118, 1319855)}
            />

            <Button
              title="load Playlist"
              onPress={() => bridPlayerRef.current?.loadPlaylist(39910, 21751)}
            />
          </View>


          <View style={styles.buttonContainer}>
            <Button
              title="Hide Controls"
              onPress={() => bridPlayerRef.current?.hideControls()}
            />

            <Button
              title="Show Controls"
              onPress={() => bridPlayerRef.current?.showControls()}
            />

            <Button
              title="Video Duration"
              onPress={() => bridPlayerRef.current?.getVideoDuration()}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Is Paused"
              onPress={() => bridPlayerRef.current?.isPaused()}
            />

            <Button
              title="Is Repeated"
              onPress={() => bridPlayerRef.current?.isRepeated()}
            />
          </View>
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
