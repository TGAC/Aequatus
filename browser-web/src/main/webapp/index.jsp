<%@ include file="header.jsp" %>

<style type="text/css">
    .css_def {
        position: absolute;
    }

</style>

<%--<div id="searchseqregioninput">--%>
<%--<input type="text" id="search" value="scaffold1.1-size1749886"/>--%>
<%--<button class="ui-state-default ui-corner-all" onclick="search(jQuery('#search').val());">Search Seq Region Name--%>
<%--</button>--%>
<%--</div>--%>




<div id="mainsearch" style="top : 10px; width:100%; height:100%; "></div>



<script type="text/javascript">


    jQuery(document).ready(function() {

        jQuery("#mainsearch").load("geneView.jsp", function() {
        });
    });






</script>


<%@ include file="footer.jsp" %>

