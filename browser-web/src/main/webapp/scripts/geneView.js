/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var data = "";

//var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)'];
var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)', 'rgb(177,89,40)']

function search_geneView(query, from, to, jsonid, oldtracks) {

    seqregionSearchPopup_geneView("", "", "", "", "", "");

//    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
//    jQuery('#sessioninput').fadeOut();
//    jQuery("#sessionid").html("");
//    minWidth = null;
//    removeAllPopup();
//    jQuery('#canvas').hide();
//
//
//    var reference = jQuery('#genomes').val();
//    Fluxion.doAjax(
//        'comparaService',
//        'searchDnafrags',
//        {'query': query, 'reference': reference, 'url': ajaxurl},
//        {'doOnSuccess': function (json) {
//            var content = "";
//            for (var i = 0; i < json.genomes.length; i++) {
//                if (i == 0) {
//                    content += "<table class='list' id='search_hit' ><thead><tr><th>Genome_db_id</th><th>Genome</th><th>Assembly</th><th>Link</th></tr></thead>";
//                }
//
//                content += "<tr><td> " + json.genomes[i].genome_db_name + "<td>" + json.genomes[i].name + "<td>" + json.genomes[i].assembly + " <td><a target='_blank' href='index.jsp?query=" + json.genomes[i].name + "&&genome=" + json.genomes[i].genome_db_id + "' > <span title=\"Link\" class=\"ui-button ui-icon ui-icon-link\" </span><a/></td>";
//                if (i == json.genomes.length - 1) {
//                    content += "</table>";
//                    jQuery("#searchresult").html(content);
//                    jQuery("#searchresult").fadeIn();
//                }
//
//                jQuery("#search_hit").tablesorter();
//            }
//        }
//        });
}


