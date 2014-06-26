var w = 1000;
var h = 600;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
var projection = d3.geo.albersUsa().translate([w/2, h/2]);

var path = d3.geo.path().projection(projection);

var color = d3.scale.linear()
    .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);

d3.csv("assets/js/us-census-2010.csv", function(data) {

    color.domain([
        d3.min(data, function(d) { return d.RNETMIG2013; }),
        d3.median(data, function(d) { return d.RNETMIG2013; }),
        d3.max(data, function(d) { return d.RNETMIG2013; })
    ]);

    d3.json("assets/js/us.json", function(json) {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i].NAME;

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].RNETMIG2013);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    json.features[j].properties.value = dataValue;
                    break;

                }
            }
        }

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                //Get data value
                var value = d.properties.value;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "#ccc";
                }
            });
    });

});

