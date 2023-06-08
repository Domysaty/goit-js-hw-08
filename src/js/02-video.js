import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const currentTimeKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime({ seconds }) {
  localStorage.setItem(currentTimeKey, seconds);
}

function restoreCurrentTime() {
  const currentTime = localStorage.getItem(currentTimeKey);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}

restoreCurrentTime();
