//
//  BridtvSdkModule.h
//  BridtvSdkModule
//
//  Created by Predrag Jevtic on 17.5.23..
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface BridtvSdkModule : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic) RCTEventEmitter *emitter;

@end
