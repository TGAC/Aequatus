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

        update(root, member_id);
    });

    d3.select(self.frameElement).style("height", "800px");


//    var gradient = svg.append("svg:defs")
//        .append("svg:linearGradient")
//        .attr("id", "gradient")
//        .attr("x1", "0%")
//        .attr("y1", "0%")
//        .attr("x2", "100%")
//        .attr("y2", "100%")
//        .attr("spreadMethod", "pad");
//
//// Define the gradient colors
//    gradient.append("svg:stop")
//        .attr("offset", "0%")
//        .attr("stop-color", "#a00000")
//        .attr("stop-opacity", 1);
//
//    gradient.append("svg:stop")
//        .attr("offset", "100%")
//        .attr("stop-color", "#aaaa00")
//        .attr("stop-opacity", 1);


    function update(source, ref_member) {
        var view_type = null
        if (jQuery('input[name=view_type]:checked').val() == "with") {
            view_type = true;
        }
        else {
            view_type = false;
        }

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
        var links = cluster.links(nodes);

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
                if (d.seq_member_id) {
//                    console.log("here")
                    newpopup(d.seq_member_id)
//
                } else {
                    if (d.children && d.children != null) {
                        if (d.children.size() > 0) {
                            click(d)
                        }
                    } else {
                        if (d._children.size() > 0) {
                            click(d)
                        }
                    }
                }
            })


        nodeEnter.append("circle")
            .attr("r", function (d) {
                if (d.close && d.close == true) {
                    return 6;
                } else if (d.seq_member_id == ref_member)// && d.children != null) {
                {
                    return 6;
                }
                else {
                    return 4;
                }
            })
            .style("fill", function (d, i) {
                if (d.close && d.close == true) {
                    return 'url(#gradient)';
                } else if (d.node_type == "duplication") {
                    return colours[0];
                } else if (d.node_type == "dubious") {
                    return colours[1];
                } else if (d.node_type == "speciation") {
                    return colours[2];
                } else if (d.node_type == "gene_split") {
                    return colours[3];
                } else {
                    return "white";
                }
            })
            .style("stroke-width", function (d, i) {
                if (d.seq_member_id == ref_member) {
                    return "2px";
                } else {
                    return "1px";
                }
            })
            .style("stroke", function (d, i) {
                if (d.seq_member_id == ref_member) {
                    return "black";
                }
            });

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", function (d) {
                console.log(d.seq_member_id+" "+ref_member)
                if (d.close && d.close == true) {
                    return 6;
                } else if (d.seq_member_id == ref_member)// && d.children != null) {
                {
                    return 6;
                }
                else {
                    return 4;
                }
            })
            .attr("id", function (d) {
                if (d.seq_member_id) {
                    return "circle" + d.seq_member_id
                }
            })
            .style("fill", function (d, i) {
                if (d.close && d.close == true) {
                    console.log(d.type)
                    d.type = unique(d.type)
                    console.log(d.type)

                    if (d.type.size() == 1) {
                        console.log("1")

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
                    } else if (d.type.size() == 2) {
                        console.log("2")

                        var col1, col2;

                        col1 = function () {
                            if (d.type[0] == "duplication") {
                                return colours[0];
                            } else if (d.type[0] == "dubious") {
                                return colours[1];
                            } else if (d.type[0] == "speciation") {
                                return colours[2];
                            } else if (d.type[0] == "gene_split") {
                                return colours[3];
                            } else {
                                return "white";
                            }
                        }

                        col2 = function () {
                            if (d.type[1] == "duplication") {
                                return colours[0];
                            } else if (d.type[1] == "dubious") {
                                return colours[1];
                            } else if (d.type[1] == "speciation") {
                                return colours[2];
                            } else if (d.type[1] == "gene_split") {
                                return colours[3];
                            } else {
                                return "white";
                            }
                        }

                        var gradient = svg.append("svg:defs")
                            .append("svg:linearGradient")
                            .attr("id", "gradient1")
                            .attr("x1", "0%")
                            .attr("y1", "0%")
                            .attr("x2", "0%")
                            .attr("y2", "100%")
                            .attr("spreadMethod", "pad");

// Define the gradient colors
                        gradient.append("svg:stop")
                            .attr("offset", "25%")
                            .attr("stop-color", col1)
                            .attr("stop-opacity", 1);

                        gradient.append("svg:stop")
                            .attr("offset", "75%")
                            .attr("stop-color", col2)
                            .attr("stop-opacity", 1);

                        return 'url(#gradient1)';

                    } else if (d.type.size() == 3) {
                        var col1, col2, col3;

                        col1 = function () {
                            if (d.type[0] == "duplication") {
                                return colours[0];
                            } else if (d.type[0] == "dubious") {
                                return colours[1];
                            } else if (d.type[0] == "speciation") {
                                return colours[2];
                            } else if (d.type[0] == "gene_split") {
                                return colours[3];
                            } else {
                                return "white";
                            }
                        }

                        col2 = function () {
                            if (d.type[1] == "duplication") {
                                return colours[0];
                            } else if (d.type[1] == "dubious") {
                                return colours[1];
                            } else if (d.type[1] == "speciation") {
                                return colours[2];
                            } else if (d.type[1] == "gene_split") {
                                return colours[3];
                            } else {
                                return "white";
                            }
                        }


                        col3 = function () {
                            if (d.type[2] == "duplication") {
                                return colours[0];
                            } else if (d.type[2] == "dubious") {
                                return colours[1];
                            } else if (d.type[2] == "speciation") {
                                return colours[2];
                            } else if (d.type[2] == "gene_split") {
                                return colours[3];
                            } else {
                                return "white";
                            }
                        }

                        var gradient = svg.append("svg:defs")
                            .append("svg:linearGradient")
                            .attr("id", "gradient2")
                            .attr("x1", "0%")
                            .attr("y1", "0%")
                            .attr("x2", "0%")
                            .attr("y2", "100%")
                            .attr("spreadMethod", "pad");

// Define the gradient colors
                        gradient.append("svg:stop")
                            .attr("offset", "15%")
                            .attr("stop-color", col1)
                            .attr("stop-opacity", 1);

                        gradient.append("svg:stop")
                            .attr("offset", "50%")
                            .attr("stop-color", col2)
                            .attr("stop-opacity", 1);

                        gradient.append("svg:stop")
                            .attr("offset", "85%")
                            .attr("stop-color", col3)
                            .attr("stop-opacity", 1);

                        return 'url(#gradient2)';

                    }
                }
                else if (d.node_type == "duplication") {
                    return colours[0];
                } else if (d.node_type == "dubious") {
                    return colours[1];
                } else if (d.node_type == "speciation") {
                    return colours[2];
                } else if (d.node_type == "gene_split") {
                    return colours[3];
                } else {
                    return "white";
                }
            })
            .style("stroke-width", function (d, i) {
                if (d.seq_member_id == ref_member) {
                    return "2px";
                } else {
                    return "1px";
                }
            });

