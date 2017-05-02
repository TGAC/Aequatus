<%--<%@ include file="header.jsp" %>--%>

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
                                                            href="http://aequatus.tgac.ac.uk/aequatus-user-guide">
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
                <div style="display: none; background: none repeat scroll 0% 0% orange; padding: 10px; height: 296px; text-align: center; font-size: medium;"
                     id="filter_div">
                    <b>Species list:</b>
                    <div id="filter"></div>
                    <div id="sliderfilter" style="text-align: left; margin-top: 10px">
                    </div>


                </div>
                <div id="export_div"
                     style="display: block; height: 296px; background: none repeat scroll 0% 0% rebeccapurple; padding: 10px; color: white">

                    <table>
                        <thead>
                        <th colspan="3">
                            <h4> Export </h4>
                        </th>
                        </thead>
                        <tr class="border_bottom">
                            <td colspan="3">
                                Tree
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Newick <br>
                                <a class="btn btn-small" href="#" onclick="exportGeneTree('newick')"> <i
                                        style="color: white " class="fa fa-download"></i></a>
                                </a>
                            </td>
                            <td>
                                JSON Format <br>
                                <a class="btn btn-small" href="#" onclick="exportGeneTree('json')"> <i
                                        style="color: white" class="fa fa-download"></i></a>
                                </a>
                            </td>
                        </tr>
                        <tr class="border_bottom">
                            <td colspan="3">
                                Genes:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gene IDs<br>
                                <a class="btn btn-small" href="#" onclick="exportGeneLabel('.stable')"> <i
                                        style="color: white" class="fa fa-download"></i></a>
                                </a>
                            </td>
                            <td>
                                Gene Name<br>
                                <a class="btn btn-small" href="#" onclick="exportGeneLabel('.geneinfo')"> <i
                                        style="color: white" class="fa fa-download"></i></a>
                                </a>
                            </td>
                            <td>
                                Protein IDs<br>
                                <a class="btn btn-small" href="#" onclick="exportGeneLabel('.protein_id')"> <i
                                        style="color: white" class="fa fa-download"></i></a>
                                </a>
                            </td>
                        </tr>
                        <tr class="border_bottom">
                            <td colspan="3">
                                Alignment
                            </td>
                        </tr>
                        <tr>
                            <td>
                                CIGAR format<br>
                                <a class="btn btn-small" href="#" onclick="exportAlignment()"> <i style="color: white "
                                                                                                  class="fa fa-download"></i></a>
                                </a>
                            </td>
                            <td>
                                Sequence<br>
                                <a class="btn btn-small" href="#" onclick="exportSequence()"> <i style="color: white"
                                                                                                 class="fa fa-download"></i></a>
                                </a>
                            </td>
                        </tr>
                    </table>

                    <%--<input type="radio" name="output_selection" value="all"> All Genes--%>
                    <%--<input type="radio" name="output_selection" value="selected" checked> Visible Genes--%>
                    <br>

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
                <div onclick="openPanel('#filter_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% orange;"><i
                        style="color: white;"
                        class="fa fa-filter fa-3x control-buttons"></i>
                </div>
                <div onclick="openPanel('#export_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% rebeccapurple;"><i
                        style="color: white;"
                        class="fa fa-external-link fa-3x control-buttons"></i>
                </div>
                <div onclick="openPanel('#info_div')"
                     style="padding: 5px; text-align: center; background: none repeat scroll 0% 0% peru;"><i
                        style="color: white;"
                        class="fa fa-question fa-3x control-buttons"></i>
                </div>
                <%--<div onclick="openClosePanel('#settings_div')"--%>
                <%--style="padding: 5px; text-align: center;  background: none repeat scroll 0% 0% gray;"><i--%>
                <%--style="color: white;"--%>
                <%--class="fa fa-exchange fa-3x control-buttons"> </i>--%>
                <%--</div>--%>
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


