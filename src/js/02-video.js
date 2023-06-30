import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: 'vimeo-player',
  width: 640,
});

const trotVideoCurentTime = throttle(videoCurentTime, 1000);

player.on('timeupdate', trotVideoCurentTime);

function videoCurentTime(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
  console.log(event.seconds);
}
const curentTime = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(curentTime ? curentTime : 0);
