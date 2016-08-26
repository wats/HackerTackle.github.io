var menu = document.getElementById("menu");




function addCurrentSelected(event){
    var hash = window.location.hash;
    if( hash === "" ){
        hash="#about";
    }
    
    var selectedId = hash.substring(1).split("_")[0];
    var ul = menu.children[0];
    
    for(var i in ul.children){
        var a = ul.children[i].children;
        if( a && a[0].hash === "#" + selectedId ){
            a[0].className = "selected";
        }else if(a){
            a[0].className = "";
        }    
    }
   

    var contents = document.getElementsByClassName("content");
    for(var i=0; i < contents.length ; i++ ){
        contents[i].classList.remove("selected");
    }

    var selectedContent = document.getElementById(selectedId);
    selectedContent.classList.add("selected");

    
}



menu.onclick = addCurrentSelected;
window.onload = addCurrentSelected;
window.onhashchange = addCurrentSelected;
