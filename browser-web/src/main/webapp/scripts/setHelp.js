/**
 * Created by thankia on 22/11/2018.
 */

function setGeneTreeHelp() {

    console.log("here")
    jQuery("#help_div").html("")

    var table = jQuery("<table cellpadding='2px'></table>");

    var row1 = jQuery("<tr></tr>");
    var column1 = jQuery("<td colspan=2><b> Tree and Gene Legends </b></td>");

    row1.append(column1)

    table.append(row1);

    var row2 = jQuery("<tr></tr>");
    var column1 = jQuery("<td><div class='circleBase type2' style='background: red;'></div></td>");

    row2.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("Duplication");
    row2.append(column2);
    table.append(row2);

    console.log("here3")

    var row3 = jQuery("<tr></tr>");
    var column1 = jQuery("<td><div class='circleBase type2' style='background: cyan;'></div></td>");


    row3.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("Dubious");
    row3.append(column2);
    table.append(row3);
    console.log("here4")

    var row4 = jQuery("<tr></tr>");
    var column1 = jQuery("<td><div class='circleBase type2' style='background: blue;'></div></td>");

    row4.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("Speciation");
    row4.append(column2);
    table.append(row4);
    console.log("here5")


    var row5 = jQuery("<tr></tr>");
    var column1 = jQuery("<td><div class='circleBase type2' style='background: red;'></div></td>");

    row5.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("Duplication");
    row5.append(column2);
    table.append(row5);
    console.log("here6")

    var row6 = jQuery("<tr></tr>");
    var column1 = jQuery("<td><div class='circleBase type2' style='background: pink;'></div></td>");

    row6.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("Gene split");
    row6.append(column2);
    table.append(row6);

    console.log("here7")

    var row7 = jQuery("<tr></tr>");
    var column1 = jQuery("<td><div class='circleBase type2' style='background: white; border: 2px solid blue;'></div></td>");

    row7.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("Multiple events");
    row7.append(column2);
    table.append(row7);

    var row8 = jQuery("<tr></tr>");
    var column1 = jQuery("<td></td>");
    column1.html("<svg version='1.1' width='55' height='14px'> " +
        " <line x1='0' y1='6' x2='55' y2='6' id='Examplegeneline' stroke='green'" +
        " stroke-width='1'/>" +
        "  <g class='style2'> " +
        " <rect x='2' y='1' width='51.087' height='10' rx='2' ry='2'" +
        "id='exampleExonstyle2' fill='white' stroke='green' stroke-width='2'/>" +
        " </g>        <g id='examplestyle2CIGAR' class='style2 CIGAR'> " +
        " <rect x='2' y='1' width='33' height='10' rx='1' ry='1' fill='gray'class='utr1'/> " +
        " <rect x='34.005102040816325' y='1' width='18.994897959183675' height='10' rx='1' ry='1' fill='rgb(166,206,227)' class='match'/>" +
        " </g> " +
        " </svg>");
    row8.append(column1)

    var column2 = jQuery("<td></td>");
    column2.html("UTR");
    row8.append(column2);
    table.append(row8);


    jQuery("#help_div").html(table)

}

function setHomologyTableHelp() {
    jQuery("#help_div").html("")
}

function setHomologySankeyHelp() {
    jQuery("#help_div").html("")
}

