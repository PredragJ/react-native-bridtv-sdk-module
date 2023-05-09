//  Created by react-native-create-bridge

// import UIKit so you can subclass off UIView
#import <UIKit/UIKit.h>
#import <BridSDK/BridSDK.h>
#import "React/RCTViewManager.h"
#import "React/RCTComponent.h"

@class RCTEventDispatcher;

typedef NS_ENUM(NSUInteger, TypePlayer) {
    SinglePlayer,
    PlaylistPlayer,
    LatestPlayer,
    ChannelPlayer,
    TagPlayer
};

@interface BridPlayer : UIView


@property(nonatomic) NSDictionary * bridPlayerConfig;
@property(nonatomic) NSString *_Nonnull playerID;
@property(nonatomic) NSString *_Nonnull mediaID;
@property(nonatomic) TypePlayer type;
@property(nonatomic) NSString *_Nonnull typeOfPlayer;

@property(nonatomic) NSString *_Nonnull page;
@property(nonatomic) NSString *_Nonnull item;
@property(nonatomic, readonly, nonnull) NSString *tagType;
@property(nonatomic, strong) BVPlayer *_Nonnull player;
@property(nonatomic) NSString *_Nonnull jsonURL;

- (void)pauseVideo;
- (void)playVideo;
- (void)nextVideo;
- (void)previousVideo;
- (void)setJSON;

@end
