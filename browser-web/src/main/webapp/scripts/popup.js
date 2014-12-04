/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 28/11/14
 * Time: 15:13
 * To change this template use File | Settings | File Templates.
 */

var mouseX, mouseY;

function newpopup(desc,stable_id,member_id) {
    jQuery('#makemetop_button').html("<button onclick=' changeReference(\"" + stable_id + "\") '>Make Me Root</button>")

    jQuery('#gene_desc').html(desc)

    jQuery('#ensemblLink').html("<a href='http://www.ensembl.org/Multi/Search/Results?q=" + stable_id + "'>Link to Ensembl</a>")

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

function removePopup(){
    jQuery("#popup").fadeOut()
}