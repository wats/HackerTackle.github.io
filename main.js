var menu = document.getElementById("menu");

function addCurrentSelected(event){
    var hash = window.location.hash;

    
    var ul = menu.children[0];

    for(var i in ul.children){
        var a = ul.children[i].children;
        if( a && a[0].hash === hash ){
            a[0].className = "selected";
        }else if(a){
            a[0].className = "";
        }    
    }

   

    var content_ids = ["about","timetable","speaker","register"];
    var selectedId = hash.substring(1);
    var selected = false;
    
    for(var i in content_ids){
        var element = document.getElementById(content_ids[i]);
        if( content_ids[i] === selectedId ){
            selected = true;
            element.classList.add("selected");
        }else{
            element.classList.remove("selected");
        }

    }

    if( !selected ){
        window.location.hash = "about";
    }
}

menu.onclick = addCurrentSelected;
window.onload = addCurrentSelected;
window.onhashchange = addCurrentSelected;
