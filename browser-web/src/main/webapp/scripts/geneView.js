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


var gapped_seq_list = [];
var gene_list_array = [];
var cigar_list = [];
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
    console.log("getchromosome")
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
        {
            'doOnSuccess': function (json) {
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
                }else{
select_chr()
                }
            }
        })
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
                member_id = json.ref.genes.gene.member_id;

                resize_ref();
                setSelector()

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

function formatCigar(ref_exons, hit_cigar, colours, ref_cigar, reverse, ref_strand) {
    //console.log("format cigar")

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
            else if (hit_cigar.charAt(j) == 'D') {
                hit_cigar = replaceAt(hit_cigar, j, "I");
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

function changeReference(new_member_id) {
    console.log("change reference")


    if (new_member_id != member_id) {
        removePopup();

        jQuery("#id" + member_id+"geneline").attr("stroke", "green")
        jQuery("#id" + member_id+"genetext").attr("fill", "blue")

        console.log("change reference 1")

        resize_ref_to_def()

        jQuery("#circle" + member_id).attr("r", 4)
        jQuery("#circle" + new_member_id).attr("r", 6)


        jQuery("#circle" + member_id).css("stroke-width", "1px")
        jQuery("#circle" + new_member_id).css("stroke-width", "2px")

        jQuery("#circle" + member_id).css("stroke", "steelblue")
        jQuery("#circle" + new_member_id).css("stroke", "black")

        console.log("changereference " + new_member_id)


        var temp_ref = syntenic_data.ref;
        var new_ref = null;
        var new_member = [];
        new_member.push(temp_ref)
        new_ref = syntenic_data.member[new_member_id]
        syntenic_data.ref = new_ref;
        syntenic_data.member[temp_ref.genes.gene.member_id] = temp_ref;
        console.log("change reference 2")



        delete syntenic_data.member[new_member_id]

        jQuery(".match").remove()
        jQuery(".insert").remove()
        jQuery(".delete").remove()
        console.log("change reference 3")

        member_id = new_member_id;
        if (genome_db_id != syntenic_data.ref.genome) {
            genome_db_id = syntenic_data.ref.genome;
            chr = syntenic_data.ref.dnafrag
            getChromosomes(new_member_id);
            members = undefined
            getMember(new_member_id);
            select_genome();
        } else if (chr != syntenic_data.ref.dnafrag) {
            chr = syntenic_data.ref.dnafrag
            members = undefined
            getMember(new_member_id);
            select_chr();
        }

        console.log("change reference 4")

        URLMemberID(syntenic_data.ref.stable_id)
        console.log("change reference 5")
        resize_ref();
        console.log("change reference 6")
        redrawCIGAR()
    }

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

function drawSynteny(redrawn) {
    console.log("draw synteny")


    jQuery("#gene_widget").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")
    jQuery("#gene_widget_exons").html("")

    console.log("drawSynteny")
    var json = syntenic_data;
    if (json.ref) {
        var ref_data = json.ref;
        URLMemberID(ref_data.stable_id)


        ref_member = ref_data.genes.gene.member_id

        drawTree(json.tree)

        checkVisuals();

        //redrawCIGAR()

        jQuery("#gene_widget").sortable(
            {
                axis: 'y',
                handle: '.handle-genome',
                cursor: 'move'
            });

        if (redrawn != undefined) {
            jQuery("#genomes").val(ref_data.genome)
            select_chr();
            select_member();
        } else {
            console.log("else")
        }
    } else {
        jQuery("#gene_widget").html("")
        jQuery("#gene_widget").html("Selected Gene not found.")
        jQuery("#gene_tree_nj").html("<span style='font-size: large; text-align: center'>Selected Gene not found.</span>")
    }

}

function select_member() {
    jQuery(".refMarkerShow").removeClass("selected")
    jQuery("#ref" + member_id).addClass("selected")
}

function select_chr() {
    jQuery('div[id^="chr"]').removeClass("selected")
    jQuery("#chr" + chr).addClass("selected")
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


function redrawCIGAR() {

    console.log("redraw cigar")

    var json = syntenic_data;
    if (json.ref) {
        gene_list_array = []
        var core_data = json.member;
        var max = 0;
        var keys = [];
        for (var k in core_data) keys.push(k);

        var ref_data = json.ref;
        var genes = ref_data.genes
        if (max < genes.gene.length) {
            max = genes.gene.length;
        }
        var name = ref_data.genome_name;
        console.log("redraw cigar 1")


        browser_coordinates(max)
        console.log("redraw cigar 2")

        var colour = jQuery("#option" + name).css("background");
        var transcript_len = genes.gene.transcripts.length;



        while (transcript_len--) {
            console.log("redraw cigar 3")

            var gene_start;
            var gene_stop;
            var gene_length = genes.gene.transcripts[transcript_len].length;

            var transcript_start = genes.gene.transcripts[transcript_len].transcript_start;
            var transcript_end = genes.gene.transcripts[transcript_len].transcript_end;

            if (genes.gene.transcripts[transcript_len].start < genes.gene.transcripts[transcript_len].end) {
                gene_start = genes.gene.transcripts[transcript_len].start;
                gene_stop = genes.gene.transcripts[transcript_len].end;
            }
            else {
                gene_start = genes.gene.transcripts[transcript_len].end;
                gene_stop = genes.gene.transcripts[transcript_len].start;

            }

            console.log("redraw cigar 4")

            var maxLentemp = jQuery(document).width() * 0.6;
            var newEnd_temp = max;
            var stopposition = ((gene_stop - gene_start) + 1) * parseFloat(maxLentemp) / (newEnd_temp);
            var temp_div =   jQuery("#id" + genes.gene.member_id ).svg("get")
            //jQuery("#id" + genes.gene.member_id).find('.style1');


            var g = temp_div.group({id: 'id' + genes.gene.member_id+'style1CIGAR' , class: 'style1'});

            jQuery("#id" + genes.gene.member_id+"style1CIGAR").remove()

            //
            dispCigarLineRef(g, ref_data.cigarline, 1, top, gene_length, gene_start, stopposition, genes.gene.transcripts[transcript_len].Exons.toJSON(), temp_div, genes.gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end, genes.gene.transcripts[transcript_len].id, "style1");
            //var temp_div = jQuery("#id" + genes.gene.member_id).find('.style2');


            var g = temp_div.group({id: 'id' + genes.gene.member_id+'style2CIGAR', class: 'style2'});

            jQuery("#id" + genes.gene.member_id+"style2CIGAR").remove()
            jQuery("#id" + genes.gene.member_id+"geneline").attr("stroke", "red")
            jQuery("#id" + genes.gene.member_id+"genetext").attr("fill", "red")

            dispCigarLineRef(g, ref_data.cigarline, 1, top, gene_length, gene_start, stopposition, genes.gene.transcripts[transcript_len].Exons.toJSON(), temp_div, genes.gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end, genes.gene.transcripts[transcript_len].id, "style2");


        }


        for (var i = 0; i < keys.length; i++) {
            var member_id = keys[i]
            var gene = syntenic_data.member[member_id].genes.gene;
            var transcript_len = genes.gene.transcripts.length;
            while (transcript_len--) {
                var gene_start;
                var gene_stop;
                var gene_length = gene.transcripts[transcript_len].length;

                var transcript_start = gene.transcripts[transcript_len].transcript_start;
                var transcript_end = gene.transcripts[transcript_len].transcript_end;

                if (gene.transcripts[transcript_len].start < gene.transcripts[transcript_len].end) {
                    gene_start = gene.transcripts[transcript_len].start;
                    gene_stop = gene.transcripts[transcript_len].end;
                }
                else {
                    gene_start = gene.transcripts[transcript_len].end;
                    gene_stop = gene.transcripts[transcript_len].start;
                }
                var maxLentemp = jQuery(document).width() * 0.6;
                var newEnd_temp = max;

                var stopposition = ((gene_stop - gene_start) + 1) * parseFloat(maxLentemp) / (newEnd_temp);


                var ref_strand = 1;
                if (ref_data.genes.gene.strand != gene.transcripts[transcript_len].strand) {
                    ref_strand = -1
                }


                var strand = 0;
                if (ref_data.genes.gene.strand == gene.transcripts[transcript_len].strand) {
                    strand = 1;
                } else {
                    strand = -1;
                }

                jQuery("#id" + member_id+"style1CIGAR").remove()
                jQuery("#id" + member_id+"style2CIGAR").remove()

                var temp_div =   jQuery("#id" + member_id ).svg("get")
                var g = temp_div.group({id: 'id' + member_id+'style1CIGAR' , class: 'style1'});

                dispCigarLine(g, syntenic_data.member[gene.member_id].cigarline, 1, top, gene_length, gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref_data.genes.gene.transcripts[0].Exons.toJSON(), transcript_start, transcript_end, strand, ref_data.cigarline, ref_data.genes.gene.strand, gene.transcripts[transcript_len].id, "style1");
                var g = temp_div.group({id: 'id' + member_id+'style2CIGAR' ,class: 'style2'});

                dispCigarLine(g, syntenic_data.member[gene.member_id].cigarline, 1, top, gene_length, gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref_data.genes.gene.transcripts[0].Exons.toJSON(), transcript_start, transcript_end, strand, ref_data.cigarline, ref_data.genes.gene.strand, gene.transcripts[transcript_len].id, "style2");

            }

            var view_type = true
            if (jQuery('input[name=view_type]:checked').val() == "with") {
                view_type = true;
            }
            else {
                view_type = false;
            }

            if (view_type == true) {
                jQuery(".style1").show()
                jQuery(".style2").hide()
                //display = "display: block;"
            } else {
                jQuery(".style1").hide()
                jQuery(".style2").show()
                //display = "display: none;"
            }


        }
    } else {
        jQuery("#gene_widget").html("")
        jQuery("#gene_widget").html("Selected Gene not found.")
        jQuery("#gene_tree_nj").html("<span style='font-size: large; text-align: center'>Selected Gene not found.</span>")
    }

    //window.history.pushState("ref=" + syntenic_data.ref.genome_name, "Title", "index.jsp?query=" + syntenic_data.ref.genes.gene.stable_id);

    select_member();


}

function resize_ref() {
    console.log("resize ref")


    var exon_nu = 0
    syntenic_data.ref.genes.gene.transcripts[0].Exons = syntenic_data.ref.genes.gene.transcripts[0].Exons.sort(sort_by('start', true, parseInt));


    var diff = parseInt(syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].end - syntenic_data.ref.genes.gene.transcripts[0].transcript_start) + parseInt(1)
    while (diff < 0) {
        syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].length = 0
        exon_nu++;
        diff = parseInt(syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].end - syntenic_data.ref.genes.gene.transcripts[0].transcript_start) + parseInt(1)
    }


    syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].length = diff;
    syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu]._start += syntenic_data.ref.genes.gene.transcripts[0].transcript_start - syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].start;


    var exon_nu = syntenic_data.ref.genes.gene.transcripts[0].Exons.length - 1
    var diff = parseInt(syntenic_data.ref.genes.gene.transcripts[0].transcript_end - syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu]._start) + parseInt(1)


}

