/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 23/08/2017
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var graph;
var units = "Widgets";

var margin = {top: 10, right: 10, bottom: 10, left: 100},
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

function drawSankey(sankey_json, div) {
    if (sankey_json.nodes.size() * 5 > height) {
        height = sankey_json.nodes.size() * 5
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
    d3.json(sankey_json, function () {

        graph = sankey_json;
        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(64);

// add in the links
        var link = svg.append("g").selectAll(".link")
            .data(graph.links)
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
                return d.source.type + " → " +
                    d.target.type + "\n" + d.value;
            });

// add in the nodes
        var node = svg.append("g").selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
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
                return d.dy;
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
                return d.name + "\n" + format(1);
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
                if (d.sourceLinks[0] && d.targetLinks[0]) {
                    return "middle";
                }
                if (d.sourceLinks[0]) {
                    return "end";
                }
                else {
                    return "begin";

                }
            })

            .text(function (d) {
                if (d.sourceLinks[0] && d.targetLinks[0]) {
                    return d.name;
                }
                else {
                    return d.name + "-" + d.speciesName;
                }
            })


// the function for moving the nodes
        function dragmove(d) {
            d3.select(this).attr("transform",
                "translate(" + d.x + "," + (
                    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ")");
            sankey.relayout();
            link.attr("d", path);
        }
    })
}
