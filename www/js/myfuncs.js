$(document).ready(function(){
				buildForm("#main");
				
			});

	
function buildForm(div){
	var path=window.location.href.replace('index.html','');
				$.getJSON(path+"js/form.json",function(data){
					$.getJSON(path+"js/caldata.json", function(calendarData){
					
						$table="";
						$table+="<table>";
						
						//CREATING ROW AND FIRST CELL EMPTY
						$table+="<tr><th></th>";
						
						//CREATING TABLE HEADERS USING THE TIMELINE ITEMS
						for(i=0;i<data.timeline.length;i++){
							$table+="<th>"+data.timeline[i].timeItemLabel+"</th>";
						}
						$table+="</tr>";
						
						//NOW WE ARE CREATING THE ROWS WITH THE QUESTIONS AND EMPTY CELLS
						for(j=0;j<data.topics.length;j++){
							$table+="<tr>";
							for(i=0;i<=data.timeline.length;i++){
								if(i==0) $table+="<td class='questioncol'>"+data.topics[j].topicLabel+"</td>";
								else $table+="<td id='"+data.topics[j].topicID+"_"+data.timeline[i-1].timeItemID+"'></td>";
								
							}
							$table+="</tr>";
						}
						$table+="</table>";
						$(div).append($table);
						
						//FINISHED BUILDING THE TABLE, NOW WE ARE GOING TO RETRIEVE AND SET QUESTIONS ALREADY ANSWERED
						for(i=0;i<calendarData.caldata.length;i++){
							$("#"+calendarData.caldata[i].topicID+"_"+calendarData.caldata[i].timeItemID).text(calendarData.caldata[i].textValue);
						}
						
					
					
					
					});
				});
			 
};