function seqregionSearchPopup_geneView(query, reference, from, to, jsonid, oldtracks) {
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    jQuery('#sessioninput').fadeOut();
    jQuery("#sessionid").html("");
    minWidth = null;
    removeAllPopup();
    jQuery('#canvas').hide();
    jQuery('#tabGenes').html('');
    jQuery('#tabGO').html('');
    jQuery('#tabTranscripts').html('');

    jQuery("#searchresultHead").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>");
//    Fluxion.doAjax(
//        'comparaService',
//        'searchDnafrag',
//        {'query': query, 'reference': reference, 'url': ajaxurl},
//        {'doOnSuccess': function (json) {
    var json = {"length": 43268879, "html": "", "seqname": "<p> <b>Dnafrag ID:<\/b> 1,<b> Name: <\/b> 1", "seqregname": "1", "parent": "", "tracklists": [
        {"name": "oryza_sativa", "oryza_sativa": [
            {"species_set_id": "2", "method_link_species_set_id": "homology20001", "method_link_id": "201", "name": "O_sat-B_dis_orthologues"},
            {"species_set_id": "3", "method_link_species_set_id": "homology20002", "method_link_id": "201", "name": "O_sat-H_vul_orthologues"},
            {"species_set_id": "4", "method_link_species_set_id": "homology20003", "method_link_id": "201", "name": "O_sat-A_tau_orthologues"},
            {"species_set_id": "2", "method_link_species_set_id": "homology20007", "method_link_id": "202", "name": "O_sat-B_dis_paralogues"},
            {"species_set_id": "3", "method_link_species_set_id": "homology20008", "method_link_id": "202", "name": "O_sat-H_vul_paralogues"},
            {"species_set_id": "4", "method_link_species_set_id": "homology20009", "method_link_id": "202", "name": "O_sat-A_tau_paralogues"},
            {"species_set_id": "8", "method_link_species_set_id": "homology20013", "method_link_id": "202", "name": "O_sat_paralogues"},
            {"species_set_id": "1", "method_link_species_set_id": "else40001", "method_link_id": "401", "name": "4_plants_ProtienTree"}
        ]},
        {"name": "brachypodium_distachyon", "brachypodium_distachyon": [
            {"species_set_id": "2", "method_link_species_set_id": "homology20001", "method_link_id": "201", "name": "O_sat-B_dis_orthologues"},
            {"species_set_id": "5", "method_link_species_set_id": "homology20004", "method_link_id": "201", "name": "B_dis-H_vul_orthologues"},
            {"species_set_id": "6", "method_link_species_set_id": "homology20005", "method_link_id": "201", "name": "B_dis-A_tau_orthologues"},
            {"species_set_id": "2", "method_link_species_set_id": "homology20007", "method_link_id": "202", "name": "O_sat-B_dis_paralogues"},
            {"species_set_id": "5", "method_link_species_set_id": "homology20010", "method_link_id": "202", "name": "B_dis-H_vul_paralogues"},
            {"species_set_id": "6", "method_link_species_set_id": "homology20011", "method_link_id": "202", "name": "B_dis-A_tau_paralogues"},
            {"species_set_id": "9", "method_link_species_set_id": "homology20014", "method_link_id": "202", "name": "B_dis_paralogues"},
            {"species_set_id": "1", "method_link_species_set_id": "else40001", "method_link_id": "401", "name": "4_plants_ProtienTree"}
        ]},
        {"name": "hordeum_vulgare", "hordeum_vulgare": [
            {"species_set_id": "3", "method_link_species_set_id": "homology20002", "method_link_id": "201", "name": "O_sat-H_vul_orthologues"},
            {"species_set_id": "5", "method_link_species_set_id": "homology20004", "method_link_id": "201", "name": "B_dis-H_vul_orthologues"},
            {"species_set_id": "7", "method_link_species_set_id": "homology20006", "method_link_id": "201", "name": "H_vul-A_tau_orthologues"},
            {"species_set_id": "3", "method_link_species_set_id": "homology20008", "method_link_id": "202", "name": "O_sat-H_vul_paralogues"},
            {"species_set_id": "5", "method_link_species_set_id": "homology20010", "method_link_id": "202", "name": "B_dis-H_vul_paralogues"},
            {"species_set_id": "7", "method_link_species_set_id": "homology20012", "method_link_id": "202", "name": "H_vul-A_tau_paralogues"},
            {"species_set_id": "10", "method_link_species_set_id": "homology20015", "method_link_id": "202", "name": "H_vul_paralogues"},
            {"species_set_id": "1", "method_link_species_set_id": "else40001", "method_link_id": "401", "name": "4_plants_ProtienTree"}
        ]},
        {"name": "aegilops_tauschii", "aegilops_tauschii": [
            {"species_set_id": "4", "method_link_species_set_id": "homology20003", "method_link_id": "201", "name": "O_sat-A_tau_orthologues"},
            {"species_set_id": "6", "method_link_species_set_id": "homology20005", "method_link_id": "201", "name": "B_dis-A_tau_orthologues"},
            {"species_set_id": "7", "method_link_species_set_id": "homology20006", "method_link_id": "201", "name": "H_vul-A_tau_orthologues"},
            {"species_set_id": "4", "method_link_species_set_id": "homology20009", "method_link_id": "202", "name": "O_sat-A_tau_paralogues"},
            {"species_set_id": "6", "method_link_species_set_id": "homology20011", "method_link_id": "202", "name": "B_dis-A_tau_paralogues"},
            {"species_set_id": "7", "method_link_species_set_id": "homology20012", "method_link_id": "202", "name": "H_vul-A_tau_paralogues"},
            {"species_set_id": "11", "method_link_species_set_id": "homology20016", "method_link_id": "202", "name": "A_tau_paralogues"},
            {"species_set_id": "1", "method_link_species_set_id": "else40001", "method_link_id": "401", "name": "4_plants_ProtienTree"}
        ]}
    ]};
    if (json.html == "genomes") {
        jQuery('#canvas').hide();
        jQuery('#currentposition').hide();
        jQuery("#searchresult").fadeIn();
        var content = "<h1>Search Results: </h1><br>";
//
        for (var i = 0; i < json.genomes.length; i++) {
            if (i == 0) {
                content += "<table class='list' id='search_hit' ><thead><tr><th>Genome_db_id</th><th>Genome</th><th>Assembly</th><th>Link</th></tr></thead>";
            }
            content += "<tr><td> " + json.genomes[i].genome_db_id + "<td>" + json.genomes[i].name + "<td>" + json.genomes[i].assembly + " <td><a target='_blank' href='index.jsp?query=" + json.genomes[i].name + "' > <span title=\"Link\" class=\"ui-button ui-icon ui-icon-link\" </span><a/></td>";
        }
        jQuery("#searchresult").html(content)
    }
    else {
        seq = json.html;
        seqregname = json.seqregname;
        sequencelength = json.length;
        track_list = json.tracklists;
        trackList(track_list);
        setRef(sequencelength)
        dispSeqCoord();
        jQuery('#canvas').show();
        findminwidth();
        getMember();
    }
//        }
//        });
}

