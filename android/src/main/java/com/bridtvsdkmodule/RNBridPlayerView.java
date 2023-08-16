package com.bridtvsdkmodule;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.text.ReactTextView;
import com.facebook.react.views.view.ReactViewGroup;

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;
import tv.brid.sdk.player.BridPlayerListener;
import tv.brid.sdk.player.PlayerEvents;

class RNBridPlayerView extends FrameLayout implements LifecycleEventListener, BridPlayerListener{

    private BridPlayer bridPlayer;
    private Context mContext;
    private BridPlayerBuilder bridPlayerBuilder;

    private ThemedReactContext mThemedReactContext;
    private ReactApplicationContext mAppContext;
    private ReactActivity mActivity;
    private ViewGroup mRootView;
    private RNBridPlayerView mPlayerView;
  public String playerReferenceString = null;



  public RNBridPlayerView(@NonNull Context context) {
        super(context);
        mContext = context;
//        mThemedReactContext = (ThemedReactContext) context;
        init(context);
    }

  public RNBridPlayerView(@NonNull ThemedReactContext context, ReactApplicationContext reactApplicationContext) {
    super(getNonBuggyContext(context, reactApplicationContext));
    mRootView = this;
    mAppContext = reactApplicationContext;
    mThemedReactContext = context;
    mActivity = (ReactActivity) context.getReactApplicationContext().getCurrentActivity();
    mRootView = mActivity.findViewById(android.R.id.content);

    reactApplicationContext.addLifecycleEventListener(this);
    init(context.getReactApplicationContext().getCurrentActivity());
  }


  public RNBridPlayerView(@NonNull Context context, View rootView) {
    super(context);
    mContext = context;
    init(context);
  }


    public RNBridPlayerView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public RNBridPlayerView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public RNBridPlayerView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    private void init(Context context) {

        this.setFocusable(true);
        this.setFocusableInTouchMode(true);

        setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.setLayoutParams(new LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          LinearLayout.LayoutParams.MATCH_PARENT));


