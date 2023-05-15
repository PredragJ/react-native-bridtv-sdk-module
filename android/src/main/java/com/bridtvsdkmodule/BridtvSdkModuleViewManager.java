package com.bridtvsdkmodule;

import static com.bridtvsdkmodule.BridPlayerCommands.*;


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

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;
import tv.brid.sdk.player.BridPlayerListener;

public class BridtvSdkModuleViewManager extends SimpleViewManager<RNBridPlayerView> {
  public static final String REACT_CLASS = "BridtvSdkModuleView";
  public View mRootView;
  public FrameLayout frameLayout;
  public Activity mActivity;
  public ViewGroup mPlayerViewContainer;
  public RNBridPlayerView rnBridPlayerView;
  public ThemedReactContext mReactContext;

  public BridPlayer bridPlayer;

  public BridPlayerListener bridPlayerListener;

  @Override
  @NonNull
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  @NonNull
  public RNBridPlayerView createViewInstance(ThemedReactContext reactContext) {

    mReactContext = reactContext;
    rnBridPlayerView = new RNBridPlayerView(reactContext);
    bridPlayer = rnBridPlayerView.getBridPlayer();

    setupPlayerListener();

    return  rnBridPlayerView;
  }



  @ReactProp(name = "bridPlayerConfig")
  public void setPlayerConfig(RNBridPlayerView bridPlayerView, ReadableMap prop) {
    int playerId = 0,mediaId = 0;
    boolean useVpaid = false, playlist = false, isFullscreen = false;
    try {
      if(prop.hasKey("playerID"))
        playerId = (int) prop.getDouble("playerID");
      if(prop.hasKey("mediaID"))
        mediaId = (int) prop.getDouble("mediaID");
      if(prop.hasKey("typeOfPlayer"))
        playlist = prop.getString("typeOfPlayer").equals("Playlist");

      if(prop.hasKey("useVPAIDSupport"))
        useVpaid = prop.getBoolean("useVPAIDSupport");
      if(prop.hasKey("setFullscreen"))
        isFullscreen = prop.getBoolean("setFullscreen");

      if(playlist)
        bridPlayerView.loadPlaylist(playerId,mediaId);
      else
        bridPlayerView.loadVideo(playerId, mediaId, useVpaid, isFullscreen);

      if(bridPlayerListener != null)
        bridPlayer.setBridListener(bridPlayerListener);

    } catch (NumberFormatException e){
      bridPlayerView.toastMessage(e.getMessage());
    }
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

    }
  }


  private void setupPlayerListener() {
    bridPlayerListener = new BridPlayerListener() {
      @Override
      public void onEvent(String status) {
        Log.d("BridPlayerEvent", status);
        WritableMap params = Arguments.createMap();
        params.putString("eventProperty", status);
        sendEvent(mReactContext, "EventReminder", params);



      }
    };
  }

  private void sendEvent(ReactContext reactContext,
                         String eventName,
                         @Nullable WritableMap params) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

  @ReactMethod
  public void addListener(String eventName) {
//    if (listenerCount == 0) {
//      // Set up any upstream listeners or background tasks as necessary
//    }
//
//    listenerCount += 1;
  }

  @ReactMethod
  public void removeListeners(Integer count) {
//    listenerCount -= count;
//    if (listenerCount == 0) {
//      // Remove upstream listeners, stop unnecessary background tasks
//    }
  }
}
