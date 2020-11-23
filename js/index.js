let player = document.querySelector('audio');
let play = document.querySelector('#play');
let pause = document.querySelector('#pause');
let forward = document.querySelector('#forward');
let back = document.querySelector('#back');
let progress = document.querySelector('.progress');
let volume = document.querySelector('#volume');
let volumeslider = document.getElementById("volumeslider");

play.addEventListener('click', function() {
    play.classList.add('hide');
    pause.classList.toggle('hide');
    player.play();
});
pause.addEventListener('click', function() {
    play.classList.toggle('hide');
    pause.classList.toggle('hide');
    player.pause();
});
forward.addEventListener('click', function() {
    player.currentTime += 10;
});
back.addEventListener('click', function() {
    player.currentTime -= 10;
});

player.addEventListener('timeupdate', function() {
    let width = (this.currentTime / this.duration) * 100;
    progress.style.width = Math.floor(width) + '%';

});
player.addEventListener('ended', () => {
    progress.style.width = 0;
    player.loop;
    play.classList.toggle('hide');
    pause.classList.toggle('hide');
});

volume.addEventListener('click', function() {
    volumeslider.classList.toggle('hidden');
});

volumeslider.oninput = function() {
    player.volume = this.value / 100;
    if (this.value == 0) {
        volume.classList = 'fa fa-volume-off';
    } else if (this.value < 50) {
        volume.classList = 'fa fa-volume-down';
    } else {
        volume.classList = 'fa fa-volume-up';
    }
    volumeslider.style.background = 'linear-gradient(90deg, #1c1b44, #1c1b44 ' + this.value + '%, #f0f0f0 ' + this.value + '%, #f0f0f0 50%)';
}