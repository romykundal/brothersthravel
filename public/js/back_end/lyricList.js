
var wordsListTable = $('#wordsListTable').dataTable();


	
	var validRules = {

		Title : "Look Great",
		Description : "Look Great"
};
/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * structure to define a message for element key is to be element name Value is
 * message
 */
var focusRules = {

		Title : "Enter your Title Name",
		Description : "Fill Description "

};
			
		$(document).ready(function(){
				
			validateFormAddNewWords();
			  $("form").bind("keypress", function(e) {
		          if (e.keyCode == 13) {
		              return false;
		         }
		    });
			  $("form#addWords").submit(function(){
				  if($("form#addWords").valid()){
						$('button#saveWords').attr('disabled' ,"disabled");
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
			
		function validateFormAddNewWords(){
			
			validateNewWidget  = $("form#addWords")
			.validate({	
			errorClass : 'error',
			validClass : 'success',
			errorElement : 'span',
			ignore : false,
			errorPlacement : function(error,element) {
					element.parent("div").prev("div").html(error);
						
			},
			rules : {
					Title : {
						required : true,
						//regex : /\s/g,
						regex : /^[A-Za-z ]\w+$/,
						remote : {
							
							url : HOST_PATH + "admin/unsafewords/checkbadword",
							type : "post",
							beforeSend : function(xhr) {
								
								$('span[for=Title]')
										.html(
												'Validating...')
										.addClass(
												'validating')
										.parent('div')
										.addClass(
												'focus')
										.next('div')
										.addClass(
												'focus');
								;

							},

							complete : function(data) {
								$('span[for=Title]')
										.removeClass(
												'validating');
								if (data.responseText == 'true') {
									$('span[for=Title]')
											.html(
													'Valid Bad Word')
											.parent(
													'div')
											.removeClass(
													'error')
											.addClass(
													'success')
											.prev("div")
											.removeClass(
													'error')
											.addClass(
													'success');
								} else {
			                       
									$('span[for=Title]')
										.html('Already used')
											.parent(
													'div')
											.removeClass(
													'success')
											.addClass(
													'error')
											.prev("div")
											.removeClass(
													'success')
											.addClass(
													'error');
								}

							}
						}
						
					},
					
				},
			messages : {
					Title : {
						required : "Please Enter Title",
						regex : "Space and one character not allowed"
						
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
			
			$(element)
				.parent('div')
				.removeClass(validClass)
				.addClass(errorClass)
				.prev("div")
					.removeClass(validClass)
					.addClass(errorClass);
			
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
			$("input#searchWords").keypress(function(e)
			{
			   // if the key pressed is the enter key
				if (e.which == 13)
				{
					getwordsList($("input#searchWords").val()) ;
			    }
			});
				$("input#searchWords").autocomplete({
				    minLength: 1,
				    source: function( request, response)
				    {
				    	
				    	$("#removemsg").remove();
				    	$.ajax({
				    		url : HOST_PATH + "admin/unsafewords/searchkey/Keyword/" + $('#searchWords').val(),
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
				getwordsList($('#searchWords').val());
				$('div#wordsListTable_filter').hide();
				
		});
		

		function getwordsList(searchtext){
			//addOverLay();
			
			$('#wordsListTable').addClass('widthTB');
			$("ul.ui-autocomplete").css('display','none');
				
			wordsListTable = $("#wordsListTable").dataTable(
					
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
						"sAjaxSource" : HOST_PATH + "admin/unsafewords/getwordslist/searchtext/"+$('#searchWords').val(),
						"aoColumns" : [

							{
								
											"fnRender" : function(obj) {
										       //  var title =null;
												return title  = obj.aData.title ;
									
											},
											"bSortable" : false,
											"sType": 'numeric'
											
										},
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

								  var del = "<a href='javascript:void(0);' id='delete' onClick='deleterecd(" + obj.aData. id +");' >Delete</a>";
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
								$('#regionsListDiv tr:gt(0)').remove();
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
		
		function callToView(id)
		{
			 
			document.location.href =  HOST_PATH+"admin/spot/index/rId/"+id;
			
		}
		
		//Edit funtion
	
		function callToEdit(id)
			{
			document.location.href =  HOST_PATH+"admin/unsafewords/editword/id/" + id ;
			
			}
			
			
		function deleterecd(id) {
			
			bootbox.confirm('Are you sure you want to delete this record?', function(r){
				if(!r){
					return false;
			}
				else{
					deletewordsrecord(id);
				}
			});
		}
		/**
		// * Permanent delete user through Faqcontroller.
		/ * @param id
		//// * @author jsingh
		//// */

		function deletewordsrecord(id) {
			//addOverLay();
			$.ajax({
				url : HOST_PATH + "admin/unsafewords/deleteunsafewords",
				method : "post",
				data : {
					'id' : id
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					
					if (data == true) {
						
						window.location.href = 	HOST_PATH + "admin/unsafewords ";
						
					} else {

						bootbox.alert('Problem in your data');
						
					}
				}
			});
			
		}