function setRef(length) {

}

function getChromosomes(genome_db_id) {
    jQuery("#chr_maps").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    jQuery("#bar_image_ref").html("")
    jQuery("#selected_region").html("")


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
            while (referenceLength--) {

                var left = parseInt(referenceLength * (width)) + parseInt(distance * referenceLength) + parseInt(distance);
                var height = (json.member[referenceLength].length * 90 / max);
                var length = json.member[referenceLength].length;
                var top = parseInt(jQuery("#map").css('top')) + parseInt(jQuery("#map").css('height')) - (height + 20);
                jQuery("<div>").attr({
                    'class': 'refmap',
                    'style': "left: " + left + "px; width:" + width + "px; height:" + height + "px;",
                    'onClick': 'getMember(' + json.member[referenceLength].chr_name + ',' + genome_db_id + ')'
                }).appendTo("#chr_maps");
                jQuery("<div>").attr({
                    'style': "position: absolute; bottom: 0px; left: " + left + "px; width:" + width + "px; "
                }).html(json.member[referenceLength].chr_name).appendTo("#chr_maps");

            }
        }
        }
    )
}
function getMember(chr_name, genome_db) {
    jQuery("#selected_region").html("")

    jQuery("#bar_image_ref").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    Fluxion.doAjax(
        'comparaService',
        'getMember',
        {'chr_name': chr_name, 'reference': genome_db, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            data = json.member;

            jQuery("#bar_image_ref").html("")
            sequencelength = json.chr_length;
            jQuery("<div>").attr({
                'class': 'refmap',
                'style': "left: 0px; width: 100%; height: 10px; position: absolute; top: 0px;"
            }).appendTo("#bar_image_ref");
        }
        });
}

function kickOff() {

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

    function dragtohere(e) {
        var left = parseFloat(e.pageX);// - jQuery('#canvas').offset().left);
        jQuery("#bar_image_selector").animate({"left": left});
    }
}

function drawSelected() {
    jQuery("#selected_region").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")

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
    while (data_length--) {
        var newStart = new_data[data_length].start
        var newEnd = new_data[data_length].end
        var id = "ref" + new_data[data_length].id;
        var startposition = (newStart - start) * parseFloat(maxLentemp) / parseFloat(end - start);
        var stopposition = (newEnd - newStart + 1) * parseFloat(maxLentemp) / parseFloat(end - start);
        if (stopposition < 1) {
            stopposition = 1;
        }
        jQuery("#selected_region").html("")
        jQuery("<div>").attr({
            'id': id,
            'class': "refMarkerShow",
            'style': "LEFT:" + startposition + "px; width :" + stopposition + "px;",
            'onClick': "getcoreMember(\"" + new_data[data_length].id + "\")"
        }).appendTo("#selected_region");
    }
}

