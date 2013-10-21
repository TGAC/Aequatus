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

//    var new_data = data;
    var new_data = jQuery.grep(data, function (element, index) {
        return element.start >= start && element.start <= end; // retain appropriate elements
    });

    var data_length = new_data.length;
    var total_data_length = data_length
    var maxLentemp = jQuery("#canvas").css("width");
    var top = 0;
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
//                    'title': label,
            'onClick': "getcoreMember(\"" + new_data[data_length].id + "\")"
//                    'onmouseOver': "trackmouseover(\"" + track + "\",\"" + len + "\")",
//                    'onmouseOut': 'trackmouseout()'
        }).appendTo("#selected_region");
    }
}

function getcoreMember(query) {
    Fluxion.doAjax(
        'comparaService',
        'getCoreMember',
        {'query': query, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            data = json.member;
            var max = 0;
            jQuery("#gene_widget").html("")
            for (var i = 0; i < data.length; i++) {
                var genes = data[i].genes;
                var new_max = genes.gene.length;
                if (new_max > max) {
                    max = new_max;
                }
            }

            for (var i = 0; i < data.length; i++) {
                var genes = data[i].genes
                if (document.getElementById("ref" + data[i].genome) == null) {
                    jQuery("#gene_widget").append("<div style='width: 500px; padding: 5px; position: relative; border: 1px solid black; top: 10px' id='ref" + data[i].genome + "'></div>")
                }


                dispGenes("#ref" + data[i].genome, genes, max);
            }
        }
        });
}

function dispGenes(div, track, max) {
    console.log(div)
    var gene = track.gene;

    var trackClass;

    var newStart_temp = 1;
    var newEnd_temp = max;
    var maxLentemp = jQuery(div).css("width");

    var label = "";
    var j = 0;


    trackClass = "gene track";


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
        var gene_desc = gene.transcripts[transcript_len].desc;
        var border = " border-left: 1px solid #000000; border-right: 1px solid #000000;";
        label = gene.transcripts[transcript_len].desc;
        if (gene.transcripts[transcript_len].layer > j) {
            j = gene.transcripts[transcript_len].layer;
        }
        var top = transcript_len * 20 + 25;
        var startposition = (1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
        var stopposition = (gene_stop - gene_start + 1) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);

        var temp_div = jQuery("<div>").attr({
            'id': transcript_len,
            'class': "gene",
            'style': "position:relative;  cursor:pointer; height: 10px; margin-top:5px;margin-bottom:5px; LEFT:" + startposition + "px; width :" + stopposition + "px;"
            // 'title': label,
            // 'onClick': "trackClick('" + track + "'," + len + "," + transcript_len + ")"
        }).appendTo(div);

        console.log(temp_div);
        //    jQuery("<div>").attr({
        //      'class': "tracklabel " ,
        //    'style': " z-index: 999; overflow: hidden;text-overflow: ellipsis;",
        //   'title': label

//            }).html("<p>" + label + "</p>").appendTo("#" + transcript_len);

        dispGeneExon(gene.transcripts[transcript_len], gene.strand, temp_div, gene_start, stopposition, gene_length);
//


    }
}

function dispGeneExon(track, genestrand, div, gene_start, width, max_len) {
    var trackClass = "exon";
    var utrtrackClass = "utr ";


    var geneexons = track.Exons;
    var genetranscript = track;


    if (geneexons.length > 0) {
        var track_html = "";
        var last = null, current = null;
        var strand = genestrand;

        var spanclass = "ui-icon ui-icon-carat-1-e";

        if (strand == -1 || strand == "-1") {
            spanclass = "ui-icon ui-icon-carat-1-w";
        }

        var newStart_temp = gene_start;
        var maxLentemp = width;


        var exon_len = geneexons.length;
        var last_exon = 0;
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
            current = exon_start;


            startposition = (exon_start - newStart_temp) * parseFloat(maxLentemp) / (max_len);
            stopposition = (exon_stop - exon_start + 1) * parseFloat(maxLentemp) / (max_len);

            jQuery("<div>").attr({
                'class': trackClass,
                'style': "position:absolute; cursor:pointer; height: 10px; z-index: 100;  TOP:" + top + "px; LEFT:" + startposition + "px; width:" + (stopposition) + "px"
            }).appendTo(div);


//            if (last != null || geneexons.length == 1) {
//                if ((startposition - 20) > (transcript_start - newStart_temp) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp) + parseFloat(maxLentemp) / 2) {
//                    jQuery("<span>").attr({
//                        'class': spanclass,
//                        'style': "cursor:pointer; position:absolute; z-index; 999; TOP:" + (top - 3) + "px; left:" + (startposition - 20) + "px "
//                    }).appendTo(div);
//                }
//            }


        }
    }
}


