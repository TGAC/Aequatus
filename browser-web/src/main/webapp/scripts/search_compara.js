/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
var default_species = ["pan_troglodytes", "rattus_norvegicus", "homo_sapiens", "canis_familiaris", "sus_scrofa"]
var selected_species = []
var genomes = []

function getReferences() {
    console.log("getReferences")


    var colours = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)'];
    Fluxion.doAjax(
        services,
        'getGenomes',
        {'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                console.log("getreference")


                if (json.species[0].display_name) {
                    json.species = sortByKey(json.species, 'display_name');
                } else {
                    json.species = sortByKey(json.species, 'name');
                }

                var content = "" +
                    "<button onclick=\"toggleGenome()\" class=\"btn btn-default dropdown-toggle\">" +
                    "Genomes <span class=\"caret\"></span>" +
                    "</button>";

                jQuery("#reference_maps").html(content);


                content = "";
                var species_list = "<select name='species_list'> "
                for (var i = 0; i < json.species.length; i++) {

                    var checked = "";
                    if (default_species.indexOf(json.species[i].name) >= 0) {
                        checked = "checked";
                    }


                    var text = json.species[i].display_name ? json.species[i].display_name : json.species[i].name

                    content += "<div class=\"col-12 col-md-2\" style=\"margin-top:5px; margin-bottom:5px;\"> <input type='checkbox' style=\"padding:10px\" name='genome_list' value='" + json.species[i].name + "' " + checked + "> " + text + "</div>"

                    species_list += "<option value=" + json.species[i].name + ">" + text + "</option>"

                    var name = json.species[i].name;

                    var taxon_id = json.species[i].taxon_id;
                    genomes.push(
                        {
                            "name": name,
                            "id": taxon_id
                        }
                    );

                }
                species_list += "</select> "

                jQuery("#genomes").change(function () {
                    var color = jQuery("option:selected", this).css("background");
                    jQuery(".headerbar").css("background", color);
                });

                jQuery("#genome_list_div").append(content);
                jQuery("#species_list_div").html(species_list);
                jQuery("#canvas").show();
                updateGenomeList()

                if (genome_db_id == undefined) {

                    if (services == "comparaService") {
                        changeGenome(json.species[0].genome_db_id, json.species[0].name)
                    }
                } else {
                    getChromosomes(genome_db_id);
                    jQuery("#genome_name").html(name)
                }

            }
        });
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


function toggleGenome() {
    jQuery("#genome_list_div").toggle();
}

function updateGenomeList() {
    selected_species = []
    jQuery('input[name="genome_list"]:checked').each(function () {
        selected_species.push(this.value);
    });
    if (selected_species.indexOf(jQuery('select[name=species_list]').val()) < 0) {
        selected_species.push(jQuery('select[name=species_list]').val());
        jQuery("input[value='" + jQuery('select[name=species_list]').val() + "']").prop('checked', true);
    }
    Fluxion.doAjax(
        services, //'comparaService',
        'setGenomes',
        {'url': ajaxurl, 'species': selected_species.toString()},
        {
            'doOnSuccess': function (json) {
                return true;
            }
        });
}


function setGenomes(callback) {
    Fluxion.doAjax(
        services, //'comparaService',
        'setGenomes',
        {'url': ajaxurl, 'species': selected_species.toString()},
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
        services, //'comparaService',
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
    //updateGenomeList()
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
    console.log("search member")
    var i = 0;
    // if(!jQuery('select[name=species_list]').val())
    // {
    //     var undef = true
    //     while(undef)
    //     {
    //          i++;
    //          if(jQuery('select[name=species_list]').val())
    //          {
    //             undef = false;
    //             console.log(i)
    //             break;
    //          }
    //     }
    // }else{
    //             console.log("defined")

    // }

    var checkExist = setInterval(function () {
        if (jQuery('select[name=species_list]').val()) {
            clearInterval(checkExist);
            Fluxion.doAjax(
                services,
                'searchGenes',
                {'keyword': query, 'species': jQuery('select[name=species_list]').val(), 'url': ajaxurl},
                {
                    'doOnSuccess': function (json) {

                        listResult(json.result)

                    }
                });
        }
    }, 1000); //


}

function changeGenome(genome, name) {
    console.log("changeGenome")
    genome_db_id = genome;
    chr = undefined;
    member_id = undefined;
    getChromosomes(genome_db_id);
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
