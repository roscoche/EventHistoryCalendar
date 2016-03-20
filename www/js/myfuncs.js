$(document).ready(function(){
				buildForm("#main");
				//buildForm("#main2");
			 
			});
			
function buildForm(div){
				$.get("form.json",function(data){
					$table="";
					$table+="<table border='1' data-role='table' class='ui-responsive' id='myTable'>"
					//table+="<td >Topics</td><td colspan='5'>Timeline</td></tr>";
					//$table+="<tr><th>Topics</th>";
					
					
					//$table+="</tr>";
					for(i=0;i<data.topics.length;i++){
						$table+="<tr><th><td colspan='2'>"+data.topics[i].topicLabel+"</td></th><th><td></td></th></tr>";
						for(j=0;j<data.timeline.length;j++){
						$table+="<tr><td>"+data.timeline[j].timeItemLabel+"</td><td><input width='120px' type='text'/></td></tr>";
						}
						
					}
					$table+="</table>";
					$(div).append($table);
					
				});
			 
};
		