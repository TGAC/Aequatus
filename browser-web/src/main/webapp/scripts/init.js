/**
 * Created by thankia on 09/01/15.
 */

var services;
function setOff() {
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';

    if (jQuery('#data').text() == "rest") {
        services = "ensemblRestServices";
        testConnection()
        jQuery("#chr_maps").hide()
        jQuery("#config_genome").show()
        jQuery("#bar_image_ref").hide()
        jQuery("#bar_image_selector").hide()
        jQuery("#selected_region_wrapper").hide()
    } else if (jQuery('#data').text() == "local") {
        services = "comparaService";
        getRelease()
        jQuery("#config_genome").hide()
        jQuery("#chr_maps").show()
        jQuery("#bar_image_ref").show()
        jQuery("#bar_image_selector").show()
        jQuery("#selected_region_wrapper").show()
        getReferences();
        setGenomes(getUrlVariables);

    } else {
        alert("browser.data not defined properly")
    }
    var name = arguments.callee.toString();
    var testTextBox = jQuery('#search');
    var code = null;
    testTextBox.keypress(function (e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            if (parseInt(jQuery("#control_panel").css("left")) < 0) {
                openPanel('#search_div')
            }
            jQuery("#search_history").html(jQuery("#control_search").val());
            jQuery("#control_search").val(jQuery('#search').val());
            search_member(jQuery('#search').val());
        }
    });

    var testTextBox = jQuery('#control_search');
    var code = null;
    testTextBox.keypress(function (e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            jQuery("#search_history").html(jQuery("#search").val());
            jQuery("#search").val(jQuery('#control_search').val());
            search_member(jQuery('#control_search').val());
        }
    });


    //jQuery("#bar_image_ref").click(function (e) {
    //    dragtohere(e);
    //});
    //
    //jQuery("#bar_image_selector").draggable(
    //    {
    //        axis: "x",
    //        containment: "parent",
    //        stop: function () {
    //            drawSelected();
    //        }
    //    });


    jQuery("#control_panel").draggable(
        {
            axis: "y",
            containment: "parent",
            handle: "#control_panel_handle"
        });


    function dragtohere(e) {
        var left = parseFloat(e.pageX);// - jQuery('#canvas').offset().left);
        var width = jQuery("#bar_image_selector").width()
        left -= width / 2
        jQuery("#bar_image_selector").animate({"left": left});
        drawSelected()
    }

    jQuery(document).mousemove(function (e) {
        var cpos = {top: e.pageY + 20, left: e.pageX + 20};
        jQuery('#besideMouse').offset(cpos);
    });

    var rtime = new Date(1, 1, 2000, 12, 00, 00);
    var timeout = false;
    var delta = 200;
    jQuery(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }
    });

    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            resize()
        }
    }

}


function sethomologousEvents() {

    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    setGenomes()
    var name = arguments.callee.toString();
    var testTextBox = jQuery('#search');
    var code = null;
    testTextBox.keypress(function (e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            if (parseInt(jQuery("#control_panel").css("left")) < 0) {
                openPanel('#search_div')
            }
            jQuery("#search_history").html(jQuery("#control_search").val());
            jQuery("#control_search").val(jQuery('#search').val());
            search_homologous(jQuery('#search').val());
        }
    });

    var testTextBox = jQuery('#control_search');
    var code = null;
    testTextBox.keypress(function (e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            jQuery("#search_history").html(jQuery("#search").val());
            jQuery("#search").val(jQuery('#control_search').val());
            search_homologous(jQuery('#control_search').val());
        }
    });

    jQuery("#control_panel").draggable(
        {
            axis: "y",
            containment: "parent",
            handle: "#control_panel_handle"
        });
}

function setServer() {
    var genome = jQuery('#config_genome').val();
    jQuery("#genome_list_div").html("<div><center><img src='./images/browser/loading_big.gif'></center></div>")

    Fluxion.doAjax(
        services,
        'setServer',
        {'genome': genome, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                getReferences()
                setGenomes(getUrlVariables);
            }
        });
}

function getDivision() {
    jQuery('#division').html("")
    Fluxion.doAjax(
        services,
        'getDivision',
        {'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                for (var i = 0; i < json.divison.length; i++) {
                    jQuery('#division').append("<input type=radio name=divisions value='" + json.division[i] + "'>" + json.division[i] + "</input>")
                }
            }
        });
}

function setDivision(division) {
    Fluxion.doAjax(
        services,
        'setDivision',
        {'division': division, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                // jQuery('#division').html(json.division)
            }
        });
}

