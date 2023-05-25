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
  //Video
  videoBuffering: 'DODATI SA IOSA',
  videoLoad: 'playerVideoInitialized',
  videoStart: 'DODATI SA IOSA',
  videoPlay: 'DODATI SA IOSA',
  videoProgress: '',
  videoSeek: 'playerSliderValueChanged',
  videoEnd: 'playerStop',
  videoError: 'playerVideoError',
  fullscreenOpen: 'DODATI SA IOSA',
  fullscreenClose: 'DODATI SA IOSA',

  //Ad
  videoAdStart: 'adStarted',
  videoAdProgress: '',
  videoAdEnd: 'adComplete',
  videoAdTapped: 'adTapped',
  videoAdSkipped: 'adSkipped',
  videoPaused: '',
};

const BridPlayerEventsAndroid = {
  //Video
  videoBuffering: 'video_buffering',
  videoLoad: 'video_loaded',
  videoStart: 'video_start',
  videoPlay: 'video_played',
  videoProgress: 'video_progress',
  videoPaused: 'video_paused',
  videoSeek: 'video_seek',
  videoEnd: 'video_ended',
  videoError: 'video_error',
  fullscreenOpen: 'fullscreen_open',
  fullscreenClose: 'fullscreen_close',

  //Ad
  videoAdStart: 'ad_started',
  videoAdProgress: 'ad_progress',
  videoAdEnd: 'video_ad_end',
  videoAdTapped: 'ad_tapped',
  videoAdSkipped: 'ad_skipped',
};

//onPlayerStateChange
//onFullscreenChange
var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);

type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig?: BridPlayerConfig;
  //Video
  handleVideoLoad?(): void;
  handleVideoStart?(): void;
  handleVideoPlay?(): void;
  handleVideoBuffering?(): void;
  handleVideoProgress?(): void;
  handleVideoPaused?(): void;
  handleVideoEnd?(): void;
  handleVideoSeek?(): void;
  handleVideoError?(): void;
  handleFulscreenOpen?(): void;
  handleFulscreenClose?(): void;

  //Ad
  handleVideoAdStart?(): void;
  handleAdProgress?(): void;
  handleVideoAdTapped?(): void;
  handleVideoAdSkiped?(): void;
  handleVideoAdEnd?(): void;

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
    //VIDEO EVENTS
    if (props.handleVideoLoad) {
      this.onVideoLoad(props.handleVideoLoad);
    }
    if (props.handleVideoStart) {
      this.onVideoStart(props.handleVideoStart);
    }
    if (props.handleVideoPlay) {
      this.onVideoPlay(props.handleVideoPlay);
    }
    if (props.handleVideoBuffering) {
      this.onVideoBuffering(props.handleVideoBuffering);
    }
    if (props.handleVideoPaused) {
      this.onVideoPaused(props.handleVideoPaused);
    }
    if (props.handleVideoEnd) {
      this.onVideoEnd(props.handleVideoEnd);
    }
    if (props.handleVideoSeek) {
      this.onVideoSeek(props.handleVideoSeek);
    }
    if (props.handleVideoError) {
      this.onVideoError(props.handleVideoError);
    }
    if (props.handleFulscreenOpen) {
      this.onFullscreenOpen(props.handleFulscreenOpen);
    }
    if (props.handleFulscreenClose) {
      this.onFullscreenClose(props.handleFulscreenClose);
    }
    //AD EVENTS
    if (props.handleVideoAdStart) {
      this.onVideoAdStart(props.handleVideoAdStart);
    }
    if (props.handleAdProgress) {
      this.onVideoAdProgress(props.handleAdProgress);
    }
    if (props.handleVideoAdTapped) {
      this.onVideoAdTapped(props.handleVideoAdTapped);
    }
    if (props.handleVideoAdSkiped) {
      this.onVideoAdSkiped(props.handleVideoAdSkiped);
    }
    if (props.handleVideoAdEnd) {
      this.onVideoAdEnd(props.handleVideoAdEnd);
    }

    this.props.setPlayerState('Initial state');
    
    this.ref_key = `${RN_BRID_PLAYER_KEY}-${playerId++}`;
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

  //VideoEvents
  onVideoPlay = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoPlay, handler);
  };
  onVideoLoad = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoLoad, handler);
  };

  onVideoBuffering = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoBuffering, handler);
  };

  onVideoStart = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoStart, handler);
  };

  onVideoProgress = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoProgress, handler);
  };

  onVideoSeek = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoSeek, handler);
  };
  
  onVideoPaused = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoPaused, handler);
  };


  onVideoEnd = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoEnd, handler);
  };

  onFullscreenOpen = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.fullscreenOpen, handler);
  };

  onFullscreenClose = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.fullscreenClose, handler);
  };

  //VideoAdEvents

  onVideoAdStart = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdStart, handler);
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

  onVideoError = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoError, handler);
  };

  //PLAYER COMMANDS
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

  //ASYNC METHODS
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

  //BRID PLAYER NATIVE
  render() {
    return <RNBridPlayer key={this.ref_key} {...this.props} />;
  }
}
