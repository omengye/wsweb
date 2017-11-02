// 当前页
var pageNum = 1;
// 每页条数
var rowNum = 10;
var pager;

var suggest = {};
suggest.wait = false;

var pageBtnClick = function(pagenum) {
	pageNum = pagenum;
	search(true);
}

var makePageneration = function(count) {
	pager = cpager.instance('pageneration', {
	    totalCount:parseInt(count), 		//总条数
	    pageSize:rowNum,    			//每页显示10条内容
	    pageParam:'p',   		//页码的参数名为'p'，默认为'page'
	    className:'pagination', //分页的样式
	    prevButton:'<',     //上一页按钮
	    nextButton:'>',     //下一页按钮
	    firstButton:'<<',      //第一页按钮
	    lastButton:'>>',       //最后一页按钮
	});
	pager.genPager()
	// 覆盖默认点击事件
	pager.customChange = pageBtnClick;
}


var getstart = function() {
    return (pageNum-1)*rowNum+1;
}

var search = function(ispage) {
	if (!ispage) {
		pageNum = 1;
	}
    
    var index = layer.load(1, {
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
    var q = $('#search_txt').val();
    $.post(window.location.origin+'/s?q='+q+"&start="+getstart(), {

    }, function(data) {
		$('#infos').show();
        layer.close(index);
		suggest.hide();
        if (data.error) {
            $('#infos').empty();
            $('#infos').text("ERROR: "+data.error);
            return;
        }
        var stime = data.info.formattedSearchTime;
        var stotal = data.info.formattedTotalResults;
        $('#stotal').text(stotal);
        $('#stime').text(stime);
        $("#items").empty();
        for (var i=0; i<data.items.length; ++i) {
            makeItem(data.items[i]);
        }
        if (!ispage) {
            var totalrow = parseInt(data.info.totalResults);
            if (totalrow>100) {
                totalrow = 100;
            }
            makePageneration(totalrow);
        }
    })
}

var makeItem = function(item) {
    var itemHtml = "<div class='item'><div class='title'><a class='link' href='"+item.link+"' target='_blank'>"+ item.title+"</a></div>"
        +"<div class='formattedUrl'>"+item.formattedUrl+"</div>"
        +"<div class='htmlSnippet'>"+item.htmlSnippet+"</div></div>";
    $("#items").append(itemHtml);
}

suggest.addEventListener = function(obj, event, fn){
    if(obj.addEventListener){
        obj.addEventListener(event, fn, false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+event, fn);
    }else{
        obj['on'+event] = fn;
    }
}

suggest.onInputCall = function(event){
    if(event.target.value.trim() !== ''){
		if (suggest.wait) {
			return;
		}
		suggest.wait = true;
		$.post(window.location.origin+'/suggest?q='+event.target.value, {},
			function(data){
			if (data.length<1) {
				suggest.hide();
				return;
			}
			suggest.show(data);
		});
		setTimeout(function(){
			suggest.wait = false;
		},500);
    }
	else {
		suggest.hide();
	}
}

suggest.hide = function() {
    $('#suggest').empty();
    $('#suggest').hide();
}

suggest.show = function(datas) {
    suggest.hide();
    if (datas.length<1) {
		return;
    }
	var genItem = function(val) {
		return "<div class='sitem'><div class='sval'>"+val+"</div></div>";
	}
	datas.forEach(function(val){
		$('#suggest').append(genItem(val));
	});
	$('#suggest').show();
	for (var i=0; i<$('.sval').length; ++i) {
		$($(".sval")[i]).mouseenter(suggest.onItemEnter);
		$($(".sval")[i]).mouseleave(suggest.onItemLeave);
	}
}

suggest.onItemEnter = function(event){
	$('.selitem').removeClass('selitem');
	$(event.target.parentNode).addClass('selitem');
}

suggest.onItemLeave = function(event){
	$('.selitem').removeClass('selitem');
	$(event.target.parentNode).addClass('selitem');
}

suggest.up = function() {
	if ($('#suggest').css('display')=="none") {
		return;
	}
	var selitem = suggest.select();
	if (!selitem || $($(selitem)[0]).prev().length<1) {
		$(selitem).removeClass('selitem');
		$($('.sitem')[$('.sitem').length-1]).addClass('selitem');
	}
	else {
		$(selitem).removeClass('selitem');
		$($(selitem)[0]).prev().addClass('selitem');
	}
	$('#search_txt').val(suggest.selectText());
}

suggest.down = function() {
	if ($('#suggest').css('display')=="none") {
		return;
	}
	var selitem = suggest.select();
	if (!selitem || $($(selitem)[0]).next().length<1) {
		$(selitem).removeClass('selitem');
		$($('.sitem')[0]).addClass('selitem');
	}
	else {
		$(selitem).removeClass('selitem');
		$($(selitem)[0]).next().addClass('selitem');
	}
	$('#search_txt').val(suggest.selectText());
}

suggest.select = function() {
	if ($('#suggest').css('display')=="none") {
		return;
	}
	if ($('.selitem').length<1) {
		return;
	}
	for (var i=0; i<$('.sitem').length; ++i) {
		if ($('.sitem')[i].className.indexOf('selitem')>-1) {
			return $('.sitem')[i];
		}
	}
	return null;
}

suggest.selectText = function() {
	var selitem = suggest.select();
	if (!selitem) {
		return '';
	}
	return $($('.selitem')).text();
}

suggest.onBlur = function() {
	suggest.hide();
}

suggest.onClick = function() {
	var selitem = suggest.select();
	$('#search_txt').val(suggest.selectText());
	$("#sbtn").click();
	suggest.hide();
}

suggest.initEvent = function() {
	$("#search_txt").on('input', suggest.onInputCall);
	$("#suggest").on('click', suggest.onClick);
	$(document).bind('click', function(e) {  
		var elem = e.target || e.srcElement;  
		while (elem) { 
			if (elem.id && elem.id == 'suggest') {  
				return;  
			}  
			elem = elem.parentNode;  
		}  
		suggest.hide(); 
	}); 
	
}

var bindkey = function() {
    $("#search_txt").keyup(function(event) {
        if (event.keyCode === 13) {
			$("#sbtn").click();
			suggest.hide();
        }
		else if ( event.keyCode == 27 ) {
			$('#suggest').hide();
		}
		// down
		else if ( event.keyCode == 40 ) {
			suggest.down();
		}
		// up
		else if ( event.keyCode == 38 ) {
			suggest.up();
		}
    });
	suggest.initEvent();
}

$(document).ready(function(){
	suggest.hide();
    bindkey();
})