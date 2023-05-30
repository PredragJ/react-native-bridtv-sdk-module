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
    //VIEW - klasicno kreiranje
//    rnBridPlayerView = new RNBridPlayerView(reactContext.getReactApplicationContext().getCurrentActivity());

    //TEST VIEW - biranje izmedju boljeg konteksta
    rnBridPlayerView = new RNBridPlayerView(reactContext, mAppContext);

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
        WritableMap event = Arguments.createMap();

        switch (status) {
          case PlayerEvents.EVENT_VIDEO_BUFFERING:
            event.putString("message", "video_buffering");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;

          case PlayerEvents.EVENT_PLAYER_LOADED:
            event.putString("message", "video_loaded");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
          case "STARTED":
            event.putString("message", "video_start");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
          case PlayerEvents.EVENT_VIDEO_PLAY:
            event.putString("message", "video_played");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_VIDEO_PAUSE:
            event.putString("message", "video_paused");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_VIDEO_END:
            event.putString("message", "video_ended");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_VIDEO_SEEK:
            event.putString("message", "video_seek");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_LOADED:
            event.putString("message", "ad_loaded");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_COMPLETED:
            event.putString("message", "video_ad_end");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_RESUMED:
            event.putString("message", "ad_resumed");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_SKIPPED:
            event.putString("message", "ad_skipped");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_STARTED:
            event.putString("message", "ad_started");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_PAUSED:
            event.putString("message", "ad_paused");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_TAPPED:
            event.putString("message", "ad_tapped");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_ALL_ADS_COMPLETED:
            event.putString("message", "all_ads_completed");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_PROGRESS:
            event.putString("message", "ad_progress");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;
          case PlayerEvents.EVENT_AD_CLICKED:
            event.putString("message", "ad_clicked");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;

          case PlayerEvents.EVENT_FULLSCREEN_OPEN_REQUESTED:
            event.putString("message", "fullscreen_open");
            sendEvent(mReactContext, "BridPlayerEvents", event);

            break;

          case PlayerEvents.EVENT_FULLSCREEN_CLOSE_REQUESTED:
            event.putString("message", "fullscreen_close");
            sendEvent(mReactContext, "BridPlayerEvents", event);
//            onFullscreenCloseRequested();
            break;

          //PLAYER ERROR EVENTS
          case PlayerEvents.EVENT_AD_ERROR:
          case PlayerEvents.EVENT_AD_BREAK_FETCH_ERROR:
            event.putString("message", "adError");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
          case PlayerEvents.EVENT_VIDEO_ERROR:
            event.putString("message", "unsupportedFormat");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
          case PlayerEvents.EVENT_VIDEO_NETWORK_ERROR:
            event.putString("message", "lostIntenetConnection");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
          case PlayerEvents.EVENT_VIDEO_CMS_ERROR:
            event.putString("message", "videoBadUrl");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
          case PlayerEvents.EVENT_VIDEO_LIVESTREAM_ERROR:
            event.putString("message", "livestreamError");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
          case PlayerEvents.EVENT_VIDEO_PROTECTED_ERROR:
            event.putString("message", "protectedContent");
            sendEvent(mReactContext, "BridPlayerEvents", event);
            break;
        }

      }
    };
  }

  private void onFullscreenCloseRequested() {
    rnBridPlayerView.onFullscreenCloseRequested();
  }

  private void sendEvent(ReactContext reactContext,
                         String eventName,
                         @Nullable WritableMap params) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }
  @Override
  public void onDropViewInstance(@Nonnull RNBridPlayerView view) {
    view.destroyPlayer();
    super.onDropViewInstance(view);
    view = null;
  }

}
