	var validRules = {

};

var focusRules = {

};
			
			$(document).ready(function(){
				
			validateFormAddNewFaq();
			  $("form").bind("keypress", function(e) {
		          if (e.keyCode == 13) {
		              return false;
		         }
		    });
			  $("form#addRegions").submit(function(){
				  if($("form#addSongs").valid()){
						$('button#saveSongs').attr('disabled' ,"disabled");
						return true;
					}else {
						return false;
					}
			  });
			
			
		});	
			
			
	$('form#searchForm').submit(function() {
		getsongsList();
		return false;
	});
	/**
	 * Autocomplete towards search
	 * @author Er. Jasbir Syal
	 */



		function validateFormAddNewFaq(){
			validateNewWidget  = $("form#addSongs")
			.validate({	
			errorClass : 'error',
			validClass : 'success',
			errorElement : 'span',
			ignore : false,
			errorPlacement : function(error,element) {
					element.parent("div").prev("div").html(error);
						
			},
			rules : {
				SongName : {
					required : true,
					
				},
				ArtistName :{
					required:true,
				},
				Lyrics :{
					required:true,
						
				},
				},
			messages : {
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
	$("input#searchsongs").keypress(function(e)
	{
	   // if the key pressed is the enter key
		if (e.which == 13)
		{
			getSongsList($("input#searchsongs").val());
	    }
	});
		$("input#searchsongs").autocomplete({
		    minLength: 1,
		    source: function( request, response)
		    {
		    	
		    	$("#removemsg").remove();
		    	$.ajax({
		    		url : HOST_PATH + "admin/songs/searchkey/Keyword/" + $('#searchsongs').val(),
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
		
		getSongsList($('#searchsongs').val());
		
});

/**
 * show div according to slected div
 * @param divId
 */
function showDivByHashing(divId) {

	$("#" + divId).removeClass("display-none").siblings().addClass(
			"display-none");
}
/**
 * cod for website multiselect 
 * admin can select website without control
 * 
 */ 
jQuery.fn.multiselect = function() {
	
	$(this).each(function() {
		var checkboxes = $(this).find("input:checkbox");
		checkboxes.each(function() {
			var checkbox = $(this);
			// Highlight pre-selected checkboxes
			if (checkbox.attr("checked"))
				checkbox.parent().addClass("multiselect-on");

			// Highlight checkboxes that the user selects
			checkbox.click(function() {
				if (checkbox.attr("checked"))
					checkbox.parent().addClass("multiselect-on");
				else
					checkbox.parent().removeClass("multiselect-on");
			});
		});
	});
};



/**
 * Convert First character of the user in Capital letter
 * 
 */
function ucfirst(str) {
	var firstLetter = str.substr(0, 1);
	return firstLetter.toUpperCase() + str.substr(1);
}
/**
 * Get user list from database and show in dataTable
 * 
 */
var songsListTable = $('table#songsListTable').dataTable();
//var id;
function getSongsList(searchtext) {

	$("ul.ui-autocomplete").css('display','none');
	$('table#songsListTable').addClass('widthTB');
	
	songsListTable = $("#songsListTable").dataTable({
			"bLengthChange" : false,
			"bInfo" : false,
			"bFilter" : true,
			"bDestroy" : true,
			"bProcessing" : false,
			"bServerSide" : true,
			"iDisplayLength" : 10,
			"aaSorting": [[ 1, 'ASC' ]],
			"sPaginationType" : "bootstrap",
			"sAjaxSource" : HOST_PATH + "admin/Songs/getsongslist/searchtext/"+$("input#searchsongs").val(),
			"aoColumns" : [
					/*{
							"fnRender" : function(obj) {
								
						        //var id = null;
								return id = obj.aData.id;
						
							},
							//"bVisible":    false ,
							"sType": 'numeric'
							
					},*/
					{
						"fnRender" : function(obj) {
							
							var songName  = obj.aData.songName ;
							if(songName.length>30){
								songName = songName.substring(0,30) + "...";
							}
							
							return songName;
						},
						
						"bSortable" : false,
						"sType": 'numeric'
						
					},
					
					{
						"fnRender" : function(obj) {
							var artistName  = obj.aData.artistName ;
							if(artistName.length>30){
								artistName = artistName.substring(0,30) + "...";
							}
								
							return artistName;

						},
						
						
						"bSortable" : false,
					}, 
					{
						"fnRender" : function(obj) {
								var lyrics =  obj.aData.lyrics;
							if(lyrics != null){
								lyrics = obj.aData.lyrics.substring(0,30);
							}
														
							return lyrics;

						},
						
						"bSortable" : false,
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

							  var del = "<a href='javascript:void(0);' id='delete' onClick='deletesongs(" + obj.aData. id +");' >Delete</a>";
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
						$('#sellerticketsListDiv tr:gt(0)').remove();
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




//Edit funtion

function callToEdit(id)
	{
	document.location.href =  HOST_PATH+"admin/songs/editsongs/id/" + id ;
	
	}

function deletesongs(id) {
	
	bootbox.confirm('Are you sure you want to delete this record?', function(r){
		if(!r){
			return false;
		}
		else{
			deletesongsrecord(id);
		}
	});
}
/**
 * Permanent delete user through usercontroller.
 * @param id
 * @author jsingh
 */
function deletesongsrecord(id) {
	addOverLay();
	$.ajax({
		url : HOST_PATH + "admin/songs/deletesongs",
		method : "post",
		data : {
			'id' : id
		},
		dataType : "json",
		type : "post",
		success : function(data) {
			if (data != null) {
				window.location.href = 	HOST_PATH + "admin/songs/";
				//alert('Record has been deleted');

			} else {

				bootbox.alert('Problem in your data');
			}
			//getUserListFromTrash();
		}
	});
	
}


