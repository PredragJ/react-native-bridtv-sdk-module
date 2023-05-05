//  Created by react-native-create-bridge
#import <Foundation/Foundation.h>
#import "BridPlayer.h"
#import <React/RCTLog.h>


// import RCTEventDispatcher
#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#elif __has_include(“RCTEventDispatcher.h”)
#import “RCTEventDispatcher.h”
#else
#import “React/RCTEventDispatcher.h” // Required when used as a Pod in a Swift project
#endif


@implementation BridPlayer : UIView

@synthesize type;
@synthesize playerID;
@synthesize mediaID;
@synthesize typeOfPlayer;
@synthesize item;
@synthesize page;
@synthesize tagType;
@synthesize jsonURL;

-(void)layoutSubviews
{
    [super layoutSubviews];
    [self setPlayerTypeByString:typeOfPlayer];
    [self setupEventNetworking];
    
    [self addSubview:self.player.view];
    self.player.view.frame = self.bounds;
}

- (void)setPlayerTypeByString:(NSString *)typeString
{
    if ([typeString  isEqual: @"Single"])
        type = SinglePlayer;
    else if ([typeString  isEqual: @"Playlist"])
        type = PlaylistPlayer;
//    else if ([typeString  isEqual: @"Latest"])
//        type = LatestPlayer;
//    else if ([typeString  isEqual: @"Channel"])
//        type =  ChannelPlayer;
//    else if ([typeString  isEqual: @"Tag"])
//        type =  TagPlayer;
}

- (BVPlayer *)player {
    if (!_player) {
        
        switch (type) {
            case SinglePlayer:
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:37791 forVideoID:1196978]];
                break;
            case PlaylistPlayer:
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:37791 forVideoID:1196978]];
                break;
//            case LatestPlayer:
//                _player = [[BVPlayer alloc] initWithData:[[BVData alloc] initPlayerID:(int)playerID forLatestID:(int)mediaID page:page item:item]];
//                break;
//            case ChannelPlayer:
//                _player = [[BVPlayer alloc] initWithData:[[BVData alloc] initPlayerID:(int)playerID forChannelID:(int)mediaID page:page item:item]];
//                break;
//            case TagPlayer:
//                _player = [[BVPlayer alloc] initWithData:[[BVData alloc] initPlayerID:(int)playerID forTag:tagType page:page item:item]];
//                break;
                
            default:
                break;
                
        }
        
    }
    
    return _player;
}

- (void)setupEventNetworking {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(eventWriter:) name:@"PlayerEvent" object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(eventWriter:) name:@"AdEvent" object:nil];
}

- (void) eventWriter:(NSNotification *)notification {
    if ([notification.name isEqualToString:@"PlayerEvent"]) {
        RCTLogInfo(@"%@",(NSString *)notification.userInfo[@"event"]);
    }
    if ([notification.name isEqualToString:@"AdEvent"]) {
        RCTLogInfo(@"%@",(NSString *)notification.userInfo[@"ad"]);
    }
}

- (void)pauseVideo
{
  [self.player pause];
}

- (void)playVideo
{
  [self.player play];
}

- (void)nextVideo
{
  [self.player next];
}

- (void)previousVideo
{
  [self.player previous];
}

- (void)setJSON
{
    if (jsonURL != nil) {
        if ([[jsonURL substringToIndex:4] isEqualToString:@"http"]) {
            [self.player setPlaylist:[NSURL URLWithString:jsonURL]];
        } else {
            RCTLogInfo(@"JSON url not starting with prefix http");
        }
    }
}

@end
