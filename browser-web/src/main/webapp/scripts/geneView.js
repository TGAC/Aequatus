/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var data = "";

var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)', 'rgb(177,89,40)', 'rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)', 'rgb(188,128,189)', 'rgb(204,235,197)', 'rgb(255,237,111)']


var gapped_seq_list = [];
var gene_list_array = [];
var cigar_list = [];
var ref_member = null
var syntenic_data = null;


function getChromosomes(genome_db_id, chr, member_id) {


    var color = jQuery("option:selected", jQuery("#genomes")).attr("background");
    jQuery(".headerbar").css("background", color);
    jQuery("#chr_maps").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    jQuery("#bar_image_ref").html("")
    jQuery("#selected_region").html("")
    if (member_id == undefined) {
        jQuery("#gene_widget").html("")
        jQuery("#gene_info").html("")
    }


    Fluxion.doAjax(
        'comparaService',
        'getChromosome',
        {'reference': genome_db_id, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            var max = Math.max.apply(Math, json.member.map(function (o) {
                return o.length;
            }));

            jQuery("#chr_maps").html("");

            var referenceLength = json.member.length;

            var maxLen = jQuery(window).width();

            var width = 15;
            var distance = (parseInt(maxLen) - (width * referenceLength)) / (referenceLength + 1);

            json.member.sort(naturalSort)

            while (referenceLength--) {

                var left = parseInt(referenceLength * (width)) + parseInt(distance * referenceLength) + parseInt(distance);
                var height = (json.member[referenceLength].length * 80 / max);
                var length = json.member[referenceLength].length;
                var top = parseInt(jQuery("#map").css('top')) + parseInt(jQuery("#map").css('height')) - (height + 20);
                jQuery("<div>").attr({
                    'id': 'chr' + json.member[referenceLength].name,
                    'class': 'refmap',
                    'chr_length': json.member[referenceLength].length,
                    'style': "left: " + left + "px; width:" + width + "px; height:" + height + "px; background: " + jQuery("#genome" + genome_db_id).css("background"),
                    'onClick': 'getMember("' + json.member[referenceLength].name + '",' + genome_db_id + ')'
                }).appendTo("#chr_maps");
                jQuery("<div>").attr({
                    'style': "position: absolute; bottom: 0px; left: " + left + "px; width:" + width + "px; "
                }).html(json.member[referenceLength].name).appendTo("#chr_maps");


            }

            if (member_id == undefined) {
                getMember(json.member[0].name, genome_db_id);
            } else {
                getMember(chr, genome_db_id, member_id);

            }

        }
        }
    )
}
function getMember(chr_name, genome_db, member_id) {

    jQuery(".selected").removeClass("selected")

    jQuery("#chr" + chr_name).addClass("selected")


    if (member_id == undefined) {
        jQuery("#selected_region").html("")
        jQuery("#gene_widget").html("")
        jQuery("#gene_info").html("")
    }

    jQuery("#bar_image_ref").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    Fluxion.doAjax(
        'comparaService',
        'getMember',
        {'chr_name': chr_name, 'reference': genome_db, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            data = json.member;

            jQuery("#bar_image_ref").html("")
            sequencelength = json.chr_length;
            var width = parseInt(jQuery("#bar_image_selector").css("width"));
            var maxLentemp = parseInt(jQuery("#canvas").css("width"));

            var overview = json.overview;
            var overview_len = overview.length
            var max = Math.max.apply(Math, overview.map(function (o) {
                return o.graph;
            }));

            while (overview_len--) {
                var startposition = (overview_len) * parseFloat(maxLentemp) / 200;
                var stopposition = parseFloat(maxLentemp) / 200;
                jQuery("<div>").attr({
                    'class': "refMarkerShow",
                    'style': "LEFT:" + startposition + "px; width :" + stopposition + "px; opacity: " + (overview[overview_len].graph / max) + "; height: 10px;"
                }).appendTo("#bar_image_ref");
            }

            if (member_id == undefined) {
                drawSelected();
            } else {
                var start = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == member_id) {
                        start = data[i].start;
                    }
                }
                rearrange_selector(member_id, start, chr_name);
            }
        }
        });
}

