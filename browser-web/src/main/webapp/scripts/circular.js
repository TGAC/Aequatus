/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 13/08/2013
 * Time: 14:05
 * To change this template use File | Settings | File Templates.
 */



var left = 100;
var middle;

function drawCircle(x, y, id, title) {
    var svgdiv = jQuery('#svgcircle').svg('get');
    svgdiv.circle(middle, 400, x, {class:'genome',id: "circle_"+id, fill: y, opacity:0.7, title:title});
}

function drawLines(a, b) {
    var x2 =  parseInt(jQuery("#canvas").css("width")) / 10 * b;

    var svg = jQuery('#svgcircle').svg('get');

    var x = middle + (middle - 450) * Math.cos(a * Math.PI / 180);
    var y = 400 + (middle - 450) * Math.sin(a * Math.PI / 180);

    svg.line(middle, 400, x, y, {strokeWidth: 1, stroke: "#D3D3D3"});
    svg.line(x, y, x2, 0, {strokeWidth: 1, stroke: "#D3D3D3"});
}

function paths(x1,y1,x2,y2, l, s, c, title, id, r, ref) {
    var svg = jQuery('#svgcircle').svg('get');
    var path = svg.createPath();

    svg.path(path.move(x1, y1).arc(r - s - l / 2, r - s - l / 2, 30, false, true, x2, y2),
        {id:'trackcircle'+ref, title:title, class:'trackcircle', fill: 'none', stroke: c, strokeWidth: l});

}

function markers(x1,y1,x2,y2,id, svg){
    var diff = jQuery("#svgcircle").offset().top
    var x3 = jQuery("#"+id).offset().left
    var y3 = -1 * (diff - jQuery("#"+id).offset().top)

    var x4 = x3+jQuery("#"+id).width()
    var y4 = y3+jQuery("#"+id).height()

    svg.polygon([[x1,y1],[x2,y2],[x3,y3],[x4,y4]],
        {fill: 'lime', stroke: 'blue', strokeWidth: 0, opacity:0.4});
}

function initiate() {
    middle = parseInt(jQuery("#canvas").css("width")) / 2;
    jQuery('#svgcircle').svg();

    var length = jQuery('#genomes').children('option').length;
    var color = ["lightgray", "steelblue"]
    var r = parseInt((middle/2) / length);
    for(var i=0; i< length; i++){
        var id = jQuery('#genomes').children('option')[i].value;
        var title = jQuery('#genomes').children('option')[i].text;
        drawCircle((length-i)*r, color[i%2], id, title);
    }
    var a = 10;
    for (var i = 0; i >= -180; i = i - 18) {

        drawLines(i, a);
        a--;
    }
    drawCircle(middle - 750, 'black');

    jQuery('#clear').click(function() {
        jQuery('#svgcircle').svg('get').clear();
    });
    jQuery('#export').click(function() {
        var xml = jQuery('#svgcircle').svg('get').toSVG();
        jQuery('#svgexport').html(xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    });
}

function findAngle(x, length){

    var startposition = (x) * 180 / (length);
    console.log(x+","+ length+":"+startposition)
    return startposition;
}

function drawoncircle(x,y, l, id, ref, length){
    var svg = jQuery('#svgcircle').svg('get');


    if(x > y){
        var temp = y;
        x = y;
        y = temp;
    }

    var r = jQuery("#circle_"+ref).attr("r");

    var angle_x = findAngle(x, length);
    var angle_y = findAngle(y, length);

    var s = l*5;

    var x1 = middle + (r - (s + l / 2)) * Math.cos(angle_x * Math.PI / 180);
    var y1 = 400 + (r - (s + l / 2)) * Math.sin(angle_x * Math.PI / 180);

    var x2 = middle + (r - (s + l / 2)) * Math.cos(angle_y * Math.PI / 180);
    var y2 = 400 + (r - (s + l / 2)) * Math.sin(angle_y * Math.PI / 180);

    paths(x1,y1,x2,y2, 5, (l*5), "red", x+":"+y, id, r, ref);

    markers(x1,y1,x2,y2,id, svg);
}

function svgClear(){
    jQuery('#svgcircle').svg();
    jQuery('#svgcircle').svg('get').clear();
    initiate()
}

function screenshot(){
    var canvas = document.getElementById("trackssss");
    var img    = canvas.toDataURL("image/png");
    document.write('<img src="'+img+'"/>');
}