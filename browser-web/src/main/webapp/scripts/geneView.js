/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var data = "";

var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)', 'rgb(177,89,40)', 'rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)', 'rgb(188,128,189)', 'rgb(204,235,197)', 'rgb(255,237,111)']
//var colours = ['#A6CEE3', '#1F78B4', '#B2DF8A', '#33A02C', '#FB9A99', '#E31A1C', '#FDBF6F', '#FF7F00', '#CAB2D6', '#6A3D9A', '#FFFF99', '#B15928', '#8DD3C7', '#FFFFB3', '#BEBADA', '#FB8072', '#80B1D3', '#FDB462', '#B3DE69', '#FCCDE5', '#D9D9D9', '#BC80BD', '#CCEBC5', '#FFED6F']


var ref_member = null
var syntenic_data = null;
var chromosomes = null;
var genome_db_id = null;
var genome_name = null;
var chr = null;
var member_id = null;
var members = null;
var members_overview = null;
var chr_len = null;
var chr_name = null;


function getChromosomes(member_id) {
    console.log("getchromosome "+genome_db_id)
    var color = jQuery("option:selected", jQuery("#genomes")).attr("background");
    jQuery(".headerbar").css("background", color);
    jQuery("#chr_maps").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    jQuery("#bar_image_ref").html("")
    jQuery("#selected_region").html("")
    if (member_id == undefined) {
        jQuery("#gene_widget").html("")
        jQuery("#gene_info").html("")
    }


    if(genome_db_id != null){
        Fluxion.doAjax(
            'comparaService',
            'getChromosome',
            {'reference': genome_db_id, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {

                    console.log("getchromosome sucess")
                    chromosomes = json.member;

                    drawChromosome()
                    if (chr == undefined) {
                        setCredentials(chromosomes[0].id, genome_db_id);
                    }
                    Fluxion.doAjax(
                        'comparaService',
                        'getGenomeAndChrName',
                        {'query': genome_db_id, 'chr': chr, 'url': ajaxurl},
                        {
                            'doOnSuccess': function (json) {
                                //window.history.pushState("ref=" + json.genome_name, "Title", "index.jsp?ref=" + json.genome_name + "&chr=" + json.chr_name);
                                genome_name = json.genome_name;
                                chr_name = json.chr_name
                            }
                        });
                    if (member_id == undefined) {
                        getMember();
                    }else if (chr_name ==  null){
                        select_chr()
                    }
                }
            })
    }else if(genome_name != null){
        Fluxion.doAjax(
            'comparaService',
            'getChromosomebyGenomeName',
            {'reference': genome_name, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {

                    console.log("getchromosome sucess")
                    chromosomes = json.member;
                    drawChromosome()
                    if (chr == undefined && chr_name == null) {
                        setCredentials(chromosomes[0].id, genome_db_id);
                    }else {
                        select_chr()
                    }

                    if (member_id == undefined) {
                        getMember();
                    }
                }
            })
    }
}

function drawChromosome() {
    console.log("drawchromosome")

    var max = Math.max.apply(Math, chromosomes.map(function (o) {
        return o.length;
    }));

    jQuery("#chr_maps").html("");

    var referenceLength = chromosomes.length;

    var maxLen = jQuery(window).width();

    var width = 15;
    var distance = (parseInt(maxLen) - (width * referenceLength)) / (referenceLength + 1);

    chromosomes.sort(naturalSort)
    while (referenceLength--) {

        var left = parseInt(referenceLength * (width)) + parseInt(distance * referenceLength) + parseInt(distance);
        var height = (chromosomes[referenceLength].length * 80 / max);
        var length = chromosomes[referenceLength].length;
        var top = parseInt(jQuery("#map").css('top')) + parseInt(jQuery("#map").css('height')) - (height + 20);
        jQuery("<div>").attr({
            'id': 'chr' + chromosomes[referenceLength].id,
            'class': 'refmap',
            'chr_length': chromosomes[referenceLength].length,
            'style': "left: " + left + "px; width:" + width + "px; height:" + height + "px; background: " + jQuery("#genome" + genome_db_id).css("background"),
            'onClick': 'URLgenomeName(genome_name, "' + chromosomes[referenceLength].chr_name + '"), setCredentials("' + chromosomes[referenceLength].id + '",' + genome_db_id + '), getMember();'
        }).appendTo("#chr_maps");
        jQuery("<div>").attr({
            'style': "position: absolute; bottom: 10px; left: " + left + "px; width:" + width + "px; "
        }).html(chromosomes[referenceLength].chr_name).appendTo("#chr_maps");

    }
}

