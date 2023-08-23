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
RCT_EXPORT_VIEW_PROPERTY(playerReference, NSString);
RCT_EXPORT_VIEW_PROPERTY(useVPAIDSupport, BOOL);
RCT_EXPORT_VIEW_PROPERTY(controlAutoplay, BOOL);
RCT_EXPORT_VIEW_PROPERTY(scrollOnAd, BOOL);

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

RCT_EXPORT_METHOD(loadVideo:(nonnull NSNumber *)reactTag:(nonnull NSNumber *)playerID:(nonnull NSNumber *)mediaID) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view loadVideo:playerID mediaID:mediaID];
        }
    }];
}

RCT_EXPORT_METHOD(loadPlaylist:(nonnull NSNumber *)reactTag:(nonnull NSNumber *)playerID:(nonnull NSNumber *)mediaID) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view loadPlaylist:playerID mediaID:mediaID];
        }
    }];
}

RCT_EXPORT_METHOD(showControls:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player showControls];
        }
    }];
}

RCT_EXPORT_METHOD(hideControls:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player hideControls];
        }
    }];
}

RCT_EXPORT_METHOD(showPoster:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player showPoster];
        }
    }];
}

RCT_EXPORT_METHOD(hidePoster:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player hidePoster];
        }
    }];
}

RCT_EXPORT_METHOD(mute:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player mute];
        }
    }];
}

RCT_EXPORT_METHOD(unMute:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            [view.player unmute];
        }
    }];
}

RCT_EXPORT_METHOD(setFullscreen:(nonnull NSNumber *)reactTag:(BOOL)fullscreen) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        BridPlayer *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[BridPlayer class]] || view.player == nil) {
            RCTLogError(@"Invalid view returned from registry, expecting BridPlayer, got: %@", view);
        } else {
            if (fullscreen)
                [view.player setFullscreenON];
            else
                [view.player setFullscreenOFF];
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

RCT_REMAP_METHOD(getCurrentTime, timeTag:(nonnull NSNumber *)reactTag
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
            reject(@"event_getVideoDuration_failure", @"failed to read current getVideoDuration time", nil);
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
            reject(@"event_getAdDuration_failure", @"failed to read current getAdDuration time", nil);
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
            reject(@"event_getAdCurrentTime_failure", @"failed to read current getAdCurrentTime time", nil);
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
        
        if ([viewRegistry[reactTag] isMuted])
            isMuted = [NSNumber numberWithInt:1];
        else
            isMuted = [NSNumber numberWithInt:0];
        
        if (!isMuted) {
            reject(@"isMuted failure", @"failed to read current isMuted", nil);
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
        
        if ([viewRegistry[reactTag] isAdPlaying])
            isAdPlaying = [NSNumber numberWithInt:1];
        else
            isAdPlaying = [NSNumber numberWithInt:0];
        
        if (!isAdPlaying) {
            reject(@"isAdPlaying failure", @"failed to read current isAdPlaying", nil);
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
        
        if ([viewRegistry[reactTag] isPaused])
            isPaused = [NSNumber numberWithInt:1];
        else
            isPaused = [NSNumber numberWithInt:0];
        
        if (!isPaused) {
            reject(@"isPaused failure", @"failed to read current isPaused", nil);
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
        
        if ([viewRegistry[reactTag] isRepeated])
            isRepeated = [NSNumber numberWithInt:1];
        else
            isRepeated = [NSNumber numberWithInt:0];
        
        if (!isRepeated) {
            reject(@"isRepeated failure", @"failed to read current isRepeated", nil);
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
        if ([viewRegistry[reactTag] isAutoplay])
            isAutoplay = [NSNumber numberWithInt:1];
        else
            isAutoplay = [NSNumber numberWithInt:0];
        
        if (!isAutoplay) {
            reject(@"isAutoplay failure", @"failed to read current isAutoplay", nil);
        } else {
            resolve(isAutoplay);
        }
    }];
}

@end
