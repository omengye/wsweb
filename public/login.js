var getUrlParam = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var login = function() {
    var userid = getUrlParam('userid');
    $.post(window.location.origin+'/login?userid='+userid,{},function(data){
        if (data) {
            $('#message').show();
            $('#message').text(data);
            $('#btn').hide();
        }
    })
}

$(document).ready(function(){
    var userid = getUrlParam('userid');
    if (!userid) {
        $('#message').text("error");
        $('#btn').hide();
    }
    else {
        $('#message').hide();
    }
})