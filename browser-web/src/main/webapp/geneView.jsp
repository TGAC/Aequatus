<%--<%@ include file="header.jsp" %>--%>

<%--Control Panel Code--%>
<div id="control_panel">
    <table cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr valign=top>
            <td width="300px" id=control_divs>

                <div id="settings_div"
                     style="padding: 10px; height: 296px; background: none repeat scroll 0% 0% darkcyan; font-size: medium;">
                </div>

                <div id="search_div"
                     style="display: block; height: 296px; background: none repeat scroll 0% 0% green; padding: 10px;">
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
                <div style="display: none; background: none repeat scroll 0% 0% peru; padding: 10px; height: 296px; text-align: center; font-size: 15px;"
                     id="info_div">
                    <table width="100%" cellpadding="5px">
                        <tbody>
                        <tr>
                            <td colspan="2" align="left"><b>Help</b> <br>
                                &nbsp;&nbsp;&nbsp;&nbsp; <a target="_blank"
                                                            href="http://aequatus.earlham.ac.uk/aequatus-user-guide">
                                    User-guide </a></td>
                        </tr>
                        <tr>
                            <td align="left" colspan="2"><b> Tree and Gene Legends </b></td>
                        </tr>
                        <tr>
                            <td align=right>
                                <div class="circleBase type2" style="background: red;"></div>
                            </td>
                            <td align="left">
                                Duplication
                            </td>
                        </tr>
                        <tr>
                            <td align=right>
                                <div class="circleBase type2" style="background: cyan;"></div>
                            </td>
                            <td align="left">
                                Dubious
                            </td>
                        </tr>
                        <tr>
                            <td align=right>
                                <div class="circleBase type2" style="background: blue"></div>
                            </td>
                            <td align="left">
                                Speciation
                            </td>
                        </tr>
                        <tr>
                            <td align=right>
                                <div class="circleBase type2" style="background: pink"></div>
                            </td>
                            <td align="left">
                                Gene Split
                            </td>
                        </tr>

                        <tr>
                            <td align=right>
                                <div class="circleBase type2" style="background: white; border: 2px solid blue;"></div>
                            </td>
                            <td align="left">
                                Multiple events
                            </td>
                        </tr>
                        <tr>
                            <td align=right>
                                <svg version="1.1" width="55" height="14">
                                    <line x1="0" y1="6" x2="55" y2="6" id="Examplegeneline" stroke="green"
                                          stroke-width="1"/>
                                    <g class="style2">
                                        <rect x="2" y="1" width="51.087" height="10" rx="2" ry="2"
                                              id="exampleExonstyle2" fill="white" stroke="green" stroke-width="2"/>
                                    </g>

                                    <g id="examplestyle2CIGAR" class="style2 CIGAR">
                                        <rect x="2" y="1" width="33" height="10" rx="1" ry="1" fill="gray"
                                              class="utr1"/>
                                        <rect x="34.005102040816325" y="1" width="18.994897959183675" height="10" rx="1"
                                              ry="1" fill="rgb(166,206,227)" class="match"/>
                                    </g>
                                </svg>
                            </td>
                            <td align="left">UTR
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style="display: none; background: none repeat scroll 0% 0% orange; padding: 10px; height: 296px; text-align: left; font-size: medium;"
                     id="filter_div">
                    <b>Species list:</b>
                    <div id="filter"></div>
                    <div id="sliderfilter" style="text-align: left; margin-top: 10px">
                    </div>


                </div>
                <div id="export_div"
                     style="display: block; height: 296px; background: none repeat scroll 0% 0% rebeccapurple; padding: 10px; color: white">
                    <h4> Export </h4>
                    <div id="export_params"
                         style="color: white">

                    </div>
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
                        class="fa fa-bars fa-3x control-buttons fa-rotate-90"></i>
                </div>
                <div onclick="togglePanel('#search_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% green;"><i
                        style="color: white;"
                        class="fa fa-search fa-3x control-buttons"></i>
                </div>
                <div onclick="togglePanel('#settings_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% darkcyan;"><i
                        style="color: white;"
                        class="fa fa-cogs fa-3x control-buttons"></i>
                </div>
                <div onclick="togglePanel('#filter_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% orange;"><i
                        style="color: white;"
                        class="fa fa-filter fa-3x control-buttons"></i>
                </div>
                <div onclick="togglePanel('#export_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% rebeccapurple;"><i
                        style="color: white;"
                        class="fa fa-external-link fa-3x control-buttons"></i>
                </div>
                <div onclick="togglePanel('#info_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% peru;"><i
                        style="color: white;"
                        class="fa fa-question fa-3x control-buttons"></i>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="search_result"
                     style="position: absolute; overflow-y: scroll; height: 500px; overflow: hidden; width:0px; height: 500px; overflow: auto; background: transparent; text-align: center;"></div>
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
                    <button onclick="search_from_box()"
                            style="background: none repeat scroll 0% 0% green; height: 35px; top: 0px; border: 0px solid transparent;"
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

