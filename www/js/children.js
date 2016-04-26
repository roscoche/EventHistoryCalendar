			//document.addEventListener("deviceready", function(){
			$(document).ready(function(){
				
				
				var original_H = 0;				
				var savedItem = "";
				
				//Draw table and items
				$.getJSON("formchildren.json", function(data){
					$.getJSON("savechildren.json", function(calendarData){
						//Draw table
						var table = "";
						var color = ["#5c91c6","#aac368","907ab0","cc665d","f9a757"]
						table+="<table id='table1' border='1'><td colspan='"+(data.topics.length+1)+"'>"					
						//Load pictures
						for(i=0;i<data.items.length;i++){
							table += "<img src='images/"+data.items[i].itemName+".png' class='drag-image' id='d"+i+"' alt='"+data.items[i].itemName+"' name='"+data.items[i].itemName+"' width='40' height='40' hspace='10'/>";						
						}
						table+="</td><tr><td id='top'><img src='images/pitt.png' alt='Pitt Logo' width='100' height='100' /></td>";
						//First Row
						for(i=0;i<data.topics.length;i++){						
							table += "<td bgcolor='"+color[i%5]+"'><img src='images/"+data.topics[i].image+"'  width='40' height='40' /></br>"+data.topics[i].topicLabel+"</td>";
						}					
						table += "</tr>";
						for(i=0;i<data.timeline.length;i++){
							//First Column
							table += "<tr><td bgcolor='"+color[i%5]+"'><img src='images/"+data.timeline[i].image+"'  width='40' height='40' /></br>"+data.timeline[i].timeItemLabel+"</td>";
							
							for(j=0;j<data.topics.length;j++){								
								//Load data if avaiable
								var aux_class_table = "";
								var aux_table = "";
								var id_cell = "";
								for(k=0;k<calendarData.saveItem.length;k++){
									if(i == calendarData.saveItem[k].topicID - 1 && j == calendarData.saveItem[k].timeItemID - 1){
										savedItem = calendarData.saveItem[k].itemName;
										id_cell = "c_"+i+"_"+j;
										aux_table += "<img src='images/"+savedItem+".png' id='d"+i+"' name='"+savedItem+"' alt='"+id_cell+"' class='dropped' width='40' height='40' hspace='10'/>";
										//Record item in the cell class										
										aux_class_table += " " + savedItem
										
									}
								}								
								table += "<td class ='drop-cell"+aux_class_table+"' id='c_"+i+"_"+j+"'>"
								table += aux_table;
								table +="</td>";							
							}						
							table += "</tr>";
						}
						table+="</table>";
						$("#main").append(table);
						
						//Get original size of the top cell
						original_H = $('#top').height() - 31;						
						
						//Make each item draggable			
						$(".drag-image").draggable({						
							helper: "clone",
							scroll: false
						});					
						
						
						//Make each cell droppable											
						$( ".drop-cell" ).droppable({
							//Drop event
							drop: function( event, ui ) {														
								var name = ui.helper[0].name;
								$obj = $(this);
								var id_cell = $obj.attr('id');
								
								//Check if the item was not dropped in the cell yet
								if(!$('#'+id_cell).hasClass(name)){									
									
									//Make a clone of the item inside the cell
									$(this).append($(ui.draggable).clone());
									$('#'+id_cell).addClass(name); //cell		
									$('#'+id_cell+" .drag-image").attr("alt", id_cell);								
									$('#'+id_cell+" .drag-image").removeClass("drag-image").addClass("dropped"); //dropped item								
									
									//Fix cell height after item is dropped in								
									$('#'+id_cell).attr("height", original_H);
									
									//Method to request record insertion
									saveItemData(id_cell, name);
								}
							}						
						});

						//Make items removable	
						$('body').on('click', '.dropped', function() {						
							$obj = $(this);
							var name = $obj.attr('name');
							var loadedCell = $obj.attr('alt');
							var r = confirm("Delete " +name+"?");
							if (r == true) {										
								//Remove item from the cell										
								$obj.remove(); //loaded item																		
								$('#'+loadedCell).removeClass(name); //cell
								
								//Fix cell height after item is removed	
								$('#'+loadedCell).attr("height", original_H);
								
								//Method to request record deletion
								deleteItemData(loadedCell, name);
							}							
						});
						
					});//end load saved data
				});//end form								
			});// end ready
			
			function saveItemData(controlID, val){
				var topicID, timeItemID;
				var idArray = controlID.split('_');
				var dataToSave = {};
				if(idArray.length == 3){
					topicID = idArray[1];
					timeItemID = idArray[2];
					
					dataToSave.topicID = topicID;
					dataToSave.timeItemID = timeItemID;
					dataToSave.textValue = val;
					
					console.log("SAVE");
					console.log(dataToSave);
					// $.post('savecalendarentry.php', dataToSave);
				}
			}	
			function deleteItemData(controlID, val){
				var topicID, timeItemID;
				var idArray = controlID.split('_');
				var dataToDelete = {};
				if(idArray.length == 3){
					topicID = idArray[1];
					timeItemID = idArray[2];
					
					dataToDelete.topicID = topicID;
					dataToDelete.timeItemID = timeItemID;
					dataToDelete.textValue = val;
					
					console.log("DELETE");
					console.log(dataToDelete);					
					// $.post('savecalendarentry.php', dataToDelete);
				}			
			}	