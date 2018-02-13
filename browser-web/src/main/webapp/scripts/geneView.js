/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */

var data = "";

var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)', 'rgb(177,89,40)', 'rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)', 'rgb(188,128,189)', 'rgb(204,235,197)', 'rgb(255,237,111)']
//var colours = ['#A6CEE3', '#1F78B4', '#B2DF8A', '#33A02C', '#FB9A99', '#E31A1C', '#FDBF6F', '#FF7F00', '#CAB2D6', '#6A3D9A', '#FFFF99', '#B15928', '#8DD3C7', '#FFFFB3', '#BEBADA', '#FB8072', '#80B1D3', '#FDB462', '#B3DE69', '#FCCDE5', '#D9D9D9', '#BC80BD', '#CCEBC5', '#FFED6F']


var ref_member = null
var syntenic_data = null;
var chromosomes = null;
var genome_db_id = null;
var genome_name = null;
var chr = null;
var member_id = null;
var members = null;
var members_overview = null;
var chr_len = null;
var chr_name = null;
var protein_domains = null;


function getChromosomes(member_id) {
    var color = jQuery("option:selected", jQuery("#genomes")).attr("background");
    jQuery(".headerbar").css("background", color);
    jQuery("#chr_maps").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")
    jQuery("#bar_image_ref").html("")
    jQuery("#selected_region").html("")
    if (member_id == undefined) {
        jQuery("#gene_widget").html("")
        jQuery("#gene_info").html("")
    }


    if (genome_db_id != null) {
        Fluxion.doAjax(
            'comparaService',
            'getChromosome',
            {'reference': genome_db_id, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {

                    chromosomes = json.member;
                    if (chromosomes.length > 0) {
                        showGeneReference()
                    } else {
                        hideGeneReference()
                    }

                    drawChromosome()
                    if (chr == undefined) {
                        setCredentials(chromosomes[0].id, genome_db_id);
                    }
                    Fluxion.doAjax(
                        'comparaService',
                        'getGenomeAndChrName',
                        {'query': genome_db_id, 'chr': chr, 'url': ajaxurl},
                        {
                            'doOnSuccess': function (json) {
                                //window.history.pushState("ref=" + json.genome_name, "Title", "index.jsp?ref=" + json.genome_name + "&chr=" + json.chr_name);
                                genome_name = json.genome_name;
                                chr_name = json.chr_name
                            }
                        });


                    if (member_id == undefined) {
                        getMember();
                    } else if (chr_name == null) {
                        select_chr()
                    }
                }
            })
    } else if (genome_name != null) {
        Fluxion.doAjax(
            'comparaService',
            'getChromosomebyGenomeName',
            {'reference': genome_name, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {

                    chromosomes = json.member;

                    if (chromosomes.length > 0) {
                        showGeneReference()
                    } else {
                        hideGeneReference()
                    }

                    drawChromosome()
                    if (chr == undefined && chr_name == null) {
                        setCredentials(chromosomes[0].id, genome_db_id);
                    }

                    if (member_id == undefined) {
                        getMember();
                    } else if (chr_name == null) {
                        select_chr()
                    }
                }
            })
    }
}

function drawChromosome() {
    var max = Math.max.apply(Math, chromosomes.map(function (o) {
        return o.length;
    }));

    jQuery("#chr_maps").html("");

    var referenceLength = chromosomes.length;

    var maxLen = jQuery(window).width();

    var width = 15;
    var distance = (parseInt(maxLen) - (width * referenceLength)) / (referenceLength + 1);

    chromosomes.sort(naturalSort)
    while (referenceLength--) {

        var left = parseInt(referenceLength * (width)) + parseInt(distance * referenceLength) + parseInt(distance);
        var height = (chromosomes[referenceLength].length * 80 / max);
        var length = chromosomes[referenceLength].length;
        var top = parseInt(jQuery("#map").css('top')) + parseInt(jQuery("#map").css('height')) - (height + 20);
        jQuery("<div>").attr({
            'id': 'chr' + chromosomes[referenceLength].id,
            'class': 'refmap',
            'chr_length': chromosomes[referenceLength].length,
            'style': "left: " + left + "px; width:" + width + "px; height:" + height + "px; background: " + jQuery("#genome" + genome_db_id).css("background"),
            'onClick': 'URLgenomeName(genome_name, "' + chromosomes[referenceLength].chr_name + '"), setCredentials("' + chromosomes[referenceLength].id + '",' + genome_db_id + '), getMember();'
        }).appendTo("#chr_maps");
        jQuery("<div>").attr({
            'style': "position: absolute; bottom: 10px; left: " + left + "px; width:" + width + "px; "
        }).html(chromosomes[referenceLength].chr_name).appendTo("#chr_maps");

    }
}

