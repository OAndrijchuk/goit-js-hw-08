import Player from '@vimeo/player';
let throttle = require('lodash.throttle');

const player = new Player('vimeo-player', {
  id: 'vimeo-player',
  width: 640,
});

const trotVideoCurentTime = throttle(videoCurentTime, 1000);
player.on('timeupdate', trotVideoCurentTime);
function videoCurentTime(event) {
  if (event.percent < 1) {
    localStorage.setItem('videoplayer-current-time', event.seconds);
    return;
  }
  localStorage.setItem('videoplayer-current-time', 0);
}

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    console.log('Videoplayer started from:', seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
