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