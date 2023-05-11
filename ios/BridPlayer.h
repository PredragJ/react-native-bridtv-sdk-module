//  Created by react-native-create-bridge

// import UIKit so you can subclass off UIView
#import <UIKit/UIKit.h>
#import <BridSDK/BridSDK.h>
#import "React/RCTViewManager.h"
#import "React/RCTComponent.h"

@class RCTEventDispatcher;

typedef NS_ENUM(NSUInteger, TypePlayer) {
    SinglePlayer,
    PlaylistPlayer
};

@interface BridPlayer : UIView


@property(nonatomic) NSDictionary *_Nonnull bridPlayerConfig;
@property(nonatomic) NSString *_Nonnull playerID;
@property(nonatomic) NSString *_Nonnull mediaID;
@property(nonatomic) TypePlayer type;
@property(nonatomic) NSString *_Nonnull typeOfPlayer;
@property(nonatomic, strong) BVPlayer *_Nonnull player;

- (void)pauseVideo;
- (void)playVideo;
- (void)nextVideo;
- (void)previousVideo;
- (void)destroy;
- (void)useVPAIDSupport:(BOOL)use;
- (void)setFullscreen:(BOOL)fullscreen;
- (void)setMute:(BOOL)mute;

@end
