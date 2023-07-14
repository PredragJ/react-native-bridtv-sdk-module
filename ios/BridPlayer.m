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
@synthesize controlAutoplay;

BOOL isRelodaed;
TypePlayer loadedType;
-(void)layoutSubviews
{
    [super layoutSubviews];
    [self setPlayerTypeByString:[bridPlayerConfig objectForKey:@"typeOfPlayer"]];
    useVPAIDSupport = [[bridPlayerConfig objectForKey:@"useVPAIDSupport"] boolValue];
    controlAutoplay = [[bridPlayerConfig objectForKey:@"controlAutoplay"] boolValue];
    
    
    [self setupEventNetworking];
    
    [self addSubview:self.player.view];
    self.player.view.frame = self.bounds;
    
}

- (void)setPlayerTypeByString:(NSString *)typeString
{
    if ([typeString  isEqual: @"Single"]) {
        type = SinglePlayer;
    } else if ([typeString  isEqual: @"Playlist"]) {
        type = PlaylistPlayer;
    }
}

- (BVPlayer *)player {
    if (!_player) {
        switch (type) {
            case SinglePlayer:
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[[bridPlayerConfig objectForKey:@"playerID"] integerValue] forVideoID:(int)[[bridPlayerConfig objectForKey:@"mediaID"] integerValue]]];
                break;
            case PlaylistPlayer:
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[[bridPlayerConfig objectForKey:@"playerID"] integerValue] forPlaylistID:(int)[[bridPlayerConfig objectForKey:@"mediaID"] integerValue]]];
                break;
            default:
                break;
        }
    } else {
        if (isRelodaed) {
            switch (loadedType) {
                case SinglePlayer:
                    NSLog(@"PECA USAO u SinglePlayer");
                    _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[playerID integerValue] forVideoID:(int)[mediaID integerValue]]];
                    isRelodaed = NO;
                    break;
                case PlaylistPlayer:
                    NSLog(@"PECA USAO u PlaylistPlayer");
                    _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[playerID integerValue] forPlaylistID:(int)[mediaID integerValue]]];
                    isRelodaed = NO;
                    break;
                default:
                    break;
            }
        }
    }
    
    [_player useVPAIDSupport:useVPAIDSupport];
    [_player controlAutoplay:controlAutoplay];
    
    return _player;
}

- (void)loadVideo:(NSNumber *)playerID mediaID:(NSNumber *)mediaID {
    NSLog(@"PECA USAO u _player playerID: %@, mediaID: %@",playerID, mediaID);
    self->playerID = playerID;
    self->mediaID = mediaID;
    loadedType = SinglePlayer;
    isRelodaed = YES;
    [self setNeedsLayout];
}

- (void)loadPlaylist:(NSNumber *)playerID mediaID:(NSNumber *)mediaID {
    self->playerID = playerID;
    self->mediaID = mediaID;
    loadedType = PlaylistPlayer;
    isRelodaed = YES;
    [self setNeedsLayout];
}

- (void)setupEventNetworking {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(eventWriter:) name:@"PlayerEvent" object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(eventWriter:) name:@"AdEvent" object:nil];
}

- (void) eventWriter:(NSNotification *)notification {
    if ([notification.name isEqualToString:@"PlayerEvent"]) {
        RCTLogInfo(@"%@",(NSString *)notification.userInfo[@"event"]);
        if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerSetFullscreenOn"]) {
            [UIApplication sharedApplication].statusBarHidden = YES;
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerSetFullscreenOff"]) {
            [UIApplication sharedApplication].statusBarHidden = NO;
        }
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

- (BOOL)isAdPlaying
{
    return [self.player isAdInProgress];
}

- (BOOL)isPaused
{
    return [self.player isPaused];
}

- (BOOL)isRepeated
{
    return [self.player isRepeated];
}

- (BOOL)isAutoplay
{
    return [self.player isAutoplay];
}

- (NSNumber*)getPlayerCurrentTime
{
    return [NSNumber numberWithInt:[_player getCurrentTime] * 1000];
}

- (NSNumber*)getVideoDuration
{
    return [NSNumber numberWithInt:[_player getDuration] * 1000];
}

- (NSNumber*)getAdDuration
{
    return [NSNumber numberWithInt:[_player getAdDuration] * 1000];
}

- (NSNumber*)getAdCurrentTime
{
    return [NSNumber numberWithInt:[_player getAdCurrentTime] * 1000];
}

- (void)seekToTime:(float)time
{
    [self.player seekToTime:time];
}

@end
