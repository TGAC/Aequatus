/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 30/07/2014
 * Time: 13:16
 * To change this template use File | Settings | File Templates.
 */


function drawTree(json_tree) {

    console.log("draw tree")

    console.log(json_tree)
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = jQuery(document).width() * 0.9,
        height = 800 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.y, d.x];
        });

    var svg = d3.select("#gene_tree_nj").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(json_tree, function () {

        root = json_tree;

//        console.log(root.children)
        root.x0 = height / 2;
        root.y0 = 0;

        function collapse(d) {
            console.log("collpase")
            console.log(d)
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

//        root.children.forEach(collapse);

        update(root);
    });

    d3.select(self.frameElement).style("height", "800px");


    function update(source) {
        console.log("update")
        // Compute the new tree layout.
        var nodes = tree.nodes(root),
            links = tree.links(nodes);

        var max = 0;
        // Normalize for fixed-depth.

        nodes.forEach(function (d) {
        if(max < d.depth){
            max = d.depth;
        }
        });

        nodes.forEach(function (d, i) {
            if (d.children.size() == 0) {
                console.log("if "+i+" "+ d.id)
                d.y = 100;
            }else{
                console.log("else "+i+" "+ d.id)

                d.y = d.depth * 100/ max;

            }

        });

        var i = 1;
        nodes.forEach(function (d, j) {
            if (d.children.size() == 0) {
                d.x = i * 50;
                i++;
            }   else{
                d.x = (i + 0.5) * 50;
            }
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });


        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                console.log(source)
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
//            .text(function (d) {
//                return d.data;
//            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
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
            .append('xhtml:div')
            .style("width", width)
            .style("height", "50px")
            .html(function (d) {
                return jQuery("#id" + d.data).parent().html();
            });

        nodeUpdate.select("foreignObject")

            .attr('width', '1200px')
            .attr('height', '52px')
            .attr('x', 10)
            .attr('y', 0);


//        nodeEnter.append("rect")
////                .attr('pointer-events', 'none')
////                .attr("class", "tooltip")
////                .style("opacity", 1)
////                .html("FIRST LINE <br> SECOND LINE")
//            .attr("x", "0px")
//            .attr("width", "100px")
//            .style("fill", "red")
//            .style("stroke", "red")
//            .attr("y",(d.y +"px"))
//            .attr("height", "10px")
////
//            nodeEnter.append("div")
////                .data(nodes)
//                .attr('pointer-events', 'none')
//                .attr("class", "tooltip")
//                .style("opacity", 1)
//                .html("FIRST LINE <br> SECOND LINE")
//                .style("left", "0px")
//                .style("top", ("0px"));
////


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
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}