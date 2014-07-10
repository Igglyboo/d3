var width = 500;
var height = 500;
var circle_attr = {cx: width/2, cy: height/2, r: 249};
var new_pos = function(degrees){
    var radians = degrees * (Math.PI/180);
    return{
        cx: circle_attr.cx + ((circle_attr.r - 10) * Math.cos(radians)),
        cy: circle_attr.cy + ((circle_attr.r - 10) * Math.sin(radians))
    };
};
var svg = d3.select("body").append("svg").attr({width: width, height: height}).style("border", "solid black 16px").style("border-radius", "32px").style("background-color", "steelblue ");
//var circle = svg.append("circle").attr(circle_attr).style({"fill": "steelblue "});
var hands = svg.selectAll("line").data([new Date().getMinutes(), new Date().getSeconds(), new Date().getHours()]).enter()
    .append("line").attr({
    x1: circle_attr.cx,
    y1: circle_attr.cy,
    x2: function(d){
        return new_pos(d).cx;
    },
    y2: function(d){
        return new_pos(d).cy;
    }})
    .style({"stroke": "black", "stroke-width": "5px"});
svg.append("circle").attr(circle_attr).attr({r: "25"}).style({fill: "steelblue ", stroke: "black", "stroke-width": "5"});
setInterval(function(){
    var now = new Date();
    var scale = d3.scale.linear().domain([0, 60]).range([-90, 270]);
    var seconds = now.getSeconds();
    var minutes = now.getMinutes();
    var hours = now.getHours();
    var data = [scale(Math.floor(minutes)), scale(Math.floor(seconds)), Math.floor(hours % 12) * 30 - 90];
    hands.data(data).attr({
        x1: circle_attr.cx,
        y1: circle_attr.cy,
        x2: function(d){
            return new_pos(d).cx;
        },
        y2: function(d){
            return new_pos(d).cy;
        }});

}, 10);
