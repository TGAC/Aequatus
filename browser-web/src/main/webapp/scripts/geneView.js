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

function getChromosomes(genome_db_id, chr, member_id) {
    console.log("getChromosome")

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
            while (referenceLength--) {

                var left = parseInt(referenceLength * (width)) + parseInt(distance * referenceLength) + parseInt(distance);
                var height = (json.member[referenceLength].length * 80 / max);
                var length = json.member[referenceLength].length;
                var top = parseInt(jQuery("#map").css('top')) + parseInt(jQuery("#map").css('height')) - (height + 20);
                jQuery("<div>").attr({
                    'id': 'chr' + json.member[referenceLength].chr_name,
                    'class': 'refmap',
                    'chr_length': json.member[referenceLength].length,
                    'style': "left: " + left + "px; width:" + width + "px; height:" + height + "px; background: " + jQuery("#genome" + genome_db_id).css("background"),
                    'onClick': 'getMember("' + json.member[referenceLength].chr_name + '",' + genome_db_id + ')'
                }).appendTo("#chr_maps");
                jQuery("<div>").attr({
                    'style': "position: absolute; bottom: 0px; left: " + left + "px; width:" + width + "px; "
                }).html(json.member[referenceLength].chr_name).appendTo("#chr_maps");


            }

            if (member_id == undefined) {
                getMember(json.member[0].chr_name, genome_db_id);
            } else {
                getMember(chr, genome_db_id, member_id);

            }

        }
        }
    )
}
function getMember(chr_name, genome_db, member_id) {
    console.log("getMember")
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


    var testTextBox = jQuery('#search');
    var code = null;
    testTextBox.keypress(function (e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            search(jQuery('#search').val());
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

    function dragtohere(e) {
        var left = parseFloat(e.pageX);// - jQuery('#canvas').offset().left);
        var width = jQuery("#bar_image_selector").width()
        left -= width / 2
        jQuery("#bar_image_selector").animate({"left": left});
        drawSelected()
    }
}

function drawSelected(member) {
    console.log("drawSelected")

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
    console.log("get core member")
    jQuery(".refMarkerShow").css("background", "black")
    jQuery("#ref" + query).css("background", "red")
    jQuery("#gene_widget").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")


    Fluxion.doAjax(
        'comparaService',
        'getCoreMember',
        {'query': query, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            if (json.ref) {

                jQuery("#gene_widget").html("")

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


                    jQuery("#gene_widget").append("<div style='left:-100px; width: 1200px; position: relative; border: 2px solid black; top: 10px; overflow: hidden; box-shadow: 1px 1px 15px 15px #D3D3D3;' id='ref_wrapper'>" +
                        "<div class=handle-genome style='background-image: url(/images/browser/utr.png); background: " + colour + "; padding: 5px; position: absolute; top: 0px; height: 100%; left: 40px; width: 20px;'></div>" +
                        "<span style='left: 0px; width: 100px; top: 50px; position: absolute; transform: rotate(90deg); word-wrap: break-word;'> <b>" + stringTrim(name, 100) + "</b></span>" +
                        "<div style='left:200px; width: 1000px; padding: 25px 0px; position: relative;' id='ref'></div>")


                    dispGenes("#ref", genes, max, ref_data.cigarline);


                    ref_data.genes.gene.transcripts[0].Exons.sort(sort_by('start', true, parseInt));

                    var exon_nu = 0


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
//                while (diff < 0) {
//                    ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = 0
//                    exon_nu--;
//                    diff = parseInt(ref_data.genes.gene.transcripts[0].transcript_end - ref_data.genes.gene.transcripts[0].Exons[exon_nu]._start) + parseInt(1)
//                }

//                ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = diff;


//                    console.log("gene")
//                    nj_gene_list = []
//                    nj_string_tree = ""
//                    string_tree = ""
//
//                    calculateDistanceMatrix(ref_data, core_data)
//
//                    upgma_matrix = distance_matrix;
//                    findNearestNode()
//
//
//                    nj_matrix = distance_matrix;
//                    calculateQMatrix()




                    for (var i = 0; i < core_data.length; i++) {
                        var genes = core_data[i].genes
                        if (document.getElementById("core" + core_data[i].genome) == null) {
                            var name = core_data[i].genome_name;
                            var colour = jQuery("#option" + name).css("background");

                            jQuery("#gene_widget").append("<div style='left:-100px; width: 1200px; position: relative; border: 1px solid gray; top: 10px; overflow: hidden;' id='core" + core_data[i].genome + "_wrapper'> " +
                                "<div class = handle-genome style='background: " + colour + "; padding: 5px; position: absolute; top: 0px; height: 100%; left: 40px; width: 20px;'></div>" +
                                "<span style='left: 0px; width: 100px; top: 50px; position: absolute; transform: rotate(90deg); word-wrap: break-word;'><b>" + stringTrim(name, 100) + "</b></span>" +
                                "<div style='left:200px; width: 1000px; padding: 25px 0px;  position: relative; ' id='core" + core_data[i].genome + "'></div>" +
                                "</div>")
                        }

                        if (core_data[i].cigarline) {
                            dispGenes("#core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline);
                        }

                        else {
                            dispGenes("#core" + core_data[i].genome, genes, max, core_data[i].cigarline, ref_data.genes.gene.transcripts[0], ref_data.cigarline);
                        }


                    }

                }

                console.log(gene_list_array)
                calculateDNADistanceMatrix()

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
        var stopposition = ((gene_stop - gene_start) + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var margin = "margin-top:15px;margin-bottom:5px;";
        if (transcript_len == 0) {
            margin = "margin-top:15px;margin-bottom:25px;";
        }

        label += gene.reference;

        if (ref) {

            var wrapper_div = jQuery("<div>").attr({
                'style': "position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width :100%;"
            }).html("<span class='handle-gene' style='position: absolute; left:-120px; width: 100px; word-wrap: break-word;'>" + stringTrim(label, 100) + " </span> ").appendTo(div);


            var temp_div = jQuery("<div>").attr({
                'id': "hit" + gene.member_id + "_" + transcript_len,
                'onClick': "onClicked('hit" + gene.member_id + "_" + transcript_len + "', '" + label + "','" + gene.member_id + "'," + JSON.stringify(gene.transcripts[transcript_len]) + ")",
//                'onClick': "jQuery('#gene_info').html('" + jQuery("#hit"+transcript_len).html() + "'); jQuery.colorbox({width: '90%',height: '90%', inline: true, href: '#gene_info'});",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(wrapper_div);

            var strand = 0;
            if (ref.strand == gene.transcripts[transcript_len].strand) {
                strand = 1;
            } else {
                strand = -1;
                jQuery(wrapper_div).append("<span class=\"ui-button ui-icon ui-icon-refresh\" style=\"position: absolute; top:0px; word-wrap: break-word; left: -135px;\" onclick='flip_gene(\"hit" + gene.member_id + "_" + transcript_len + "\")'>/span>")
            }

            gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));

//            if (strand == -1) {
//
//                var temp_start = gene.transcripts[transcript_len].end - gene.transcripts[transcript_len].transcript_end;
//                var temp_end = gene.transcripts[transcript_len].transcript_start - gene.transcripts[transcript_len].start;
//                console.log(transcript_start+":"+transcript_end)
//                gene.transcripts[transcript_len].transcript_start = parseInt(gene.transcripts[transcript_len].start) + parseInt(temp_start);
//                gene.transcripts[transcript_len].transcript_end = parseInt(gene.transcripts[transcript_len].end) - parseInt(temp_end);
//
//                transcript_start = gene.transcripts[transcript_len].transcript_start;
//                transcript_end = gene.transcripts[transcript_len].transcript_end;
//                console.log(transcript_start+":"+transcript_end)
//
//                console.log(gene.transcripts[transcript_len].Exons.toJSON())
//                gene.transcripts[transcript_len].Exons = reverse_exons(gene.transcripts[transcript_len]);
//
//                jQuery("<div>").attr({
//                    'class': "",
//                    'style': "position:absolute; background:red; opacity:0.2; z-index; 599; cursor:pointer; height: 24px; top:-5px; LEFT:0px; width :100%;"
//                }).appendTo(temp_div);
//                gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));
//
//                console.log(gene.transcripts[transcript_len].Exons.toJSON())
//
//
//
//
//
//
//            }


            var temp_int;
            if (ref.transcript_start > ref.transcript_end) {
                temp_int = ref.transcript_start;
                ref.transcript_start = ref.transcript_end;
                ref.transcript_end = temp_int
            }

            gene_list_array.push(gene.transcripts[transcript_len].stable_id)
            console.log(gene.transcripts[transcript_len].stable_id)
            gapped_seq_list.push(expand_DNA_seq(formatFasta(gene.transcripts[transcript_len]), cigarline))

//            console.log(formatFasta(gene.transcripts[transcript_len]))
            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);


            dispCigarLine(cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.Exons.toJSON(), transcript_start, transcript_end, strand, ref_cigar, ref.strand);
        }
        else {
            var temp_div = jQuery("<div>").attr({
                'id': "ref_gene",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " top:10px; LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).html("<span style='position: absolute; left:-120px; width: 100px; word-wrap: break-word;'>" + stringTrim(label, 100) + "</span> ").appendTo(div);

            gene_list_array.push(gene.transcripts[transcript_len].stable_id)
            gapped_seq_list.push(expand_DNA_seq(formatFasta(gene.transcripts[transcript_len]), cigarline, gene.transcripts[transcript_len].stable_id))


            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            dispCigarLineRef(cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end);


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
            stopposition = ((exon_stop - exon_start) + 1) * parseFloat(maxLentemp) / (max_len);

//            to make up for border added
            stopposition = stopposition - 4;
//
//
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

            var top = 2;

            if (exon_start < transcript_start && exon_stop < transcript_start) {
                startposition = ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - exon_start) * parseFloat(maxLentemp) / (max_len);

                startposition += 1;
                stopposition -= 2;
                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(div);

                last = current;

            }
            else if (exon_start < transcript_start && exon_stop > transcript_end) {
                startposition = ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);

                startposition += 1;
                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(div);

                startposition += 1;
                stopposition -= 2;

                startposition = ((transcript_end - newStart_temp) - 1) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - transcript_end + 1) * parseFloat(maxLentemp) / (max_len);


                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(div);

                last = current;
            }
            else if (exon_stop > transcript_start && exon_start < transcript_start) {
                startposition = ((exon_start - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (transcript_start - exon_start) * parseFloat(maxLentemp) / (max_len);

                startposition += 1;
                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(div);

                last = current;

            }
            else if (exon_stop > transcript_end && exon_start < transcript_end) {
                startposition = ((transcript_end - newStart_temp)) * parseFloat(maxLentemp) / (max_len);
                stopposition = (exon_stop - transcript_end) * parseFloat(maxLentemp) / (max_len);

                startposition += 1;
                stopposition -= 2;

                jQuery("<div>").attr({
                    'class': utrtrackClass,
                    'style': "TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
                }).appendTo(div);

                last = current;


            }
        }

    }
}

function dispCigarLine(cigars, start, top, max, gene_start, stop, exons, temp_div, ref_exons, transcript_start, transcript_end, strand, ref_cigar, ref_strand) {
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

    var temp_end = (exons[exon_number].end - gene_start) + 1;
    if (temp_end < cigar_pos) {
        while (temp_end < cigar_pos) {
            exon_number++;
            temp_end = (exons[exon_number].end - gene_start) + 1;
        }
    }
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

        var temp_colours = colours.slice(0);
        if (strand == -1) {
//            cigar_string = cigar_string.split("").reverse().join("")
            var noofrefexon = jQuery.parseJSON(ref_exons).length;
            temp_colours = temp_colours.splice(0, noofrefexon)
            temp_colours = temp_colours.reverse();
            if (ref_exons) {
                ref_exons = jQuery.parseJSON(ref_exons);
                ref_exons.sort(sort_by('start', true, parseInt));
                cigar_string = formatCigar(ref_exons, cigar_string, colours, ref_cigar, "true", ref_strand)
            }
        } else {
            if (ref_exons) {
                ref_exons = jQuery.parseJSON(ref_exons);
                ref_exons.sort(sort_by('start', true, parseInt));
                cigar_string = formatCigar(ref_exons, cigar_string, colours, ref_cigar)
            }
        }

        cigar_string = cigar_string.replace(/(MD)/g, "M,D");
        cigar_string = cigar_string.replace(/(DM)/g, "D,M");
        cigar_string = cigar_string.replace(/(D_)/g, "D,_");
        cigar_string = cigar_string.replace(/(_M)/g, "_,M");
        cigar_string = cigar_string.replace(/(M_)/g, "M,_");
        cigar_string = cigar_string.replace(/(_D)/g, "_,D");
//        cigar_string = cigar_string.replace(/(_-)/g, "_,-");
//        cigar_string = cigar_string.replace(/(-_)/g, "-,_");
//        cigar_string = cigar_string.replace(/(M-)/g, "M,-");
//        cigar_string = cigar_string.replace(/(D-)/g, "D,-");
//        cigar_string = cigar_string.replace(/(-M)/g, "-,M");
//        cigar_string = cigar_string.replace(/(-D)/g, "-,D");
//

        var k = 0;
        var l = 0;

        var cigars_array = cigar_string.split('-');
        first: for (var i = 0; i < cigars_array.length; i++) {

            var cigars_second_array = cigars_array[i].split(",");

            for (var j = 0; j < cigars_second_array.length; j++) {

                var key = cigars_second_array[j].charAt(0);
                var length = cigars_second_array[j].length;

                if (key == "M" && length > 0) {

//                    k = parseInt(l) + parseInt(j);


                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));
                    trackClass = "match";
                    if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, temp_colours[i], length);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)


                    } else {
                        var bool = true;

                        second: while (bool) {

                            stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));
                            trackHTML(startposition, stopposition, top, trackClass + " endcorner", temp_div, temp_colours[i], (temp_end - cigar_pos));

                            var diff = (temp_end - cigar_pos);
                            length = length - diff;

                            exon_number++;


                            if (exon_number >= no_of_exons) {
                                break second;
                                continue first;
                            }


                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = (exons[exon_number].end - gene_start) + 1;

                            if (temp_start > cigar_pos) {
                                cigar_pos = temp_start;
                            }

                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));

                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < temp_end) {
                                trackHTML(startposition, stopposition, top, trackClass + " frontcorner", temp_div, temp_colours[i], length);
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
//
//                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
//                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));
//
//                    if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
//                        trackHTML(startposition, stopposition, top, trackClass, temp_div, "white", cigar_pos);
//                        cigar_pos = parseInt(cigar_pos) + parseInt(length)
//
//                    } else {
//
//
//                        var bool = true;
//
//                        forth: while (bool) {
//
//                            stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));
//
//                            trackHTML(startposition, stopposition, top, trackClass, temp_div, "white", cigar_pos);
//
//
//                            var diff = (temp_end - cigar_pos);
//                            length = length - diff;
//
//                            exon_number++;
//
//                            if (exon_number >= no_of_exons) {
//                                break forth;
//                                continue first;
//                            }
//                            temp_start = exons[exon_number].start - gene_start;
//                            temp_end = exons[exon_number].end - gene_start;
//
//                            cigar_pos = temp_start;
//                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
//                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));
//
//                            if (parseInt(cigar_pos) + parseInt(length) < temp_end) {
//
//                                trackHTML(startposition, stopposition, top, trackClass, temp_div, "white", cigar_pos);
//                                cigar_pos = parseInt(cigar_pos) + parseInt(length)
//                                bool = false;
//                            }
//                            else {
//                                trackClass += " elselse"
//                            }
//                        }
//                    }
                    startposition = parseInt((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = 15;
                    trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, temp_colours[i], length);

                }
                else if (key == "_" && length > 0) {
                    trackClass = "insert";

                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                    if (parseInt(cigar_pos) + parseInt(length) <= temp_end) {
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", length);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)

                    } else {


                        var bool = true;

                        third: while (bool) {

                            stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));

                            trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", (temp_end - cigar_pos));


                            var diff = (temp_end - cigar_pos);
                            length = length - diff;

                            exon_number++;

                            if (exon_number >= no_of_exons) {
                                break third;
                                continue first;
                            }
                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = (exons[exon_number].end - gene_start) + 1;


                            if (temp_start > cigar_pos) {
                                cigar_pos = temp_start;
                            }
                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < temp_end) {

                                trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", length);
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
    var temp_end = (exons[exon_number].end - gene_start) + 1;

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
                        temp_end = (exons[exon_number].end - gene_start) + 1;

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

function formatCigar(ref_exons, hit_cigar, colours, ref_cigar, reverse, ref_strand) {

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

function onClicked(self, label, member_id, gene) {
    jQuery('#gene_info').html("<center><h2>" + gene.stable_id + "</h2></center>  <br> <b>Ref:</b> ")
    jQuery("#ref_gene").clone().appendTo(jQuery('#gene_info'))
    jQuery('#gene_info').append("<br> Homologous Gene: <br> <button onclick=' changeReference(" + member_id + ") '>Make Me Root</button> <br>  ")
    jQuery("#" + self).clone().appendTo(jQuery('#gene_info'))
    var html_text = "<div>" +
        "<h2>Info</h2>" +
        "<br> <b> Gene ID: </b>" + gene.id +
        "<br> <b> Member ID: </b>" + gene.member_id +
        "<br> <b> Stable ID: </b>" + gene.stable_id +
        "<br> <b> Reference: </b>" + gene.reference +
        "<br> <b> Position: </b>" + gene.start + ":" + gene.end +
        "<br> <b> Description: </b>" + gene.description +
        "<br> " +
        "</div>"
    jQuery('#gene_info').append(html_text);
    jQuery.colorbox({width: '90%', height: '90%', inline: true, href: '#gene_info'});
}

function changeReference(member_id) {
    getcoreMember(member_id, true);
    jQuery.colorbox.close();
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

    console.log("formatfasta")

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
                var diff = track.Exons[k].sequence.length - ((track.transcript_end - substart) +1)
                exonSeq = track.Exons[k].sequence.substring(diff-1);

            } else {
                exonSeq = track.Exons[k].sequence;
            }

            if (track.transcript_start > substart) {
                if (track.transcript_end < subend) {
                    exonSeq = exonSeq.substring(0, track.transcript_end - track.transcript_start);
                } else {
                    var diff = track.Exons[k].sequence.length - ((track.transcript_start - substart) +1)
                    exonSeq = exonSeq.substring(diff);
                }
            }
            console.log(exonSeq.length)
            CDS = CDS+ exonSeq;
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


