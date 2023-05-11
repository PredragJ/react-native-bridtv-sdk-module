import React from 'react';
import { Component } from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
} from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig: BridPlayerConfig;
};

interface BridPlayerConfig {
  playerID: number;
  mediaID: number;
  typeOfPlayer: string;
  useVPAIDSupport?: boolean;
  setFullscreen?: boolean;
}

const ComponentName = 'BridtvSdkModuleView';

var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  play() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'play', []);
  }

  pause() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'pause', []);
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

  destroyPlayer() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'drestroyPlayer',
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

  getCurrentTime() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'getCurrentTime',
      []
    );
  }
  seekToTime(time: Float) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'seekToTime', [
      time,
    ]);
  }

  render() {
    return <RNBridPlayer {...this.props} />;
  }
}