<div id="canvas">

    <div id="genome_name"
         style="position: absolute; font-size: large; font-weight: bolder; padding: 10px; color: red; z-index: 999;;"></div>

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
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <%--<div id="exportSequenceLink" style="float: right" title="Export Sequence"></div>--%>
                            <%--</td>--%>
                            <%--<td>--%>
                                <%--<div id="exportAlignmentLink" style="float: right" title="Export Alignment"></div>--%>
                                    <div class="btn-group open">
                                        <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-external-link fa-fw"></i> </a>
                                        <ul class="dropdown-menu">
                                            <li><a id="exportSequenceLink" href="#" title="Export Sequence"><i class="fa  fa-fw"></i> Seq </a></li>
                                            <li class="divider"></li>
                                            <li><a id="exportAlignmentLink" href="#" title="Export Alignment"><i class="fa  fa-fw"></i> Aln</a></li>
                                            <li><a id="smartDomain" href="#" title="Export Alignment"><i class="fa  fa-fw"></i> Domain</a></li>
                                        </ul>
                                        <div id="makemetop_button" style="float: right" title="Change Reference to"></div>
                                        <div id="ensemblLink" style="float: right" title="Link to Ensembl"></div>
                                        <div id="1to1Link" style="float: right" title="1 to 1 Alignment"></div>

                                    </div>
                            </td>
                            <%--<td>--%>
                                <%--<div id="makemetop_button" style="float: right" title="Change Reference to"></div>--%>

                            <%--</td>--%>
                            <%--<td>--%>
                                <%--<div id="ensemblLink" style="float: right" title="Link to Ensembl"></div>--%>
                            <%--</td>--%>
                            <%--<td>--%>
                                <%--<div id="1to1Link" style="float: right" title="1 to 1 Alignment"></div>--%>
                            <%--</td>--%>
                        </tr>
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

<%--<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" id="pairwiseModal" style=" z-index: 1999;">--%>
<%--<div class="modal-dialog modal-lg" role="document">--%>
<%--<div class="modal-content">--%>
<%--<div class="modal-header">--%>
<%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span--%>
<%--aria-hidden="true">&times;</span></button>--%>
<%--<h4 class="modal-title"></h4>--%>
<%--</div>--%>
<%--<div class="modal-body">--%>

<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<div id="info_popup_wrapper" style="display: none;">
    <div style="background: darkgrey none repeat scroll 0% 0%; height: 100%; width: 100%; position: fixed; opacity: 0.8;z-index: 1999;" onclick="removeInfoPopup()">
    </div>
    <div id="info-popup" class="popup"
         style="margin-left: auto; margin-right: auto; top: 100px; position: relative; background: white none repeat scroll 0% 0%; box-shadow: 5px 5px 5px gray; z-index: 2000; ">
        <div style="position: relative; left: 0px; top: 0px; width: 100%;">
            <table width="100%" cellspacing="0" border="0">
                <thead>
                <tr>
                    <td  height="30px" bgcolor="darkcyan"><span style="color:white"> Pairwise Alignment </span>
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
            <div id="pairwiseModal_content" style=" word-wrap: break-word;"></div>
        </div>

        <div style="position: relative; top: 10px; padding: 10px">
            Protein Alignment: <br>
            <div id="pairwise_alignment" style="font-family: monospace;"></div>
        </div>

    </div>
</div>


<div id="domain_popup_wrapper" style="display: none;">
    <div style="background: darkgrey none repeat scroll 0% 0%; height: 100%; width: 100%; position: fixed; opacity: 0.8;z-index: 1999;" onclick="removeInfoPopup()">
    </div>
    <div id="domain-popup" class="popup"
         style="margin-left: auto; margin-right: auto; top: 100px; position: relative; background: white none repeat scroll 0% 0%; box-shadow: 5px 5px 5px gray; z-index: 2000; ">
        <div style="position: relative; left: 0px; top: 0px; width: 100%;">
            <table width="100%" cellspacing="0" border="0">
                <thead>
                <tr>
                    <td  height="30px" bgcolor="darkcyan"><span style="color:white"> Protein Domains </span>
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
                            <div style="overflow: hidden; left: 0px; position: relative; top: 0px; padding: 0px; height: 160px">
                                <div id="domainHeader" style=" word-wrap: break-word;"></div>
                                <div id="domainStructure" style=" word-wrap: break-word;"></div>
                            </div>
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





        <%--<div style="position: relative; top: 10px; padding: 10px">--%>
            <%--Protein Alignment: <br>--%>
            <%--<div id="pairwise_alignment" style="font-family: monospace;"></div>--%>
        <%--</div>--%>

    </div>
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