function getcoreMember(query) {
    jQuery(".refMarkerShow").css("background", "black")
    jQuery("#ref" + query).css("background", "red")

    Fluxion.doAjax(
        'comparaService',
        'getCoreMember',
        {'query': query, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            var core_data = json.member;
            var max = 0;
            jQuery("#gene_widget").html("")
            for (var i = 0; i < core_data.length; i++) {
                var genes = core_data[i].genes;
                var new_max = genes.gene.length;
                if (new_max > max) {
                    max = new_max;
                }
                var core_data = json.member;
                var max = 0;
                jQuery("#gene_widget").html("")
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
                var name = "";
                var length = jQuery('#genomes').children('option').length;

                for (var j = 0; j < length; j++) {
                    var id = jQuery('#genomes').children('option')[j].value;
                    var title = jQuery('#genomes').children('option')[j].text;
                    if (ref_data.genome == id) {
                        name = title;
                    }
                }

                browser_coordinates(max)


                jQuery("#gene_widget").append("<div style='left:100px; width: 1000px; padding: 25px 5px; position: relative; border: 2px solid black; top: 10px' id='ref'><span style='position: absolute; left:-100px; width: 100px; word-wrap: break-word; top:-5px; '> <b>" + name + "</b></span></div>")

                dispGenes("#ref", genes, max, ref_data.cigarline);

                ref_data.genes.gene.transcripts[0].Exons.sort(sort_by('start', true, parseInt));

                var exon_nu = 0
                var diff = ref_data.genes.gene.transcripts[0].Exons[0].end - ref_data.genes.gene.transcripts[0].transcript_start
                while (diff < 0) {
                    ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = 0
                    exon_nu++;
                    diff = ref_data.genes.gene.transcripts[0].Exons[exon_nu].end - ref_data.genes.gene.transcripts[0].transcript_start
                }
                ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = diff;
                ref_data.genes.gene.transcripts[0].Exons[exon_nu]._start += ref_data.genes.gene.transcripts[0].transcript_start - ref_data.genes.gene.transcripts[0].Exons[exon_nu].start;


                var exon_nu = ref_data.genes.gene.transcripts[0].Exons.length - 1
                var diff = ref_data.genes.gene.transcripts[0].transcript_end - ref_data.genes.gene.transcripts[0].Exons[exon_nu]._start
                while (diff < 0) {
                    ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = 0
                    exon_nu--;
                    diff = ref_data.genes.gene.transcripts[0].transcript_end - ref_data.genes.gene.transcripts[0].Exons[exon_nu]._start
                }

                ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = diff;

                for (var i = 0; i < core_data.length; i++) {
                    var genes = core_data[i].genes
                    if (document.getElementById("core" + core_data[i].genome) == null) {
                        var name = "";
                        var length = jQuery('#genomes').children('option').length;

                        for (var j = 0; j < length; j++) {
                            var id = jQuery('#genomes').children('option')[j].value;
                            var title = jQuery('#genomes').children('option')[j].text;
                            if (core_data[i].genome == id) {
                                name = title;
                            }
                        }
                        jQuery("#gene_widget").append("<div style='left:100px; width: 1000px; padding: 25px 5px;  position: relative; border: 1px solid gray; top: 10px' id='core" + core_data[i].genome + "'><span style='position: absolute; left:-100px; width: 100px; word-wrap: break-word; top: -5px;'><b>" + name + "</b></span></div>")
                    }

                    if (core_data[i].cigarline) {
                        dispGenes("#core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline);
                    }

                    else {
                        dispGenes("#core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline);
                    }

                }

            }
        }
        });
}

function dispGenes(div, track, max, cigarline, ref, ref_cigar) {
    var gene = track.gene;

    var trackClass;

    var newStart_temp = 1;
    var newEnd_temp = max;
    var maxLentemp = jQuery(div).css("width");

    var label = "";
    var j = 0;

    var transcript_len = gene.transcripts.length;

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
        var stopposition = (gene_stop - gene_start + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var margin = "margin-top:15px;margin-bottom:5px;";
        if (transcript_len == 0) {
            margin = "margin-top:15px;margin-bottom:25px;";
        }


        if (ref) {

            var temp_div = jQuery("<div>").attr({
                'id': transcript_len,
                'onClick': "jQuery('#gene_info').html('" + JSON.stringify(gene.transcripts[transcript_len]) + "')",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).html("<span style='position: absolute; left:-100px; width: 100px; word-wrap: break-word;'>" + label + "(" + gene.reference + ")</span> ").appendTo(div);

            var strand = 0;
            if (ref.strand == gene.transcripts[transcript_len].strand) {
                strand = 1;
            } else {
                strand = -1;
            }

            gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));

            if (strand == -1) {
                gene.transcripts[transcript_len].Exons = reverse_exons(gene.transcripts[transcript_len]);

                jQuery("<div>").attr({
                    'class': "",
                    'style': "position:absolute; background:red; opacity:0.2; z-index; 599; cursor:pointer; height: 24px; top:-5px; LEFT:0px; width :100%;"
                }).appendTo(temp_div);
                gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));

                var temp_start = gene.transcripts[transcript_len].end - gene.transcripts[transcript_len].transcript_end;
                var temp_end = gene.transcripts[transcript_len].transcript_start - gene.transcripts[transcript_len].start;

                gene.transcripts[transcript_len].transcript_start = parseInt(gene.transcripts[transcript_len].start) + parseInt(temp_start);
                gene.transcripts[transcript_len].transcript_end = parseInt(gene.transcripts[transcript_len].end) - parseInt(temp_end);

                transcript_start = gene.transcripts[transcript_len].transcript_start;
                transcript_end = gene.transcripts[transcript_len].transcript_end;


            }


            var temp_int;
            if (ref.transcript_start > ref.transcript_end) {
                temp_int = ref.transcript_start;
                ref.transcript_start = ref.transcript_end;
                ref.transcript_end = temp_int
            }


            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);


            dispCigarLine(cigarline, 1, top, (gene_stop - gene_start), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.Exons.toJSON(), transcript_start, transcript_end, strand, ref_cigar);
        }
        else {
            var temp_div = jQuery("<div>").attr({
                'id': transcript_len,
                'onClick': "jQuery('#gene_info').html('" + JSON.stringify(gene.transcripts[transcript_len]) + "')",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " top:10px; LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).html("<span style='position: absolute; left:-100px; width: 100px; word-wrap: break-word;'>" + label + "(" + gene.reference + ")</span> ").appendTo(div);

            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            dispCigarLineRef(cigarline, 1, top, (gene_stop - gene_start), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end);


        }


    }
}

