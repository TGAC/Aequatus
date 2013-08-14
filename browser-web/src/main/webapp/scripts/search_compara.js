/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */


function search(query, from, to, jsonid, oldtracks) {
   console.log("search")
    ajaxurl = '/' + jQuery('#title').text() + '/' + jQuery('#title').text() + '/fluxion.ajax';
    jQuery('#sessioninput').fadeOut();
    jQuery("#sessionid").html("");
    minWidth = null;
    removeAllPopup();
    jQuery('#canvas').hide();
    jQuery('#tabGenes').html('');
    jQuery('#tabGO').html('');
    jQuery('#tabTranscripts').html('');

    jQuery("#searchresultHead").html("<img style='position: relative; left: 50%; ' src='./images/browser/loading_big.gif' alt='Loading'>");
    console.log("before fluxion")

    Fluxion.doAjax(
        'dnaSequenceService',
        'searchGenomeid',
        {'query': query, 'url': ajaxurl},
        {'doOnSuccess': function (json) {
            console.log(json)
            for (var i = 0; i < json.genomes.length; i++) {
                if (i == 0) {
                    content += "<table class='list' id='search_hit' ><thead><tr><th>SeqRegion</th><th>SeqRegion Id</th><th>Reference Name</th><th>Link</th></tr></thead>";
                }

                content += "<tr><td>" + json.genomes[i].Type + "<td> " + json.genomes[i].genome_db_id + "<td>" + json.genomes[i].name + " <td><a target='_blank' href='index.jsp?query=" + json.genomes[i].name + "' > <span title=\"Link\" class=\"ui-button ui-icon ui-icon-link\" </span><a/></td>";
                if (i == json.genomes.length - 1) {
                    content += "</table>";
                    jQuery("#searchresult").html(content);
                }

                jQuery("#search_hit").tablesorter();
            }
        }
        });
}