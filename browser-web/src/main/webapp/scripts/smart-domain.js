/**
 * Created by thankia on 06/04/2017.
 */


/**
 * SMART search for protein sequence of selected gene
 * @param gene_id
 * @param protein_id
 */
function smart(gene_id, protein_id) {

    var sequence = syntenic_data.sequence[protein_id];

    var pfam = false;
    var signal = false;
    var repeat = false;
    var protein_disorder = false;
    var out_homologous = false;

    jQuery("input[name='SMARTParams']").each(function () {
        if (jQuery(this).val() == "pfam" && jQuery(this).is(":checked")) {
            pfam = true;
        } else if (jQuery(this).val() == "signal" && jQuery(this).is(":checked")) {
            signal = true;
        } else if (jQuery(this).val() == "repeat" && jQuery(this).is(":checked")) {
            repeat = true;
        } else if (jQuery(this).val() == "protein_disorder" && jQuery(this).is(":checked")) {
            protein_disorder = true;
        } else if (jQuery(this).val() == "out_homologous" && jQuery(this).is(":checked")) {
            out_homologous = true;
        }
    });

    Fluxion.doAjax(
        'smartDomain',
        'smartSearchSequence',
        {
            'sequence': sequence,
            'pfam': pfam,
            'signal': signal,
            'repeat': repeat,
            'protein_disorder': protein_disorder,
            'out_homologous': out_homologous,
            'url': ajaxurl
        },
        {
            'doOnSuccess': function (json) {
                jQuery("#domain_popup_wrapper").fadeIn();

                jQuery("#domain-popup").width(jQuery(window).width() * 0.8);

                jQuery("#domainModal_content").width(jQuery(window).width() * 0.8);

                jQuery("#domainHeader").html("<h3>Domains within " + syntenic_data.member[gene_id].species + " protein " + protein_id + "</h3>")
                jQuery("#domainStructure").html("")
                jQuery("#domainStructure").removeClass("hasSVG")


                var visible_table_content = "<h3>Confidently predicted domains, repeats, motifs and features from SMART</h3><table class='table table-condensed' width='100%'><tr><th>Name</th><th>Start</th><th>End</th><th>E-value</th><th>Type</th></tr>"
                var hidden_table_content = "<h3>Features NOT shown in the diagram: </h3> <table class='table table-condensed' width='100%'><tr><th>Name</th><th>Start</th><th>End</th><th>E-value</th><th>Type</th><th>Reason</th></tr>"

                if (json.status == "finished") {
                    jQuery(json.domains).each(function (index) {
                        json.domains[index].id = index;
                    })
                    protein_domains = json.domains;
                    showDomainResult(json, gene_id, protein_id)
                } else if (json.status == "queued") {
                    jQuery("#domainStructure").html(" <center> <img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'> </center>")
                    visible_table_content += "<tr><td colspan='5'> <center> <img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'> </center> </td></tr>";
                    hidden_table_content += "<tr><td colspan='6'><center> <img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'> </center> </td></tr>";

                    checkStatus(json.jobid, gene_id, protein_id)

                    jQuery("#visibleDomainList").html(visible_table_content)
                    jQuery("#hiddenDomainList").html(hidden_table_content)
                }
            }
        });
}

/**
 * calls a function to draw interactive domain structures
 * @param json
 * @param gene_id
 * @param protein_id
 */
function showDomainResult(json, gene_id, protein_id) {
    jQuery("#domainStructure").html("")

    domainTable(json.domains, protein_id)
    var domains_to_draw = []
    jQuery(json.domains).each(function (index) {
        if (json.domains[index].STATUS.split("|")[0] == "visible") {
            domains_to_draw.push(protein_domains[index])
        }
    })


    drawDomain(gene_id, protein_id, domains_to_draw)
}

/**
 * displays domains in DataTable format
 * @param domains
 */
