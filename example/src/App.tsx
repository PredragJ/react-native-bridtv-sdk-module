import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import BridPlayer, { useBridPlayer } from 'react-native-bridtv-sdk-module';

const App = () => {
  const bridPlayerRef = React.useRef<BridPlayer>(null);
  const { playerState, onVideoLoad, onVideoAdStart } = useBridPlayer();

  const handleVideoLoad = () => {
    console.log('VIDEO LOADED');
  };
  const handleVideoAdStart = () => {
    console.log('VIDEO AD STARTED');
  };

  onVideoLoad(handleVideoLoad);

  onVideoAdStart(handleVideoAdStart);

  //treba nam use effect kad se promeni state da se nesto desi u UI

  // React.useEffect(()=>{
  // console.log("re-renderovao sam se");
  // },[playerState])

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.container, { alignItems: 'flex-start' }]}>
          <BridPlayer
            ref={bridPlayerRef}
            style={styles.square}
            bridPlayerConfig={{
              playerID: 1, // PlayerID from BridTV cms
              mediaID: 1, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
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
          <Text style={{ textAlign: 'center', margin: 20 }}>{playerState}</Text>
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