function setCredentials(chr_name, genome_id) {
    chr = chr_name;
    genome_db_id = genome_id;
    select_chr();
    select_genome()
}

function getMember(member) {
    jQuery(".selected").removeClass("selected")
    jQuery("#chr" + chr).addClass("selected")


    if (member_id == undefined) {
        jQuery("#selected_region").html("")
        jQuery("#gene_widget").html("")
        jQuery("#gene_info").html("")
    }
    jQuery("#bar_image_ref").html("<i style=\"text-align: center;\" class=\"fa fa-spinner fa-spin\"></i>")


    if (chr != null) {
        Fluxion.doAjax(
            'comparaService',
            'getMember',
            {'chr_name': chr, 'reference': genome_db_id, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {
                    members = json.member;

                    jQuery("#bar_image_ref").html("")
                    sequencelength = json.chr_length;
                    members_overview = json.overview;
                    drawMember()
                    if (member == undefined) {
                        drawSelected();
                    } else {
                        setSelector(syntenic_data.member[syntenic_data.ref].Transcript[0], syntenic_data.member[syntenic_data.ref].member_id)
                    }

                }
            });
    } else {
        Fluxion.doAjax(
            'comparaService',
            'getMemberbyChrName',
            {'chr_name': chr_name, 'reference': genome_name, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {
                    members = json.member;
                    chr = json.chr_id

                    jQuery("#bar_image_ref").html("")
                    sequencelength = json.chr_length;
                    members_overview = json.overview;
                    drawMember()
                    if (member == undefined) {
                        drawSelected();
                    } else {
                        setSelector(syntenic_data.member[syntenic_data.ref].Transcript[0], syntenic_data.member[syntenic_data.ref].member_id)
                    }
                }
            });
    }

}

function drawMember() {
    jQuery("#bar_image_ref").html("")
    var width = parseInt(jQuery("#bar_image_selector").css("width"));
    var maxLentemp = parseInt(jQuery("#canvas").css("width"));

    var overview = members_overview;
    var overview_len = overview.length
    var max = Math.max.apply(Math, overview.map(function (o) {
        return o.graph;
    }));
    if (overview_len > 1) {
        while (overview_len--) {
            var startposition = (overview[overview_len].start) * parseFloat(maxLentemp) / sequencelength;
            var stopposition = (overview[overview_len].end - overview[overview_len].start) * parseFloat(maxLentemp) / sequencelength;
            jQuery("<div>").attr({
                'class': "refMarkerShow",
                'style': "LEFT:" + startposition + "px; width :" + stopposition + "px; opacity: " + (overview[overview_len].graph / max) + "; height: 10px;"
            }).appendTo("#bar_image_ref");
        }
    } else {
        var startposition = (overview[0].start) * parseFloat(maxLentemp) / sequencelength;
        var stopposition = (overview[0].end - overview[0].start) * parseFloat(maxLentemp) / sequencelength;
        jQuery("<div>").attr({
            'class': "refMarkerShow",
            'style': "LEFT:" + startposition + "px; width :" + stopposition + "px; opacity: " + (overview[0].graph) + "; height: 10px;"
        }).appendTo("#bar_image_ref");
    }


}


function drawSelected(member) {

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


    var new_data = jQuery.grep(members, function (element, index) {
        //return (element.start >= start && element.end <= end) or (element.start <= start && element.end >= end) ; // retain appropriate elements
        return (element.start >= start && element.end <= end) || (element.start <= start && element.end >= end) || (element.end >= end && element.start <= end) || (element.start <= start && element.end >= start);
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
            'seq_id': new_data[data_length].seq_member_id,
            'start': new_data[data_length].start,
            'end': new_data[data_length].end,
            'class': "refMarkerShow",
            'style': "LEFT:" + startposition + "px; width :" + stopposition + "px;",
            'onMouseOver': "countcoreMember(\"" + new_data[data_length].id + "\")",
            'onMouseOut': "jQuery('#besideMouse').hide()",
            'onClick': "getcoreMember(\"" + new_data[data_length].id + "\")"
        }).appendTo("#selected_region");


    }
}

