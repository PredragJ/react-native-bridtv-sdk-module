declare module 'react-native-bridtv-sdk-module' {
  import React from 'react';
  import { ViewStyle } from 'react-native';

  import BridPlayerError from 'react-native-bridtv-sdk-module';

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
    handleVideoError?: (errorEvent: BridPlayerError) => void;
    setPlayerState: (newValue: string) => void;
  };

  interface BridPlayerConfig {
    playerID?: number;
    mediaID?: number;
    typeOfPlayer?: string;
    useVPAIDSupport?: boolean;
    setFullscreen?: boolean;
  }

  export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
    play(): void;
    pause(): void;
    previous(): void;
    next(): void;
    mute(): void;
    unMute(): void;
    loadVideo(playerID: number, mediaID: number): void;
    loadPlaylist(playerID: number, mediaID: number): void;
    setFullscreen(fullscreen: boolean): void;
    showControlls(): void;
    hidecontrolls(): void;
    isAdPlaying(): void;
    getPlayerCurrentTime(): Promise<number | null>;
    getAdDuration(): Promise<number | null>;
    getVideoDuration(): Promise<number | null>;
    isPaused(): void;
    isRepeated(): void;
    destroyPlayer(): void;
  }
}
