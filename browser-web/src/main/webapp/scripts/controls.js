/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 13/11/14
 * Time: 13:48
 * To change this template use File | Settings | File Templates.
 */
function openPanel(div_id){
        jQuery("#control_panel").animate({left: 0});

    toogleControlDivs(div_id)
}

function toogleControlDivs(div_id){
    jQuery("#control_divs").children().hide();
    jQuery(div_id).show()
}


function openClosePanel(){
    if(jQuery("#control_panel").position().left < 0){
        jQuery("#control_panel").animate({left: 0});
    }
    else{
        jQuery("#control_panel").animate({left: -300});
    }
}