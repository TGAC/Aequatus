/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 26/06/2014
 * Time: 16:30
 * To change this template use File | Settings | File Templates.
 */

function dispGenes(div, track, max, cigarline, ref, ref_cigar, genome) {

    var gene = track.gene;

    var trackClass;

    var newStart_temp = 1;
    var maxLentemp = jQuery(document).width() * 0.6;

    var label = "";
    var j = 0;

    var transcript_len = gene.transcripts.length;
    while (transcript_len--) {

        max = gene.transcripts[transcript_len].length
        var newEnd_temp = max;
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
        if (gene.transcripts[transcript_len].desc) {
            label = gene.transcripts[transcript_len].desc;
        }
        var border = " border-left: 1px solid #000000; border-right: 1px solid #000000;";
        label = gene.transcripts[transcript_len].desc;
        if (gene.transcripts[transcript_len].layer > j) {
            j = gene.transcripts[transcript_len].layer;
        }
        var top = transcript_len * 25 + 25;
        var startposition = (1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var stopposition = ((gene_stop - gene_start) + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var margin = "margin-top:15px;margin-bottom:5px;";
        if (transcript_len == 0) {
            margin = "margin-top:15px;margin-bottom:25px;";
        }

        label += gene.reference;

        if (ref) {

            console.log("not ref")
            var wrapper_div = jQuery("#id" + gene.member_id)

//            var wrapper_div = jQuery("<div>").attr({
//                'id' : "id" + gene.member_id,
//                'style': "position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width :100%;"
//            }).html(
//                    "<div class='handle-gene' style='position: absolute; margin-left: 10px; left: "+stopposition+"px; word-wrap: break-word; width: 200px; height: 20px;'>" +
//                        "<span class='handle-gene genelabel geneinfo' style='position: relative; margin-left: 10px;   word-wrap: break-word;'>" + genome + ":" + stringTrim(gene.desc, 100) + " </span>" +
//                        "<span class='handle-gene genelabel stable' style='position: relative; margin-left: 10px;  word-wrap: break-word;'>" + gene.stable_id + " </span>" +
//                        "</div>"
////                    "<span class='handle-gene' style='position: absolute; margin-left: 10px; left:"+stopposition+"px;  word-wrap: break-word;'>" + genome +":"+stringTrim(gene.desc, 100) + " </span> <span class='handle-gene' style='position: absolute; margin-left: 10px; left:"+stopposition+"px;  word-wrap: break-word;'>" + gene.stable_id + " </span> "
//                ).appendTo(div);


            var temp_div = jQuery("<div>").attr({
                //'id': "id" + gene.member_id,
                'onClick': "onClicked('" + gene.desc + "','" + gene.stable_id + "','" + gene.member_id + "')",
//                'onClick': "jQuery('#gene_info').html('" + jQuery("#hit"+transcript_len).html() + "'); jQuery.colorbox({width: '90%',height: '90%', inline: true, href: '#gene_info'});",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px;  LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);

            var strand = 0;
            if (ref.strand == gene.transcripts[transcript_len].strand) {
                strand = 1;
            } else {
                strand = -1;
                jQuery(wrapper_div).append("<span class=\"ui-button ui-icon ui-icon-refresh\" style=\"position: absolute; margin-left: 5px; top:0px; word-wrap: break-word; left: " + stopposition + "px;\" onclick='flip_gene(\"hit" + gene.member_id + "_" + transcript_len + "\")'>/span>")
            }

            gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));

            var temp_int;
            if (ref.transcript_start > ref.transcript_end) {
                temp_int = ref.transcript_start;
                ref.transcript_start = ref.transcript_end;
                ref.transcript_end = temp_int
            }

            gene_list_array.push(gene.member_id)


            cigar_list.push(cigarline)

            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);

            dispCigarLine(cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.Exons.toJSON(), transcript_start, transcript_end, strand, ref_cigar, ref.strand, gene.transcripts[transcript_len].id, "");

        }
        else {

            console.log("ref")

            var wrapper_div = jQuery("<div>").attr({
                'id': "id" + gene.member_id,
                'style': "position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width :100%;"
            }).html(
                "<div class='handle-gene' style='position: absolute; margin-left: 10px; left: " + stopposition + "px; word-wrap: break-word; width: 200px; height: 20px;'>" +
                "<span class='handle-gene genelabel geneinfo' style='position: relative; margin-left: 10px;  word-wrap: break-word;'>" + genome + ":" + stringTrim(gene.desc, 100) + " </span>" +
                "<span class='handle-gene genelabel stable' style='position: relative; margin-left: 10px; word-wrap: break-word;'>" + gene.stable_id + " </span>" +
                "</div>"
            ).appendTo(div);


            var temp_div = jQuery("<div>").attr({
                'onClick': "onClicked('" + gene.desc + "','" + gene.stable_id + "','" + gene.member_id + "')",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px;  LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);

            gene_list_array.push(gene.member_id)
            cigar_list.push(cigarline)

            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            dispCigarLineRef(cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end, gene.transcripts[transcript_len].id, "");

        }


    }
}

function dispGeneExon(track, genestrand, div, gene_start, width, max_len, id) {
    var trackClass = "exon";
    var utrtrackClass = "utr";

    var disp_exon = false;
    var geneexons = track.Exons;

    if (geneexons.length > 0) {
        var strand = genestrand;

        var spanclass = "ui-icon ui-icon-carat-1-e";

        if (strand == -1 || strand == "-1") {
            spanclass = "ui-icon ui-icon-carat-1-w";
        }

//        var spanclass = "forward";
//
//        if (strand == -1 || strand == "-1") {
//            spanclass = "reverse";
//        }
        var newStart_temp = gene_start;
        var maxLentemp = width;


        var exon_len = geneexons.length;
        var startposition = 0;
        var stopposition = 0;
        var transcript_start;
        var transcript_end;

        if (track.transcript_start < track.transcript_end) {
            transcript_start = track.transcript_start;
            transcript_end = track.transcript_end;
        }
        else {
            transcript_start = track.transcript_start;
            transcript_end = track.transcript_end;
        }

        var last = null, current = null;

        while (exon_len--) {

            var exon_start;
            var exon_stop;
            if (geneexons[exon_len].start < geneexons[exon_len].end) {
                exon_start = geneexons[exon_len].start;
                exon_stop = geneexons[exon_len].end;
            }
            else {
                exon_start = geneexons[exon_len].end;
                exon_stop = geneexons[exon_len].start;
            }

            current = exon_start;

            var top = 0;


            startposition = (exon_start - newStart_temp) * parseFloat(maxLentemp) / (max_len);
            stopposition = (geneexons[exon_len].length) * parseFloat(maxLentemp) / (max_len);

//            to make up for border added
//            stopposition = stopposition - 4;


            jQuery("<div>").attr({
                'class': trackClass,
                'id': "exon" + track.id + "" + geneexons[exon_len].id+ "style1",
                'style': "box-sizing: border-box; position:absolute; cursor:pointer; height: 14px; z-index: 999;  TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
            }).appendTo(div);

            if (exon_len > 0) {
                jQuery("<span>").attr({
                    'class': spanclass,
                    'style': "cursor:pointer; position:absolute; z-index; 999; TOP:" + (top - 1) + "px; left:" + (startposition - 20) + "px "
                }).appendTo(div);
            }
            disp_exon = true;
        }

        var exon_len = geneexons.length;

        while (exon_len--) {

            var exon_start;
            var exon_stop;
            if (geneexons[exon_len].start < geneexons[exon_len].end) {
                exon_start = geneexons[exon_len].start;
                exon_stop = geneexons[exon_len].end;
            }
            else {
                exon_start = geneexons[exon_len].end;
                exon_stop = geneexons[exon_len].start;
            }

            current = exon_start;

            var temp_div = ("#exon" + track.id + "" + geneexons[exon_len].id+ "style1")

            var top = 0;

            if (exon_start < transcript_start && exon_stop < transcript_start) {

                console.log("if 1")
                startposition = 0;// ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = ((exon_stop - exon_start) + 1) * parseFloat(maxLentemp) / (max_len);

//                startposition += 1;
//                stopposition -= 2;
                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)

                last = current;

            }
            else if (exon_start < transcript_start && exon_stop > transcript_end) {

                console.log("if 2")

                startposition = 0;//((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);

//                startposition += 1;
//                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


//                startposition += 1;
//                stopposition -= 2;

                startposition = ((transcript_end - exon_start) - 1) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - transcript_end + 1) * parseFloat(maxLentemp) / (max_len);


                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;
            }
            else if (exon_stop > transcript_start && exon_start < transcript_start) {

                console.log("if 3")

                startposition = 0;//((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);

//                startposition += 1;
//                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;

            }
            else if (exon_stop > transcript_end && exon_start < transcript_end) {

                console.log("if 4")

                startposition = ((transcript_end - exon_start)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - transcript_end) * parseFloat(maxLentemp) / (max_len);

//                startposition += 1;
//                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;


            }

            else if (exon_start > transcript_start && exon_stop > transcript_end) {
                console.log("if 5")

                startposition = 1;
                stopposition = (exon_stop - exon_start) * parseFloat(maxLentemp) / (max_len);

//                startposition += 1;
//                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)

                last = current;
            }
        }

    }
}

