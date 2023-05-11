import React from 'react';
import { Component } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  StyleSheet,
  Alert,
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

const RNBridPlayerManager =
	Platform.OS === 'ios'
		? UIManager.getViewManagerConfig('BridtvSdkModuleViewManager')
		: UIManager.getViewManagerConfig(ComponentName);




    var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);


export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  playerRef = React.createRef<any>();

  //ovde idu probovi


  play() {
		// if (RNBridPlayerManager)
    //     RNBridPlayerManager.play();
	}

  pause() {
    UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
       'pause',
        [],
   )
	}

  start() {
  }

  loadVideo(playerID: number, mediaID: number) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
     'loadVideo',
      [playerID, mediaID],
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
