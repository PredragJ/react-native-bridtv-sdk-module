# react-native-bridtv-sdk-module

BridTV SDK player for react native

## Installation

```sh
npm install react-native-bridtv-sdk-module
or 
yarn add react-native-bridtv-sdk-module


IOS 

After NPM, cd to IOS and run  pod install

Android 

To update dependencies and fetch the latest packages open Android Studio and run Gradle Sync. By performing the Gradle sync, you ensure that your Android project is up to date with the latest packages and dependencies, which can help resolve compatibility issues and provide access to new features and bug fixes.

Because Module currently using BridPlayer SDK SNAPSHOT 
In Gradle (Module:app) need to be added

 repositories {
    maven { url "https://s01.oss.sonatype.org/content/repositories/snapshots/" }
  }

```


## Usage

```js
import { BridPlayer } from "react-native-bridtv-sdk-module";

// ...
const App = () => {
  const bridPlayerRef = React.useRef<BridPlayer>(null);

  const handleVideoLoad = () => {
    console.log('VIDEO LOADED');
  };

          <BridPlayer
            ref={bridPlayerRef}
            style={...} // Player width and height
            bridPlayerConfig={{
              playerID: xxxxx, // PlayerID from BridTV cms
              mediaID: xxxxxxxx, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
              controlAutoplay: true, //enables the client to take control over autoplay - optional
              enableAdControls: true, //displays ad controls - optional
            }}
            handleVideoLoad={handleVideoLoad} // Player event callbacks
            ...
            handleVideoError={...}

          />
```

##  Props

The BridPlayer component accepts the following props:

+ **style** (optional): Specifies the style for the player component.

+ **bridPlayerConfig**: An object that contains configuration options for the player.  It includes properties playerID, mediaID, typeOfPlayer, useVPAIDSupport, controlAutoplay.
+   scrollOnAd: true This option enables scrolling during ad and is specific to the iOS platform. By default, Android has scrolling enabled during ads.

+ **Video event callbacks**: These props allow you to specify callback functions for various video events like:
    - handleVideoLoad, 
    -  handleVideoStart, 
    -  handleVideoPlay, 
    -  handleVideoBuffering, 
    -  handleVideoProgress, 
    -  handleVideoPaused,
    -  handleVideoEnd, 
    -  handleVideoSeek, 
    -  handleFullscreenOpen, 
    -  handleFullscreenClose,
    -  handleVideoAutoplay

+ **Ad event callbacks**: These props allow you to specify callback functions for various ad events like:
    -  handleVideoAdLoaded, 
    -  handleVideoAdCompleted, 
     - handleVideoAdResumed, 
     - handleVideoAdStart, 
     - handleVideoAdPaused, 
     - handleAdProgress, 
    -  handleVideoAdTapped, 
    -  handleVideoAdSkipped, 
    -  handleVideoAdEnd

+ **handleVideoError**: A callback function that handles video errors. It receives an errorEvent object. These are the error event types that can occur with the BridPlayer:

    - **adError**:
        - Name: adError
        - Message: Error occurred during ad playback.
        - Code: 300

    - **videoBadUrl**:
        - Name: playerVideoBadUrl
        - Message: Invalid video from BridTv CMS/Invalid video URL.
        - Code: 101

    - **unsupportedFormat**:
        - Name: playerUnsupportedFormat
        - Message: Video player error. Probably unsupported video format.
        - Code: 102

    - **protectedContent**:
        - Name: playerProtectedContent
        - Message: Cannot play protected content.
        - Code: 103

    - **lostIntenetConnection**:
        - Name: playerLostInternetConnection
        - Message: Lost internet connection.
        - Code: 100

    - **liveStreamError**:
        - Name: playerLivestreamError
        - Message: An error occurred during live stream playback.
        - Code: 200

These error types represent various issues that can occur during the playback of videos or ads with the BridPlayer. By handling these error events appropriately, you can provide better error feedback and take necessary actions to address the specific error conditions encountered during playback.

##  Methods

+ **play(): void:** Plays the video.
+ **pause(): void:** Pauses the video.
+ **previous(): void:** Plays the previous video in the playlist.
+ **next(): void:** Plays the next video in the playlist.
+ **mute(): void:** Mutes the video.
+ **unMute(): void:** Unmutes the video.
+ **loadVideo(playerID: number, mediaID: number): void:** Loads a video with the specified playerID and mediaID from BridTv CMS.
+ **loadPlaylist(playerID: number, mediaID: number): void**: Loads a playlist with the specified playerID and mediaID from BridTv CMS.
+ **setFullscreen(fullscreen: boolean):** void: Sets the fullscreen mode of the player. Pass true to enter fullscreen mode or false to exit fullscreen mode.
+ **showControls(): void:** Enable the video controls.
+ **hideControls(): void:** Disable the video controls.
+ **showPoster(): void:** Show video thumbnail.
+ **hidePoster(): void:** Hide video thumbnail.
+ **isAdPlaying(): bool**Checks if an ad is currently playing.
+ **getPlayerCurrentTime():** Promise<number | null>: Retrieves the current playback time of the player in milliseconds. Returns a promise that resolves with the current time or null if the player is not loaded.
+ **getAdDuration(): Promise<number | null>:** Retrieves the duration of the currently playing ad in milliseconds. Returns a promise that resolves with the ad duration or null if no ad is playing.
+ **getVideoDuration(): Promise<number | null>:** Retrieves the duration of the currently loaded video in milliseconds. Returns a promise that resolves with the video duration or null if no video is loaded.
+ **isPaused(): bool:** Checks if the video is currently paused.
+ **isRepeated(): bool:** Checks if the video is already repeated.
+ **destroyPlayer(): void:** Destroys the native player instance and cleans up any resources associated with it.
+ **isAutoplay(): bool:** Method is used to check if the current video is set to autoplay..


*Please note that these methods should be called on an instance of the BridPlayer class.*

***Take a look at our Example App for best practices while implementing BridPlayer RN module.***

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made by Brid.tv