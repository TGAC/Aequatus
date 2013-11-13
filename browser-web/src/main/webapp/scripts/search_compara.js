/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */


function getReferences() {
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
//    Fluxion.doAjax(
//        'comparaService',
//        'getGenomes',
//        { 'url': ajaxurl},
//        {'doOnSuccess': function (json) {
            var json = {"genomes":[{"genome_db_id":1,"taxon_id":39947,"name":"oryza_sativa","assembly":"MSU6","assembly_default":true,"genebuild":"2009-01-MSU","locator":"Bio::EnsEMBL::DBSQL::DBAdaptor/host=tgac-db1;port=3306;user=tgacro;pass=tgacR0;dbname=herreroj_oryza_sativa_core_18_71_6;species=oryza_sativa;species_id=1;disconnect_when_inactive=1"},{"genome_db_id":2,"taxon_id":15368,"name":"brachypodium_distachyon","assembly":"v1.0","assembly_default":true,"genebuild":"2010-02-JGI","locator":"Bio::EnsEMBL::DBSQL::DBAdaptor/host=tgac-db1;port=3306;user=tgacro;pass=tgacR0;dbname=herreroj_brachypodium_distachyon_core_18_71_12;species=brachypodium_distachyon;species_id=1;disconnect_when_inactive=1"},{"genome_db_id":3,"taxon_id":112509,"name":"hordeum_vulgare","assembly":"030312v2","assembly_default":true,"genebuild":"2012-06-IBSC_1.0","locator":"Bio::EnsEMBL::DBSQL::DBAdaptor/host=tgac-db1;port=3306;user=tgacro;pass=tgacR0;dbname=herreroj_hordeum_vulgare_core_19_72_1;species=hordeum_vulgare;species_id=1;disconnect_when_inactive=1"},{"genome_db_id":4,"taxon_id":37682,"name":"aegilops_tauschii","assembly":"GCA_000347335.1","assembly_default":true,"genebuild":"2008-11-BGI","locator":"Bio::EnsEMBL::DBSQL::DBAdaptor/host=tgac-db1;port=3306;user=tgacro;pass=tgacR0;dbname=herreroj_aegilops_tauschii_core_19_72_1;species=aegilops_tauschii;species_id=1;disconnect_when_inactive=1"}]};
            var content = "<select name=\"genomes\" id=\"genomes\">  "
            for (var i = 0; i < json.genomes.length; i++) {
                content += "<option value=\"" + json.genomes[i].genome_db_id + "\">" + json.genomes[i].name + "</option>  "
            }
            content += "</select>";
            jQuery("#genome_list").html(content);
//        }
//        });
}
function search(query, from, to, jsonid, oldtracks) {
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

                content += "<tr><td> " + json.genomes[i].genome_db_name + "<td>" + json.genomes[i].name + "<td>" + json.genomes[i].assembly + " <td><a target='_blank' href='index.jsp?query=" + json.genomes[i].name + "&&genome="+json.genomes[i].genome_db_id+"' > <span title=\"Link\" class=\"ui-button ui-icon ui-icon-link\" </span><a/></td>";
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


function seqregionSearchPopup(query, reference, from, to, jsonid, oldtracks) {
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
                sequencelength = json.length;
                track_list = json.tracklists;
                jQuery('#seqnameh1').html(json.seqregname);
                jQuery('#seqname').html("<br/>");
                jQuery('#searchseqregioninput').fadeOut();
                jQuery('#canvas').show();
                jQuery('#currentposition').show();
                jQuery('#openCloseWrap').show();
                jQuery('#displayoptions').show();
                seqregname = json.seqregname;
                tracks = jQuery("#filetrack").html().split(',');
                if (tracks[0].length) {
                    for (var i = 0; i < tracks.length; i++) {
                        var filename = tracks[i].substring(tracks[i].lastIndexOf("/") + 1, tracks[i].lastIndexOf("."));
                        var type = tracks[i].substring(tracks[i].lastIndexOf(".") + 1, tracks[i].length);
                        track_list.push(
                            {name: filename + "_" + type, id: tracks[i], display_label: filename, desc: tracks[i], disp: 1, merge: 0, graph: "false", display_lable: tracks[i], label: 0}
                        );
                    }
                }
                     trackList(track_list);
                minWidth = findminwidth();


                setBegin((sequencelength - minWidth) / 2);
                setEnd(parseInt(getBegin()) + minWidth);
                jumpToSeq();
                setNavPanel();

                jQuery("#controlsbutton").colorbox({width: "90%", inline: true, href: "#controlpanel"});

                dispSeqCoord();
                displayCursorPosition();
                initiate();
                loadDefaultTrack(track_list);

            }
        }
        });
}

function loadTrackAjax(trackId, trackname) {



        window[trackname] == "loading";
    var partial = (getEnd() - getBegin()) + ((getEnd() - getBegin()) / 2);
    var start = (getBegin() );
    var end = parseInt(getEnd());
    if (start < 0) {
        start = 0;
    }
    if (end > sequencelength) {
        end = sequencelength;
    }
        Fluxion.doAjax(
            'comparaService',
            'loadTrack',
            {'query': seqregname, 'reference': jQuery('#genomes').val(),'trackname': trackname,'start': start, 'end': end,  'trackid': trackId, 'url': ajaxurl},
            {'doOnSuccess': function (json) {
                if (json.type == "graph") {
                    window['track_list' + json.trackname].graph = "true";
                }
                else {
                    window['track_list' + json.trackname].graph = "false";
                }

                var trackname = json.trackname;
                window[trackname] =  json[trackname]
                trackToggle(json.trackname);
            }
            });
}