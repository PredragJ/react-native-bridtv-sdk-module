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
@synthesize playerReference;
@synthesize scrollOnAd;
@synthesize setCornerRadius;
@synthesize localization;

BOOL isRelodaed;
TypePlayer loadedType;
NSDictionary *reference;
int playerID;
int mediaID;

-(void)layoutSubviews
{
    [super layoutSubviews];
    [self setPlayerTypeByString:[bridPlayerConfig objectForKey:@"typeOfPlayer"]];
    useVPAIDSupport = [[bridPlayerConfig objectForKey:@"useVPAIDSupport"] boolValue];
    controlAutoplay = [[bridPlayerConfig objectForKey:@"controlAutoplay"] boolValue];
    scrollOnAd = [[bridPlayerConfig objectForKey:@"scrollOnAd"] boolValue];
    playerReference = [bridPlayerConfig objectForKey:@"playerReference"];
    playerID  = [bridPlayerConfig objectForKey:@"playerID"];
    mediaID = [bridPlayerConfig objectForKey:@"mediaID"];
    setCornerRadius = [bridPlayerConfig objectForKey:@"setCornerRadius"];
    localization = [bridPlayerConfig objectForKey:@"localization"];
    
    if ([playerID isKindOfClass:[NSNull class]])
        playerID = 0;
    
    if ([mediaID isKindOfClass:[NSNull class]])
        mediaID = 0;
    
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
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:[playerID intValue] forVideoID:[mediaID intValue]]];
                break;
            case PlaylistPlayer:
                _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:[playerID intValue] forPlaylistID:[mediaID intValue]]];
                break;
            default:
                break;
        }
    } else {
        if (isRelodaed) {
            switch (loadedType) {
                case SinglePlayer:
                    _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[playerID integerValue] forVideoID:(int)[mediaID integerValue]]];
                    isRelodaed = NO;
                    break;
                case PlaylistPlayer:
                    _player = [[BVPlayer alloc] initWithDataForRN:[[BVData alloc] initPlayerID:(int)[playerID integerValue] forPlaylistID:(int)[mediaID integerValue]]];
                    isRelodaed = NO;
                    break;
                default:
                    break;
            }
        }
    }
    
    int radius = [setCornerRadius intValue];
    [_player useVPAIDSupport:useVPAIDSupport];
    [_player controlAutoplay:controlAutoplay];
    [_player setPlayerReferenceName:playerReference];
    [_player scrollOnAd:scrollOnAd];
    [_player setCornerRadius:radius/2];
    [_player setPlayerLanguage:localization];
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"referenceReactTag" object:nil userInfo:@{@"reactTag": [self.reactTag stringValue]}];
    
    return _player;
}

- (void)loadVideo:(NSNumber *)playerID mediaID:(NSNumber *)mediaID {
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
        NSDictionary *userInfo;
        NSMutableDictionary *mutableUserInfo = [[NSMutableDictionary alloc] init];
        if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerSetFullscreenOn"]) {
            [UIApplication sharedApplication].statusBarHidden = YES;
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerSetFullscreenOff"]) {
            [UIApplication sharedApplication].statusBarHidden = NO;
        }
        
        if (notification.userInfo[@"reference"])
            reference = [NSDictionary dictionaryWithObject:notification.userInfo[@"reference"] forKey:@"reference"];
        
        NSDictionary *event;
        if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerVideoBuffering"]) {
            event = [NSDictionary dictionaryWithObject:@"VIDEO_BUFFERING" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerVideoLoad"]) {
            event = [NSDictionary dictionaryWithObject:@"VIDEO_LOADING" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerVideoPause"]) {
            event = [NSDictionary dictionaryWithObject:@"VIDEO_PAUSED" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerVideoStarted"]) {
            event = [NSDictionary dictionaryWithObject:@"VIDEO_STARTED" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerVideoPlay"]) {
            event = [NSDictionary dictionaryWithObject:@"VIDEO_PLAYING" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerVideoStop"]) {
            event = [NSDictionary dictionaryWithObject:@"VIDEO_STOPPED" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerNext"]) {
            event = [NSDictionary dictionaryWithObject:@"NEXT_VIDEO" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerAutoplay"]) {
            event = [NSDictionary dictionaryWithObject:@"VIDEO_AUTOPLAY" forKey:@"event"];
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerSliderValueChanged"]) {
            return;
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerSliderTouched"]) {
            return;
        } else if ([(NSString *)notification.userInfo[@"event"] isEqualToString:@"playerSliderReleased"]) {
            return;
        } else if (([(NSString *)notification.userInfo[@"event"] hasPrefix:@"player "]) || ([(NSString *)notification.userInfo[@"event"] hasSuffix:@"sec"])){
            return;
        } else {
            event = [NSDictionary dictionaryWithObject:notification.userInfo[@"event"] forKey:@"event"];
        }
        
        if (reference)
            [mutableUserInfo addEntriesFromDictionary:reference];
        
        [mutableUserInfo addEntriesFromDictionary:event];

        userInfo = mutableUserInfo;
        [[NSNotificationCenter defaultCenter] postNotificationName: @"BridPlayer" object:nil userInfo:userInfo];
         
    }
    
    if ([notification.name isEqualToString:@"AdEvent"]) {
        NSDictionary *event;
        NSDictionary *userInfoAd;
        NSMutableDictionary *mutableUserInfoAd = [[NSMutableDictionary alloc] init];
        
        NSDictionary *reference;
        if (notification.userInfo[@"reference"])
            reference = [NSDictionary dictionaryWithObject:notification.userInfo[@"reference"] forKey:@"reference"];
        
        if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adLoaded"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_LOADED" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adProgress"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_INPROGRESS" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adStarted"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_STARTED" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adPause"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_PAUSED" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adResume"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_RESUMED" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adError"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_ERROR" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adCompleted"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_COMPLETED" forKey:@"ad"];
        }  else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adTapped"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_TAPPED" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adSkipped"]) {
            event = [NSDictionary dictionaryWithObject:@"AD_SKIPPED" forKey:@"ad"];
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adFirstQuartile"]) {
            return;
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"adMidpoint"]) {
            return;
        } else if ([(NSString *)notification.userInfo[@"ad"] isEqualToString:@"Quartile"]) {
            return;
        } else {
            event = [NSDictionary dictionaryWithObject:notification.userInfo[@"ad"] forKey:@"ad"];
        }
        
        if (reference)
            [mutableUserInfoAd addEntriesFromDictionary:reference];
        
        [mutableUserInfoAd addEntriesFromDictionary:event];

        userInfoAd = mutableUserInfoAd;
        [[NSNotificationCenter defaultCenter] postNotificationName: @"BridPlayerAd" object:nil userInfo:userInfoAd];
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
