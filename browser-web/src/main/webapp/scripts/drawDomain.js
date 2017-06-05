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
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = jQuery(window).width() * 0.8,
        height = 500 - margin.top - margin.bottom;

    var maxLentemp = jQuery("#domainStructure").width();
    var stopposition = maxLentemp;

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

    var delta = (max_len * 5)/ width


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

                if (parseInt(domains[i].START) - parseInt(end) < delta) {
                    layer++;
                    domains[i].layer = layer;
                } else {
                    layer = 0;
                    domains[i].layer = layer;
                    end = domains[i].END
                }
            }
        }

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function (d) {
                return d.DOMAIN+":"+d.START+"-"+d.END;
            })

        var linearScale = d3.scale.linear()
            .domain([0,max_len])
            .range([0,width]);

        var node = domainsvg.selectAll(".domain")
            .data(domains);

        domainsvg.call(tip)
        node.enter().append("rect")
            .on('mouseover', function(d){
                tip.show(d);
                highlightDomain(d)
            })
            .on('mouseout',function(d){
                tip.hide(d);
                resetDomain()
            })
            .on('click', function(d){
                d3.select(this).on("mouseout", null);
                tip.hide(d);
                searchDomain(d)
            })
            .attr("x", function (d, i) {
                if (parseInt(d.START) < parseInt(d.END)) {
                    domain_start = parseInt(d.START);
                }
                else {
                    domain_start = parseInt(d.END);
                }

                return linearScale(domain_start);
            })
            .attr("width", 0);





        node.exit().transition()
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
            .attr("width", 0)
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

    }
}

/**
 * searches selected domain in DataTable
 * @param domain
 */
function searchDomain(domain) {
    var table = jQuery("#visibleDomainListTable").DataTable()
    table.search(domain.DOMAIN).draw();
}

/**
 * highlight selected domains from DataTable
 * @param domain
 */
function highlightDomain(domain) {
    var node = domainsvg.selectAll(".domain")

    node.transition()
        .duration(500)
        .attr("opacity", function(d){
            if(d.DOMAIN == domain.DOMAIN){
                return 1
            }else{
                return 0.3
            }
        });
}

/**
 * reset domains from DataTable
 */
function resetDomain() {
    var node = domainsvg.selectAll(".domain")
    node.transition()
        .duration(500)
        .attr("opacity", 1);
}

/**
 * highlight selected domains from DataTable
 * @param domain
 */
function filterDomain(domain, id) {
    var domains = [];
    jQuery(protein_domains).each(function (index) {
        var dom_index = domain.indexOf(protein_domains[index].id)
        if (dom_index >= 0) {
            domains[dom_index] = protein_domains[index]
        }
    })
    dispEachDomain(domains, syntenic_data.sequence[id].length)
}
