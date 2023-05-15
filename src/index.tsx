import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
  NativeModules,
  Platform,
  Alert,
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

const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModuleView
    : NativeModules.BridtvSdkModule;

var RNBridPlayer = requireNativeComponent<BridtvSdkModuleProps>(ComponentName);

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  componentDidMount(): void {
    this.getPlayerCurrentTime();
    // this.isMuted();
  }

  play() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'play', []);
  }

  pause() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'pause', []);
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

  // isMuted() {
  //   UIManager.dispatchViewManagerCommand(
  //     findNodeHandle(this),
  //     'isMuted',
  //     []
  //     );
  // }

  seekToTime(time: Float) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'seekToTime', [
      time,
    ]);
  }

  async isMuted() {
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

  render() {
    return <RNBridPlayer {...this.props} />;
  }
}
