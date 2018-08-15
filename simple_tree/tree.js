function ClickEvent() {
    var target = event.target;
    var parent = event.target.parentNode;
    if (target.nodeName == "IMG" && parent.nodeName == "LI") {
        // サブツリーの展開
        var clist = parent.classList;
        if (clist.contains("collapse")) {
            clist.toggle("expand");
        }

        // マーカーのトグル
        var array = target.src.split("/");
        var fileName = array[array.length - 1];
        fileName == "close.png" ? target.src = "./images/open.png" : target.src = "./images/close.png";
    }
}