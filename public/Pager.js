/**
 * js分页
 */
var cpager = {
		pagers:{},
		instance : function(id, option) {
			var Pager = {};
			Pager.totalCount = parseInt(option.totalCount || 0);	//总条数
			Pager.pageSize   = parseInt(option.pageSize || 10);	//每页显示条数
			Pager.className  = option.className || 'pagination';	//分页的样式
			Pager.prevButton = option.prevButton || '&laquo;';	//向前翻按钮
			Pager.nextButton = option.nextButton || '&raquo;';	//向后翻按钮
			Pager.firstButton = option.firstButton || '';		//第一页按钮
			Pager.lastButton = option.lastButton || '';			//最后一页按钮
			
			Pager.isInited = false;
			
			// 需要覆盖此方法,pagenum为当前所选择的页数
			Pager.customChange = function(pagenum) {
				debugger;
			};
			
			Pager.changePage = function(pagenum) {
				//  更改页码
				$('#'+id+' #Tpagenum').text(" 第 "+pagenum+" 页 ");
				// 重置样式并设置重置点击事件
				$('#'+id+' li').removeClass('disabled');
				$('#'+id+' #prevp').attr("onClick","");
				$('#'+id+' #nextp').attr("onClick","");
				if (pagenum==1) {
					//  第一页
					$('#'+id+' #prevp').addClass("disabled");
					$('#'+id+' #prevp a').css("cursor","");
					$('#'+id+' #nextp a').css("cursor","pointer");
					$('#'+id+' #prevp a').attr("onClick","");
					$('#'+id+' #nextp a').attr("onClick","cpager.pagers['"+id+"'].changePage(2)");
				}
				else if (pagenum==Pager.max) {
					// 最后一页
					$('#'+id+' #nextp').addClass("disabled");
					$('#'+id+' #prevp a').css("cursor","pointer");
					$('#'+id+' #nextp a').css("cursor","");
					$('#'+id+' #prevp a').attr("onClick","cpager.pagers['"+id+"'].changePage("+(pagenum-1)+")");
					$('#'+id+' #nextp a').attr("onClick","");
				}
				else {
					$('#'+id+' #prevp a').css("cursor","pointer");
					$('#'+id+' #nextp a').css("cursor","pointer");
					$('#'+id+' #prevp a').attr("onClick","cpager.pagers['"+id+"'].changePage("+(pagenum-1)+")");
					$('#'+id+' #nextp a').attr("onClick","cpager.pagers['"+id+"'].changePage("+(pagenum+1)+")");
				}
				
				// 自定义方法
				Pager.customChange(pagenum);
			};
			
			Pager.genPager = function() {
				$('#'+id).empty();
				$('#'+id).show();
				if(Pager.totalCount==0 || Pager.totalCount<=Pager.pageSize) {
					$('#'+id).hide();
					return;
				}
			
				//.pagination > li > a,span 中指定按钮样式 改变按钮的大小 style="padding: 6px 8px;"
				var str = '<div style="float:right"><ul class="'+Pager.className+'"  style="margin-top: 0px;margin-bottom: 0px;">';
				if(Pager.firstButton){
					str += '<li id="startp" class="prev"><a style="border:none;cursor:pointer;padding: 6px 8px;" onClick="cpager.pagers[\''+id+'\'].changePage(1)">'+Pager.firstButton+'</a></li>';
				} 
				str += '<li id="prevp" class="prev disabled"><a onClick="" style="border:none;padding: 6px 8px;">'+Pager.prevButton+'</a></li>';

				var max = Math.ceil(Pager.totalCount/Pager.pageSize);
				// 设置最大页数
				Pager.max = max;
				var maxPageStr = '<div style="height:32px;float:right;margin-left: 5px;"><span style="top: 6px;position: relative;color:#507577">共 '+max+' 页</span></div>';
			
				str += '<li class="disabled"><a id="Tpagenum" style="border:none;padding: 6px 8px;"> 第 1 页 </a></li>'
				str += '<li id="nextp" class="next"><a style="border:none;cursor:pointer;padding: 6px 8px;" onClick="cpager.pagers[\''+id+'\'].changePage(2)">'+Pager.nextButton+'</a></li>';
				
				if(Pager.lastButton){
					str += '<li id="endp" class="next"><a style="border:none;cursor:pointer;padding: 6px 8px;" onClick="cpager.pagers[\''+id+'\'].changePage('+max+')">'+Pager.lastButton+'</a></li>';
				}
				str+='</ul></div>';
				$('.currpage').removeClass('hover');
				
				//设置初始化完成 
				Pager.isInited=true;
				$('#'+id).empty();
				$('#'+id).append(maxPageStr + str);
			};
			
			this.pagers[id]= Pager;
			return Pager;
		}
		
}