<%--Main Canvas Code--%>
<div id="canvas">

    <div id="genome_name"
         style="position: absolute; font-size: large; font-weight: bolder; padding: 10px; color: red; z-index: 999;;"></div>

    <div id=chr_maps style="border-bottom: 1px solid gray; height: 120px; position: relative;   width: 100%; ">

    </div>


    <div id="bar_image_ref"
         style="height: 10px; left: 0; position: relative; top: 25px; vertical-align: middle; width: 100%; z-index: 999; text-align:center">
    </div>
    <div class="ui-draggable" id="bar_image_selector"
         style="left: 0px; top: 13px; margin-bottom:15px; position: relative; font-family: Lucida Console; vertical-align: middle; z-index: 1999; height: 15px; outline: 4px solid darkolivegreen; ;color: green; -moz-user-select: none; font-size: 30pt; font-weight: lighter; width: 104px;">

        <%--<table cellspacing="0" cellpadding="0" width="100%" border="0">--%>
            <%--<tbody>--%>
            <%--<tr>--%>
                <%--<td align="left">[</td>--%>
                <%--<td align="right">]</td>--%>
            <%--</tr>--%>
            <%--</tbody>--%>
        <%--</table>--%>

    </div>

    <div id="selected_region_wrapper"
         style=" background-color: #FFFFFF; border: 1px solid #000000;  height: 20px;  left: 0px;  position: relative; text-align: center; top: 10px; vertical-align: middle; width: 100%; z-index: 999;">
        <div id="synteny_handle" style="position: absolute; right: 10px; z-index: 1999;"
             onClick="toggleLeftInfo(jQuery('#synteny_wrapper'), 'synteny_wrapper');">
            Toggle Synteny
        </div>
        <div id="selected_region"></div>

        <div id="redraw_buttons" style="display: none;">
            <button onclick="loadSyntenyfromSelector()">Load Synteny</button>

            <button onclick="setSelector()"> Reset Selector</button>
        </div>

    </div>
    <div id="tempSynteny_wrapper"
         style="width: 100%; left: 0%; position: relative; top: 20px; overflow: hidden;text-align: center; border: 1px solid transparent">
        <div id="tempSynteny" style="width: 100%; left: 0%; position: relative; top: 0px;" class="">
        </div>
    </div>

    <div id="synteny_wrapper"
         style="width: 100%; left: 0%; position: relative; top: 20px; overflow: hidden;text-align: center; border: 1px solid transparent"
         class="">
        <div id="synteny" style="width: 100%; left: 0%; position: relative; top: 0px;" class="">

        </div>
    </div>


    <div id="gene_tree_nj" style=" overflow: visible;   position: relative; top: 50px; width: 100%;" class="mainview">

    </div>

    <div id="homologies" style="width: 80%; left: 10%; position: relative; top: 50px;" class="mainview">
    </div>

    <div id="sankey" style="width: 80%; left: 10%; position: relative; top: 50px;" class="mainview">
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

<div id="sankey_info_wrapper" class="sankey_info">
    <div id="sankey_info_header">
        <table width="100%" cellspacing="0" border="0">
            <thead>
            <tr>
                <td bgcolor="darkcyan">
                    <div style="color: white; padding: 2px; width: 100%; text-align: center"
                         id="homology_type_header"><span
                            id="homology_type"></span>
                        <i onclick="removeSankeyPopup();" class="fa fa-close "
                           style="color: white; position: absolute; right: 5px; cursor: pointer; "></i>
                    </div>
                </td>
            </tr>
            </thead>
        </table>
    </div>
    <div id="sankey_info" style="margin: 10px">
    </div>
