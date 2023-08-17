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

NSString *reactTag;
NSString *playerReference;

- (instancetype)init
{
    self = [super init];
    if (self) {
        emitter = self;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"PlayerEvent" object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"AdEvent" object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(setReactTag:) name:@"dataFromUIView" object:nil];
    }
    return self;
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

- (void)setReactTag:(NSNotification *)notification
{
   
    
    if (notification.userInfo[@"reactTag"] != nil)
        reactTag = notification.userInfo[@"reactTag"];
    
    if (notification.userInfo[@"playerReference"] != nil)
        playerReference = notification.userInfo[@"playerReference"];
    
    NSLog(@"PECA reactTag: %@", reactTag);
    NSLog(@"PECA playerReference: %@", playerReference);
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"BridPlayerEvents", @"RNBridPlayerEvent"];
}

- (void)playerEventReceived:(NSNotification *)notification
{
    if (!reactTag) {
        NSString *eventName = [NSString stringWithFormat:  @"BridPlayerEvents%@", reactTag];
        if ([notification.name isEqualToString:@"PlayerEvent"]) {
            [self sendEventWithName:eventName body:@{@"name": notification.userInfo[@"event"], @"playerReference": playerReference}];
        }
        
        if ([notification.name isEqualToString:@"AdEvent"]) {
            [self sendEventWithName:eventName body:@{@"name": notification.userInfo[@"ad"], @"playerReference": playerReference}];
        }
    }

}


@end