function setCredentials(chr_name, genome_id) {
    console.log("set credential")

    chr = chr_name;
    genome_db_id = genome_id;
    select_chr();
}

function getMember(member) {
    console.log("get member")

    jQuery(".selected").removeClass("selected")
    jQuery("#chr" + chr).addClass("selected")


    if (member_id == undefined) {
        jQuery("#selected_region").html("")
        jQuery("#gene_widget").html("")
        jQuery("#gene_info").html("")
    }
    jQuery("#bar_image_ref").html("<i style=\"text-align: center;\" class=\"fa fa-spinner fa-spin\"></i>")



    if(chr != null){
        Fluxion.doAjax(
            'comparaService',
            'getMember',
            {'chr_name': chr, 'reference': genome_db_id, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {
                    members = json.member;

                    jQuery("#bar_image_ref").html("")
                    sequencelength = json.chr_length;
                    members_overview = json.overview;
                    drawMember()
                    if (member == undefined) {
                        drawSelected();
                    } else {
                        setSelector()
                    }
                    console.log("get member 2")

                }
            });
    }else{
        Fluxion.doAjax(
            'comparaService',
            'getMemberbyChrName',
            {'chr_name': chr_name, 'reference': genome_name, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {
                    members = json.member;
                    chr = json.chr_id

                    jQuery("#bar_image_ref").html("")
                    sequencelength = json.chr_length;
                    members_overview = json.overview;
                    drawMember()
                    if (member == undefined) {
                        drawSelected();
                    } else {
                        setSelector()
                    }
                    console.log("get member 2")

                }
            });
    }

}

function drawMember() {
    console.log("draw member")

    jQuery("#bar_image_ref").html("")
    var width = parseInt(jQuery("#bar_image_selector").css("width"));
    var maxLentemp = parseInt(jQuery("#canvas").css("width"));

    var overview = members_overview;
    var overview_len = overview.length
    var max = Math.max.apply(Math, overview.map(function (o) {
        return o.graph;
    }));
    if (overview_len > 1) {
        while (overview_len--) {
            var startposition = (overview[overview_len].start) * parseFloat(maxLentemp) / sequencelength;
            var stopposition = (overview[overview_len].end - overview[overview_len].start) * parseFloat(maxLentemp) / sequencelength;
            jQuery("<div>").attr({
                'class': "refMarkerShow",
                'style': "LEFT:" + startposition + "px; width :" + stopposition + "px; opacity: " + (overview[overview_len].graph / max) + "; height: 10px;"
            }).appendTo("#bar_image_ref");
        }
    } else {
        var startposition = (overview[0].start) * parseFloat(maxLentemp) / sequencelength;
        var stopposition = (overview[0].end - overview[0].start) * parseFloat(maxLentemp) / sequencelength;
        jQuery("<div>").attr({
            'class': "refMarkerShow",
            'style': "LEFT:" + startposition + "px; width :" + stopposition + "px; opacity: " + (overview[0].graph) + "; height: 10px;"
        }).appendTo("#bar_image_ref");
    }


}


function drawSelected(member) {
    console.log("draw selected")

    jQuery("#selected_region").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    if (member == undefined) {
        jQuery("#gene_widget").html("")
        jQuery("#gene_info").html("")
    }
    var left = parseInt(jQuery("#bar_image_selector").position().left)
    var width = parseInt(jQuery("#bar_image_selector").css("width"));
    var maxLentemp = parseInt(jQuery("#canvas").css("width"));
    var newLeft = left * maxLentemp / sequencelength;
    var newWidth = parseInt(newLeft) + parseFloat(width)
    var start = left * sequencelength / maxLentemp

    var end = parseInt(start) + parseInt(width * sequencelength / maxLentemp)


    var new_data = jQuery.grep(members, function (element, index) {
        //return (element.start >= start && element.end <= end) or (element.start <= start && element.end >= end) ; // retain appropriate elements
        return (element.start >= start && element.end <= end) || (element.start <= start && element.end >= end) || (element.end >= end && element.start <= end) || (element.start <= start && element.end >= start);
    });

    var data_length = new_data.length;

    var maxLentemp = jQuery("#canvas").css("width");
    jQuery("#selected_region").html("")

    while (data_length--) {
        var newStart = new_data[data_length].start
        var newEnd = new_data[data_length].end
        var id = "ref" + new_data[data_length].id;
        var startposition = (newStart - start) * parseFloat(maxLentemp) / parseFloat(end - start);
        var stopposition = (newEnd - newStart + 1) * parseFloat(maxLentemp) / parseFloat(end - start);
        if (stopposition < 1) {
            stopposition = 1;
        }
        jQuery("<div>").attr({
            'id': id,
            'seq_id':new_data[data_length].seq_member_id,
            'start':new_data[data_length].start,
            'end':new_data[data_length].end,
            'class': "refMarkerShow",
            'style': "LEFT:" + startposition + "px; width :" + stopposition + "px;",
            'onMouseOver': "countcoreMember(\"" + new_data[data_length].id + "\")",
            'onMouseOut': "jQuery('#besideMouse').html('')",
            'onClick': "getcoreMember(\"" + new_data[data_length].id + "\")"
        }).appendTo("#selected_region");


    }
    console.log("draw selected 2")


}

