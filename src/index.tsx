import React from 'react';
import { Component } from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
  NativeModules
} from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

const ComponentName = 'BridtvSdkModuleView';

var  { BridtvSdkModule } = NativeModules;
console.log(BridtvSdkModule);

var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);



type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig?: BridPlayerConfig;
};

interface BridPlayerConfig {
  playerID?: number;
  mediaID?: number;
  typeOfPlayer?: string;
  useVPAIDSupport?: boolean;
  setFullscreen?: boolean;
}


export default interface BridPlayer extends React.Component<BridtvSdkModuleProps>{

  play(): void;
  pause(): void;
  loadVideo(playerID: number, mediaID: number): void;
  loadPlaylist(playerID: number, mediaID: number): void;
  getPlayerCurrentTime(): Promise<number | null>;


}
let playerId = 0;
const RCT_RNJWPLAYER_REF = 'RNJWPlayerKey';

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  constructor(props: BridtvSdkModuleProps ) {
    super(props);
    // this._playerId = playerId++;
		// this.ref_key = `${RCT_RNJWPLAYER_REF}-${this._playerId}`;
  }

  componentDidMount(): void {
    // this.getPlayerCurrentTime();
  }

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

  seekToTime(time: Float) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'seekToTime', [
      time,
    ]);
  }

  async getPlayerCurrentTime(){

    if(BridtvSdkModule){
      try {
        const time = await BridtvSdkModule.getCurrentTime(findNodeHandle(this));
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
