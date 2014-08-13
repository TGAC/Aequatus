/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 26/06/2014
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */
function dispCigarLine(cigars, start, top, max, gene_start, stop, exons, temp_div, ref_exons, transcript_start, transcript_end, strand, ref_cigar, ref_strand, id) {


    var member_id = jQuery(temp_div).attr('id');


    exons = jQuery.parseJSON(exons);

    exons.sort(sort_by('start', true, parseInt));

    var track_html = "";
    var trackClass = "";
    var newStart_temp = transcript_start;
    var newEnd_temp = transcript_end;
    var maxLentemp = stop;
    var exon_number = 0;
    var ref_exon_number = 0;

    var cigar_pos = (transcript_start - gene_start) + 1;

    var temp_start = 1;

    for(var e=0; e<exons.length; e++){
        if(exons[e].end > transcript_start){
            cigar_pos = (transcript_start - exons[e].start) + 1;
            temp_start = (exons[e].start - gene_start) + 1;
            exon_number = e
            break;
        }
    }


    var temp_end = (exons[exon_number].end - gene_start) + 1;

    if (temp_end < cigar_pos) {
        while (temp_end < cigar_pos) {
            exon_number++;
            temp_end = (exons[exon_number].end - gene_start) + 1;
        }
    }

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
                    if (parseInt(cigar_pos) + parseInt(length) <= (temp_end - temp_start)) {
                        temp_div = "#exon" + id + "" + exons[exon_number].id

                        trackHTML(startposition, stopposition, top, trackClass, temp_div, temp_colours[i], length, i);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)


                    } else {
                        var bool = true;

                        second: while (bool) {

                            stopposition = parseFloat(((temp_end - temp_start) - cigar_pos) * parseFloat(maxLentemp) / (max));
                            temp_div = "#exon" + id + "" + exons[exon_number].id

                            trackHTML(startposition, stopposition, top, trackClass, temp_div, temp_colours[i], (temp_end - cigar_pos), i);

                            length = length - ((temp_end - temp_start) - cigar_pos);

                            exon_number++;


                            if (exon_number >= no_of_exons) {
                                break first;
                            }


                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = (exons[exon_number].end - gene_start) + 1;

                            cigar_pos = 0;

                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));

                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < (temp_end - temp_start)) {
                                temp_div = "#exon" + id + "" + exons[exon_number].id

                                trackHTML(startposition, stopposition, top, trackClass, temp_div, temp_colours[i], length, i);
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
                    startposition = parseInt((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = 15;
                    temp_div = "#exon" + id + "" + exons[exon_number].id

                    trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, temp_colours[i], length);

                }
                else if (key == "_" && length > 0) {
                    trackClass = "insert";

                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                    if (parseInt(cigar_pos) + parseInt(length) <= (temp_end - temp_start)) {

                        temp_div = "#exon" + id + "" + exons[exon_number].id
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", length);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)

                    } else {


                        var bool = true;

                        third: while (bool) {

                            stopposition = parseFloat(((temp_end - temp_start) - cigar_pos) * parseFloat(maxLentemp) / (max));
                            temp_div = "#exon" + id + "" + exons[exon_number].id

                            trackHTML(startposition, stopposition, top, trackClass, temp_div, "black", (temp_end - cigar_pos));


//                            var diff = (temp_end - cigar_pos);
                            length = length - ((temp_end - temp_start) - cigar_pos);


                            exon_number++;

                            if (exon_number >= no_of_exons) {
                                break first;
                            }
                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = (exons[exon_number].end - gene_start) + 1;


                            cigar_pos = 0;//temp_start;
                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < (temp_end - temp_start)) {

                                temp_div = "#exon" + id + "" + exons[exon_number].id

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
            "STYLE=\"height: 10px; z-index: 1999; TOP:-5px; LEFT:" + startposition + "px; margin-left: -7px;" +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }

    function trackHTML(startposition, stopposition, top, trackClass, temp_div, colour, title, i) {

        if(member_id == "id1306886"){
            console.log(temp_div)
            console.log(member_id)
            console.log(startposition)
        }

        var track_html_local;

        track_html_local = "<div onmouseover=onMouseOver('"+colour+"') onmouseout=onMouseOut('"+colour+"')  class='" + trackClass + " exon_"+i+"'" +
            "STYLE=\"height: 10px; z-index: 1999; TOP:0px; LEFT:" + startposition + "px; opacity:0.7; background-color:" + colour + "; " +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }
}

function dispCigarLineRef(cigars, start, top, max, gene_start, stop, exons, temp_div, ref_exons, transcript_start, transcript_end, id) {
    exons = jQuery.parseJSON(exons);
    ref_exons = jQuery.parseJSON(ref_exons)
    exons.sort(sort_by('start', true, parseInt));

    var track_html = "";
    var trackClass = "";
    var newStart_temp = transcript_start;
    var newEnd_temp = transcript_end;
    var maxLentemp = stop;

    var exon_number = 0;
    var ref_exon_number = 0;

    var cigar_pos = (transcript_start - gene_start) + 1;
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

                if (parseInt(cigar_pos) + parseInt(length) <= (temp_end - temp_start)) {
                    temp_div = "#exon" + id + "" + exons[exon_number].id
                    trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[exon_number], length, exon_number);
                    cigar_pos = parseInt(cigar_pos) + parseInt(length)
                } else {

                    var bool = true;

                    second: while (bool) {

                        stopposition = parseFloat(((temp_end - temp_start) - cigar_pos) * parseFloat(maxLentemp) / (max));

                        temp_div = "#exon" + id + "" + exons[exon_number].id
                        trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[exon_number], temp_end - cigar_pos, exon_number);

                        length = length - ((temp_end - temp_start) - cigar_pos);

                        exon_number++;

                        if (exon_number >= no_of_exons) {
                            break second;
                            continue first;
                        }

                        temp_start = exons[exon_number].start - gene_start;
                        temp_end = (exons[exon_number].end - gene_start) + 1;

                        cigar_pos = 0;//temp_start;

                        startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                        stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                        if (parseInt(cigar_pos) + parseInt(length) <= (temp_end - temp_start)) {
                            temp_div = "#exon" + id + "" + exons[exon_number].id

                            trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[exon_number], length, exon_number);
                            cigar_pos = parseInt(cigar_pos) + parseInt(length)
                            bool = false;
                        }
                        else {

                        }

                    }
                }
            }
            else if (key == "D") {

                trackClass = "delete ui-icon ui-icon-carat-1-s";

                trackClass = "delete ui-icon ui-icon-carat-1-s";

                startposition = parseInt((cigar_pos) * parseFloat(maxLentemp) / (max));

                stopposition = 15;

                temp_div = "#exon" + id + "" + exons[exon_number].id
                trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colours[exon_number], length);
            }
        }
    }

    function trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colour, title) {
        var track_html_local;

        track_html_local = "<div class='" + trackClass + "' " +
            "STYLE=\"height: 10px; z-index: 1999; TOP:-5px; LEFT:" + startposition + "px; margin-left: -7px;" +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }

    function trackHTML(startposition, stopposition, top, trackClass, temp_div, colour, title, i) {
        var track_html_local;

        track_html_local = "<div onmouseover=onMouseOver('"+colour+"') onmouseout=onMouseOut('"+colour+"') class='" + trackClass + " exon_"+i+"' " +
            "STYLE=\"position: absolute; height: 10px; z-index: 1999; TOP:0px; LEFT:" + startposition + "px; opacity:0.7; background-color:" + colour + "; " +
            "width:" + (stopposition) + "px \" title=" + title + "> </div>";
        jQuery(temp_div).append(track_html_local);
    }
}

function onMouseOver(i){
    jQuery(".insert").css({ opacity: 0.2 })
    jQuery(".match").css({ opacity: 0.2})
//    jQuery(".exon_"+i).css({ opacity: 1 })
    jQuery('.match').filter(function() {
        var colour = jQuery(this).css('backgroundColor').replace(/\s+/g,"");

        if(colour == i){
            return 1;
        }
    }).css('opacity', 0.7);

}

function onMouseOut(i){
    jQuery(".match").css({ opacity: 0.7 })
    jQuery(".insert").css({ opacity: 0.7 })
}
