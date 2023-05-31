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

@synthesize bridPlayerConfig;
@synthesize type;
@synthesize playerID;
@synthesize mediaID;
@synthesize typeOfPlayer;
@synthesize useVPAIDSupport;
@synthesize setFullscreen;

-(void)layoutSubviews
{
    [super layoutSubviews];
    
    [self setPlayerTypeByString:[bridPlayerConfig objectForKey:@"typeOfPlayer"]];
    [self setupEventNetworking];
    
    [self addSubview:self.player.view];
    self.player.view.frame = self.bounds;
    
}

- (void)setPlayerTypeByString:(NSString *)typeString
{
    NSLog(@"PECA TYPE: %@", typeString);
    if ([typeString  isEqual: @"Single"])
        type = SinglePlayer;
    else if ([typeString  isEqual: @"Playlist"])
        type = PlaylistPlayer;
}

- (BVPlayer *)player {
    if (!_player) {
        
        switch (type) {
            case SinglePlayer:
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[[bridPlayerConfig objectForKey:@"playerID"] integerValue] forVideoID:(int)[[bridPlayerConfig objectForKey:@"mediaID"] integerValue]]];
                break;
            case PlaylistPlayer:
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[[bridPlayerConfig objectForKey:@"playerID"] integerValue] forVideoID:(int)[[bridPlayerConfig objectForKey:@"mediaID"] integerValue]]];
                break;
                
            default:
                break;
        }
    }
    
    [_player useVPAIDSupport:useVPAIDSupport];
    
    if (setFullscreen)
        [_player setFullscreenON];
    else
        [_player setFullscreenOFF];
        
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

- (void)setMute:(BOOL)mute
{
    if (mute)
        [self.player mute];
    else
        [self.player unmute];
}

- (BOOL)isMuted
{
    return [self.player getMuted];
}

- (NSNumber*)getPlayerCurrentTime
{
    return [NSNumber numberWithInt:[_player getCurrentTime]];
}

- (void)seekToTime:(float)time
{
    [self.player seekToTime:time];
}

@end
