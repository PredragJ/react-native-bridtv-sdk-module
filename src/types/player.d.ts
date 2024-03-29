import { ViewStyle } from 'react-native';

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  controlAutoplay?: boolean;
  scrollOnAd?: boolean;
  creditsLabelColor?: string; // 6 characters HEX
  playerReference?: string;
  setCornerRadius?: number;
  localization?: string;
  doubleTapSeek?: number;
  seekPreview?: number;
}

export type BridtvSdkModuleProps = {
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
  //Pip
  handlePlayerEnterPip?: () => void;
  handlePlayerExitPip?: () => void;

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
  handleVideoError?: (errorEvent?: BridPlayerEventErrorType) => void;

  //Handle all player events
  handleAllPlayerEvents?: () => void;
};

export interface BridPlayerInterface {
  play(): void;
  pause(): void;
  previous(): void;
  next(): void;
  mute(): void;
  unMute(): void;
  destroyPlayer(): void;
  setFullscreen(fullscreen: boolean): void;
  seekToTime(time: number): void;
  loadVideo(playerID: number, mediaID: number): void;
  loadPlaylist(playerID: number, mediaID: number): void;
  showControls(): void;
  hideControls(): void;
  showPoster(): void;
  hidePoster(): void;
  isMuted(): Promise<any>;
  isPlayingAd(): Promise<any>;
  getPlayerCurrentTime(): Promise<number | null>; //time in milliseconds
  getVideoDuration(): Promise<number | null>; //time in milliseconds
  isPaused(): Promise<any>;
  isRepeated(): Promise<any>;
  isAutoplay(): Promise<any>;
}