function dispGeneExon(track, genestrand, div, gene_start, width, max_len, id) {

    var trackClass = "exon";
    var disp_exon = false;
    var geneexons = track.Exons;

    if (geneexons.length > 0) {
        var strand = genestrand;

        var spanclass = "ui-icon ui-icon-carat-1-e";

        if (strand == -1 || strand == "-1") {
            spanclass = "ui-icon ui-icon-carat-1-w";
        }

        var newStart_temp = gene_start;
        var maxLentemp = width;


        var exon_len = geneexons.length;
        var startposition = 0;
        var stopposition = 0;
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

            var top = 0;

            startposition = (exon_start - newStart_temp) * parseFloat(maxLentemp) / (max_len);
            stopposition = (exon_stop - exon_start + 1) * parseFloat(maxLentemp) / (max_len);

//            to make up for border added
            stopposition = stopposition - 4;


            jQuery("<div>").attr({
                'class': trackClass,
                'id': "exon" + track.id + "" + exon_len,
                'style': "position:absolute; cursor:pointer; height: 10px; z-index: 999;  TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
            }).appendTo(div);
            if (disp_exon) {
                jQuery("<span>").attr({
                    'class': spanclass,
                    'style': "cursor:pointer; position:absolute; z-index; 999; TOP:" + (top - 1) + "px; left:" + (startposition - 20) + "px "
                }).appendTo(div);
            }
            disp_exon = true;
        }
    }
}

function dispCigarLine(cigars, start, top, max, gene_start, stop, exons, temp_div, ref_exons, transcript_start, transcript_end, strand, ref_cigar) {
    exons = jQuery.parseJSON(exons);

    exons.sort(sort_by('start', true, parseInt));
    var track_html = "";
    var trackClass = "";
    var newStart_temp = transcript_start;
    var newEnd_temp = transcript_end;
    var maxLentemp = stop;
    var exon_number = 0;
    var ref_exon_number = 0;

    var cigar_pos = transcript_start - gene_start;
    var temp_end = exons[exon_number].end - gene_start;
    var temp_start = 1;
    var startposition;
    var stopposition;
    var no_of_exons = exons.length;
    var cigar_string = "";

    if (cigars != '*') {
        cigars = cigars.replace(/([SIXMND])/g, ":$1,");
        var cigars_array = cigars.split(',');
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


        if (strand == -1) {
            cigar_string = cigar_string.split("").reverse().join("")
        }


        if (ref_exons) {
            ref_exons = jQuery.parseJSON(ref_exons);

            ref_exons.sort(sort_by('start', true, parseInt));


            cigar_string = formatCigar(ref_exons, cigar_string, colours, ref_cigar)

        }


        cigar_string = cigar_string.replace(/(MD)/g, "M,D");
        cigar_string = cigar_string.replace(/(DM)/g, "D,M");
        cigar_string = cigar_string.replace(/(D_)/g, "D,_");
        cigar_string = cigar_string.replace(/(_M)/g, "_,M");
        cigar_string = cigar_string.replace(/(M_)/g, "M,_");
        cigar_string = cigar_string.replace(/(_D)/g, "_,D");


        var k = 0;
        var l = 0;


        var cigars_array = cigar_string.split(',');
        first: for (var i = 0; i < cigars_array.length; i++) {

            var key = cigars_array[i].charAt(0);
            var length = cigars_array[i].length;

            var cigars_second_array = cigars_array[i].split("-");

            for (var j = 0; j < cigars_second_array.length; j++) {

                length = cigars_second_array[j].length;

                if (key == "M" && length > 0) {
                    k = parseInt(l) + parseInt(j);

                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));
                    trackClass = "insert";
                    if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[k], cigar_pos);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)

                    } else {
                        var bool = true;

                        second: while (bool) {
                            stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));

                            trackHTML(startposition, stopposition, top, trackClass + " endcorner", temp_div, colours[k], cigar_pos);

                            var diff = (temp_end - cigar_pos);
                            length = length - diff;

                            exon_number++;


                            if (exon_number >= no_of_exons) {
                                break second;
                                continue first;
                            }


                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = exons[exon_number].end - gene_start;

                            cigar_pos = temp_start;

                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));

                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < temp_end) {
                                trackHTML(startposition, stopposition, top, trackClass + " frontcorner", temp_div, colours[k], cigar_pos);
                                cigar_pos = parseInt(cigar_pos) + parseInt(length)
                                bool = false;
                            }
                            else {
                                trackClass += " elselse"
                            }

                        }
                    }
                }
                else if (key == "D" && length > 0) {
                    trackClass = "delete ui-icon ui-icon-carat-1-s";

                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                    if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, "white", cigar_pos);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)

                    } else {


                        var bool = true;

                        forth: while (bool) {

                            stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));

                            trackHTML(startposition, stopposition, top, trackClass, temp_div, "white", cigar_pos);


                            var diff = (temp_end - cigar_pos);
                            length = length - diff;

                            exon_number++;

                            if (exon_number >= no_of_exons) {
                                break forth;
                                continue first;
                            }
                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = exons[exon_number].end - gene_start;

                            cigar_pos = temp_start;
                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < temp_end) {

                                trackHTML(startposition, stopposition, top, trackClass, temp_div, "white", cigar_pos);
                                cigar_pos = parseInt(cigar_pos) + parseInt(length)
                                bool = false;
                            }
                            else {
                                trackClass += " elselse"
                            }
                        }
                    }
