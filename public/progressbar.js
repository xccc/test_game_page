function release(runTime) {
	
                var $pG = $('#progressbar').progressbar();
                var pGress = setInterval(function() {
                    var pVal = $pG.progressbar('option', 'value');
                    var pCnt = !isNaN(pVal) ? (pVal + 1) : 1;
                    if (pCnt > 100) {
                        clearInterval(pGress);
                    } else {
                        $pG.progressbar({
                            value : pCnt
                        });
                       if(pCnt == 99) {
						  
						  $('#show-files').html('');
						    $pG.hide();
						    button_action('false');
					   }
                       
                    }
                }, runTime);
               
            }
            
            
function button_action(action_value) {

for(var x in $('input')) {
		 // get elements with number, these are the ones with classNames
		if(x.match(/[0-9]/)) {
				// show all classes
	
		
		if(action_value == 'disable') {
			$('input').attr("DISABLED","DISABLED");
				
		} else {
			$('input').removeAttr("DISABLED");
		}
				
		}
				
	}	
	
}