function getcoreMember(query, redrawn) {
    console.log("get core member")

    console.log("getcoremember")
    jQuery(".refMarkerShow").removeClass("selected")
    jQuery("#ref" + query).addClass("selected")
    jQuery("#gene_widget").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")
    jQuery("#gene_widget_exons").html("")

    jQuery("#gene_tree_nj").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")

    Fluxion.doAjax(
        'comparaService',
        'getCoreMember',
        {'query': query, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                syntenic_data = json
                //window.history.pushState("ref=" + json.genome_name, "Title", "index.jsp?query=" + syntenic_data.ref.genes.gene.stable_id);
                init(json, "#settings_div", "#filter_div")

                setSelector()

                URLMemberID(json.ref)
                drawSynteny(redrawn);
            }
        });
}


function countcoreMember(query) {
    console.log("count core member")

    Fluxion.doAjax(
        'comparaService',
        'countForCoreMember',
        {'query': query, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                jQuery("#besideMouse").html(json.member)
            }
        });
}


var sort_by = function (field, reverse, primer) {

    var key = primer ?
        function (x) {
            return primer(x[field])
        } :
        function (x) {
            return x[field]
        };

    reverse = [1, 1][+!!reverse];

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }

}

function hitClicked(cigarline1, start, top, length, gene_start, stopposition, Exons) {
    jQuery("#cigar").html("")
    dispCigarLine(cigarline1, start, top, length, gene_start, stopposition, Exons, "#cigar");
}


function reverse_exons(transcript) {
    console.log("reverse exon")

    var exons = [];
    var length = transcript.end - transcript.start;

    transcript._exons = transcript.Exons;

    for (var i = 0; i < transcript._exons.length; i++) {

        exons.push({
            end: parseInt(transcript.start) + parseInt(transcript.end - transcript._exons[i].start) - 1,
            start: parseInt(transcript.start) + parseInt(transcript.end - transcript._exons[i].end) - 1,
            length: transcript._exons[i].length,
            id: transcript._exons[i].id
        })
    }
    return exons;
}

function replaceAt(str, index, character) {
    return str.substr(0, index) + character + str.substr(index + character.length);
}

function onClicked(desc, stable_id, member_id) {
    newpopup(desc, stable_id, member_id)
}


function rearrange_selector(query, start, chr_name) {
    var maxLentemp = parseInt(jQuery("#canvas").css("width"));
    var startposition = (start) * parseFloat(maxLentemp) / jQuery("#chr" + chr_name).attr("chr_length");
    var width = jQuery("#bar_image_selector").width() / 2;

    var left = (startposition - width);
    if (left < 0) {
        left = 0;
    }
    jQuery("#bar_image_selector").animate({"left": left}, 100);
    drawSelected(query)
}

//function browser_coordinates(max) {
//    var temp = "<FONT style=\"BACKGROUND-COLOR: #d3d3d3\">";
//    jQuery("#vertical0").html(temp + Math.round(0));
//    jQuery("#vertical1").html(temp + Math.round(max * 0.1));
//    jQuery("#vertical2").html(temp + Math.round(max * 0.2));
//    jQuery("#vertical3").html(temp + Math.round(max * 0.3));
//    jQuery("#vertical4").html(temp + Math.round(max * 0.4));
//    jQuery("#vertical5").html(temp + Math.round(max * 0.5));
//    jQuery("#vertical6").html(temp + Math.round(max * 0.6));
//    jQuery("#vertical7").html(temp + Math.round(max * 0.7));
//    jQuery("#vertical8").html(temp + Math.round(max * 0.8));
//    jQuery("#vertical9").html(temp + Math.round(max * 0.9));
//    jQuery("#vertical10").html(temp + Math.round(max));
//
//
//}


function stringTrim(string, width) {
    var ruler = jQuery("#ruler");
    var inLength = 0;
    var tempStr = "";

    jQuery("#ruler").html(string);
    inLength = jQuery("#ruler").width();
    if (inLength < width) {
        return string;
    }
    else {
        width = parseInt(string.length * width / inLength);
        return "<span title=" + string + ">" + string.substring(0, width) + "... </span>";
    }
}