function kickOff() {

    jQuery(document).mousemove(function (e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    var name = arguments.callee.toString();
    var testTextBox = jQuery('#search');
    var code = null;
    testTextBox.keypress(function (e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            search_member(jQuery('#search').val());
        }
    });


    jQuery("#bar_image_ref").click(function (e) {
        dragtohere(e);
    });

    jQuery("#bar_image_selector").draggable(
        {
            axis: "x",
            containment: "parent",
            stop: function () {
                drawSelected();
            }
        });


    jQuery("#control_panel").draggable(
        {
            axis: "y",
            containment: "parent",
            handle: "#control_panel_handle"
        });


    function dragtohere(e) {
        var left = parseFloat(e.pageX);// - jQuery('#canvas').offset().left);
        var width = jQuery("#bar_image_selector").width()
        left -= width / 2
        jQuery("#bar_image_selector").animate({"left": left});
        drawSelected()
    }
}

function drawSelected(member) {


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


    var new_data = jQuery.grep(data, function (element, index) {
        return element.start >= start && element.start <= end; // retain appropriate elements
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
            'class': "refMarkerShow",
            'style': "LEFT:" + startposition + "px; width :" + stopposition + "px;",
            'onClick': "getcoreMember(\"" + new_data[data_length].id + "\")"
        }).appendTo("#selected_region");


    }

    if (member == undefined) {

    } else {
        jQuery(".refMarkerShow").css("background", "black")
        jQuery("#ref" + member).css("background", "red")
    }
}

