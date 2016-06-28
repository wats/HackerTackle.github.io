  var canvas1 = document.getElementById('header_image');
if (canvas1.getContext) {
    var context1 = canvas1.getContext('2d');
    var size = 600;
    var center = size/2;
    var length = size/3;
    var time =0;
    setInterval(anim,16);

}
const SIZE = 2000;
const STEP = 20;
var i = 0;
var prey = Math.cos((i)/100) * 300 + 300;
function anim(){
  i++;
  var context;
  context = context1;
  x = i * STEP % SIZE;
    context.strokeStyle = 'rgb('+Math.floor(Math.random() * 255) + ' ,0, 0)';
  var color = 1 - (x/ SIZE);
  var y = Math.cos((i*10)/100) * 300 + 300;
  context.lineWidth=1;
  context.globalAlpha = color;
  context.beginPath();
  context.moveTo(x-STEP, prey);
  context.lineTo(x, y);
  context.stroke();
  prey = y;
 }
