var w = 1200;
var h = 600;
var data = [];
var data_amount = getRandomInt(15, 30);
for (var i = 0; i < data_amount; i++) {
    data.push(getRandomInt(5, 30));
}

var xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, h]);

var svg_attributes = {
    "width": w,
    "height": h
};

var rect_attributes = {
    "x": function (d, i) {
        return xScale(i); //fit arbitrary number of bars along x axis
    },
    "y": function (d) {
        return h - yScale(d); //0,0 is top left so subtract data from height
    },
    "width": xScale.rangeBand(), //fit arbitrary number of bars with padding
    "height": function (d) {
        return yScale(d);
    },
    "fill": function (d) {
        return "rgb(255," + (d * 8) + ",70)"; //color them based on their data
    }
};

var sortOrder = false;
var sortBars = function() {
    sortOrder = !sortOrder;
    svg.selectAll("rect")
        .sort(function(a, b) {
            if(sortOrder) {
                return d3.ascending(a, b);
            } else{
                return d3.descending(a, b);
            }
        })
        .transition()
        .delay(function(d, i) {
            return i * 50;
        })
        .duration(1000)
        .ease("elastic")
        .attr("x", function(d, i) {
            return xScale(i);
        });

    svg.selectAll("text")
        .sort(function(a, b) {
            if(sortOrder) {
                return d3.ascending(a, b);
            } else{
                return d3.descending(a, b);
            }
        })
        .transition()
        .delay(function(d, i) {
            return i * 50;
        })
        .duration(1000)
        .ease("elastic")
        .attr("x", function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
        });

};

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
var button = d3.select("body").append("div").append("button").html("New Data");

svg.attr(svg_attributes).style({"outline": "solid 2px black"});
svg.selectAll("rect") //no rects currently
    .data(data)
    .enter() //binds data to elements, creates new elements if there are more data than elements
    .append("rect")
    .attr(rect_attributes)
    .text(function (d) {return d;})
    .on("click", function() {
        sortBars();
    }).on("mouseover", function(d) {
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

        d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(d);
        d3.select("#tooltip").classed("hidden", false);

    }).on("mouseout", function() {
        d3.select("#tooltip").classed("hidden", true);
    });

button.on("click", function(){

    var data = [];
    for (var i = 0; i < data_amount; i++) {
        data.push(getRandomInt(5, 30));
    }

    xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([0, w], 0.05);

    yScale = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, h]);

    rect_attributes = {
        "x": function (d, i) {
            return xScale(i); //fit arbitrary number of bars along x axis
        },
        "y": function (d) {
            return h - yScale(d); //0,0 is top left so subtract data from height
        },
        "width": xScale.rangeBand(), //fit arbitrary number of bars with padding
        "height": function (d) {
            return yScale(d);
        },
        "fill": function (d) {
            return "rgb(255," + (d * 8) + ",70)"; //color them based on their data
        }
    };

    svg.selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .ease("bounce")
        .attr(rect_attributes)

});

