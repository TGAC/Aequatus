/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 30/07/2014
 * Time: 13:16
 * To change this template use File | Settings | File Templates.
 */


function drawTree(json_tree) {

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 400,//jQuery(document).width(),
        height = 1000 - margin.top - margin.bottom;

    var cluster = d3.layout.cluster()
        .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.y, d.x];
        });

    var svg = d3.select("#gene_tree_nj").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .style("overflow", "visible")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var i = 0,
        duration = 750,
        root;


    d3.json(json_tree, function () {

        root = json_tree;

        root.x0 = height / 2;
        root.y0 = 0;

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }


        update(root, ref_member);
    });

    d3.select(self.frameElement).style("height", "800px");


    function update(source, ref_member) {
        // Compute the new tree layout.

        var nodes = cluster.nodes(root)

        var max = 0;
        // Normalize for fixed-depth.
        var count = 0;
        nodes.forEach(function (d) {
            if (d.children == null)
                count++;
        });

        updateWindow(count)

        nodes = cluster.nodes(root)
         var   links = cluster.links(nodes);

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", function (d) {
                if (d.children && d.children != null) {
                    if (d.children.size() > 0) {
                        click(d)
                    }
                } else {
                    if (d._children.size() > 0) {
                        click(d)
                    }
                }
            })


        nodeEnter.append("circle")
            .attr("r", function (d) {
//                if (d.children)// && d.children != null) {
//                {
                    return 4;
//                }
//                else {
//                    return 6;
//                }
            })
            .style("fill", function (d, i) {
                if (d.type == "duplication") {
                    return colours[0];
                } else if (d.type == "dubious") {
                    return colours[1];
                } else if (d.type == "speciation") {
                    return colours[2];
                } else if (d.type == "gene_split") {
                    return colours[3];
                } else {
                    return "white";
                }


            })
            .style("stroke-width", function (d, i) {
                if (d.member_id == ref_member) {
                    return "2px";
                } else {
                    return "1px";
                }
            })
            .style("stroke", function (d, i) {
                if (d.member_id == ref_member) {
                    return "black";
                }
            });


        nodeEnter.append("text")
            .attr("x", function (d) {
                if (d.children && d.children != null) {
                    if (d.children.size() == 0) {
                        return 1200;
                    }
                }
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                if (d.children && d.children != null) {
                    if (d.children.size() == 0) {
                        return d.data;
                    }
                }
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", function (d) {
                if (d.member_id == ref_member)// && d.children != null) {
                {
                    return 6;
                }
                else {
                    return 4;
                }
            })
            .style("fill", function (d, i) {
                if (d.type == "duplication") {
                    return colours[0];
                } else if (d.type == "dubious") {
                    return colours[1];
                } else if (d.type == "speciation") {
                    return colours[2];
                } else if (d.type == "gene_split") {
                    return colours[3];
                } else {
                    return "white";
                }
            })
            .style("stroke-width", function (d, i) {
                if (d.member_id == ref_member) {
                    return "2px";
                } else {
                    return "1px";
                }
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        nodeEnter.append("foreignObject")

            .attr('width', width)
            .attr('height', '52px')
            .attr('x', 10)
            .attr('y', 0)
            .style("fill", "red")
            .append('xhtml:div')
            .style("width", function (d) {
                return parseInt(jQuery("#id" + d.member_id).width()) + 200

            })
            .style("height", "50px")
            .style("z-index", "999")
            .style("top", "10px")
            .style("left", "10px")
            .html(function (d) {
                return jQuery("#id" + d.member_id).parent().html();
            });

        nodeUpdate.select("foreignObject")
            .attr('width', function (d) {
                return parseInt(jQuery("#id" + d.member_id).width()) + 200
            })
            .attr('height', '52px')
            .attr('x', 10)
            .attr('y', -26);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

// Toggle children on click.
    function click(d) {
        if (d.children && d.children != null) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d, ref_member);
    }


    function updateWindow(count) {

        var y = count * 40;

        svg.attr("height", y);
        cluster = d3.layout.cluster()
            .size([y, width - 160]);

    }
}