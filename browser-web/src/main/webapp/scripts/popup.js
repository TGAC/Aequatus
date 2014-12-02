/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 28/11/14
 * Time: 15:13
 * To change this template use File | Settings | File Templates.
 */


var mouseX, mouseY;
function newpopup(d) {
    console.log("newpopup")
//    removePopup()

    jQuery('#popup').html("<a href='http://www.ensembl.org/Multi/Search/Results?q=" + d.stable_id + "'>Link to Ensembl</a>, <button onclick=' changeReference(" + d.member_id + ") '>Make Me Root</button> <br> "+ d.desc)




// decide side of popup left / right

    console.log(mouseX)
    if (mouseX + jQuery("#popup").width() > jQuery("#main1").width()) {
        jQuery("#popup").css({"left": mouseX - jQuery("#popup").width() - 5});
        jQuery("#popup").css({"top": (mouseY - jQuery("#popup").height() - 46)});
        jQuery("#popup").attr('class', 'bubbleright')
    }
    else {
        jQuery("#popup").css({"left": (mouseX - 26)});
        jQuery("#popup").css({"top": (mouseY - jQuery("#popup").height() - 46)});
        jQuery("#popup").attr('class', 'bubbleleft')
    }

    jQuery("#popup").fadeIn();
}