import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
  NativeModules,
  Platform,
  Alert,
  NativeEventEmitter 
} from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

const ComponentName = 'BridtvSdkModuleView';

const { RCTEventEmitter } = NativeModules;


const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModuleView
    : NativeModules.BridtvSdkModule;


const eventEmitter = new NativeEventEmitter(RCTEventEmitter);



var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);



type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig?: BridPlayerConfig;
};

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  setFullscreen?: boolean;
}

  const bridPlayerEvent = (event: any) => {
    console.log('Događaj topAdPause je prihvaćen.', event);
  };
  

export default interface BridPlayer extends React.Component<BridtvSdkModuleProps>{

  play(): void;
  pause(): void;
  loadVideo(playerID: number, mediaID: number): void;
  loadPlaylist(playerID: number, mediaID: number): void;
  getPlayerCurrentTime(): Promise<number | null>;


}
let playerId = 0;
const RN_BRID_PLAYER_KEY = 'RnBridPlayerKey';

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {


  constructor(props: BridtvSdkModuleProps ) {
    super(props);
    // this._playerId = playerId++;
		// this.ref_key = `${RN_BRID_PLAYER_KEY}-${this._playerId}`;
  }

  componentDidMount(): void {
    // this.getPlayerCurrentTime();
    eventEmitter.addListener(
      'topAdPause',
      this.bridPlayerEvent
    );
  }

  play() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'play', []);
  }

  pause() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'pause', []);
  }

  mute() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'mute', []);
  }
  unMute() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'unMute', []);
  }

  destroyPlayer() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'destroyPlayer',
      []
    );
  }

  setFullscreen(fullscreen: boolean) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'setFullscreen',
      [fullscreen]
    );
  }

  seekToTime(time: Float) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'seekToTime', [
      time,
    ]);
  }

  async isMuted() {
    if (BridtvSdkManager) {
      try {
        const isMuted = await BridtvSdkManager.isMuted(
          findNodeHandle(this)
        );
        return isMuted;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }

  async getPlayerCurrentTime() {
    if (BridtvSdkManager) {
      try {
        const time = await BridtvSdkManager.getCurrentTime(
          findNodeHandle(this)
        );
        return time;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }

  render() {
    return <RNBridPlayer {...this.props} />;
  }
}
