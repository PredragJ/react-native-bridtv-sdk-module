import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  ViewStyle,
  findNodeHandle,
  NativeModules,
  Platform,
  NativeEventEmitter 
} from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

const ComponentName = 'BridtvSdkModuleView';

const BridtvSdkManager =
  Platform.OS === 'ios'
    ? NativeModules.BridtvSdkModuleView
    : NativeModules.BridtvSdkModule;


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
// let playerId = 0;
// const RN_BRID_PLAYER_KEY = 'RnBridPlayerKey';

export default class BridPlayer extends React.Component<BridtvSdkModuleProps> {
  eventListener: any;
  eventEmitter = new NativeEventEmitter(BridtvSdkManager);


  constructor(props: BridtvSdkModuleProps ) {
    super(props);
    // this._playerId = playerId++;
		// this.ref_key = `${RN_BRID_PLAYER_KEY}-${this._playerId}`;
  }

  componentDidMount(){
    this.eventListener = this.eventEmitter.addListener('BridPlayerEvents', event => {
      // console.log('Ovo je BridPlayer:', event);

      this.eventEmitter.emit('RNBridPlayerEvent',event.message);

    });
  }

  componentWillUnmount(){
    this.eventEmitter.removeAllListeners('BridPlayerEvents');
    // this.eventListener.removeListeners();
    //removes the listener
  }

  play() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'play', []);
  }

  pause() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'pause', []);
  }

  mute() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'mute', []);
  }
  unMute() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), 'unMute', []);
  }

  destroyPlayer() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      'destroyPlayer',
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

  async isMuted() {
    if (BridtvSdkManager) {
      try {
        const isMuted = await BridtvSdkManager.isMuted(
          findNodeHandle(this)
        );
        return isMuted;
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

const useBridPlayer = () => {
  const listeners: Map<string, () => void> = new Map();
  const [playerState] = React.useState('Initial state');
  const eventEmitter = new NativeEventEmitter(NativeModules.BridPlayer);
  
  const handleBridPlayerEvent = (eventData: any) => {
    // setPlayerState(eventData)
    const callBack = listeners.get(eventData);

    if(callBack){
      callBack();
    }
  };
  eventEmitter.addListener('RNBridPlayerEvent', handleBridPlayerEvent);

  
  const registedListener = (eventType: string, handler: Function)=>{
    listeners.set(eventType, ()=>{
      handler();
    })
  }

  const onVideoLoad = (handler: ()=>void )=>{
    registedListener('video loaded', handler);
  };

  const onVideoAdStart = (handler:()=>void)=>{
    registedListener('ad started', handler);
  };


  return {
    playerState,
    onVideoLoad,
    onVideoAdStart
  }
}

export  {useBridPlayer};


