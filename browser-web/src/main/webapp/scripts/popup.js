/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 28/11/14
 * Time: 15:13
 * To change this template use File | Settings | File Templates.
 */

var mouseX, mouseY;

function newpopup(desc,stable_id,member_id) {
    Fluxion.doAjax(
        'comparaService',
        'getInfoForCoreMember',
        {'query': member_id, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                jQuery('#makemetop_button').html("<button onclick=' changeReference(\"" + stable_id + "\") '>Make Me Root</button>")

                jQuery('#ref_name').html("Chr "+json.info.name)

                jQuery('#position').html(json.info.dnafrag_start+" - "+json.info.dnafrag_end)

                jQuery('#disp_label').html(json.info.display_label)

                jQuery('#gene_desc').html(stringTrim(desc, 200))

                jQuery('#ensemblLink').html("<button><a href='http://www.ensembl.org/Multi/Search/Results?q=" + stable_id + "'>Link to Ensembl</a></button>")
            }
        });



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