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

- (instancetype)init
{
    self = [super init];
    if (self) {
        emitter = self;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"PlayerEvent" object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"AdEvent" object:nil];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

-(void)startObserving {
    hasListeners = YES;
}

-(void)stopObserving {
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"BridPlayerEvents", @"RNBridPlayerEvent"];
}

- (void)playerEventReceived:(NSNotification *)notification
{
    if ([notification.name isEqualToString:@"PlayerEvent"]) {
        [self sendEventWithName:@"BridPlayerEvents" body:@{@"name": notification.userInfo[@"event"]}];
        [self sendEventWithName:@"RNBridPlayerEvent" body:@{@"name": notification.userInfo[@"event"]}];
        
    }
    
    if ([notification.name isEqualToString:@"AdEvent"]) {
        [self sendEventWithName:@"BridPlayerEvents" body:@{@"name": notification.userInfo[@"ad"]}];
        [self sendEventWithName:@"RNBridPlayerEvent" body:@{@"name": notification.userInfo[@"ad"]}];
    }

}


@end
