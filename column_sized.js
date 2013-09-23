//script to make all columns with class column_sized the same height
// two parameters 
//      -> 'column' = the selector of the columns to be changed
//      -> 'buffer' = a buffer to add on to the height (for example if you have a button aligned at the bottom of the column)

var $ = jQuery.noConflict();

//check if string is blank
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function column_sized(opts) {
	var the_height = 0;
	var column;
	//if no parameter is passed
	if(opts["column"] == null || isBlank(opts["column"])){
		column = ".column_sized";
	}
	
	if(opts["column"]){
		column = opts["column"];
	}
	$(column).each(function(){
		
		var compare_height = 0;
		
		//get outerHeight,including margins, of first level children of column
		$.each($(this).children(),function(){
		
			//if elements height is 0 (perhaps due to not being a block element, ex. <a> with image inside it)
			if($(this).height() == 0){
				$.each($(this).children(),function(){
					compare_height += $(this).outerHeight(true);
				});
			}
			else {
				compare_height += $(this).outerHeight(true);
			}
		});
		
		//get height of all children and compare to previous height 
		if(compare_height > the_height)
			the_height = compare_height;
	});
	
	//if buffer is set
	if(opts["buffer"]){
		the_height += opts["buffer"];
	}
	
	$(column).height(the_height);
}


$(window).load(function(){

	if($(window).width() > 481) {
		column_sized({"column":"","buffer":50});
	}
	
});

$(window).resize(function(){
	if($(window).width() > 481) {
		column_sized({"column":"","buffer":50});
	}
});