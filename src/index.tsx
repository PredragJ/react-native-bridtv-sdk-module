import React from 'react';
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

const BridPlayerEventsIos = {
  videoAdStart: 'adStarted',
  videoLoad: 'playerVideoInitialized',
  videoProgress: '',
  videoSeek: 'playerSliderValueChanged',
  videoEnd: 'playerStop',
  videoError: 'playerVideoError',
  videoAdProgress: '',
  videoAdEnd: 'adComplete',
  videoAdTapped: 'adTapped',
  videoAdSkipped: 'adSkipped',
};

const BridPlayerEventsAndroid = {
      videoAdStart: "ad started",
      videoLoad:"video loaded",
      videoProgress: "video progress",
      videoSeek: "video seek",
      videoEnd: "video end",
      videoError: "video error",
      videoAdProgress: "ad progress",
      videoAdEnd: "video ad end",
      videoAdTapped: "ad tapped",
      videoAdSkipped: "ad skipped",
  };

//onPlayerStateChange
//onFullscreenChange
var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);

type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig?: BridPlayerConfig;
  handleVideoLoad(): void;
  handleVideoStart(): void;
  handleAdProgress(): void;
  handleVideoAdTapped(): void;
  handleVideoAdSkiped(): void;
  handleVideoAdEnd(): void;
  handleVideoProgress(): void;
  handleVideoEnd(): void;
  handleVideoSeek(): void;
  handleVideoError(): void;
  setPlayerState: (newValue: string) => void;
};

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  setFullscreen?: boolean;
}

export const BridPlayerEvents =
  Platform.OS === 'ios' ? BridPlayerEventsIos : BridPlayerEventsAndroid;

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
  eventEmitter = new NativeEventEmitter(BridtvSdkManager);

  listeners: Map<string, () => void> = new Map();
  ref_key: string;

  constructor(props: BridtvSdkModuleProps) {
    super(props);
    this.onVideoLoad(props.handleVideoLoad);
    this.onVideoAdStart(props.handleVideoStart);
    this.onVideoAdProgress(props.handleAdProgress);
    this.onVideoAdTapped(props.handleVideoAdTapped);
    this.onVideoAdSkiped(props.handleVideoAdSkiped);
    this.onVideoAdEnd(props.handleVideoAdEnd);
    this.onVideoEnd(props.handleVideoEnd);
    this.onVideoSeek(props.handleVideoSeek);
    this.onVideoError(props.handleVideoError);
    this.props.setPlayerState('Initial state');
    this._playerId = ++playerId;
    this.ref_key = `${RN_BRID_PLAYER_KEY}-${this._playerId}`;

    console.log(this.ref_key);
  }

  componentDidMount() {
    this.eventListener = this.eventEmitter.addListener(
      'BridPlayerEvents',
      (event) => {
        // console.log(event);
        this.handleBridPlayerEvent(
          Platform.OS === 'ios' ? event.name : event.message
        );
      }
    );
  }

  componentWillUnmount() {
    this.eventEmitter.removeAllListeners('BridPlayerEvents');
    // this.eventListener.removeListeners();
    //removes the listener
  }

  handleBridPlayerEvent = (eventData: any) => {
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
    this.registedListener(BridPlayerEvents.videoLoad, handler);
  };

  onVideoAdStart = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdStart, handler);
  };

  onVideoProgress = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoProgress, handler);
  };

  onVideoSeek = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoSeek, handler);
  };

  onVideoEnd = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoEnd, handler);
  };

  onVideoError = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoError, handler);
  };

  onVideoAdProgress = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdProgress, handler);
  };

  onVideoAdTapped = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdTapped, handler);
  };

  onVideoAdSkiped = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdSkipped, handler);
  };

  onVideoAdEnd = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdEnd, handler);
  };

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