function flip_gene(temp_div) {
    if (jQuery("#" + temp_div).hasClass('flip')) {
        jQuery("#" + temp_div).removeClass('flip')
    } else {
        jQuery("#" + temp_div).addClass('flip')
    }
}

function toggleLeftInfo(div, id) {
    if (jQuery(div).hasClass("toggleLeft")) {
        jQuery(div).removeClass("toggleLeft").addClass("toggleLeftDown");
    }
    else {
        jQuery(div).removeClass("toggleLeftDown").addClass("toggleLeft");
    }
    jQuery("#" + id).toggle("blind", {}, 500);
}


function reverse_compliment(sequence) {
    var complimentry = ""

    for (var i = 0; i < sequence.length; i++) {
        if (sequence.charAt(i).toUpperCase() == "A") {
            complimentry = "T" + complimentry
        } else if (sequence.charAt(i).toUpperCase() == "G") {
            complimentry = "C" + complimentry
        } else if (sequence.charAt(i).toUpperCase() == "C") {
            complimentry = "G" + complimentry
        } else if (sequence.charAt(i).toUpperCase() == "T") {
            complimentry = "A" + complimentry
        }
    }
    return complimentry;
}



function drawSynteny(redrawn) {
    console.log("draw synteny")


    jQuery("#gene_widget").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")
    jQuery("#gene_widget_exons").html("")



    drawTree(syntenic_data.tree, "#gene_tree_nj", newpopup)
    checkVisuals();



}

function select_member() {
    jQuery(".refMarkerShow").removeClass("selected")
    jQuery("#ref" + member_id).addClass("selected")
}

function select_chr() {
    jQuery('div[id^="chr"]').removeClass("selected")
    jQuery("#chr" + chr).addClass("selected")
    if(chr_name == null){
        Fluxion.doAjax(
            'comparaService',
            'getGenomeAndChrName',
            {'query': genome_db_id, 'chr': chr, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {
                    chr_name = json.chr_name
                    //window.history.pushState("ref=" + genome_name, "Title", "index.jsp?ref=" + genome_name + "&chr=" + chr_name);
                }
            });
    }

}

function select_genome() {
    console.log("select genome")

    Fluxion.doAjax(
        'comparaService',
        'getGenomeName',
        {'query': genome_db_id, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                jQuery("#genome_name").html(json.genome_name);
                genome_name = json.genome_name
            }
        });
}







function setSelector(){
    console.log("setSelector")

    var maxLentemp = parseInt(jQuery("#canvas").css("width"));

    //var sequencelength = chr_length="63644993"

    console.log("setSelector 1")


    var start = syntenic_data.member[syntenic_data.ref].Transcript[0].start
    console.log("setSelector 2")


    var left = start * maxLentemp / sequencelength;

    var width = parseInt(jQuery("#bar_image_selector").css("width"));
    console.log("setSelector 3")

    left = left - width/2

    jQuery("#bar_image_selector").animate({left: left+'px'} , function() {
        drawSelected();
        jQuery(".refMarkerShow").removeClass("selected")
        console.log("setSelector "+syntenic_data.member[syntenic_data.ref].member_id)

        jQuery("[seq_id="+syntenic_data.member[syntenic_data.ref].member_id+"]").addClass("selected")
        jQuery("#chr"+syntenic_data.member[syntenic_data.ref].reference).addClass("selected")
    });
}


function makeMeTop(new_gene_id, new_protein_id) {
    console.log("makeMeTop")
    console.log(new_gene_id)
    console.log(new_protein_id)


    if (new_gene_id != member_id || new_protein_id != protein_member_id) {

        URLMemberID(new_gene_id)

        changeReference(new_gene_id, new_protein_id)

        removePopup();
        console.log(genome_db_id)
        if (genome_db_id != syntenic_data.member[syntenic_data.ref].species) {
            console.log(syntenic_data.member[syntenic_data.ref])
            genome_name = syntenic_data.member[syntenic_data.ref].species;
            console.log(genome_name)

            genome_db_id = null
            chr_name = syntenic_data.member[syntenic_data.ref].reference
            chr = null
            console.log(chr_name)

            getChromosomes(new_gene_id);
            members = undefined
            getMember(new_gene_id);
            jQuery("#genome_name").html(genome_name);
        } else if (chr != syntenic_data.member[syntenic_data.ref].reference) {
            chr_name = syntenic_data.member[syntenic_data.ref].reference
            chr = null
            members = undefined
            getMember(new_gene_id);
            //select_chr();
        }
    }

}

