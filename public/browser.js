function IEType() {
    var userAgent = navigator.userAgent;
    var isIE = window.ActiveXObject || "ActiveXObject" in window;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (userAgent.indexOf('MSIE 6.0') != -1) {
            return 6;
        } else if (fIEVersion == 7) { return 7; }
        else if (fIEVersion == 8) { return 8; }
        else if (fIEVersion == 9) { return 9; }
        else if (fIEVersion == 10) { return 10; }
        else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
            return 11;
        }
        else { return 5 }
    }
    return 0;
}
document.browsertype = IEType();
if (document.browsertype > 0 && document.browsertype < 10) {
    window.onload = function () {
        var lowVerIE = document.getElementById('lowVerIE');
        lowVerIE.style.display = 'block';
    }
}

