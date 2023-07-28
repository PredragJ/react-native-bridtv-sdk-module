import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  NativeModules,
  Platform,
  ViewStyle,
  NativeEventEmitter,
} from 'react-native';

import { BridPlayerError } from './BridPlayerError';

const ComponentName = 'BridtvSdkModuleView';

type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig?: BridPlayerConfig;
  //Video
  handleVideoLoad?: () => void;
  handleVideoStart?: () => void;
  handleVideoPlay?: () => void;
  handleVideoBuffering?: () => void;
  handleVideoProgress?: () => void;
  handleVideoPaused?: () => void;
  handleVideoEnd?: () => void;
  handleVideoSeek?: () => void;
  handleFullscreenOpen?: () => void;
  handleFullscreenClose?: () => void;
  handleVideoAutoplay?: () => void;

  //Ad
  handleVideoAdLoaded?: () => void;
  handleVideoAdCompleted?: () => void;
  handleVideoAdResumed?: () => void;
  handleVideoAdStart?: () => void;
  handleVideoAdPaused?: () => void;
  handleAdProgress?: () => void;
  handleVideoAdTapped?: () => void;
  handleVideoAdSkipped?: () => void;

  //Video Error
  handleVideoError?: (errorEvent?: BridPlayerError) => void;
};

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  controlAutoplay?: boolean;
}
const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModuleView
    : NativeModules.BridtvSdkModule;

const BridtvSdkEmitter =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModule
    : NativeModules.BridtvSdkModule;

const BridPlayerEventsIos = {
  //Video
  videoBuffering: 'playerVideoBuffering',
  videoLoad: 'playerVideoLoad',
  videoStart: 'playerVideoStarted',
  videoPlay: 'playerVideoPlay',
  videoPaused: 'playerVideoPause',
  videoSeek: 'playerSliderValueChanged',
  videoEnd: 'playerVideoStop',
  videoError: 'playerVideoError',
  fullscreenOpen: 'playerSetFullscreenOn',
  fullscreenClose: 'playerSetFullscreenOff',

  //Ad
  videoAdLoaded: 'adLoaded',
  videoAdCompleted: 'adComplete',
  videoAdResumed: 'adResume',
  videoAdStart: 'adStarted',
  videoAdPaused: 'adPause',
  videoAdProgress: 'adProgress',
  videoAdTapped: 'adTapped',
  videoAdSkipped: 'adSkipped',
  videoAutoplay: 'playerAutoplay',
};

const BridPlayerEventsAndroid = {
  //Video
  videoBuffering: 'video_buffering',
  videoLoad: 'video_load',
  videoStart: 'video_start',
  videoPlay: 'video_played',
  videoPaused: 'video_paused',
  videoSeek: 'video_seek',
  videoEnd: 'video_ended',
  videoError: 'video_error',
  fullscreenOpen: 'fullscreen_open',
  fullscreenClose: 'fullscreen_close',
  videoAutoplay: 'video_autoplay',

  //Ad
  videoAdLoaded: 'ad_loaded',
  videoAdCompleted: 'video_ad_completed',
  videoAdResumed: 'ad_resumed',
  videoAdStart: 'ad_started',
  videoAdPaused: 'ad_paused',
  videoAdProgress: 'ad_progress',
  videoAdTapped: 'ad_tapped',
  videoAdSkipped: 'ad_skipped',
};

const BridPlayerErrorEvents = {
  //Video
  adError: {
    name: 'adError',
    message: 'Error occurred during ad playback.',
    code: '300',
  },
  videoBadUrl: {
    name: 'playerVideoBadUrl',
    message: 'Invalid video from BridTv CMS/Invalid video URL.',
    code: '101',
  },
  unsupportedFormat: {
    name: 'playerUnsupportedFormat',
    message: 'Video player error. Probably unsupported video format.',
    code: '102',
  },
  protectedContent: {
    name: 'playerProtectedContent',
    message: 'Cannot play protected content.',
    code: '103',
  },
  lostInternetConnection: {
    name: 'playerLostInternetConnection',
    message: 'Lost internet connection.',
    code: '100',
  },
  liveStreamError: {
    name: 'playerLiveStreamError',
    message: 'An error occurred during live stream playback.',
    code: '200',
  },
};

var RNBridPlayer = requireNativeComponent(ComponentName);
export const BridPlayerEvents =
  Platform.OS === 'ios' ? BridPlayerEventsIos : BridPlayerEventsAndroid;

