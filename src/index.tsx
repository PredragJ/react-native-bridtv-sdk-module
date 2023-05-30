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

import { BridPlayerError } from './BridPlayerError';
const ComponentName = 'BridtvSdkModuleView';

const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModule
    : NativeModules.BridtvSdkModule;

const BridPlayerEventsIos = {
  //Video
  videoBuffering: 'playerVideoBuffering',
  videoLoad: 'playerVideoInitialized',
  videoStart: 'playerVideoStarted',
  videoPlay: 'playerVideoPlay',
  videoPaused: 'playerVideoPause',
  videoProgress: 'Nemam pojma',
  videoSeek: 'playerSliderValueChanged',
  videoEnd: 'playerStop',
  videoError: 'playerVideoError',
  fullscreenOpen: 'playerSetFullscreenOn',
  fullscreenClose: 'playerSetFullscreenOff',

  //Ad
  videoAdLoaded: 'adLoaded',
  videoAdCompleted: 'adComplete',
  videoAdResumed: 'adResume',
  videoAdStart: 'adStarted',
  videoAdPaused: 'adPause',
  videoAdProgress: 'Nemam pojma',
  videoAdEnd: 'adComplete',
  videoAdTapped: 'adTapped',
  videoAdSkipped: 'adSkipped',
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
  videoAdLoaded: 'ad_loaded',
  videoAdCompleted: 'video_ad_end',
  videoAdResumed: 'ad_resumed',
  videoAdStart: 'ad_started',
  videoAdPaused: 'ad_paused',
  videoAdProgress: 'ad_progress',
  videoAdEnd: 'video_ad_end',
  videoAdTapped: 'ad_tapped',
  videoAdSkipped: 'ad_skipped',
};

const BridPlayerErrorEvents = {
  //Video
  adError: {
    name: 'adError',
    message: 'Error occurred during ad playback.',
    code: '300'
  },
  videoBadUrl: {
    name: 'videoBadUrl',
    message: 'Invalid video from BridTv CMS/Invalid video URL.',
    code: '101'
  },
  unsupportedFormat: {
    name: 'unsupportedFormat',
    message: 'Video player error. Probably unsupported video format.',
    code: '102'
  },
  protectedContent: {
    name: 'protectedContent',
    message: 'Cannot play protected content.',
    code: '103'
  },
  lostIntenetConnection: {
    name: 'lostIntenetConnection',
    message: 'Lost internet connection.',
    code: '100'
  },
  liveStreamError: {
    name: 'livestreamError',
    message: 'An error occurred during live stream playback.',
    code: '200'
  },

};

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
  handleFulscreenOpen?(): void;
  handleFulscreenClose?(): void;

  //Ad
  handlevideoAdLoaded?(): void;
  handlevideoAdCompleted?(): void;
  handlevideoAdResumed?(): void;
  handleVideoAdStart?(): void;
  handlevideoAdPaused?(): void;
  handleAdProgress?(): void;
  handleVideoAdTapped?(): void;
  handleVideoAdSkiped?(): void;
  handleVideoAdEnd?(): void;

  //Video Error
  handleVideoError? (error: BridPlayerError): void;

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
    if (props.handleFulscreenOpen) {
      this.onFullscreenOpen(props.handleFulscreenOpen);
    }
    if (props.handleFulscreenClose) {
      this.onFullscreenClose(props.handleFulscreenClose);
    }
    //AD EVENTS
    if (props.handlevideoAdLoaded) {
      this.onVideoAdLoaded(props.handlevideoAdLoaded);
    }
    if (props.handlevideoAdCompleted) {
      this.onVideoAdCompleted(props.handlevideoAdCompleted);
    }
    if (props.handlevideoAdResumed) {
      this.onVideoAdResumed(props.handlevideoAdResumed);
    }
    if (props.handleVideoAdStart) {
      this.onVideoAdStart(props.handleVideoAdStart);
    }
    if (props.handlevideoAdPaused) {
      this.onVideoAdPaused(props.handlevideoAdPaused);
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

    //VIDEO ERROR
    if (props.handleVideoError) {
      this.onVideoError(props.handleVideoError);
    }

    this.props.setPlayerState('Initial state');

    this.ref_key = `${RN_BRID_PLAYER_KEY}-${playerId++}`;
  }

  componentDidMount() {
    this.eventListener = this.eventEmitter.addListener(
      'BridPlayerEvents',
      (event) => {
        if(event.message !== undefined || event.name !== undefined){
          this.handleBridPlayerEvent(
            Platform.OS === 'ios' ? event.name : event.message
          );
        } else
          console.log("UNDEFINED EVENT");
      }
    );
  }

  componentWillUnmount() {
    //remove the listeners
    if (this.eventListener) {
      this.eventListener.remove();
    }
    this.pause();
    this.destroyPlayer();
  }

  handleBridPlayerEvent = (eventData: any) => {
    const key = Object.keys(BridPlayerErrorEvents).find((key: string)=> BridPlayerErrorEvents[key  as keyof typeof BridPlayerErrorEvents].name === eventData);
    if(key) {
      // console.log(BridPlayerErrorEvents[key as keyof typeof BridPlayerErrorEvents]);
      const callBack = this.listeners.get("error") as ((error: BridPlayerError) => void) | undefined;

      if (callBack) {
          console.log("JOS SMO U MODULU>>>>" + BridPlayerErrorEvents[key as keyof typeof BridPlayerErrorEvents].code);

        callBack(BridPlayerErrorEvents[key as keyof typeof BridPlayerErrorEvents]);
      }
    }

    if(Object.values(BridPlayerEvents).includes(eventData)) {
      const callBack = this.listeners.get(eventData);

      if (callBack) {
        callBack();
      }
    }

    return;
  };


  registedListener = (eventType: string, handler: Function) => {
    this.listeners.set(eventType, () => {
      this.props.setPlayerState(eventType);
      handler();
    });
  };

  registedErrorListener = (eventType: string, handler: Function) => {
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

  onVideoAdLoaded = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdLoaded, handler);
  };

  onVideoAdCompleted = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdCompleted, handler);
  };

  onVideoAdResumed = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdResumed, handler);
  };

  onVideoAdStart = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdStart, handler);
  };
  onVideoAdPaused = (handler: () => void) => {
    this.registedListener(BridPlayerEvents.videoAdPaused, handler);
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

  //ALL PLAYER ERRORS
  onVideoError = (handler: (error: BridPlayerError) => void) => {
    this.registedListener("error", handler);
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

  //NEED TO BE IMPLEMENTED  
  //loadVideo
  //loadPlaylist
  //previous
  //next
  //isPlayingAd
  //getAdPlayerCurrentTime
  //getAdDuration
  //getVideoDuration
  //showControlls - enabluje pokazivanje kontrola
  //hidecontrolls - disabluje u potpunosti pokazivanje kontrola
  //isPaused
  //isRepeated - na kraju videa


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
