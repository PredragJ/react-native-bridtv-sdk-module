#import <React/RCTViewManager.h>
#import "BridPlayer.h"
#import <React/RCTUIManager.h>
#import <UIKit/UIKit.h>
#import <React/RCTLog.h>

@interface BridtvSdkModuleViewManager : RCTViewManager
@end

@implementation BridtvSdkModuleViewManager

RCT_EXPORT_MODULE(BridtvSdkModuleView)

BridPlayer *player;

- (UIView *)view
{
    player = [[BridPlayer alloc] init];
    return player;
}

RCT_EXPORT_VIEW_PROPERTY(bridPlayerConfig, NSDictionary);

RCT_EXPORT_VIEW_PROPERTY(playerID, NSString);
RCT_EXPORT_VIEW_PROPERTY(mediaID, NSString);
RCT_EXPORT_VIEW_PROPERTY(tagType, NSString);
RCT_EXPORT_VIEW_PROPERTY(page, NSString);
RCT_EXPORT_VIEW_PROPERTY(item, NSString);
RCT_EXPORT_VIEW_PROPERTY(typeOfPlayer, NSString);

RCT_EXPORT_METHOD(destroy:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
       [player destroy];
    }];
}


RCT_EXPORT_METHOD(pause:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
       [player pauseVideo];
    }];
}

RCT_EXPORT_METHOD(play:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        [player playVideo];
    }];
}

RCT_EXPORT_METHOD(next:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        [player nextVideo];
    }];
}

RCT_EXPORT_METHOD(previous:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        [player previousVideo];
    }];
}

RCT_EXPORT_METHOD(useVPAIDSupport:(nonnull NSNumber *)reactTag:(BOOL)useVPAIDSupport) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, BridPlayer *> *viewRegistry) {
        [player ;
    }];
}


@end