</div>

<div id="popup" class="bubbleleft" style="width:200px; height:auto;">
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
            <tr>
                <td>

                    <hr style="margin-bottom: 0px;margin-top: 0px;">
            <tr>
                <td>

                    <%--<div class="btn-group open">--%>

                    <div class="popup_menu" id="smartDomain"
                         onclick="jQuery('#smartDomainParams').toggle()"><span>Protein Domains <i
                            class="fa fa-caret-right" aria-hidden="true" style="float:right"></i></span></div>
                    <div class="popup_menu" id="smartDomainParams" style="display: none;">
                        <div class="popup_menu"
                             style="text-align: center; font-weight: bold; color: gray; padding: 5px;">
                            SMART parameters:
                        </div>
                        <hr style="margin-bottom: 0px;margin-top: 0px;">
                        <div class="popup_menu">
                            <label style="font-weight: normal;">
                                <input name="SMARTParams" type="checkbox" value="pfam"> <span
                                    title="Include Pfam">Pfam</span>
                            </label>
                        </div>
                        <div class="popup_menu">
                            <label style="font-weight: normal;">
                                <input name="SMARTParams" type="checkbox" value="signal"> <span
                                    title="Include signal peptide prediction">Signal peptide</span></label></div>
                        <div class="popup_menu">
                            <label style="font-weight: normal;">
                                <input name="SMARTParams" type="checkbox" value="repeat"> <span
                                    title="Include internal repeat predictions">Internal repeat</span>
                            </label>
                        </div>
                        <div class="popup_menu">
                            <label style="font-weight: normal;">
                                <input name="SMARTParams" type="checkbox" value="protein_disorder"> <span
                                    title="Include predictions of internal protein disorder">Internal protein disorder</span>
                            </label>
                        </div>
                        <div class="popup_menu">
                            <label style="font-weight: normal;">
                                <input name="SMARTParams" type="checkbox" value="out_homologous"> <span
                                    title="Include predictions of outlier homologues and homologues of known structures">Homologues</span>
                            </label>
                        </div>
                        <hr style="margin-bottom: 0px;margin-top: 0px;">
                        <div id="runSMART" style="text-align: center; font-weight: bold; color: gray; padding: 5px;">
                        </div>
                    </div>
            <tr>
                <td>

            <tr>
                <td>
                    <div class="popup_menu" id="exportSequenceLink" href="#"><i
                            class="fa  fa-fw"></i> Seq
                    </div>
            <tr>
                <td>
                    <div class="popup_menu" id="exportAlignmentLink" href="#"><i
                            class="fa  fa-fw"></i> Aln
                    </div>
            <tr>
                <td>

                    <div class="popup_menu" id="makemetop_button"></div>
            <tr>
                <td>

                    <div class="popup_menu" id="ensemblLink"></div>
            <tr>
                <td>

                    <div class="popup_menu" id="1to1Link"></div>

            </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
    </div>

</div>


<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel"
     id="exportModal" style=" z-index: 1999;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel"></h4>
            </div>
            <div class="modal-body">
                <div id="downloadButton">
                </div>
                <br>
                <div id="exportModal_content" style="width: 100%; word-wrap: break-word;">
                </div>
            </div>
        </div>
    </div>
</div>
<p id="besideMouse"></p>


<div id="info_popup_wrapper" style="display: none;">
    <div style="background: darkgrey none repeat scroll 0% 0%; height: 100%; width: 100%; position: fixed; opacity: 0.8;z-index: 1999;"
         onclick="removeInfoPopup()">
    </div>
    <div id="info-popup" class="popup"
         style="margin-left: auto; margin-right: auto; top: 100px; position: relative; background: white none repeat scroll 0% 0%; box-shadow: 5px 5px 5px gray; z-index: 2000; ">
        <div style="position: relative; left: 0px; top: 0px; width: 100%;">
            <table width="100%" cellspacing="0" border="0">
                <thead>
                <tr>
                    <td height="30px" bgcolor="darkcyan"><span style="color:white"> Pairwise Alignment </span>
                    </td>
                    <td width=20px bgcolor="darkcyan">
                        <i onclick="removeInfoPopup();" class="fa fa-close "
                           style="color: white;  cursor: pointer; top: 3px;">&nbsp;</i>
                    </td>
                </tr>
                </thead>
            </table>
        </div>

        <div style="overflow: hidden; left: 0px; position: relative; top: 10px; padding: 10px">
            <div id="pairwiseModal_type" style=" word-wrap: break-word;"></div>
        </div>
        <div style="overflow: hidden; left: 0px; position: relative; top: 10px; padding: 10px">
            <div id="pairwiseModal_content" style=" word-wrap: break-word;"></div>
        </div>

        <div style="position: relative; top: 10px; padding: 10px">
            Protein Alignment: <br>
            <div id="pairwise_alignment" style="font-family: monospace;"></div>
        </div>

    </div>
