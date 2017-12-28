
var speciesList = $('#speciesList').dataTable();

	
	var validRules = {
			
			Name : "",
			Scientificname : "",
			Description : "",
			imageName:""

		
};
/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * structure to define a message for element key is to be element name Value is
 * message
 */
var focusRules = {

		Name : "Enter your name",
		Scientificname : "Enter Scientific name",
		Description : "Fill Description ",
		imageName:"Upload your profile Picture"

};
			
			$(document).ready(function(){
				
			validateFormAddNewFaq();
			  $("form").bind("keypress", function(e) {
		          if (e.keyCode == 13) {
		              return false;
		         }
		    });
			  $("form#addRegions").submit(function(){
				  if($("form#addRegions").valid()){
						$('button#saveRegion').attr('disabled' ,"disabled");
						return true;
					}else {
						return false;
					}
			  });
			
			
		});	
			
		/**
		 * 
		 * form validation used for both edit and create FAQ.
		 */	
			
		function validateFormAddNewFaq(){
			validateNewWidget  = $("form#addRegions")
			.validate({	
			errorClass : 'error',
			validClass : 'success',
			errorElement : 'span',
			ignore : false,
			errorPlacement : function(error,element) {
					element.parent("div").prev("div").html(error);
						
			},
			rules : {
				regionid : {
					required : true,
					
				},
				Name : {
					required :true,
				},
				
				Scientificname : {
					required:true,
				},
				
				Description : {
					required:true,
				},
				},
			messages : {
				regionid: {
					required : "Please select one Region",
					
				},
				
				Name : {
					required : "Please Enter Title",
					
			},
			Scientificname : {
				required : "Please Enter Scientific Name ",
					
			},
			
			Description :{
				required : "Please Fill Description",
			},
			},
			onfocusin : function(element) {
				if (!$(element).parent('div').hasClass('success')) {
					this.showLabel(element,focusRules[element.name]);
					$(element).parent('div')
					.removeClass(this.settings.errorClass)
					.removeClass(this.settings.validClass)
					.prev("div").addClass('focus').removeClass(this.settings.errorClass)
								.removeClass(this.settings.validClass);
			}
		},

			highlight : function(element,errorClass, validClass) {
			if (element.type != 'textarea') {
			$(element)
				.parent('div')
				.removeClass(validClass)
				.addClass(errorClass)
				.prev("div")
					.removeClass(validClass)
					.addClass(errorClass);
			} 
		},
			unhighlight : function(element,
					errorClass, validClass) {
				$(element).parent('div')
				.removeClass(errorClass)
				.addClass(validClass).prev("div").addClass(validClass)
					.removeClass(errorClass);
				$('span.help-inline',$(element).parent('div')
						.prev('div')).text(
				validRules[element.name]);
				},
			
			});

		}
		
		
		$(document).ready(function() {
			$(":input").attr("autocomplete","off");
				
			//if press enter key the call search offer function
			$("input#searchSpecies").keypress(function(e)
			{
			   // if the key pressed is the enter key
				if (e.which == 13)
				{
					getSpeciesList($("input#searchSpecies").val());
			    }
			});
				$("input#searchSpecies").autocomplete({
				    minLength: 1,
				    source: function( request, response)
				    {
				    	//alert($('#searchRegions').val());
				    	$("#removemsg").remove();
				    	$.ajax({
				    		url : HOST_PATH + "admin/huntingspecies/searchkey/Keyword/" + $('#searchSpecies').val(),
				 			method : "post",
				 			dataType : "json",
				 			type : "post",
				 			success : function(data) {
				 				if (data != null) {
				 					//pass arrau of the respone in respone onject of the autocomplete
				 					response(data);
				 				} 
				 			},
				 			error: function(message) {
				 	            // pass an empty array to close the menu if it was initially opened
				 	            response([]);
				 	        }
				 		 });
				    },
				    select: function( event, ui ) {
				    }
				});
				getSpeciesList($('#searchSpecies').val());
				
		});
	
		function getSpeciesList(searchtext){
		
			$('#speciesListTable').addClass('widthTB');
			
			//alert($('#rId').val());
			
			$("ul.ui-autocomplete").css('display','none');
				//addOverLay();
			speciesListTable = $("#speciesListTable").dataTable(
					{
					
						"bLengthChange" : false,
						"bInfo" : false,
						"bFilter" : true,
						"bDestroy" : true,
						"bProcessing" : false,
						"bServerSide" : true,
						"iDisplayLength" : 10,
						"aaSorting": [[ 1, 'ASC' ]], 
						"sPaginationType" : "bootstrap",
						
						"sAjaxSource" : HOST_PATH + "admin/huntingspecies/getspecieslist/sId/"+$('#sId').val()+"/searchtext/"+$('#searchSpecies').val(),
						"aoColumns" : [

							{
								
											"fnRender" : function(obj) {
										     
												return name  = obj.aData.name ;
									
											},
											"bSortable" : false,
											"sType": 'numeric'
											
										},
									/*
										{
											"fnRender" : function(obj){
												
												var spotid = null;
												
												if(obj.aData.Regions != null){
													spotid = obj.aData.spot.title;
													
												}
												
												return spotid
												
											}
										},
									*/
										{
											"fnRender" : function(obj) {
					  
												  var v = "<a href='javascript:void(0);'id='edit' onClick='callToEdit("+ obj.aData. id+");'>Edit</a>"; 
				                                  
												  return  v;

												},
												"bSearchable" : false,
												"bSortable" : false

											}, 
										{
								"fnRender" : function(obj) {

								  var del = "<a href='javascript:void(0);' id='delete' onClick='deleteSpecies(" + obj.aData. id +");' >Delete</a>";
		                             return  del;

								},
								"bSearchable" : false,
								"bSortable" : false

							} 
						
						],	
						"fnInitComplete" : function(obj) {
							$('td.dataTables_empty').html('No record found !');
							$('td.dataTables_empty').unbind('click');
							removeOverLay();
						},
						 "fnDrawCallback": function() {
							
							
							 $("tbody" , this).find('tr').each(function () {
							   
							        $(this).find('td:lt(2)').each(function() {
							        	
							        	
							        });
							       });
							 window.scrollTo(0, 0);
						 },
						 "fnServerData" : function(sSource, aoData, fnCallback) {
								$('#speciesListDiv tr:gt(0)').remove();
								$.ajax({
									"dataType" : 'json',
									"type" : "POST",
									"url" : sSource,
									"data" : aoData,
									"success" : fnCallback
								});
							}
							
						
						
					});
		}
			function callToEdit(id)
			{
			document.location.href =  HOST_PATH+"admin/huntingspecies/editspecies/id/" + id ;
			
			}
			
			
		function deleteSpecies(id) {
			
			bootbox.confirm('Are you sure you want to delete this record?', function(r){
				if(!r){
					return false;
			}
				else{
					deleteSpeciesrecord(id);
				}
			});
		}
		/**
		// * Permanent delete user through Faqcontroller.
		/ * @param id
		//// * @author jsingh
		//// */

		function deleteSpeciesrecord(id) {
			//addOverLay();
			$.ajax({
				url : HOST_PATH + "admin/huntingspecies/deletespecies",
				method : "post",
				data : {
					'id' : id
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					
					if (data == true) {
						
						window.location.href = 	HOST_PATH + "admin/huntingspecies ";
						
					} else {

						bootbox.alert('Problem in your data');
						
					}
					
				}
			});
			
		}

