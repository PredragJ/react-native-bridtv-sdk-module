//
//  BridtvSdkModule.m
//  BridtvSdkModule
//
//  Created by Predrag Jevtic on 17.5.23..
//  Copyright © 2023 Facebook. All rights reserved.
//

#import "BridtvSdkModule.h"

@implementation BridtvSdkModule

bool hasListeners;
@synthesize emitter;

RCT_EXPORT_MODULE(BridtvSdkModule);

NSString *lastEvent;
NSString *lastEventAd;
NSString *lastReference;
NSString *lastReferenceAd;

- (instancetype)init
{
    self = [super init];
    if (self) {
        emitter = self;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"BridPlayer" object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"BridPlayerAd" object:nil];

    }
    return self;
}

- (void)dealloc
{
    [emitter stopObserving];
    emitter = nil;
    [[NSNotificationCenter defaultCenter] removeObserver:self name:@"BridPlayer" object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:@"BridPlayerAd" object:nil];
    lastEvent = nil;
    lastEventAd = nil;
    lastReference = nil;
    lastReferenceAd = nil;
    
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"BridPlayerEvents"];
}

- (void)playerEventReceived:(NSNotification *)notification
{
    if ([notification.name isEqualToString:@"BridPlayer"]) {
        if ((lastEvent != notification.userInfo[@"event"]) || (lastReference != notification.userInfo[@"reference"])) {
            [self sendEventWithName:@"BridPlayerEvents" body:@{@"name": notification.userInfo[@"event"], @"playerReference": notification.userInfo[@"reference"]}];
            lastEvent = notification.userInfo[@"event"];
            lastReference = notification.userInfo[@"reference"];
            
        }
    }
    
    if ([notification.name isEqualToString:@"BridPlayerAd"]) {
        if ((lastEventAd != notification.userInfo[@"ad"]) || (lastReferenceAd != notification.userInfo[@"reference"])) {
            [self sendEventWithName:@"BridPlayerEvents" body:@{@"name": notification.userInfo[@"ad"], @"playerReference": notification.userInfo[@"reference"]}];
            lastEventAd = notification.userInfo[@"ad"];
            lastReferenceAd = notification.userInfo[@"reference"];
            }
    }
    
}


@end
