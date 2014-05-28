<%@ include file="header.jsp" %>

<div id="main1" style="top : 10px ; height: 1050px; ">

</div>

<div id="canvas" style="display: none">

    <div id=reference_maps style="height: 40px;    position: relative;    top: 0px;    width: 100%; text-align: right; padding: 10px;">

    </div>

    <div class="sectionDivider" onclick="toggleLeftInfo(jQuery('#Chrdiv_arrowclick'), 'chr_maps');">
        Chromosome

        <div id="Chrdiv_arrowclick" class="toggleLeftDown"></div>
    </div>
    <div id=chr_maps style="height: 100px;    position: relative;    top: 10px;    width: 100%; ">

    </div>


    <div id="bar_image_ref"
         style="border-left: 1px solid #000000; border-right: 1px solid #000000; height: 10px; left: 0; position: relative; top: 10px; vertical-align: middle; width: 100%; z-index: 999;">


    </div>
    <div id="bar_image_selector"
         style="border: 1px solid #000000; height: 20px; left: 0; position: relative; top: -5px; vertical-align: middle; width: 50px; z-index: 1999; background: white; opacity: 0.2">

    </div>

    <div id="selected_region"
         style=" background-color: #FFFFFF; border: 1px solid #000000;  height: 20px;  left: 1px;  position: relative; text-align: center; top: 10px; vertical-align: middle; width: 100%; z-index: 999;">

    </div>

    <div style="height: auto; left: 5%;  position: relative; top: 20px;width: 1200px; z-index: 999;">

        <div id="vertical0" style="position:absolute; left: 100px" class="vertical-line"></div>
        <div id="vertical1" style="position:absolute; left: 200px" class="vertical-line"></div>
        <div id="vertical2" style="position:absolute; left: 300px" class="vertical-line"></div>
        <div id="vertical3" style="position:absolute; left: 400px" class="vertical-line"></div>
        <div id="vertical4" style="position:absolute; left: 500px" class="vertical-line"></div>
        <div id="vertical5" style="position:absolute; left: 600px" class="vertical-line"></div>
        <div id="vertical6" style="position:absolute; left: 700px" class="vertical-line"></div>
        <div id="vertical7" style="position:absolute; left: 800px" class="vertical-line"></div>
        <div id="vertical8" style="position:absolute; left: 900px" class="vertical-line"></div>
        <div id="vertical9" style="position:absolute; left: 1000px" class="vertical-line"></div>
        <div id="vertical10" style="position:absolute; right: 100px; margin-left: -20px; border-left: 0"
             class="vertical-line"></div>
            <div id="gene_widget">

            </div>

    </div>

<div style='display:none'>

    <div id="gene_info" style=" ">

    </div>
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
        console.log("ready")
        kickOff();
        getReferences();
    });
</script>