# react-native-bridtv-sdk-module

BridTV SDK player for react native

## Installation

```sh
npm install react-native-bridtv-sdk-module

IOS 

After NPM pod install

Android 

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

          <BridPlayer
            ref={bridPlayerRef}
            style={styles.square}
            bridPlayerConfig={{
              playerID: xxxxx, // PlayerID from BridTV cms
              mediaID: xxxxxxxx, //VideoID or PlaylistID from BridTv cms
              typeOfPlayer: 'Single', // Single or Playlist
            }}
          />
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