function dispGenesForMember_id(member_id, ref) {
    var wrapper_div = jQuery("#id" + member_id)
    var gene;
    if(ref){
        gene = syntenic_data.member[member_id].genes.gene;
    }else{
        gene = syntenic_data.ref.genes.gene;

    }
//
    var trackClass;
    var newStart_temp = 1;
    var maxLentemp = jQuery(document).width() * 0.6;

    var label = "";
    var j = 0;

    var transcript_len = gene.transcripts.length;
    var display  = "";
    var view_type = null
    if (jQuery('input[name=view_type]:checked').val() == "with") {
        view_type = true;
    }
    else {
        view_type = false;
    }

    if (view_type == true) {
        display = "display: block;"
    } else {
        display = "display: none;"
    }

    var view_type = null
    if (jQuery('input[name=label_type]:radio:checked').val() == "stable") {
        view_type = true;
    }
    else {
        view_type = false;
    }

    var stable_display  = "";
    var info_display= "";

    if (view_type == true) {
        stable_display = "display: block;"
        info_display = "display: none; "
    } else {
        info_display = "display: block;"

        stable_display = "display: none;"
    }

    while (transcript_len--) {

        max = gene.transcripts[transcript_len].length
        var newEnd_temp = max;
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
        if (gene.transcripts[transcript_len].desc) {
            label = gene.transcripts[transcript_len].desc;
        }
        var border = " border-left: 1px solid #000000; border-right: 1px solid #000000;";
        label = gene.transcripts[transcript_len].desc;
        if (gene.transcripts[transcript_len].layer > j) {
            j = gene.transcripts[transcript_len].layer;
        }
        var top = transcript_len * 25 + 25;
        var startposition = (1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var stopposition = ((gene_stop - gene_start) + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var margin = "margin-top:15px;margin-bottom:5px;";


        if (transcript_len == 0) {
            margin = "margin-top:15px;margin-bottom:25px;";
        }

        label += gene.reference;





        if (ref) {
            ref =  syntenic_data.ref.genes.gene
            var wrapper_div = jQuery("#id" + member_id)

          wrapper_div.html(
            "<div class='handle-gene' style='position: absolute; margin-left: 10px; left: " + stopposition + "px; word-wrap: break-word; width: 200px; height: 20px;'>" +
            "<span class='handle-gene genelabel geneinfo' style='position: relative; "+info_display+" margin-left: 10px;  word-wrap: break-word;'>" + syntenic_data.member[member_id].genome_name + ":" + stringTrim(gene.desc, 100) + " </span>" +
            "<span class='handle-gene genelabel stable' style='position: relative; "+stable_display+" margin-left: 10px; word-wrap: break-word;'>" + gene.stable_id + " </span>" +
            "</div>"
        );

            //
            //
            var temp_div = jQuery("<div>").attr({
                //'onClick': "onClicked('" + gene.desc + "','" + gene.stable_id + "','" + member_id + "')",
                //'onClick': "jQuery('#gene_info').html('" + jQuery("#hit" + transcript_len).html() + "'); jQuery.colorbox({width: '90%',height: '90%', inline: true, href: '#gene_info'});",
                'class': "gene style1",
                'style': "position:relative;  "+display+"  cursor:pointer; height: 14px;  LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);
            //
            var strand = 0;
            if (ref.strand == gene.transcripts[transcript_len].strand) {
                strand = 1;
            } else {
                strand = -1;
                jQuery(wrapper_div).append("<span class=\"ui-button ui-icon ui-icon-refresh\" style=\"position: absolute; margin-left: 5px; top:0px; word-wrap: break-word; left: " + stopposition + "px;\" onclick='flip_gene(\"hit" + gene.member_id + "_" + transcript_len + "\")'>/span>")
            }
            gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));
            var temp_int;
            if (ref.transcript_start > ref.transcript_end) {
                temp_int = ref.transcript_start;
                ref.transcript_start = ref.transcript_end;
                ref.transcript_end = temp_int
            }
            gene_list_array.push(member_id)
            cigar_list.push(syntenic_data.member[member_id].cigarline)
            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);


            dispCigarLine(syntenic_data.member[member_id].cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.transcripts[0].Exons.toJSON(), transcript_start, transcript_end, strand, syntenic_data.ref.cigarline, ref.strand, gene.transcripts[transcript_len].id, "style1");

        }
        else {
            var wrapper_div = jQuery("#id" + member_id)

            wrapper_div.html(
                "<div class='handle-gene' style='position: absolute; margin-left: 10px; left: " + stopposition + "px; word-wrap: break-word; width: 200px; height: 20px;'>" +
                "<span class='handle-gene genelabel geneinfo' style='position: relative; "+info_display+" margin-left: 10px;  word-wrap: break-word;'>" + syntenic_data.ref.genome_name + ":" + stringTrim(gene.desc, 100) + " </span>" +
                "<span class='handle-gene genelabel stable' style='position: relative;  "+stable_display+"  margin-left: 10px; word-wrap: break-word;'>" + gene.stable_id + " </span>" +
                "</div>"
            );

            var temp_div = jQuery("<div>").attr({
                'class': "gene style1",
                'style': "position:relative;  "+display+" cursor:pointer; height: 14px;  LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);

            gene_list_array.push(gene.member_id)
            cigar_list.push(syntenic_data.ref.cigarline)

            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            dispCigarLineRef(syntenic_data.ref.cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end, gene.transcripts[transcript_len].id, "style1");

        }


    }
}
