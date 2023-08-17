package com.bridtvsdkmodule;

import static com.bridtvsdkmodule.BridPlayerCommands.*;


import static tv.brid.sdk.player.PlayerEvents.EVENT_VIDEO_NETWORK_ERROR;

import android.app.Activity;
import android.graphics.Color;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ReactOverflowViewWithInset;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import javax.annotation.Nonnull;

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;
import tv.brid.sdk.player.BridPlayerListener;
import tv.brid.sdk.player.PlayerEvents;

public class BridtvSdkModuleViewManager extends SimpleViewManager<RNBridPlayerView> {
  public static final String REACT_CLASS = "BridtvSdkModuleView";
  public ViewGroup mRootView;
  public FrameLayout frameLayout;
  public Activity mActivity;
  public ViewGroup mPlayerViewContainer;
  public RNBridPlayerView rnBridPlayerView;
  public ThemedReactContext mReactContext;
  private final ReactApplicationContext mAppContext;

  public BridPlayer bridPlayer;

  public BridPlayerListener bridPlayerListener;


  @Override
  @NonNull
  public String getName() {
    return REACT_CLASS;
  }

  public BridtvSdkModuleViewManager(ReactApplicationContext context){
    mAppContext = context;
  }

  @Override
  @NonNull
  public RNBridPlayerView createViewInstance(ThemedReactContext reactContext) {

    mReactContext = reactContext;

    return  new RNBridPlayerView(reactContext, mAppContext);
  }



  @ReactProp(name = "bridPlayerConfig")
  public void setPlayerConfig(RNBridPlayerView bridPlayerView, ReadableMap prop) {
    bridPlayerView.setConfig(prop);
  }

  @Override
  public void receiveCommand(@NonNull RNBridPlayerView bridPlayerView, String commandId, @Nullable ReadableArray args) {
    super.receiveCommand(bridPlayerView, commandId, args);
    int playerID, mediaID, seekToTime = 0;
    boolean isFullscreen;

    switch (commandId) {
      case LOAD_VIDEO:
         playerID = args.getInt(0);
         mediaID = args.getInt(1);
           bridPlayerView.loadVideo(playerID,mediaID);
        break;
      case LOAD_PLAYLIST:
         playerID = args.getInt(0);
         mediaID = args.getInt(1);
          bridPlayerView.loadPlaylist(playerID, mediaID);
      case PLAY:
          bridPlayerView.play();
        break;
      case PAUSE:
          bridPlayerView.pause();
        break;
      case DESTROY_PLAYER:
          bridPlayerView.destroyPlayer();
          break;
      case SET_FULLSCREEN:
        isFullscreen = args.getBoolean(0);
        bridPlayerView.setFullScreen(isFullscreen);
        break;
      case UNMUTE:
        bridPlayerView.unMute();
        break;
      case MUTE:
        bridPlayerView.mute();
        break;
      case SEEK_TO_TIME:
        seekToTime = args.getInt(0);
        bridPlayerView.seekToTime(seekToTime);
        break;
      case SHOW_CONTROLS:
        bridPlayerView.showControls();
        break;
      case HIDE_CONTROLS:
        bridPlayerView.hideControls();
        break;
      case PREVIOUS:
        bridPlayerView.previous();
        break;
      case NEXT:
        bridPlayerView.next();
        break;
      case SHOW_POSTER:
        bridPlayerView.showPoster();
        break;
      case HIDE_POSTER:
        bridPlayerView.hidePoster();
    }
  }
  @Override
  public void onDropViewInstance(@Nonnull RNBridPlayerView view) {
    view.destroyPlayer();
    super.onDropViewInstance(view);
    view = null;
  }

}
