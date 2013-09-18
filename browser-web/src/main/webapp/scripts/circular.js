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
//  svg.line(x2, 250, x2, 0, {strokeWidth: 1, stroke: "gray"});
}

function paths(a, b, l, s, c, title, id, r, ref) {


    var svg = jQuery('#svgcircle').svg('get');
    var path = svg.createPath();



    var x1 = middle + (r - (s + l / 2)) * Math.cos(a * Math.PI / 180);
    var y1 = 400 + (r - (s + l / 2)) * Math.sin(a * Math.PI / 180);

    var x2 = middle + (r - (s + l / 2)) * Math.cos(b * Math.PI / 180);
    var y2 = 400 + (r - (s + l / 2)) * Math.sin(b * Math.PI / 180);


    svg.path(path.move(x1, y1).arc(middle - s - l / 2, middle - s - l / 2, 30, false, true, x2, y2),
        {id:'trackcircle'+ref, title:title, class:'trackcircle', fill: 'none', stroke: c, strokeWidth: l});

//svg.path(path.move(x1, y1).curveC(x1, y1, (x1+x2)/2, (y1+y2)/2, x2, y2),
    //  {fill: 'none', stroke: '#D90000', strokeWidth: 2});

}

function markers(a, b, l, s, c, title, id, r, ref){
    var svg = jQuery('#svgcircle').svg('get');

    var x1 = middle + (r - (s + l / 2)) * Math.cos(a * Math.PI / 180);
    var y1 = 400 + (r - (s + l / 2)) * Math.sin(a * Math.PI / 180);

    var x2 = middle + (r - (s + l / 2)) * Math.cos(b * Math.PI / 180);
    var y2 = 400 + (r - (s + l / 2)) * Math.sin(b * Math.PI / 180);

    var diff = jQuery("#svgcircle").offset().top
    var x3 = jQuery("#"+id).offset().left
    var y3 = -1 * (diff - jQuery("#"+id).offset().top)

    var x4 = y3+jQuery("#"+id).height()
    var y4 = x3+jQuery("#"+id).width()

    svg.polygon([[x1,y1],[x2,y2],[x3,y3],[y4,x4]],
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

function findAngle(x){

    var startposition = -180+(x - getBegin()) * 180 / (getEnd() - getBegin());

    return startposition;
}

function drawoncircle(x,y, l, id, ref){
//    if(x < getBegin()){x = getBegin()}
//    if(y > getEnd()){y = getEnd()}
    if(x > y){
        var temp = y;
        x = y;
        y = temp;
    }


    var r = jQuery("#circle_"+ref).attr("r");
    paths(findAngle(x), findAngle(y), 5, (l*5), "blue", x+":"+y, id, r, ref);

    markers(findAngle(x), findAngle(y), 5, (l*5), "blue", x+":"+y, id, r, ref);

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