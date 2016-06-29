
const WIDTH = 2000;
const HEIGHT = 600;
const STEP = 20;
const CENTER_X = WIDTH / 2;

var canvas = document.getElementById('header_image');
if (canvas.getContext) {
    var context = canvas.getContext('2d');
    context.lineWidth=1;
    setInterval(anim,16);
}
var i = 0;
var waveHeight = 0;
var prey = Math.cos((i)/100) * HEIGHT + 300;
var prey2 = Math.sin((i)/100) * HEIGHT + 300;

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
function feedOut(){
    context.globalAlpha = 0.1;
    context.fillStyle = "rgb(0, 29, 33)";
    context.fillRect(0, 0, WIDTH, HEIGHT);

}
var sinColor;
function anim(){
  x = i * STEP % WIDTH;
  if(x==0){
    waveHeight = Math.random() * 300;
    sinColor = createRandomColor();
  }
  var color;
  if( x < CENTER_X){
    color = 1;
  }else{
    color = (1 - (x / WIDTH))*2;
  }
  var y = Math.cos((i*10)/100) * waveHeight + 300;
  var y2 = Math.sin((i*10)/100) * waveHeight + 300;
  context.globalAlpha = color;

  context.strokeStyle = sinColor;
  context.beginPath();
  context.moveTo(x -STEP , prey);
  context.lineTo(x , y);
  context.stroke();
  context.beginPath();
  context.moveTo(x -STEP , prey2);
  context.lineTo(x , y2);
  context.stroke();
  prey = y;
  prey2 = y2;
  i++;
 }
