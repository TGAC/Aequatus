<%@ include file="header.jsp" %>

<div style="position: fixed; top: 0px; right: 0px; z-index: 999">
    <table>
        <tr>
            <td>
                <input type="text" id="search" >
            </td>
            <td>
                <div id=reference_maps>
                </div>
            </td>
        </tr>
    </table>

</div>

<div id="main1" style="top : 10px ; height: 1050px; ">
    <div id="search_result" style="display: none; position:absolute; top:50px; left: 10px;"></div>
</div>

<div id="canvas" style="">




    <div class="sectionDivider" onclick="toggleLeftInfo(jQuery('#Chrdiv_arrowclick'), 'chr_maps');">
        Chromosome

        <div id="Chrdiv_arrowclick" class="toggleLeftDown"></div>
    </div>
    <div id=chr_maps style="height: 100px;    position: relative; top: 10px;    width: 100%; ">

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

    <div>
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
        <div id="vertical10" style="position:absolute; right: 100px; margin-left: -20px; border-left: 0" class="vertical-line"></div>

        <button onclick="jQuery.colorbox({width: '90%', height: '90%', inline: true, href: '#gene_tree'});">Tree</button>
        <input type="checkbox" onclick="jQuery('.delete').toggle()" checked> Deletion
        <input type="checkbox" onclick="jQuery('.insert').toggle()" checked> Insertion
        <input type="checkbox" onclick="jQuery('.match').toggle()" checked> Match
        |
        <input type="checkbox" onclick="jQuery('.utr').toggle()" checked> UTRs


        <div id="gene_widget">

            </div>

    </div>
    <div style='display:none'>

        <div id="gene_tree">
            <div id="gene_tree_upgma">

            </div>
            <div id="gene_tree_nj">

            </div>
        </div>
    </div>
<div style='display:none'>

    <div id="gene_info" style=" ">

    </div>
</div>

</div>

<span id="ruler"></span>

<script>
    jQuery(document).ready(function () {
        console.log("ready")
        kickOff();
        getReferences();
    });
</script>