/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var data = "";

var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)', 'rgb(177,89,40)', 'rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)', 'rgb(188,128,189)', 'rgb(204,235,197)', 'rgb(255,237,111)']

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
    jQuery("#gene_widget").html("")
    jQuery("#gene_info").html("")


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
                    'class': 'refmap',
                    'style': "left: " + left + "px; width:" + width + "px; height:" + height + "px; background: " + jQuery("#genome" + genome_db_id).css("background"),
                    'onClick': 'getMember("' + json.member[referenceLength].chr_name + '",' + genome_db_id + ')'
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
    jQuery("#gene_widget").html("")
    jQuery("#gene_info").html("")

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
    jQuery("#gene_widget").html("")
    jQuery("#gene_info").html("")

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
}

function getcoreMember(query) {
    jQuery(".refMarkerShow").css("background", "black")
    jQuery("#ref" + query).css("background", "red")

    Fluxion.doAjax(
        'comparaService',
        'getCoreMember',
        {'query': query, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            var json = {"trackname": "member", "ref": {"cigarline": "98MD78M2D180MD56M", "genome": 2, "genome-name": "brachypodium_distachyon", "genes": {"gene": {"gene_id": 119, "start": 745282, "end": 749088, "length": 3807, "reference": "1", "strand": -1, "desc": "BRADI1G01090.1", "transcripts": [
                {"id": 137, "start": 745282, "end": 749088, "length": 3807, "strand": -1, "transcript_start": 745575, "transcript_end": 749021, "desc": "null:BRADI1G01090.1", "Exons": [
                    {"id": 678, "start": 748776, "_start": 748776, "end": 749088, "length": 313, "strand": -1},
                    {"id": 679, "start": 748543, "_start": 748543, "end": 748661, "length": 119, "strand": -1},
                    {"id": 680, "start": 747391, "_start": 747391, "end": 747844, "length": 454, "strand": -1},
                    {"id": 681, "start": 746956, "_start": 746956, "end": 747222, "length": 267, "strand": -1},
                    {"id": 682, "start": 746072, "_start": 746072, "end": 746194, "length": 123, "strand": -1},
                    {"id": 683, "start": 745783, "_start": 745783, "end": 745884, "length": 102, "strand": -1},
                    {"id": 684, "start": 745282, "_start": 745282, "end": 745680, "length": 399, "strand": -1}
                ]}
            ]}}}, "member": [
                {"cigarline": "98MD28MD110M2D176M", "genome": 1, "genome-name": "oryza_sativa", "genes": {"gene": {"gene_id": 14021, "start": 35968164, "end": 35972134, "length": 3971, "reference": "3", "strand": -1, "desc": "LOC_Os03g63710.1", "transcripts": [
                    {"id": 17293, "start": 35968164, "end": 35972134, "length": 3971, "strand": -1, "transcript_start": 35968642, "transcript_end": 35972067, "desc": "GTPase-activating protein, putative, expressed:LOC_Os03g63710.1", "Exons": [
                        {"id": 69506, "start": 35971321, "_start": 35971321, "end": 35971439, "length": 119, "strand": -1},
                        {"id": 69507, "start": 35970133, "_start": 35970133, "end": 35970589, "length": 457, "strand": -1},
                        {"id": 69508, "start": 35969740, "_start": 35969740, "end": 35970000, "length": 261, "strand": -1},
                        {"id": 69511, "start": 35971535, "_start": 35971535, "end": 35972134, "length": 600, "strand": -1},
                        {"id": 69512, "start": 35969227, "_start": 35969227, "end": 35969349, "length": 123, "strand": -1},
                        {"id": 69513, "start": 35968916, "_start": 35968916, "end": 35969020, "length": 105, "strand": -1},
                        {"id": 69514, "start": 35968164, "_start": 35968164, "end": 35968747, "length": 584, "strand": -1}
                    ]}
                ]}}},
                {"cigarline": "127MD231MD56M", "genome": 4, "genome-name": "aegilops_tauschii", "genes": {"gene": {"gene_id": 18464, "start": 11902, "end": 15046, "length": 3145, "reference": "Scaffold103937", "strand": -1, "desc": "EMT03746", "transcripts": [
                    {"id": 18464, "start": 11902, "end": 15046, "length": 3145, "strand": -1, "transcript_start": 11901, "transcript_end": 14979, "desc": "null:EMT03746", "Exons": [
                        {"id": 91862, "start": 14978, "_start": 14978, "end": 15046, "length": 69, "strand": -1},
                        {"id": 91863, "start": 14726, "_start": 14726, "end": 14844, "length": 119, "strand": -1},
                        {"id": 91864, "start": 13577, "_start": 13577, "end": 14036, "length": 460, "strand": -1},
                        {"id": 91865, "start": 13155, "_start": 13155, "end": 13421, "length": 267, "strand": -1},
                        {"id": 91866, "start": 12379, "_start": 12379, "end": 12501, "length": 123, "strand": -1},
                        {"id": 91867, "start": 12152, "_start": 12152, "end": 12253, "length": 102, "strand": -1},
                        {"id": 91868, "start": 11902, "_start": 11902, "end": 12006, "length": 105, "strand": -1}
                    ]}
                ]}}},
                {"cigarline": "127MD110MD120MD56M", "genome": 3, "genome-name": "hordeum_vulgare", "genes": {"gene": {"gene_id": 12713, "start": 551916635, "end": 551920520, "length": 3886, "reference": "5", "strand": 1, "desc": "MLOC_60310.1", "transcripts": [
                    {"id": 32765, "start": 551916635, "end": 551920520, "length": 3886, "strand": 1, "transcript_start": 551916927, "transcript_end": 551920418, "desc": "null:MLOC_60310.1", "Exons": [
                        {"id": 108280, "start": 551916635, "_start": 551916635, "end": 551916994, "length": 360, "strand": 1},
                        {"id": 108281, "start": 551917112, "_start": 551917112, "end": 551917230, "length": 119, "strand": 1},
                        {"id": 108282, "start": 551918038, "_start": 551918038, "end": 551918497, "length": 460, "strand": 1},
                        {"id": 108283, "start": 551918655, "_start": 551918655, "end": 551918918, "length": 264, "strand": 1},
                        {"id": 108284, "start": 551919636, "_start": 551919636, "end": 551919758, "length": 123, "strand": 1},
                        {"id": 108285, "start": 551919874, "_start": 551919874, "end": 551919975, "length": 102, "strand": 1},
                        {"id": 108286, "start": 551920134, "_start": 551920134, "end": 551920520, "length": 387, "strand": 1}
                    ]}
                ]}}}
            ]};
//            var json = {"trackname": "member",
//                "ref": {"cigarline": "D4M2D5M2D6MD", "genome": 1, "genome-name": "oryza_sativa", "genes": {"gene": {"gene_id": 3978, "start": 111, "end": 194, "length": 84, "reference": "1", "strand": 1, "desc": "LOC_Os01g01790.1", "transcripts": [
//                {"id": 4850, "start": 111, "end": 194, "length": 84,  "strand": 1, "transcript_start": 115, "transcript_end": 189, "desc": "expressed protein:LOC_Os01g01790.1", "Exons": [
//                    {"id": 19305, "start": 111, "_start": 111, "end": 126, "length": 16, "strand": 1},
//                    {"id": 19306, "start": 137, "_start": 137, "end": 151, "length": 15, "strand": 1},
//                    {"id": 19307, "start": 162, "_start": 162, "end": 166, "length": 5, "strand": 1},
//                    {"id": 19308, "start": 177, "_start": 177, "end": 194, "length": 18, "strand": 1}
//                ]}
//            ]}}}, "member": [
//                {"cigarline": "D11M2D5M2D", "genome": 3, "genome-name": "hordeum_vulgare", "genes": {"gene": {"gene_id": 13381, "start": 513, "end": 614, "length": 102, "reference": "3", "strand": 1, "desc": "MLOC_73243.1", "transcripts": [
//                    {"id": 34327, "start": 513, "end": 614, "length": 102, "strand": 1, "transcript_start": 516, "transcript_end": 599, "desc": "null:MLOC_73243.1", "Exons": [
//                        {"id": 113395, "start": 513, "_start": 513, "end": 530, "length": 18, "strand": 1},
//                        {"id": 113396, "start": 547, "_start": 547, "end": 564, "length": 18, "strand": 1},
//                        {"id": 113397, "start": 575, "_start": 575, "end": 579, "length": 5, "strand": 1},
//                        {"id": 113398, "start": 590, "_start": 590, "end": 614, "length": 25, "strand": 1}
//                    ]}
//                ]}}},
//                {"cigarline": "8MD12M", "genome": 2, "genome-name": "brachypodium_distachyon", "genes": {"gene": {"gene_id": 7814, "start": 203, "end": 294, "length": 92, "reference": "2", "strand": 1, "desc": "BRADI2G00697.1", "transcripts": [
//                    {"id": 9069, "start": 203, "end": 294, "length": 92, "strand": 1, "transcript_start": 206, "transcript_end": 289, "desc": "null:BRADI2G00697.1", "Exons": [
//                        {"id": 43057, "start": 203, "_start": 203, "end": 214, "length": 12, "strand": 1},
//                        {"id": 43058, "start": 223, "_start": 223, "end": 231, "length": 9, "strand": 1},
//                        {"id": 43059, "start": 240, "_start": 240, "end": 254, "length": 15, "strand": 1},
//                        {"id": 43060, "start": 263, "_start": 263, "end": 294, "length": 32, "strand": 1}
//                    ]}
//                ]}}}
//            ]}
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
                while (diff < 0) {
                    ref_data.genes.gene.transcripts[0].Exons[exon_nu].length = 0
                    exon_nu--;
                    diff = parseInt(ref_data.genes.gene.transcripts[0].transcript_end - ref_data.genes.gene.transcripts[0].Exons[exon_nu]._start) + parseInt(1)
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
        var stopposition = ((gene_stop - gene_start) + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
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
                console.log(gene.transcripts[transcript_len].Exons.toJSON())
                gene.transcripts[transcript_len].Exons = reverse_exons(gene.transcripts[transcript_len]);

                jQuery("<div>").attr({
                    'class': "",
                    'style': "position:absolute; background:red; opacity:0.2; z-index; 599; cursor:pointer; height: 24px; top:-5px; LEFT:0px; width :100%;"
                }).appendTo(temp_div);
                gene.transcripts[transcript_len].Exons.sort(sort_by('start', true, parseInt));

                console.log(gene.transcripts[transcript_len].Exons.toJSON())

                var temp_start = gene.transcripts[transcript_len].end - gene.transcripts[transcript_len].transcript_end;
                var temp_end = gene.transcripts[transcript_len].transcript_start - gene.transcripts[transcript_len].start;

               console.log(transcript_start+":"+transcript_end)
                gene.transcripts[transcript_len].transcript_start = parseInt(gene.transcripts[transcript_len].start) + parseInt(temp_start);
                gene.transcripts[transcript_len].transcript_end = parseInt(gene.transcripts[transcript_len].end) - parseInt(temp_end);

//                transcript_start = gene.transcripts[transcript_len].transcript_start;
//                transcript_end = gene.transcripts[transcript_len].transcript_end;
                console.log(transcript_start+":"+transcript_end)


            }


            var temp_int;
            if (ref.transcript_start > ref.transcript_end) {
                temp_int = ref.transcript_start;
                ref.transcript_start = ref.transcript_end;
                ref.transcript_end = temp_int
            }


            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length, transcript_len);


            dispCigarLine(cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, ref.Exons.toJSON(), transcript_start, transcript_end, strand, ref_cigar);
        }
        else {
            var temp_div = jQuery("<div>").attr({
                'id': transcript_len,
                'onClick': "jQuery('#gene_info').html('" + JSON.stringify(gene.transcripts[transcript_len]) + "')",
                'class': "gene",
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " top:10px; LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).html("<span style='position: absolute; left:-100px; width: 100px; word-wrap: break-word;'>" + label + "(" + gene.reference + ")</span> ").appendTo(div);

            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            dispCigarLineRef(cigarline, 1, top, ((gene_stop - gene_start) + 1), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON(), temp_div, gene.transcripts[transcript_len].Exons.toJSON(), transcript_start, transcript_end);


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
            stopposition = ((exon_stop - exon_start) + 1) * parseFloat(maxLentemp) / (max_len);

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
    var temp_end = (exons[exon_number].end - gene_start) + 1;
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
        cigar_string = cigar_string.replace(/(_-)/g, "_,-");
        cigar_string = cigar_string.replace(/(-_)/g, "-,_");
        cigar_string = cigar_string.replace(/(M-)/g, "M,-");
        cigar_string = cigar_string.replace(/(D-)/g, "D,-");
        cigar_string = cigar_string.replace(/(-M)/g, "-,M");
        cigar_string = cigar_string.replace(/(-D)/g, "-,D");




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
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[k], length);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)

                    } else {
                        var bool = true;

                        second: while (bool) {
                            stopposition = parseFloat((temp_end - cigar_pos) * parseFloat(maxLentemp) / (max));

                            trackHTML(startposition, stopposition, top, trackClass + " endcorner", temp_div, colours[k], (temp_end - cigar_pos));

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

                            if (parseInt(cigar_pos) + parseInt(length) < temp_end) {
                                trackHTML(startposition, stopposition, top, trackClass + " frontcorner", temp_div, colours[k], length);
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
                    trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colours[j], length);

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


                            cigar_pos = temp_start;
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

    var temp_array = [];
    while (j < cigar_string.length) {
        if (cigar_string.charAt(j) == 'M') {
            if (a == ref_exon_array[p]) {
                p++;
                hit_cigar_arr.push(hit_cigar.substr(last_pos, b));
                temp_array.push(b + ":" + p)
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
