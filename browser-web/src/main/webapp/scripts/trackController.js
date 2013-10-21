/*
 *
 * Copyright (c) 2013. The Genome Analysis Centre, Norwich, UK
 * TGAC Browser project contacts: Anil Thanki, Xingdong Bian, Robert Davey, Mario Caccamo @ TGAC
 * **********************************************************************
 *
 * This file is part of TGAC Browser.
 *
 * TGAC Browser is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TGAC Browser is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with TGAC Browser.  If not, see <http://www.gnu.org/licenses/>.
 *
 * ***********************************************************************
 *
 */
var layers, mergedTracklist;

function trackStatement(trackClass, track, startposition, stopposition, a, top, j) {
    return "<div class='" + trackClass + "'  " +
        "STYLE=\"position:absolute; cursor:pointer; height: 10px; z-index: 100; TOP:" + top + "px; LEFT:" + startposition + "px; " +
        "width:" + (stopposition) + "px \" onclick=trackClick(\"" + track + "\",\"" + a + "\",\"" + j + "\");> </div>";
}

function getStart(track_start) {
    return (track_start - newStart_temp) * parseFloat(maxLen) / (newEnd_temp - newStart_temp) + parseFloat(maxLen) / 2;
}

function toogleLabel(trackName) {
    if (window['track_list' + trackName].label == 1) {
        window['track_list' + trackName].label = 0
    }
    else {
        window['track_list' + trackName].label = 1

    }
    jQuery(".label" + trackName).toggle();
}

function toogleTrackView(trackName) {
    if (window['track_list' + trackName].expand == 1) {
        window['track_list' + trackName].expand = 0
    }
    else {
        window['track_list' + trackName].expand = 1
    }

    trackToggle(trackName);
}

function showObject(start, end, objStart, objEnd) {
    var show = false;
    if (parseInt(start) <= parseInt(objStart) && parseInt(end) >= parseInt(objEnd)) {
        show = true;
    }
    else if (parseInt(start) <= parseInt(objEnd) && parseInt(end) >= parseInt(objEnd)) {
        show = true;
    }

    else if (parseInt(start) <= parseInt(objStart) && parseInt(end) >= parseInt(objStart)) {
        show = true;
    }

    else {
        show = parseInt(start) >= parseInt(objStart) && parseInt(end) <= parseInt(objEnd);
    }
    return show;
}


function trackClick(track, i, j) {

    if (ctrldown) {
        if (window[track][i].id == grouplastid || grouplastid == null) {
            grouplist.push(window[track][i].transcript[j].id);
            grouplastid = window[track][i].id;
            grouptrack = track;
        }
    }
    else {
        newpopup(track, i, j)
    }


}

function trackmouseover(child, track, track_len) {
    svgClear();
    child_track = window[track][track_len].child;


    jQuery("#track_wrapper").svg();
    jQuery("#track_wrapper").svg('get').clear();

    var svg = jQuery("#track_wrapper").svg('get');

    var align_length = child_track.length;
    var refs = [];

    while (align_length--) {
        var align_track_start = child_track[align_length].start;
        var align_track_stop = child_track[align_length].end;
        var id = child_track[align_length].ref_id;
        if (jQuery.inArray(id, refs) >= 0) {
        }
        else {
            refs.push(id);
            drawrefoncircle(align_track_start, align_track_stop, parseInt(jQuery.inArray(id, refs))+parseInt(1), track + "" + track_len, child_track[align_length].genome_db_id, child_track[align_length].length);

        }
//        var x1 = jQuery("#"+child_track[align_length].id + "" + align_length).offset().left
//        var y1 = jQuery("#"+child_track[align_length].id + "" + align_length).offset().top
//
//
//
//        var x2 = x1+jQuery("#"+id).height()
//        var y2 = y1+jQuery("#"+id).width()
//
//        console.log(x1+","+y1+","+x2+","+y2+","+track+""+track_len)
//        markers(x1,y1,x2,y2,track+""+track_len, svg)

        drawoncircle(align_track_start, align_track_stop, parseInt(jQuery.inArray(id, refs))+parseInt(1), track + "" + track_len, child_track[align_length].genome_db_id, child_track[align_length].length);
    }
}
function trackmouseout() {
    jQuery("#trackmouseover").hide();
    jQuery("#trackmouseoverhead").html('');
}

