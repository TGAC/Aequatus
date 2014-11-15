<%@ include file="header.jsp" %>

<div style="position: fixed; top: 0px; right: 0px; z-index: 999">
    <table>
        <tr>
            <td>
                <input type="text" id="search">
            </td>
            <td>
                <div id=reference_maps>
                </div>
            </td>
        </tr>
    </table>

</div>

<div id="main1" style="top : 10px ; height: 1050px; ">

</div>

<div id="control_panel"
     style="top: 100px;position: fixed; height: auto; left: -300px; z-index: 2999">
    <table cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr valign=top>
            <td width="300px" id=control_divs>
                <div style="display: block; padding: 10px; height: 248px; background: none repeat scroll 0% 0% cyan; font-size: large;"
                     id="settings_div">
                    <input type="checkbox" checked="" onclick="jQuery('.delete').toggle()"
                           style="width: 25px; height: 25px; color: white; background: none repeat scroll 0% 0% red; border: 0px none;">
                    Deletion <br>
                    <input type="checkbox" checked="" onclick="jQuery('.insert').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    Insertion <br>
                    <input type="checkbox" checked="" onclick="jQuery('.match').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    Match <br>
                    <input type="checkbox" checked="" onclick="jQuery('.utr').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    UTRs <br>

                    <br>
                    Introns
                    <br>
                    <input type="radio" onchange="changeToNormal()" value="with" checked="" name="view_type">
                    With

                    <input type="radio" onchange="changeToExon()" value="without" name="view_type"> Without

                </div>
                <div id="search_div"
                     style="display: block; height: 248px; background: none repeat scroll 0% 0% green; padding: 10px;">
                    <input id="control_search" type="text"
                           style="border: 0px solid transparent; position: absolute; left: 0px; top: 75px; height: 45px; width: 298px; color: gray; font-size: 30px;">
                    <button onclick=" search_member(jQuery('#control_search').val());"
                            style="border: 0px none; font-size: large; padding: 10px 25px; margin-left: auto; margin-right: auto; position: absolute; top: 150px; left: 100px; background: none repeat scroll 0% 0% black; color: white;">
                        Search
                    </button>
                </div>
                <div style="display: block; background: none repeat scroll 0% 0% peru; padding: 10px; height: 248px; text-align: center; font-size: 20px;"
                     id="info_div">
                    <table width="50%" cellpadding=5px>
                        <tbody>
                        <tr>
                            <td colspan=2>Legends</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(166,206,227);"></div>
                            </td>
                            <td>
                                Duplication
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(31,120,180);"></div>
                            </td>
                            <td>
                                Dubious
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(178,223,138)"></div>
                            </td>
                            <td>
                                Speciation
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(51,160,44)"></div>
                            </td>
                            <td>
                                Gene Split
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </td>
            <td width="50px">
                <div style="padding: 5px; text-align: center; cursor: move; background: none repeat scroll 0% 0% slategrey; color: white;"
                     id="control_panel_handle">
                    <b> ... </b>
                </div>
                <div onclick="toggleLeftInfo(jQuery('#Chrdiv_arrowclick'), 'chr_maps');"
                     style="text-align: center; padding: 5px; background: none repeat scroll 0% 0% steelblue;"><i
                        class="fa fa-bar-chart fa-3x"></i>
                </div>
                <div onclick="openPanel('#search_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% green;"><i
                        class="fa fa-search fa-3x"></i>
                </div>
                <div onclick="openPanel('#settings_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% cyan;"><i
                        class="fa fa-gear fa-3x"></i>
                </div>
                <div onclick="openPanel('#info_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% peru;"><i
                        class="fa fa-info fa-3x"></i>
                </div>
                <div onclick="openClosePanel('#settings_div')"
                     style="padding: 5px; text-align: center;  background: none repeat scroll 0% 0% gray;"><i
                        class="fa fa-exchange fa-3x"> </i>
                </div>
            </td>
            <td>
                <div id="search_result"
                     style="position: absolute; top: 90px; overflow-y: scroll; height: 500px; padding: 5px; background: none repeat scroll 0% 0% yellow;"></div>
            </td>
        </tr>
        </tbody>
    </table>
</div>


<div id="canvas" style="">


    <%--<div class="sectionDivider" onclick="toggleLeftInfo(jQuery('#Chrdiv_arrowclick'), 'chr_maps');">--%>
        <%--Chromosome--%>
<%----%>
        <%--<div id="Chrdiv_arrowclick" class="toggleLeftDown"></div>--%>
    <%--</div>--%>
    <div id=chr_maps style="background: #d3d3d3; height: 120px; position: relative; top: 10px;  width: 100%; ">

    </div>


    <div id="bar_image_ref"
         style="border-left: 1px solid #000000; border-right: 1px solid #000000; height: 10px; left: 0; position: relative; top: 20px; vertical-align: middle; width: 100%; z-index: 999;">


    </div>
    <div id="bar_image_selector"
         style="border: 1px solid #4682b4; height: 20px; left: 0; position: relative; top: 5px; vertical-align: middle; width: 50px; z-index: 1999; background: white; opacity: 0.4">

    </div>

    <div id="selected_region"
         style=" background-color: #FFFFFF; border: 1px solid #000000;  height: 20px;  left: 1px;  position: relative; text-align: center; top: 10px; vertical-align: middle; width: 100%; z-index: 999;">

    </div>

    <div id="gene_tree_nj" style=" overflow: visible;   position: relative; left: 100px; top: 50px; width: 100%;">

    </div>
    <div style="height: auto; margin-left: auto; margin-right: auto; z-index: 1999; position: fixed;">

        <%--<div id="vertical0" style="position:absolute; left: 100px" class="vertical-line"></div>--%>
        <%--<div id="vertical1" style="position:absolute; left: 200px" class="vertical-line"></div>--%>
        <%--<div id="vertical2" style="position:absolute; left: 300px" class="vertical-line"></div>--%>
        <%--<div id="vertical3" style="position:absolute; left: 400px" class="vertical-line"></div>--%>
        <%--<div id="vertical4" style="position:absolute; left: 500px" class="vertical-line"></div>--%>
        <%--<div id="vertical5" style="position:absolute; left: 600px" class="vertical-line"></div>--%>
        <%--<div id="vertical6" style="position:absolute; left: 700px" class="vertical-line"></div>--%>
        <%--<div id="vertical7" style="position:absolute; left: 800px" class="vertical-line"></div>--%>
        <%--<div id="vertical8" style="position:absolute; left: 900px" class="vertical-line"></div>--%>
        <%--<div id="vertical9" style="position:absolute; left: 1000px" class="vertical-line"></div>--%>
        <%--<div id="vertical10" style="position:absolute; right: 100px; margin-left: -20px; border-left: 0"--%>
        <%--class="vertical-line"></div>--%>


    </div>
</div>

<div id="gene_widget" style='position: relative; display:none'>

</div>
<div id="gene_widget_exons" style='position: relative; top: 100px; display:none'>

</div>
</div>
<div style='display:none'>

    <div id="gene_tree">
        <div id="gene_tree_upgma">

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
        kickOff();
        getReferences();
    });
</script>