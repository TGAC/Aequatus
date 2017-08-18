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
                setSelector(json.ref, json.ref.canonical_member_id)
                drawOrthology(json)
            }
        });
}

function drawOrthology(json) {
    var orthology_table_content = "<table><tr><td><h3>Confidently predicted Orthology for " + json.ref.display_label + "</h3></td><td valign=middle> (Gene: " + json.ref.stable_id + ")</td></tr></table> <br>" +
        "<table id='orthologyTable' class='table' width='100%'>" +
        "<thead>" +
        "<tr>" +
        "<th>Detail</th>" +
        "<th>Pairwise</th>" +
        "<th>Homology ID</th>" +
        "<th>Gene ID</th>" +
        "<th>Protein ID</th>" +
        "<th>Species</th>" +
        "<th>dn/ds</th>" +
        "<th>Description</th>" +
        "<th>Coverage (%)</th>" +
        "<th>Similarity (%)</th>" +
        "<th>Identity (%)</th>" +
        "<th>GeneTree</th>" +
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
        "<th>Pairwise</th>" +
        "<th>Homology ID</th>" +
        "<th>Gene ID</th>" +
        "<th>Protein ID</th>" +
        "<th>Species</th>" +
        "<th>dn/ds</th>" +
        "<th>Description</th>" +
        "<th>Coverage (%)</th>" +
        "<th>Similarity  (%)</th>" +
        "<th>Identity (%)</th>" +
        "<th>GeneTree</th>" +
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
        var tree = ortho[json_key[i]].tree ? "<i class='fa fa-check-circle-o' style='color:#35b008; font-size: 1.5em;' aria-hidden='true'></i>" : "";
        orthology_table_content += "<tr> " +
            "<td class='details-control detail-info details_hidden'></td>" +
            "<td class='details-control pairwise-align details_hidden'></td>" +
            "<td>" + json_key[i] + "</td>" +
            "<td>" + ortho[json_key[i]].target.id + "</td>" +
            "<td>" + ortho[json_key[i]].target.protein_id + "</td>" +
            "<td>" + ortho[json_key[i]].target.species + "</td>" +
            "<td>" + ortho[json_key[i]].dn_ds + "</td>" +
            "<td>" + ortho[json_key[i]].type + "</td>" +
            "<td align='center'>" + ortho[json_key[i]].target.perc_cov + "</td>" +
            "<td align='center'>" + ortho[json_key[i]].target.perc_pos + "</td>" +
            "<td align='center'>" + ortho[json_key[i]].target.perc_id + "</td>" +
            "<td align='center'>" + tree + "</td>" +
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
        "targets": [2],
        "visible": false,
        "searchable": false
    }];

    for (var i = 12; i <= 19; ++i) {
        columnArray.push({
            "targets": [i],
            "visible": false,
            "searchable": false
        });
    }

    jQuery('#orthologyTable').DataTable({
        "columnDefs": columnArray,
        initComplete: function () {
            this.api().columns([7]).every(function () {
                var column = this;
                var select = jQuery('<select><option value="">Select Type</option></select>')
                    .appendTo(jQuery(column.footer()).empty())
                    .on('change', function () {
                        var val = jQuery.fn.dataTable.util.escapeRegex(
                            jQuery(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
            this.api().columns([5]).every(function () {
                var column = this;

                var select = jQuery('<select id="species_filter"><option value="">All Species</option></select>')
                    .appendTo(jQuery(column.footer()).empty())
                    .on('change', function () {
                        var val = jQuery.fn.dataTable.util.escapeRegex(
                            jQuery(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        }
    })

    var table = jQuery('#orthologyTable').DataTable();

    var buttons = new jQuery.fn.dataTable.Buttons(table, {
        buttons: [
            {extend: 'copyHtml5', text: "Copy <br> <i class='fa fa-download' style='color: white'></i>"},
            {extend: 'excelHtml5', text: "Excel <br> <i class='fa fa-download' style='color: white'></i>"},
            {extend: 'csvHtml5', text: "CSV <br> <i class='fa fa-download' style='color: white'></i>"},
            {extend: 'pdfHtml5', text: "PDF <br> <i class='fa fa-download' style='color: white'></i>"}
        ]
    }).container().appendTo(jQuery('#export_params'));

    jQuery('#orthologyTable tbody').on('click', 'td.detail-info', function () {
        var table = jQuery('#orthologyTable').DataTable();
        var tr = jQuery(this).closest('tr');
        var row = table.row(tr);
        var td = jQuery(this).closest('td');

        if (td.hasClass('details_shown')) {
            // This row is already open - close it
            row.child.hide();
            td.removeClass('details_shown');
        }
        else {
            // Open this row
            jQuery('.details_shown').removeClass('details_shown');

            var temp_tr = jQuery('tr.shown');
            var temp_row = table.row(temp_tr);
            temp_row.child.hide();
            jQuery('tr.shown').removeClass('shown');

            row.child(format(row.data())).show();
            tr.addClass('shown');
            td.addClass('details_shown');
        }
    });

    jQuery('#orthologyTable tbody').on('click', 'td.pairwise-align', function () {
        var table = jQuery('#orthologyTable').DataTable();
        var tr = jQuery(this).closest('tr');
        var row = table.row(tr);
        var td = jQuery(this).closest('td');

        jQuery('tr.shown').hide()

        if (td.hasClass('details_shown')) {
            // This row is already open - close it
            row.child.hide();
            td.removeClass('details_shown');
        }
        else {
            // Open this row
            jQuery('.details_shown').removeClass('details_shown');

            var temp_tr = jQuery('tr.shown');
            var temp_row = table.row(temp_tr);
            temp_row.child.hide();
            jQuery('tr.shown').removeClass('shown');

            row.child("<div id='pairwise_align'></div>").show();
            drawPairwise(row.data()[13], row.data()[4]);
            tr.addClass('shown');
            td.addClass('details_shown');
        }
    });
}

function drawPairwise(ref, hit) {
    Fluxion.doAjax(
        'comparaService',
        'getPairwiseAlignmentWithGenes',
        {'hit': hit, 'ref': ref, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                jQuery("#pairwise_align").html("<div id = 'pairwise" + ref + "' style='position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width : " + jQuery(window).width() * 0.8 + "'></div>" +
                    "<br>" +
                    "<div id = 'pairwise" + hit + "' style='position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width : " + jQuery(window).width() * 0.8 + ";'></div>")
                jQuery("#pairwise" + hit).svg()
                jQuery("#pairwise" + ref).svg()


                svg = jQuery("#pairwise" + ref).svg("get")

                var text = ref

                svg.text(parseInt(jQuery(window).width() * 0.6) + 10, 10, text, {
                    fontFamily: 'Verdana',
                    fontSize: 10,
                    textAnchor: 'begin',
                    fill: "red",
                    class: "protein_id genelabel genetext"
                });

                svg.line(0, 6, jQuery(window).width() * 0.6, 6, {id: 'id geneline', stroke: 'red', strokeWidth: 2});

                var svg = jQuery("#pairwise" + hit).svg("get")

                var text = hit

                svg.text(parseInt(jQuery(window).width() * 0.6) + 10, 10, text, {
                    fontFamily: 'Verdana',
                    fontSize: 10,
                    textAnchor: 'begin',
                    fill: "gray",
                    class: "protein_id genelabel genetext"
                });

                svg.line(0, 6, jQuery(window).width() * 0.6, 6, {id: 'id geneline', stroke: 'green', strokeWidth: 1});
                syntenic_data = {};

                syntenic_data.member = {};


                syntenic_data.cigar = {};
                syntenic_data.member[json.ref.gene_id] = json.ref.gene;
                ref_data = json.ref.gene
                syntenic_data.member[json.hit.gene_id] = json.hit.gene;
                syntenic_data.cigar[json.ref.protein_id] = json.ref.alignment;
                syntenic_data.cigar[json.hit.protein_id] = json.ref.alignment;

                syntenic_data.ref = json.ref.gene_id;

                protein_member_id = json.ref.protein_id

                resize_ref();

                dispGenesExonForMember_id("#pairwise" + ref, json.ref.alignment, json.ref.gene_id, json.ref.protein_id)//, json.hit.alignment)
                dispGenesExonForMember_id("#pairwise" + hit, json.hit.alignment, json.hit.gene_id, json.hit.protein_id, json.ref.alignment)


                separateSeq(json)

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
        '<td>' + d[12] + '</td>' +
        '<td>' + d[3] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Protein ID</td>' +
        '<td>' + d[13] + '</td>' +
        '<td>' + d[4] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Species</td>' +
        '<td>' + d[14] + '</td>' +
        '<td>' + d[5] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>CIGAR</td>' +
        '<td>' + d[15] + '</td>' +
        '<td>' + d[19] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Percentage Coverage</td>' +
        '<td>' + d[16] + '</td>' +
        '<td>' + d[8] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Percentage Positivity</td>' +
        '<td>' + d[17] + '</td>' +
        '<td>' + d[9] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Percentage Identity</td>' +
        '<td>' + d[18] + '</td>' +
        '<td>' + d[10] + '</td>' +
        '</tr>' +
        '</table>';
}
