var mapObj = {
    "path" : {
        "csv" : "data/reef-locations.csv",
        "topo" : "data/world-topo.topojson"
    },
    "dimensions" : {
        "margin" : { top : 20,  right: 20,  bottom: 30,  left: 50 },
        "width" : 1100,
        "height" : 525
    }
}

function renderMap (obj) {
    //Map dimensions (in pixels)
    var width = obj.dimensions.width,
        height = obj.dimensions.height;

//Map projection
    var projection = d3.geo.equirectangular()
        .scale(175)
        .center([0,0]) //projection center
        .translate([width / 2, height / 2]) //translate to center the map in view

//Generate paths based on projection
    var path = d3.geo.path().projection(projection);

//Create an SVG
    var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);

//Group for the map features
    var features = svg.append("g").attr("class", "features");

//Create a tooltip, hidden at the start
    var tooltip = d3.select("body").append("div").attr("class", "world-tooltip");

//Create zoom/pan listener
//Change [1,Infinity] to adjust the min/max zoom scale
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, Infinity])
        .on("zoom", zoomed);

    svg.call(zoom);

    d3.json(obj.path.topo, function(error, json) {
        if (error) throw error;
        var geodata = json;

        //Create a path for each map feature in the data
        features.selectAll("path")
            .data(topojson.feature(geodata,geodata.objects.countries).features) //generate features from TopoJSON
            .enter()
            .append("path")
            .attr("fill", "#666")
            .attr("stroke", "#ccc")
            .attr("d",path)
            .on("mouseover",showTooltip)
            .on("mousemove",moveTooltip)
            .on("mouseout",hideTooltip)
            .on("click",clicked);
    });

    d3.csv(obj.path.csv, function(error, data) {
        data.forEach(function(d) {
            // Force numeric values for coordinates
            d.LAT = +d.LAT;
            d.LON = +d.LON;
        })

        console.log(data);

        // add circles to svg
        svg.selectAll("circle")
            .data(data).enter()
            .append("circle")
            .attr("cx", function (d) {
                var coords = projection([d.LAT, d.LON]);
                // console.log(coords[1]);

                return coords[1];
            })
            .attr("cy", function (d) {
                var coords = projection([d.LAT, d.LON]);
                // console.log(coords[0]);

                return coords[0];
            })
            .attr("r", "2px")
            .attr("fill", "red")
    });

    /***** MAP CONTROLS GO HERE ************/

// Add optional onClick events for features here
// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
    function clicked(d,i) { }

//Update map on zoom/pan
    function zoomed() {
        features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
            .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px" );
    }

//Position of the tooltip relative to the cursor
    var tooltipOffset = {x: 5, y: -25};

//Create a tooltip, hidden at the start
    function showTooltip(d) {
        moveTooltip();

        tooltip.style("display","block")
            .text("");
    }

//Move the tooltip to track the mouse
    function moveTooltip() {
        tooltip.style("top",(d3.event.pageY + tooltipOffset.y) + "px")
            .style("left",(d3.event.pageX + tooltipOffset.x) + "px");

    }

//Create a tooltip, hidden at the start
    function hideTooltip() {
        tooltip.style("display","none");
    }
}