//                    startposition = parseInt((cigar_pos) * parseFloat(maxLentemp) / (max));
//                    stopposition = 15;
//                    trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colours[j], length);

                }
                else if (key == "_" && length > 0) {
                    trackClass = "insert";

                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                    if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", cigar_pos);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)

                    } else {


                        var bool = true;

                        third: while (bool) {

                            stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));

                            trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", cigar_pos);


                            var diff = (temp_end - cigar_pos);
                            length = length - diff;

                            exon_number++;

                            if (exon_number >= no_of_exons) {
                                break third;
                                continue first;
                            }
                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = exons[exon_number].end - gene_start;

                            cigar_pos = temp_start;
                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < temp_end) {

                                trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", cigar_pos);
                                cigar_pos = parseInt(cigar_pos) + parseInt(length)
                                bool = false;
                            }
                            else {
                                trackClass += " elselse"
                            }
                        }
                    }

                }
                else {
                }
            }

            l = l + (cigars_second_array.length - 1);

        }

    }

    function trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colour, title) {
        var track_html_local;
        track_html_local = "<div class='" + trackClass + "' " +
            "STYLE=\"height: 14px; z-index: 1999; TOP:-5px; LEFT:" + startposition + "px; margin-left: -7px;" +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }

    function trackHTML(startposition, stopposition, top, trackClass, temp_div, colour, title) {
        var track_html_local;

        track_html_local = "<div class='" + trackClass + "' " +
            "STYLE=\"height: 14px; z-index: 1999; TOP:0px; LEFT:" + startposition + "px; opacity:0.5; background:" + colour + "; " +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }
}

