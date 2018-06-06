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
    console.log("generate_sankey_JSON 2")

    nodes.push({
        "node": 0,
        "type": "homology",
        "name": "reference",
        "value": 2
    })
    console.log("generate_sankey_JSON 3")

    for (var i = 0; i < homology.length; i++) {
        console.log("generate_sankey_JSON 3 1 i "+i)

        homologs.push({
            id: homology[i].target.id,
            species: homology[i].target.species,
            type: homology[i].type,
            source: homology[i].source,
            target: homology[i].target
        });
        console.log("generate_sankey_JSON 3 2 i "+i)
        if (species.indexOf(homology[i].target.species) < 0) {
            species.push(homology[i].target.species);
        }
        console.log("generate_sankey_JSON 3 3 i "+i)
        if (types.indexOf(homology[i].type) < 0) {
            types.push(homology[i].type);
            type_size[homology[i].type] = 1;
        } else {
            type_size[homology[i].type] = type_size[homology[i].type] + 1;
        }
        console.log("generate_sankey_JSON 3 4 i "+i)
    }
    console.log("generate_sankey_JSON 4")

    var node = 1
    console.log("generate_sankey_JSON 5")

    for (var i = 0; i < types.length; i++, node++) {
        nodes.push({
            "node": node,
            "type": "homology",
            "name": types[i],
            "value": homologs.length
        })
    }
    console.log("generate_sankey_JSON 6")

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

    console.log("generate_sankey_JSON 7")

    // for (var i = 0; i < species.length; i++, node++) {
    //     nodes.push({
    //         "node": node,
    //         "type": "species",
    //         "name": species[i]
    //     })
    // }
    console.log("generate_sankey_JSON 8")


    var item;
    var first = [];
    for (var i = 0; i < types.length; i++) {

        var source = 0;

        var target = nodes.find(item => item.name == types[i])

        value = 2
        //if (i % 2 > 0) {
        //    links.push({
        //        "source": target.node,
        //        "target": source,
        //        "value": type_size[target.name]
        //    })
        //    first.push(types[i])
        //} else {
        links.push({
            "source": source,
            "target": target.node,
            "value": type_size[target.name]
        })
        //}
    }

    console.log("generate_sankey_JSON 9")


    for (var i = 0; i < homology.length; i++) {
        var source = nodes.find(item => item.name == homology[i].type)
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

    console.log("generate_sankey_JSON 10")


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
    console.log("generate_sankey_JSON 11")

    var sankey_json = {
        "nodes": nodes,
        "links": links
    }

    console.log("generate_sankey_JSON 12")

    setSankeyExport();
    console.log("generate_sankey_JSON 13")
    setSankeyFilter(types);
    console.log("generate_sankey_JSON 14")
    drawSankey(sankey_json, "#sankey")
    console.log("generate_sankey_JSON 15")

}

function setSankeyExport() {
    jQuery("#export_params").html("")
}

function setSankeyFilter(types) {

    jQuery("#filter_div").html("Show Homology Type : <p>")

    var radios = "<p><input type='radio' name='type_homology' class='sankey-label last clicked' checked value='all'> All</input> </p>"
    for (var i = 0; i < types.length; i++) {
        radios += "<p><input type='radio' name='type_homology' class='sankey-label last clicked' value='" + types[i] + "'> " + types[i] + "</input> </p>"
    }

    jQuery("#filter_div").append(radios)

    //jQuery("#settings_div").append("<p>")
    //
    //jQuery("#settings_div").append("Colour Homology By : <p>" +
    //    "<input type='radio' name='colour_homology' class='sankey-label last clicked' checked id='species-colour-button'> Species</input> <p>" +
    //    "<input type='radio' name='colour_homology' class='sankey-label' id='homology-colour-button'> Homology Type</input> <p>" +
    //    "<input type='radio' name='colour_homology' class='sankey-label' id='coverage-colour-button'> Coverage</input> <p>" +
    //    "<input type='radio' name='colour_homology' class='sankey-label' id='positivity-colour-button'> Positivity</input> <p>" +
    //    "<input type='radio' name='colour_homology' class='sankey-label' id='identity-colour-button'> Identity</input>"
    //)
}

