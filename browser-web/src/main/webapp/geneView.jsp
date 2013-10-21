<div id="main1" style="top : 10px ; height: 1050px; ">

</div>

<div id="searchresult">

</div>
<div id="canvas" style="display: none">

    <div id="bar_image_ref" style="border-left: 1px solid #000000; border-right: 1px solid #000000; height: 10px; left: 0; position: fixed; top: 60px; vertical-align: middle; width: 100%; z-index: 999;">

        <div id="bar_image_selector" style="border: 1px solid #000000; height: 20px; left: 0; position: fixed; top: 55px; vertical-align: middle; width: 50px; z-index: 1999; background: white; opacity: 0.2">

        </div>
    </div>

    <div id="selected_region" style=" background-color: #FFFFFF; border: 1px solid #000000;  height: 20px;  left: 1px;  position: fixed; text-align: center; top: 135px; vertical-align: middle; width: 100%; z-index: 999;">

    </div>


    <div id="gene_widget">

    </div>

</div>

<%--<div id="slider">--%>
    <%--<h1>Control Panel</h1>--%>

    <%--<div class="sectionDivider" onclick="toggleLeftInfo(jQuery('#Tracksdiv_arrowclick'), 'Tracksdiv');">Tracks List--%>
        <%--<div id="Tracksdiv_arrowclick" class="toggleLeftDown"></div>--%>
    <%--</div>--%>
    <%--<div id="Tracksdiv">--%>
        <%--<table width="100%">--%>

            <%--<tr>--%>
                <%--<td>--%>
                    <%--<div id="tracklist" align="left">--%>

                    <%--</div>--%>
                <%--</td>--%>

            <%--</tr>--%>
        <%--</table>--%>
    <%--</div>--%>

    <%--<div id="openCloseWrap" style="display: none; cursor: pointer" onclick="tracklistopenclose();">--%>
        <%--<b>| | |</b>--%>
    <%--</div>--%>
<%--</div>--%>

<%--</div>--%>

<span id="ruler"></span>

<script>
    jQuery(document).ready(function () {
        kickOff();
//        getReferences();
//        search_geneView();
    });
</script>