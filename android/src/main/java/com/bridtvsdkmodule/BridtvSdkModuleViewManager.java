package com.bridtvsdkmodule;

import static com.bridtvsdkmodule.BridPlayerCommands.LOAD_PLAYLIST;
import static com.bridtvsdkmodule.BridPlayerCommands.LOAD_VIDEO;
import static com.bridtvsdkmodule.BridPlayerCommands.PAUSE;
import static com.bridtvsdkmodule.BridPlayerCommands.PLAY;

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
  public void setLoadVideo(RNBridPlayerView bridPlayerView, ReadableMap prop) {
    int playerId = 0,mediaId = 0;
    boolean autoplay = false, playlist = false;
    try {
      playerId = Integer.parseInt(prop.getString("playerID"));
      mediaId = Integer.parseInt(prop.getString("mediaID"));
//      autoplay = prop.getBoolean("autoplay");
      playlist = prop.getString("typeOfPlayer").equals("Playlist") ? true : false;

      Log.d("ModuleManager", ""+playerId+"_" + mediaId +"_" + prop.getString("typeofPlayer"));
      if(playlist)
        bridPlayerView.loadPlaylist(playerId,mediaId);
      else
        bridPlayerView.loadVideo(playerId, mediaId);

    } catch (NumberFormatException e){
      bridPlayerView.toastMessage(e.getMessage());
    }
  }
  @ReactMethod
  public void play() {
    bridPlayer.play();
  }

  @ReactMethod
  public void pause() {
    bridPlayer.pause();
  }

  @Override
  public void receiveCommand(@NonNull RNBridPlayerView bridPlayerView, String commandId, @Nullable ReadableArray args) {
    super.receiveCommand(bridPlayerView, commandId, args);
    int playerID, mediaID;

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
      case PAUSE:

        Log.d("ModuleManager", "" + bridPlayerView.getRNView().toString()+commandId +args.toString());



        break;
    }
  }

}
