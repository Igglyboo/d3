var w = 1000;
var h = 600;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
var projection = d3.geo.albersUsa().translate([w/2, h/2]);

var path = d3.geo.path().projection(projection);

d3.json("assets/js/us.json", function(json) {

    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "blue");

});