let playerId = 0;
const RN_BRID_PLAYER_KEY = 'RnBridPlayerKey';

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  eventListener: any;
  eventEmitter = new NativeEventEmitter(BridtvSdkEmitter);

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
    if (props.handleFullscreenOpen) {
      this.onFullscreenOpen(props.handleFullscreenOpen);
    }
    if (props.handleFullscreenClose) {
      this.onFullscreenClose(props.handleFullscreenClose);
    }
    //AD EVENTS
    if (props.handleVideoAdLoaded) {
      this.onVideoAdLoaded(props.handleVideoAdLoaded);
    }
    if (props.handleVideoAdCompleted) {
      this.onVideoAdCompleted(props.handleVideoAdCompleted);
    }
    if (props.handleVideoAdResumed) {
      this.onVideoAdResumed(props.handleVideoAdResumed);
    }
    if (props.handleVideoAdStart) {
      this.onVideoAdStart(props.handleVideoAdStart);
    }
    if (props.handleVideoAdPaused) {
      this.onVideoAdPaused(props.handleVideoAdPaused);
    }
    if (props.handleAdProgress) {
      this.onVideoAdProgress(props.handleAdProgress);
    }
    if (props.handleVideoAdTapped) {
      this.onVideoAdTapped(props.handleVideoAdTapped);
    }
    if (props.handleVideoAdSkipped) {
      this.onVideoAdSkipped(props.handleVideoAdSkipped);
    }
    if (props.handleVideoAutoplay) {
      this.onVideoAutoplay(props.handleVideoAutoplay);
    }

    //VIDEO ERROR
    if (props.handleVideoError) {
      this.onVideoError(props.handleVideoError);
    }

    this.ref_key = `${RN_BRID_PLAYER_KEY}-${playerId++}`;
  }

  componentDidMount() {
    this.eventListener = this.eventEmitter.addListener(
      'BridPlayerEvents',
      (event) => {
        if (event.message !== undefined || event.name !== undefined) {
          this.handleBridPlayerEvent(
            Platform.OS === 'ios' ? event.name : event.message
          );
        } else console.log('UNDEFINED EVENT');
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
    const key = Object.keys(BridPlayerErrorEvents).find(
      (key: string) =>
        BridPlayerErrorEvents[key as keyof typeof BridPlayerErrorEvents]
          .name === eventData
    );
    if (key) {
      const errorEvent =
        BridPlayerErrorEvents[key as keyof typeof BridPlayerErrorEvents];
      const callBack = this.listeners.get('errorEvent') as
        | ((errorEvent: BridPlayerError) => void)
        | undefined;

      if (callBack) {
        callBack(errorEvent);
      }
    }

    if (Object.values(BridPlayerEvents).includes(eventData)) {
      const callBack = this.listeners.get(eventData);

      if (callBack) {
        callBack();
      }
    }

    return;
  };

  registeredListener = (eventType: string, handler: () => void) => {
    this.listeners.set(eventType, handler);
  };

  //VideoEvents
  onVideoPlay = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoPlay, handler);
  };
  onVideoLoad = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoLoad, handler);
  };

  onVideoBuffering = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoBuffering, handler);
  };

  onVideoStart = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoStart, handler);
  };

  onVideoSeek = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoSeek, handler);
  };

  onVideoPaused = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoPaused, handler);
  };

  onVideoEnd = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoEnd, handler);
  };

  onFullscreenOpen = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.fullscreenOpen, handler);
  };

  onFullscreenClose = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.fullscreenClose, handler);
  };

  //VideoAdEvents

  onVideoAdLoaded = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdLoaded, handler);
  };

  onVideoAdCompleted = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdCompleted, handler);
  };

  onVideoAdResumed = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdResumed, handler);
  };

  onVideoAdStart = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdStart, handler);
  };
  onVideoAdPaused = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdPaused, handler);
  };

  onVideoAdProgress = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdProgress, handler);
  };

  onVideoAdTapped = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdTapped, handler);
  };

  onVideoAdSkipped = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAdSkipped, handler);
  };

  onVideoAutoplay = (handler: () => void) => {
    this.registeredListener(BridPlayerEvents.videoAutoplay, handler);
  };

  //ALL PLAYER ERRORS
  onVideoError = (handler: (errorEvent?: BridPlayerError) => void) => {
    this.registeredListener('errorEvent', handler);
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

  previous() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'previous', []);
  }

  next() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'next', []);
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

  seekToTime(time: number) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'seekToTime', [
      time,
    ]);
  }

  loadVideo(playerID: number, mediaID: number) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'loadVideo', [
      playerID,
      mediaID,
    ]);
  }

  loadPlaylist(playerID: number, mediaID: number) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'loadPlaylist', [
      playerID,
      mediaID,
    ]);
  }

  showControls() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'showControls',
      []
    );
  }
  hideControls() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'hideControls',
      []
    );
  }

  showPoster() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'showPoster',
      []
    );
  }

  hidePoster() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'hidePoster',
      []
    );
  }

  //ASYNC METHODS
  async isMuted() {
    if (BridtvSdkManager) {
      try {
        const isMuted = await BridtvSdkManager.isMuted(findNodeHandle(this));
        if (Platform.OS === 'ios') {
          if (isMuted === 1) return true;
          else return false;
        } else {
          return isMuted;
        }
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

  async isPlayingAd() {
    if (BridtvSdkManager) {
      try {
        const isPlayingAd = await BridtvSdkManager.isPlayingAd(
          findNodeHandle(this)
        );
        if (Platform.OS === 'ios') {
          if (isPlayingAd === 1) return true;
          else return false;
        } else {
          return isPlayingAd;
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }

  async isPaused() {
    if (BridtvSdkManager) {
      try {
        const isPaused = await BridtvSdkManager.isPaused(findNodeHandle(this));
        if (Platform.OS === 'ios') {
          if (isPaused === 1) return true;
          else return false;
        } else {
          return isPaused;
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }

  async isRepeated() {
    if (BridtvSdkManager) {
      try {
        const isRepeated = await BridtvSdkManager.isRepeated(
          findNodeHandle(this)
        );
        if (Platform.OS === 'ios') {
          if (isRepeated === 1) return true;
          else return false;
        } else {
          return isRepeated;
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }

  async isAutoplay() {
    if (BridtvSdkManager) {
      try {
        const isAutoplay = await BridtvSdkManager.Autoplay(
          findNodeHandle(this)
        );
        if (Platform.OS === 'ios') {
          if (isAutoplay === 1) return true;
          else return false;
        } else {
          return isAutoplay;
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }

  async getVideoDuration() {
    if (BridtvSdkManager) {
      try {
        const videoDuration = await BridtvSdkManager.getVideoDuration(
          findNodeHandle(this)
        );
        console.log(videoDuration);
        return videoDuration;
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
