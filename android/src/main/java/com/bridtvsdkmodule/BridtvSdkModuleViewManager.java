package com.bridtvsdkmodule;

import android.app.Activity;
import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;

public class BridtvSdkModuleViewManager extends SimpleViewManager<View> {
  public static final String REACT_CLASS = "BridtvSdkModuleView";
  public View mRootView;
  public FrameLayout frameLayout;
  public Activity mActivity;
  public ViewGroup mPlayerViewContainer;

  @Override
  @NonNull
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  @NonNull
  public View createViewInstance(ThemedReactContext reactContext) {
    BridPlayer bridPlayer = null;

    mActivity = (ReactActivity) reactContext.getCurrentActivity();
    mRootView = mActivity.findViewById(R.id.content);
    mPlayerViewContainer = (ViewGroup) mRootView.getParent();

// Remove the JWPlayerView from the list item.
    if (mPlayerViewContainer != null) {
      mPlayerViewContainer.removeView(mRootView);
    }
    frameLayout = new FrameLayout(reactContext);


//    setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    frameLayout.setLayoutParams(new LinearLayout.LayoutParams(
      LinearLayout.LayoutParams.WRAP_CONTENT,
      LinearLayout.LayoutParams.WRAP_CONTENT));
    mPlayerViewContainer.addView(mRootView);


    bridPlayer = new BridPlayerBuilder(reactContext,(FrameLayout) mRootView).build();
    bridPlayer.loadVideo(37791, 1196978);
    return mRootView;
  }

  @ReactProp(name = "color")
  public void setColor(View view, String color) {
    view.setBackgroundColor(Color.parseColor(color));
  }
}