function resize_ref_to_def() {
    //console.log(syntenic_data.ref.genes.gene.transcripts[0].Exons.toJSON())
    var exon_nu = syntenic_data.ref.genes.gene.transcripts[0].Exons.length;


    while (exon_nu--) {
        syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].length = (syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].end - syntenic_data.ref.genes.gene.transcripts[0].Exons[exon_nu].start) + 1
    }


}

function checkCigar(ref_cigar_string) {
    console.log("check cigar")

    var cigar_list = [];
    cigar_list.push(ref_cigar_string);

    var member = syntenic_data.member

    for (var id in member) {
        if (member.hasOwnProperty(id)) {


            var cigar_string = "";
            var cigars = member[id].cigarline.replace(/([SIXMND])/g, ":$1,");
            var cigars_array = cigars.split(',');

            for (var j = 0; j < cigars_array.length - 1; j++) {
                var cigar = cigars_array[j].split(":");
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

            if (member[id].genes.gene.strand != syntenic_data.ref.genes.gene.strand) {
                cigar_string.split("").reverse().join()
            }
            cigar_list.push(cigar_string);

            //The current property is not a direct property of p
            continue;
        }

    }
    //syntenic_data.ref.cigarline = cigar_list[0];
    for (var i = 0; i < cigar_list[0].length; i++) {
        if (cigar_list[0][i] == 'D') {
            for (var j = 1; j < cigar_list.length; j++) {
                if (cigar_list[j][i] == 'M') {
                    break;
                }
                if (j == cigar_list.length - 1) {
                    cigar_list[0] = replaceAt(cigar_list[0], i, "I")
                }
            }
        }
    }

    return cigar_list[0];
}

function setSelector(){
    console.log("setSelector")

     var maxLentemp = parseInt(jQuery("#canvas").css("width"));

    //var sequencelength = chr_length="63644993"

    var start = syntenic_data.ref.genes.gene.transcripts[0].start


    var left = start * maxLentemp / sequencelength;

    var width = parseInt(jQuery("#bar_image_selector").css("width"));

    left = left - width/2

    jQuery("#bar_image_selector").animate({left: left+'px'} , function() {
        drawSelected();
        jQuery(".refMarkerShow").removeClass("selected")
        console.log("setSelector "+syntenic_data.ref.genes.gene.member_id)

        jQuery("[seq_id="+syntenic_data.ref.genes.gene.member_id+"]").addClass("selected")
        jQuery("#chr"+syntenic_data.ref.genes.gene.reference).addClass("selected")
    });
}
