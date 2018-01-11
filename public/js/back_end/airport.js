$(document).ready(function() {
	//cat to load category list 
	airportList();
	$('#searchButton').click(searchByPage);
	
	
	$('form#searchform').submit(function() {
		return false;
	});
	//bind with keypress of search box
	//bind with keypress of search box
	$("input#searchAirport").keypress(function(e)
		{
			// if the key pressed is the enter key
			  if (e.which == 13)
			  {
				 var type =  $('#pagetype').val()=='' ? undefined : $('#pagetype').val();
				  airportList($(this).val(),0,1,'asc' ,type);
			  }
	});
	//Auto complete for search category text box
$("#searchAirport").autocomplete({
        minLength: 1,
        source: function( request, response){
        	
        	$.ajax({
        		url : HOST_PATH + "admin/airport/searchkey/keyword/" + $('#searchAirport').val(),
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
        select: function( event, ui ) {}
    }); 
	$(window).bind( 'hashchange', function(e) {
		if(hashValue != location.hash && click == false){
			airportListTbl.fnCustomRedraw();
		}
	}); 
 
});

/**
 * function used for delete category from list
 * and from database
 * @param id
 * @author blal
 */
function moveToTrash(id){
	bootbox.confirm(__("Are you sure you want to move this airport to trash?"),__('No'),__('Yes'),function(r){
		if(!r){
			return false;
		}
		else{
			deleteRecord(id);
		}
		
	});
 }
/**
 * function use for deleted category from list
 * and from database
 * @param id
 * @author pkaur4
 */
function deleteRecord(id) {
	
	addOverLay();
	$.ajax({
		url : HOST_PATH + "admin/page/deleteprodct",
		method : "post",
		data : {
			'id' : id
		},
		dataType : "json",
		type : "post",
		success : function(data) {
			
			if (data != null) {
				
				window.location.href = "page";
				
			} else {
				
				window.location.href = "page";
			}
		}
	});	
}
var airportListTbl = $('#airportListTbl').dataTable();
var hashValue = "";
var click = false;
/**
 * function used to get category list from database
 * @author blal
 */
function airportList() {
	//addOverLay();
	$("ul.ui-autocomplete").css('display','none');
	$("ul.ui-autocomplete").html('');
	$('#airportList').addClass('widthTB');
	$('#airportList').removeClass('display-none');

	categoryListTbl = $("table#airportListTbl")
			.dataTable(
					{
						"bLengthChange" : false,
						"bInfo" : false,
						"bFilter" : true,
						"bDestroy" : true,
						"bProcessing" : false,
						"bServerSide" : true,
						"iDisplayLength" : 10,
						"aaSorting": [[ 0, 'desc' ]], 
						"sPaginationType" : "bootstrap",
						"sAjaxSource" : HOST_PATH+"admin/airport/getairportlist/searchText/"+ $('#searchAirport').val(),
						"aoColumns" : [
					{
					"fnRender" : function(obj) {
						return obj.aData.code;
						 },
						"bSearchable" : true,
						"bSortable" : true
					},
					{
					"fnRender" : function(obj) {
						return obj.aData.name;
						 },
						"bSearchable" : true,
						"bSortable" : true
					},
					{
					"fnRender" : function(obj) {
						return obj.aData.cityName;
						 },
						"bSearchable" : true,
						"bSortable" : true
					},
					{
					"fnRender" : function(obj) {
						return obj.aData.countryName;
						 },
						"bSearchable" : true,
						"bSortable" : true
					},
					{
					"fnRender" : function(obj) {
						
						var html = "<a href='javascript:void(0);' onclick='deleterecd("+obj.aData.code+");' id='Delete'>Delete</a>";
						return html;
						
					},
					"bSearchable" : false,
					"bSortable" : false

					}
				 ],
					"fnInitComplete" : function(obj) {
							removeOverLay();
							$('td.dataTables_empty').html('No record found !');
							$('td.dataTables_empty').unbind('click');
							 removeOverLay();
					},
					"fnDrawCallback" : function(obj) {
						 $('div#airportListTbl_filter').hide();
						$("#airportListTbl").find('tr').each(function () {
							var $tr = $(this);
							$tr.find('td:lt(1)').each(function() {
							//$(this).bind('click',callToEdit);
							//$(this).css( 'cursor', 'pointer' );
													        	
						});
						});
						window.scrollTo(0, 0);

						},						
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$('#airportListTbl tr:gt(0)').remove();
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




/**
 * Fetch editable record information and file in form
 * @author Er.kundal
 */
function callToEdit(id){
	//get id from editable row
	// var id =  $(this).children('p.colorAsLink').attr('editId');
	window.location  =    HOST_PATH + 'admin/page/editpage/id/' +  id;


}

/**
 * change status of categories
 * @author blal
 */
function changeStatus(id,obj,status){
	 
	     addOverLay();
		 $(obj).addClass("btn-primary").siblings().removeClass("btn-primary");
		 $.ajax({
				type : "POST",
				url : HOST_PATH+"admin/category/categorystatus",
				data : "id="+id+"&status="+status
			}).done(function(msg) {
				removeOverLay();	
		}); 
	 
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

function deletewordsrecord(id) {
			//addOverLay();
			$.ajax({
				url : HOST_PATH + "admin/airport/deleteprodct",
				method : "post",
				data : {
					'id' : id
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					
					if (data == true) {
						
						window.location.href = 	HOST_PATH + "admin/airport ";
						
					} else {

						bootbox.alert('Problem in your data');
						
					}
				}
			});
			
		}		

/**
 * used to remove highlighted bordes
 * @param el  current element
 * @author blal
 */
function resetBorders(el)
{
	$(el).each(function(i,o){
	 $(o).parent('div')
		.removeClass("error success")
		.prev("div").removeClass('focus error success') ;
	
	});
}

function searchByPage()
{
	var type = $("#pagetype").val() ;
	if(type=='' || type==null)
	{
		type = undefined;
	}
	

	
	var searchArt = $("#SearchPage").val();
	if(searchArt=='' || searchArt==null)
	{
		searchArt = undefined;
	}
	airportList(searchArt,0,0,'asc',type);
}