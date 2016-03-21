$(document).ready(function(){
				buildForm("#main");
				//buildForm("#main2");
				if($(location).attr('href').indexOf("#section0")==-1){
					$(location).attr('href','#section0');
				}else{
					$(location).attr('href','');
				}
				
			 
			});
			
function buildForm(div){
	var path=window.location.href.replace('index.html','');
				$.getJSON(path+"form.json",function(data){
					alert("entrou no build form");
					$table="";
					//table+="<td >Topics</td><td colspan='5'>Timeline</td></tr>";
					//$table+="<tr><th>Topics</th>";
					
					
					//$table+="</tr>";
					for(i=0;i<data.topics.length;i++){
						$table="";
						$table+="<section data-role='page' id='section"+i+"'><table width='80%'  align='center' border='0' id='table"+i+"'>";
						$table+="<tr><td colspan='2'><h1>"+data.topics[i].topicLabel+"</h1></td><td></td></tr>";
						for(j=0;j<data.timeline.length;j++){
						$table+="<tr><td width='15%'>"+data.timeline[j].timeItemLabel+"</td><td><input width='120px' type='text'/></td></tr>";
						}
						$table+="<tr><td><a href='#section"+(i-1)+"' style='float:left;' data-role='button'>Previous</a></td><td><a href='#section"+(i+1)+"' style='float:right;' data-role='button'>Next</a></td></tr><table></section>";	
						//$("body").append($table);
						$("body").append($table);
						$("#table"+i).css("margin","auto");
						alert($table);
						
						//$("#table"+i).attr("data-role","table");
						//$("#table"+i).attr("class","ui-responsive");
						//console.log($("body"));
					}
					
					
					
				});
			 
};
		