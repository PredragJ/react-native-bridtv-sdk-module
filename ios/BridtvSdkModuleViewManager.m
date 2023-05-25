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

RCT_REMAP_METHOD(isMuted_resolver,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        
        NSNumber *isMuted;
        
        if ([player isMuted])
            isMuted = [NSNumber numberWithInt:0];
        else
            isMuted = [NSNumber numberWithInt:1];
        
        if (!isMuted) {
            reject(@"event_getCurrentTime_failure", @"failed to read current time", nil);
        } else {
            resolve(isMuted);
        }
    }];
}

@end
