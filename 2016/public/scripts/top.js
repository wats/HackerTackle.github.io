var canvas = document.getElementById('header_image');
const HEIGHT = 600;
const centerY = HEIGHT / 2;
const WAVE_HEIGHT = HEIGHT / 3;
const FPS = 1000 / 60;

//アニメーション関連
if(canvas){
  canvas.style.width = window.innerWidth + 'px';
  canvas.width = window.innerWidth * window.devicePixelRatio;
  var centerX = canvas.width / 2;
  var pointArray = [new Point()];
  for(i=0; i<6; i++){
    pointArray.push(new Point());
  }

  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    context.lineWidth = 1;
    setInterval(anim, FPS);
  }
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

$(function() {
  // 別ページを開いた場合、一回Topを呼びTop内で開き直す処理
  let allParam = location.href.split("?");
  if(allParam.length>1){
    let splits = allParam[1].split("&");
    let params = {};
    for (let i = 0; i < splits.length; i++ ) {
      let param = splits[i].split("=");
      params[param[0]] = param[1];
    }
    if ( 'path' in params){
      load(params['path'], false);
    }else{
      load("/about.html", true);
    }
  }else{
    load("/about.html", true);
  }

  $(".inPageLink").click(function(){
    load(this.href, false);
    // リンク内を踏んだ場合はサーバー名が含まれるhrefとなりクラス名がつかないためココでactiveを付ける
    $(this).addClass("active");
    return false;
  });
});

function load(url, isFirst){
  $("#loading").show();
  $("#loading_back").show();
  // 開いているページのナビゲーションをハイライト
  $(".inPageLink").removeClass("active");
  $("[href ^= '"+url+"' ]").addClass("active");
  $.ajax({
    url: url,
    cache: true,
    success: function(html){
      $(html).find("#main").each(function(){
        $("#loading").hide();
        $("#loading_back").hide();
        $("#main").html($(this).html());
        let now = new Date();

        if ( now.getUTCMonth() == 8 && now.getUTCDate() == 10 && url.indexOf("timetable.html") >= 0) {
          history.pushState('','',url);
          let hours = now.getUTCHours();
          let position;
          if(hours < 14 - 9){
            position = $(".hour14").offset().top;
          } else if(hours < 15 - 9){
            position = $(".hour15").offset().top;
          } else if(hours < 16 - 9){
            position = $(".hour16").offset().top;
          } else if(hours < 17 - 9){
            position = $(".hour17").offset().top;
          } else{
            position = $("#main").offset().top;
          }

          $('html,body').animate({ scrollTop: position}, 'fast');
        }else if(!isFirst){
          history.pushState('','',url);
          let position = $("#main").offset().top-100;
          $('html,body').animate({ scrollTop: position}, 'fast');
        }

      });
    }
  });
}
var refreshCount = 0;
var REFRESH_RATE = 10;
function anim(){
  if(window.pageYOffset < HEIGHT + 100){
    for (point of pointArray) {
      move(point);
      paint(context, point);
    }
    refreshCount++;
    if(refreshCount > REFRESH_RATE){
      context.globalAlpha = 0.04;
      context.fillStyle = "rgb(0, 0, 0)";
      context.fillRect(0, 0, canvas.width, HEIGHT);
      refreshCount = 0;
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

}