function indelClick(query, hit) {
    newBlastpopup(query, hit);
}

function removeTrack(div, track) {
    jQuery('#' + track + 'Checkbox').attr('checked', false);
//  jQuery("#" + track + "span").remove();
    jQuery("#" + track + "mergedCheckbox").attr("disabled", true);
    jQuery(div).html();
    jQuery(div).fadeOut();
    jQuery("#" + track + "_wrapper").fadeOut();
    window['track_list' + track].disp = 0

//  jQuery(track_list).each(function (index) {
//    if (track_list[index].name == track) {
//      track_list[index].disp = 0;
//    }
//  });
}

function removeMergedTrack() {

    jQuery(track_list).each(function (index) {
        if (jQuery("#" + track_list[index].name + "mergedCheckbox").attr('checked')) {
//      this.disp = 0;
            window['track_list' + track_list[index].name].disp = 0

            jQuery('input[name=' + track_list[index].name + 'mergedCheckbox]').attr('checked', false);
            trackToggle(track_list[index].name);
        }
    });
    jQuery("#mergedtrack").html("<div id= \"mergelabel\" align='left' class='handle'></div>");
    jQuery("#mergedtrack").fadeOut();
    jQuery("#mergedtrack_wrapper").fadeOut();

}

function toogleLabelMerged() {
    jQuery(track_list).each(function (index) {
        if (jQuery("#" + track_list[index].name + "mergedCheckbox").attr('checked')) {
//      this.disp = 0;
            if (this.label == 1) {
                window['track_list' + track_list[index].name].label = 0
//        this.label = 0;
            }
            else {
                window['track_list' + track_list[index].name].label = 1
//        this.label = 1;
            }

        }
    });


    jQuery(".Merged_Track").toggle();
}


