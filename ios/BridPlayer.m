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
    if ([typeString  isEqual: @"Single"])
        type = SinglePlayer;
    else if ([typeString  isEqual: @"Playlist"])
        type = PlaylistPlayer;
}

- (BVPlayer *)player {
    if (!_player) {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:[playerID stringValue]
                                                           message:[mediaID stringValue]
                                                           delegate:self
                                                           cancelButtonTitle:@"OK"
                                                           otherButtonTitles:nil];
       [alert show];
      
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

- (void)loadVideo:(NSNumber *)playerID mediaID:(NSNumber *)mediaID
{
    _player = nil;
    if (playerID)
        self->playerID = playerID;
    if (mediaID)
        self->mediaID = mediaID;
    
    _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[self->playerID integerValue] forVideoID:(int)[self->mediaID integerValue]]];
    
//    [self setPlayerTypeByString:@"Single"];
//    [self addSubview:self.player.view];
//    self.player.view.frame = self.bounds;
    [self layoutSubviews];
}

- (void)destroy
{
    [self.player destroy];
}

- (void)setMute:(BOOL)mute
{
    if (mute)
        [_player mute];
    else
        [_player unmute];
}

@end
