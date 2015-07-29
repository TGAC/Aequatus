/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 26/06/2014
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */
function dispCigarLine(g, cigars, start, top, max, gene_start, stop, exons, temp_div, ref_exons, transcript_start, transcript_end, strand, ref_cigar, ref_strand, id, div) {
    exons = jQuery.parseJSON(exons);

    exons.sort(sort_by('start', true, parseInt));

    var trackClass = "";
    var maxLentemp = stop;
    var exon_number = 0;
    var ref_exon_number = 0;

    max = exons[exon_number].length
    maxLentemp = parseInt(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width'));


    var cigar_pos = (transcript_start - gene_start);

    var temp_start = 1;

    for (var e = 0; e < exons.length; e++) {
        if (exons[e].end > transcript_start) {
            cigar_pos = (transcript_start - exons[e].start);
            temp_start = (exons[e].start - gene_start);
            exon_number = e
            max = exons[exon_number].length
            maxLentemp = parseInt(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width'));
            break;
        }
    }


    var temp_end = (exons[exon_number].end - gene_start);

    if (temp_end < cigar_pos) {
        while (temp_end < cigar_pos) {
            exon_number++;

            max = exons[exon_number].length
            maxLentemp = jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width');

            temp_end = (exons[exon_number].end - gene_start);
        }
    }

    var startposition = null;
    var stopposition;
    var no_of_exons = exons.length;
    var cigar_string = "";

    if (cigars != '*') {
        cigars += 'M'
        ref_cigar += 'M';
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
        cigar_string = cigar_string.replace(/(I)/g, "");

        cigar_string = cigar_string.replace(/(MD)/g, "M,D");
        cigar_string = cigar_string.replace(/(DM)/g, "D,M");
        cigar_string = cigar_string.replace(/(D_)/g, "D,_");
        cigar_string = cigar_string.replace(/(_M)/g, "_,M");
        cigar_string = cigar_string.replace(/(M_)/g, "M,_");
        cigar_string = cigar_string.replace(/(_D)/g, "_,D");

        cigar_string = cigar_string.replace(/(MI)/g, "M,I");
        cigar_string = cigar_string.replace(/(IM)/g, "I,M");
        cigar_string = cigar_string.replace(/(DI)/g, "D,I");
        cigar_string = cigar_string.replace(/(ID)/g, "I,D");
        cigar_string = cigar_string.replace(/(I_)/g, "I,_");
        cigar_string = cigar_string.replace(/(_I)/g, "_,I");

        var k = 0;
        var l = 0;

        var cigars_array = cigar_string.split('-');


        first: for (var i = 0; i < cigars_array.length; i++) {


            var cigars_second_array = cigars_array[i].split(",");
            for (var j = 0; j < cigars_second_array.length; j++) {

                var key = cigars_second_array[j].charAt(0);
                var length = cigars_second_array[j].length;


                if (key == "M" && length > 0) {


                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));


                    trackClass = "match";
                    if ((parseInt(cigar_pos) + parseInt(length)) <= max) {
                  repeat = true
                        startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))

                        trackHTML(startposition, stopposition, top, trackClass+" 1", temp_div, temp_colours[i], length, i);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)
                    } else {
                        var bool = true;

                        second: while (bool) {
                            stopposition = parseFloat(((max) - cigar_pos) * parseFloat(maxLentemp) / (max));
                            startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))

                            trackHTML(startposition, stopposition, top, trackClass+" 2", temp_div, temp_colours[i], (temp_end - cigar_pos), i);
                            length = length - ((max) - cigar_pos);
                            exon_number++;

                            if (exon_number >= no_of_exons) {
                                break first;
                            }

                            max = exons[exon_number].length
                            maxLentemp = jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width');

                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = (exons[exon_number].end - gene_start) + 1;

                            cigar_pos = 0;

                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));

                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if ((parseInt(cigar_pos) + parseInt(length)) <= max) {
                                startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))


                                trackHTML(startposition, stopposition, top, trackClass+" 3", temp_div, temp_colours[i], length, i);
                                cigar_pos = parseInt(cigar_pos) + parseInt(length)
                                bool = false;
                            }
                            else {
                                //trackClass += " elselse"
                            }

                        }
                    }
                }
                else if (key == "D" && length > 0) {

                    trackClass = "delete ui-icon ui-icon-carat-1-s";
                    startposition = parseInt((cigar_pos) * parseFloat(maxLentemp) / (max));
                    startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))
                    stopposition = 15;

                    trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, temp_colours[i], length);

                }
                else if (key == "_" && length > 0) {
                    trackClass = "insert";

                    startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                    stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                    if (parseInt(cigar_pos) + parseInt(length) <= (temp_end - temp_start)) {
                        startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))

                        trackHTML(startposition, stopposition, top, trackClass+" 1", temp_div, "black", length);
                        cigar_pos = parseInt(cigar_pos) + parseInt(length)

                    } else {


                        var bool = true;

                        third: while (bool) {

                            stopposition = parseFloat(((temp_end - temp_start) - cigar_pos) * parseFloat(maxLentemp) / (max));
                            //temp_div = "#exon" + id + "" + exons[exon_number].id+""+div

                            startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))
                            trackHTML(startposition, stopposition, top, trackClass+" 2", temp_div, "black", (temp_end - cigar_pos));

                            length = length - ((temp_end - temp_start) - cigar_pos);

                            exon_number++;

                            if (exon_number >= no_of_exons) {
                                break first;
                            }

                            max = exons[exon_number].length
                            maxLentemp = jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width');


                            temp_start = exons[exon_number].start - gene_start;
                            temp_end = (exons[exon_number].end - gene_start) + 1;


                            cigar_pos = 0;//temp_start;
                            startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (max));
                            stopposition = parseFloat((length) * parseFloat(maxLentemp) / (max));

                            if (parseInt(cigar_pos) + parseInt(length) < (temp_end - temp_start)) {

                                startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))
                                trackHTML(startposition, stopposition, top, trackClass+" 3", temp_div, "black", length);
                                cigar_pos = parseInt(cigar_pos) + parseInt(length)
                                bool = false;
                            }
                            else {
                                //trackClass += " elselse"
                            }
                        }
                    }

                }
                else if (key == "I" && length > 0) {
                }
                else {
                }
            }

            l = l + (cigars_second_array.length - 1);
        }

    }

    function trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colour, title) {

        temp_div.text(g, startposition, 7, '\'');
    }

    function trackHTML(startposition, stopposition, top, trackClass, temp_div, colour, title, i) {
        temp_div.rect(g, startposition, 1, stopposition, 10, 1, 1, {
            fill: colour,
            'class': trackClass,
            onmouseover: 'onMouseOver("' + colour + '")',
            onmouseout: 'onMouseOut("' + colour + '")'
        });
    }
}

