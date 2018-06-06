/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 04/08/2017
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
function search_from_homologues_box() {
    if (parseInt(jQuery("#§trol_panel").css("left")) < 0) {
        togglePanel('#search_div')
    }
    jQuery("#search_history").html(jQuery("#control_search").val());
    jQuery("#control_search").val(jQuery('#search').val());
    search_homologues(jQuery('#search').val());
}

function search_homologues(query) {
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

                list_homologues(json)

            }
        });
}


function list_homologues(json) {
    console.log("list_homologues")
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
                "getHomologyForMember(" + json.html[i].gene_member_id + ",\"table\");'> " +
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

function getSyntenyForMember(query) {
    jQuery("#selected_region").html("<img style='position: relative; left: 0px; ' src='./images/browser/loading_big.gif' alt='Loading' height=20px>")
    jQuery("#synteny").html("<img style='position: relative; left: 0px; ' src='./images/browser/loading_big.gif' alt='Loading'>")

    Fluxion.doAjax(
        'comparaService',
        'getSyntenyForMember',
        {'query': query, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                syntenic_data.synteny = json.synteny
                syntenic_data.refSpecies = json.refSpecies;
                setSelector()
                drawSynteny(json)
            }
        });
}



function getHomologyForMember(query, view) {
    if (view == "table") {
        jQuery("#homologies").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    } else if (view == "sankey") {
        jQuery("#sankey").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    }

    resetView();

    //Fluxion.doAjax(
    //    'comparaService',
    //    'getRefMember',
    //    {'query': query, 'url': ajaxurl},
    //    {
    //        'doOnSuccess': function (json) {
    //            sequencelength = json.chr_length;
    //
    //            setSelector(json.member[json.ref].Transcript[0], json.member[json.ref].member_id)
    //        }
    //    });
    updateGenomeList()

    Fluxion.doAjax(
        'ensemblRestServices',
        'getHomologyForMember',
        {'id': query, 'species':selected_species.toString(), 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                URLMemberID(json.ref.stable_id, view)

                jQuery("#gene_tree_nj").html("")
                if (view == "table") {
                    syntenic_data.view = "table"
                    drawHomology(json)
                } else if (view == "sankey") {
                    syntenic_data.view = "sankey"
                    generate_sankey_JSON(json)
                }

                //setSelector(json.ref, json.ref.canonical_member_id)
            }
        });
}

