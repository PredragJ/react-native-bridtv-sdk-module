import React from 'react';
import { Component } from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
} from 'react-native';


type BridtvSdkModuleProps = {
  style?: ViewStyle;
  bridPlayerConfig: BridPlayerConfig;
};

interface BridPlayerConfig {
  playerID: string;
  mediaID: string;
  typeOfPlayer: string;
}

const ComponentName = 'BridtvSdkModuleView';

// const RNBridPlayerManager =
// 	Platform.OS === 'ios'
// 		? UIManager.getViewManagerConfig('BridtvSdkModuleViewManager')
// 		: UIManager.getViewManagerConfig(ComponentName);


var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);


export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {


  play() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'play',
      [],
 )
	}

  pause() {
    UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
       'pause',
        [],
   )
	}

  loadVideo(playerID: number, mediaID: number) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'loadVideo',
      [playerID,mediaID],
 )
  }

  loadPlaylist(playerID: number, mediaID: number) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'loadPlaylist',
      [playerID,mediaID],
 )
  }
  
  destroyPlayer() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'drestroyPlayer',
      [],
 )
  }
  setFullscreen(on: boolean) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'setFullscreen',
      [],
 )
  }
  mute() {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(this),
        'mute',
          [],
      )
    }

  unMute() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
    'unMute',
      [],
    )
    }
  getCurrentTime() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'getCurrentTime',
      [],
 )
  }
  seekToTime() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'seekToTime',
      [],
 )
  }
  useVpaidSupport(use: boolean) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'useVpaidSupport',
      [use],
 )
  }
  isVpaidEnabled() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'isVpaidEnabled',
      [],
 )
  }
  showControlls() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'showControlls',
      [],
 )
  }
  hideControlls() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'hideControlls',
      [],
 )
  }




  render() {
		return (
			<RNBridPlayer
        {...this.props}		
      />
		);
	}
}
