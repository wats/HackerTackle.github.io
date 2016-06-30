const WIDTH = 2000;
const HEIGHT = 600;
const STEP = 20;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const WAVE_HEIGHT = HEIGHT / 3;
var canvas = document.getElementById('header_image');

var pointArray = [new Point()];
for(i=0; i<3; i++){
  pointArray.push(new Point());
}

if (canvas.getContext) {
  var context = canvas.getContext('2d');
  context.lineWidth = 1;
  setInterval(anim, 16);
}
function anim(){
  for (point of pointArray) {
    move(point);
    paint(context, point);
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
   if(point.x > WIDTH){
     reset(point);
   }else{
     point.x += point.speed;
     point.y =  convertY(point);
   }
 }
 function getAlpha(point){
   if( point.x < CENTER_X){
     return 1;
   }else{
     return (1 - (point.x / WIDTH)) * 2;
   }
 }
 function reset(point){
   point.waveHeight = Math.random() * WAVE_HEIGHT + 10;
   point.speed = Math.random() * 10 + 5;
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
  return Math.cos(point.wave) * point.waveHeight + CENTER_Y;
}

function paint(context, point){
  context.globalAlpha = getAlpha(point);
  context.strokeStyle = point.color;
  context.beginPath();
  context.moveTo(point.preX, point.preY);
  context.lineTo(point.x, point.y);
  context.stroke();
  context.globalAlpha = 0.2;
  context.fillStyle = "rgb(0, 29, 33)";
  context.fillRect(point.preX - 1, 0, point.speed, HEIGHT);
}
