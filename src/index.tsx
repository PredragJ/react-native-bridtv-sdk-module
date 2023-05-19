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
      videoAdStart: "",
      videoLoad:"",
      videoProgress: "",
      videoPaused:"",
      videoSeek: "",
      videoEnd: "",
      videoError: "",
      videoAdProgress: "",
      videoAdEnd: "",
      videoAdTapped: "",
      videoAdSkipped: "",
    };

  const BridPlayerEventsAndroid = {
      videoAdStart: "ad_started",
      videoLoad:"video_loaded",
      videoProgress: "video_progress",
      videoPaused: "video_paused",
      videoSeek: "video_seek",
      videoEnd: "video_ended",
      videoError: "video_error",
      videoAdProgress: "ad_progress",
      videoAdEnd: "video_ad_end",
      videoAdTapped: "ad_tapped",
      videoAdSkipped: "ad_skipped",
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
  handleVideoPaused(): void;
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
    this.onVideoAdProgress(props.handleAdProgress);
    this.onVideoAdTapped(props.handleVideoAdTapped);
    this.onVideoAdSkiped(props.handleVideoAdSkiped);
    this.onVideoPaused(props.handleVideoPaused)
    this.onVideoAdEnd(props.handleVideoAdEnd);
    this.onVideoEnd(props.handleVideoEnd);
    this.onVideoSeek(props.handleVideoSeek);
    this.onVideoError(props.handleVideoError);
    this.props.setPlayerState('Initial state');
    // this._playerId = playerId++;
    // this.ref_key = `${RN_BRID_PLAYER_KEY}-${this._playerId}`;
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

  onVideoPaused = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoPaused, handler);
  }

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
