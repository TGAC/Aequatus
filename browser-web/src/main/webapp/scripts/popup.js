/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 28/11/14
 * Time: 15:13
 * To change this template use File | Settings | File Templates.
 */

var mouseX, mouseY;

function newpopup(member_id, protein_id) {

    var gene;
    var stable_id;

    jQuery('#stable_label').html("")


    jQuery('#makemetop_button').html("")

    jQuery('#ref_name').html("")

    jQuery('#position').html("")

    jQuery('#disp_label').html("")

    jQuery('#gene_desc').html("")

    jQuery('#ensemblLink').html("")

    jQuery('#ensemblLink').html("<a href='http://www.ensembl.org/id/" + stable_id + "'>Link to Ensembl</a>")

    if (mouseX + jQuery("#popup").width() > jQuery("#main1").width()) {
        jQuery("#popup").css({"left": mouseX - jQuery("#popup").width() - 5});
        jQuery("#popup").css({"top": (mouseY - jQuery("#popup").height() - 30)});
        jQuery("#popup").attr('class', 'bubbleright')
    }
    else {
        jQuery("#popup").css({"left": (mouseX - 26)});
        jQuery("#popup").css({"top": (mouseY - jQuery("#popup").height() - 30)});
        jQuery("#popup").attr('class', 'bubbleleft')
    }

    jQuery("#popup").fadeIn();


    if (syntenic_data.member[member_id]) {
        gene = syntenic_data.member[member_id];
        stable_id = syntenic_data.member[member_id].id
    } else {
        return;
    }
    var desc = gene.desc

    Fluxion.doAjax(
        'comparaService',
        'getInfoForCoreMember',
        {'query': member_id, 'protein_id':protein_id, 'ref':syntenic_data.protein_id, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                if (json.info.display_label) {
                    jQuery('#stable_label').html(json.info.display_label)
                } else {
                    jQuery('#stable_label').html(stable_id)
                }

                if(protein_id != syntenic_data.protein_id){
                    jQuery('#makemetop_button').html("<button onclick='makeMeTop(\"" + member_id + "\",\""+protein_id+"\")' class='btn btn-default' type='button'> <i class='fa fa-random fa-1x'></i></button>");
                }else{
                    jQuery('#makemetop_button').html("<button disabled class='btn btn-default' type='button'> <i class='fa fa-random fa-1x'></i></button>");
                }

                jQuery('#ref_name').html("Chr " + json.info.name)

                jQuery('#position').html(json.info.dnafrag_start + " - " + json.info.dnafrag_end)

                jQuery('#gene_desc').html(stringTrim(desc, 200))

                jQuery('#ensemblLink').html("<a target='_blank' href='http://www.ensembl.org/id/" + stable_id + "'><button type='button' class='btn btn-default'> <i class='fa fa-1x'><b><i>e!</i></b></button></a>")

                jQuery('#exportAlignmentLink').html("<button type='button' class='btn btn-default' onclick='exportAlignment(\""+protein_id+"\")'> <i class='fa fa-1x'>Aln</i></button>")

                jQuery('#exportSequenceLink').html("<button type='button' class='btn btn-default' onclick='exportSequence(\""+protein_id+"\")'> <i class='fa fa-1x'>Seq</i></button>")

                if(json.orthology == true && protein_id != syntenic_data.protein_id){
                    jQuery('#1to1Link').html("<button type='button' class='btn btn-default' onclick='getAlignment(\"" + protein_id + "\",\""+syntenic_data.protein_id+"\")'> <i class='fa fa-1x'>1:1</i></button>")
                }else{
                    jQuery('#1to1Link').html("<button type='button' disabled class='btn btn-default'> <i class='fa fa-1x'>1;1</i></button>")
                }


            }
        });


}

function removePopup() {
    jQuery("#popup").fadeOut()
}

function removeInfoPopup(){
    jQuery("#info_popup_wrapper").fadeOut()
}

var sequence_list = {}
var cigar_json = {}
var align_list = {}

function separateSeq(json){

    sequence_list = {}
    cigar_json = {}
    align_list = {}

    console.log("separateSeq")

    for (var id in json){
        sequence_list[json[id].protein_id] = json[id].sequence;
        cigar_json[json[id].protein_id] = json[id].alignment;

    }

    joinAlignment()
    printAlignment()

}

function printAlignment(){
    console.log("printAlignment")

    var first = ""
    for (var id in align_list){
        first = id;
        break;
    }

    var formatted_seq = "<table>"

    for(var i=0; i<align_list[first].length; i++)
    {
        for (var id in align_list) {
            formatted_seq += "<tr><td>"+id+"<td>"+align_list[id][i]+"</tr>"
        }
        formatted_seq += "<tr><td colspan=2>&nbsp;</td>"
    }

    jQuery("#pairwise_alignment").html(formatted_seq)


}

function joinAlignment(){
    console.log("joinAlignment")

    for (var id in cigar_json) {
        var cigar_string = expandCigar(cigar_json[id])
        var j=0;
        var seq = []
        var line = 0;
        seq[line] = "";
        var count=1;

        for (var i=0; i<cigar_string.length; i++)
        {
            if(cigar_string.charAt(i) == 'M')
            {
                seq[line] += sequence_list[id].charAt(j)
                j++;
            }
            else if(cigar_string.charAt(i) == 'D')
            {
                seq[line] += "-"
            }

            if(count == 70)
            {
                line++;
                seq[line] = "";
                count = 0;
            }
            count++;

        }
        align_list[id] = seq
    }
}