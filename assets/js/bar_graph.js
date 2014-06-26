var data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17];
var w = 1200;
var h = 600;
var barPadding = 2;
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var svg_attributes = {
    "width": w,
    "height": h
};

var rect_attributes = {
    "x": function (d, i) {
        return i * (w / data.length); //fit arbitrary number of bars along x axis
    },
    "y": function (d) {
        return h - (d * 15); //0,0 is top left so subtract data from height
    },
    "width": w / data.length - barPadding, //fit arbitrary number of bars with padding
    "height": function (d) {
        return d * 15;
    },
    "fill": function (d) {
        return "rgb(255," + (d * 10) + ",0)"; //color them based on their data
    }
};

var text_attributes = {
    "text-anchor": "middle",
    "fill": "black",
    "font-size": "11px",
    "font-family": "sans-serif",
    "x": function (d, i) {
        return i * (w / data.length) + (w / data.length - barPadding) / 2;
    },
    "y": function (d) {
        return h - (d * 15) + 15;
    }
};

svg.attr(svg_attributes).style({"outline": "solid 2px black"});
svg.selectAll("rect") //no rects currently
    .data(data)
    .enter() //binds data to elements, creates new elements if there are more data than elements
    .append("rect")
    .attr(rect_attributes)
    .text(function (d) {return d;});

svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) {return d;})
    .attr(text_attributes);