$(document).ready(function(){
				buildForm("#main");
				
			});

	
function buildForm(div){
	var path=window.location.href.replace('index.html','');
				$.getJSON(path+"js/form.json",function(data){
					$.getJSON(path+"js/caldata.json", function(calendarData){
					
						
						$table=$("<table></table>");
						
						//CREATING ROW AND FIRST CELL EMPTY
                        $tr=$("<tr></tr>");
                        $th=$("<th></th>");
						$tr.append($th);
						
						//CREATING TABLE HEADERS USING THE TIMELINE ITEMS
						for(i=0;i<data.timeline.length;i++){
							$th=("<th>"+data.timeline[i].timeItemLabel+"</th>");
						    $tr.append($th);
                        }
						$table.append($tr);
						
						//NOW WE ARE CREATING THE ROWS WITH THE QUESTIONS AND EMPTY CELLS
						for(j=0;j<data.topics.length;j++){
							$tr=$("<tr></tr>");
							for(i=0;i<=data.timeline.length;i++){
								if(i==0){
                                    $td=$("<td class='questioncol'>"+data.topics[j].topicLabel+"</td>");
                                    $tr.append($td);
                                } 
								else{
                                    $td=$("<td id='"+data.topics[j].topicID+"_"+data.timeline[i-1].timeItemID+"'></td>");
                                    $td.click(function(){
                                                $input=$("<input type='text' >");
                                                $input.css("width","100%");
                                                $(this).append($input);
                                                $input.focus();
                                                $input.focusout(function(){
                                                var arr = $input.parent().attr("id").split('_');
                                                var dataToSend={
                                                    "topicID":arr[0],
                                                    "timeItemID": arr[1],
                                                    "textValue": $input.val()
                                                };
                                                $.post('updateData.php', dataToSend);
                                                $input.parent().html($input.val());
                                                $input.remove();
                                            })
                                            if($(this).html()){
                                                var content = $(this).text();
                                                $(this).contents().filter(function(){
                                                    return (this.nodeType == 3);
                                                }).remove();
                                                $input.val(content);
                                                
                                            }else{
                                               
                                            }
                                           
//                                        }
                                    })
                                    $tr.append($td);
                                } 
								
							}
                            $table.append($tr);
						}
						
						$(div).append($table);
						
						//FINISHED BUILDING THE TABLE, NOW WE ARE GOING TO RETRIEVE AND SET QUESTIONS ALREADY ANSWERED
						for(i=0;i<calendarData.caldata.length;i++){
							$("#"+calendarData.caldata[i].topicID+"_"+calendarData.caldata[i].timeItemID).text(calendarData.caldata[i].textValue);
						}
						
					
					
					
					});
				});
			 
};
