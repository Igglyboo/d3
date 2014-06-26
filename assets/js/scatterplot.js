var w = 1200;
var h = 600;
var padding = 30;
var data = [];
var data_amount = getRandomInt(50, 150);
for (var i = 0; i < data_amount; i++) {
    data.push([getRandomInt(0, w), getRandomInt(0, h)]);
}

var svg_attributes = {
    "width": w,
    "height": h
};

var circle_attributes = {
    "cx": function (d) {
        return xScale(d[0]);
    },
    "cy": function (d) {
        return yScale(d[1]);
    },
    "r": function (d) {
        return rScale(d[1]);
    },
    "fill": "teal"
};

var xScale = d3.scale.linear()
    .domain([0, d3.max(data, function (d) {return d[0];})])
    .range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function (d) {return d[1];})])
    .range([h - padding, padding]);

var rScale = d3.scale.linear()
    .domain([0, d3.max(data, function (d) {return d[1];})])
    .range([5, 15]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(5);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

var svg = d3.select("body")
    .append("svg")
    .attr(svg_attributes);

//Create circles
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr(circle_attributes);


//Create X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

//Create Y axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
