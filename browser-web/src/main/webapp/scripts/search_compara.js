/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */


function getReferences() {



    var colours = ['rgb(166,206,227)','rgb(31,120,180)','rgb(178,223,138)','rgb(51,160,44)','rgb(251,154,153)','rgb(227,26,28)','rgb(253,191,111)','rgb(255,127,0)','rgb(202,178,214)'];
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    Fluxion.doAjax(
        'comparaService',
        'getGenomes',
        { 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            var content = "" +
                "<select style='' name='genomes' id='genomes' onchange='getChromosomes(jQuery(\"#genomes\").val())'> "

            json.genomes.sort(naturalSort)

            for (var i = 0; i < json.genomes.length; i++) {
                var left = (100 * i) + 50
                content += "<td>" +
                    "<option id='option"+json.genomes[i].name+"'  value ="+ json.genomes[i].genome_db_id+" background= "+colours[i]+">" + json.genomes[i].name + "</option> "
            }
            content += "</select>"

            jQuery("#genomes").change(function(){
                var color = jQuery("option:selected", this).css("background");
                jQuery(".headerbar").css("background", color);
            });


            jQuery("#reference_maps").html(content);
            jQuery("#canvas").show();
            getChromosomes(json.genomes[0].genome_db_id, true);
        }
        });
}
function search(query) {

    var name = arguments.callee.toString();
    console.log(name)

    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    jQuery('#sessioninput').fadeOut();
    jQuery("#sessionid").html("");
    minWidth = null;
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

function search_member(query) {

                 console.log("search member")
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    jQuery('#sessioninput').fadeOut();
    jQuery("#sessionid").html("");
    minWidth = null;
//    jQuery('#canvas').hide();
    jQuery("#chr_maps").html("");
    jQuery("#bar_image_ref").html("")
    jQuery("#selected_region").html("")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")
    jQuery("#gene_widget_exons").html("")

    console.log("search member cleaned")



    jQuery("#searchresultHead").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>");
    var reference = jQuery('#genomes').val();
    Fluxion.doAjax(
        'comparaService',
        'searchMember',
        {'query': query, 'reference': reference, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            var content = "";
            for (var i = 0; i < json.html.length; i++) {
                if (i == 0) {
                    content += "<table class='list' id='search_hit' ><thead><tr><th>Genome_db_id</th><th>Chromosome</th><th>Position</th><th>Description</th><th>Stable ID</th><th>Link</th></tr></thead>";
                }

                var link = "<span onclick='jQuery(\"#canvas\").show(); getChromosomes("+json.html[i].genome_db_id+","+ json.html[i].chr_name+","+  json.html[i].member_id+"); getcoreMember("+json.html[i].member_id+");'>Click</span>"

                content += "<tr><td> " + json.html[i].genome_db_id + "<td>" + json.html[i].chr_name + "<td>" + json.html[i].chr_start+"-"+json.html[i].chr_end + " <td> "+json.html[i].description+"</td> <td> "+json.html[i].stable_id+"</td> <td>"+ link +"</td>";

                if (i == json.html.length - 1) {
                    content += "</table>";
                    jQuery("#search_result").html(content);
                    jQuery("#search_result").fadeIn();
                    jQuery("#search_hit").tablesorter();
                }

            }
        }
        });
}

//function seqregionSearchPopup(query, reference, from, to, jsonid, oldtracks) {
//    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
//    jQuery('#sessioninput').fadeOut();
//    jQuery("#sessionid").html("");
//    minWidth = null;
//    removeAllPopup();
//    jQuery('#canvas').hide();
//    jQuery('#tabGenes').html('');
//    jQuery('#tabGO').html('');
//    jQuery('#tabTranscripts').html('');
//
//    jQuery("#searchresultHead").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>");
//    Fluxion.doAjax(
//        'comparaService',
//        'searchDnafrag',
//        {'query': query, 'reference': reference, 'url': ajaxurl},
//        {'doOnSuccess': function (json) {
//            if (json.html == "genomes") {
//                jQuery('#canvas').hide();
//                jQuery('#currentposition').hide();
//                jQuery("#searchresult").fadeIn();
//                var content = "<h1>Search Results: </h1><br>";
//
//                for (var i = 0; i < json.genomes.length; i++) {
//                    if (i == 0) {
//                        content += "<table class='list' id='search_hit' ><thead><tr><th>Genome_db_id</th><th>Genome</th><th>Assembly</th><th>Link</th></tr></thead>";
//                    }
//                    content += "<tr><td> " + json.genomes[i].genome_db_id + "<td>" + json.genomes[i].name + "<td>" + json.genomes[i].assembly + " <td><a target='_blank' href='index.jsp?query=" + json.genomes[i].name + "' > <span title=\"Link\" class=\"ui-button ui-icon ui-icon-link\" </span><a/></td>";
//                }
//                jQuery("#searchresult").html(content)
//            }
//            else {
//                seq = json.html;
//                sequencelength = json.length;
//                track_list = json.tracklists;
//                jQuery('#seqnameh1').html(json.seqregname);
//                jQuery('#seqname').html("<br/>");
//                jQuery('#searchseqregioninput').fadeOut();
//                jQuery('#canvas').show();
//                jQuery('#currentposition').show();
//                jQuery('#openCloseWrap').show();
//                jQuery('#displayoptions').show();
//                seqregname = json.seqregname;
//                tracks = jQuery("#filetrack").html().split(',');
//                if (tracks[0].length) {
//                    for (var i = 0; i < tracks.length; i++) {
//                        var filename = tracks[i].substring(tracks[i].lastIndexOf("/") + 1, tracks[i].lastIndexOf("."));
//                        var type = tracks[i].substring(tracks[i].lastIndexOf(".") + 1, tracks[i].length);
//                        track_list.push(
//                            {name: filename + "_" + type, id: tracks[i], display_label: filename, desc: tracks[i], disp: 1, merge: 0, graph: "false", display_lable: tracks[i], label: 0}
//                        );
//                    }
//                }
//                     trackList(track_list);
//                minWidth = findminwidth();
//
//
//                setBegin((sequencelength - minWidth) / 2);
//                setEnd(parseInt(getBegin()) + minWidth);
//                jumpToSeq();
//                setNavPanel();
//
//                jQuery("#controlsbutton").colorbox({width: "90%", inline: true, href: "#controlpanel"});
//
//                dispSeqCoord();
//                displayCursorPosition();
//                initiate();
//                loadDefaultTrack(track_list);
//
//            }
//        }
//        });
//}
//
//function loadTrackAjax(trackId, trackname) {
//
//
//
//        window[trackname] == "loading";
//    var partial = (getEnd() - getBegin()) + ((getEnd() - getBegin()) / 2);
//    var start = (getBegin() );
//    var end = parseInt(getEnd());
//    if (start < 0) {
//        start = 0;
//    }
//    if (end > sequencelength) {
//        end = sequencelength;
//    }
//        Fluxion.doAjax(
//            'comparaService',
//            'loadTrack',
//            {'query': seqregname, 'reference': jQuery('#genomes').val(),'trackname': trackname,'start': start, 'end': end,  'trackid': trackId, 'url': ajaxurl},
//            {'doOnSuccess': function (json) {
//                if (json.type == "graph") {
//                    window['track_list' + json.trackname].graph = "true";
//                }
//                else {
//                    window['track_list' + json.trackname].graph = "false";
//                }
//
//                var trackname = json.trackname;
//                window[trackname] =  json[trackname]
//                trackToggle(json.trackname);
//            }
//            });
//}