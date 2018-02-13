<?xml version="1.0" encoding="UTF-8" ?>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-gb">
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

    <%--jquery--%>
    <script type="text/javascript" src="<c:url value='/scripts/jquery/js/jquery-1.11.2.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/jquery/js/jquery-ui-1.11.2.js'/>"></script>
    <%--<script type="text/javascript" src="<c:url value='/scripts/jquery/js/jquery.cookie.js'/>"></script>--%>
    <script type="text/javascript" src="<c:url value='/scripts/jquery/js/jquery-migrate-1.2.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/toSource.js'/>"></script>

    <%--jQuery DataTables--%>
    <link rel="stylesheet" type="text/css" href="<c:url value='styles/DataTables/datatables.min.css' />">
    <%--<link rel="stylesheet" type="text/css" href="<c:url value='styles/DataTables/buttons.dataTables.min.css' />">--%>
    <script type="text/javascript" src="<c:url value='/scripts/DataTables/datatables.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/DataTables/dataTables.buttons.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/DataTables/buttons.html5.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/DataTables/pdfmake.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/DataTables/buttons.print.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/DataTables/jszip.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/DataTables/vfs_fonts.js'/>"></script>

    <%--bootstrap--%>
    <script type="text/javascript" src="<c:url value='/styles/bootstrap-css/bootstrap.js'/>"></script>
    <link rel="stylesheet" href="<c:url value='/styles/bootstrap-css/bootstrap.css'/>" type="text/css">
    <link rel="stylesheet" href="<c:url value='/styles/bootstrap-css/bootstrap-theme.min.css'/>" type="text/css">

    <%--font awesome--%>
    <link rel="stylesheet" href="<c:url value='/styles/font-awesome-4.7.0/css/font-awesome.min.css'/>" type="text/css">

    <%--Fluxion--%>
    <script type="text/javascript" src="<c:url value='/scripts/scriptaculous/prototype.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/fluxion-ajax/fluxion-ajax-compiled.js'/>"></script>

    <%--D3--%>
    <script src="<c:url value='/scripts/d3.js/d3.v3.min.js'/>"></script>
    <script src="<c:url value='/scripts/d3.js/d3.tip.v0.6.3.js'/>"></script>
    <script src="<c:url value='/scripts/d3.js/sankey.js'/>"></script>

    <%--jquery UI--%>
    <link rel="stylesheet" href="<c:url value='/scripts/jquery/css/smoothness/jquery-ui-1.11.2.css'/>" type="text/css">

    <%--Aequatus-vis Scripts--%>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/init.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/geneView.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/drawGene.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/drawGeneExonOnly.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/drawCIGARs.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/util.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/d3_tree.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/cigarUtils.js'/>"></script>
    <script type="text/javascript" src="<c:url value='aequatus-vis/scripts/underscore/underscore-min.js'/>"></script>
    <link rel="stylesheet" href="<c:url value='aequatus-vis/styles/style.css'/>" type="text/css">


    <%--Aequatus Scripts--%>
    <script type="text/javascript" src="<c:url value='/scripts/search_compara.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/geneView.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/natural-sort.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/controls.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/popup.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/init.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/download.js'/>"></script>
    <script type="text/javascript" src="<c:url value='scripts/smart-domain.js'/>"></script>
    <script type="text/javascript" src="<c:url value='scripts/drawDomain.js'/>"></script>
    <script type="text/javascript" src="<c:url value='scripts/search_homologues.js'/>"></script>
    <script type="text/javascript" src="<c:url value='scripts/prepare_sankey_json.js'/>"></script>
    <script type="text/javascript" src="<c:url value='scripts/draw_sankey.js'/>"></script>


    <%--Aequatus CSS--%>
    <link REL="SHORTCUT ICON" href="<c:url value='/images/EI_favicon.jpg'/>">
    <link rel="stylesheet" href="<c:url value='/styles/style.css'/>" type="text/css">


    <%--jQuery SVG--%>
    <link rel="stylesheet" type="text/css" href="<c:url value='scripts/jquery/jquery.svg.css' />">
    <script type="text/javascript" src="<c:url value='/scripts/jquery/js/jquery.svg.js'/>"></script>



    <script type="text/javascript">jQuery.noConflict();</script>

    <title>${initParam.pageTitle}</title>

</head>
<body>


<div class="headerbar">
    <center>
        <div style="position: absolute; top: 50%; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%);  transform: translateY(-50%);">
            <a class="headerlink" href="<c:url value="/"/>"> <font color=white> Aequatus Browser
                - ${initParam.header} </font></a>
        </div>
    </center>


</div>

<div id="title" style="visibility: hidden; position: fixed;">${initParam.urlpath}</div>

<script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-21666189-7']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();

</script>

<div id="content" style="clear: both; height: 100%;   position: absolute;    width: 100%;">