/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
var genomes = []

function getReferences() {
    console.log("getReferences")

    jQuery("#reference_maps").html("");

    var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)'];
    Fluxion.doAjax(
        'comparaService',
        'getGenomes',
        {'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                var content = "" +
                    "<div class='btn-group' role=\"group\">" +
                    "<button id=\"btnGroupDrop1\" type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">" +
                    "Genomes <span class=\"caret\"></span>" +
                    "</button>" +
                    "<ul area-labelledby=\"btnGroupDrop1\" class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">"


                json.genomes.sort(naturalSort)

                for (var i = 0; i < json.genomes.length; i++) {
                    content += "<li style=\"padding:10px\" onclick=\"changeGenome('" + json.genomes[i].genome_db_id + "','" + json.genomes[i].name + "')\">" + json.genomes[i].name + "</li>"

                    var name = json.genomes[i].name;
                    var id = json.genomes[i].genome_db_id;
                    genomes.push(
                        {
                            "name": name,
                            "id": id
                        }
                    );

                }
                content += "</ul></div>"

                jQuery("#genomes").change(function () {
                    var color = jQuery("option:selected", this).css("background");
                    jQuery(".headerbar").css("background", color);
                });

                jQuery("#reference_maps").append(content);
                jQuery("#canvas").show();
                if (genome_db_id == undefined) {

                    console.log("getReferences if")
                    changeGenome(json.genomes[0].genome_db_id, json.genomes[0].name)

                    // getChromosomes();
                }

            }
        });
}


function setGenomes(callback) {
    Fluxion.doAjax(
        'comparaService',
        'setGenomes',
        {'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                if (callback) {
                    callback()
                }
            }
        });
}
function search(query) {

    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    jQuery('#sessioninput').fadeOut();
    jQuery("#sessionid").html("");
    minWidth = null;
    jQuery('#canvas').hide();
    jQuery('#tabGenes').html('');
    jQuery('#tabGO').html('');
    jQuery('#tabTranscripts').html('');

    jQuery("#searchresultHead").html("<br> <span style='color: grey; font-size: large;'>Searching...<span> " +
        "<br><br>" +
        "<img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'>");
    var reference = jQuery('#genomes').val();
    Fluxion.doAjax(
        'comparaService',
        'searchDnafrags',
        {'query': query, 'reference': reference, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                var content = "";
                for (var i = 0; i < json.genomes.length; i++) {
                    if (i == 0) {
                        content += "<p id='search_hit' >";
                    }

                    content += "<div class='search_header'> " + json.genomes[i].genome_db_name + "<td>" + json.genomes[i].name + "<td>" + json.genomes[i].assembly + " <td><a target='_blank' href='index.jsp?query=" + json.genomes[i].name + "&&genome=" + json.genomes[i].genome_db_id + "' > <span title=\"Link\" class=\"ui-button ui-icon ui-icon-link\" </span><a/></td>";

                    if (i == json.genomes.length - 1) {
                        content += "</p>";
                        jQuery("#searchresult").html(content);
                        jQuery("#searchresult").fadeIn();
                    }

                    jQuery("#search_hit").tablesorter();
                }
            }
        });
}

function search_member(query) {
    removePopup()
    //window.history.pushState("search=" + query, "Title", "index.jsp?search=" + query);

    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    jQuery('#sessioninput').fadeOut();
    jQuery("#sessionid").html("");
    minWidth = null;
    //jQuery("#chr_maps").html("");
    //jQuery("#bar_image_ref").html("")
    //jQuery("#selected_region").html("")
    //jQuery("#gene_tree_nj").html("")
    //jQuery("#gene_tree_upgma").html("")
    //jQuery("#gene_widget_exons").html("")
    //jQuery('#canvas').hide();
    //jQuery("#search_result").html("");

    jQuery("#searchresultHead").html("<br> <span style='color: grey; font-size: large;'>Searching...<span> " +
        "<br><br>" +
        "<img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'>");
    var reference = jQuery('#genomes').val();
    jQuery("#search_result").fadeIn();
    jQuery("#search_result").html("<br> <span style='color: grey; font-size: large;'>Searching...<span> " +
        "<br><br>" +
        "<img style='position: relative;' src='./images/browser/loading_big.gif' alt='Loading'>");

    URLSearch(query)

    Fluxion.doAjax(
        'comparaService',
        'searchMember',
        {'query': query, 'reference': reference, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                listResult(json)

            }
        });
}

function changeGenome(genome, name) {
    console.log("changeGenome")
    genome_db_id = genome;
    chr = undefined;
    member_id = undefined;
    getChromosomes();
    jQuery("#genome_name").html(name)
}

function URLgenomeName(genome_name, chr_name) {
    window.history.pushState("ref=" + genome_name, "Title", "?ref=" + genome_name + "&chr=" + chr_name);
}

function URLMemberID(stable_id, view) {
    window.history.pushState("query=" + stable_id, "Title", "?query=" + stable_id + "&&view=" + view);
}

function URLSearch(search) {
    window.history.pushState("search=" + search, "Title", "?search=" + search);
}

function search_redirect(json) {
    console.log("search_redirect")
    URLMemberID(json.stable_id, "tree");
    getcoreMember(json.gene_member_id, true);
    jQuery("#canvas").show();
    jQuery("#genome_name").html(json.genome);
    setCredentials(json.dnafrag_id, json.genome_db_id);
    getChromosomes();
    getMember(json.gene_member_id);
}
