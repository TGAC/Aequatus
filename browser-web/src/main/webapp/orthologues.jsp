<%@ include file="header.jsp" %>

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
                    <button onclick="jQuery('#search_history').html(jQuery('#search').val()); jQuery('#search').val(jQuery('#control_search').val()); search_orthologues(jQuery('#control_search').val());"
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
                        </tbody>
                    </table>
                </div>
                <div style="display: none; background: none repeat scroll 0% 0% orange; padding: 10px; height: 296px; text-align: center; font-size: medium;"
                     id="filter_div">
                    <b>Filter By:</b>
                    <div id="filter"></div>
                </div>
                <div id="export_div"
                     style="display: block; height: 296px; background: none repeat scroll 0% 0% rebeccapurple; padding: 10px; color: white">

                    <table>
                        <thead>
                        <th colspan="3">
                            <h4> Export </h4>
                        </th>
                        </thead>
                    </table>
                    <br>
                </div>
            </td>
            <td width="50px">
                <div style="padding: 5px; text-align: center; cursor: move; background: none repeat scroll 0% 0% slategrey; color: white;"
                     id="control_panel_handle">
                    <b> ... </b>
                </div>
                <%--<div onclick="toggleLeftInfo(jQuery('#Chrdiv_arrowclick'), 'chr_maps');"--%>
                     <%--style="text-align: center; padding: 5px; background: none repeat scroll 0% 0% steelblue;"><i--%>
                        <%--style="color: white;"--%>
                        <%--class="fa fa-bars fa-3x control-buttons fa-rotate-90"></i>--%>
                <%--</div>--%>
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
                            <button onclick="search_from_orthologues_box()"
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

<div id="orthologies" style="width: 80%; left: 10%; position: absolute; top: 50px;">
    </div>
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

<%@ include file="footer.jsp" %>
<script>
    jQuery(document).ready(function () {
        setOrthologuesEvents();
        kickOff();
    });
</script>