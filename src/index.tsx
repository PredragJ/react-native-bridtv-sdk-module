import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
  NativeModules,
  Platform,
  Alert,
} from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

const ComponentName = 'BridtvSdkModuleView';

var  { BridtvSdkModule } = NativeModules;

const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModuleView
    : NativeModules.BridtvSdkModule;


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


export default interface BridPlayer extends React.Component<BridtvSdkModuleProps>{

  play(): void;
  pause(): void;
  loadVideo(playerID: number, mediaID: number): void;
  loadPlaylist(playerID: number, mediaID: number): void;
  getPlayerCurrentTime(): Promise<number | null>;


}
let playerId = 0;
const RCT_RNJWPLAYER_REF = 'RNJWPlayerKey';

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  constructor(props: BridtvSdkModuleProps ) {
    super(props);
    // this._playerId = playerId++;
		// this.ref_key = `${RCT_RNJWPLAYER_REF}-${this._playerId}`;
  }

  componentDidMount(): void {
    // this.getPlayerCurrentTime();
  }

  play() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'play', []);
  }

  pause() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'pause', []);
  }

  destroyPlayer() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'drestroyPlayer',
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

  getCurrentTime() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'getCurrentTime',
      []
    );
  }

  // isMuted() {
  //   UIManager.dispatchViewManagerCommand(
  //     findNodeHandle(this),
  //     'isMuted',
  //     []
  //     );
  // }

  seekToTime(time: Float) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'seekToTime', [
      time,
    ]);
  }

  async isMuted() {
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
