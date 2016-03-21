var page=0;
var max=0;
$(document).ready(function(){
				buildForm("#main");
				//buildForm("#main2");
				if($(location).attr('href').indexOf("#section0")==-1){
					$(location).attr('href','#section0');
				}else{
					$(location).attr('href','');
				}
				$(document).on("swipeleft", function(){
					pageControl(1);
					});
				$(document).on("swiperight", function(){
					pageControl(-1);
				});
			});

function pageControl(control){
		
		if(control>0&&page<(max-1)) page+=control;
		if(control<0&&page>0) page+=control;
		$(location).attr('href','#section'+page);
	
}		
function buildForm(div){
	var path=window.location.href.replace('index.html','');
				$.getJSON(path+"form.json",function(data){
					
					$table="";
					
					for(i=0;i<data.topics.length;i++){
						$table="";
						$table+="<section height='100%' data-role='page' id='section"+i+"'><div data-role='header'><h1><b>EventHistoryCalendar</b></h1></div><table width='80%'  align='center' border='0' id='table"+i+"'>";
						$table+="<tr><td colspan='2'><h1>"+data.topics[i].topicLabel+"</h1></td><td></td></tr>";
						for(j=0;j<data.timeline.length;j++){
						$table+="<tr><td width='15%'>"+data.timeline[j].timeItemLabel+"</td><td><input type='text'/></td></tr>";
						}
						$table+="<tr><td><a onClick='pageControl(-1);' style='float:left;' data-role='button'>Previous</a></td><td><a onClick='pageControl(1);' style='float:right;' data-role='button'>Next</a></td></tr><table><div data-role='footer'><h1><b>EventHistoryCalendar</b></h1></div></section>";
						$("body").append($table);
						
						$("#table"+i).css("margin","auto");
						
					}
					max=data.topics.length;
					
					
				});
			 
};
