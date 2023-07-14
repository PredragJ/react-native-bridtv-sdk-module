declare module 'react-native-bridtv-sdk-module' {
  import React from 'react';
  import { ViewStyle } from 'react-native';

  import BridPlayerError from 'react-native-bridtv-sdk-module';

  export type BridtvSdkModuleProps = {
    style?: ViewStyle;
    bridPlayerConfig?: BridPlayerConfig;
    //Video
    handleVideoLoad?: () => void;
    handleVideoStart?: () => void;
    handleVideoPlay?: () => void;
    handleVideoBuffering?: () => void;
    handleVideoProgress?: () => void; //not yet implemented
    handleVideoPaused?: () => void;
    handleVideoEnd?: () => void;
    handleVideoSeek?: () => void;
    handleFulscreenOpen?: () => void;
    handleFulscreenClose?: () => void;
    handleVideoAutoplay?: () => void;

    //Ad
    handlevideoAdLoaded?: () => void;
    handlevideoAdCompleted?: () => void;
    handlevideoAdResumed?: () => void;
    handleVideoAdStart?: () => void;
    handlevideoAdPaused?: () => void;
    handleAdProgress?: () => void;
    handleVideoAdTapped?: () => void;
    handleVideoAdSkiped?: () => void;

    //Video Error
    handleVideoError?: (errorEvent: BridPlayerError) => void;
  };

  export interface BridPlayerConfig {
    playerID?: number;
    mediaID?: number;
    typeOfPlayer?: string;
    useVPAIDSupport?: boolean;
    controlAutoplay?: boolean;
  }

  export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
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
    hidecontrols(): void;
    showPoster(): void;
    hidePoster(): void;
    isMuted(): boolean;
    isPlayingAd(): boolean;
    getPlayerCurrentTime(): Promise<number | null>; //time in miliseconds
    getVideoDuration(): Promise<number | null>; //time in miliseconds
    isPaused(): boolean;
    isRepeated(): boolean;
    isAutoplay(): boolean;
  }
}
