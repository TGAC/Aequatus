/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var data = "";
function search_geneView(query, from, to, jsonid, oldtracks) {
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    jQuery('#sessioninput').fadeOut();
    jQuery("#sessionid").html("");
    minWidth = null;
    removeAllPopup();
    jQuery('#canvas').hide();


    var reference = jQuery('#genomes').val();
    Fluxion.doAjax(
        'comparaService',
        'searchDnafrags',
        {'query': query, 'reference': reference, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            var content = "";
            for (var i = 0; i < json.genomes.length; i++) {
                if (i == 0) {
                    content += "<table class='list' id='search_hit' ><thead><tr><th>Genome_db_id</th><th>Genome</th><th>Assembly</th><th>Link</th></tr></thead>";
                }

                content += "<tr><td> " + json.genomes[i].genome_db_name + "<td>" + json.genomes[i].name + "<td>" + json.genomes[i].assembly + " <td><a target='_blank' href='index.jsp?query=" + json.genomes[i].name + "&&genome=" + json.genomes[i].genome_db_id + "' > <span title=\"Link\" class=\"ui-button ui-icon ui-icon-link\" </span><a/></td>";
                if (i == json.genomes.length - 1) {
                    content += "</table>";
                    jQuery("#searchresult").html(content);
                    jQuery("#searchresult").fadeIn();
                }

                jQuery("#search_hit").tablesorter();
            }
        }
        });
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
    Fluxion.doAjax(
        'comparaService',
        'searchDnafrag',
        {'query': query, 'reference': reference, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            if (json.html == "genomes") {
                jQuery('#canvas').hide();
                jQuery('#currentposition').hide();
                jQuery("#searchresult").fadeIn();
                var content = "<h1>Search Results: </h1><br>";

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
        }
        });
}

function setRef(length) {

}

