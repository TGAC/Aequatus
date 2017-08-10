/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 04/08/2017
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
function search_from_orthologues_box() {
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


function list_orthologues(json) {
    var content = "";

    if (json.html.length > 0) {
        for (var i = 0; i < json.html.length; i++) {
            if (i == 0) {
                content += "<p id='search_hit' style='background: white;'>";
            }
            var description = json.html[i].description

            if (description == null) {
                description = ""
            }
            content += "<div class='search_div' " +
                "onclick='openClosePanel(); " +
                "jQuery(\"#canvas\").show(); " +
                "getOrthologyForMember(" + json.html[i].gene_member_id + ",\"true\");'> " +
                "<div class='search_header'> " + json.html[i].stable_id + " " +
                "</div> " +
                "<div class='search_info'> " + json.html[i].genome + " : " + json.html[i].coord_system_name + " " + json.html[i].name +
                " <br> " +
                description + "</div>" +
                "</div>";

            if (i == json.html.length - 1) {
                content += "</p>";
                jQuery("#search_result").html(content);
                jQuery("#search_result").fadeIn();
                jQuery("#search_hit").tablesorter();
            }

        }
    }
    else {
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
                drawOrthology(json)
            }
        });
}

function drawOrthology(json) {
    var orthology_table_content = "<table><tr><td><h3>Confidently predicted Orthology for " + json.ref.display_label + "</h3></td><td valign=middle> (Gene: "+json.ref.stable_id+ ")</td></tr></table> <br>" +
        "<table id='orthologyTable' class='table' width='100%'>" +
        "<thead>" +
        "<tr>" +
        "<th>Detail</th>" +
        "<th>Homology ID</th>" +
        "<th>Gene ID</th>" +
        "<th>Protein ID</th>" +
        "<th>Species</th>" +
        "<th>dn/ds</th>" +
        "<th>Description</th>" +
        "<th>Percentage Coverage</th>" +
        "<th>Percentage Pos</th>" +
        "<th>Percentage Identity</th>" +
        "<th>Tree Compliant</th>" +
        "<th>source Gene</th>" +
        "<th>source Protein</th>" +
        "<th>source Species</th>" +
        "<th>source cigar_line</th>" +
        "<th>source Percentage Coverage</th>" +
        "<th>source Percentage Positivity</th>" +
        "<th>source Percentage Identity</th>" +
        "<th>target cigar_line</th>" +
        "</tr>" +
        "</thead>";
    var ortho = json.orthology;

    orthology_table_content += "<tfoot>" +
        "<tr>" +
        "<th>Detail</th>" +
        "<th>Homology ID</th>" +
        "<th>Gene ID</th>" +
        "<th>Protein ID</th>" +
        "<th>Species</th>" +
        "<th>dn/ds</th>" +
        "<th>Description</th>" +
        "<th>Percentage Coverage</th>" +
        "<th>Percentage Pos</th>" +
        "<th>Percentage Identity</th>" +
        "<th>Tree Compliant</th>" +
        "<th>source Gene</th>" +
        "<th>source Protein</th>" +
        "<th>source Species</th>" +
        "<th>source cigar_line</th>" +
        "<th>source Percentage Coverage</th>" +
        "<th>source Percentage Positivity</th>" +
        "<th>source Percentage Identity</th>" +
        "<th>target cigar_line</th>" +
        "</tr>" +
        "</tfoot>" +
        "<tbody";

    var json_key = Object.keys(ortho);
    for (var i = 0; i < json_key.length; i++) {
        orthology_table_content += "<tr> <td class='details-control'></td>" +
            "<td>" + json_key[i] + "</td>" +
            "<td>" + ortho[json_key[i]].target.id + "</td>" +
            "<td>" + ortho[json_key[i]].target.protein_id + "</td>" +
            "<td>" + ortho[json_key[i]].target.species + "</td>" +
            "<td>" + ortho[json_key[i]].dn_ds + "</td>" +
            "<td>" + ortho[json_key[i]].type + "</td>" +
            "<td>" + ortho[json_key[i]].target.perc_cov + "</td>" +
            "<td>" + ortho[json_key[i]].target.perc_pos + "</td>" +
            "<td>" + ortho[json_key[i]].target.perc_id + "</td>" +
            "<td>" + ortho[json_key[i]].tree + "</td>" +
            "<td>" + ortho[json_key[i]].source.id + "</td>" +
            "<td>" + ortho[json_key[i]].source.protein_id + "</td>" +
            "<td>" + ortho[json_key[i]].source.species + "</td>" +
            "<td>" + ortho[json_key[i]].source.cigar_line + "</td>" +
            "<td>" + ortho[json_key[i]].source.perc_cov + "</td>" +
            "<td>" + ortho[json_key[i]].source.perc_pos + "</td>" +
            "<td>" + ortho[json_key[i]].source.perc_id + "</td>" +
            "<td>" + ortho[json_key[i]].target.cigar_line + "</td>" +
            "</tr>";
    }

    orthology_table_content += "</tbody></table>"

    jQuery("#orthologies").html(orthology_table_content)


    var columnArray = [{
        "targets": [1],
        "visible": false,
        "searchable": false
    }];

    for (var i = 11; i <= 18; ++i) {
        columnArray.push({
            "targets": [i],
            "visible": false,
            "searchable": false
        });
    }

    jQuery('#orthologyTable').DataTable({
        "columnDefs": columnArray
    })

    jQuery('#orthologyTable tbody').on('click', 'td.details-control', function () {
        var table = jQuery('#orthologyTable').DataTable();
        var tr = jQuery(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
}

function format(d) {
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Description</td>' +
        '<td>Source</td>' +
        '<td>Target</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Gene ID</td>' +
        '<td>' + d[11] + '</td>' +
        '<td>' + d[2] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Protein ID</td>' +
        '<td>' + d[12] + '</td>' +
        '<td>' + d[3] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Species</td>' +
        '<td>' + d[13] + '</td>' +
        '<td>' + d[4] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>CIGAR</td>' +
        '<td>' + d[14] + '</td>' +
        '<td>' + d[18] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Percentage Coverage</td>' +
        '<td>' + d[15] + '</td>' +
        '<td>' + d[7] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Percentage Positivity</td>' +
        '<td>' + d[16] + '</td>' +
        '<td>' + d[8] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Percentage Identity</td>' +
        '<td>' + d[17] + '</td>' +
        '<td>' + d[9] + '</td>' +
        '</tr>' +
        '</table>';
}
