#import <React/RCTViewManager.h>
#import "BridPlayer.h"
#import <React/RCTUIManager.h>
#import <UIKit/UIKit.h>
#import <React/RCTLog.h>
#import <React/RCTEventEmitter.h>
#import "BridtvSdkModule.h"

@interface BridtvSdkModuleViewManager : RCTViewManager

@end

@implementation BridtvSdkModuleViewManager

NSString *eventName;

RCT_EXPORT_MODULE(BridtvSdkModuleView)

BridPlayer *player;

- (UIView *)view
{
    player = [[BridPlayer alloc] init];
    return player;
}

RCT_EXPORT_VIEW_PROPERTY(bridPlayerConfig, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(playerID, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(mediaID, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(typeOfPlayer, NSString);
RCT_EXPORT_VIEW_PROPERTY(useVPAIDSupport, BOOL);
RCT_EXPORT_VIEW_PROPERTY(setFullscreen, BOOL);
RCT_EXPORT_VIEW_PROPERTY(controlAutoplay, BOOL);
RCT_EXPORT_VIEW_PROPERTY(enableAdControls, BOOL);

RCT_EXPORT_METHOD(pause:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player pause];
        }
    }];
}

RCT_EXPORT_METHOD(play:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player play];
        }
    }];
}

RCT_EXPORT_METHOD(next:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player next];
        }
    }];
}

RCT_EXPORT_METHOD(previous:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player previous];
        }
    }];
}

RCT_EXPORT_METHOD(destroyPlayer:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player destroy];
        }
    }];
}

RCT_EXPORT_METHOD(showControlls:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player autoHideControls:NO];
        }
    }];
}

RCT_EXPORT_METHOD(hideControlls:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player autoHideControls:YES];
        }
    }];
}

RCT_EXPORT_METHOD(mute:(nonnull NSNumber *)reactTag:(BOOL)mute) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            if (mute)
                [view.player unmute];
            else
                [view.player mute];
        }
    }];
}

RCT_EXPORT_METHOD(seekToTime:(nonnull NSNumber *)reactTag:(float)time) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player seekToTime:time];
        }
    }];
}

RCT_REMAP_METHOD(getCurrentTime, tag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        
        NSNumber *time = [player getPlayerCurrentTime];
        if (!time) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(time);
        }
    }];
}

RCT_REMAP_METHOD(getVideoDuration, videoDurationTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {

        NSNumber *videoDuration = [player getVideoDuration];
        if (!videoDuration) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(videoDuration);
        }
    }];
}

RCT_REMAP_METHOD(getAdDuration, adDurationTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {

        NSNumber *time = [player getAdDuration];
        if (!time) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(time);
        }
    }];
}

RCT_REMAP_METHOD(getAdCurrentTime, adCurrentTimeTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {

        NSNumber *time = [player getAdCurrentTime];
        if (!time) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(time);
        }
    }];
}

RCT_REMAP_METHOD(isMuted, isMutedTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        
        NSNumber *isMuted;
        
        if ([player isMuted])
            isMuted = [NSNumber numberWithInt:1];
        else
            isMuted = [NSNumber numberWithInt:0];
        
        if (!isMuted) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(isMuted);
        }
    }];
}

RCT_REMAP_METHOD(isAdPlaying, isAdPlayingTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        
        NSNumber *isAdPlaying;
        
        if ([player isAdPlaying])
            isAdPlaying = [NSNumber numberWithInt:1];
        else
            isAdPlaying = [NSNumber numberWithInt:0];
        
        if (!isAdPlaying) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(isAdPlaying);
        }
    }];
}

RCT_REMAP_METHOD(isPaused, isPausedTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        
        NSNumber *isPaused;
        
        if ([player isPaused])
            isPaused = [NSNumber numberWithInt:1];
        else
            isPaused = [NSNumber numberWithInt:0];
        
        if (!isPaused) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(isPaused);
        }
    }];
}

RCT_REMAP_METHOD(isRepeated, isRepeatedTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        
        NSNumber *isRepeated;
        
        if ([player isRepeated])
            isRepeated = [NSNumber numberWithInt:1];
        else
            isRepeated = [NSNumber numberWithInt:0];
        
        if (!isRepeated) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(isRepeated);
        }
    }];
}

RCT_REMAP_METHOD(isAutoplay, isAutoplayTag:(nonnull NSNumber *)reactTag
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        
        NSNumber *isAutoplay;
        
        if ([player isAutoplay])
            isAutoplay = [NSNumber numberWithInt:1];
        else
            isAutoplay = [NSNumber numberWithInt:0];
        
        if (!isAutoplay) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(isAutoplay);
        }
    }];
}

@end
