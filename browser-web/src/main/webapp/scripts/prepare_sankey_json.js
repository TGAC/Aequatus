/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 22/08/2017
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
function generate_sankey_JSON(json) {
    console.log("generate_sankey_JSON 1")
    var homology = json.homology;
    var json_key = Object.keys(homology);
    var homologs = [];
    var species = [];
    var types = [];
    var nodes = [];
    var links = [];
    var type_size = {}

    nodes.push({
        "node": 0,
        "type": "homology",
        "name": "reference",
        "value": 2
    })

    for (var i = 0; i < homology.length; i++) {


        homologs.push({
            id: homology[i].target.id,
            species: homology[i].target.species,
            type: homology[i].type,
            source: homology[i].source,
            target: homology[i].target
        });
        if (species.indexOf(homology[i].target.species) < 0) {
            species.push(homology[i].target.species);
        }
        if (types.indexOf(homology[i].type) < 0) {
            types.push(homology[i].type);
            type_size[homology[i].type] = 1;
        } else {
            type_size[homology[i].type] = type_size[homology[i].type] + 1;
        }
    }

    var node = 1

    for (var i = 0; i < types.length; i++, node++) {
        nodes.push({
            "node": node,
            "type": "homology",
            "name": types[i],
            "value": homologs.length
        })
    }

    for (var i = 0; i < homologs.length; i++, node++) {
        nodes.push({
            "node": node,
            "type": homology[i].type,
            "name": homologs[i].id,
            "species": species.indexOf(homologs[i].species),
            "speciesName": homologs[i].species,
            "source": homologs[i].source,
            "target": homologs[i].target
        })

    }

    for (var i = 0; i < species.length; i++, node++) {
        nodes.push({
            "node": node,
            "type": "species",
            "name": species[i],
        })

    }

    var item;
    var first = [];
    for (var i = 0; i < types.length; i++) {

        var source = 0;

        var target = nodes.find(item => item.name == types[i])

        links.push({
            "source": source,
            "target": target.node,
            "value": type_size[target.name]
        })
    }


    for (var i = 0; i < homology.length; i++) {
        var source = nodes.find(item => item.name == homology[i].type)
        var target = nodes.find(item => item.name == homology[i].target.species)

        if (first.indexOf(homology[i].type) >= 0) {
            links.push({
                "source": target.node,
                "target": source.node,
                "value": 1
            })
        } else {
            links.push({
                "source": source.node,
                "target": target.node,
                "value": 1
            })
        }

    }

    for (var i = 0; i < homology.length; i++) {
        var source = nodes.find(item => item.name == homology[i].target.species)
        var target = nodes.find(item => item.name == homology[i].target.id)

        if (first.indexOf(homology[i].type) >= 0) {
            links.push({
                "source": target.node,
                "target": source.node,
                "value": 1
            })
        } else {
            links.push({
                "source": source.node,
                "target": target.node,
                "value": 1
            })
        }

    }


    // for (var i = 0; i < json_key.length; i++) {
    //     var source = nodes.find(item => item.name == homology[i].target.id)
    //     var target = nodes.find(item => item.name == homology[i].target.species
    // )
    //     links.push({
    //         "source": source.node,
    //         "target": target.node,
    //         "value": 2
    //     })
    // }

    var sankey_json = {
        "nodes": nodes,
        "links": links
    }


    setSankeyExport();
    setSankeyFilter(types);
    drawSankey(sankey_json, "#sankey")

}

function setSankeyExport() {
    jQuery("#export_params").html("")
    var table = jQuery("<table cellpadding='2px'></table>");

    var row1 = jQuery("<tr></tr>");

    var column3 = jQuery("<td></td>");

    column3.html("SVG format <br> <a class='btn btn-small' href='#' onclick='triggerExport(\"#sankey\")'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row1.append(column3)

    var column4 = jQuery("<td></td>");

    column4.html("PNG <br> <a class='btn btn-small' href='#' onclick='triggerExport(\"#sankey\", true)'>  <i class='fa fa-download' style='color: white'></i> </a>")

    row1.append(column4)

    table.append(row1)

    jQuery("#export_params").html(table)

}

function setSankeyFilter(types) {

    jQuery("#filter").html("Show Homology Type : <p>")

    var radios = "<p><input type='radio' name='type_homology' class='sankey-label last clicked' checked value='all'> All</input> </p>"
    for (var i = 0; i < types.length; i++) {
        radios += "<p><input type='radio' name='type_homology' class='sankey-label last clicked' value='" + types[i] + "'> " + types[i] + "</input> </p>"
    }

    jQuery("#filter").append(radios)
    jQuery("#sliderfilter").html("")


}
