package com.bridtvsdkmodule;

import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;
import tv.brid.sdk.player.BridPlayerListener;

class RNBridPlayerView extends FrameLayout {

    private BridPlayer bridPlayer;
    private Context mContext;
    private BridPlayerBuilder bridPlayerBuilder;

    private ThemedReactContext mThemedReactContext;


  public RNBridPlayerView(@NonNull Context context) {
        super(context);
        mContext = context;
//        mThemedReactContext = (ThemedReactContext) context;
        init(context);
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
        bridPlayerBuilder =  new BridPlayerBuilder(context, RNBridPlayerView.this);
        bridPlayer = bridPlayerBuilder.build();
        View v = bridPlayer.getPlayerView(true);
        v.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
    }

    public void setPlayerId(int playerId, int videoId){
    }

    public View getRNView() {
        return this;
    }

    public BridPlayer getBridPlayer() {
        return bridPlayer;
    }

  public void loadVideo(int playerId, int videoId, boolean vpaidSupport, boolean isFullscreen) {
    if (bridPlayer != null) {
      bridPlayerBuilder.useVpaidSupport(vpaidSupport);
      bridPlayerBuilder.fullscreen(isFullscreen);
      bridPlayer = bridPlayerBuilder.rebuild();
      bridPlayer.loadVideo(playerId, videoId);
      bridPlayer.showControls();
    }
  }

    public void loadVideo(int playerId, int videoId) {
      if(bridPlayer != null){
        bridPlayer.loadVideo(playerId, videoId);
        bridPlayer.showControls();
      }
  }
  public void loadPlaylist(int playerId, int playlistId) {
      if(bridPlayer != null){
        bridPlayer.loadPlaylist(playerId,playlistId);
        bridPlayer.showControls();

      }
  }

  public void play(){
      if(bridPlayer != null)
         bridPlayer.play();
  }

  public void pause(){
    if(bridPlayer != null)
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
      bridPlayer.seekToPosition((long) seekToTime);
  }

  public void showControls() {
    if(bridPlayer != null)
      bridPlayer.showControls();
  }

  public void hideControls() {
    if(bridPlayer != null)
      bridPlayer.hideControls();
  }
}
