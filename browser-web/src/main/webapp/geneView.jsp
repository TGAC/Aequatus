<%--<%@ include file="header.jsp" %>--%>

<div id="control_panel"
     style="top: 100px;position: fixed; height: auto; left: -300px; z-index: 2999">
    <table cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr valign=top>
            <td width="300px" id=control_divs>

                <div id="settings_div"
                     style="padding: 10px; height: 248px; background: none repeat scroll 0% 0% darkcyan; font-size: large;">

                    <div class="checkbox">


                        <table width="75%" cellpadding="2px">
                            <tbody>
                            <tr>
                                <td align="left" colspan="2"><b> Visual Controls </b></td>
                            </tr>
                            <tr>
                                <td align="left">
                                    <label>
                                        <input type="checkbox" onclick="jQuery('.delete').toggle()" checked=""
                                               id="deleteCheck">
                                    </label>

                                    Deletion

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input type="checkbox" onclick="jQuery('.insert').toggle()" checked=""
                                               id="insertCheck">
                                    </label>

                                    Insertion

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label> <input type="checkbox" onclick="jQuery('.match').toggle()" checked=""
                                                   id="matchCheck">
                                    </label>

                                    Match

                                </td>
                            </tr>

                            <tr>
                            <tr></tr>

                            <td align="left" colspan="2"><b> Label </b></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="label_type"  value="stable"
                                           onchange=" changeToStable()">
                                    Stable Id
                                </td>
                                <td align="left">
                                    <input type="radio" name="label_type" checked="" value="gene_info"
                                           onchange=" changeToGeneInfo()"> Gene Info

                                </td>
                            </tr>

                            <tr>
                                <td align="left" colspan="2"><b> Introns </b></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="view_type" checked="" value="with"
                                           onchange="changeToNormal()">
                                    With
                                </td>
                                <td align="left">
                                    <input type="radio" name="view_type" value="without" onchange="changeToExon()">
                                    Without

                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
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
                    <table width="100%" cellpadding="5px" >
                        <tbody>
                        <tr>
                            <td colspan="2" align="left" > <b>Help</b> <br>
                                &nbsp;&nbsp;&nbsp;&nbsp; <a target="_blank" href = "http://browser.tgac.ac.uk/aequatus-user-guide">  User-guide </a> </td>
                        </tr>  <tr>
                            <td align="left" colspan="2"><b> Tree Legends </b></td>
                        </tr>
                        <tr>
                            <td>
                                <div style="background: rgb(166,206,227);" class="circleBase type2"></div>
                            </td>
                            <td align="left">
                                Duplication
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="background: rgb(31,120,180);" class="circleBase type2"></div>
                            </td>
                            <td align="left">
                                Dubious
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="background: rgb(178,223,138)" class="circleBase type2"></div>
                            </td>
                            <td align="left">
                                Speciation
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="background: rgb(51,160,44)" class="circleBase type2"></div>
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
                        class="fa fa-bar-chart fa-3x control-buttons"></i>
                </div>
                <div onclick="openPanel('#search_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% green;"><i
                        style="color: white;"
                        class="fa fa-search fa-3x control-buttons"></i>
                </div>
                <div onclick="openPanel('#settings_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% darkcyan;"><i
                        style="color: white;"
                        class="fa fa-cogs fa-3x control-buttons"></i>
                </div>
                <div onclick="openPanel('#info_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% peru;"><i
                        style="color: white;"
                        class="fa fa-question fa-3x control-buttons"></i>
                </div>
                <div onclick="openClosePanel('#settings_div')"
                     style="padding: 5px; text-align: center;  background: none repeat scroll 0% 0% gray;"><i
                        style="color: white;"
                        class="fa fa-exchange fa-3x control-buttons"> </i>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="search_result"
                     style="position: absolute; overflow-y: scroll; height: 500px; overflow: hidden; width:0px; height: 500px; overflow: auto; background: transparent;"></div>
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
                            <button onclick="search_from_box()" style="background: none repeat scroll 0% 0% green; height: 35px; top: 0px; border: 0px solid transparent;"
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

    <div id="genome_name"
         style="position: absolute; font-size: large; font-weight: bolder; padding: 10px; color: darkgray;"></div>

    <div id=chr_maps style="border-bottom: 1px solid gray; height: 120px; position: relative;   width: 100%; ">

    </div>


    <div id="bar_image_ref"
         style="border-left: 1px solid #000000; border-right: 1px solid #000000; height: 10px; left: 0; position: relative; top: 25px; vertical-align: middle; width: 100%; z-index: 999; text-align:center">
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

<div id="popup" class="bubbleleft" style="width:200px; height:130px;">
    <div style="overflow: hidden; left: 0px; top: 0px; position: relative;">
        <table width="100%" cellspacing="0" border="0">
            <thead>
            <tr>
                <td bgcolor="darkcyan">
                    <div style="color: white; padding: 2px; width: 100%;" id="stable_id_header"><span
                            id="stable_label"></span>
                        <i onclick="removePopup();" class="fa fa-close "
                           style="color: white; position: absolute; right: 5px; cursor: pointer; "></i>
                    </div>
                </td>
            </tr>
            </thead>
        </table>

    </div>
    <div style="position: relative; padding: 5px;">
        <table width=100% cellspacing="0" border="0">
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
                    <table >
                        <tbody>
                        <tr>
                            <td>
                                <div id="makemetop_button" style="float: right" title="Change Reference to"></div>

                            </td>
                            <td>
                                <div id="ensemblLink" style="float: right" title="Link to Ensembl"></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</div>

<p style="z-index:10; position:fixed;font-size: small;" id="besideMouse"></p>


<span id="ruler"></span>

<script>
    jQuery(document).ready(function () {
        kickOff();
        getUrlVariables()
    });
</script>