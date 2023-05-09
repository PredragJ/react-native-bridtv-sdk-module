package com.bridtvsdkmodule;

import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;

class RNBridPlayerView extends FrameLayout {

    private BridPlayer bridPlayer;
    private Context mContext;

    public RNBridPlayerView(@NonNull Context context) {
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

        bridPlayer = new BridPlayerBuilder(context, RNBridPlayerView.this).build();

        View v = bridPlayer.getPlayerView(true);
        v.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        bridPlayer.showControls();
    }

    public void setPlayerId(int playerId, int videoId){
    }

    public View getRNView() {
        return this;
    }

    public BridPlayer getBridPlayer() {
        return bridPlayer;
    }

  public void loadVideo(int playerId, int videoId) {
    bridPlayer.loadVideo(playerId, videoId);
  }
  public void loadPlaylist(int playerId, int playlistId) {
      bridPlayer.loadPlaylist(playerId,playlistId);
  }

  public void toastMessage(String message){
    Toast.makeText(mContext,message,Toast.LENGTH_LONG).show();
  }


}
