var width = 100;
var height = 160;



var numbers = [];
for(var counter = 1; counter < 9; counter++) {
    var svg = d3.select("body").append("svg").attr({width: width, height: height});
    numbers.push(svg.selectAll("polygon")
        .data(to7seg("15"))
        .enter()
        .append("polygon")
        .attr({
            "points": function (d, i) {
                var x = 10;
                var y = 10;
                var index = [
                    {origin: [x, y], orientation: "horizontal"},
                    {origin: [x + 70, y], orientation: "vertical"},
                    {origin: [x + 70, y + 70], orientation: "vertical"},
                    {origin: [x, y + 140], orientation: "horizontal"},
                    {origin: [x, y + 70], orientation: "vertical"},
                    {origin: [x, y], orientation: "vertical"},
                    {origin: [x, y + 70], orientation: "horizontal"},

                ];
                return getSevenSegmentPoints(index[i].origin, 70, 10, index[i].orientation);
            }
        })
        .style({
            "fill": function (d) {
                return d ? "darkred" : "lightgrey";
            }
        }));
}
var div = d3.select("body").append("div");
var input = div.selectAll("input")
        .data([0,1,2,3,4,5,6,7])
        .enter()
        .append("input")
        .attr({
            "type": "number",
            "min": 0,
            "max": 15,
            "value": 15
        })
        .style({
            "width": "80px",
            "margin": "0px 17px 0px 0px"
        })
        .on("input", function (d, i) {
            numbers[d].data(to7seg(this.value))
                .style({
                    "fill": function (d) {
                        return d ? "darkred" : "lightgrey";
                    }
                })
        });



function getSevenSegmentPoints(origin, longAxis, shortAxis, orientation){
    var x = origin[0];
    var y = origin[1];
    var points = [[x,y], null, null, null, null, null];

    if (orientation === 'horizontal'){

        points[1] = [x + shortAxis/2 , y - shortAxis/2];
        points[2] = [x + longAxis - shortAxis/2 , y - shortAxis/2];
        points[3] = [x + longAxis, y];
        points[4] = [x + longAxis - shortAxis/2 , y + shortAxis/2];
        points[5] = [x + shortAxis/2 , y + shortAxis/2];

        return pointArrayToString(points);
    }
    else if(orientation === 'vertical') {

        points[1] = [x + shortAxis/2 , y + shortAxis/2];
        points[2] = [x + shortAxis/2 , y + longAxis - shortAxis/2];
        points[3] = [x, y  + longAxis];
        points[4] = [x - shortAxis/2 , y + longAxis - shortAxis/2];
        points[5] = [x - shortAxis/2 , y + shortAxis/2];

        return pointArrayToString(points);
    }
    else {
        return null;
    }
}

function pointArrayToString(points){
    var str = "";
    for(var i =0; i < points.length; i++){
        str += points[i].join() + " "
    }
    return str;
}

function to7seg(value){
    return {
        "0": [true,true,true,true,true,true,false],
        "1": [false,true,true,false,false,false,false],
        "2": [true,true,false,true,true,false,true],
        "3": [true,true,true,true,false,false,true],
        "4": [false,true,true,false,false,true,true],
        "5": [true,false,true,true,false,true,true],
        "6": [true,false,true,true,true,true,true],
        "7": [true,true,true,false,false,false,false],
        "8": [true,true,true,true,true,true,true],
        "9": [true,true,true,true,false,true,true],
        "10": [true,true,true,false,true,true,true],
        "11": [false,false,true,true,true,true,true],
        "12": [true,false,false,true,true,true,false],
        "13": [false,true,true,true,true,false,true],
        "14": [true,false,false,true,true,true,true],
        "15": [true,false,false,false,true,true,true]
    }[value.toUpperCase()]
}