function dispBLAST(div, track) {
    jQuery(div).html("<img src=\"./images/browser/dna_helix_md_wm.gif\" alt=\"loading\">");
    var blasts = window[track];
    if (!window[track] || window[track] == "running") {
        jQuery(div).html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
        jQuery(div).fadeIn();
    }
    else if (blasts[0] == "No hits found.") {
        alert(blasts);
        jQuery('#' + track + 'Checkbox').attr('checked', false);
        jQuery(div).html();
        jQuery(div).fadeOut();
        delete window['blasttrack'];
        delete track_list.splice(track_list.length, 1);
        jQuery("#blasttrack_div").remove();
        jQuery("#blastcheck").remove();
        jQuery("#blastcheckmerge").remove();
    }

    else {

        if (blasts.length > 0) {
            var track_html = "<div align='left' class='handle'><table><tr><td><b>" + track + "</b>(" + blasts.length + ")</td><td><div title='Label Toggle' class=\"closehandle ui-icon ui-icon-comment\" onclick=toogleLabel(\"" + track + "\");> </div></td><td><div title='Close' class='closehandle ui-icon ui-icon-close' onclick=removeTrack(\"" + div + "\",\"" + track + "\");></div></td></tr></table></div>";


            var layers = blasts.length + 1;
            var maxLen_temp = jQuery("#canvas").css("width");
            for (var i = 0; i < blasts.length; i++) {
                var blast_start = blasts[i].start;
                var blast_stop = blasts[i].end;
                var blast_desc = blasts[i].desc.replace(">", "");
                var score = blasts[i].score;


                var partial = (getEnd() - getBegin()) / 2;
                var start = getBegin() - partial;

                var end = parseInt(getEnd()) + parseInt(partial);
                var show = showObject(start, end, blast_start, blast_stop);
                var border = 0;
                if (blasts[i].flag) {
                    border = 1
                }
                var image = "./images/browser/blastred.jpg";
                if (parseInt(score) < 40) {
                    image = "./images/browser/blastblack.jpg";
                }
                else if (parseInt(score) < 50) {
                    image = "./images/browser/blastblue.jpg";
                }
                else if (parseInt(score) < 80) {
                    image = "./images/browser/blastgreen.jpg";
                }
                else if (parseInt(score) < 200) {
                    image = "./images/browser/blastpink.jpg";
                }
                else {
                    image = "./images/browser/blastred.jpg";
                }

                if (show) {
                    var top = ((i + 1) % layers) * 15 + 10;
                    jQuery(div).fadeIn();
                    var startposition = (blast_start - getBegin()) * parseFloat(maxLen_temp) / (getEnd() - getBegin()) + parseFloat(maxLen_temp) / 2;
                    var stopposition = (blast_stop - blast_start) * parseFloat(maxLen_temp) / (getEnd() - getBegin());
                    if (stopposition < 2) {
                        stopposition = 2;
                    }
                    track_html += "<div class='tracks_image' STYLE=\"position:absolute;  TOP:" + top + "px; " +
                        "LEFT:" + startposition + "px \" " +
                        "onclick=trackClick(\"" + track + "\",\"" + i + "\"); > " +
                        "<img class='tracks_image' id=\"" + track + blast_start + ":" + blast_stop + "\" " +
                        "STYLE=\"WIDTH:" + stopposition + "px; height: 10px; border:" + border + "px solid black; cursor: pointer  \" " +
                        "src=\"" + image + "\" alt=" + startposition + "-" + stopposition + "  " +
                        "title=" + track + ":" + blast_start + "-" + blast_stop + ",Score:" + score + " > <br> </div>";
                    track_html = track_html.replace("undefined", "");
                    track_html += dispBLASTindel(i, blast_start);
                }
            }
            if (jQuery('input[name=' + track + 'mergedCheckbox]').is(':checked')) {
                jQuery(div).fadeOut();
                jQuery(div).html();
                jQuery("#mergedtrack").css('height', (parseInt(layers * 15) + parseInt(50)));
                jQuery("#mergedtrack").append(track_html);
                jQuery("#mergedtrack").fadeIn();
            }
            else {
                jQuery(div).css('height', (parseInt(layers * 15) + parseInt(50)));
                jQuery(div).fadeIn();
                jQuery("#blasttrack_wrapper").fadeIn();
                if (layers == 1) {
                    track_html = track_html.replace(/tracks_image/g, 'merged_tracks_image')
                }
                jQuery(div).html(track_html);
            }
        }
        else {
            alert(track + " not Found");
            jQuery('#' + track + 'Checkbox').attr('checked', false);
            jQuery(div).html();
            jQuery(div).fadeOut();
        }
    }
}

function dispBLASTindel(j, blast_start) {

    var blastindel = window["blasttrack"][j].indels;
    if (blastindel.length > 0) {
        var track_html = "";
        var layers = window["blasttrack"].length + 1;
        var maxLen_temp = jQuery("#canvas").css("width");

        for (var i = 0; i < blastindel.length; i++) {
            var indel_start = parseInt(blastindel[i].position) + parseInt(blast_start) - 1;
            var indel_stop = (parseInt(indel_start) + 1);
            var partial = (getEnd() - getBegin()) / 2;
            var start = getBegin() - partial;

            var end = parseInt(getEnd()) + parseInt(partial);
            var show = showObject(start, end, indel_start, indel_stop);

            var image = "./images/browser/indel.png";

            if (show) {
                var top = ((j + 1) % layers) * 15 + 10;
                var startposition = (indel_start - getBegin()) * parseFloat(maxLen_temp) / (getEnd() - getBegin()) + parseFloat(maxLen_temp) / 2;
                var stopposition = (indel_stop - indel_start) * parseFloat(maxLen_temp) / (getEnd() - getBegin());
                track_html += "<div class='tracks_image' onclick=indelClick(\"" + blastindel[i].query + "\",\"" + blastindel[i].hit + "\"); " +
                    "STYLE=\"position:absolute; z-index: 999; TOP:" + top + "px; LEFT:" + startposition + "px \"> " +
                    "<img class='tracks_image' \" STYLE=\"WIDTH:" + stopposition + "px; height: 10px; cursor: pointer \" " +
                    "src=\"" + image + "\" alt=" + startposition + "-" + stopposition + " title= \"indel at " + indel_start + " \" ></div>";
                track_html = track_html.replace("undefined", "");
            }
        }
        return track_html;
    }
    else {
    }
}