function getcoreMember(query, redrawn) {
    jQuery(".refMarkerShow").css("background", "black")
    jQuery("#ref" + query).css("background", "red")
    jQuery("#gene_widget").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")
    jQuery("#gene_widget_exons").html("")

    jQuery("#gene_tree_nj").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")

    Fluxion.doAjax(
        'comparaService',
        'getCoreMember',
        {'query': query, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            syntenic_data = json

            drawSynteny();
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

function formatCigar(ref_exons, hit_cigar, colours, ref_cigar, reverse, ref_strand) {

    var no_of_exons = ref_exons.length
    var hit_cigar_arr = [];
    var ref_exon_array = [];
    var last_pos = 0;
    var i = 0
    var j = 0;
    while (i < no_of_exons) {
        var ref_exon = ref_exons[i].length;
        if (parseInt(ref_exons[i].length) > 0) {
            ref_exon_array.push(ref_exon)
        }
        i++;
    }

    var a = 0;
    var p = 0;

    var cigar_string = "";
    ref_cigar = ref_cigar.replace(/([SIXMND])/g, ":$1,");
    var cigars_array = ref_cigar.split(',');

    for (var i = 0; i < cigars_array.length - 1; i++) {

        var cigar = cigars_array[i].split(":");
        var key = cigar[1];
        var length = cigar[0] * 3;
        if (!length) {
            length = 3
        }
        while (length--) {
            cigar_string += key;
        }

        cigar_string += "";
    }

    var i = 0
    var total_len = 0;
    var flag = false;
    var cigar_string_match = cigar_string.replace(/D/g, '');
    while (i < ref_exon_array.length) {
        if (flag == false) {
            if (parseInt(total_len) + parseInt(ref_exon_array[i]) < cigar_string_match.length) {
                total_len += ref_exon_array[i];
            }
            else {
                ref_exon_array[i] = cigar_string_match.length - total_len;
                total_len = cigar_string_match.length;
                flag = true;
            }
        } else {
            ref_exon_array[i] = 0;
        }
        i++;
    }


    if (reverse) {
        ref_exon_array = ref_exon_array.reverse();
        var sum = 0;

        for (i = 0; i < ref_exon_array.length; i++) {
            sum += Number(ref_exon_array[i]);
        }
        var ref_cigar = cigar_string.replace(/D/g, "").length
        if (sum > ref_cigar) {
            ref_exon_array[0] = ref_exon_array[0] - (sum - ref_cigar)
        }
    }
    if (reverse && ref_strand == 1) {
        cigar_string = cigar_string.split("").reverse().join("");
        hit_cigar = hit_cigar.split("").reverse().join("");
    }


    while (j < cigar_string.length) {
        if (cigar_string.charAt(j) == 'D') {
            if (hit_cigar.charAt(j) == 'M') {
                hit_cigar = replaceAt(hit_cigar, j, "_");
            }
        }
        j++;
    }

    var j = 0;

    var b = 0;

    var temp_array = [];
    while (j < cigar_string.length) {
        if (cigar_string.charAt(j) == 'M') {
            if (a == ref_exon_array[p]) {
                p++;
                hit_cigar_arr.push(hit_cigar.substr(last_pos, b));
                temp_array.push(b + " : " + p)
                a = 0;
                last_pos += b;
                b = 0;
            }
            a++;
        }
        b++;
        j++;
    }

    hit_cigar_arr.push(hit_cigar.substr(last_pos, b));
    return hit_cigar_arr.join("-");

}

function reverse_exons(transcript) {
    var exons = [];
    var length = transcript.end - transcript.start;

    transcript._exons = transcript.Exons;

    for (var i = 0; i < transcript._exons.length; i++) {

        exons.push({end: parseInt(transcript.start) + parseInt(transcript.end - transcript._exons[i].start) - 1,
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

function changeReference(stable_id) {
    jQuery("#gene_tree_nj").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")

    var temp_ref = syntenic_data.ref;
    var new_ref = null;
    var new_member = [];
    new_member.push(temp_ref)

    for (var i = 0; i < syntenic_data.member.length; i++) {
        if (syntenic_data.member[i].stable_id === stable_id) {
            new_ref = syntenic_data.member[i];
        } else{
           new_member.push(syntenic_data.member[i])
        }
    }
    syntenic_data.ref = new_ref;
    syntenic_data.member = new_member;
    drawSynteny();
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

function browser_coordinates(max) {
    var temp = "<FONT style=\"BACKGROUND-COLOR: #d3d3d3\">";
    jQuery("#vertical0").html(temp + Math.round(0));
    jQuery("#vertical1").html(temp + Math.round(max * 0.1));
    jQuery("#vertical2").html(temp + Math.round(max * 0.2));
    jQuery("#vertical3").html(temp + Math.round(max * 0.3));
    jQuery("#vertical4").html(temp + Math.round(max * 0.4));
    jQuery("#vertical5").html(temp + Math.round(max * 0.5));
    jQuery("#vertical6").html(temp + Math.round(max * 0.6));
    jQuery("#vertical7").html(temp + Math.round(max * 0.7));
    jQuery("#vertical8").html(temp + Math.round(max * 0.8));
    jQuery("#vertical9").html(temp + Math.round(max * 0.9));
    jQuery("#vertical10").html(temp + Math.round(max));


}


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

function formatFasta(track) {

    var seq = track.sequence.toLowerCase();
    var start, stop;

    if (track.start > track.end) {
        start = track.end;
        stop = track.start;
    }
    else {
        start = track.start;
        stop = track.end;
    }
    var exons = track.Exons.length;

    var CDS = ""

    for (var k = 0; k < exons; k++) {

        var exonSeq = "";

        var substart, subend;
        if (track.Exons[k].start > track.Exons[k].end) {
            substart = track.Exons[k].end;
            subend = track.Exons[k].start;
        }
        else {
            substart = track.Exons[k].start;
            subend = track.Exons[k].end;
        }

        if (track.strand == "-1") {
            track.Exons[k]._sequence = track.Exons[k].sequence
            track.Exons[k].sequence = track.Exons[k]._sequence.split("").reverse().join("")
            track.Exons[k].sequence = reverse_compliment(track.Exons[k]._sequence)

            if (track.transcript_end < subend) {
                var diff = track.Exons[k].sequence.length - ((track.transcript_end - substart) + 1)
                exonSeq = track.Exons[k].sequence.substring(diff - 1);

            } else {
                exonSeq = track.Exons[k].sequence;
            }

            if (track.transcript_start > substart) {
                if (track.transcript_end < subend) {
                    exonSeq = exonSeq.substring(0, track.transcript_end - track.transcript_start);
                } else {
                    var diff = track.Exons[k].sequence.length - ((track.transcript_start - substart) + 1)
                    exonSeq = exonSeq.substring(diff);
                }
            }
            CDS = CDS + exonSeq;
        } else {
            if (track.transcript_start > substart) {
                exonSeq = track.Exons[k].sequence.substring((track.transcript_start - substart) - 1);
            } else {
                exonSeq = track.Exons[k].sequence;
            }

            if (track.transcript_end < subend) {
                if (track.transcript_start > substart) {
                    exonSeq = exonSeq.substring(0, track.transcript_end - track.transcript_start);
                } else {
                    exonSeq = exonSeq.substring(0, track.transcript_end - substart);
                }
            }

            CDS += exonSeq;
        }

    }
    return CDS;
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

function convertPeptide(cdnaseq) {

    var ptn_seq = "";
    var seq = cdnaseq;


    var i = 0;
    for (i; i <= seq.length - 3; i = i + 3) {
        var chunk = seq.substring(i, i + 3);
        if (chunk.indexOf("N") > -1) {
            ptn_seq += "X";
        }
        else if (chunk == "GCT" || chunk == "GCC" || chunk == "GCA" || chunk == "GCG") {
            ptn_seq += "A";
        }
//    CGU, CGC, CGA, CGG, AGA, AGG
        else if (chunk == "CGT" || chunk == "CGC" || chunk == "CGA" || chunk == "CGG" || chunk == "AGA" || chunk == "AGG") {
            ptn_seq += "R";
        }
//    AAU, AAC
        else if (chunk == "AAT" || chunk == "AAC") {
            ptn_seq += "N";
        }
//    GAU, GAC
        else if (chunk == "GAT" || chunk == "GAC") {
            ptn_seq += "D";
        }
//    UGU, UGC
        else if (chunk == "TGT" || chunk == "TGC") {
            ptn_seq += "C";
        }
//    CAA, CAG
        else if (chunk == "CAA" || chunk == "CAG") {
            ptn_seq += "Q";
        }
//    GAA, GAG
        else if (chunk == "GAA" || chunk == "GAG") {
            ptn_seq += "E";
        }
//      GGU, GGC, GGA, GGG
        else if (chunk == "GGT" || chunk == "GGC" || chunk == "GGA" || chunk == "GGG") {
            ptn_seq += "G";
        }
//    CAU, CAC
        else if (chunk == "CAT" || chunk == "CAC") {
            ptn_seq += "H";
        }
//      AUU, AUC, AUA
        else if (chunk == "ATT" || chunk == "ATC" || chunk == "ATA") {
            ptn_seq += "I";
        }
//     AUG
        else if (chunk == "ATG") {
            ptn_seq += "M";
        }
//     UUA, UUG, CUU, CUC, CUA, CUG
        else if (chunk == "TTA" || chunk == "TTG" || chunk == "CTT" || chunk == "CTC" || chunk == "CTA" || chunk == "CTG") {
            ptn_seq += "L";
        }
//         AAA, AAG
        else if (chunk == "AAA" || chunk == "AAG") {
            ptn_seq += "K";
        }
//    UUU, UUC
        else if (chunk == "TTT" || chunk == "TTC") {
            ptn_seq += "F";
        }
        //    CCU, CCC, CCA, CCG
        else if (chunk == "CCT" || chunk == "CCC" || chunk == "CCA" || chunk == "CCG") {
            ptn_seq += "P";
        }
        //  UCU, UCC, UCA, UCG, AGU, AGC
        else if (chunk == "TCT" || chunk == "TCC" || chunk == "TCA" || chunk == "TCG" || chunk == "AGT" || chunk == "AGC") {
            ptn_seq += "S";
        }
        //      ACU, ACC, ACA, ACG
        else if (chunk == "ACT" || chunk == "ACC" || chunk == "ACA" || chunk == "ACG") {
            ptn_seq += "T";
        }
        //      UGG
        else if (chunk == "TGG") {
            ptn_seq += "W";
        }
//    UAU, UAC
        else if (chunk == "TAT" || chunk == "TAC") {
            ptn_seq += "Y";
        }
        //   GUU, GUC, GUA, GUG
        else if (chunk == "GTT" || chunk == "GTC" || chunk == "GTA" || chunk == "GTG") {
            ptn_seq += "V";
        }
        //  	UAA, UGA, UAG
        else if (chunk == "TAA" || chunk == "TGA" || chunk == "TAG") {
            ptn_seq += "*";
        }

        else {
            ptn_seq += "-";
        }
    }

    return ptn_seq;
}

function drawSynteny(redrawn){

    console.log("drawSynteny")
        var json = syntenic_data;
        if (json.ref) {
            gene_list_array = []

            var core_data = json.member;
            var max = 0;


            for (var i = 0; i < core_data.length; i++) {
                var genes = core_data[i].genes;
                var new_max = genes.gene.length;
                if (new_max > max) {
                    max = new_max;
                }


                var core_data = json.member;
                var max = 0;
                for (var i = 0; i < core_data.length; i++) {
                    var genes = core_data[i].genes;
                    var new_max = genes.gene.length;
                    if (new_max > max) {
                        max = new_max;
                    }
                }


                var ref_data = json.ref;

                var genes = ref_data.genes
                if (max < genes.gene.length) {
                    max = genes.gene.length;
                }
                var name = ref_data.genome_name;


                browser_coordinates(max)

                var colour = jQuery("#option" + name).css("background");


                jQuery("#gene_widget").append("<div style='left:0px; width: 100%; position: relative; border: 2px solid black; top: 10px; box-shadow: 1px 1px 15px 15px #D3D3D3;' id='ref_wrapper'>" +
                    "<div class=handle-genome style='background-image: url(/images/browser/utr.png); background: " + colour + "; padding: 5px; position: absolute; top: 0px; height: 100%; left: 40px; width: 20px;'></div>" +
                    "<span style='left: 0px; width: 100px; top: 50px; position: absolute; transform: rotate(90deg); word-wrap: break-word;'> <b>" + stringTrim(name, 100) + "</b></span>" +
                    "<div style='left:10%; width: auto; padding: 25px 0px; position: relative;' id='ref'></div>")


                jQuery("#gene_widget_exons").append("<div style='left:0px; width: 100%; position: relative; border: 2px solid black; top: 10px; box-shadow: 1px 1px 15px 15px #D3D3D3;' id='ref_wrapper'>" +
                    "<div class=handle-genome style='background-image: url(/images/browser/utr.png); background: " + colour + "; padding: 5px; position: absolute; top: 0px; height: 100%; left: 40px; width: 20px;'></div>" +
                    "<span style='left: 0px; width: 100px; top: 50px; position: absolute; transform: rotate(90deg); word-wrap: break-word;'> <b>" + stringTrim(name, 100) + "</b></span>" +
                    "<div style='left:10%; width: auto; padding: 25px 0px; position: relative;' id='ref'></div>")


                dispGenes("#gene_widget #ref", genes, max, ref_data.cigarline, undefined, undefined, name);
                dispGenesExon("#gene_widget_exons #ref", genes, max, ref_data.cigarline, undefined, undefined, name);

                ref_data.genes.gene.transcripts[0].Exons.sort(sort_by('start', true, parseInt));

                var exon_nu = 0

                ref_member = ref_data.genes.gene.member_id

                var diff = parseInt(ref_data.genes.gene.transcripts[0].Exons[exon_nu].end - ref_data.genes.gene.transcripts[0].transcript_start) + parseInt(1)
                while (diff < 0) {
                    ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = 0
                    exon_nu++;
                    diff = parseInt(ref_data.genes.gene.transcripts[0].Exons[exon_nu].end - ref_data.genes.gene.transcripts[0].transcript_start) + parseInt(1)
                }


                ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = diff;
                ref_data.genes.gene.transcripts[0].Exons[exon_nu]._start += ref_data.genes.gene.transcripts[0].transcript_start - ref_data.genes.gene.transcripts[0].Exons[exon_nu].start;


                var exon_nu = ref_data.genes.gene.transcripts[0].Exons.length - 1
                var diff = parseInt(ref_data.genes.gene.transcripts[0].transcript_end - ref_data.genes.gene.transcripts[0].Exons[exon_nu]._start) + parseInt(1)

                for (var i = 0; i < core_data.length; i++) {

                    var genes = core_data[i].genes
                    var name = core_data[i].genome_name;

                    if (document.getElementById("core" + core_data[i].genome) == null) {
                        var colour = jQuery("#option" + name).css("background");

                        jQuery("#gene_widget").append("<div style='left:0px; width: 100%; position: relative; border: 1px solid gray; top: 10px; ' id='core" + core_data[i].genome + "_wrapper'> " +
                            "<div class = handle-genome style='background: " + colour + "; padding: 5px; position: absolute; top: 0px; height: 100%; left: 40px; width: 20px;'></div>" +
                            "<span style='left: 0px; width: 100px; top: 50px; position: absolute; transform: rotate(90deg); word-wrap: break-word;'><b>" + stringTrim(name, 100) + "</b></span>" +
                            "<div style='left:10%; width: auto; padding: 25px 0px;  position: relative; ' id='core" + core_data[i].genome + "'></div>" +
                            "</div>")

                        jQuery("#gene_widget_exons").append("<div style='left:0px; width: 100%; position: relative; border: 1px solid gray; top: 10px; ' id='core" + core_data[i].genome + "_wrapper'> " +
                            "<div class = handle-genome style='background: " + colour + "; padding: 5px; position: absolute; top: 0px; height: 100%; left: 40px; width: 20px;'></div>" +
                            "<span style='left: 0px; width: 100px; top: 50px; position: absolute; transform: rotate(90deg); word-wrap: break-word;'><b>" + stringTrim(name, 100) + "</b></span>" +
                            "<div style='left:10%; width: auto; padding: 25px 0px;  position: relative; ' id='core" + core_data[i].genome + "'></div>" +
                            "</div>")
                    }

                    if (core_data[i].cigarline) {
                        dispGenes("#gene_widget  #core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline, name);
                    }

                    else {
                        dispGenes("#gene_widget  #core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline, name);
                    }
                    if (core_data[i].cigarline) {
                        dispGenesExon("#gene_widget_exons #core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline, name);
                    }

                    else {
                        dispGenesExon("#gene_widget_exons #core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline, name);
                    }
                }
            }

            checkVisuals();

            drawTree(json.tree)

            jQuery("#gene_widget").sortable(
                {
                    axis: 'y',
                    handle: '.handle-genome',
                    cursor: 'move'
                });

            if (redrawn != undefined) {
                if (ref_data.genome != jQuery("#genomes option:selected").val()) {
                    jQuery("#genomes").val(ref_data.genome)
                    var color = jQuery("option:selected", this).css("background");
                    jQuery("#reference_maps").css("background", color);
                    getChromosomes(ref_data.genome, ref_data.genes.gene.reference, ref_data.genes.gene.member_id);
                } else {
                    if (jQuery("#chr" + ref_data.genes.gene.reference).hasClass("selected")) {
                        rearrange_selector(ref_data.genes.gene.member_id, ref_data.genes.gene.start, ref_data.genes.gene.reference)
                    } else {
                        getMember(ref_data.genes.gene.reference, ref_data.genome, ref_data.genes.gene.member_id);
                    }
                }
            }
        } else {
            jQuery("#gene_widget").html("")
            jQuery("#gene_widget").html("Selected Gene not found.")
            jQuery("#gene_tree_nj").html("<span style='font-size: large; text-align: center'>Selected Gene not found.</span>")
        }

}

