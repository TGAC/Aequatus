/**
 * Created by thankia on 09/01/15.
 */

function setOff() {
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';

    setGenomes(getUrlVariables);
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


    jQuery("#bar_image_ref").click(function (e) {
        dragtohere(e);
    });

    jQuery("#bar_image_selector").draggable(
        {
            axis: "x",
            containment: "parent",
            stop: function () {
                drawSelected();
            }
        });


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


function setOrthologuesEvents() {
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
            search_orthologues(jQuery('#search').val());
        }
    });

    var testTextBox = jQuery('#control_search');
    var code = null;
    testTextBox.keypress(function (e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            jQuery("#search_history").html(jQuery("#search").val());
            jQuery("#search").val(jQuery('#control_search').val());
            search_orthologues(jQuery('#control_search').val());
        }
    });

    jQuery("#control_panel").draggable(
        {
            axis: "y",
            containment: "parent",
            handle: "#control_panel_handle"
        });
}

function getUrlVariables(chr) {

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
        getReferences();
    }
}

function getGenomeId(ref) {
    Fluxion.doAjax(
        'comparaService',
        'getGenomeId',
        {'query': ref, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                genome_db_id = json.ref;
                getReferences();
                changeGenome(json.ref, ref)
            }
        });
}

function getChrId(chr, ref) {
    Fluxion.doAjax(
        'comparaService',
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
}


function getMemberfromURL(query, view) {
    Fluxion.doAjax(
        'comparaService',
        'getMemberfromURL',
        {'query': query, 'view': view, 'url': ajaxurl},
        {
            'doOnSuccess': function (json) {
                if (json.member_id) {
                    member_id = json.member_id;
                    chr = json.dnafrag;
                    genome_db_id = json.ref;
                    getReferences();
                    getChromosomes(json.member_id);
                    getMember(json.member_id);
                    select_chr();
                    select_genome();
                    listResult(json)
                    setSearchList(json.html[0].stable_id)
                    if (view == "tree") {
                        setTreeExport();
                        getcoreMember(json.member_id, true);
                    }else if (view == "table") {
                        setTableExport();
                        getOrthologyForMember(json.member_id, "table");
                    }else if (view == "sankey") {
                        setTableExport();
                        getOrthologyForMember(json.member_id, "sankey");
                    }else{
                        if (parseInt(jQuery("#control_panel").css("left")) < 0) {
                            openPanel('#search_div')
                        }

                        jQuery('#search').val(query);
                        jQuery('#control_search').val(query)
                        search_member(query)
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

                    listResult(json)


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
    if (member_id == undefined) {
        select_member();
        drawSelected();
    } else {

        var start = 0;
        for (var i = 0; i < members.length; i++) {
            if (members[i].id == member_id) {
                start = members[i].start;
            }
        }
        rearrange_selector(member_id, start, chr);
        drawSelected();
        drawSynteny(true);
    }
}

function listResult(json) {
    var content = "";

    if (json.html.length > 0) {
        for (var i = 0; i < json.html.length; i++) {
            if (i == 0) {
                content += "<p id='search_hit' style='background: white;'>";
            }
            var link = "<i style='cursor:pointer' " +
                "onclick='openClosePanel(); jQuery(\"#canvas\").show(); setCredentials(" + json.html[i].dnafrag_id + "," + json.html[i].genome_db_id + "); getChromosomes(); getMember();   getcoreMember(" + json.html[i].gene_member_id + ",\"true\");' " +
                "class=\"fa fa-external-link\"></i>"

            var description = json.html[i].description

            if (description == null) {
                description = ""
            }
            content += "<div class='search_div' id='searchlist_"+json.html[i].stable_id+"'> " +
                "<div class='search_header'>" +
                "<table width='100%'>" +
                "<tr>" +
                "<td>" + json.html[i].stable_id + " <span class='badge' title='" + json.html[i].homologous + " Homologous'>" + json.html[i].homologous + "</span> " +
                "</td>" +

                "<td> <i style='color:grey' class='fa fa-1x fa-sitemap fa-rotate-270' title='View GeneTree' onclick='openClosePanel(); " +
                "jQuery(\"#canvas\").show(); " +
                "setSearchList(\""+json.html[i].stable_id+"\"); " +
                "setCredentials(" + json.html[i].dnafrag_id + "," + json.html[i].genome_db_id + "); " +
                "getChromosomes(); " +
                "getMember();   " +
                "setTreeExport();   " +
                "getcoreMember(" + json.html[i].gene_member_id + ",\"true\");'> </i>" +
                "</td>" +

                "<td> <i style='color:grey' class='fa fa-1x fa-table' title='List Orthology in Table'  onclick='openClosePanel(); " +
                "setSearchList(\""+json.html[i].stable_id+"\"); " +
                "setCredentials(" + json.html[i].dnafrag_id + "," + json.html[i].genome_db_id + "); " +
                "getChromosomes(); " +
                "getMember();   " +
                "getOrthologyForMember(" + json.html[i].gene_member_id + ",\"table\");'> </i>" +
                "</td>" +

                "<td> <i style='color:grey' class='fa fa-1x fa-random' title='View Sankey Plot'  onclick='openClosePanel(); " +
                "setSearchList(\""+json.html[i].stable_id+"\"); " +
                "setCredentials(" + json.html[i].dnafrag_id + "," + json.html[i].genome_db_id + "); " +
                "getChromosomes(); " +
                "getMember();   " +
                "getOrthologyForMember(" + json.html[i].gene_member_id + ",\"sankey\");'> </i>" +
                "</td>" +

                "</tr>" +
                "</table>" +
                "</div>" +
                "<div class='search_info'> " + json.html[i].genome + " : " + json.html[i].coord_system_name + " " + json.html[i].name +
                " <br> " +
                description + "</div>" +
                "</div>";

            if (i == json.html.length - 1) {
                content += "</p>";
                jQuery("#search_result").html(content);
                jQuery("#search_result").fadeIn();
            }

        }
    }
    else {
        jQuery("#search_result").html("<div style='width: 100%; text-align: center; padding-top: 15px; font-size: 15px;'>No Result found</div>");

    }
}

function setSearchList(stable_id){
    jQuery(".search_div").removeClass("active");
    jQuery("#searchlist_"+stable_id).addClass("active");
    var clone =  jQuery("#searchlist_"+stable_id).clone();
    jQuery("#searchlist_"+stable_id).remove();
    jQuery("#search_result").prepend(clone);
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

function resetView()
{
    jQuery(".mainview").each(function(i, div) {
        jQuery(div).html("");
    });
}
