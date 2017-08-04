/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 04/08/2017
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
function search_from_orthologues_box(){
    if (parseInt(jQuery("#control_panel").css("left")) < 0) {
        openPanel('#search_div')
    }
    jQuery("#search_history").html(jQuery("#control_search").val());
    jQuery("#control_search").val(jQuery('#search').val());
    search_orthologues(jQuery('#search').val());
}

function search_orthologues(query) {
    //window.history.pushState("search=" + query, "Title", "index.jsp?search=" + query);

    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';

    jQuery('#canvas').hide();
    jQuery("#search_result").html("");

    jQuery("#searchresultHead").html("<br> <span style='color: grey; font-size: large;'>Searching...<span> " +
        "<br><br>" +
        "<img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'>");
    var reference = jQuery('#genomes').val();
    jQuery("#search_result").fadeIn();
    jQuery("#search_result").html("<br> <span style='color: grey; font-size: large;'>Searching...<span> " +
        "<br><br>" +
        "<img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'>");

    URLSearch(query)

    Fluxion.doAjax(
        'comparaService',
        'searchMember',
        {'query': query, 'reference': reference, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                list_orthologues(json)

            }
        });
}


function list_orthologues(json){
    var content = "";

    if(json.html.length > 0){
        for (var i = 0; i < json.html.length; i++) {
            if (i == 0) {
                content += "<p id='search_hit' style='background: white;'>";
            }
            var description = json.html[i].description

            if(description == null){
                description = ""
            }
            content += "<div class='search_div' " +
                "onclick='openClosePanel(); " +
                "jQuery(\"#canvas\").show(); " +
                "getOrthologyForMember(" + json.html[i].gene_member_id + ",\"true\");'> " +
                "<div class='search_header'> "+ json.html[i].stable_id + " " +
                "</div> " +
                "<div class='search_info'> " + json.html[i].genome + " : " + json.html[i].coord_system_name + " "+ json.html[i].name +
                " <br> " +
                description   + "</div>" +
                "</div>";

            if (i == json.html.length - 1) {
                content += "</p>";
                jQuery("#search_result").html(content);
                jQuery("#search_result").fadeIn();
                jQuery("#search_hit").tablesorter();
            }

        }
    }
    else{
        jQuery("#search_result").html("<div style='width: 100%; text-align: center; padding-top: 15px; font-size: 15px;'>No Result found</div>");

    }
}


function getOrthologyForMember(query) {

    jQuery("#orthologies").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")

    Fluxion.doAjax(
        'comparaService',
        'getOrthologyForMember',
        {'query': query, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                syntenic_data = json
                //init(json, "#settings_div", "#filter", "#sliderfilter")
                //URLMemberID(json.ref)
                drawOrthology(json)
            }
        });
}

function drawOrthology(json){
    console.log(" drawOrthology ")
    console.log(json)
    var orthology_table_content = "<h3>Confidently predicted Orthology for "+json.ref+"</h3>" +
        "<table id='orthologyTable' class='table table-condensed' width='100%'>" +
        "<thead>" +
        "<tr>" +
        "<th>Homology ID</th>" +
        "<th>Seq Member</th>" +
        "<th>cigar_line</th>" +
        "<th>Tree Compliant</th>" +
        "<th>method_link_species_set_id</th>" +
        "<th>description</th>" +
        "</tr>" +
        "</thead>";
    console.log(" drawOrthology 1")
    var ortho = json.orthology;

    orthology_table_content += "<tfoot>" +
        "<tr>" +
        "<th>Homology ID</th>" +
        "<th>Seq Member</th>" +
        "<th>cigar_line</th>" +
        "<th>Tree Compliant</th>" +
        "<th>method_link_species_set_id</th>" +
        "<th>description</th>" +
        "</tr>" +
        "</tfoot>" +
        "<tbody";

    console.log(" drawOrthology 2")
    var json_key =  Object.keys(ortho);
    for (var i = 0; i < json_key.length; i++) {
        orthology_table_content += "<tr>" +
            "<td>" + json_key[i] + "</td>" +
            "<td>" + ortho[json_key[i]].seq_member_id+ "</td>" +
            "<td>" + ortho[json_key[i]].cigar_line + "</td>" +
            "<td>" + ortho[json_key[i]].is_tree_compliant + "</td>" +
            "<td>" + ortho[json_key[i]].method_link_species_set_id + "</td>" +
            "<td>" + ortho[json_key[i]].description + "</td>" +
            "</tr>";
    }
    console.log(" drawOrthology 3")

    orthology_table_content += "</tbody></table>"
    console.log(" drawOrthology 4")

    jQuery("#orthologies").html(orthology_table_content)

    console.log(" drawOrthology 5")
    jQuery('#orthologyTable').DataTable();
}
