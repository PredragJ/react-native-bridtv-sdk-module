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
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ReactOverflowViewWithInset;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;

public class BridtvSdkModuleViewManager extends SimpleViewManager<RNBridPlayerView> {
  public static final String REACT_CLASS = "BridtvSdkModuleView";
  public View mRootView;
  public FrameLayout frameLayout;
  public Activity mActivity;
  public ViewGroup mPlayerViewContainer;
  public RNBridPlayerView rnBridPlayerView;
  public ThemedReactContext mReactContext;

  public BridPlayer bridPlayer;

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

    return  rnBridPlayerView;
  }

  @ReactProp(name = "bridPlayerConfig")
  public void setPlayerConfig(RNBridPlayerView bridPlayerView, ReadableMap prop) {
    int playerId = 0,mediaId = 0;
    boolean autoplay = false, playlist = false;
    try {
      playerId = (int) prop.getDouble("playerID");
      mediaId = (int) prop.getDouble("mediaID");
//      autoplay = prop.getBoolean("autoplay");
      playlist = prop.getString("typeOfPlayer").equals("Playlist") ? true : false;

      if(playlist)
        bridPlayerView.loadPlaylist(playerId,mediaId);
      else
        bridPlayerView.loadVideo(playerId, mediaId);

    } catch (NumberFormatException e){
      bridPlayerView.toastMessage(e.getMessage());
    }
  }

  @Override
  public void receiveCommand(@NonNull RNBridPlayerView bridPlayerView, String commandId, @Nullable ReadableArray args) {
    super.receiveCommand(bridPlayerView, commandId, args);
    int playerID, mediaID;
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
        break;
      case SET_FULLSCREEN:
        isFullscreen = args.getBoolean(0);
        bridPlayerView.setFullScreen(isFullscreen);
        break;

      case UNMUTE:
        break;

      case MUTE:
        break;

      case GET_CURRENT_TIME:
        break;

      case SEEK_TO_TIME:
        break;
      case SHOW_CONTROLS:
        break;

      case HIDE_CONTROLS:
        break;

    }
  }
}
