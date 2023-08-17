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

- (instancetype)init
{
    self = [super init];
    if (self) {
        emitter = self;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"PlayerEvent" object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playerEventReceived:) name:@"AdEvent" object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(setReactTag:) name:@"referenceReactTag" object:nil];
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
    
//    NSLog(@"PECA reactTag: %@", reactTag);
   
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"BridPlayerEvents"];
//    if (reactTag != nil) {
//        NSString *eventName = [NSString stringWithFormat:  @"BridPlayerEvents%@", reactTag];
////        NSLog(@"PECA eventName: %@", eventName);
//        return @[eventName];
//    } else {
//        return @[@"BridPlayerEvents"];
//    }
}

- (void)playerEventReceived:(NSNotification *)notification
{
    if (reactTag != nil) {
        NSString *eventName = [NSString stringWithFormat:  @"BridPlayerEvents%@", reactTag];
        if ([notification.name isEqualToString:@"PlayerEvent"]) {
            [self sendEventWithName:@"BridPlayerEvents" body:@{@"name": notification.userInfo[@"event"], @"playerReference": notification.userInfo[@"reference"]}];
        }
        
        if ([notification.name isEqualToString:@"AdEvent"]) {
            [self sendEventWithName:@"BridPlayerEvents" body:@{@"name": notification.userInfo[@"ad"], @"playerReference": notification.userInfo[@"reference"]}];
        }
    }

}


@end