function domainTable(domains, protein_id) {
    var visible_table_content = "<h3>Confidently predicted domains, repeats, motifs and features from SMART</h3>" +
        "<table id='visibleDomainListTable' class='table table-condensed' width='100%'>" +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Name</th>" +
        "<th>Start</th>" +
        "<th>End</th>" +
        "<th>E-value</th>" +
        "<th>Type</th>" +
        "</tr>" +
        "</thead>";

    visible_table_content += "<tfoot>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Name</th>" +
        "<th>Start</th>" +
        "<th>End</th>" +
        "<th>E-value</th>" +
        "<th>Type</th>" +
        "</tr>" +
        "</tfoot>" +
        "<tbody";


    var hidden_table_content = "<h3>Features NOT shown in the diagram: </h3> " +
        "<table id='hiddenDomainListTable' class='table table-condensed' width='100%'>" +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Name</th>" +
        "<th>Start</th>" +
        "<th>End</th>" +
        "<th>E-value</th>" +
        "<th>Type</th>" +
        "<th>Reason</th>" +
        "</tr>" +
        "</thead>";

    hidden_table_content += "<tfoot>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Name</th>" +
        "<th>Start</th>" +
        "<th>End</th>" +
        "<th>E-value</th>" +
        "<th>Type</th>" +
        "<th>Reason</th>" +
        "</tr>" +
        "</tfoot>" +
        "<tbody";

    jQuery("#visibleDomainList").html("")
    jQuery("#hiddenDomainList").html("")


    for (var i = 0; i < domains.length; i++) {
        if (domains[i].STATUS.split("|")[0] == "visible") {
            var col2 = ""
            col2 = domains[i].DOMAIN
            visible_table_content += "<tr><td>" + domains[i].id + "</td><td>" + col2 + "</td><td>" + domains[i].START + "</td><td>" + domains[i].END + "</td><td>" + domains[i].EVALUE + "</td><td>" + domains[i].TYPE + "</td></tr>";
        } else {
            hidden_table_content += "<tr><td>" + domains[i].id + "</td><td>" + domains[i].DOMAIN + "</td><td>" + domains[i].START + "</td><td>" + domains[i].END + "</td><td>" + domains[i].EVALUE + "</td><td>" + domains[i].TYPE + "</td><td>" + domains[i].STATUS.split("|")[1] + "</td></tr>";
        }
    }

    visible_table_content += "</tbody></table>"
    hidden_table_content += "</tbody></table>"

    jQuery("#visibleDomainList").html(visible_table_content)
    jQuery("#hiddenDomainList").html(hidden_table_content)

    jQuery('#hiddenDomainListTable').DataTable({
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ]
    });

    var yrtable = jQuery('#visibleDomainListTable').DataTable({
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                }
            ],
            // } );

            //  var yrtable = jQuery('#visibleDomainListTable').DataTable(
            //     {
            initComplete: function () {
                this.api().columns([5]).every(function () {
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
                this.api().columns([4]).every(function () {
                    var column = this;

                    var select = jQuery('<select id="evalue_filter"><option value="">Select E-value</option></select>')
                        .appendTo(jQuery(column.footer()).empty())
                        .on('change', function () {
                            jQuery("#visibleDomainListTable").DataTable().draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                });
            }
        }
    );
    // jQuery('#hiddenDomainListTable').DataTable();

    jQuery("#visibleDomainListTable").on('search.dt', function () {
        var filteredData = yrtable.rows({filter: 'applied'}).data().toArray();
        var highlight = []
        jQuery.each(filteredData, function (i) {
            highlight[i] = parseInt(filteredData[i][0]);
        })
        filterDomain(highlight, protein_id)
    });
}

/**
 * Checks response for the submitted job for SMART search
 * @param jobid
 * @param gene_id
 * @param protein_id
 */
function checkStatus(jobid, gene_id, protein_id) {

    Fluxion.doAjax(
        'smartDomain',
        'jobStatus',
        {'url': ajaxurl, 'jobid': jobid},
        {
            'doOnSuccess': function (response) {
                if (response.status == "queued") {
                    setTimeout(function () {
                        checkStatus(jobid, gene_id, protein_id)
                    }, 12000);
                }
                else {
                    jQuery(response.domains).each(function (index) {
                        response.domains[index].id = index;
                    })
                    protein_domains = response.domains;
                    showDomainResult(response, gene_id, protein_id)
                }
            },
            'doOnError': function (json) {
                alert(json.error);
            }
        }
    );

}

/**
 * extends DataTable Search function for E-value filteration
 */
jQuery.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var evalue_filter = jQuery('#evalue_filter').val() || null;
        var evalue = parseFloat(data[4]);
        if (evalue_filter == null || evalue <= evalue_filter) {
            return true;
        }
        return false;
    }
);