function getMember() {
    Fluxion.doAjax(
        'comparaService',
        'getMember',
        {'query': seqregname, 'reference': jQuery('#genomes').val(), 'url': ajaxurl},
        {'doOnSuccess': function (json) {

//    var json = {"trackname": "member", "member": [
//        {"id": 3, "stable_id": "LOC_Os01g01010", "start": 1903, "end": 9817, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 6, "stable_id": "LOC_Os01g01010.1", "start": 2449, "end": 9297, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 33, "stable_id": "LOC_Os01g01010.2", "start": 2449, "end": 9562, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 54, "stable_id": "LOC_Os01g01019", "start": 10218, "end": 11435, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 57, "stable_id": "LOC_Os01g01019.1", "start": 10798, "end": 11317, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 66, "stable_id": "LOC_Os01g01030", "start": 11648, "end": 14915, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 69, "stable_id": "LOC_Os01g01030.1", "start": 11774, "end": 14359, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 78, "stable_id": "LOC_Os01g01040", "start": 15292, "end": 19323, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 81, "stable_id": "LOC_Os01g01040.2", "start": 15599, "end": 18593, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 84, "stable_id": "LOC_Os01g01040.3", "start": 15599, "end": 18593, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 105, "stable_id": "LOC_Os01g01040.1", "start": 15599, "end": 18593, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 114, "stable_id": "LOC_Os01g01040.4", "start": 15599, "end": 17272, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 123, "stable_id": "LOC_Os01g01050", "start": 21841, "end": 25971, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 126, "stable_id": "LOC_Os01g01050.1", "start": 22232, "end": 25391, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 141, "stable_id": "LOC_Os01g01050.2", "start": 22258, "end": 25391, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 144, "stable_id": "LOC_Os01g01060", "start": 26136, "end": 27651, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 147, "stable_id": "LOC_Os01g01060.1", "start": 26221, "end": 27419, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 156, "stable_id": "LOC_Os01g01070", "start": 28818, "end": 33493, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 159, "stable_id": "LOC_Os01g01070.2", "start": 28940, "end": 33124, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 174, "stable_id": "LOC_Os01g01070.1", "start": 28940, "end": 33124, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 189, "stable_id": "LOC_Os01g01070.3", "start": 28940, "end": 32647, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 192, "stable_id": "LOC_Os01g01080", "start": 34581, "end": 40180, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 195, "stable_id": "LOC_Os01g01080.3", "start": 35876, "end": 40007, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 201, "stable_id": "LOC_Os01g01080.1", "start": 34743, "end": 40007, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 204, "stable_id": "LOC_Os01g01080.2", "start": 35876, "end": 40007, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 219, "stable_id": "LOC_Os01g01090", "start": 43595, "end": 46526, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 222, "stable_id": "LOC_Os01g01090.1", "start": 43595, "end": 46526, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 234, "stable_id": "LOC_Os01g01100", "start": 46856, "end": 52412, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 237, "stable_id": "LOC_Os01g01100.1", "start": 46856, "end": 52412, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 249, "stable_id": "LOC_Os01g01110", "start": 54914, "end": 56972, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 252, "stable_id": "LOC_Os01g01110.1", "start": 54914, "end": 56972, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 261, "stable_id": "LOC_Os01g01115", "start": 57658, "end": 60090, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 264, "stable_id": "LOC_Os01g01115.1", "start": 57658, "end": 60090, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 267, "stable_id": "LOC_Os01g01120", "start": 61059, "end": 62576, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 270, "stable_id": "LOC_Os01g01120.1", "start": 61104, "end": 62345, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 279, "stable_id": "LOC_Os01g01130", "start": 62244, "end": 65302, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 282, "stable_id": "LOC_Os01g01130.1", "start": 62670, "end": 64950, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 291, "stable_id": "LOC_Os01g01140", "start": 68675, "end": 69131, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 294, "stable_id": "LOC_Os01g01140.1", "start": 68675, "end": 69131, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 300, "stable_id": "LOC_Os01g01150", "start": 71775, "end": 78938, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 303, "stable_id": "LOC_Os01g01150.3", "start": 71903, "end": 76008, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 306, "stable_id": "LOC_Os01g01150.1", "start": 71903, "end": 76008, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 318, "stable_id": "LOC_Os01g01150.2", "start": 71903, "end": 76008, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 330, "stable_id": "LOC_Os01g01160", "start": 81428, "end": 83302, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 333, "stable_id": "LOC_Os01g01160.1", "start": 81507, "end": 82864, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 336, "stable_id": "LOC_Os01g01170", "start": 84337, "end": 87844, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 339, "stable_id": "LOC_Os01g01170.1", "start": 84379, "end": 87583, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 348, "stable_id": "LOC_Os01g01180", "start": 87986, "end": 88204, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 351, "stable_id": "LOC_Os01g01180.1", "start": 87986, "end": 88204, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 354, "stable_id": "LOC_Os01g01190", "start": 88653, "end": 90521, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 357, "stable_id": "LOC_Os01g01190.1", "start": 88825, "end": 90468, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 366, "stable_id": "LOC_Os01g01200", "start": 94499, "end": 97558, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 369, "stable_id": "LOC_Os01g01200.1", "start": 94499, "end": 97558, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 390, "stable_id": "LOC_Os01g01210", "start": 98171, "end": 99681, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 393, "stable_id": "LOC_Os01g01210.1", "start": 98171, "end": 99681, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 402, "stable_id": "LOC_Os01g01230", "start": 104872, "end": 105534, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 405, "stable_id": "LOC_Os01g01230.1", "start": 104872, "end": 105534, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 408, "stable_id": "LOC_Os01g01240", "start": 107618, "end": 113983, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 411, "stable_id": "LOC_Os01g01240.1", "start": 107618, "end": 113983, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 426, "stable_id": "LOC_Os01g01250", "start": 117081, "end": 119671, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 429, "stable_id": "LOC_Os01g01250.1", "start": 117081, "end": 119671, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 444, "stable_id": "LOC_Os01g01260", "start": 120302, "end": 126457, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 447, "stable_id": "LOC_Os01g01260.1", "start": 120302, "end": 126457, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 456, "stable_id": "LOC_Os01g01270", "start": 127897, "end": 132559, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 459, "stable_id": "LOC_Os01g01270.1", "start": 127897, "end": 132559, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 474, "stable_id": "LOC_Os01g01280", "start": 133291, "end": 134685, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 477, "stable_id": "LOC_Os01g01280.1", "start": 133311, "end": 134253, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 486, "stable_id": "LOC_Os01g01290", "start": 138820, "end": 140588, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 489, "stable_id": "LOC_Os01g01290.1", "start": 139150, "end": 140415, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 492, "stable_id": "LOC_Os01g01295", "start": 140936, "end": 143554, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 495, "stable_id": "LOC_Os01g01295.1", "start": 141084, "end": 142908, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 498, "stable_id": "LOC_Os01g01302", "start": 144577, "end": 146852, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 501, "stable_id": "LOC_Os01g01302.1", "start": 144645, "end": 146575, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 510, "stable_id": "LOC_Os01g01307", "start": 147045, "end": 149577, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 513, "stable_id": "LOC_Os01g01307.1", "start": 147147, "end": 149271, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 516, "stable_id": "LOC_Os01g01307.2", "start": 147147, "end": 149271, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 525, "stable_id": "LOC_Os01g01312", "start": 150409, "end": 155500, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 528, "stable_id": "LOC_Os01g01312.1", "start": 150823, "end": 155214, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 543, "stable_id": "LOC_Os01g01320", "start": 156728, "end": 159941, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 546, "stable_id": "LOC_Os01g01320.1", "start": 156728, "end": 159941, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 555, "stable_id": "LOC_Os01g01330", "start": 160365, "end": 163107, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 558, "stable_id": "LOC_Os01g01330.1", "start": 160365, "end": 162625, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 561, "stable_id": "LOC_Os01g01340", "start": 167470, "end": 169389, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 564, "stable_id": "LOC_Os01g01340.2", "start": 168747, "end": 169260, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 573, "stable_id": "LOC_Os01g01340.1", "start": 168599, "end": 169260, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 585, "stable_id": "LOC_Os01g01350", "start": 169712, "end": 172434, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 591, "stable_id": "LOC_Os01g01350.2", "start": 170045, "end": 171652, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 594, "stable_id": "LOC_Os01g01350.1", "start": 170045, "end": 172072, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 597, "stable_id": "LOC_Os01g01360", "start": 177310, "end": 179812, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 600, "stable_id": "LOC_Os01g01360.1", "start": 177642, "end": 179462, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 603, "stable_id": "LOC_Os01g01369", "start": 185246, "end": 189846, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 606, "stable_id": "LOC_Os01g01369.1", "start": 185516, "end": 189231, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 609, "stable_id": "LOC_Os01g01380", "start": 190036, "end": 195287, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 612, "stable_id": "LOC_Os01g01380.1", "start": 192864, "end": 194429, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 615, "stable_id": "LOC_Os01g01390", "start": 196647, "end": 199803, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 618, "stable_id": "LOC_Os01g01390.5", "start": 196993, "end": 199277, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 621, "stable_id": "LOC_Os01g01390.3", "start": 197130, "end": 199479, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 630, "stable_id": "LOC_Os01g01390.2", "start": 197130, "end": 199479, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 639, "stable_id": "LOC_Os01g01390.1", "start": 197130, "end": 199479, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 642, "stable_id": "LOC_Os01g01390.4", "start": 197130, "end": 199479, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 651, "stable_id": "LOC_Os01g01400", "start": 200944, "end": 205743, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 654, "stable_id": "LOC_Os01g01400.1", "start": 201042, "end": 204543, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 663, "stable_id": "LOC_Os01g01410", "start": 204710, "end": 208606, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 666, "stable_id": "LOC_Os01g01410.2", "start": 205450, "end": 208525, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 681, "stable_id": "LOC_Os01g01410.1", "start": 205450, "end": 208525, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 696, "stable_id": "LOC_Os01g01420", "start": 208771, "end": 213229, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 699, "stable_id": "LOC_Os01g01420.3", "start": 209283, "end": 212788, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 714, "stable_id": "LOC_Os01g01420.2", "start": 209238, "end": 212788, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 723, "stable_id": "LOC_Os01g01420.1", "start": 209283, "end": 212788, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 738, "stable_id": "LOC_Os01g01430", "start": 215126, "end": 216664, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 741, "stable_id": "LOC_Os01g01430.1", "start": 215209, "end": 216345, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 744, "stable_id": "LOC_Os01g01440", "start": 218011, "end": 219776, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 747, "stable_id": "LOC_Os01g01440.1", "start": 218011, "end": 219776, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 762, "stable_id": "LOC_Os01g01450", "start": 225897, "end": 228331, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 765, "stable_id": "LOC_Os01g01450.2", "start": 226182, "end": 227931, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 768, "stable_id": "LOC_Os01g01450.1", "start": 226182, "end": 227856, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 777, "stable_id": "LOC_Os01g01460", "start": 231377, "end": 231688, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 780, "stable_id": "LOC_Os01g01460.1", "start": 231377, "end": 231688, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 783, "stable_id": "LOC_Os01g01470", "start": 240641, "end": 242468, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 786, "stable_id": "LOC_Os01g01470.1", "start": 240908, "end": 241977, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 795, "stable_id": "LOC_Os01g01484", "start": 247706, "end": 255878, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 798, "stable_id": "LOC_Os01g01484.4", "start": 247971, "end": 254795, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 810, "stable_id": "LOC_Os01g01484.2", "start": 247971, "end": 255441, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 828, "stable_id": "LOC_Os01g01484.5", "start": 249806, "end": 255441, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 849, "stable_id": "LOC_Os01g01484.1", "start": 247971, "end": 255441, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 870, "stable_id": "LOC_Os01g01500", "start": 258607, "end": 258909, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 873, "stable_id": "LOC_Os01g01500.1", "start": 258607, "end": 258909, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 876, "stable_id": "LOC_Os01g01510", "start": 260504, "end": 267471, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 879, "stable_id": "LOC_Os01g01510.1", "start": 260562, "end": 267011, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 903, "stable_id": "LOC_Os01g01510.2", "start": 260562, "end": 266723, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 930, "stable_id": "LOC_Os01g01520", "start": 269145, "end": 274084, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 933, "stable_id": "LOC_Os01g01520.1", "start": 269356, "end": 273957, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 942, "stable_id": "LOC_Os01g01530", "start": 275285, "end": 276881, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 945, "stable_id": "LOC_Os01g01530.1", "start": 275285, "end": 276881, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 954, "stable_id": "LOC_Os01g01540", "start": 278982, "end": 279494, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 957, "stable_id": "LOC_Os01g01540.1", "start": 278982, "end": 279494, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 960, "stable_id": "LOC_Os01g01550", "start": 279846, "end": 282924, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 963, "stable_id": "LOC_Os01g01550.1", "start": 279846, "end": 282924, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 972, "stable_id": "LOC_Os01g01560", "start": 283911, "end": 291118, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 975, "stable_id": "LOC_Os01g01560.1", "start": 283911, "end": 286046, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 978, "stable_id": "LOC_Os01g01570", "start": 287372, "end": 291296, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 981, "stable_id": "LOC_Os01g01570.1", "start": 290572, "end": 291075, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 987, "stable_id": "LOC_Os01g01580", "start": 291844, "end": 292535, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 990, "stable_id": "LOC_Os01g01580.1", "start": 291847, "end": 292329, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 993, "stable_id": "LOC_Os01g01590", "start": 292648, "end": 293536, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 996, "stable_id": "LOC_Os01g01590.1", "start": 292648, "end": 293536, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 999, "stable_id": "LOC_Os01g01600", "start": 302103, "end": 305800, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1002, "stable_id": "LOC_Os01g01600.1", "start": 302329, "end": 305493, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1011, "stable_id": "LOC_Os01g01610", "start": 305869, "end": 307842, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1014, "stable_id": "LOC_Os01g01610.1", "start": 306124, "end": 307601, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1017, "stable_id": "LOC_Os01g01620", "start": 308459, "end": 312170, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1020, "stable_id": "LOC_Os01g01620.1", "start": 308822, "end": 312064, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1023, "stable_id": "LOC_Os01g01640", "start": 318713, "end": 321248, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1029, "stable_id": "LOC_Os01g01640.1", "start": 318875, "end": 320975, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1041, "stable_id": "LOC_Os01g01650", "start": 321556, "end": 322948, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1044, "stable_id": "LOC_Os01g01650.1", "start": 321810, "end": 322846, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1050, "stable_id": "LOC_Os01g01660", "start": 326128, "end": 327451, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1053, "stable_id": "LOC_Os01g01660.1", "start": 326337, "end": 327398, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1062, "stable_id": "LOC_Os01g01670", "start": 329238, "end": 331345, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1065, "stable_id": "LOC_Os01g01670.1", "start": 330630, "end": 331274, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1068, "stable_id": "LOC_Os01g01670.2", "start": 330630, "end": 331274, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1077, "stable_id": "LOC_Os01g01680", "start": 331667, "end": 332689, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1080, "stable_id": "LOC_Os01g01680.1", "start": 331758, "end": 332636, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1089, "stable_id": "LOC_Os01g01689", "start": 334809, "end": 370191, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1092, "stable_id": "LOC_Os01g01689.3", "start": 334809, "end": 369652, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1239, "stable_id": "LOC_Os01g01689.1", "start": 334809, "end": 369910, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1359, "stable_id": "LOC_Os01g01700", "start": 370831, "end": 373470, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1362, "stable_id": "LOC_Os01g01700.1", "start": 370911, "end": 373152, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1371, "stable_id": "LOC_Os01g01710", "start": 373728, "end": 379716, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1374, "stable_id": "LOC_Os01g01710.2", "start": 375866, "end": 379488, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1395, "stable_id": "LOC_Os01g01710.1", "start": 373980, "end": 379488, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1407, "stable_id": "LOC_Os01g01720", "start": 382047, "end": 385701, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1410, "stable_id": "LOC_Os01g01720.1", "start": 382451, "end": 385548, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1413, "stable_id": "LOC_Os01g01720.2", "start": 382451, "end": 385548, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1428, "stable_id": "LOC_Os01g01730", "start": 389051, "end": 389623, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1431, "stable_id": "LOC_Os01g01730.1", "start": 389051, "end": 389623, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1434, "stable_id": "LOC_Os01g01740", "start": 391081, "end": 395651, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1437, "stable_id": "LOC_Os01g01740.1", "start": 391398, "end": 395031, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1440, "stable_id": "LOC_Os01g01760", "start": 402692, "end": 403402, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1443, "stable_id": "LOC_Os01g01760.1", "start": 402692, "end": 403402, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1452, "stable_id": "LOC_Os01g01770", "start": 408700, "end": 409818, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1455, "stable_id": "LOC_Os01g01770.1", "start": 408700, "end": 409818, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1458, "stable_id": "LOC_Os01g01780", "start": 411579, "end": 414830, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1461, "stable_id": "LOC_Os01g01780.1", "start": 411675, "end": 414495, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1470, "stable_id": "LOC_Os01g01790", "start": 415241, "end": 419497, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1473, "stable_id": "LOC_Os01g01790.2", "start": 416501, "end": 419402, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1494, "stable_id": "LOC_Os01g01790.1", "start": 415666, "end": 419402, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1506, "stable_id": "LOC_Os01g01800", "start": 421462, "end": 430692, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1509, "stable_id": "LOC_Os01g01800.1", "start": 421599, "end": 429973, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1536, "stable_id": "LOC_Os01g01800.2", "start": 421599, "end": 429973, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1569, "stable_id": "LOC_Os01g01810", "start": 431435, "end": 431752, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1572, "stable_id": "LOC_Os01g01810.1", "start": 431435, "end": 431752, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1575, "stable_id": "LOC_Os01g01830", "start": 436613, "end": 448137, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1578, "stable_id": "LOC_Os01g01830.1", "start": 440328, "end": 447916, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1605, "stable_id": "LOC_Os01g01840", "start": 454512, "end": 459716, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1608, "stable_id": "LOC_Os01g01840.1", "start": 454707, "end": 459716, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1617, "stable_id": "LOC_Os01g01850", "start": 465280, "end": 471435, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1620, "stable_id": "LOC_Os01g01850.1", "start": 465280, "end": 471435, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1635, "stable_id": "LOC_Os01g01860", "start": 472074, "end": 475310, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1638, "stable_id": "LOC_Os01g01860.1", "start": 472074, "end": 475310, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1647, "stable_id": "LOC_Os01g01870", "start": 477325, "end": 480166, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1650, "stable_id": "LOC_Os01g01870.1", "start": 477553, "end": 479722, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1659, "stable_id": "LOC_Os01g01880", "start": 481332, "end": 481956, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1662, "stable_id": "LOC_Os01g01880.1", "start": 481411, "end": 481875, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1665, "stable_id": "LOC_Os01g01890", "start": 482885, "end": 485492, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1668, "stable_id": "LOC_Os01g01890.1", "start": 484177, "end": 485076, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1677, "stable_id": "LOC_Os01g01900", "start": 487085, "end": 491952, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1683, "stable_id": "LOC_Os01g01900.1", "start": 487085, "end": 491952, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1689, "stable_id": "LOC_Os01g01910", "start": 495066, "end": 496368, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1698, "stable_id": "LOC_Os01g01910.1", "start": 495066, "end": 496368, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1707, "stable_id": "LOC_Os01g01920", "start": 497454, "end": 505264, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1710, "stable_id": "LOC_Os01g01920.1", "start": 497515, "end": 504744, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1731, "stable_id": "LOC_Os01g01920.2", "start": 497515, "end": 504809, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1758, "stable_id": "LOC_Os01g01925", "start": 506270, "end": 508225, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1761, "stable_id": "LOC_Os01g01925.1", "start": 506278, "end": 508008, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1770, "stable_id": "LOC_Os01g01930", "start": 508387, "end": 509112, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1773, "stable_id": "LOC_Os01g01930.1", "start": 508387, "end": 509112, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1776, "stable_id": "LOC_Os01g01940", "start": 509752, "end": 511159, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1779, "stable_id": "LOC_Os01g01940.1", "start": 509846, "end": 510556, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1782, "stable_id": "LOC_Os01g01950", "start": 511840, "end": 512502, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1785, "stable_id": "LOC_Os01g01950.1", "start": 511840, "end": 512502, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1794, "stable_id": "LOC_Os01g01960", "start": 512890, "end": 521448, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1797, "stable_id": "LOC_Os01g01960.1", "start": 513578, "end": 521445, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1827, "stable_id": "LOC_Os01g01970", "start": 523579, "end": 527002, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1830, "stable_id": "LOC_Os01g01970.2", "start": 524101, "end": 525763, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1833, "stable_id": "LOC_Os01g01970.1", "start": 524101, "end": 525763, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1836, "stable_id": "LOC_Os01g01980", "start": 528367, "end": 529008, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1839, "stable_id": "LOC_Os01g01980.1", "start": 528367, "end": 529008, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1848, "stable_id": "LOC_Os01g01990", "start": 532786, "end": 533139, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1851, "stable_id": "LOC_Os01g01990.1", "start": 532786, "end": 533139, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1854, "stable_id": "LOC_Os01g02000", "start": 536710, "end": 542355, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1857, "stable_id": "LOC_Os01g02000.1", "start": 536787, "end": 542065, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1884, "stable_id": "LOC_Os01g02010", "start": 541987, "end": 543510, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1887, "stable_id": "LOC_Os01g02010.1", "start": 542541, "end": 543424, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1890, "stable_id": "LOC_Os01g02020", "start": 548108, "end": 552287, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1893, "stable_id": "LOC_Os01g02020.2", "start": 548255, "end": 551322, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1905, "stable_id": "LOC_Os01g02020.1", "start": 548255, "end": 551366, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1920, "stable_id": "LOC_Os01g02020.3", "start": 548255, "end": 551366, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1929, "stable_id": "LOC_Os01g02040", "start": 553022, "end": 557015, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1932, "stable_id": "LOC_Os01g02040.2", "start": 554115, "end": 556305, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1941, "stable_id": "LOC_Os01g02040.1", "start": 553300, "end": 556305, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1953, "stable_id": "LOC_Os01g02050", "start": 561056, "end": 571138, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1956, "stable_id": "LOC_Os01g02050.1", "start": 561304, "end": 571002, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1986, "stable_id": "LOC_Os01g02060", "start": 575443, "end": 578569, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1992, "stable_id": "LOC_Os01g02060.2", "start": 575806, "end": 578278, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 1995, "stable_id": "LOC_Os01g02060.1", "start": 575806, "end": 578278, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2004, "stable_id": "LOC_Os01g02070", "start": 584963, "end": 585445, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2007, "stable_id": "LOC_Os01g02070.1", "start": 584963, "end": 585445, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2016, "stable_id": "LOC_Os01g02080", "start": 585414, "end": 586780, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2019, "stable_id": "LOC_Os01g02080.1", "start": 585670, "end": 586717, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2028, "stable_id": "LOC_Os01g02090", "start": 587863, "end": 592759, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2031, "stable_id": "LOC_Os01g02090.2", "start": 587975, "end": 591687, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2040, "stable_id": "LOC_Os01g02090.1", "start": 587975, "end": 592280, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2049, "stable_id": "LOC_Os01g02100", "start": 597290, "end": 600472, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2052, "stable_id": "LOC_Os01g02100.3", "start": 597787, "end": 600205, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2055, "stable_id": "LOC_Os01g02100.2", "start": 597718, "end": 600205, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2058, "stable_id": "LOC_Os01g02100.4", "start": 597787, "end": 600205, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2061, "stable_id": "LOC_Os01g02100.1", "start": 597718, "end": 600205, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2067, "stable_id": "LOC_Os01g02110", "start": 602643, "end": 604643, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2073, "stable_id": "LOC_Os01g02110.1", "start": 603019, "end": 604432, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2082, "stable_id": "LOC_Os01g02120", "start": 611564, "end": 614650, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2085, "stable_id": "LOC_Os01g02120.1", "start": 611717, "end": 614273, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2091, "stable_id": "LOC_Os01g02130", "start": 619572, "end": 620516, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2094, "stable_id": "LOC_Os01g02130.1", "start": 619935, "end": 620462, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2103, "stable_id": "LOC_Os01g02139", "start": 623087, "end": 623613, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2106, "stable_id": "LOC_Os01g02139.1", "start": 623135, "end": 623470, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2109, "stable_id": "LOC_Os01g02150", "start": 624976, "end": 626024, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2112, "stable_id": "LOC_Os01g02150.1", "start": 625198, "end": 625719, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2115, "stable_id": "LOC_Os01g02160", "start": 631093, "end": 631913, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2118, "stable_id": "LOC_Os01g02160.1", "start": 631196, "end": 631675, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2121, "stable_id": "LOC_Os01g02170", "start": 633011, "end": 638309, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2124, "stable_id": "LOC_Os01g02170.1", "start": 636835, "end": 637965, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2127, "stable_id": "LOC_Os01g02170.2", "start": 636835, "end": 637965, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2130, "stable_id": "LOC_Os01g02180", "start": 639588, "end": 643269, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2133, "stable_id": "LOC_Os01g02180.2", "start": 639959, "end": 643113, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2160, "stable_id": "LOC_Os01g02180.1", "start": 639959, "end": 641969, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2181, "stable_id": "LOC_Os01g02190", "start": 644574, "end": 645723, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2184, "stable_id": "LOC_Os01g02190.1", "start": 644732, "end": 645697, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2193, "stable_id": "LOC_Os01g02200", "start": 647128, "end": 650881, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2196, "stable_id": "LOC_Os01g02200.1", "start": 647528, "end": 650745, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2199, "stable_id": "LOC_Os01g02210", "start": 661283, "end": 663572, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2202, "stable_id": "LOC_Os01g02210.1", "start": 661283, "end": 663572, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2211, "stable_id": "LOC_Os01g02220", "start": 663777, "end": 666554, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2214, "stable_id": "LOC_Os01g02220.1", "start": 663777, "end": 666554, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2229, "stable_id": "LOC_Os01g02230", "start": 667047, "end": 669976, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2232, "stable_id": "LOC_Os01g02230.1", "start": 667047, "end": 669976, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2241, "stable_id": "LOC_Os01g02240", "start": 677778, "end": 683594, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2244, "stable_id": "LOC_Os01g02240.1", "start": 677778, "end": 683594, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2271, "stable_id": "LOC_Os01g02250", "start": 688792, "end": 693013, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2274, "stable_id": "LOC_Os01g02250.1", "start": 688792, "end": 693013, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2283, "stable_id": "LOC_Os01g02260", "start": 693716, "end": 695113, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2286, "stable_id": "LOC_Os01g02260.1", "start": 693716, "end": 695113, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2295, "stable_id": "LOC_Os01g02270", "start": 699533, "end": 704670, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2298, "stable_id": "LOC_Os01g02270.1", "start": 699533, "end": 704670, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2307, "stable_id": "LOC_Os01g02280", "start": 706340, "end": 713322, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2310, "stable_id": "LOC_Os01g02280.1", "start": 706340, "end": 713322, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2322, "stable_id": "LOC_Os01g02290", "start": 719629, "end": 722317, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2325, "stable_id": "LOC_Os01g02290.2", "start": 720386, "end": 722283, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2331, "stable_id": "LOC_Os01g02290.1", "start": 719842, "end": 722283, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2334, "stable_id": "LOC_Os01g02300", "start": 722693, "end": 725321, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2337, "stable_id": "LOC_Os01g02300.1", "start": 722744, "end": 724885, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2352, "stable_id": "LOC_Os01g02310", "start": 727977, "end": 729930, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2355, "stable_id": "LOC_Os01g02310.1", "start": 727977, "end": 729930, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2364, "stable_id": "LOC_Os01g02320", "start": 730149, "end": 737020, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2367, "stable_id": "LOC_Os01g02320.1", "start": 730484, "end": 732217, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2370, "stable_id": "LOC_Os01g02334", "start": 737281, "end": 740794, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2373, "stable_id": "LOC_Os01g02334.1", "start": 739508, "end": 740652, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2376, "stable_id": "LOC_Os01g02350", "start": 741272, "end": 744156, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2379, "stable_id": "LOC_Os01g02350.1", "start": 741881, "end": 744156, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2388, "stable_id": "LOC_Os01g02360", "start": 744452, "end": 747945, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2391, "stable_id": "LOC_Os01g02360.1", "start": 744582, "end": 747569, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2394, "stable_id": "LOC_Os01g02370", "start": 751080, "end": 753992, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2397, "stable_id": "LOC_Os01g02370.1", "start": 751947, "end": 753945, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2406, "stable_id": "LOC_Os01g02380", "start": 755894, "end": 761050, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2409, "stable_id": "LOC_Os01g02380.1", "start": 755894, "end": 761050, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2418, "stable_id": "LOC_Os01g02390", "start": 766169, "end": 768681, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2421, "stable_id": "LOC_Os01g02390.2", "start": 766382, "end": 768615, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2427, "stable_id": "LOC_Os01g02390.1", "start": 766382, "end": 768615, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2430, "stable_id": "LOC_Os01g02400", "start": 769332, "end": 772851, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2433, "stable_id": "LOC_Os01g02400.2", "start": 771099, "end": 772542, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2436, "stable_id": "LOC_Os01g02400.3", "start": 771577, "end": 772542, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2442, "stable_id": "LOC_Os01g02400.1", "start": 769442, "end": 772542, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2454, "stable_id": "LOC_Os01g02410", "start": 773727, "end": 778237, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2457, "stable_id": "LOC_Os01g02410.1", "start": 773727, "end": 778237, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2472, "stable_id": "LOC_Os01g02420", "start": 780442, "end": 783424, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2475, "stable_id": "LOC_Os01g02420.1", "start": 780442, "end": 783424, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2484, "stable_id": "LOC_Os01g02430", "start": 785171, "end": 787619, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2487, "stable_id": "LOC_Os01g02430.1", "start": 785373, "end": 787619, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2490, "stable_id": "LOC_Os01g02440", "start": 788967, "end": 791411, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2493, "stable_id": "LOC_Os01g02440.1", "start": 788967, "end": 791411, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2499, "stable_id": "LOC_Os01g02450", "start": 792088, "end": 793090, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2502, "stable_id": "LOC_Os01g02450.1", "start": 792088, "end": 793090, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2505, "stable_id": "LOC_Os01g02460", "start": 793499, "end": 794413, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2508, "stable_id": "LOC_Os01g02460.1", "start": 793499, "end": 794413, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2514, "stable_id": "LOC_Os01g02470", "start": 795842, "end": 796533, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2517, "stable_id": "LOC_Os01g02470.1", "start": 795842, "end": 796533, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2520, "stable_id": "LOC_Os01g02480", "start": 799898, "end": 800654, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2523, "stable_id": "LOC_Os01g02480.1", "start": 799898, "end": 800654, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2526, "stable_id": "LOC_Os01g02490", "start": 803084, "end": 805932, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2529, "stable_id": "LOC_Os01g02490.1", "start": 803299, "end": 804937, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2538, "stable_id": "LOC_Os01g02490.2", "start": 803299, "end": 805563, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2553, "stable_id": "LOC_Os01g02500", "start": 806850, "end": 808721, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2556, "stable_id": "LOC_Os01g02500.1", "start": 806850, "end": 808721, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2559, "stable_id": "LOC_Os01g02510", "start": 816542, "end": 817335, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2562, "stable_id": "LOC_Os01g02510.1", "start": 816542, "end": 817168, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2571, "stable_id": "LOC_Os01g02520", "start": 820344, "end": 823007, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2574, "stable_id": "LOC_Os01g02520.1", "start": 820344, "end": 823007, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2583, "stable_id": "LOC_Os01g02530", "start": 823624, "end": 829778, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2586, "stable_id": "LOC_Os01g02530.1", "start": 823624, "end": 829778, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2595, "stable_id": "LOC_Os01g02540", "start": 833939, "end": 838111, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2598, "stable_id": "LOC_Os01g02540.1", "start": 833939, "end": 838111, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2610, "stable_id": "LOC_Os01g02550", "start": 838809, "end": 841757, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2613, "stable_id": "LOC_Os01g02550.1", "start": 838809, "end": 841757, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2622, "stable_id": "LOC_Os01g02560", "start": 842530, "end": 846454, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2625, "stable_id": "LOC_Os01g02560.1", "start": 842543, "end": 846274, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2640, "stable_id": "LOC_Os01g02570", "start": 851249, "end": 853568, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2643, "stable_id": "LOC_Os01g02570.1", "start": 851249, "end": 853568, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2652, "stable_id": "LOC_Os01g02580", "start": 856957, "end": 859583, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2655, "stable_id": "LOC_Os01g02580.1", "start": 856957, "end": 859583, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2664, "stable_id": "LOC_Os01g02590", "start": 861579, "end": 864253, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2670, "stable_id": "LOC_Os01g02590.1", "start": 863121, "end": 864208, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2682, "stable_id": "LOC_Os01g02600", "start": 864966, "end": 868063, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2685, "stable_id": "LOC_Os01g02600.1", "start": 864966, "end": 868063, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2691, "stable_id": "LOC_Os01g02610", "start": 869318, "end": 873817, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2694, "stable_id": "LOC_Os01g02610.1", "start": 869318, "end": 873817, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2706, "stable_id": "LOC_Os01g02629", "start": 883161, "end": 886787, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2709, "stable_id": "LOC_Os01g02629.1", "start": 883161, "end": 886787, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2724, "stable_id": "LOC_Os01g02650", "start": 891095, "end": 897250, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2727, "stable_id": "LOC_Os01g02650.1", "start": 891095, "end": 897250, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2736, "stable_id": "LOC_Os01g02660", "start": 897866, "end": 901158, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2739, "stable_id": "LOC_Os01g02660.1", "start": 897866, "end": 901158, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2748, "stable_id": "LOC_Os01g02670", "start": 903341, "end": 909142, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2751, "stable_id": "LOC_Os01g02670.1", "start": 903341, "end": 909142, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2760, "stable_id": "LOC_Os01g02680", "start": 910735, "end": 913246, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2763, "stable_id": "LOC_Os01g02680.1", "start": 910857, "end": 913219, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2772, "stable_id": "LOC_Os01g02690", "start": 914639, "end": 918674, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2775, "stable_id": "LOC_Os01g02690.1", "start": 914639, "end": 918674, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2790, "stable_id": "LOC_Os01g02700", "start": 919992, "end": 922630, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2793, "stable_id": "LOC_Os01g02700.1", "start": 920271, "end": 922582, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2802, "stable_id": "LOC_Os01g02710", "start": 923451, "end": 924175, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2805, "stable_id": "LOC_Os01g02710.1", "start": 923451, "end": 924175, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2814, "stable_id": "LOC_Os01g02720", "start": 928883, "end": 933914, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2817, "stable_id": "LOC_Os01g02720.1", "start": 929107, "end": 933404, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2832, "stable_id": "LOC_Os01g02720.2", "start": 929107, "end": 933404, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2850, "stable_id": "LOC_Os01g02730", "start": 934574, "end": 937367, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2856, "stable_id": "LOC_Os01g02730.1", "start": 934574, "end": 937367, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2868, "stable_id": "LOC_Os01g02740", "start": 939005, "end": 951451, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2871, "stable_id": "LOC_Os01g02740.1", "start": 939005, "end": 951451, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2904, "stable_id": "LOC_Os01g02750", "start": 953075, "end": 955817, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2907, "stable_id": "LOC_Os01g02750.1", "start": 953075, "end": 955639, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2922, "stable_id": "LOC_Os01g02760", "start": 956907, "end": 959626, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2928, "stable_id": "LOC_Os01g02760.1", "start": 956907, "end": 959626, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2937, "stable_id": "LOC_Os01g02770", "start": 960681, "end": 964151, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2940, "stable_id": "LOC_Os01g02770.1", "start": 960681, "end": 964151, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2949, "stable_id": "LOC_Os01g02780", "start": 968308, "end": 972327, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2952, "stable_id": "LOC_Os01g02780.1", "start": 968487, "end": 972305, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2961, "stable_id": "LOC_Os01g02790", "start": 975766, "end": 979431, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2964, "stable_id": "LOC_Os01g02790.1", "start": 975766, "end": 979431, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2973, "stable_id": "LOC_Os01g02800", "start": 983301, "end": 985760, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2976, "stable_id": "LOC_Os01g02800.1", "start": 983510, "end": 985760, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2985, "stable_id": "LOC_Os01g02810", "start": 986591, "end": 989647, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2988, "stable_id": "LOC_Os01g02810.1", "start": 986591, "end": 989647, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 2994, "stable_id": "LOC_Os01g02830", "start": 993710, "end": 996262, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3000, "stable_id": "LOC_Os01g02830.1", "start": 993910, "end": 996223, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3003, "stable_id": "LOC_Os01g02840", "start": 996963, "end": 999997, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3006, "stable_id": "LOC_Os01g02840.1", "start": 996963, "end": 999997, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3015, "stable_id": "LOC_Os01g02850", "start": 1000292, "end": 1000770, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3018, "stable_id": "LOC_Os01g02850.1", "start": 1000292, "end": 1000770, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3027, "stable_id": "LOC_Os01g02860", "start": 1001459, "end": 1006068, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3030, "stable_id": "LOC_Os01g02860.1", "start": 1001459, "end": 1006068, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3045, "stable_id": "LOC_Os01g02870", "start": 1009259, "end": 1011410, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3048, "stable_id": "LOC_Os01g02870.1", "start": 1009362, "end": 1011135, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3057, "stable_id": "LOC_Os01g02880", "start": 1015065, "end": 1018545, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3060, "stable_id": "LOC_Os01g02880.1", "start": 1015130, "end": 1018246, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3072, "stable_id": "LOC_Os01g02884", "start": 1023184, "end": 1029112, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3075, "stable_id": "LOC_Os01g02884.1", "start": 1023205, "end": 1028725, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3084, "stable_id": "LOC_Os01g02890", "start": 1045604, "end": 1052166, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3087, "stable_id": "LOC_Os01g02890.1", "start": 1046976, "end": 1051895, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3102, "stable_id": "LOC_Os01g02900", "start": 1056137, "end": 1058856, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3105, "stable_id": "LOC_Os01g02900.1", "start": 1056403, "end": 1058730, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3120, "stable_id": "LOC_Os01g02900.2", "start": 1056403, "end": 1058401, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3135, "stable_id": "LOC_Os01g02910", "start": 1065448, "end": 1068826, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3138, "stable_id": "LOC_Os01g02910.1", "start": 1065678, "end": 1068673, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3147, "stable_id": "LOC_Os01g02920", "start": 1070962, "end": 1074030, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3150, "stable_id": "LOC_Os01g02920.1", "start": 1071449, "end": 1073786, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3159, "stable_id": "LOC_Os01g02930", "start": 1077511, "end": 1080702, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3162, "stable_id": "LOC_Os01g02930.1", "start": 1077774, "end": 1080464, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3171, "stable_id": "LOC_Os01g02940", "start": 1088743, "end": 1092528, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3174, "stable_id": "LOC_Os01g02940.3", "start": 1089194, "end": 1092286, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3183, "stable_id": "LOC_Os01g02940.6", "start": 1089194, "end": 1092286, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3192, "stable_id": "LOC_Os01g02940.1", "start": 1089194, "end": 1092286, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3201, "stable_id": "LOC_Os01g02940.2", "start": 1089194, "end": 1092286, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3204, "stable_id": "LOC_Os01g02940.4", "start": 1089194, "end": 1092286, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3207, "stable_id": "LOC_Os01g02950", "start": 1096580, "end": 1097942, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3210, "stable_id": "LOC_Os01g02950.1", "start": 1096580, "end": 1097942, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3213, "stable_id": "LOC_Os01g02960", "start": 1102782, "end": 1105890, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3216, "stable_id": "LOC_Os01g02960.1", "start": 1102872, "end": 1105520, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3222, "stable_id": "LOC_Os01g02970", "start": 1111433, "end": 1112333, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3228, "stable_id": "LOC_Os01g02970.1", "start": 1111433, "end": 1112333, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3231, "stable_id": "LOC_Os01g02980", "start": 1119319, "end": 1125749, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3234, "stable_id": "LOC_Os01g02980.1", "start": 1119319, "end": 1125749, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3255, "stable_id": "LOC_Os01g02990", "start": 1136241, "end": 1136624, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3258, "stable_id": "LOC_Os01g02990.1", "start": 1136241, "end": 1136624, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3261, "stable_id": "LOC_Os01g02999", "start": 1137880, "end": 1138573, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3264, "stable_id": "LOC_Os01g02999.1", "start": 1137880, "end": 1138573, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3267, "stable_id": "LOC_Os01g03010", "start": 1142557, "end": 1143497, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3270, "stable_id": "LOC_Os01g03010.1", "start": 1142557, "end": 1143497, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3279, "stable_id": "LOC_Os01g03020", "start": 1144829, "end": 1154094, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3282, "stable_id": "LOC_Os01g03020.2", "start": 1146368, "end": 1154086, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3294, "stable_id": "LOC_Os01g03020.1", "start": 1145105, "end": 1154086, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3333, "stable_id": "LOC_Os01g03030", "start": 1154213, "end": 1157601, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3336, "stable_id": "LOC_Os01g03030.2", "start": 1154626, "end": 1156995, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3345, "stable_id": "LOC_Os01g03030.1", "start": 1154626, "end": 1157357, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3360, "stable_id": "LOC_Os01g03040", "start": 1159152, "end": 1163635, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3363, "stable_id": "LOC_Os01g03040.1", "start": 1159370, "end": 1163569, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3369, "stable_id": "LOC_Os01g03050", "start": 1164737, "end": 1167415, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3372, "stable_id": "LOC_Os01g03050.1", "start": 1164871, "end": 1166871, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3378, "stable_id": "LOC_Os01g03060", "start": 1167647, "end": 1170130, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3381, "stable_id": "LOC_Os01g03060.2", "start": 1167904, "end": 1168761, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3390, "stable_id": "LOC_Os01g03060.3", "start": 1167904, "end": 1168761, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3393, "stable_id": "LOC_Os01g03060.1", "start": 1167904, "end": 1168761, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3396, "stable_id": "LOC_Os01g03070", "start": 1170809, "end": 1178372, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3399, "stable_id": "LOC_Os01g03070.2", "start": 1171179, "end": 1177975, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3420, "stable_id": "LOC_Os01g03070.1", "start": 1171179, "end": 1177975, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3429, "stable_id": "LOC_Os01g03080", "start": 1180158, "end": 1181158, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3432, "stable_id": "LOC_Os01g03080.1", "start": 1180354, "end": 1180959, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3435, "stable_id": "LOC_Os01g03090", "start": 1182394, "end": 1185707, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3438, "stable_id": "LOC_Os01g03090.2", "start": 1182922, "end": 1185458, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3444, "stable_id": "LOC_Os01g03090.1", "start": 1182504, "end": 1185458, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3447, "stable_id": "LOC_Os01g03100", "start": 1185260, "end": 1190013, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3450, "stable_id": "LOC_Os01g03100.1", "start": 1186129, "end": 1188341, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3456, "stable_id": "LOC_Os01g03100.2", "start": 1186251, "end": 1188341, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3462, "stable_id": "LOC_Os01g03110", "start": 1197687, "end": 1202506, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3465, "stable_id": "LOC_Os01g03110.1", "start": 1197988, "end": 1202374, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3474, "stable_id": "LOC_Os01g03119", "start": 1210571, "end": 1213113, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3477, "stable_id": "LOC_Os01g03119.1", "start": 1210571, "end": 1213113, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3492, "stable_id": "LOC_Os01g03130", "start": 1216006, "end": 1217122, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3495, "stable_id": "LOC_Os01g03130.1", "start": 1216480, "end": 1216956, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3498, "stable_id": "LOC_Os01g03144", "start": 1221905, "end": 1229507, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3504, "stable_id": "LOC_Os01g03144.1", "start": 1224084, "end": 1229382, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3516, "stable_id": "LOC_Os01g03160", "start": 1231473, "end": 1235942, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3519, "stable_id": "LOC_Os01g03160.1", "start": 1231687, "end": 1235355, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3522, "stable_id": "LOC_Os01g03160.2", "start": 1231687, "end": 1235355, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3531, "stable_id": "LOC_Os01g03170", "start": 1237623, "end": 1241351, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3534, "stable_id": "LOC_Os01g03170.1", "start": 1237623, "end": 1241351, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3537, "stable_id": "LOC_Os01g03180", "start": 1248881, "end": 1250448, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3543, "stable_id": "LOC_Os01g03180.1", "start": 1249081, "end": 1250034, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3549, "stable_id": "LOC_Os01g03190", "start": 1253028, "end": 1254635, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3552, "stable_id": "LOC_Os01g03190.1", "start": 1253256, "end": 1254359, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3555, "stable_id": "LOC_Os01g03200", "start": 1259851, "end": 1261083, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3561, "stable_id": "LOC_Os01g03200.1", "start": 1260274, "end": 1261083, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3567, "stable_id": "LOC_Os01g03210", "start": 1263356, "end": 1264273, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3570, "stable_id": "LOC_Os01g03210.1", "start": 1263356, "end": 1264273, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3573, "stable_id": "LOC_Os01g03220", "start": 1300527, "end": 1301921, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3576, "stable_id": "LOC_Os01g03220.1", "start": 1300527, "end": 1301921, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3585, "stable_id": "LOC_Os01g03230", "start": 1308843, "end": 1310568, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3588, "stable_id": "LOC_Os01g03230.1", "start": 1309224, "end": 1310478, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3591, "stable_id": "LOC_Os01g03240", "start": 1312236, "end": 1313274, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3594, "stable_id": "LOC_Os01g03240.1", "start": 1312236, "end": 1313274, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3603, "stable_id": "LOC_Os01g03250", "start": 1314268, "end": 1314477, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3606, "stable_id": "LOC_Os01g03250.1", "start": 1314268, "end": 1314477, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3615, "stable_id": "LOC_Os01g03260", "start": 1314823, "end": 1318863, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3618, "stable_id": "LOC_Os01g03260.1", "start": 1314823, "end": 1318863, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3627, "stable_id": "LOC_Os01g03270", "start": 1327172, "end": 1328169, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3630, "stable_id": "LOC_Os01g03270.1", "start": 1327172, "end": 1328169, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3633, "stable_id": "LOC_Os01g03280", "start": 1329804, "end": 1331398, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3636, "stable_id": "LOC_Os01g03280.1", "start": 1329804, "end": 1331398, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3639, "stable_id": "LOC_Os01g03290", "start": 1332752, "end": 1333739, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3642, "stable_id": "LOC_Os01g03290.1", "start": 1332752, "end": 1333739, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3645, "stable_id": "LOC_Os01g03300", "start": 1334864, "end": 1336407, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3648, "stable_id": "LOC_Os01g03300.1", "start": 1334864, "end": 1336407, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3651, "stable_id": "LOC_Os01g03310", "start": 1337229, "end": 1338139, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3654, "stable_id": "LOC_Os01g03310.1", "start": 1337494, "end": 1338075, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3657, "stable_id": "LOC_Os01g03320", "start": 1340319, "end": 1341277, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3660, "stable_id": "LOC_Os01g03320.1", "start": 1340621, "end": 1341181, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3663, "stable_id": "LOC_Os01g03330", "start": 1343557, "end": 1345419, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3666, "stable_id": "LOC_Os01g03330.1", "start": 1344247, "end": 1345026, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3669, "stable_id": "LOC_Os01g03340", "start": 1346567, "end": 1347786, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3672, "stable_id": "LOC_Os01g03340.1", "start": 1346942, "end": 1347697, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3675, "stable_id": "LOC_Os01g03350", "start": 1349820, "end": 1350107, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3678, "stable_id": "LOC_Os01g03350.1", "start": 1349820, "end": 1350107, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3681, "stable_id": "LOC_Os01g03360", "start": 1352629, "end": 1353802, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3684, "stable_id": "LOC_Os01g03360.1", "start": 1352982, "end": 1353746, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3687, "stable_id": "LOC_Os01g03370", "start": 1355601, "end": 1360257, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3690, "stable_id": "LOC_Os01g03370.1", "start": 1355601, "end": 1360257, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3693, "stable_id": "LOC_Os01g03380", "start": 1362516, "end": 1363303, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3696, "stable_id": "LOC_Os01g03380.1", "start": 1362710, "end": 1363282, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3699, "stable_id": "LOC_Os01g03390", "start": 1364508, "end": 1365503, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3702, "stable_id": "LOC_Os01g03390.1", "start": 1364856, "end": 1365413, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3705, "stable_id": "LOC_Os01g03400", "start": 1367891, "end": 1368792, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3708, "stable_id": "LOC_Os01g03400.1", "start": 1367891, "end": 1368792, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3717, "stable_id": "LOC_Os01g03410", "start": 1371963, "end": 1373138, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3720, "stable_id": "LOC_Os01g03410.1", "start": 1371963, "end": 1373138, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3729, "stable_id": "LOC_Os01g03420", "start": 1374169, "end": 1376242, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3732, "stable_id": "LOC_Os01g03420.1", "start": 1374169, "end": 1376242, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3741, "stable_id": "LOC_Os01g03429", "start": 1378691, "end": 1381143, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3744, "stable_id": "LOC_Os01g03429.1", "start": 1378691, "end": 1381143, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3753, "stable_id": "LOC_Os01g03440", "start": 1382646, "end": 1384084, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3756, "stable_id": "LOC_Os01g03440.1", "start": 1382646, "end": 1384084, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3765, "stable_id": "LOC_Os01g03452", "start": 1385408, "end": 1393476, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3768, "stable_id": "LOC_Os01g03452.1", "start": 1385408, "end": 1393476, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3789, "stable_id": "LOC_Os01g03464", "start": 1394980, "end": 1396037, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3792, "stable_id": "LOC_Os01g03464.1", "start": 1394980, "end": 1396037, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3795, "stable_id": "LOC_Os01g03480", "start": 1400504, "end": 1402598, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3801, "stable_id": "LOC_Os01g03480.1", "start": 1400504, "end": 1402598, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3807, "stable_id": "LOC_Os01g03490", "start": 1403155, "end": 1406187, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3810, "stable_id": "LOC_Os01g03490.1", "start": 1403961, "end": 1405827, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3825, "stable_id": "LOC_Os01g03500", "start": 1409987, "end": 1412093, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3828, "stable_id": "LOC_Os01g03500.1", "start": 1410137, "end": 1411933, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3831, "stable_id": "LOC_Os01g03510", "start": 1412839, "end": 1418043, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3834, "stable_id": "LOC_Os01g03510.1", "start": 1412918, "end": 1417654, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3849, "stable_id": "LOC_Os01g03520", "start": 1420693, "end": 1427049, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3852, "stable_id": "LOC_Os01g03520.1", "start": 1422344, "end": 1426541, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3867, "stable_id": "LOC_Os01g03530", "start": 1432033, "end": 1435811, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3870, "stable_id": "LOC_Os01g03530.1", "start": 1433084, "end": 1435496, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3885, "stable_id": "LOC_Os01g03530.2", "start": 1433084, "end": 1435496, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3888, "stable_id": "LOC_Os01g03549", "start": 1436163, "end": 1444689, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3891, "stable_id": "LOC_Os01g03549.1", "start": 1436346, "end": 1444365, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3897, "stable_id": "LOC_Os01g03570", "start": 1445849, "end": 1449473, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3900, "stable_id": "LOC_Os01g03570.1", "start": 1446221, "end": 1449087, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3903, "stable_id": "LOC_Os01g03580", "start": 1450477, "end": 1453682, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3906, "stable_id": "LOC_Os01g03580.1", "start": 1450477, "end": 1453682, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3915, "stable_id": "LOC_Os01g03590", "start": 1456947, "end": 1458982, "strand": true, "chr_name": "1", "genome_db_id": 1},
//        {"id": 3918, "stable_id": "LOC_Os01g03590.1", "start": 1456947, "end": 1458982, "strand": true, "chr_name": "1", "genome_db_id": 1}
//    ]};

    data = json.member;
    var data_length = data.length;
    var maxLentemp = jQuery("#canvas").css("width");
    var top = 0;
    while (data_length--) {
        var start = data[data_length].start
        var end = data[data_length].end
        var startposition = (start) * parseFloat(maxLentemp) / parseFloat(sequencelength);
        var stopposition = (end - start + 1) * parseFloat(maxLentemp) / parseFloat(sequencelength);
        if (stopposition < 1) {
            stopposition = 1;
        }
        jQuery("<div>").attr({
            'class': "refMarker",
            'style': "LEFT:" + startposition + "px; width :" + stopposition + "px;"
        }).appendTo("#bar_image_ref");
    }
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
    jQuery("#selected_region").html("")
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
//    var json = {"trackname": "member", "ref": {"genome": 1, "genes": {"gene": {"gene_id": 988, "start": 1197687, "end": 1202506, "length": 4819, "reference": "1", "strand": 1, "transcripts": [
//        {"id": 1199, "start": 1197687, "end": 1202506, "length": 4819, "strand": 1, "desc": "expressed protein", "Exons": [
//            {"id": 4697, "start": 1202245, "end": 1202506, "length": 261, "strand": 1},
//            {"id": 4698, "start": 1201020, "end": 1201213, "length": 193, "strand": 1},
//            {"id": 4699, "start": 1200293, "end": 1200465, "length": 172, "strand": 1},
//            {"id": 4700, "start": 1199844, "end": 1200128, "length": 284, "strand": 1},
//            {"id": 4701, "start": 1199527, "end": 1199585, "length": 58, "strand": 1},
//            {"id": 4702, "start": 1199384, "end": 1199420, "length": 36, "strand": 1},
//            {"id": 4703, "start": 1199221, "end": 1199292, "length": 71, "strand": 1},
//            {"id": 4704, "start": 1198518, "end": 1198821, "length": 303, "strand": 1},
//            {"id": 4705, "start": 1197687, "end": 1198356, "length": 669, "strand": 1}
//        ]}
//    ]}}}, "member": [
//        {"cigarline1": "520MD20M", "cigarline2": "M5D5M15D20M6D8M62D18M22D379M", "genome": 4, "genes": {"gene": {"gene_id": 1442, "start": 81085, "end": 84813, "length": 3728, "reference": "Scaffold42153", "strand": 1, "transcripts": [
//            {"id": 1442, "start": 81085, "end": 84813, "length": 3728, "strand": 1, "Exons": [
//                {"id": 7135, "start": 81085, "end": 81166, "length": 81, "strand": 1},
//                {"id": 7136, "start": 82666, "end": 83035, "length": 369, "strand": 1},
//                {"id": 7137, "start": 83220, "end": 83278, "length": 58, "strand": 1},
//                {"id": 7138, "start": 83393, "end": 83429, "length": 36, "strand": 1},
//                {"id": 7139, "start": 83519, "end": 83590, "length": 71, "strand": 1},
//                {"id": 7140, "start": 83953, "end": 84256, "length": 303, "strand": 1},
//                {"id": 7141, "start": 84442, "end": 84813, "length": 371, "strand": 1}
//            ]}
//        ]}}},
//        {"cigarline1": "520MD20M", "cigarline2": "325D61MD141M8D5M", "genome": 3, "genes": {"gene": {"gene_id": 1731, "start": 10904010, "end": 10905317, "length": 1307, "reference": "3", "strand": 1, "transcripts": [
//            {"id": 4324, "start": 10904010, "end": 10905317, "length": 1307, "strand": 1, "Exons": [
//                {"id": 13770, "start": 10904010, "end": 10905317, "length": 1307, "strand": 1}
//            ]},
//            {"id": 4323, "start": 10904088, "end": 10905316, "length": 1228, "strand": 1, "Exons": [
//                {"id": 13768, "start": 10905015, "end": 10905316, "length": 301, "strand": 1},
//                {"id": 13769, "start": 10904088, "end": 10904776, "length": 688, "strand": 1}
//            ]},
//            {"id": 4325, "start": 10904248, "end": 10905317, "length": 1069, "strand": 1, "Exons": [
//                {"id": 13771, "start": 10905015, "end": 10905317, "length": 302, "strand": 1},
//                {"id": 13772, "start": 10904395, "end": 10904776, "length": 381, "strand": 1},
//                {"id": 13773, "start": 10904248, "end": 10904301, "length": 53, "strand": 1}
//            ]}
//        ]}}},
//        {"cigarline1": "3MD10MD6MD6MD43MD472M", "cigarline2": "545M", "genome": 2, "genes": {"gene": {"gene_id": 7910, "start": 1079091, "end": 1084373, "length": 5282, "reference": "2", "strand": 1, "transcripts": [
//            {"id": 9183, "start": 1079091, "end": 1084373, "length": 5282, "strand": 1, "Exons": [
//                {"id": 43558, "start": 1084139, "end": 1084373, "length": 234, "strand": 1},
//                {"id": 43559, "start": 1082860, "end": 1083056, "length": 196, "strand": 1},
//                {"id": 43560, "start": 1082046, "end": 1082218, "length": 172, "strand": 1},
//                {"id": 43561, "start": 1081203, "end": 1081487, "length": 284, "strand": 1},
//                {"id": 43562, "start": 1080912, "end": 1080970, "length": 58, "strand": 1},
//                {"id": 43563, "start": 1080762, "end": 1080798, "length": 36, "strand": 1},
//                {"id": 43564, "start": 1080580, "end": 1080651, "length": 71, "strand": 1},
//                {"id": 43565, "start": 1079947, "end": 1080250, "length": 303, "strand": 1},
//                {"id": 43566, "start": 1079091, "end": 1079772, "length": 681, "strand": 1}
//            ]}
//        ]}}}
//    ]};

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

    if (new_max > genes.gene.length) {
        max = new_max;
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
    jQuery("#gene_widget").append("<div style='width: 900px; padding: 25px 5px; position: relative; border: 2px solid black; top: 10px' id='ref'><span style='position: absolute; top:0px;'>" + name + "</span></div>")

    dispGenes("#ref", genes, max);

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
            jQuery("#gene_widget").append("<div style='width: 900px; padding: 5px; position: relative; border: 1px solid gray; top: 10px' id='core" + core_data[i].genome + "'>" + name + "</div>")
        }

        if (core_data[i].cigarline1) {
            dispGenes("#core" + core_data[i].genome, genes, max, core_data[i].cigarline1, core_data[i].cigarline2, ref_data.genes.gene.transcripts[0]);
        }

        else {
            dispGenes("#core" + core_data[i].genome, genes, max);
        }

    }

        }
        });
}
function dispGenes(div, track, max, cigarline1, cigarline2, ref) {
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
//        label = gene.transcripts[transcript_len].desc;
        if (gene.transcripts[transcript_len].layer > j) {
            j = gene.transcripts[transcript_len].layer;
        }
        var top = transcript_len * 20 + 25;
        var startposition = (1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var stopposition = (gene_stop - gene_start + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var margin = "margin-top:5px;margin-bottom:5px;";
        if (transcript_len == 0) {
            margin = "margin-top:5px;margin-bottom:25px;";
        }
                                                                                                                                                console.log(ref)
        if (cigarline2) {
            var ref_stopposition = (ref.end - ref.start + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);

            var temp_div = jQuery("<div>").attr({
                'id': transcript_len,
                'class': "gene",
                'onClick': "hitClicked('"+cigarline1+"',"+1+","+1+","+ref.length+","+ ref.start+","+ ref_stopposition+",'"+ ref.Exons.toJSON()+"')", //jQuery('#ref').append(dispCigarLine(cigarline1,1,top,(gene_stop - gene_start), gene_start, stopposition, ref.Exons.toJSON())),
                'style': "position:relative;  cursor:pointer; height: 14px; " + margin + " LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).html("<p style='position: relative; white-space: nowrap; padding: 15px;'>" + label + "</p>").appendTo(div);
            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            jQuery(temp_div).append(dispCigarLine(cigarline2, 1, top, (gene_stop - gene_start), gene_start, stopposition, gene.transcripts[transcript_len].Exons.toJSON()));
        }
        else{
            var temp_div = jQuery("<div>").attr({
                'id': transcript_len,
                'class': "gene",
                'style': "position:absolute;  cursor:pointer; height: 14px; " + margin + " top:10px; LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).html("<p style='position: relative; white-space: nowrap; '>" + label + "</p>").appendTo(div);
            dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);

            var temp_div = jQuery("<div>").attr({
                'id': "cigar",
                'style': "position:absolute;  cursor:pointer; height: 14px; " + margin + " top:10px; LEFT:" + startposition + "px; width :" + stopposition + "px;"
            }).appendTo(div);
        }


    }
}

function dispGeneExon(track, genestrand, div, gene_start, width, max_len) {
    var trackClass = "exon";

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

            jQuery("<div>").attr({
                'class': trackClass,
                'style': "position:absolute; cursor:pointer; height: 10px; z-index: 100;  TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
            }).appendTo(div);


            jQuery("<span>").attr({
                'class': spanclass,
                'style': "cursor:pointer; position:absolute; z-index; 999; TOP:" + (top - 1) + "px; left:" + (startposition - 20) + "px "
            }).appendTo(div);

        }
    }
}

function dispCigarLine(cigars, start, top, max, gene_start, stop, exons) {
         console.log("dispcigarline "+exons)

    exons = jQuery.parseJSON( exons );

    exons.sort(sort_by('start', true, parseInt));
    var track_html = "";
    var trackClass = "";
    var newStart_temp = 1;
    var newEnd_temp = max;
    var maxLentemp = stop;
    var exon_number = 0;
    var cigar_pos = exons[exon_number].start - gene_start;
    var temp_end = exons[exon_number].end - gene_start;
    var temp_start = 1;
    var startposition;
    var stopposition;

    if (cigars != '*') {
        cigars = cigars.replace(/([SIXMND])/g, ":$1,");
        var cigars_array = cigars.split(',');
        for (var i = 0; i < cigars_array.length - 1; i++) {
            var cigar = cigars_array[i].split(":");
            var key = cigar[1];
            var length = cigar[0];
            if (!length) {
                length = 1
            }
            if (key == "M") {
                trackClass = "insert";

            }
            else if (key == "D") {
                trackClass = "delete";
            }

            startposition = parseInt(temp_start) + parseInt((cigar_pos - newStart_temp) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp));
            stopposition = (length) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
            cigar_pos = parseInt(cigar_pos) + parseInt(length)
            if (cigar_pos <= temp_end) {
                track_html += trackHTML(startposition, stopposition, top, trackClass);
            } else {
                var temp_length = cigar_pos - temp_end;
                stopposition = (length - temp_length) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
                track_html += trackHTML(startposition, stopposition, top, trackClass);

                exon_number++;
                cigar_pos = exons[exon_number].start - gene_start;
                temp_end = exons[exon_number].end - gene_start;

                startposition = parseInt(temp_start) + parseInt((cigar_pos - newStart_temp) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp));
                stopposition = (temp_length) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
                track_html += trackHTML(startposition, stopposition, top, trackClass);
                cigar_pos = parseInt(cigar_pos) + parseInt(temp_length)

            }
        }
    }



    function trackHTML(startposition, stopposition, top, trackClass) {
        var track_html_local;
        track_html_local = "<div class='" + trackClass + "'  " +
            "STYLE=\"height: 14px; z-index: 1999; TOP:0px; LEFT:" + startposition + "px; opacity:0.5; " +
            "width:" + (stopposition) + "px \" > </div>";
        return track_html_local;
    }

    return track_html;
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

function hitClicked(cigarline1,start,top,length, gene_start, stopposition, Exons){
           console.log("here")
    console.log(cigarline1)
    console.log(start)
    console.log(top)
    console.log(length)
    console.log(gene_start)
    console.log(stopposition)
    console.log(Exons)

    jQuery('#cigar').html(dispCigarLine(cigarline1,start,top,length, gene_start, stopposition, Exons));
}