function getcoreMember(query, redrawn) {
    jQuery(".refMarkerShow").removeClass("selected")
    jQuery("#ref" + query).addClass("selected")
    jQuery("#gene_widget").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")
    jQuery("#gene_widget_exons").html("")

    jQuery("#gene_tree_nj").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>")

    Fluxion.doAjax(
        'comparaService',
        'getCoreMember',
        {'query': query, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                jQuery("#homogies").html("")
                jQuery("#sankey").html("")
                syntenic_data = json
                //window.history.pushState("ref=" + json.genome_name, "Title", "index.jsp?query=" + syntenic_data.ref.genes.gene.stable_id);
                init(json, "#settings_div", "#filter", "#sliderfilter")

                setSelector(syntenic_data.member[syntenic_data.ref].Transcript[0], syntenic_data.member[syntenic_data.ref].member_id)

                URLMemberID(json.ref, "tree")
                drawSynteny(redrawn);

            }
        });
}


function countcoreMember(query) {
    jQuery("#besideMouse").html("")
    jQuery('#besideMouse').show()

    Fluxion.doAjax(
        'comparaService',
        'countForCoreMember',
        {'query': query, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                jQuery("#besideMouse").html(json.member + " homologous found.")
            }
        });
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


function reverse_exons(transcript) {
    var exons = [];
    var length = transcript.end - transcript.start;

    transcript._exons = transcript.Exons;

    for (var i = 0; i < transcript._exons.length; i++) {

        exons.push({
            end: parseInt(transcript.start) + parseInt(transcript.end - transcript._exons[i].start) - 1,
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

function onClicked(desc, stable_id, member_id) {
    newpopup(desc, stable_id, member_id)
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

function stringTrim(string, width, newClass) {
    if (newClass) {
        jQuery("#ruler").addClass(newClass.toString())
    }
    else {
        jQuery("#ruler").addClass("ruler")
    }
    var ruler = jQuery("#ruler");
    var inLength = 0;
    var tempStr = "";

    jQuery("#ruler").html(string);
    inLength = jQuery("#ruler").width();

    if (newClass) {
        jQuery("#ruler").removeClass(newClass.toString())
    }
    else {
        jQuery("#ruler").removeClass("ruler")
    }

    if (inLength < width) {
        return string;
    }
    else {
        width = parseInt(string.length * width / inLength);
        var string_title = string.replace(/\s+/g, '&nbsp;');
        return "<span title=" + string_title + ">" + string.substring(0, width) + "... </span>";
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


function drawSynteny(redrawn) {
    jQuery("#gene_widget").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading' height='100%'>")
    jQuery("#gene_tree_nj").html("")
    jQuery("#gene_tree_upgma").html("")
    jQuery("#gene_widget_exons").html("")

    drawTree(syntenic_data.tree, "#gene_tree_nj", newpopup)
}

function select_member() {
    jQuery(".refMarkerShow").removeClass("selected")
    jQuery("#ref" + member_id).addClass("selected")
}

function select_chr() {
    jQuery('div[id^="chr"]').removeClass("selected")

    jQuery("#chr" + chr).addClass("selected")
    if (chr_name == null) {
        Fluxion.doAjax(
            'comparaService',
            'getGenomeAndChrName',
            {'query': genome_db_id, 'chr': chr, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {
                    chr_name = json.chr_name
                    //window.history.pushState("ref=" + genome_name, "Title", "index.jsp?ref=" + genome_name + "&chr=" + chr_name);
                }
            });
    }

}

function select_genome() {
    Fluxion.doAjax(
        'comparaService',
        'getGenomeName',
        {'query': genome_db_id, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                jQuery("#genome_name").html(json.genome_name);
                genome_name = json.genome_name
            }
        });
}


function setSelector(gene, member_id) {
    var maxLentemp = parseInt(jQuery("#canvas").css("width"));

    var start = gene.start

    var left = start * maxLentemp / sequencelength;

    var width = parseInt(jQuery("#bar_image_selector").css("width"));

    left = left - width / 2

    jQuery("#bar_image_selector").animate({left: left + 'px'}, function () {
        drawSelected();
        jQuery(".refMarkerShow").removeClass("selected")

        jQuery("[seq_id=" + member_id + "]").addClass("selected")
    });
}


function makeMeTop(new_gene_id, new_protein_id) {

    if (new_gene_id != member_id || new_protein_id != protein_member_id) {

        URLMemberID(new_gene_id, "tree")

        changeReference(new_gene_id, new_protein_id)

        removePopup();
        if (genome_db_id != syntenic_data.member[syntenic_data.ref].species) {
            genome_name = syntenic_data.member[syntenic_data.ref].species;

            genome_db_id = null
            chr_name = syntenic_data.member[syntenic_data.ref].reference
            chr = null

            getChromosomes(new_gene_id);
            members = undefined
            getMember(new_gene_id);
            jQuery("#genome_name").html(genome_name);
        } else if (chr != syntenic_data.member[syntenic_data.ref].reference) {
            chr_name = syntenic_data.member[syntenic_data.ref].reference
            chr = null
            members = undefined
            getMember(new_gene_id);
        }
    }

}

function exportGeneLabel(type) {
    var download_data = ""

    jQuery("#gridSystemModalLabel").html("Gene Labels")

    jQuery("#exportModal_content").html("")
    var text_html = "<table class='table table-condensed'><thead><tr><th>species<th>" + type.replace(".", "") + "</tr></thead><tbody>"

    jQuery(type).each(function (index) {
        text_html += "<tr><td>" + jQuery(this).text().split(":")[0] + "</td><td>" + jQuery(this).text().split(":")[1] + "</td></tr>";
        download_data += jQuery(this).text().split(":")[0] + "," + jQuery(this).text().split(":")[1] + "\\n"

    });
    text_html += "</tbody></table>"
    // text_html += "<button class='btn btn-default' onclick=dlText('" + download_data + "','Genes.csv')>Download</button>"

    jQuery("#exportModal_content").append(text_html)
    jQuery("#downloadButton").html("<button class='btn btn-default' onclick=dlText('" + download_data + "','Genes.csv')>Download</button>")

    if (!jQuery('#exportModal').hasClass('in')) {
        jQuery('#exportModal').modal()
    }
}


function exportGeneTree(type) {
    jQuery("#gridSystemModalLabel").html("Gene Tree")
    var download_data = ""
    var text_html = ""

    if (type == "json") {
        if (jQuery('#exportModal').hasClass('in')) {
            jQuery('#exportModal').modal('hide')
        }
        download_data += syntenic_data.tree.toSource()
        download_data = download_data.substring(1, download_data.length - 1)
        download_data = download_data.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:([^\/])/g, '"$2":$4');
        dlText(download_data, 'GeneTree')
    } else if (type == "newick") {
        var text_html = jsonToNewick(syntenic_data.tree)

        if (!jQuery('#exportModal').hasClass('in')) {
            jQuery('#exportModal').modal('show')
        }

        jQuery("#exportModal_content").html(text_html)
        jQuery("#downloadButton").html("<button class='btn btn-default' onclick=dlText('" + text_html + "','GeneTree.nhx')>Download</button>")

    }


}

function jsonToNewick(json) {
    var newick = "("
    newick = recursive_tree_Newick(json, newick)
    newick += ");"

    return newick
}

function recursive_tree_Newick(tree, newick) {
    if (tree.children) {
        var child_lenth = tree.children.length;
        var flag = false;
        if (typeof newick === 'undefined') {
            newick = ""
        }
        newick += "("

        //loops through all child nodes
        while (child_lenth--) {
            //if found leaf adds to newick
            if (tree.children[child_lenth].sequence) {
                if (typeof newick === 'undefined') {
                    newick = ""
                }
                //if adding sister node than adds ,
                if (flag) {
                    newick += ","
                }
                newick += tree.children[child_lenth].sequence.id[0].accession;
                flag = true;
            }
            //else go through nested child
            else {
                //opens a child node in newick
                newick = recursive_tree_Newick(tree.children[child_lenth], newick)

            }
            //if last node was leaf or another child node closed than adds ,
            if (newick.replace(/\(/g, "").length > 0 && tree.children[child_lenth].branch_length) {
                newick += ":" + tree.children[child_lenth].branch_length;
            }
        }
        //closes a child node in newick
        newick += ")"
        return newick
    }
    else {
        return newick;
    }
}

/**
 *
 */
function exportAlignment(id) {
    var download_data = ""
    var text_html = "";
    jQuery("#exportModal_content").html("")
    jQuery("#gridSystemModalLabel").html("Alignment(s)")

    var data = {}
    var Protein_id = []
    jQuery(".protein_id").each(function (index) {
        Protein_id.push(jQuery(this).text().split(":")[1]);
    });

    if (!id) {
        data = syntenic_data.cigar
    } else {
        data[id] = syntenic_data.cigar[id]
    }

    jQuery.each(data, function (key, data) {
        if (Protein_id.indexOf(key) >= 0) {
            text_html += ">" + key + "<br>" + data + "<br>"
            download_data += ">" + key + "\n" + data + "\n"
        }
    })


    //if (jQuery('#exportModal').hasClass('in')) {
    //    jQuery('#exportModal').modal('hide')
    //}

    var download_btn = jQuery('<button/>')
        .text('Download')
        .addClass('btn btn-default')
        .click(function () {
            dlText(download_data, 'Alignment.fa')
        });

    jQuery("#exportModal_content").append(text_html)

    jQuery("#downloadButton").html(download_btn)

    if (!jQuery('#exportModal').hasClass('in')) {
        jQuery('#exportModal').modal()
    }

    //dlText(download_data, 'CIGAR.csv')

}

/**
 *
 */
function exportSequence(id) {

    var download_data = ""

    jQuery("#gridSystemModalLabel").html("Sequence(s)")

    var data = {}

    jQuery("#exportModal_content").html("")

    var Protein_id = []
    jQuery(".protein_id").each(function (index) {
        Protein_id.push(jQuery(this).text().split(":")[1]);
    });

    if (!id) {
        data = syntenic_data.sequence
    } else {
        data[id] = syntenic_data.sequence[id]
    }

    var text_html = "";


    jQuery.each(data, function (key, data) {
        if (Protein_id.indexOf(key) >= 0) {
            text_html += ">" + key + "<br>" + data + "<br>"
            download_data += ">" + key + "\n" + data + "\n"
        }
    })

    jQuery("#exportModal_content").html("")

    var download_btn = jQuery('<button/>')
        .text('Download')
        .addClass('btn btn-default')
        .click(function () {
            dlText(download_data, 'Sequence.fa')
        });

    jQuery("#exportModal_content").append(text_html)

    jQuery("#downloadButton").html(download_btn)

    if (!jQuery('#exportModal').hasClass('in')) {
        jQuery('#exportModal').modal()
    }

}

/**
 *
 * @param data
 * @param name
 */
function dlText(data, name) {
    download(data, name, "text/plain");
}


function getAlignment(hit, ref) {
    Fluxion.doAjax(
        'comparaService',
        'getPairwiseAlignment',
        {'hit': hit, 'ref': ref, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                ////if (mouseX + jQuery("#info-popup").width() > jQuery("#main1").width()) {
                //    jQuery("#info-popup").css({"left": mouseX - jQuery("#info-popup").width());
                //    jQuery("#info-popup").css({"top": (mouseY - jQuery("#info-popup").height());
                //    //jQuery("#info-popup").attr('class', 'bubbleright')
                ////}
                ////else {
                ////    jQuery("#info-popup").css({"left": (mouseX - 26)});
                ////    jQuery("#info-popup").css({"top": (mouseY - jQuery("#popup").height() - 30)});
                ////    jQuery("#info-popup").attr('class', 'bubbleleft')
                ////}

                jQuery("#info_popup_wrapper").fadeIn();

                jQuery("#info-popup").width(jQuery(window).width() * 0.8);

                jQuery("#pairwiseModal_content").width(jQuery(window).width() * 0.8);

                jQuery("#pairwiseModal_content").html("<div id = 'pairwise" + ref + "' style='position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width : " + jQuery(window).width() * 0.8 + "'></div>" +
                    "<br>" +
                    "<div id = 'pairwise" + hit + "' style='position:relative;  cursor:pointer; height: 14px;  LEFT: 0px; width : " + jQuery(window).width() * 0.8 + ";'></div>")
                jQuery("#pairwise" + hit).svg()
                jQuery("#pairwise" + ref).svg()


                svg = jQuery("#pairwise" + ref).svg("get")

                var text = ref

                svg.text(parseInt(jQuery(window).width() * 0.6) + 10, 10, text, {
                    fontFamily: 'Verdana',
                    fontSize: 10,
                    textAnchor: 'begin',
                    fill: "red",
                    class: "protein_id genelabel genetext"
                });

                svg.line(0, 6, jQuery(window).width() * 0.6, 6, {id: 'id geneline', stroke: 'red', strokeWidth: 2});

                var svg = jQuery("#pairwise" + hit).svg("get")

                var text = hit

                svg.text(parseInt(jQuery(window).width() * 0.6) + 10, 10, text, {
                    fontFamily: 'Verdana',
                    fontSize: 10,
                    textAnchor: 'begin',
                    fill: "gray",
                    class: "protein_id genelabel genetext"
                });

                svg.line(0, 6, jQuery(window).width() * 0.6, 6, {id: 'id geneline', stroke: 'green', strokeWidth: 1});

                dispGenesExonForMember_id("#pairwise" + ref, json.ref.alignment, json.ref.gene_id, json.ref.protein_id)//, json.hit.alignment)
                dispGenesExonForMember_id("#pairwise" + hit, json.hit.alignment, json.hit.gene_id, json.hit.protein_id, json.ref.alignment)


                separateSeq(json)

            }
        });

}

function setTreeExport() {
    jQuery("#export_params").html("")

    var table = jQuery("<table cellpadding='2px'></table>");

    var row_spacing = jQuery("<tr class='border_bottom'></tr>");
    var column_spanning = jQuery("<td colspan=3></td>");
    column_spanning.html("Tree")
    row_spacing.append(column_spanning)

    table.append(row_spacing)


    var row1 = jQuery("<tr></tr>");
    var column1 = jQuery("<td></td>");


    column1.html("Newick <br> <a class='btn btn-small' href='#' onclick='exportGeneTree(\"newick\")'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row1.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("JSON Format <br> <a class='btn btn-small' href='#' onclick='exportGeneTree(\"json\")'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row1.append(column2)
    table.append(row1)

    var row2 = jQuery("<tr class='border_bottom'></tr>");
    var column1 = jQuery("<td colspan=3></td>");


    column1.html("Genes:")
    row2.append(column1)

    table.append(row2)

    var row3 = jQuery("<tr></tr>");
    var column1 = jQuery("<td></td>");
    column1.html("Gene IDs <br> <a class='btn btn-small' href='#' onclick='exportGeneLabel(\".stable\")'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row3.append(column1)

    var column2 = jQuery("<td></td>");

    column2.html("Gene Names <br> <a class='btn btn-small' href='#' onclick='exportGeneLabel(\".geneinfo\")'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row3.append(column2)

    var column3 = jQuery("<td></td>");

    column3.html("Protein IDs <br> <a class='btn btn-small' href='#' onclick='exportGeneLabel(\".protein_id\")'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row3.append(column3)


    table.append(row3)


    var row_spacing = jQuery("<tr class='border_bottom'></tr>");
    var column_spanning = jQuery("<td colspan=3></td>");
    column_spanning.html("Alignment")
    row_spacing.append(column_spanning)

    table.append(row_spacing)


    var row4 = jQuery("<tr></tr>");
    var column1 = jQuery("<td></td>");

    column1.html("CIGAR format <br> <a class='btn btn-small' href='#' onclick='exportAlignment()'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row4.append(column1)

    var column2 = jQuery("<td></td>");

    column2.html("Sequence <br> <a class='btn btn-small' href='#' onclick='exportSequence()'>  <i class='fa fa-download' style='color: white'></i> </a>")
    row4.append(column2)

    table.append(row4)


    jQuery("#export_params").html(table)

}

function setTableExport() {
    jQuery("#export_params").html("")
}