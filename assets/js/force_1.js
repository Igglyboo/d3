var w = 1000;
var h = 600;
var data = {
    nodes: [
        { name: "Adam" },
        { name: "Bob" },
        { name: "Carrie" },
        { name: "Donovan" },
        { name: "Edward" },
        { name: "Felicity" },
        { name: "George" },
        { name: "Hannah" },
        { name: "Iris" },
        { name: "Jerry" },
        { name: "Ike" },
        { name: "Edmond" },
        { name: "Brandon" },
        { name: "Trace" },
        { name: "Ross" },
        { name: "Pavana" },
        { name: "Dan" },
        { name: "Mike" },
        { name: "Phil" },
        { name: "Debbie" }
    ],
    edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 0, target: 10 },
        { source: 1, target: 10 },
        { source: 2, target: 5 },
        { source: 2, target: 5 },
        { source: 3, target: 12 },
        { source: 5, target: 8 },
        { source: 4, target: 9 },
        { source: 6, target: 7 },
        { source: 7, target: 13 },
        { source: 8, target: 9 },
        { source: 9, target: 1 },
        { source: 9, target: 2 },
        { source: 10, target: 3 },
        { source: 10, target: 4 },
        { source: 10, target: 5 },
        { source: 11, target: 7 },
        { source: 12, target: 5 },
        { source: 13, target: 4 },
        { source: 14, target: 8 },
        { source: 15, target: 19 },
        { source: 16, target: 7 },
        { source: 17, target: 1 },
        { source: 18, target: 2 },
        { source: 19, target: 5 }
    ]
};

var force = d3.layout.force()
    .nodes(data.nodes)
    .links(data.edges)
    .size([w, h])
    .linkDistance([50])
    .charge([-100])
    .start();

var colors = d3.scale.category10();

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var edges = svg.selectAll("line")
    .data(data.edges)
    .enter()
    .append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);

var nodes = svg.selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .style("fill", function(d, i) {
        return colors(i);
    })
    .call(force.drag)
    .on("mouseover", function(d) {
        var xPosition = parseFloat(d3.select(this).attr("cx"));
        var yPosition = parseFloat(d3.select(this).attr("cy"));
        var radius = parseFloat(d3.select(this).attr("r"));

        d3.select("#tooltip")
            .style("left", (xPosition + 25) + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(d.name);

        d3.select("#tooltip").classed("hidden", false);

    }).on("mouseout", function() {
        d3.select("#tooltip").classed("hidden", true);
    });

force.on("tick", function() {

    edges.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodes.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

});

