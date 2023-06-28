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
@property(nonatomic) NSNumber *_Nonnull playerID;
@property(nonatomic) NSNumber *_Nonnull mediaID;
@property(nonatomic) TypePlayer type;
@property(nonatomic) NSString *_Nonnull typeOfPlayer;
@property(nonatomic) BOOL useVPAIDSupport;
@property(nonatomic) BOOL setFullscreen;
@property(nonatomic) BOOL controlAutoplay;
@property(nonatomic) BOOL enableAdControls;
@property(nonatomic, strong) BVPlayer *_Nonnull player;

- (void)setMute:(BOOL)mute;
- (BOOL)isMuted;
- (BOOL)isAdPlaying;
- (BOOL)isPaused;
- (BOOL)isRepeated;
- (BOOL)isAutoplay;
- (NSNumber *_Nonnull)getPlayerCurrentTime;
- (NSNumber *_Nonnull)getVideoDuration;
- (NSNumber *_Nonnull)getAdDuration;
- (NSNumber *_Nonnull)getAdCurrentTime;
- (void)seekToTime:(float)time;

@end