function dispCigarLineRef(cigars, start, top, max, gene_start, stop, exons, temp_div, ref_exons, transcript_start, transcript_end, strand) {

    exons = jQuery.parseJSON(exons);
    exons.sort(sort_by('start', true, parseInt));

    var track_html = "";
    var trackClass = "";
    var newStart_temp = transcript_start;
    var newEnd_temp = transcript_end;
    var maxLentemp = stop;

    var exon_number = 0;
    var ref_exon_number = 0;

    var cigar_pos = transcript_start - gene_start;
    var temp_end = exons[exon_number].end - gene_start;

    var temp_start = 1;
    var startposition;
    var stopposition;
    var no_of_exons = ref_exons.length;


    var cigar_string = "";

    if (cigars != '*') {


        cigars = cigars.replace(/([SIXMND])/g, ":$1,");
        var cigars_array = cigars.split(',');
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

        cigar_string = cigar_string.replace(/(MD)/g, "M,D");
        cigar_string = cigar_string.replace(/(DM)/g, "D,M");

        var k = 0;
        var cigars_array = cigar_string.split(',');

        first: for (var i = 0; i < cigars_array.length; i++) {


            var key = cigars_array[i].charAt(0);
            var length = cigars_array[i].length;


            if (key == "M") {
                trackClass = "match";


                startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
                    trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[exon_number], length);
                    cigar_pos = parseInt(cigar_pos) + parseInt(length)
                } else {
                    var bool = true;

                    second: while (bool) {

                        stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));
                        trackHTML(startposition, stopposition, top, trackClass + " endcorner", temp_div, colours[exon_number], temp_end - cigar_pos);

                        var diff = (temp_end - cigar_pos);
                        length = length - diff;

                        exon_number++;

                        if (exon_number >= no_of_exons) {
                            break second;
                            continue first;
                        }

                        temp_start = exons[exon_number].start - gene_start;
                        temp_end = exons[exon_number].end - gene_start;

                        cigar_pos = temp_start;

                        startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                        stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                        if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {

                            trackHTML(startposition, stopposition, top, trackClass + " frontcorner", temp_div, colours[exon_number], length);
                            cigar_pos = parseInt(cigar_pos) + parseInt(length)
                            bool = false;
                        }
                        else {
                            trackClass += " elselse"
                        }

                    }
                }
            }
            else if (key == "D") {
                trackClass = "delete ui-icon ui-icon-carat-1-s";

//                startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
//                stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));
//
//                if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
//                    trackHTML(startposition, stopposition, top, trackClass, temp_div, "gray", cigar_pos);
//                    cigar_pos = parseInt(cigar_pos) + parseInt(length)
//
//                } else {
//
//
//                    var bool = true;
//
//                    forth: while (bool) {
//
//                        stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));
//
//                        trackHTML(startposition, stopposition, top, trackClass, temp_div, "gray", cigar_pos);
//
//
//                        var diff = (temp_end - cigar_pos);
//                        length = length - diff;
//
//                        exon_number++;
//
//                        if (exon_number >= no_of_exons) {
//                            break forth;
//                            continue first;
//                        }
//                        temp_start = exons[exon_number].start - gene_start;
//                        temp_end = exons[exon_number].end - gene_start;
//
//                        cigar_pos = temp_start;
//                        startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
//                        stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));
//
//                        if (parseInt(cigar_pos) + parseInt(length) < temp_end) {
//
//                            trackHTML(startposition, stopposition, top, trackClass, temp_div, "gray", cigar_pos);
//                            cigar_pos = parseInt(cigar_pos) + parseInt(length)
//                            bool = false;
//                        }
//                        else {
//                            trackClass += " elselse"
//                        }
//                    }
//                }
                trackClass = "delete ui-icon ui-icon-carat-1-s";
                startposition = parseInt((cigar_pos) * parseFloat(maxLentemp) / (max));
                stopposition = 15;
                trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colours[exon_number], length);
            }
        }
    }

    function trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colour, title) {
        var track_html_local;

        track_html_local = "<div class='" + trackClass + "' " +
            "STYLE=\"height: 14px; z-index: 1999; TOP:-5px; LEFT:" + startposition + "px; margin-left: -7px;" +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }

    function trackHTML(startposition, stopposition, top, trackClass, temp_div, colour, title) {
        var track_html_local;

        track_html_local = "<div class='" + trackClass + "' " +
            "STYLE=\"position: absolute; height: 14px; z-index: 1999; TOP:0px; LEFT:" + startposition + "px; opacity:0.5; background:" + colour + "; " +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }
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

function formatCigar(ref_exons, hit_cigar, colours, ref_cigar) {

    var no_of_exons = ref_exons.length
    var hit_cigar_arr = [];
    var ref_exon_array = [];
    var last_pos = 0;
    var i = 0
    var j = 0;
    while (i < no_of_exons) {
        var ref_exon = ref_exons[i].length;
        ref_exon_array.push(ref_exon)
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
    while (j < cigar_string.length) {
//        if (cigar_string.charAt(j) == 'M' || cigar_string.charAt(j) == 'D') {
        if (a == ref_exon_array[p]) {
            p++;
            hit_cigar_arr.push(hit_cigar.substr(last_pos, b));
            a = 0;
            last_pos += b;
            b = 0;
        }
        a++;
//        }
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
