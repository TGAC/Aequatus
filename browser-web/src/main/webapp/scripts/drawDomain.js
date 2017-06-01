/**
 * Created by thankia on 13/04/2017.
 */
/**
 * Draw protein domain skeleton
 * @param id
 * @param domains
 */

var domainsvg;


function drawDomain(id, domains) {
    // jQuery("#domainStructure").svg()
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = jQuery(window).width() * 0.8,
        height = 500 - margin.top - margin.bottom;

    var svg = ""//jQuery("#domainStructure").svg("get")
    var maxLentemp = jQuery("#domainStructure").width();
    var stopposition = maxLentemp;

    var g = "";//svg.group({class: 'style1'});


    domainsvg = d3.select("#domainStructure").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("overflow-y", "scroll")
        .style("position", "relative")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var node = domainsvg.selectAll("rect")
        .data([1]);


    node.enter().append("rect")
        .attr("x", 0)
        .attr("y", 10)
        .style("position", "relative")

        .attr("width", stopposition)
        .attr("height", 20)
        .attr("fill", "lightgray")
        .attr("id", "domainline");


    dispEachDomain(domains, syntenic_data.sequence[id].length);
}


/**
 * draws individual domain with interactive functionality
 * @param domains
 * @param max_len
 */
function dispEachDomain(domains, max_len) {

    var width = jQuery("#domainStructure").width()




    if (domains.length > 0) {

        var domain_len = domains.length;

        var end = 0;
        var layer = 0
        var start = 0;
        for (var i = 0; i < domain_len; i++) {
            if (domains[i].STATUS.split("|")[0] == "visible") {
                end = domains[i].END;
                domains[i].layer = layer;
                start = parseInt(i) + 1;
                break;
            }
        }

        for (var i = start; i < domain_len; i++) {
            if (domains[i].STATUS.split("|")[0] == "visible") {

                if (parseInt(domains[i].START) < parseInt(end)) {
                    layer++;
                    domains[i].layer = layer;
                } else {
                    layer = 0;
                    domains[i].layer = layer;
                    end = domains[i].END
                }
            }
        }

        var linearScale = d3.scale.linear()
            .domain([0,max_len])
            .range([0,width]);

        var node = domainsvg.selectAll(".domain")
            .data(domains);
        // .on("mouseover", function(d){
        //     showDomainPosition(startposition , stopposition , domains[domain_len].START , domains[domain_len].END);
        //     searchDomain("'"+domains[domain_len].DOMAIN+"'")
        // });


        node.enter().append("rect");


        node.exit().transition()
            .duration(500)
            .attr("class", function (d) {
                console.log(d.DOMAIN)

                return d.TYPE
            })
            .remove();

        node.transition()
            .duration(500)
            .attr("x", function (d, i) {
                if (parseInt(d.START) < parseInt(d.END)) {
                    domain_start = parseInt(d.START);
                }
                else {
                    domain_start = parseInt(d.END);
                }

                return linearScale(domain_start);
            })
            .attr("y", function (d, i) {
                return parseInt(d.layer * 22) + parseInt(10);

            })
            .attr("width", function (d) {
                if (parseInt(d.START) < parseInt(d.END)) {
                    domain_start = parseInt(d.START);
                    domain_stop = parseInt(d.END);
                }
                else {
                    domain_start = parseInt(d.END);
                    domain_stop = parseInt(d.START);
                }

                return linearScale((domain_stop - domain_start) + 1);


            })
            .attr("height", 20)
            .attr("class", function (d) {
                if (d.TYPE == "PROSPERO") {
                    return "domain internal_repeat " + d.DOMAIN
                } else if (d.TYPE == "INTRINSIC") {
                    return "domain INTRINSIC " + d.DOMAIN
                } else {
                    return "domain " + d.TYPE
                }
            })
            .attr("domain", function (d) {
                return d.DOMAIN
            })
            .attr("domain_type", function (d) {
                if (d.TYPE == "PROSPERO") {
                    return "internal_repeat " + d.DOMAIN
                } else if (d.TYPE == "INTRINSIC") {
                    return "INTRINSIC " + d.DOMAIN
                } else {
                    return d.TYPE
                }
            });

        // while (domain_len--) {
        //     var dom_class = domains[domain_len].TYPE;


        //     if (dom_class == "PROSPERO") {
        //         dom_class = "internal_repeat " + domains[domain_len].DOMAIN
        //     } else if (dom_class == "INTRINSIC") {
        //         //if (domains[domain_len].DOMAIN == "transmembrane_domain") {
        //         dom_class = "INTRINSIC " + domains[domain_len].DOMAIN
        //         //} else if (domains[domain_len].DOMAIN == "low_complexity_region") {
        //         //    dom_class = "low_complexity_region"
        //         //}
        //     }

        //     if (domains[domain_len].TYPE.split("|")[0]) {

        //     }
        //     if (domains[domain_len].STATUS.split("|")[0] == "visible") {
        //         var domain_start;
        //         var domain_stop;

        //         if (parseInt(domains[domain_len].START) < parseInt(domains[domain_len].END)) {
        //             domain_start = parseInt(domains[domain_len].START);
        //             domain_stop = parseInt(domains[domain_len].END);
        //         }
        //         else {
        //             domain_start = parseInt(domains[domain_len].END);
        //             domain_stop = parseInt(domains[domain_len].START);
        //         }

        //         var startposition = (domain_start) * parseFloat(width) / (max_len);
        //         var stopposition = ((domain_stop - domain_start) + 1) * parseFloat(width) / (max_len);

        //         stopposition -= 1

        //         if (stopposition < 1) {
        //             stopposition = 1
        //         }
        //         startposition += 1

        //         var top = parseInt(domains[domain_len].layer * 22) + parseInt(10);

        //         var g = svg.group({
        //             class: "domain " + dom_class,
        //             domain: domains[domain_len].DOMAIN,
        //             domain_type: dom_class
        //         });

        //         svg.rect(g, startposition, top, stopposition, (20), {
        //             'id': "domain" + domains[domain_len].DOMAIN,
        //             'class': dom_class,
        //             'domain': domains[domain_len].DOMAIN,
        //             'domain_type': dom_class,
        //             'onmouseover': 'showDomainPosition("' + startposition + '","' + stopposition + '","' + domains[domain_len].START + '","' + domains[domain_len].END + '"); searchDomain("' + domains[domain_len].DOMAIN + '")',
        //             'onmouseout': 'hideDomainPosition(); searchDomain("")',
        //             strokeWidth: 1
        //         });

        //         var text = "";

        //         if (dom_class == "PFAM") {
        //             text = domains[domain_len].DOMAIN.split(":")[1]
        //         }
        //         else if (dom_class == "SMART") {
        //             text = domains[domain_len].DOMAIN
        //         }

        //         var top = parseFloat(parseFloat(parseInt(domains[domain_len].layer) + parseFloat(0.5)) * 22) + 10;

        //         var textPosition = startposition + (stopposition) / 2

        //         svg.text(g, parseInt(textPosition), top, text, {
        //             fontFamily: 'Verdana',
        //             fontSize: 10,
        //             textAnchor: 'middle',
        //             fill: "white",
        //             stroke: "white",
        //             class: "label"

        //         });
        //     }
        // }
    }
}

