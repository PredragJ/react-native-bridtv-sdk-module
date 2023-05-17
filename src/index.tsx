import React, { Dispatch, SetStateAction } from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
  NativeModules,
  Platform,
  NativeEventEmitter,
} from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

const ComponentName = 'BridtvSdkModuleView';

const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModule
    : NativeModules.BridtvSdkModule;

var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);

type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig?: BridPlayerConfig;
  handleVideoLoad(): void;
  handleVideoStart(): void;
  setPlayerState: (newValue: string) => void;
};

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  setFullscreen?: boolean;
}

export default interface BridPlayer
  extends React.Component<BridtvSdkModuleProps> {
  play(): void;
  pause(): void;
  loadVideo(playerID: number, mediaID: number): void;
  loadPlaylist(playerID: number, mediaID: number): void;
  getPlayerCurrentTime(): Promise<number | null>;
}
// let playerId = 0;
// const RN_BRID_PLAYER_KEY = 'RnBridPlayerKey';

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  eventListener: any;
  eventEmitter = new NativeEventEmitter(BridtvSdkManager);

  listeners: Map<string, () => void> = new Map();

  constructor(props: BridtvSdkModuleProps) {
    super(props);
    this.onVideoLoad(props.handleVideoLoad);
    this.onVideoAdStart(props.handleVideoStart);
    this.props.setPlayerState('Initial state');
    // this._playerId = playerId++;
    // this.ref_key = `${RN_BRID_PLAYER_KEY}-${this._playerId}`;
  }

  handleBridPlayerEvent = (eventData: any) => {
    console.log(eventData);
    const callBack = this.listeners.get(eventData);

    if (callBack) {
      callBack();
    }
  };

  registedListener = (eventType: string, handler: Function) => {
    this.listeners.set(eventType, () => {
      this.props.setPlayerState(eventType);
      handler();
    });
  };

  onVideoLoad = (handler: () => void) => {
    console.log('this is not called');
    this.registedListener('playerMuteVideo', handler);
  };

  onVideoAdStart = (handler: () => void) => {
    this.registedListener('adLoaded', handler);
  };

  componentDidMount() {
    this.eventListener = this.eventEmitter.addListener(
      'BridPlayerEvents',
      (event) => {
        this.handleBridPlayerEvent(event.name);
      }
    );
  }

  componentWillUnmount() {
    this.eventEmitter.removeAllListeners('BridPlayerEvents');
    // this.eventListener.removeListeners();
    //removes the listener
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