function drawHomology(json) {
    console.log("drawHomology")
    var homology_table_content = "<table><tr><td><h3>Confidently predicted Homology for " + json.ref.display_label + "</h3></td><td valign=middle> (Gene: " + json.ref.stable_id + ")</td></tr></table> <br>" +
        "<table id='homologyTable' class='table' width='100%'>" +
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
    var homology = json.homology;
    console.log("drawHomology 1")

    homology_table_content += "<tfoot>" +
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
    console.log("drawHomology 2")

    // var json_key = Object.keys(homology);
    for (var i = 0; i < homology.length; i++) {
        console.log("drawHomology 21 "+i)
        var tree = homology[i].tree >= 0 ? "<i class='fa fa-check-circle-o' style='color:#35b008; font-size: 1.5em; cursor: pointer' aria-hidden='true' onclick='openTree(\"" + homology[i].source.protein_id + "\")'></i>" : "";
        console.log("drawHomology 22 "+i)
        var pairwise = homology[i].tree >= 0 ? "<td class='details-control pairwise-align details_hidden'></td>" : "<td></td>";
        console.log("drawHomology 23 "+i)
        homology_table_content += "<tr> " +
            "<td class='details-control detail-info details_hidden'></td>" +
            pairwise +
            "<td>" + i + "</td>" +
            "<td>" + homology[i].target.id + "</td>" +
            "<td>" + homology[i].target.protein_id + "</td>" +
            "<td>" + homology[i].target.species + "</td>" +
            "<td>" + homology[i].dn_ds + "</td>" +
            "<td>" + homology[i].type + "</td>" +
            "<td align='center'>" + homology[i].target.perc_cov + "</td>" +
            "<td align='center'>" + homology[i].target.perc_pos + "</td>" +
            "<td align='center'>" + homology[i].target.perc_id + "</td>" +
            "<td align='center'>" + tree + "</td>" +
            "<td>" + homology[i].source.id + "</td>" +
            "<td>" + homology[i].source.protein_id + "</td>" +
            "<td>" + homology[i].source.species + "</td>" +
            "<td>" + homology[i].source.cigar_line + "</td>" +
            "<td>" + homology[i].source.perc_cov + "</td>" +
            "<td>" + homology[i].source.perc_pos + "</td>" +
            "<td>" + homology[i].source.perc_id + "</td>" +
            "<td>" + homology[i].target.cigar_line + "</td>" +
            "</tr>";
    }
    console.log("drawHomology 3")

    homology_table_content += "</tbody></table>"
    console.log("drawHomology")

    jQuery("#homologies").html(homology_table_content)
    console.log("drawHomology")


    var columnArray = [{
        "targets": [2],
        "visible": false,
        "searchable": false
    }];
    console.log("drawHomology")

    for (var i = 12; i <= 19; ++i) {
        columnArray.push({
            "targets": [i],
            "visible": false,
            "searchable": false
        });
    }
    console.log("drawHomology 4")

    jQuery('#homologyTable').DataTable({
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

                var select = jQuery('<select id="species_filter" multiple=multiple><option value="">All Species</option></select>')
                    .appendTo(jQuery(column.footer()).empty())
                    .on('change', function () {
                        var val = []
                        jQuery.each(jQuery(this).val(), function (index, value) {
                            val.push(jQuery.fn.dataTable.util.escapeRegex(value));

                        })
                        val = val.join("|")

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

    var table = jQuery('#homologyTable').DataTable();

    var buttons = new jQuery.fn.dataTable.Buttons(table, {
        buttons: [
            {
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [3, 4, 5, 6, 7, 8, 9, 10],
                    rows: [':visible']
                },
                text: "Copy <br> <i class='fa fa-download' style='color: white'></i>"
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [3, 4, 5, 6, 7, 8, 9, 10],
                    rows: [':visible']
                },
                text: "Excel <br> <i class='fa fa-download' style='color: white'></i>"
            },
            {
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [3, 4, 5, 6, 7, 8, 9, 10],
                    rows: [':visible']
                },
                text: "CSV <br> <i class='fa fa-download' style='color: white'></i>"
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [3, 4, 5, 6, 7, 8, 9, 10],
                    rows: [':visible']
                },
                text: "PDF <br> <i class='fa fa-download' style='color: white'></i>",
                orientation: 'landscape',
                pageSize: 'LEGAL',
                title: "Aequatus - Homology for gene " + json.ref.display_label + "",
                messageTop: 'Confidently predicted Homology for ' + json.ref.display_label + ' (Gene: ' + json.ref.stable_id + ')',
                messageBottom: "\n Aequatus | 2015-2017 - Earlham Institute - http://aequatus.earlham.ac.uk"
                //customize: function ( doc ) {
                //    doc.content.splice( 1, 0, {
                //        margin: [ 0, 0, 0, 12 ],
                //        alignment: 'center',
                //        image: 'https://camo.githubusercontent.com/960faff857e34ebebfe042d487de503ca9bcb5be/687474703a2f2f61657175617475732e6561726c68616d2e61632e756b2f61657175617475732d757365722d67756964652f696d672f61657175617475732d6c6f676f2e706e67'
                //    } );
                //}
            }
        ]
    }).container().appendTo(jQuery('#export_params'));

    jQuery('#homologyTable tbody').on('click', 'td.detail-info', function () {
        var table = jQuery('#homologyTable').DataTable();
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
            var temp = formatRow(row.data())
            row.child(temp).show();
            tr.addClass('shown');
            td.addClass('details_shown');
        }
    });

    jQuery('#homologyTable tbody').on('click', 'td.pairwise-align', function () {
        var table = jQuery('#homologyTable').DataTable();
        var tr = jQuery(this).closest('tr');
        var row = table.row(tr);
        var td = jQuery(this).closest('td');


        if (td.hasClass('details_shown')) {
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

            row.child("<div style='position:relative; left:100px;' id='pairwise_align'></div>").show();
            drawPairwise(row.data()[13], row.data()[4]);
            tr.addClass('shown');
            td.addClass('details_shown');
        }
    });
}

function drawPairwise(ref, hit) {
    jQuery("#pairwise_align").html("<div><center><img src='./images/browser/loading_big.gif'></center></div>")

    Fluxion.doAjax(
        'comparaService',
        'getPairwiseAlignmentWithGenes',
        {'hit': hit, 'ref': ref, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                jQuery("#pairwise_align").html("<div  id = 'pairwise" + ref + "' style='position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width : " + jQuery(window).width() * 0.8 + "'></div>" +
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
function formatRow(d) {
    return '<table class="table dataTable" style="padding-left:50px; width:50%; float:left" cellpadding="5" cellspacing="0" border="0" >' +
        '<thead>' +
        '<tr>' +
        '<th>Description</th>' +
        '<th>Source</th>' +
        '<th>Target</th>' +
        '</tr>' +
        '</thead>' +
        '<tr>' +
        '<th>Gene ID</th>' +
        '<td>' + d[12] + '</td>' +
        '<td>' + d[3] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<th>Protein ID</th>' +
        '<td>' + d[13] + '</td>' +
        '<td>' + d[4] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<th>Species</th>' +
        '<td>' + d[14] + '</td>' +
        '<td>' + d[5] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<th>CIGAR</th>' +
        '<td>' + d[15] + '</td>' +
        '<td>' + d[19] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<th>Percentage Coverage</th>' +
        '<td>' + d[16] + '</td>' +
        '<td>' + d[8] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<th>Percentage Positivity</th>' +
        '<td>' + d[17] + '</td>' +
        '<td>' + d[9] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<th>Percentage Identity</th>' +
        '<td>' + d[18] + '</td>' +
        '<td>' + d[10] + '</td>' +
        '</tr>' +
        '</table>';
}

function openTree(id) {
    getMemberfromURL(id, "tree")
}
