/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 26/06/2014
 * Time: 16:30
 * To change this template use File | Settings | File Templates.
 */

function dispGenesExon(div, track, max, cigarline, ref, ref_cigar, genome) {

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

            var wrapper_div = jQuery("<div>").attr({
                'style': "position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width :100%;"
            }).html(
                    "<div class='handle-gene' style='position: absolute; margin-left: 10px; left: "+stopposition+"px; word-wrap: break-word; width: 200px; height: 20px;'>" +
                        "<span class='handle-gene label geneinfo' style='position: relative; margin-left: 10px;   word-wrap: break-word;'>" + genome + ":" + stringTrim(gene.desc, 100) + " </span>" +
                        "<span class='handle-gene label stable' style='position: relative; margin-left: 10px;  word-wrap: break-word;'>" + gene.stable_id + " </span>" +
                        "</div>"
//                    "<span class='handle-gene' style='position: absolute; margin-left: 10px; left:"+stopposition+"px;  word-wrap: break-word;'>" + genome +":"+stringTrim(gene.desc, 100) + " </span> <span class='handle-gene' style='position: absolute; margin-left: 10px; left:"+stopposition+"px;  word-wrap: break-word;'>" + gene.stable_id + " </span> "
                ).appendTo(div);

            var temp_div = jQuery("<div>").attr({
                'id': "id" + gene.member_id,
                'onClick': "onClicked('"+gene.desc+"','"+gene.stable_id+"','"+gene.member_id+"')",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);

            var strand = 0;
            if (ref.strand == gene.transcripts[transcript_len].strand) {
                strand = 1;
            } else {
                strand = -1;
                jQuery(wrapper_div).append("<span class=\"ui-button ui-icon ui-icon-refresh\" style=\" margin-left: 5px; top:0px; word-wrap: break-word; left: " + stopposition + "px;\" onclick='flip_gene(\"hit" + gene.member_id + "_" + transcript_len + "\")'>/span>")
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

            dispExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);

            dispCigarLine(cigarline, 1, top, gene_length, gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.Exons.toJSON(), transcript_start, transcript_end, strand, ref_cigar, ref.strand, gene.transcripts[transcript_len].id, "#gene_widget_exons");

//            jQuery("<span>").attr({
//                'style': ' margin-left: 10px; left:"+stopposition+"px;  word-wrap: break-word;'
//            }).html(gene.stable_id).appendTo(wrapper_div)

        }
        else {
            var wrapper_div = jQuery("<div>").attr({
                'style': "position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width :100%;"
            }).html(
                    "<div class='handle-gene' style='position: absolute; margin-left: 10px; left: "+stopposition+"px; word-wrap: break-word; width: 200px; height: 20px;'>" +
                        "<span class='handle-gene label geneinfo' style='position: relative; margin-left: 10px;  word-wrap: break-word;'>" + genome + ":" + stringTrim(gene.desc, 100) + " </span>" +
                        "<span class='handle-gene label stable' style='position: relative; margin-left: 10px; word-wrap: break-word;'>" + gene.stable_id + " </span>" +
                        "</div>"
                ).appendTo(div);

            var temp_div = jQuery("<div>").attr({
                'id': "id" + gene.member_id,
                'onClick': "onClicked('"+gene.desc+"','"+gene.stable_id+"','"+gene.member_id+"')",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);

            gene_list_array.push(gene.member_id)
            cigar_list.push(cigarline)

            dispExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            dispCigarLineRef(cigarline, 1, top, gene_length, gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end, gene.transcripts[transcript_len].id, "#gene_widget_exons");

//            jQuery("<span>").attr({
//                'style': ' margin-left: 10px; left:"+stopposition+"px;  word-wrap: break-word;'
//            }).html(gene.stable_id).appendTo(wrapper_div)

        }


    }
}

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

//        var spanclass = "forward";
//
//        if (strand == -1 || strand == "-1") {
//            spanclass = "reverse";
//        }
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
                'id': "exon" + track.id + "" + geneexons[exon_len].id,
                'style': "position:relative; float:left; margin-right:" + margin + " cursor:pointer; height: 10px; z-index: 999;  TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px",
                'title': exon_start + ":" + exon_stop
            }).appendTo(div);
////
//            if (stopposition > 10) {
//                if (spanclass == "forward") {
//                    startposition = startposition + (stopposition - 8)
//
//                }
//
//
//                jQuery("<div>").attr({
//                    'class' : spanclass,
//                    'style': "left:"+startposition+"px;"
//                }).appendTo(div)
//
//            }

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

            var temp_div = ("#gene_widget_exons #"+jQuery(div).attr('id')+" #exon"+ track.id + "" + geneexons[exon_len].id)

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