/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 26/06/2014
 * Time: 16:30
 * To change this template use File | Settings | File Templates.
 */

function dispExon(track, genestrand, div, gene_start, width, max_len, id) {

    var trackClass = "exon";
    var utrtrackClass = "utr";

    var disp_exon = false;
    var geneexons = track.Exons;

    var space = 15 * (geneexons.length - 1)


    if (geneexons.length > 0) {
        var strand = genestrand;

        var spanclass = "ui-icon ui-icon-carat-1-e";

        if (strand == -1 || strand == "-1") {
            spanclass = "ui-icon ui-icon-carat-1-w";
        }

        var newStart_temp = gene_start;
        var maxLentemp = width - space;


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


        geneexons.sort(sort_by('start', true, parseInt));

        var last = null, current = null;

//        while (exon_len--) {
        for (var exon_len = 0; exon_len < geneexons.length; exon_len++) {

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


            startposition = 0//(exon_start - newStart_temp) * parseFloat(maxLentemp) / (max_len);
            stopposition = ((exon_stop - exon_start) + 1) * parseFloat(maxLentemp) / (max_len);
//            to make up for border added
            stopposition = parseInt(stopposition) - 4;


            var margin = "-1px;";
            if (exon_len == (geneexons.length - 1)) {
                margin = "-1px;"
            }

            jQuery("<div>").attr({
                'class': trackClass,
                'id': "exon" + track.id + "" + geneexons[exon_len].id + "style2",
                'style': "position:relative; float:left; margin-right:" + margin + " cursor:pointer; height: 10px; z-index: 999;  TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px",
                'title': exon_start + ":" + exon_stop
            }).appendTo(div);

            if (exon_len < (geneexons.length - 1)) {
                jQuery("<span>").attr({
                    'class': spanclass,
                    'style': "cursor:pointer;  z-index; 999; TOP:" + (top - 1) + "px; float: left; position: relative "
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

            var top = 0;

            var temp_div = ("#exon" + track.id + "" + geneexons[exon_len].id+ "style2")

            if (exon_start < transcript_start && exon_stop < transcript_start) {
                startposition = 0;//((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - exon_start) * parseFloat(maxLentemp) / (max_len);

                stopposition = parseInt(stopposition)

//                startposition += 1;
//                stopposition -= 2;
                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "position:relative; float:left; TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;

            }
            else if (exon_start < transcript_start && exon_stop > transcript_end) {
                startposition = 0;// ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);

                stopposition = parseInt(stopposition)

//                startposition += 1;
//                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "position:relative; float:left; TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


//                startposition += 1;
//                stopposition -= 2;

                startposition = ((transcript_end - exon_start) - 1) * parseFloat(maxLentemp) / (max_len);
                stopposition = 0;//(exon_stop - transcript_end + 1) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)


                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "position:relative; float:left; TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;
            }
            else if (exon_stop > transcript_start && exon_start < transcript_start) {
                startposition = 0;// ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)

//                startposition += 1;
//                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "position:relative; float:left;TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;

            }
            else if (exon_stop > transcript_end && exon_start < transcript_end) {
                startposition = ((transcript_end - exon_start)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - transcript_end) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)

//                startposition += 1;
//                stopposition -= 2;


                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "position:relative; float:left; TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;


            }

            else if (exon_start > transcript_start && exon_stop > transcript_end) {
                startposition = 1;
                stopposition = (exon_stop - exon_start) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)

//                startposition += 1;
//                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "position:relative; float:left; TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(temp_div)


                last = current;


            }
        }

    }
}
function dispGenesExonForMember_id(member_id, ref) {
    var wrapper_div = jQuery("#id" + member_id)
    var gene;
    if (ref) {
        gene = syntenic_data.member[member_id].genes.gene;
    } else {
        gene = syntenic_data.ref.genes.gene;

    }
//
    var trackClass;
    var newStart_temp = 1;
    var maxLentemp = jQuery(document).width() * 0.6;

    var label = "";
    var j = 0;
    var display  = "";

    var view_type = null
    if (jQuery('input[name=view_type]:checked').val() == "with") {
        view_type = true;
    }
    else {
        view_type = false;
    }

    if (view_type == true) {
        display = "display: none;"
    } else {
        display = "display: block;"
    }


    var transcript_len = gene.transcripts.length;
    while (transcript_len--) {

        max = gene.transcripts[transcript_len].length
        var newEnd_temp = max;
        var gene_start;
        var gene_stop;
        var gene_length = gene.transcripts[transcript_len].exon_length;

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
            var temp_div = jQuery("<div>").attr({
                'id': "id" + gene.member_id,
                //'onClick': "onClicked('" + gene.desc + "','" + gene.stable_id + "','" + member_id + "')",
                //'onClick': "jQuery('#gene_info').html('" + jQuery("#hit" + transcript_len).html() + "'); jQuery.colorbox({width: '90%',height: '90%', inline: true, href: '#gene_info'});",
                'class': "gene style2",
                'style': "position:relative; "+display+" cursor:pointer; height: 14px;  LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);
            //
            var strand = 0;
            if (ref.strand == gene.transcripts[transcript_len].strand) {
                strand = 1;
            } else {
                strand = -1;
                //jQuery(wrapper_div).append("<span class=\"ui-button ui-icon ui-icon-refresh\" style=\"position: absolute; margin-left: 5px; top:0px; word-wrap: break-word; left: " + stopposition + "px;\" onclick='flip_gene(\"hit" + gene.member_id + "_" + transcript_len + "\")'>/span>")
            }
            //
            gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));
            //
            var temp_int;
            if (ref.transcript_start > ref.transcript_end) {
                temp_int = ref.transcript_start;
                ref.transcript_start = ref.transcript_end;
                ref.transcript_end = temp_int
            }
            //
            gene_list_array.push(member_id)
            //
            //
            cigar_list.push(syntenic_data.member[member_id].cigarline)
            //
            dispExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);
            //

            dispCigarLine(syntenic_data.member[member_id].cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.transcripts[0].Exons.toJSON(), transcript_start, transcript_end, strand, syntenic_data.ref.cigarline, ref.strand, gene.transcripts[transcript_len].id, "style2");


        }
        else {
            var wrapper_div = jQuery("#id" + member_id)


            var temp_div = jQuery("<div>").attr({
                'onClick': "onClicked('" + gene.desc + "','" + gene.stable_id + "','" + gene.member_id + "')",
                'class': "gene style2",
                'style': "position:relative; "+display+" cursor:pointer; height: 14px;  LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);

            gene_list_array.push(gene.member_id)
            cigar_list.push(syntenic_data.ref.cigarline)

            dispExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            dispCigarLineRef(syntenic_data.ref.cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end, gene.transcripts[transcript_len].id, "style2");


        }


    }
}