</div>


<div id="domain_popup_wrapper" style="display: none;">
    <div style="background: darkgrey none repeat scroll 0% 0%; height: 100%; width: 100%; position: fixed; opacity: 0.8;z-index: 1999;"
         onclick="removeDomainPopup()">
    </div>
    <div id="domain-popup" class="popup"
         style="margin-left: auto; margin-right: auto; top: 100px; position: relative; background: white none repeat scroll 0% 0%; box-shadow: 5px 5px 5px gray; z-index: 2000; ">
        <div style="position: relative; left: 0px; top: 0px; width: 100%;">
            <table width="100%" cellspacing="0" border="0">
                <thead>
                <tr>
                    <td height="30px" bgcolor="darkcyan"><span style="color:white"> Protein Domains </span>
                    </td>
                    <td width=20px bgcolor="darkcyan">
                        <i onclick="removeDomainPopup();" class="fa fa-close "
                           style="color: white;  cursor: pointer; top: 3px;">&nbsp;</i>
                    </td>
                </tr>
                </thead>
            </table>
        </div>

        <div style="overflow: hidden; left: 0px; position: relative; top: 10px; padding: 10px">
            <div id="domainModal_content" style=" word-wrap: break-word;">
                <table width="100%">
                    <tr>
                        <td colspan="2">
                            <div style=" left: 0px; position: relative; top: 0px; padding: 0px;">
                                <div id="domainHeader" style=" word-wrap: break-word;"></div>
                                <div id="domainLegends" style=" word-wrap: break-word;">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <b>Legends: </b>
                                            </td>
                                            <td>
                                                <div class="PFAM" style="width:50px;height:10px;"></div>
                                            </td>
                                            <td>
                                                PFAM domains
                                            </td>

                                            <td>
                                                <div class="SMART" style="width:50px;height:10px;"></div>
                                            </td>
                                            <td>
                                                SMART domains
                                            </td>
                                            <td>
                                                <div class="low_complexity_region"
                                                     style="width:50px;height:10px;"></div>
                                            </td>
                                            <td>
                                                Low Complexity Region
                                            </td>
                                            <td>
                                                <div class="internal_repeat" style="width:50px;height:10px;"></div>
                                            </td>
                                            <td>
                                                Internal Repeats
                                            </td>
                                            <td>
                                                <div class="signal_peptide" style="width:50px;height:10px;"></div>
                                            </td>
                                            <td>
                                                Signal Peptide
                                            </td>
                                            <td>
                                                <div class="INTRINSIC" style="width:50px;height:10px;"></div>
                                            </td>
                                            <td>
                                                Other Intrinsic Region
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div id="domainStructure"
                                 style=" word-wrap: break-word; overflow-y: scroll;height: 200px;"></div>

                        </td>
                    </tr>
                    <tr valign="top">
                        <td>
                            <div style="overflow: hidden; left: 0px; position: relative; top: 10px; padding: 10px">
                                <div id="visibleDomainList" style=" word-wrap: break-word;"></div>
                            </div>
                        </td>
                        <td>
                            <div style="overflow: hidden; left: 0px; position: relative; top: 10px; padding: 10px">
                                <div id="hiddenDomainList" style=" word-wrap: break-word;"></div>
                            </div>
                        </td>
                    </tr>
                </table>

            </div>
        </div>

    </div>
</div>

<p style="z-index:10; position:fixed;font-size: small;" id="besideMouse"></p>

<span id="ruler"></span>

<script>
    jQuery(document).ready(function () {
        setOff()
        kickOff();
    });
</script>