//        nodeUpdate.select("text")
//            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

//        nodeExit.select("text")
//            .style("fill-opacity", 1e-6);

        nodeEnter.filter(function (d) {
            if (d.seq_member_id) {
                return true; //This item will be included in the selection
            } else {
                return false; //This item will be excluded, e.g. "cheese"
            }
        }).append("foreignObject")
            .attr("class", "node_gene_holder")
            .attr("id", function (d) {
                return "node_gene_holder" + d.seq_member_id
            })
            .attr('width', width)
            .attr('height', '40px')
            .attr('x', 20)
            .attr('y', -20)
            .style("fill", "red")

            .append('xhtml:div')
            .style("width", function (d) {
                return jQuery(document).width() * 0.8;

            })
            .style("height", "50px")
            .style("z-index", "999")
            .style("position", "fixed")
            .style("left", "10px")
            .style("top", "10px")
            .html(function (d) {
                if (view_type == true) {
                    return "<div id = 'id" + d.seq_member_id + "' style='position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width :100%;'></div>";//jQuery("#gene_widget #id" + d.seq_member_id).html();
                } else {
                    return "<div id = 'id" + d.seq_member_id + "' style='position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width :100%;'></div>";//jQuery("#gene_widget #id" + d.seq_member_id).html();

                }
            });

        nodeEnter.filter(function (d) {
            if (d.seq_member_id && d.seq_member_id == ref_member) {
                dispGenesForMember_id(d.seq_member_id)
                dispGenesExonForMember_id(d.seq_member_id)
            } else if (d.seq_member_id && syntenic_data.member[d.seq_member_id]) {
                dispGenesForMember_id(d.seq_member_id, true)
                dispGenesExonForMember_id(d.seq_member_id, true)
            }
        });

        nodeUpdate.select("foreignObject")
            .attr('width', function (d) {
                return jQuery(document).width() * 0.8;
            })
            .attr('height', '40px')
            .attr('x', 10)
            .attr('y', -20);

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
        console.log("click")
        if (d.close && d.close == true) {
            d.children = d._children;
            d.type = [];
            d._children = null;
            d.close = false
        } else {
            if (d.children && d.children != null) {
                if (d.children.size() == 1) {
                    d._children = d.children;
                    var new_children = pack(d)
                    d.children = new_children.child;
                    d.close = true
                    d.type = new_children.type;
                } else {
                    d._children = d.children;
                    d.children = null;
                }
            } else {
                d.children = d._children;
                d._children = null;
            }
        }
        update(d, ref_member);

    }


    function updateWindow(count) {

        var y = count * 40;

        svg.attr("height", y);
        cluster = d3.layout.cluster()
            .size([y, width - 160]);
    }

    function pack(d) {

        console.log("pack")


        var cont = true;
        var child = d;
        var new_children = {}
        new_children.type = []
        var children = null;

        while (cont) {
            if (child.children && child.children.size() == 1) {
                child = (child.children[0])
                if (child.type) {
                    new_children.type = new_children.type.concat(child.type)
                } else {
                    new_children.type.push(child.node_type)
                }
            } else {
                if (child.children) {
                    children = child.children
                }
                else {
                    children = child.parent.children
                }
                cont = false;
                break;
            }
        }

        new_children.child = children;
        return new_children;
    }
}

function changeToNormal() {
    jQuery(".style1").show()
    jQuery(".style2").hide()

}
function changeToExon() {
    jQuery(".style2").show()
    jQuery(".style1").hide()
}

function changeToStable() {
    jQuery(".genelabel").hide();
    jQuery(".stable").show();
}

function changeToGeneInfo() {
    jQuery(".genelabel").hide();
    jQuery(".geneinfo").show();
}

function unique(list) {
    var result = [];
    jQuery.each(list, function (i, e) {
        if (jQuery.inArray(e, result) == -1) result.push(e);
    });
    return result;
}