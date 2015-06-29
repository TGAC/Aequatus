/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 26/06/2014
 * Time: 16:30
 * To change this template use File | Settings | File Templates.
 */

function dispExon(g, svg, track, genestrand, div, gene_start, width, max_len, id) {

    var trackClass = "exon";
    var utrtrackClass = "utr";

    var disp_exon = false;
    var geneexons = track.Exons;

    var space = 10 * (geneexons.length - 1)


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

            if (disp_exon == true) {
                startposition = parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len - 1].id + "style2").attr("width")) + parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len - 1].id + "style2").attr("x")) + 10//(exon_start - newStart_temp) * parseFloat(maxLentemp) / (max_len);

            } else {
                startposition = 1

            }
            stopposition = ((exon_stop - exon_start) + 1) * parseFloat(maxLentemp) / (max_len);

            svg.rect(g, startposition, 1, stopposition, 10, 2, 2, {
                id: "exon" + track.id + "" + geneexons[exon_len].id + "style2",
                fill: 'white',
                stroke: 'green',
                strokeWidth: 2
            });

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

                startposition = parseFloat(startposition)+ parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len].id + "style2").attr("x"))

                svg.rect(g,startposition, 1, stopposition, 10, {class: 'utr3', fill:'gray'});

                last = current;

            }
            else if (exon_start < transcript_start && exon_stop > transcript_end) {
                startposition = 0;// ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);

                stopposition = parseInt(stopposition)

                startposition = parseFloat(startposition)+ parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len].id + "style2").attr("x"))

                svg.rect(g,startposition, 1, stopposition, 10, {class: 'utr3', fill:'gray'});


                startposition = ((transcript_end - exon_start) - 1) * parseFloat(maxLentemp) / (max_len);
                stopposition = 0;//(exon_stop - transcript_end + 1) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)


                startposition = parseFloat(startposition)+ parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len].id + "style2").attr("x"))

                svg.rect(g,startposition, 1, stopposition, 10, {class: 'utr3', fill:'gray'});


                last = current;
            }
            else if (exon_stop > transcript_start && exon_start < transcript_start) {
                startposition = 0;// ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)

                startposition = parseFloat(startposition)+ parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len].id + "style2").attr("x"))

                svg.rect(g,startposition, 1, stopposition, 10, {class: 'utr3', fill:'gray'});


                last = current;

            }
            else if (exon_stop > transcript_end && exon_start < transcript_end) {
                startposition = ((transcript_end - exon_start)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - transcript_end) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)

                startposition = parseFloat(startposition)+ parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len].id + "style2").attr("x"))

                svg.rect(g,startposition, 1, stopposition, 10, {class: 'utr3', fill:'gray'});

                last = current;


            }

            else if (exon_start > transcript_start && exon_stop > transcript_end) {
                startposition = 1;
                stopposition = (exon_stop - exon_start) * parseFloat(maxLentemp) / (max_len);
                stopposition = parseInt(stopposition)

                startposition = parseFloat(startposition)+ parseFloat(jQuery("#exon" + track.id + "" + geneexons[exon_len].id + "style2").attr("x"))

                svg.rect(g,startposition, 1, stopposition, 10, {class: 'utr3', fill:'gray'});


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

    var svg = jQuery("#id" + member_id).svg("get")
    var g = svg.group({class: 'style2'});

    var trackClass;
    var newStart_temp = 1;
    var maxLentemp = jQuery(document).width() * 0.6;

    var label = "";
    var j = 0;
    var display = "";

    var view_type = null
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
            ref = syntenic_data.ref.genes.gene
            var wrapper_div = jQuery("#id" + member_id)
            var temp_div = svg;
            var strand = 0;
            if (ref.strand == gene.transcripts[transcript_len].strand) {
                strand = 1;
            } else {
                strand = -1;
            }
            //
            gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));
            var temp_int;
            if (ref.transcript_start > ref.transcript_end) {
                temp_int = ref.transcript_start;
                ref.transcript_start = ref.transcript_end;
                ref.transcript_end = temp_int
            }
            gene_list_array.push(member_id)

            cigar_list.push(syntenic_data.member[member_id].cigarline)
            dispExon(g, svg, gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);
            var g = svg.group({id: 'id' + member_id+'style2CIGAR' ,class: 'style2 CIGAR'});

            dispCigarLine(g, syntenic_data.member[member_id].cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.transcripts[0].Exons.toJSON(), transcript_start, transcript_end, strand, syntenic_data.ref.cigarline, ref.strand, gene.transcripts[transcript_len].id, "style2");
        }
        else {
            var wrapper_div = jQuery("#id" + member_id)

            var temp_div = svg;

            gene_list_array.push(gene.member_id)
            cigar_list.push(syntenic_data.ref.cigarline)

            dispExon(g, svg, gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            var g = svg.group({id: 'id' + member_id+'style2CIGAR' ,class: 'style2 CIGAR'});

            dispCigarLineRef(g, syntenic_data.ref.cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end, gene.transcripts[transcript_len].id, "style2");
        }
    }
}