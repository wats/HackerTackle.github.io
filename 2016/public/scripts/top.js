var canvas = document.getElementById('header_image');
canvas.style.width = window.innerWidth + 'px';
canvas.width = window.innerWidth * window.devicePixelRatio;
const HEIGHT = 600;
const centerX = canvas.width / 2;
const centerY = HEIGHT / 2;
const WAVE_HEIGHT = HEIGHT / 3;
const FPS = 1000 / 60;


var pointArray = [new Point()];
for(i=0; i<6; i++){
  pointArray.push(new Point());
}

if (canvas.getContext) {
  var context = canvas.getContext('2d');
  context.lineWidth = 1;
  setInterval(anim, FPS);
}

// service worker関連
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
    // 登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // 登録失敗 :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

function anim(){
  if(window.pageYOffset < HEIGHT + 100){
    for (point of pointArray) {
      move(point);
      paint(context, point);
    }
  }

}
 function randomValue(){
   return Math.floor(Math.random() * 255);
 }
 function createRandomColor(){
   return 'rgb('
     + randomValue() + ' ,' +
     + randomValue() + ' ,' +
     + randomValue()
   ')';
 }
 function Point(){
   reset(this);
 }
 function move(point, time){
   point.preX = point.x;
   point.preY = point.y;
   point.wave += point.waveWidth;
   if(point.x > canvas.width){
     reset(point);
   }else{
     point.x += point.speed;
     point.y =  convertY(point);
   }
 }
 function getAlpha(point){
   if( point.x < centerX){
     return 1;
   }else{
     return (1 - (point.x / canvas.width)) * 2;
   }
 }
 function reset(point){
   point.waveHeight = Math.random() * WAVE_HEIGHT + 10;
   point.speed = Math.random() * 10 + 2;
   point.waveWidth = Math.random() / 5;
   point.wave = Math.random();
   point.preY =  convertY(point);
   point.wave += point.waveWidth;
   point.y =  convertY(point);
   point.x = point.speed;
   point.preX = 0;
   point.color = createRandomColor();
 }

function convertY(point){
  return Math.cos(point.wave) * point.waveHeight + centerY;
}

function paint(context, point){
  context.globalAlpha = getAlpha(point);
  context.strokeStyle = point.color;
  context.beginPath();
  context.moveTo(point.preX, point.preY);
  context.lineTo(point.x, point.y);
  context.stroke();
  context.globalAlpha = 0.2;
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(point.preX - 1, 0, point.speed, HEIGHT);
}
