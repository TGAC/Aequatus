<%@ include file="header.jsp" %>

<div id="control_panel"
     style="top: 100px;position: fixed; height: auto; left: -300px; z-index: 2999">
    <table cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr valign=top>
            <td width="300px" id=control_divs>
                <div style="display: none; padding: 10px; height: 248px; background: none repeat scroll 0% 0% cyan; font-size: large;"
                     id="settings_div">
                    <input id="deleteCheck" type="checkbox" checked="" onclick="jQuery('.delete').toggle()"
                           style="width: 25px; height: 25px; color: white; background: none repeat scroll 0% 0% red; border: 0px none;">
                    Deletion <br>
                    <input id="insertCheck" type="checkbox" checked="" onclick="jQuery('.insert').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    Insertion <br>
                    <input id="matchCheck" type="checkbox" checked="" onclick="jQuery('.match').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    Match <br>
                    <input id="utrCheck"  type="checkbox" checked="" onclick="jQuery('.utr').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    UTRs <br>

                    <br>
                    Label
                    <br>
                    <input type="radio" onchange=" changeToStable()" value="stable" checked="" name="label_type" checked>
                    Stable Id

                    <input type="radio" onchange=" changeToGeneInfo()" value="gene_info" name="label_type"> Gene Info

                    <br>
                    Introns
                    <br>
                    <input type="radio" onchange="changeToNormal()" value="with" checked="" name="view_type" checked>
                    With

                    <input type="radio" onchange="changeToExon()" value="without" name="view_type"> Without

                </div>
                <div id="search_div"
                     style="display: block; height: 248px; background: none repeat scroll 0% 0% green; padding: 10px;">
                    <input id="control_search" type="text"
                           style="border: 0px solid transparent; position: absolute; left: 0px; top: 75px; height: 45px; width: 298px; color: gray; font-size: 30px;">
                    <button onclick="jQuery('#search_history').html(jQuery('#search').val()); jQuery('#search').val(jQuery('#control_search').val()); search_member(jQuery('#control_search').val());"
                            style="border: 0px none; font-size: large; padding: 10px 25px; margin-left: auto; margin-right: auto; position: absolute; top: 150px; left: 100px; background: none repeat scroll 0% 0% black; color: white;">
                        Search
                    </button>

                   <br>
                    <div style="position: absolute; top: 200px; text-align: center; width: 300px; color: white; font-weight: lighter; font-size: small;">Search History:
                        <span id="search_history" style="font-size: medium; font-weight: lighter;" onclick="jQuery('#search').val(jQuery('#search_history').html()); jQuery('#search_history').html(jQuery('#control_search').val());jQuery('#control_search').val(jQuery('#search').val()); search_member(jQuery('#control_search').val());">

                        </span>
                    </div>
                </div>
                <div style="display: none; background: none repeat scroll 0% 0% peru; padding: 10px; height: 248px; text-align: center; font-size: 20px;"
                     id="info_div">
                    <table width="50%" cellpadding=5px>
                        <tbody>
                        <tr>
                            <td align="left" colspan="2"><b> Legends </b></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(166,206,227);"></div>
                            </td>
                            <td align="left">
                                Duplication
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(31,120,180);"></div>
                            </td>
                            <td align="left">
                                Dubious
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(178,223,138)"></div>
                            </td>
                            <td align="left">
                                Speciation
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circleBase type2" style="background: rgb(51,160,44)"></div>
                            </td>
                            <td align="left">
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
                        style="color: white;"
                        class="fa fa-bar-chart fa-3x"></i>
                </div>
                <div onclick="openPanel('#search_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% green;"><i
                        style="color: white;"
                        class="fa fa-search fa-3x"></i>
                </div>
                <div onclick="openPanel('#settings_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% cyan;"><i
                        style="color: white;"
                        class="fa fa-gear fa-3x"></i>
                </div>
                <div onclick="openPanel('#info_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% peru;"><i
                        style="color: white;"
                        class="fa fa-info fa-3x"></i>
                </div>
                <div onclick="openClosePanel('#settings_div')"
                     style="padding: 5px; text-align: center;  background: none repeat scroll 0% 0% gray;"><i
                        style="color: white;"
                        class="fa fa-exchange fa-3x"> </i>
                </div>
            </td>
            </tr>
        <tr>
            <td>
                <div id="search_result"
                     style="position: absolute; overflow-y: scroll; height: 500px; overflow: hidden; width:0px; height: 500px; overflow: scroll;"></div>
            </td>
        </tr>
        </tbody>
    </table>
</div>

<div style="position: fixed; top: 0px; right: 0px; z-index: 2999; width: auto; height: auto;">
    <table cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr>
            <td>
                <input type="text"
                       style="border-width: 0px 0px 1px; border-style: none none solid; border-color: -moz-use-text-color -moz-use-text-color gray; -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none; height: 26px; font-size: large; color: gray; max-width: 200px; float: left;"
                       id="search">

                <div style="text-align: center; background: none repeat scroll 0% 0% green; top: 0px; float: left; position: relative; padding: 2px 5px;"
                     onclick="openPanel('#search_div')"><i style="color: white;" class="fa fa-search fa-2x"></i>
                </div>

            <td>

                <div style="width: auto; right: 0px;" id="reference_maps">
                </div>
            </td>
        </tr>
        </tbody>
    </table>

</div>


<div id="canvas">



    <div id=chr_maps style="background: #eee9e9; height: 120px; position: relative;   width: 100%; ">

    </div>


    <div id="bar_image_ref"
         style="border-left: 1px solid #000000; border-right: 1px solid #000000; height: 10px; left: 0; position: relative; top: 30px; vertical-align: middle; width: 100%; z-index: 999;">


    </div>
    <div class="ui-draggable" id="bar_image_selector" style="left: 0px; position: relative; vertical-align: middle; z-index: 1999; color: green; -moz-user-select: none; font-size: 30pt; font-weight: lighter; width: 100px;">

        <table cellspacing="0" cellpadding="0" width="100%" border="0"><tbody><tr><td align="left">[</td><td align="right">]</td></tr></tbody></table>

    </div>

    <div id="selected_region"
         style=" background-color: #FFFFFF; border: 1px solid #000000;  height: 20px;  left: 1px;  position: relative; text-align: center; top: 10px; vertical-align: middle; width: 100%; z-index: 999;">

    </div>

    <div id="gene_tree_nj" style=" overflow: visible;   position: relative; left: 100px; top: 50px; width: 100%;">

    </div>
    <div style="height: auto; margin-left: auto; margin-right: auto; z-index: 1999; position: fixed;">


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

<div id="popup" class="bubbleleft" style="width:auto; padding: 10px">
    <span style="right:0; position:absolute;" class="ui-button ui-icon ui-icon-close" onclick=removePopup();></span>

   <br>

    <table>
        <tr>
            <td>
                <div id=gene_desc>

                </div>
            </td>
        </tr>
        <tr>
            <td align=right>
                <div style="float: right" id=makemetop_button>

                </div>



                <div style="float: right"  id=ensemblLink>

                </div>
            </td>
        </tr>
    </table>


</div>


<span id="ruler"></span>

<script>
    jQuery(document).ready(function () {
        kickOff();
        getReferences();
    });
</script>