function dispCigarLineRef(g, cigars, start, top, max, gene_start, stop, exons, temp_div, ref_exons, transcript_start, transcript_end, id, div) {
    exons = jQuery.parseJSON(exons);
    ref_exons = jQuery.parseJSON(ref_exons)
    exons.sort(sort_by('start', true, parseInt));

    var track_html = "";
    var trackClass = "";
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

    max = exons[exon_number].length
    maxLentemp = parseInt(jQuery(div + " #exon" + id + "" + exons[exon_number].id).attr('width'));

    for (var e = 0; e < exons.length; e++) {
        if (exons[e].end > transcript_start) {
            cigar_pos = (transcript_start - exons[e].start);
            temp_start = (exons[e].start - gene_start);
            exon_number = e
            max = exons[exon_number].length
            maxLentemp = parseInt(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width'));
            break;
        }
    }


    var temp_end = (exons[exon_number].end - gene_start) + 1;

    if (temp_end < cigar_pos) {
        while (temp_end < cigar_pos) {
            exon_number++;

            max = exons[exon_number].length
            maxLentemp = jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width');

            temp_end = (exons[exon_number].end - gene_start);
        }
    }
    var colour_i = 0
    if (cigars != '*') {

        cigars += 'M'

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
        cigar_string = checkCigar(cigar_string);

        cigar_string = cigar_string.replace(/(I)/g, "");
        cigar_string = cigar_string.replace(/(MD)/g, "M,D");
        cigar_string = cigar_string.replace(/(DM)/g, "D,M");
        cigar_string = cigar_string.replace(/(MI)/g, "M,I");
        cigar_string = cigar_string.replace(/(IM)/g, "I,M");
        cigar_string = cigar_string.replace(/(DI)/g, "D,I");
        cigar_string = cigar_string.replace(/(IM)/g, "I,M");
        cigar_string = cigar_string.replace(/(MI)/g, "M,I");
        cigar_string = cigar_string.replace(/(ID)/g, "I,D");


        var k = 0;
        var cigars_array = cigar_string.split(',');

        first: for (var i = 0; i < cigars_array.length; i++) {

            var key = cigars_array[i].charAt(0);
            var length = cigars_array[i].length;


            if (key == "M") {
                trackClass = "match";

                startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (temp_end - temp_start));
                stopposition = parseFloat((length) * parseFloat(maxLentemp) / (temp_end - temp_start));


                if (parseInt(cigar_pos) + parseInt(length) <= (temp_end - temp_start)) {
                    startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))

                    trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[colour_i], length, exon_number);
                    cigar_pos = parseInt(cigar_pos) + parseInt(length)
                } else {

                    var bool = true;

                    second: while (bool) {


                        stopposition = parseFloat(((temp_end - temp_start) - cigar_pos) * parseFloat(maxLentemp) / (temp_end - temp_start));
                        startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))

                        trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[colour_i], temp_end - cigar_pos, exon_number);

                        length = length - ((temp_end - temp_start) - cigar_pos);

                        exon_number++;
                        colour_i++;


                        if (exon_number >= no_of_exons) {
                            break first;
                        }

                        max = exons[exon_number].length
                        maxLentemp = parseInt(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr('width'));

                        temp_start = exons[exon_number].start - gene_start;
                        temp_end = (exons[exon_number].end - gene_start) + 1;

                        cigar_pos = 0;//temp_start;

                        startposition = parseFloat((cigar_pos) * parseFloat(maxLentemp) / (temp_end - temp_start));
                        stopposition = parseFloat((length) * parseFloat(maxLentemp) / (temp_end - temp_start));

                        if (parseInt(cigar_pos) + parseInt(length) <= (temp_end - temp_start)) {
                            startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))

                            trackHTML(startposition, stopposition, top, trackClass, temp_div, colours[colour_i], length, exon_number);
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

                startposition = parseInt((cigar_pos) * parseFloat(maxLentemp) / (temp_end - temp_start));
                startposition = parseFloat(startposition) + parseFloat(jQuery("#exon" + id + "" + exons[exon_number].id + "" + div).attr("x"))

                stopposition = 15;

                trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colours[exon_number], length);
            } else if (key == "I" && length > 0) {
            }
            else {
            }
        }
    }

    function trackHTMLDelete(startposition, stopposition, top, trackClass, temp_div, colour, title) {
        temp_div.text(g, startposition, 7, '\'');
    }

    function trackHTML(startposition, stopposition, top, trackClass, temp_div, colour, title, i) {
        temp_div.rect(g, startposition, 1, stopposition, 10, 1, 1, {
            fill: colour,
            'class': trackClass,
            onmouseover: 'onMouseOver("' + colour + '")',
            onmouseout: 'onMouseOut("' + colour + '")'
        });
    }
}

function onMouseOver(i) {
    jQuery(".insert").attr('class', 'insert cigarover')
    jQuery(".match").attr('class', 'match cigarover')
    jQuery(".match[fill='" + i + "']").attr('class', 'match')
}

function onMouseOut(i) {
    jQuery(".insert").attr('class', 'insert')
    jQuery(".match").attr('class', 'match')
}