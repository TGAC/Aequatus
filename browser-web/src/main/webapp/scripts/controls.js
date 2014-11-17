/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 13/11/14
 * Time: 13:48
 * To change this template use File | Settings | File Templates.
 */

var last_opened = null;
function openPanel(div_id) {
    console.log(div_id + " "+ last_opened)
    if(div_id == last_opened){
        openClosePanel();
        last_opened = null;
    } else{
        jQuery("#control_panel").animate({left: 0});
        toogleControlDivs(div_id)
        if (div_id.indexOf("search_div") >= 0) {
            console.log("auto")
            jQuery("#search_result").css('width','')

        }
        last_opened = div_id
    }

}

function toogleControlDivs(div_id) {
    jQuery("#control_divs").children().hide();
    jQuery(div_id).show()
}


function openClosePanel() {
    console.log(last_opened)

    if (jQuery("#control_panel").position().left < 0) {
        jQuery("#control_panel").animate({left: 0});
        jQuery("#search_result").css('width','')

    }
    else {
        jQuery("#control_panel").animate({left: -300});
        jQuery("#search_result").animate({width: 0});
//        jQuery("#search_result").css('width','')


    }
}