<%--<%@ include file="header.jsp" %>--%>

<div id="control_panel"
     style="top: 100px;position: fixed; height: auto; left: -300px; z-index: 2999">
    <table cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr valign=top>
            <td width="300px" id=control_divs>


                <div style="display: none; padding: 10px; height: 248px; background: none repeat scroll 0% 0% cyan; font-size: large;"
                     id="settings_div">

                    <%--<div class="checkbox">--%>
                    <%--<label>--%>
                    <%--<input id="deleteCheck" type="checkbox" checked="" onclick="jQuery('.delete').toggle()">--%>
                    <%--Deletion--%>
                    <%--</label>--%>
                    <%--<label>--%>
                    <%--<input id="insertCheck" type="checkbox" checked="" onclick="jQuery('.insert').toggle()">--%>
                    <%--Insertion--%>
                    <%--</label>--%>
                    <%--<label>    <input id="matchCheck" type="checkbox" checked="" onclick="jQuery('.match').toggle()">--%>
                    <%--Match--%>
                    <%--</label>--%>

                    <%--</div>--%>


                    <input id="deleteCheck" type="checkbox" checked="" onclick="jQuery('.delete').toggle()"
                           style="width: 25px; height: 25px; color: white; background: none repeat scroll 0% 0% red; border: 0px none;">
                    Deletion <br>
                    <input id="insertCheck" type="checkbox" checked="" onclick="jQuery('.insert').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    Insertion <br>
                    <input id="matchCheck" type="checkbox" checked="" onclick="jQuery('.match').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    Match <br>
                    <input id="utrCheck" type="checkbox" checked="" onclick="jQuery('.utr').toggle()"
                           style="width: 25px; height: 25px; background: none repeat scroll 0% 0% white; color: white;">
                    UTRs <br>

                    <br>
                    Label
                    <br>
                    <input type="radio" onchange=" changeToStable()" value="stable" checked="" name="label_type"
                           checked>
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

                    <div style="position: absolute; top: 200px; text-align: center; width: 300px; color: white; font-weight: lighter; font-size: small;">
                        Search History:
                        <span id="search_history" style="font-size: medium; font-weight: lighter;cursor: pointer;"
                              onclick="jQuery('#search').val(jQuery('#search_history').html()); jQuery('#search_history').html(jQuery('#control_search').val());jQuery('#control_search').val(jQuery('#search').val()); search_member(jQuery('#control_search').val());">

                        </span>
                    </div>
                </div>
                <div style="display: none; background: none repeat scroll 0% 0% peru; padding: 10px; height: 248px; text-align: center; font-size: 20px;"
                     id="info_div">
                    <table width="50%" cellpadding=5px>
                        <tbody>
                        <tr>
                            <td align="left" colspan="2"><b> Tree Legends </b></td>
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
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for..." id="search"
                           style="box-sizing: border-box; height: 35px;">
                    <span class="input-group-btn">
                            <button style="background: none repeat scroll 0% 0% green; height: 35px; top: 0px; border: 0px solid transparent;"
                                    class="btn btn-default" type="button"><i class="fa fa-search fa-1x"
                                                                             style="color: white;"></i></button>
                        </span>
                </div>
            </td>
            <td>
                <div>
                    <div style="width: auto; right: 0px;" id="reference_maps">
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>

</div>


<div id="canvas">

    <div id="genome_name" style="position: absolute; font-size: large; font-weight: bolder; padding: 10px; color: darkgray;"></div>

    <div id=chr_maps style="border-bottom: 1px solid gray; height: 120px; position: relative;   width: 100%; ">

    </div>


    <div id="bar_image_ref"
         style="border-left: 1px solid #000000; border-right: 1px solid #000000; height: 10px; left: 0; position: relative; top: 25px; vertical-align: middle; width: 100%; z-index: 999;">
    </div>
    <div class="ui-draggable" id="bar_image_selector"
         style="left: 0px; position: relative; font-family: Lucida Console; vertical-align: middle; z-index: 1999; color: green; -moz-user-select: none; font-size: 30pt; font-weight: lighter; width: 100px;">

        <table cellspacing="0" cellpadding="0" width="100%" border="0">
            <tbody>
            <tr>
                <td align="left">[</td>
                <td align="right">]</td>
            </tr>
            </tbody>
        </table>

    </div>

    <div id="selected_region"
         style=" background-color: #FFFFFF; border: 1px solid #000000;  height: 20px;  left: 1px;  position: relative; text-align: center; top: 10px; vertical-align: middle; width: 100%; z-index: 999;">

    </div>

    <div id="gene_tree_nj" style=" overflow: visible;   position: relative; top: 50px; width: 100%;">

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

<div id="popup" class="bubbleleft" style="width:200px; padding: 10px; height:auto; max-height:150px;">
    <span style="right:0; position:absolute;" class="ui-button ui-icon ui-icon-close" onclick=removePopup();></span>

    <br>

    <table cellspacing="0" border="0">
        <thead>
        <tr>
            <td>
                <div id="disp_label"></div>
            </td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <div id="ref_name"></div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="position"></div>
            </td>
        </tr>

        <tr>
            <td>
                <div id="gene_desc"></div>
            </td>
        </tr>
        <tr align="right">
            <td align="">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <div id="makemetop_button" style="float: right"></div>

                        </td>
                        <td>
                            <div id="ensemblLink" style="float: right"></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>


</div>

<p style="z-index:10; position:fixed;font-size: small;" id="besideMouse"></p>


<span id="ruler"></span>

<script>
    jQuery(document).ready(function () {
        kickOff();
        getUrlVariables()
    });
</script>