function testConnection() {

    console.log("testConnection")

    Fluxion.doAjax(
        services,
        'testRestAPI',
        {'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                if (json.ping == "1") {
                    getRelease()
                    setServer()
                } else {
                    alert("Can not establish connection with Ensembl RestAPI");
                }
            }
        });
}

function getRelease() {

    console.log("getRelease")

    Fluxion.doAjax(
        services,
        'getRestInfo',
        {'url': ajaxurl},
        {
            'doOnSuccess': function (json) {

                if (json.release) {
                    jQuery("#release").html(json.release)
                } else {
                    jQuery("#release").html("Unknown")
                }
            }
        });
}

function getUrlVariables(chr) {
    console.log("getUrlVariables")

    jQuery.urlParam = function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        else {
            return results[1] || 0;
        }
    }

    processURL(jQuery.urlParam)

}

function processURL(urlParam) {
    if (jQuery.urlParam("search") != null) {
        if (parseInt(jQuery("#control_panel").css("left")) < 0) {
            openPanel('#search_div')
        }
        jQuery('#search').val(urlParam("search"));
        jQuery('#control_search').val(urlParam("search"))
        getReferences();

        search_member(urlParam("search"))
    }
    else if (jQuery.urlParam("ref") != null && jQuery.urlParam("chr") != null) {
        getChrId(urlParam("chr"), urlParam("ref"))
    }
    else if (jQuery.urlParam("ref") != null) {
        getGenomeId(urlParam("ref"))
    }
    else if (jQuery.urlParam("query") != null) {//} && jQuery.urlParam("ref") != null && jQuery.urlParam("chr") != null) {
        getMemberfromURL(urlParam("query"), urlParam("view"));
    }
    else {
        // getReferences();
    }
}

function getGenomeId(ref) {
    Fluxion.doAjax(
        services, //'comparaService',
        'getGenomeId',
        {'query': ref, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                getReferences();
                if (services == "comparaService") {
                    genome_db_id = json.ref;
                    changeGenome(json.ref, ref)
                } else {
                    changeGenome(json.name, ref)
                }
            }
        });
}

function getChrId(chr, ref) {

    if (services == "comparaService") {
        Fluxion.doAjax(
            services, //'comparaService',
            'getChrId',
            {'query': chr, 'ref': ref, 'url': ajaxurl},
            {
                'doOnSuccess': function (json) {

                    chr = json.dnafrag;
                    genome_db_id = json.ref;
                    getReferences();
                    setCredentials(json.chr, json.ref);
                    getChromosomes();
                    getMember();
                    select_chr()
                }
            });
    } else {
        getGenomeId(ref)
    }

}


function getMemberfromURL(query, view) {
    console.log("getMemberfrom URL")
    Fluxion.doAjax(
        services, //'comparaService',
        'getMemberfromURL',
        {'query': query, 'view': view, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                if (json.member_id != undefined) {
                    member_id = json.member_id;
                    chr = json.dnafrag;
                    genome_db_id = json.ref;
                    if (services == "comparaService") {
                        getReferences();
                        getChromosomes(genome_db_id);
                        getMember(json.member_id);
                        select_chr();
                        select_genome();
                        getSyntenyForMember(json.member_id)
                    }

                    listResult(json.result)

                    setSearchList(json.result[0].id)

                    if (view == "tree") {
                        setTreeExport();
                        getcoreMember(json.result[0].id, true);
                    } else if (view == "table") {
                        setTableExport();
                        getHomologyForMember(json.result[0].id, "table");
                    } else if (view == "sankey") {
                        setTableExport();
                        getHomologyForMember(json.result[0].id, "sankey");
                    } else {
                        if (parseInt(jQuery("#control_panel").css("left")) < 0) {
                            openPanel('#search_div')
                        }

                        jQuery('#search').val(query);
                        jQuery('#control_search').val(query)
                    }
                } else {
                    getReferences()

                    if (parseInt(jQuery("#control_panel").css("left")) < 0) {
                        openPanel('#search_div')
                    }
                    jQuery("#search_history").html(jQuery("#control_search").val());
                    jQuery("#control_search").val(query);
                    jQuery("#search").val(query);
                    var content = "";
                    URLSearch(query)
                    listResult(json.result)


                }

            }
        });
}


function search_from_box() {
    if (parseInt(jQuery("#control_panel").css("left")) < 0) {
        openPanel('#search_div')
    }
    jQuery("#search_history").html(jQuery("#control_search").val());
    jQuery("#control_search").val(jQuery('#search').val());
    search_member(jQuery('#search').val());
}

