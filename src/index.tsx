import React from 'react';
import { Component } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  StyleSheet,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-bridtv-sdk-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

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




const RNBridPlayer = requireNativeComponent(ComponentName);


export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  playerRef = React.createRef<any>();

  //ovde idu probovi


  play() {
		const { current } = this.playerRef;
      if (current) {
        current.play();
      }
	}

  pause() {
		const { current } = this.playerRef;
      if (current) {
        current.pause();
      }
	}


  

  render() {
		return (
      
			<RNBridPlayer 
      ref={this.playerRef}
       {...this.props}		
      />
		);
	}
}
