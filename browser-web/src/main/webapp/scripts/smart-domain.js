/**
 * Created by thankia on 06/04/2017.
 */


function smart(gene_id, protein_id) {

    var sequence = syntenic_data.sequence[protein_id];

    Fluxion.doAjax(
        'smartDomain',
        'smartSearchSequence',
        {'sequence': sequence, 'url': ajaxurl},
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
                    showDomainResult(json, gene_id, protein_id)
                } else if (json.status == "queued") {
                    jQuery("#domainStructure").html(" <center> <img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'> </center>")
                    visible_table_content += "<tr><td colspan='5'> <center> <img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'> </center> </td></tr>";
                    hidden_table_content += "<tr><td colspan='6'><center> <img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'> </center> </td></tr>";

                    checkStatus(json.jobid, gene_id, protein_id)

                }

                jQuery("#visibleDomainList").html(visible_table_content)
                jQuery("#hiddenDomainList").html(hidden_table_content)
            }
        });
}

function showDomainResult(json, gene_id, protein_id) {
    jQuery("#domainStructure").html("")

    domainTable(json.domains)
    drawDomain(protein_id, json.domains)
}

function domainTable(domains) {
    var visible_table_content = "<h3>Confidently predicted domains, repeats, motifs and features from SMART</h3><table class='table table-condensed' width='100%'><tr><th>Name</th><th>Start</th><th>End</th><th>E-value</th><th>Type</th></tr>"
    var hidden_table_content = "<h3>Features NOT shown in the diagram: </h3> <table class='table table-condensed' width='100%'><tr><th>Name</th><th>Start</th><th>End</th><th>E-value</th><th>Type</th><th>Reason</th></tr>"

    jQuery("#visibleDomainList").html("")
    jQuery("#hiddenDomainList").html("")


    for (var i = 0; i < domains.length; i++) {
        if (domains[i].STATUS.split("|")[0] == "visible") {
            var col1 = ""
            if (domains[i].TYPE == "PFAM" || domains[i].TYPE == "SMART") {
                var link = ""
                if (domains[i].DOMAIN.indexOf(":") > 0) {
                    link = domains[i].DOMAIN.split(":")[1];
                } else {
                    link = domains[i].DOMAIN;
                }
                col1 = "<a href='http://pfam.xfam.org/family/" + link + "' target='_new'>" + domains[i].DOMAIN + "</a>"
            } else {
                col1 = domains[i].DOMAIN
            }

            visible_table_content += "<tr><td>" + col1 + "</td><td>" + domains[i].START + "</td><td>" + domains[i].END + "</td><td>" + domains[i].EVALUE + "</td><td>" + domains[i].TYPE + "</td></tr>";
        } else {
            hidden_table_content += "<tr><td>" + domains[i].DOMAIN + "</td><td>" + domains[i].START + "</td><td>" + domains[i].END + "</td><td>" + domains[i].EVALUE + "</td><td>" + domains[i].TYPE + "</td><td>" + domains[i].STATUS.split("|")[1] + "</td></tr>";
        }
    }

    visible_table_content += "</table>"
    hidden_table_content += "</table>"

    jQuery("#visibleDomainList").html(visible_table_content)
    jQuery("#hiddenDomainList").html(hidden_table_content)
}

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
                    showDomainResult(response, gene_id, protein_id)
                }
            },
            'doOnError': function (json) {
                alert(json.error);
            }
        }
    );

}

