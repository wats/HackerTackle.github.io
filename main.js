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


    // speaker navigation controll
    if( selectedId === "speaker"){
        var speakerId = hash.substring(1);
        if( speakerId == "speaker" ){
            speakerId = "speaker_1";
        }
        
        var ul = document.getElementById("speaker_table");
        for(var i in ul.children){
            var a = ul.children[i].children;
            if( a && a[0].hash === "#" + speakerId ){
                a[0].className = "selected";
            }else if(a){
                a[0].className = "";
            }    
        }

        
        var contents = document.getElementsByClassName("speaker_content");
        for(var i=0; i < contents.length ; i++ ){
            contents[i].classList.remove("speaker_selected");
        }
        var selectedContent = document.getElementById(speakerId);
        if( selectedContent != null ){
            selectedContent.classList.add("speaker_selected");
        }
    }
    
}


menu.onclick = addCurrentSelected;
window.onload = addCurrentSelected;
window.onhashchange = addCurrentSelected;