function dispTrack(div, trackName, className) {
    var svgdiv = jQuery(div).svg('get');

    var labelclass = "label" + trackName;
    var modi_style;
    var labeltoogle = "display : in-line;";
    var trackId;
    var trackClass, label;
    var track_html = [];

    if (window['track_list' + trackName].id.toString().indexOf('cs') > -1) {
        coord = true;
    }
    else {
        coord = false;
    }


    var j = 0;
    if (trackName.toLowerCase().indexOf("contig") >= 0) {
        trackClass = "contigs track";
    }
    else if (trackName.toLowerCase().indexOf("est") >= 0) {
        trackClass = "est track";
    }
    else if (trackName.toLowerCase().indexOf("clone") >= 0) {
        trackClass = "clone track";
    }
    else if (trackName.toLowerCase().indexOf("align") >= 0) {
        trackClass = "align track";
    }
    else if (trackName.toLowerCase().indexOf("sam") >= 0 || trackName.toLowerCase().indexOf("bam") >= 0) {
        trackClass = "sam track";
    }
    else if (trackName.toLowerCase().indexOf("repeat") >= 0) {
        trackClass = "repeat track";
    }
    else {
        trackClass = "unknown track";
    }

    if (window['track_list' + trackName].label == 0) {
        labeltoogle = "display : none;";
    }


    jQuery("#track_div").fadeIn();
    jQuery("#track_wrapper").fadeIn();


    if (!window[trackName] || window[trackName] == "loading") {
        jQuery("#track_div").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
        jQuery("#track_div").fadeIn();

        jQuery("#track_wrapper").fadeIn();
    }
    else if (window[trackName][0] == "getHit no result found") {
        jQuery('#' + trackName + 'Checkbox').attr('checked', false);
        jQuery("#track_div").html();

        jQuery("#track_div").fadeOut();
        jQuery("#track_wrapper").fadeOut();
    }
    else {
        var partial = (getEnd() - getBegin()) / 2;
        var start = getBegin() - partial;
        var end = parseInt(getEnd()) + parseInt(partial);
        var diff = getEnd() - getBegin();
        var newStart_temp = getBegin();
        var newEnd_temp = getEnd();
        var maxLen_temp = jQuery("#canvas").css("width");
        svgClear();
        var track = window[trackName];

        if (track[0] == null) {
            track_html = [];
            track_html.push("<font size=4><center>No data available for selected region</center></font>");
            jQuery("#track_div").html(track_html.join(""));

        }
        else if (track.length > 0 && (track.length < 10000 || diff <= minWidth)) {
            track_html = [];
            jQuery("#track_div").html(track_html.join(""));

            var coord;

            var track_len = track.length;
            while (track_len--) {

                var strand = track[track_len].dnafrag_strand;

                var spanclass = "ui-icon ui-icon-carat-1-e";

                if (strand == -1 || strand == false) {
                    spanclass = "ui-icon ui-icon-carat-1-w";
                }

                var track_start = track[track_len].start;
                var track_stop = track[track_len].end ? track[track_len].end : parseInt(track[track_len].start) + 1;

                var border = "";
                if (track[track_len].flag) {
                    border = "border: 1px solid black;";
                }
                var track_desc = track[track_len].dnafrag_score;
                var top;
                top = ((track_len) % (layers) + 1) * 20 + 15;


                var startposition = (track_start - newStart_temp) * parseFloat(maxLen_temp) / (newEnd_temp - newStart_temp);
                var stopposition = (track_stop - track_start + 1) * parseFloat(maxLen_temp) / (newEnd_temp - newStart_temp);

                if (stopposition < 2) {
                    stopposition = 2;
                }
                label = track_desc + ":" + track_start + "-" + track_stop;

                jQuery("<div>").attr({
                    'id': trackName + "" + track_len,
                    'class': trackClass + " " + className,
                    'style': "TOP:" + top + "px; LEFT:" + (startposition) + "px; width:" + (stopposition) + "px;",
                    'title': label,
                    'onClick': "trackClick(\"" + trackName + "\",\"" + track_len + "\")",
                    'onmouseOver': "trackmouseover(\"" + track[track_len].child + "\",\"" + trackName + "\",\"" + track_len + "\")"
                }).appendTo("#track_div");

                var child_track = track[track_len].child;

                var align_length = child_track.length;
                var refs = [];

                while (align_length--) {
                    var align_track_start = child_track[align_length].start;
                    var align_track_stop = child_track[align_length].end;
                    var id = child_track[align_length].ref_id;
                    if (jQuery.inArray(id, refs) >= 0) {
                    }
                    else {
                        refs.push(id);
                    }

                    var length = child_track[align_length].length;
                    var startposition = (align_track_start - newStart_temp) * parseFloat(maxLen_temp) / (length);
                    var stopposition = (align_track_stop - align_track_start + 1) * parseFloat(maxLen_temp) / (length);

                    top = (jQuery.inArray(id, refs) + 1) * 20 + 15;

                    jQuery("<div>").attr({
                        'id': child_track[align_length].id + "" + align_length,
                        'class': trackClass + " " + className,
                        'style': "TOP:" + top + "px; LEFT:" + (startposition) + "px; width:" + (stopposition) + "px;",
                        'title': label
                    }).appendTo("#track_div");

//                    if(child_track[align_length].cigarline){
//                        dispCigarLine(child_track[align_length].cigarline, startposition, top);
//                    }
                }


                jQuery("<div>").attr({
                    'class': "tracklabel " + labelclass,
                    'style': labeltoogle + " z-index: 999; overflow: hidden;text-overflow: ellipsis;",
                    'title': label

                }).html(label).appendTo("#" + trackName + "" + track_len);

                if (stopposition > 10) {
                    jQuery("<span>").attr({
                        'class': spanclass,
                        'style': "cursor:pointer; position:absolute; TOP:" + (top - 6) + "px; left:" + (parseInt(startposition) + parseInt(stopposition / 2) - 8) + "px; opacity:0.6; "
                    }).appendTo("#" + trackName + "" + track_len);
                }

                if (track[track_len].cigars && stopposition > 50) {
                    jQuery(dispCigar(track[track_len].cigars, track[track_len].start, top)).appendTo(div);
                }
                else if (track[track_len].cigarline && stopposition > 50) {
                    jQuery(dispCigarLine(track[track_len].cigarline, track[track_len].start, top)).appendTo(div);
                }
            }


        }
        else if (track.length >= 10000) {
            dispGraph(div, trackName, trackId)
        }
    }
}
function dispCigarLine(cigars, start, top) {
    var track_html = "";
    var trackClass = "";
    var newStart_temp = getBegin();
    var newEnd_temp = getEnd();
    var maxLentemp = jQuery("#canvas").css("width");


    var cigar_pos = start;
    var startposition;
    var stopposition;
    if (cigars != '*') {
        cigars = cigars.replace(/([SIXMND])/g, ":$1,");
        var cigars_array = cigars.split(',');
        for (var i = 0; i < cigars_array.length - 1; i++) {
            var cigar = cigars_array[i].split(":");

            var key = cigar[1];
            var length = cigar[0];
            if (key == "M") {
                cigar_pos = parseInt(cigar_pos) + parseInt(length);
            }
            else if (key == "I") {
                trackClass = "insert";
                startposition = (cigar_pos - newStart_temp) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp) + parseFloat(maxLentemp) / 2;
                stopposition = (length) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
                track_html += trackHTML(startposition, stopposition, top, trackClass);
                cigar_pos = parseInt(cigar_pos) + parseInt(length)
            }
            else if (key == "D") {
                p
                trackClass = "delete";
                startposition = (cigar_pos - newStart_temp) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp) + parseFloat(maxLentemp) / 2;
                stopposition = 1
                track_html += trackHTML(startposition, stopposition, top, trackClass);
            }

            else if (key == "X") {
                trackClass = "mismatch";
                startposition = (cigar_pos - newStart_temp) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp) + parseFloat(maxLentemp) / 2;
                stopposition = (length) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
                track_html += trackHTML(startposition, stopposition, top, trackClass);
                cigar_pos = parseInt(cigar_pos) + parseInt(length)
            }
            else if (key == "=") {
                cigar_pos = parseInt(cigar_pos) + parseInt(length)
            }
        }
    }

    function trackHTML(startposition, stopposition, top, trackClass) {
        var track_html_local;

        track_html_local = "<div class='" + trackClass + "'  " +
            "STYLE=\"height: 5px; z-index: 100; TOP:" + top + "px; LEFT:" + startposition + "px; " +
            "width:" + (stopposition) + "px \" > </div>";

        return track_html_local;
    }

    return track_html;
}
function dispCigar(cigars, start, top) {
    var track_html = "";
    var trackClass = "";
    var newStart_temp = getBegin();
    var newEnd_temp = getEnd();
    var maxLentemp = jQuery("#canvas").css("width");

    for (var key in cigars) {
        if (key == "M") {
            trackClass = "match";
        }
        else if (key == "I") {
            trackClass = "insert";
        }
        else if (key == "D") {
            trackClass = "delete";
        }
        else if (key == "D") {
            trackClass = "skip";
        }
        else if (key == "X") {
            trackClass = "mismatch";
        }
        else if (key == "=") {
            trackClass = "match";
        }
        var cigar = cigars[key].split(",");
        for (var i = 0; i < cigar.length; i++) {
            var cigar_start = parseInt(cigar[i].split(":")[0]) + parseInt(start);
            var cigar_stop = cigar[i].split(":")[1];
            var startposition = (cigar_start - newStart_temp) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp) + parseFloat(maxLentemp) / 2;


            var stopposition;
            if (key == "M" || key == "I" || key == "X" || key == "=") {
                stopposition = (cigar_stop) * parseFloat(maxLentemp) / (newEnd_temp - newStart_temp);
            }
            else {
                stopposition = 1;
            }
            track_html += "<div class='" + trackClass + "'  " +
                "STYLE=\"height: 5px; z-index: 100; TOP:" + top + "px; LEFT:" + startposition + "px; " +
                "width:" + (stopposition) + "px \" > </div>";
        }

    }
    return track_html;
}


