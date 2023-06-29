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
  handleFulscreenOpen?: () => void;
  handleFulscreenClose?: () => void;

  //Ad
  handlevideoAdLoaded?: () => void;
  handlevideoAdCompleted?: () => void;
  handlevideoAdResumed?: () => void;
  handleVideoAdStart?: () => void;
  handlevideoAdPaused?: () => void;
  handleAdProgress?: () => void;
  handleVideoAdTapped?: () => void;
  handleVideoAdSkiped?: () => void;
  handleVideoAdEnd?: () => void;

  //Video Error
  handleVideoError?: (errorEvent?: BridPlayerError) => void;
};

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  setFullscreen?: boolean;
  controlAutoplay?: boolean;
  enableAdControls?: boolean;
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
    code: '300',
  },
  videoBadUrl: {
    name: 'playerVideoBadUrl',
    message: 'Invalid video from BridTv CMS/Invalid video URL.',
    code: '101',
  },
  unsupportedFormat: {
    name: 'playernsupportedFormat',
    message: 'Video player error. Probably unsupported video format.',
    code: '102',
  },
  protectedContent: {
    name: 'playerProtectedContent',
    message: 'Cannot play protected content.',
    code: '103',
  },
  lostIntenetConnection: {
    name: 'playerLostIntenetConnection',
    message: 'Lost internet connection.',
    code: '100',
  },
  liveStreamError: {
    name: 'playerLivestreamError',
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

    //VIDEO ERRORr
    if (props.handleVideoError) {
      this.onVideoError(props.handleVideoError);
    }

    // this.setPlayerState('Initial state');

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

  registedListener = (eventType: string, handler: () => void) => {
    this.listeners.set(eventType, handler);
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
  onVideoError = (handler: (errorEvent?: BridPlayerError) => void) => {
    this.registedListener('errorEvent', handler);
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

  showControlls() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'showControlls',
      []
    );
  }
  hideControlls() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'hideControlls',
      []
    );
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

  async isPlayingAd() {
    if (BridtvSdkManager) {
      try {
        const isPlayingAd = await BridtvSdkManager.isAdPlaying(
          findNodeHandle(this)
        );
        return isPlayingAd;
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
        return isPaused;
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
        return isRepeated;
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
        return isAutoplay;
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
