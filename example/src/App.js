import * as React from 'react';
import { Text } from 'react-native';
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';

import BridPlayer from 'react-native-bridtv-sdk-module';

const App = () => {
  const bridPlayerRef = React.useRef(null);
  const bridPlayerRef2 = React.useRef(null);
  const bridPlayerRef3 = React.useRef(null);
  const [playerId, setPlayerId] = React.useState('40606');
  const [videoId, setVideoId] = React.useState('1319855');
  const [playlistId, setPlaylistId] = React.useState('21751');

  const handleVideoLoad = () => {
    console.log('VIDEO LOADED');
  };

  const handleVideoPlay = (player) => {
    console.log(player);
    console.log('VIDEO PLAYED');
  };

  const handleVideoBuffering = () => {
    console.log('VIDEO BUFFERING');
  };

  const handleVideoStart = () => {
    console.log('VIDEO STARTED');
  };

  const handleVideoPause = () => {
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

  const handleFullscreenOpen = () => {
    console.log('FULL SCREEN OPEN');
  };

  const handleFullscreenClose = () => {
    console.log('FULL SCREEN CLOSE');
  };

  // Ad Events
  const handleVideoAdLoaded = () => {
    console.log('AD LOADED');
  };
  const handleVideoAdCompleted = () => {
    console.log('AD COMPLETED');
  };
  const handleVideoAdResumed = () => {
    console.log('AD RESUMED');
  };
  const handleVideoAdStart = () => {
    console.log('AD STARTED');
  };
  const handleVideoAdPaused = () => {
    console.log('AD PAUSED');
  };

  const handleVideoAdProgress = () => {
    console.log('AD PROGRESS');
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
  const handleVideoError = (errorEvent) => {
    console.log(
      'Error Code => ' +
        errorEvent.code +
        ' | Error Name => ' +
        errorEvent.name +
        ' | Error Message => ' +
        errorEvent.message
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
              playerID: 40107, // PlayerID from BridTV cms
              mediaID: 1364356, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', //Single or Playlist
              controlAutoplay: false, //enables the client to take control over autoplay
              scrollOnAd: true, //This option enables scrolling during ad and is specific to the iOS platform. By default, Android has scrolling enabled during ads.
              creditsLabelColor: '614BC3', // To achieve color modification for credits label, it is necessary to provide a sequence of six hexadecimal characters, excluding the '#' symbol.
            }}
            //Video
            handleVideoPlay={() => handleVideoPlay('player')}
          />


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
              onPress={() =>
                bridPlayerRef.current?.loadVideo(
                  parseInt(playerId, 10),
                  parseInt(videoId, 10)
                )
              }
            />

            <Button
              title="load Playlist"
              onPress={() =>
                bridPlayerRef.current?.loadPlaylist(
                  parseInt(playerId, 10),
                  parseInt(playlistId, 10)
                )
              }
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
        <View>
          <Text>Player ID:</Text>
          <TextInput
            label="Player ID"
            placeholder="Enter a number"
            keyboardType="numeric"
            value={playerId}
            onChangeText={(text) => setPlayerId(text)}
          />
          <Text>Video ID:</Text>
          <TextInput
            label="Video ID"
            placeholder="Enter a number"
            keyboardType="numeric"
            value={videoId}
            onChangeText={(text) => setVideoId(text)}
          />
          <Text>Playlist ID:</Text>
          <TextInput
            label="Playlist ID"
            placeholder="Enter a number"
            keyboardType="numeric"
            value={playlistId}
            onChangeText={(text) => setPlaylistId(text)}
          />
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
