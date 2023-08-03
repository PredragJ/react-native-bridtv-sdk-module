const BridPlayerEventsIos = {
  //Video
  videoBuffering: 'playerVideoBuffering',
  videoLoad: 'playerVideoLoad',
  videoStart: 'playerVideoStarted',
  videoPlay: 'playerVideoPlay',
  videoPaused: 'playerVideoPause',
  videoSeek: 'playerSliderValueChanged',
  videoEnd: 'playerVideoStop',
  videoError: 'playerVideoError',
  fullscreenOpen: 'playerSetFullscreenOn',
  fullscreenClose: 'playerSetFullscreenOff',

  //Ad
  videoAdLoaded: 'adLoaded',
  videoAdCompleted: 'adComplete',
  videoAdResumed: 'adResume',
  videoAdStart: 'adStarted',
  videoAdPaused: 'adPause',
  videoAdProgress: 'adProgress',
  videoAdTapped: 'adTapped',
  videoAdSkipped: 'adSkipped',
  videoAutoplay: 'playerAutoplay',
};

const BridPlayerEventsAndroid = {
  //Video
  videoBuffering: 'video_buffering',
  videoLoad: 'video_load',
  videoStart: 'video_start',
  videoPlay: 'video_played',
  videoPaused: 'video_paused',
  videoSeek: 'video_seek',
  videoEnd: 'video_ended',
  videoError: 'video_error',
  fullscreenOpen: 'fullscreen_open',
  fullscreenClose: 'fullscreen_close',
  videoAutoplay: 'video_autoplay',

  //Ad
  videoAdLoaded: 'ad_loaded',
  videoAdCompleted: 'video_ad_completed',
  videoAdResumed: 'ad_resumed',
  videoAdStart: 'ad_started',
  videoAdPaused: 'ad_paused',
  videoAdProgress: 'ad_progress',
  videoAdTapped: 'ad_tapped',
  videoAdSkipped: 'ad_skipped',
};

export { BridPlayerEventsIos, BridPlayerEventsAndroid };
