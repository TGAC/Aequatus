/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 23/08/2017
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var graph;
var units = "Widgets";

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function (d) {
        return formatNumber(d) + " " + units;
    },
    color = d3.scale.category20();

// append the svg canvas to the page
var svg;

// Set the sankey diagram properties

function drawSankey(data, div) {
    if (data.nodes.size() * 5 > height) {
        height = data.nodes.size() * 5
    }

    var sankey = d3.sankey()
        .nodeWidth(36)
        .nodePadding(5)
        .size([width, height]);


    var path = sankey.link();
    jQuery(div).html("")
    svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("overflow", "visible")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// load the data

    d3.json(data, function () {

        var graph = {};
        graph.nodes = data.nodes.slice(0);
        graph.links = data.links.slice(0);
        var currentData = graph;
        var link, node, myNodes, myLinks;
        renderSankey()


        function renderSankey() {
            d3.select(div).selectAll('svg').remove();
            myLinks = currentData.links;
            myNodes = currentData.nodes;

            myLinks.sort(function (a, b) {
                return d3.ascending(a.value, b.target);
            });


            svg = d3.select(div).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("overflow", "visible")
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            sankey = d3.sankey()
                .size([width, height])
                .nodes(myNodes)
                .links(myLinks)
                .layout(120);

            path = sankey.link();

            // add in the links
            link = svg.append("g").selectAll(".link")
                .data(myLinks)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", path)
                .style("stroke-width", function (d) {
                    return Math.max(1, d.dy);
                })
                .sort(function (a, b) {
                    return b.dy - a.dy;
                });

            // add the link titles
            link.append("title")
                .text(function (d) {
                    return d.source.name + " " + d.target.name;
                });

            // add in the nodes
            node = svg.append("g").selectAll(".node")
                .data(myNodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .on("click", function (d) {
                    if (d.sourceLinks[0]) {
                        removeSankeyPopup()
                    }
                    else {
                        sankey_info(d)
                    }
                })
                .call(d3.behavior.drag()
                    .origin(function (d) {
                        return d;
                    })
                    .on("dragstart", function () {
                        this.parentNode.appendChild(this);
                    })
                    .on("drag", dragmove));

            // add the rectangles for the nodes
            node.append("rect")
                .attr("height", function (d) {
                    if (d.dy > 0) {
                        return d.dy;
                    }
                    else {
                        return 1;
                    }
                })
                .attr("width", sankey.nodeWidth())
                .style("fill", function (d) {
                    if (d.species) {
                        return d.color = color(d.species)
                    } else {
                        return d.color = color(d.name.replace(/ .*/, ""));
                    }
                })
                .style("stroke", function (d) {
                    return d3.rgb(d.color).darker(2);
                })
                .append("title")
                .text(function (d) {
                    return d.type + "\n" + format(1);
                });

            // add in the title for the nodes
            node.append("text")
                .attr("x", function (d) {
                    if (d.sourceLinks[0]) {
                        return -6;
                    }
                    else {
                        return 6 + sankey.nodeWidth();

                    }
                })
                .attr("y", function (d) {
                    return d.dy / 2;
                })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) {
                    if (d.sourceLinks[0]) {
                        return "end";
                    }
                    else {
                        return "begin";

                    }
                })
                .text(function (d) {
                    if (d.sourceLinks[0]) {
                        return d.name;
                    }
                    else {
                        return d.name + "-" + d.speciesName;
                    }
                })

        }

        d3.selectAll("input[name='type_homology']").on("change", function () {
            var val = this.value
            if (val == "all") {
                graph.nodes = data.nodes
                currentData.nodes = graph.nodes;

                graph.links = data.links
                currentData.links = graph.links;

            } else {
                graph.nodes = data.nodes
                currentData.nodes = graph.nodes.filter(function (d) {
                    if (d.type == val || d.name == val || d.name == "reference") {
                        return d;
                    }
                });

                graph.links = data.links
                currentData.links = graph.links.filter(function (d) {
                    if (d.target.type == val || d.target.name == val)// || d.name == "reference")
                    {
                        return d;
                    }

                })
            }
            renderSankey();

        });


        // the function for moving the nodes
        function dragmove(d) {
            d3.select(this).attr("transform",
                "translate(" + d.x + "," + (
                    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ")");
            sankey.relayout();
            link.attr("d", path);
        }

        function sankey_info(d){

            jQuery("#sankey_info_wrapper").fadeIn()
            jQuery("#homology_type").html(d.type)

            var first = true;
            var info = ""
            for(var i in d.source){
                var key = i;
                var source = d.source[i];
                var target = d.target[i];
                if(first){
                    info += "<table id='sankey_info_table'><thead><tr><th>Attribute</th><th>Source</th><th>Target</th></tr></thead><tbody>";
                }
                first = false;

                if(key.indexOf("seq") < 0){
                    info += "<tr><td>"+i+"</td><td>"+source+"</td><td>"+target+"</td></tr>";
                }
            }
            info += "</tbody></table>";

            jQuery("#sankey_info").html(info)
            jQuery("#sankey_info_table").DataTable();


        }
    })
}

function removeSankeyPopup(){
    jQuery("#sankey_info_wrapper").fadeOut()
}