function resize() {
    drawChromosome();
    drawMember();
    select_chr();
    resizeView()
}

function listResult(json) {
    console.log("listResult")
    var content = "<p id='search_hit' style='background: white;'>";

    jQuery.each(json, function (key, value) {
        var badges = ""
        var ref_link = ""
        var id = value[value.id].stable_id ? value[value.id].stable_id : value[value.id].id
        if (services == "comparaService") {
            //ref_link = "getRefs(\"" + value[value.id].stable_id + "\",\"" + value[value.id].dnafrag_id + "\",\"" + value[value.id].genome_db_id + "\",\"" + value[value.id].gene_member_id + "\"); "
            badges = "<span class='badge' title='" + value[value.id].homologous + " Homologous'>" + value[value.id].homologous + "</span> "

        }

        var link = "<i style='cursor:pointer' " +
            "onclick='openClosePanel(); jQuery(\"#canvas\").show(); getcoreMember(" + value.id + ",\"true\");' " +
            "class=\"fa fa-external-link\"></i>"
        var description = value.description
        if (description == null) {
            description = ""
        }

        console.log(value[value.id])
        console.log(typeof(value[value.id]))

        var temp_obj = JSON.stringify(value[value.id]);

        console.log(temp_obj)

        content += "<div class='search_div' id='searchlist_" + value.id + "' > " +
            "<div class='search_header'>" +
            "<table width='100%'>" +
            "<tr><td>" + value.id + " " +
            badges +
            "<td> <i style='color:grey' class='fa fa-1x fa-sitemap fa-rotate-270' title='View GeneTree' onclick='openClosePanel(); " +
            "jQuery(\"#canvas\").show();   setSearchList(" + temp_obj + "); " +
            "resetView(); getcoreMember(\"" + value.id + "\",\"true\");'> </i>" +
            "</td>" +


            "<td> <i style='color:grey' class='fa fa-1x fa-table' title='List Homology in Table' onclick='openClosePanel(); " +
            "jQuery(\"#canvas\").show();   setSearchList(" + temp_obj + "); " +
            "resetView(); getHomologyForMember(\"" + value.id + "\",\"table\");'> </i>" +
            "</td>" +

            "<td> <i style='color:grey' class='fa fa-1x fa-random' title='View Homology as Sankey Plot' onclick='openClosePanel(); " +
            "jQuery(\"#canvas\").show();   setSearchList(" + temp_obj + "); " +
            "resetView(); getHomologyForMember(\"" + value.id + "\",\"sankey\");'> </i>" +
            "</td>" +
            "</tr>" +
            "</table>" +
            "</div> " +

            "<div class='search_info'> " + value[value.id].display_name + " <br> " + value[value.id].species + " : " + value[value.id].seq_region_name +
            " <br> " +
            value[value.id].description + "</div>" +
            "</div>";
    });
    content += "</p>";
    jQuery("#search_result").html(content);
    jQuery("#search_result").fadeIn();
}


function setSearchList(value) {
    console.log(value)
    var id = value["stable_id"] ? value["stable_id"] : value["id"]
    // //
    console.log("setSearchList " + id)
    if (!jQuery("#searchlist_" + id).hasClass("active")) {
        jQuery(".search_div").removeClass("active");
        jQuery("#searchlist_" + id).addClass("active");
        var clone = jQuery("#searchlist_" + id).clone();
        jQuery("#searchlist_" + id).remove();
        jQuery("#search_result").prepend(clone);
        if (services == "comparaService") {
            var dnafrag_id = value["dnafrag_id"]
            var genome_db_id = value["genome_db_id"]
            var gene_member_id = value["gene_member_id"]

            setCredentials(dnafrag_id, genome_db_id);
            getChromosomes();
            getMember();
            getSyntenyForMember(gene_member_id);
        }
    }
}

function hideGeneReference() {
    jQuery("#chr_maps").hide()
    jQuery("#bar_image_selector").hide()
    jQuery("#selected_region").hide()
    jQuery("#bar_image_ref").hide()
}

function showGeneReference() {
    jQuery("#chr_maps").show()
    jQuery("#bar_image_selector").show()
    jQuery("#selected_region").show()
    jQuery("#bar_image_ref").show()
}

function resetView() {
    jQuery(".mainview").each(function (i, div) {
        jQuery(div).html("");
    });
    removeInfoPopup()
    removePopup()
    removeSankeyInfoPopup()
}

function restSettingDiv()
{
    jQuery("#settings_div").html("");
}