function dispGraph(div, trackName, className) {
    var track_html = "";

    jQuery(div).fadeIn();
    jQuery("#" + track + "_wrapper").fadeIn();
    jQuery(div).html("")

    if (!window[trackName] || window[trackName] == "loading") {

        jQuery(div).html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
        jQuery(div).fadeIn();
        jQuery("#" + trackName + "_wrapper").fadeIn();

    }
    else {

        var track = window[trackName];
        var partial = (parseInt(getEnd()) - parseInt(getBegin())) / 2;
        var start = parseInt(getBegin()) - parseInt(partial)
        var end = parseInt(getEnd()) + parseInt(partial);
        var maxLen_temp = jQuery("#canvas").css("width");

        var newStart_temp = getBegin();
        var newEnd_temp = getEnd();

        if (track[0]) {
            track = jQuery.grep(track, function (element, index) {
                return element.start >= start && element.start <= end; // retain appropriate elements
            });
        }


        var total = 0;
        var max = Math.max.apply(Math, track.map(function (o) {
            return o.graph;
        }));

        var track_len = track.length;

        while (track_len--) {

            var track_start = track[track_len].start;
            var track_stop = track[track_len].end;
            var startposition = (track_start - newStart_temp) * parseFloat(maxLen_temp) / (newEnd_temp - newStart_temp) + parseFloat(maxLen_temp) / 2;
            var stopposition = (track_stop - track_start ) * parseFloat(maxLen_temp) / (newEnd_temp - newStart_temp);

            jQuery("<div>").attr({
                'id': trackName + "" + track_len,
                'class': "graph " + className + "_graph",
                'style': "bottom:0px; height: " + (track[track_len].graph * 45 / max) + "px; LEFT:" + startposition + "px; width:" + (stopposition - 1) + "px",
                'title': track_start + ":" + track_stop + "->" + track[track_len].graph,
                'onClick': "setBegin(" + track[track_len].start + ");setEnd(" + track[track_len].end + ");jumpToSeq();"
            }).appendTo(div);

//            track_html += "<div class= \"graph " + className + "_graph\" onclick=\"setBegin(" + track[track_len].start + ");setEnd(" + track[track_len].end + ");jumpToSeq();\"STYLE=\"bottom:0px; height: " + (track[track_len].graph * 45 / max) + "px;" +
//                "LEFT:" + startposition + "px;" +
//                "width:" + (stopposition - 1) + "px \" title=\"" + track_start + ":" + track_stop + "->" + track[track_len].graph + "\" ></div>";

        }
//  jQuery(div).css('height', '70px');
//        jQuery(div).fadeIn();
//        jQuery("#" + trackName + "_wrapper").fadeIn();
//
//        jQuery(div).html(track_html);
    }
}

