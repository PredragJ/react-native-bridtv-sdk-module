import { BridPlayerEventErrorType } from 'src/types/error';

const BridPlayerErrorEvents = new Map<string, BridPlayerEventErrorType>([
  [
    'adError',
    {
      name: 'adError',
      message: 'Error occurred during ad playback.',
      code: '300',
    },
  ],
  [
    'playerVideoBadUrl',
    {
      name: 'playerVideoBadUrl',
      message: 'Invalid video from BridTv CMS/Invalid video URL.',
      code: '101',
    },
  ],
  [
    'playerUnsupportedFormat',
    {
      name: 'playerUnsupportedFormat',
      message: 'Video player error. Probably unsupported video format.',
      code: '102',
    },
  ],
  [
    'playerProtectedContent',
    {
      name: 'playerProtectedContent',
      message: 'Cannot play protected content.',
      code: '103',
    },
  ],
  [
    'playerLostInternetConnection',
    {
      name: 'playerLostInternetConnection',
      message: 'Lost internet connection.',
      code: '100',
    },
  ],
  [
    'playerLiveStreamError',
    {
      name: 'playerLiveStreamError',
      message: 'An error occurred during live stream playback.',
      code: '200',
    },
  ],
]);

export default BridPlayerErrorEvents;
