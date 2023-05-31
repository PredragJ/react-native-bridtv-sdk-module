package com.bridtvsdkmodule;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.content.Context;
import android.util.Log;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;

import tv.brid.sdk.api.BridPlayer;
import tv.brid.sdk.api.BridPlayerBuilder;


public class BridtvSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext mReactContext;
    private BridPlayer bridPlayer;
    private static final String TAG = "BridtvSdkModule";



    BridtvSdkModule(ReactApplicationContext context) {
        super(context);
        mReactContext = context;
        Log.d("BridtvSdkModuleLog", "CREATE");
    }

    @NonNull
    @Override
    public String getName() {
        Log.d("BridtvSdkModuleLog", "getName");

        return TAG;
    }


    // react cannot resolve type LONG
    @ReactMethod
    public void getCurrentTime(final int reactTag, Promise promise){
        Log.d("BridtvSdkModuleLog", "getCurrentTime");

        try {
          UIManagerModule uiManager = mReactContext.getNativeModule(UIManagerModule.class);
          uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
              RNBridPlayerView playerView = (RNBridPlayerView) nativeViewHierarchyManager.resolveView(reactTag);
              if(playerView != null && playerView.getBridPlayer() != null){
                promise.resolve(Double.valueOf(playerView.getBridPlayer().getCurrentPosition()));
              }else {
                promise.reject("RNBridPlayerError", "Player is null");
              }
            }
          });

        } catch (Exception e){
            promise.reject("Error happened", e);
        }
    }

  @ReactMethod
  public void isAdPlaying(final int reactTag, Promise promise){
    Log.d("BridtvSdkModuleLog", "isAdPlaying");
    try {
      UIManagerModule uiManager = mReactContext.getNativeModule(UIManagerModule.class);
      uiManager.addUIBlock(new UIBlock() {
        @Override
        public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
          RNBridPlayerView playerView = (RNBridPlayerView) nativeViewHierarchyManager.resolveView(reactTag);
          if(playerView != null && playerView.getBridPlayer() != null){
            promise.resolve(playerView.getBridPlayer().isPlayingAd());
          }else {
            promise.reject("RNBridPlayerError", "Player is null");
          }
        }
      });

    } catch (Exception e){
      promise.reject("Error happened", e);
    }
  }

  @ReactMethod
  public void isPaused(final int reactTag, Promise promise){
    Log.d("BridtvSdkModuleLog", "isPaused");
    try {
      UIManagerModule uiManager = mReactContext.getNativeModule(UIManagerModule.class);
      uiManager.addUIBlock(new UIBlock() {
        @Override
        public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
          RNBridPlayerView playerView = (RNBridPlayerView) nativeViewHierarchyManager.resolveView(reactTag);
          if(playerView != null && playerView.getBridPlayer() != null){
            promise.resolve(playerView.getBridPlayer().isPaused());
          }else {
            promise.reject("RNBridPlayerError", "Player is null");
          }
        }
      });
    } catch (Exception e){
      promise.reject("Error happened", e);
    }
  }

  @ReactMethod
  public void isRepeated(final int reactTag, Promise promise){
    Log.d("BridtvSdkModuleLog", "isRepeated");
    try {
      UIManagerModule uiManager = mReactContext.getNativeModule(UIManagerModule.class);
      uiManager.addUIBlock(new UIBlock() {
        @Override
        public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
          RNBridPlayerView playerView = (RNBridPlayerView) nativeViewHierarchyManager.resolveView(reactTag);
          if(playerView != null && playerView.getBridPlayer() != null){
            promise.resolve(playerView.getBridPlayer().isRepeated());
          }else {
            promise.reject("RNBridPlayerError", "Player is null");
          }
        }
      });
    } catch (Exception e){
      promise.reject("Error happened", e);
    }
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
