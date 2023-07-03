import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const LS_VIDEO_TIME = 'videoplayer-current-time';

const player = new Player('vimeo-player', {
  id: 'vimeo-player',
  width: 640,
});

const trotVideoCurentTime = throttle(videoCurentTime, 1000);

player.on('timeupdate', trotVideoCurentTime);

function videoCurentTime(event) {
  localStorage.setItem(LS_VIDEO_TIME, event.seconds);
  console.log(event.seconds);
}
const curentTime = localStorage.getItem(LS_VIDEO_TIME);

player.setCurrentTime(curentTime ? curentTime : 0);
