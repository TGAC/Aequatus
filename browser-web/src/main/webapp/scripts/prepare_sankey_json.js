/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 22/08/2017
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
function generate_sankey_JSON(json) {
    var ortho = json.orthology;
    // ortho = ortho.slice(0,15);

    var json_key = Object.keys(ortho);
    // json_key = json_key.slice(0, 15);
    var orthologs = [];
    var species = [];
    var types = [];
    var nodes = [];
    var links = [];

    nodes.push({
        "node": 0,
        "type": "orthologs",
        "name": "reference",
        "value": 2
    })

    for (var i = 0; i < json_key.length; i++) {
        orthologs.push(ortho[json_key[i]].target.id);
        if (species.indexOf(ortho[json_key[i]].target.species) < 0) {
            species.push(ortho[json_key[i]].target.species);
        }
        if (types.indexOf(ortho[json_key[i]].type) < 0) {
            types.push(ortho[json_key[i]].type);
        }
    }
    var node = 1

    for (var i = 0; i < types.length; i++, node++) {
        nodes.push({
            "node": node,
            "type": "orthology",
            "name": types[i],
            "value": 2
        })
    }

    for (var i = 0; i < orthologs.length; i++, node++) {
        nodes.push({
            "node": node,
            "type": "orthologs",
            "name": orthologs[i],
            "value": 2
        })
    }
    // for (var i = 0; i < species.length; i++, node++) {
    //     nodes.push({
    //         "node": node,
    //         "type": "species",
    //         "name": species[i]
    //     })
    // }


    var item;
    var first = [];
    for (var i = 0; i < types.length; i++) {

        var source =  0;

        var target =  nodes.find(item => item.name == types[i]
    )

        if(i%2 > 0){
            console.log("if " +source +" => "+ target.node)
            links.push({
                "source": target.node,
                "target": source,
                "value": 2
            })
            first.push(types[i])
        }else{
            console.log("else "+target.node +" => "+ source)

            links.push({
                "source": source,
                "target": target.node,
                "value": 2
            })
        }
    }
    console.log(first)

    for (var i = 0; i < json_key.length; i++) {
        var source = nodes.find(item => item.name == ortho[json_key[i]].type)
        var target = nodes.find(item => item.name == ortho[json_key[i]].target.id
    )

        if(first.indexOf(ortho[json_key[i]].type)>=0){
            console.log(ortho[json_key[i]].type)
            console.log(target.node+" => "+source.node)
            console.log(ortho[json_key[i]].node)
            links.push({
                "source": target.node,
                "target": source.node,
                "value": 2
            })
        }else{
            links.push({
                "source": source.node,
                "target": target.node,
                "value": 2
            })
        }

    }

    // for (var i = 0; i < json_key.length; i++) {
    //     var source = nodes.find(item => item.name == ortho[json_key[i]].target.id)
    //     var target = nodes.find(item => item.name == ortho[json_key[i]].target.species
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
    console.log(JSON.stringify(sankey_json))
    drawSankey(sankey_json, "#sankey")

}

function setSankeyExport(){
    jQuery("#export_params").html("")
}

function setSankeyFilter(){
    jQuery("#export_params").html("")
}

