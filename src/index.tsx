import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
  NativeModules,
  Platform,
<<<<<<< HEAD
  Alert,
  NativeEventEmitter,
=======
  NativeEventEmitter 
>>>>>>> 205c71771b1b3c73f7e23e3e426a9b22a2448e15
} from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

const ComponentName = 'BridtvSdkModuleView';

const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModuleView
    : NativeModules.BridtvSdkModule;

<<<<<<< HEAD
=======

>>>>>>> 205c71771b1b3c73f7e23e3e426a9b22a2448e15
var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);

type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig?: BridPlayerConfig;
  onVideoAdStart? (event: any) : void;
};

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  setFullscreen?: boolean;
}

<<<<<<< HEAD
const bridPlayerEvent = (event: any) => {
  console.log('Događaj topAdPause je prihvaćen.', event);
};
=======
export default interface BridPlayer extends React.Component<BridtvSdkModuleProps>{
>>>>>>> 205c71771b1b3c73f7e23e3e426a9b22a2448e15

export default interface BridPlayer
  extends React.Component<BridtvSdkModuleProps> {
  play(): void;
  pause(): void;
  loadVideo(playerID: number, mediaID: number): void;
  loadPlaylist(playerID: number, mediaID: number): void;
  getPlayerCurrentTime(): Promise<number | null>;
}
let playerId = 0;
const RN_BRID_PLAYER_KEY = 'RnBridPlayerKey';

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  eventListener: any;
  bridPlayerEventEmitter = new NativeEventEmitter();

  constructor(props: BridtvSdkModuleProps) {
    super(props);
    // this._playerId = playerId++;
    // this.ref_key = `${RN_BRID_PLAYER_KEY}-${this._playerId}`;
  }

  componentDidMount(){
    const eventEmitter = new NativeEventEmitter(NativeModules.BridtvSdkModule);
<<<<<<< HEAD
    this.eventListener = eventEmitter.addListener(
      'BridPlayerEvents',
      (event) => {
        console.log(event.eventProperty);
      }
    );
=======
    this.eventListener = eventEmitter.addListener('BridPlayerEvents', event => {
      // console.log('Ovo je BridPlayer:', event);

    this.bridPlayerEventEmitter.emit('RNBridPlayerEvent',event.message);

   });
  }

  componentWillUnmount(){
    //removes the listener
>>>>>>> 205c71771b1b3c73f7e23e3e426a9b22a2448e15
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
        const isMuted = await BridtvSdkManager.isMuted(findNodeHandle(this));
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