function dispGraphBed(div, trackName, trackId, className) {
    var track_html = "";

    if (!window[trackName] || window[trackName] == "loading") {
        jQuery(div).html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
        jQuery(div).fadeIn();
        jQuery("#" + trackName + "_wrapper").fadeIn();

    }
    else {
        var track = window[trackName];
        var partial = (parseInt(getEnd()) - parseInt(getBegin())) / 2;
        var start = parseInt(getBegin()) - parseInt(partial)
        var end = parseInt(getEnd()) + parseInt(partial);
        var maxLen_temp = jQuery("#canvas").css("width");

        var newStart_temp = getBegin();
        var newEnd_temp = getEnd();

        if (track[0]) {
            track = jQuery.grep(track, function (element, index) {
                return element.start >= start && element.start <= end; // retain appropriate elements
            });
        }


        var total = 0;
        var max = Math.max.apply(Math, track.map(function (o) {
            return o.value;
        }));

        var track_len = track.length;

        while (track_len--) {
            var track_start = track[track_len].start;
            var track_stop = track[track_len].end;

            var startposition = (track_start - newStart_temp) * parseFloat(maxLen_temp) / (newEnd_temp - newStart_temp) + parseFloat(maxLen_temp) / 2;
            var stopposition = (track_stop - track_start ) * parseFloat(maxLen_temp) / (newEnd_temp - newStart_temp);

            track_html += "<div class= \"graph " + className + "graph\" onclick=\"setBegin(" + track[track_len].start + ");setEnd(" + track[track_len].end + ");jumpToSeq();\"STYLE=\"bottom:0px; height: " + (track[track_len].value * 45 / max) + "px;" +
                "LEFT:" + startposition + "px;" +
                "width:" + (stopposition - 1) + "px \" title=\"" + track_start + ":" + track_stop + "->" + track[track_len].value + "\" ></div>";

        }
//  jQuery(div).css('height', '70px');
        jQuery(div).fadeIn();
        jQuery("#" + trackName + "_wrapper").fadeIn();

        jQuery(div).html(track_html);
    }
}