/**
 * highlights domain position
 * @param startposition
 * @param stopposition
 * @param start
 * @param stop
 */
function showDomainPosition(startposition, stopposition, start, stop) {

    var svg = jQuery("#domainStructure").svg("get")
    svg.line(parseInt(startposition), 10, parseInt(startposition), 30, {
        stroke: 'red',
        strokeWidth: 1,
        class: "domain_position"
    });

    svg.line(parseInt(parseInt(startposition) + parseInt(stopposition)), 10, parseInt(parseInt(startposition) + parseInt(stopposition)), 30, {
        stroke: 'red',
        strokeWidth: 1,
        class: "domain_position"
    });

    svg.text(parseInt(startposition), 8, start, {
        fontFamily: 'Verdana',
        fontSize: 10,
        textAnchor: 'middle',
        fill: "black",
        class: "domain_position"
    });

    svg.text(parseInt(parseInt(startposition) + parseInt(stopposition)), 8, stop, {
        fontFamily: 'Verdana',
        fontSize: 10,
        textAnchor: 'middle',
        fill: "black",
        class: "domain_position"
    });

}

/**
 * hides domain position
 */
function hideDomainPosition() {
    jQuery(".domain_position").remove()
}

/**
 * searches selected domain in DataTable
 * @param domain
 */
function searchDomain(domain) {
    // var table = jQuery("#visibleDomainListTable").DataTable()
    // table.search(domain).draw();
    // Focus on it
}

/**
 * highlight selected domains from DataTable
 * @param domain
 */
function highlightDomain(domain, id) {
    var domains = [];
    jQuery(protein_domains).each(function (index) {
        var dom_index = domain.indexOf(protein_domains[index].id)
        if (dom_index >= 0) {
            domains[dom_index] = protein_domains[index]
        }
    })

    dispEachDomain(domains, syntenic_data.sequence[id].length)
}
