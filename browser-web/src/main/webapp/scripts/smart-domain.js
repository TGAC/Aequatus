/**
 * Created by thankia on 06/04/2017.
 */


function smart(id) {

    var sequence = syntenic_data.sequence[id];

    Fluxion.doAjax(
        'smartDomain',
        'smartSearchSequence',
        {'sequence': sequence, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                console.log(json)

                jQuery("#domain_popup_wrapper").fadeIn();

                jQuery("#domain-popup").width(jQuery(window).width() * 0.8);

                jQuery("#domainModal_content").width(jQuery(window).width() * 0.8);

                domainTable(json.domains)
                drawDomain(id, json.domains)


            }
        });
}

function domainTable(domains) {
    var visible_table_content = "<h3>Confidently predicted domains, repeats, motifs and features from SMART</h3><table class='table table-condensed' width='100%'><tr><th>Name</th><th>Start</th><th>End</th><th>E-value</th><th>Type</th></tr>"
    var hidden_table_content = "<h3>Features NOT shown in the diagram: </h3> <table class='table table-condensed' width='100%'><tr><th>Name</th><th>Start</th><th>End</th><th>E-value</th><th>Type</th><th>Reason</th></tr>"

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