function dispGraphWig(div, trackName, trackId, className) {

    var track_html = "";

    jQuery(div).html("");//<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    jQuery(div).fadeIn();
    jQuery(trackName + "_wrapper").fadeIn();

    var track = window[trackName];

    var partial = (parseInt(getEnd()) - parseInt(getBegin())) / 2;
    var start = parseInt(getBegin()) - parseInt(partial)
    var end = parseInt(getEnd()) + parseInt(partial);

    if (track) {
        if (track[0] == null) {
            track_html = [];
            track_html.push("<font size=4><center>No data available for selected region</center></font>");
        }
        else if (track[0]) {
            track = jQuery.grep(track, function (element, index) {
                return element.start >= start && element.start <= end; // retain appropriate elements
            });
        }


        var total = 0;
        var max = Math.max.apply(Math, track.map(function (o) {
            return o.value;
        }));

        var width = jQuery("#wrapper").width(),
            height = 80;


        var left = 0;
        if (start < 0) {
            left = (1 - start) * parseInt(width) / end * 3 / 4;
        }

        var top = 20;

        var svg = d3.select(div).append("svg")
            .attr("width", width)
            .attr("height", height + 20)
            .append("g")
            .attr("transform", "translate(" + left + "," + top + ")");

        var d3line2 = d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .interpolate("linear");

        d3.json(track, function () {
            data = track;
            var length = data.length - 1;
            var end_val = parseInt(data[length].start) + parseInt(data[1].start - data[0].start);
            var start_val = parseInt(data[0].start) - (parseInt(data[1].start - data[0].start));

            data.splice(0, 0, {start: start_val, value: '0'});

            data.splice(data.length, 0, {start: end_val, value: '0'});
            var space = parseInt(width) / (end - start);

            var pathinfo = [];

            var last_start = 0;
            var diff = parseInt(data[1].start - data[0].start);

            for (var i = 0; i < data.length - 1;) {
                var tempx;
                if (start > 0) {
                    tempx = (data[i].start - start) * space;
                }
                else {
                    tempx = (data[i].start) * space;
                }
                var tempy = height - (data[i].value * height / max); //(parseInt(max)*(41-parseInt(patharray[i]))/41);
                pathinfo.push({ x: tempx, y: tempy});


//        if (data.length < 400) {
                i++;
//        }
//        else {
//          i = parseInt(i + (data.length / 400));
//        }

                if (last_start < data[i].start - diff) {
                    if (start > 0) {
                        tempx = ((parseInt(last_start) + parseInt(diff)) - start) * space;
                    }
                    else {
                        tempx = ((parseInt(last_start) + parseInt(diff))) * space;
                    }
                    var tempy = height; //(parseInt(max)*(41-parseInt(patharray[i]))/41);
                    pathinfo.push({ x: tempx, y: tempy});

                    if (start > 0) {
                        tempx = ((parseInt(data[i].start) - parseInt(diff)) - start) * space;
                    }
                    else {
                        tempx = ((parseInt(data[i].start) - parseInt(diff))) * space;
                    }
                    var tempy = height; //(parseInt(max)*(41-parseInt(patharray[i]))/41);
                    pathinfo.push({ x: tempx, y: tempy});

                }

                last_start = data[i].start;
            }


            if (start > 0) {
                tempx = (data[data.length - 1].start - start) * space;
            }
            else {
                tempx = (data[data.length - 1].start) * space;
            }
            var tempy = height - (data[data.length - 1].value * height / max); //(parseInt(max)*(41-parseInt(patharray[i]))/41);
            pathinfo.push({ x: tempx, y: tempy});
            var path = svg.selectAll("path")
                .data([1]);

            path.enter().append("svg:path")
                .attr("width", 200)
                .attr("height", 200)
                .attr("class", "path")

                .attr('stroke', function () {
                    return "blue";
                })
                .attr('stroke-width', function () {
                    return "2px";
                })
                .attr("fill", function () {
                    return "lightblue";
                })
                .attr("d", d3line2(pathinfo));
        });

    }
    else {
        jQuery(div).html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    }

    jQuery(div).css('height', '70px');
    jQuery(div).fadeIn();
    jQuery("#" + trackName + "_wrapper").fadeIn();
//
    // jQuery(div).html(track_html);
}

function sortResults(prop, asc, array) {
    array = array.sort(function (a, b) {
        if (asc) return (a[prop] > b[prop]);
        else return (b[prop] > a[prop]);
    });
    return array;
}