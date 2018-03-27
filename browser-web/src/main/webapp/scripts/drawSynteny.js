/**
 * Created by thankia on 27/03/2018.
 */
/**
 * Draw Synteny divs per species
 * @param json
 */

var colours = ['#8c510a','#bf812d','#dfc27d','#80cdc1','#35978f','#01665e','#c51b7d','#de77ae','#f1b6da','#b8e186','#7fbc41','#4d9221','#762a83','#9970ab','#c2a5cf','#a6dba0','#5aae61','#1b7837','#b35806','#e08214','#fdb863','#b2abd2','#8073ac','#542788','#b2182b','#d6604d','#f4a582','#92c5de','#4393c3','#2166ac','#b2182b','#d6604d','#f4a582','#d73027','#f46d43','#fdae61','#abd9e9','#74add1','#4575b4','#d73027','#f46d43','#fdae61','#fee08b','#a6d96a','#66bd63','#1a9850','#d53e4f','#f46d43','#fdae61','#abdda4','#66c2a5','#3288bd']

function drawSynteny(json) {

    var synteny = json.synteny;
    var ref_species = json.refSpecies;
    var top = 0;

    for (var species in synteny) {
        var val = synteny[species];
        if(species == ref_species){
            jQuery("#selected_region").append("<div id = '" + species + "_synteny' style='position:relative;  cursor:pointer; height: 20px; top: 0px; LEFT: 0px; width :100%;'></div>");
        }else{
            jQuery("#synteny").append("<div id = '" + species + "_synteny' style='position:relative;  cursor:pointer; height: 20px; top: "+ top+"px;  LEFT: 0px; width :100%;'></div>");
        }
        jQuery("#" + species + "_synteny").svg();
        dispGenesForSpecies("#" + species + "_synteny", species, val, ref_species);
    }

}

function dispGeneinSynteny(g, svg, genes, species, ref_species) {
    var strokeWidth = 2;

    var marginTop = strokeWidth * 2

    var marginLeft = strokeWidth

    var height = jQuery("#" + species + "_synteny").height() - marginTop;


    var all_genes = genes.genes.before

    all_genes.push(genes.ref)

    all_genes = all_genes.concat(genes.genes.after)

    var margin = 10;

    var space = margin * (all_genes.length)

    var maxLentemp = (jQuery(window).width() * 0.9);


    var width = (maxLentemp - space) / (all_genes.length)

    if (all_genes.length > 0) {


        var genes_len = all_genes.length;
        var startposition = 0;
        var stopposition = 0;


        all_genes.sort(sort_by('seq_region_start', true, parseInt));
        if (genes.ref.seq_region_strand == 1) {

        }else{
            all_genes.reverse();
        }

        for (var gene = 0; gene < all_genes.length; gene++) {

            if (all_genes[gene] != undefined) {

                var stroke = "black"

                if(all_genes[gene].gene_id == genes.ref.gene_id){
                    stroke = "red"
                }

                startposition = (gene * (width + margin)) + marginLeft
                stopposition = width;

                var syntenic_class = "syntenyGene"
                var bg_colour = "white"

                if (species == ref_species) {
                    bg_colour = colours[gene]
                }

                if (species != ref_species && all_genes[gene].homology.length > 0) {
                    bg_colour = getColour(all_genes[gene].homology.join(" "), ref_species)
                    strokeWidth = 2;
                    syntenic_class = "syntenyGene"
                    if (bg_colour == undefined) {
                        bg_colour = "white"
                        strokeWidth = 1;
                        syntenic_class = "nomatch"
                    }
                }
                var rectWidth = (startposition + stopposition)

                var breakingPoint = (startposition + stopposition) - (height / 2)

                if (all_genes[gene].seq_region_strand == genes.ref.seq_region_strand) {


                    var gene_svg = svg.polygon(g,
                        [[startposition, strokeWidth], [startposition, height], [breakingPoint, height], [rectWidth, height / 2], [breakingPoint, strokeWidth]],
                        {
                            id: "exon" + gene + "_" + species,
                            class: syntenic_class+" " + all_genes[gene].gene_id + " " + all_genes[gene].homology.join(" "),
                            homology: all_genes[gene].homology.join(" "),
                            onmouseover: 'highlightSynteny("#exon' + +gene + '_' + species + '","' + ref_species + '")',
                            onmouseout: 'defaultSynteny()',
                            title: all_genes[gene].description,
                            fill: bg_colour, stroke: stroke, strokeWidth: strokeWidth
                        });
                    svg.title(gene_svg, all_genes[gene].description);

                }
                else {
                    var rectWidth = (startposition + stopposition)

                    var gene_svg = svg.polygon(g,
                        [[startposition, height / 2], [(startposition + height / 2), strokeWidth], [rectWidth, strokeWidth], [rectWidth, height], [(startposition + height / 2), height]],
                        {
                            id: "exon" + gene + "_" + species,
                            class: syntenic_class+" " + all_genes[gene].gene_id + " " + all_genes[gene].homology.join(" "),
                            homology: all_genes[gene].homology.join(" "),
                            onmouseover: 'highlightSynteny("#exon' + gene + '_' + species + '","' + ref_species + '")',
                            onmouseout: 'defaultSynteny()',
                            title: all_genes[gene].description,
                            fill: bg_colour, stroke: stroke, strokeWidth: strokeWidth
                        });
                    svg.title(gene_svg, all_genes[gene].description);

                }




            }

        }

    }


}

function highlightSynteny(id, ref_species) {
    var cssClass = jQuery(id).attr('class').split(" ");
    if(cssClass[0] == "syntenyGene"){
        cssClass.shift()

        for (var i = 0; i < cssClass.length; i++) {
            jQuery("." + cssClass[i]).attr( "stroke-width", 3 )
        }
    }
}

function defaultSynteny() {
    jQuery(".syntenyGene").attr( "stroke-width", 2 )
}

function getColour(cssClass, ref_species) {
    cssClass = cssClass.split(" ")
    var colour = undefined;

    for (i = 0; i < cssClass.length; i++) {
        colour = jQuery("#" + ref_species + "_synteny ." + cssClass[i]).attr("fill")
        if (colour != undefined) {
            break;
        }
    }

    return colour;

}
/**
 * draw gene base line for specified species
 * @param div base div for genes
 * @param species species name
 * @param genes gene list
 * @param ref_species reference species name
 */

function dispGenesForSpecies(div, species, genes, ref_species) {
    var strokeWidth = 2;

    var lineHeight = (jQuery(div).height() - strokeWidth) / 2;

    var svg = jQuery(div).svg("get")

    var maxLentemp = jQuery(window).width() * 0.9;

    var label = species;

    var border = " border-left: 1px solid #000000; border-right: 1px solid #000000;";

    var baseColour = "gray"

    if(species == ref_species){
        baseColour = "red"
    }

    svg.text(parseInt(maxLentemp) + 10, 10, label, {
        fontFamily: 'Verdana',
        fontSize: 10,
        // textAnchor: baseColour,
        fill: baseColour,
        class: "geneinfo genelabel genetext"
    });


    svg.line(0, lineHeight, maxLentemp, lineHeight, {
        id: 'id' + species + '_line',
        stroke: baseColour,
        strokeWidth: strokeWidth
    });


    var g = svg.group({class: 'style1'});

    dispGeneinSynteny(g, svg, genes, species, ref_species);

}

