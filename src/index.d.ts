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
    handleVideoError?: (errorEvent: BridPlayerError) => void;
  };

  export interface BridPlayerConfig {
    playerID?: number;
    mediaID?: number;
    typeOfPlayer?: string;
    useVPAIDSupport?: boolean;
    controlAutoplay?: boolean;
    scrollOnAd?: boolean;
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
    hideControls(): void;
    showPoster(): void;
    hidePoster(): void;
    isMuted(): boolean;
    isPlayingAd(): boolean;
    getPlayerCurrentTime(): Promise<number | null>; //time in milliseconds
    getVideoDuration(): Promise<number | null>; //time in milliseconds
    isPaused(): boolean;
    isRepeated(): boolean;
    isAutoplay(): boolean;
  }
}