        bridPlayerBuilder =  new BridPlayerBuilder(context, RNBridPlayerView.this);
        bridPlayer = bridPlayerBuilder.build();
    }

    public void setPlayerId(int playerId, int videoId){
    }

    public View getRNView() {
        return this;
    }


    public BridPlayer getBridPlayer() {
        return bridPlayer;
    }

  public void loadVideo(int playerId, int videoId, boolean vpaidSupport, boolean isFullscreen, boolean controlAutoplay, boolean enableAdControls, String creditsLabelColor, String playerReference) {
    if (bridPlayer != null) {

      bridPlayerBuilder =  new BridPlayerBuilder(getContext(), RNBridPlayerView.this);
      bridPlayerBuilder.useVpaidSupport(vpaidSupport);
//      bridPlayerBuilder.fullscreen(isFullscreen);
      bridPlayerBuilder.enableAutoplay(!controlAutoplay);
      bridPlayerBuilder.setCreditsLabelColor(creditsLabelColor);
      if(playerReference != null)
        bridPlayerBuilder.setPlayerReference(playerReference);
      bridPlayer = bridPlayerBuilder.build();
      bridPlayer.setBridListener(this);
      bridPlayer.loadVideo(playerId, videoId);

    }
  }

    public void loadVideo(int playerId, int videoId) {
      if(bridPlayer != null){
        bridPlayer.loadVideo(playerId, videoId);
      }
    }

  public void loadPlaylist(int playerId, int playlistId) {
    if(bridPlayer != null){
      bridPlayer.loadPlaylist(playerId, playlistId);
    }
  }
  public void loadPlaylist(int playerId, int playlistId, boolean vpaidSupport, boolean isFullscreen, boolean controlAutoplay, boolean enableAdControls, String creditsLabelColor, String playerReference) {
      if(bridPlayer != null){
        bridPlayerBuilder =  new BridPlayerBuilder(getContext(), RNBridPlayerView.this);
        bridPlayerBuilder.useVpaidSupport(vpaidSupport);
        bridPlayerBuilder.fullscreen(isFullscreen);
        bridPlayerBuilder.enableAutoplay(!controlAutoplay);
        bridPlayerBuilder.setCreditsLabelColor(creditsLabelColor);
        if(playerReference != null)
          bridPlayerBuilder.setPlayerReference(playerReference);
        bridPlayer = bridPlayerBuilder.build();
        bridPlayer.setBridListener(this);
        bridPlayer.loadPlaylist(playerId,playlistId);
      }
  }

  public void play(){
      if(bridPlayer != null)
         bridPlayer.play();
  }

  public void pause() {
    if (bridPlayer != null)
      bridPlayer.pause();


  }
  public void destroyPlayer(){
    if(bridPlayer != null)
      bridPlayer.release();
  }

  public void setFullScreen(boolean isOn){
    if(bridPlayer != null)
      bridPlayer.setFullScreen(isOn);
  }

  public long getCurrentTime(){
    return bridPlayer.getCurrentPosition();
  }

  public void toastMessage(String message){
    Toast.makeText(mContext,message,Toast.LENGTH_LONG).show();
  }


  public void unMute() {
    if(bridPlayer != null)
      bridPlayer.setMute(false);
  }

  public void mute() {
    if(bridPlayer != null)
      bridPlayer.setMute(true);
  }

  public void seekToTime(int seekToTime) {
    if(bridPlayer != null)
        bridPlayer.seekToPosition((long) (seekToTime* 1000));
  }

  public void showControls() {
    if(bridPlayer != null)
      bridPlayer.showControls();
  }

  public void showPoster() {
    if(bridPlayer != null)
      bridPlayer.showPoster();
  }
  public void hidePoster() {
    if(bridPlayer != null)
      bridPlayer.hidePoster();
  }



  public void hideControls() {
    if(bridPlayer != null)
      bridPlayer.hideControls();
  }

  public void previous(){
    Log.d("MODUL PREV", bridPlayer.toString());
    if (bridPlayer != null)
      bridPlayer.previous();
  }

  public void next(){
    Log.d("MODUL NEXT", bridPlayer.toString());
    if (bridPlayer != null)
      bridPlayer.next();
  }

  private static Context getNonBuggyContext(ThemedReactContext reactContext,
                                            ReactApplicationContext appContext) {
    Context superContext = reactContext;
    if (!contextHasBug(appContext.getCurrentActivity())) {
      superContext = appContext.getCurrentActivity();
    } else if (contextHasBug(superContext)) {
      // we have the bug! let's try to find a better context to use
      if (!contextHasBug(reactContext.getCurrentActivity())) {
        superContext = reactContext.getCurrentActivity();
      } else if (!contextHasBug(reactContext.getApplicationContext())) {
        superContext = reactContext.getApplicationContext();
      }
    }
    return superContext;
  }

  private static boolean contextHasBug(Context context) {
    return context == null ||
      context.getResources() == null ||
      context.getResources().getConfiguration() == null;
  }


  public void onFullscreenCloseRequested() {


  }


  @Override
  public void requestLayout() {
    super.requestLayout();

    // The spinner relies on a measure + layout pass happening after it calls requestLayout().
    // Without this, the widget never actually changes the selection and doesn't call the
    // appropriate listeners. Since we override onLayout in our ViewGroups, a layout pass never
    // happens after a call to requestLayout, so we simulate one here.
    post(measureAndLayout);
  }

  private final Runnable measureAndLayout = new Runnable() {
    @Override
    public void run() {
      measure(MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
      layout(getLeft(), getTop(), getRight(), getBottom());
    }
  };

  @Override
  public void onHostResume() {
    Log.d("Lifecycle react", "onHostResume");
//    play();
    showControls();
  }

  @Override
  public void onHostPause() {
    Log.d("Lifecycle react", "onHostPause");
//    pause();
  }

  @Override
  public void onHostDestroy() {
    Log.d("Lifecycle react", "onHostDestroy");
    destroyPlayer();
  }

  @Override
  public void onEvent(String status, String playerReference) {
    Log.d("BridPlayerEvent", status);
    WritableMap event = Arguments.createMap();


    switch (status) {
      case PlayerEvents.EVENT_VIDEO_BUFFERING:
        event.putString("message", "video_buffering");
        event.putString("playerRef", playerReference);
        sendEvent(mThemedReactContext, "BridPlayerEvents" + getId(), event);
        break;

      case PlayerEvents.EVENT_PLAYER_LOADED:
        event.putString("message", "video_load");
        event.putString("playerRef", playerReference);

        sendEvent(mThemedReactContext, "BridPlayerEvents" + getId(), event);
        break;
      case "STARTED":
        event.putString("message", "video_start");
        event.putString("playerRef", playerReference);

        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
        break;
      case PlayerEvents.EVENT_VIDEO_PLAY:
        event.putString("message", "video_played");
        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
        break;
//      case PlayerEvents.EVENT_VIDEO_PAUSE:
//        event.putString("message", "video_paused" + "_" +playerReference);
//
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_VIDEO_END:
//        event.putString("message", "video_ended" + "_" + playerReference);
//
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId() , event);
//
//        break;
//      case PlayerEvents.EVENT_VIDEO_SEEK:
//        event.putString("message", "video_seek" + "_" +playerReference);
//
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_LOADED:
//        event.putString("message", "ad_loaded" + "_" +playerReference);
//
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_COMPLETED:
//        event.putString("message", "video_ad_completed" + "_" +playerReference);
//
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_RESUMED:
//        event.putString("message", "ad_resumed" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_SKIPPED:
//        event.putString("message", "ad_skipped" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_STARTED:
//        event.putString("message", "ad_started" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_PAUSED:
//        event.putString("message", "ad_paused" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_TAPPED:
//        event.putString("message", "ad_tapped" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_ALL_ADS_COMPLETED:
//        event.putString("message", "all_ads_completed" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_PROGRESS:
//        event.putString("message", "ad_progress" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//      case PlayerEvents.EVENT_AD_CLICKED:
//        event.putString("message", "ad_clicked" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//
//      case PlayerEvents.EVENT_FULLSCREEN_OPEN_REQUESTED:
//        event.putString("message", "fullscreen_open" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//
//        break;
//
//      case PlayerEvents.EVENT_FULLSCREEN_CLOSE_REQUESTED:
//        event.putString("message", "fullscreen_close" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//        break;
//
//      //PLAYER ERROR EVENTS
//      case PlayerEvents.EVENT_AD_ERROR:
//      case PlayerEvents.EVENT_AD_BREAK_FETCH_ERROR:
//        event.putString("message", "adError" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//        break;
//      case PlayerEvents.EVENT_VIDEO_ERROR:
//        event.putString("message", "unsupportedFormat" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//        break;
//      case PlayerEvents.EVENT_VIDEO_NETWORK_ERROR:
//        event.putString("message", "lostIntenetConnection" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//        break;
//      case PlayerEvents.EVENT_VIDEO_CMS_ERROR:
//        event.putString("message", "videoBadUrl" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//        break;
//      case PlayerEvents.EVENT_VIDEO_LIVESTREAM_ERROR:
//        event.putString("message", "livestreamError" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//        break;
//      case PlayerEvents.EVENT_VIDEO_PROTECTED_ERROR:
//        event.putString("message", "protectedContent" + "_" +playerReference);
//        sendEvent(mThemedReactContext, "BridPlayerEvents"+ getId(), event);
//        break;
//      case PlayerEvents.EVENT_VIDEO_AUTOPLAY:
//        event.putString("message","player_autoplay" + "_" +playerReference);
//        sendEvent(mThemedReactContext,"BridPlayerEvents"+ getId(), event);
    }
  }

  private void sendEvent(ReactContext reactContext,
                         String eventName,
                         @Nullable WritableMap params) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

  public void setConfig(ReadableMap prop) {

    int playerId = 0,mediaId = 0;
    boolean useVpaid = false, playlist = false, isFullscreen = false, controlAutoplay = false, enableAdControls = false;
    String creditsLabelColor = null;


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

      if(prop.hasKey("controlAutoplay"))
        controlAutoplay = prop.getBoolean("controlAutoplay");

      if(prop.hasKey("enableAdControls"))
        enableAdControls = prop.getBoolean("enableAdControls");

      if(prop.hasKey("creditsLabelColor"))
        creditsLabelColor = prop.getString("creditsLabelColor");

      if(prop.hasKey("playerReference"))
        playerReferenceString = prop.getString("playerReference");


      if(playlist)
        loadPlaylist(playerId,mediaId, useVpaid,isFullscreen, controlAutoplay, enableAdControls, creditsLabelColor, playerReferenceString);
      else
        loadVideo(playerId, mediaId, useVpaid, isFullscreen, controlAutoplay, enableAdControls, creditsLabelColor, playerReferenceString);

    } catch (NumberFormatException e){
      toastMessage(e.getMessage());
    }
  }
};
