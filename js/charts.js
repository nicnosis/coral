(function(){
  // var margin = {top: 40, right: 20, bottom: 30, left: 60},
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      // .rangeRoundBands([0, width], .1);
      .rangeRoundBands([0, width], .25);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10)
      .tickPadding(5)
      .tickValues([0,5,10]);

  var svg = d3.select("#barchart").append("svg")
      .attr("width", '100%')
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", "0 0 400 300")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  d3.csv("data/coral_benefits.csv", type, function(error, data) {
    if (error) throw error;

      data.sort(function(a, b){ return d3.descending(a.dollar, b.dollar); })

      x.domain(data.map(function(d) { return d.benefit; }));
      y.domain([0, d3.max(data, function(d) { return d.dollar; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(5," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        // .attr("transform", "rotate(-90)")
        // .attr("y", 0)
        .attr("dx", -margin.left)
        // .attr("dx", -margin.left + ".71em")
        .attr("dy","-.71em")
        // .style("text-anchor", "end")
        .style("text-anchor", "beginning")
        .text("Value ($ Billions)");

      var bar = svg.selectAll(".bar")
          .data(data)
          .enter().append("g")
          .attr("class","bar")
          .attr("transform", function(d) {
              return "translate(" + (x(d.benefit) + 5) + "," + y(d.dollar) + ")";
          })

      bar.append("rect")
          .attr("x", 1)
          .attr("width", x.rangeBand())
          .attr("height", function (d) {
              return height - y(d.dollar);
          })

      bar.append("text")
          .attr("dy", "1em")
          .attr("x", x.rangeBand() / 2)
          .attr("text-anchor", "middle")
          .attr("class", "barText")
          .text(function(d) {
              return "$ " + d.dollar;
          })




      /*
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.benefit)+10; })
        .attr("width", x.rangeBand()-10)
        .attr("y", function(d) { return y(d.dollar); })
        .attr("height", function(d) { return height - y(d.dollar); });
        */

  });

  function type(d) {
    d.dollar = +d.dollar;
    return d;
  }

})();

/*
(function(){
  var width = 400,
    height = 300,
    radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#ff632c", "#ff9271", "#ffb19f", "#ffead9"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var labelArc = d3.svg.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.percent; });

  var svg = d3.select("#piechart").append("svg")
      .attr("width", '100%')
      .attr("viewBox", "0 0 400 300")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.csv("data/coral_threats.csv", type, function(error, data) {
    if (error) throw error;

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.threat_level); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.threat_level; });
  });

  function type(d) {
    d.percent = +d.percent;
    return d;
  }
})();

*/

(function() {
    var svg = dimple.newSvg("#piechart", 590, 400);
    d3.csv("data/coral_threats.csv", function (data) {
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(80, 20, 460, 360)
        myChart.addMeasureAxis("p", "percent");
        // myChart.addColorAxis("Threat Level", ["#ff632c", "#ff9271", "#ffb19f", "#ffead9"]);

        myChart.defaultColors = [
            new dimple.color("#ffead9", "#CCBCAF", 1), // Sand
            new dimple.color("#ffb19f", "#CC8E81", 1), // Salmon
            new dimple.color("#ff632c", "#CC4F25", 1), // Reddish
            new dimple.color("#ff9271", "#CC745C", 1) // Coral
        ];

        var bothSeries = myChart.addSeries(["Threat Level", "percent"], dimple.plot.pie);
        var threatSeries = myChart.addSeries("Threat Level", dimple.plot.pie);
        bothSeries.getTooltipText = function (e) {
            return [
                e.aggField[1] + "% of coral reefs fall under the '" + e.aggField[0] + "' threat level."
            ];
        };

        console.log(threatSeries);
        console.log(myChart);
        var myLegend = myChart.addLegend(0, 20, 90, 300, "left", threatSeries);
        myLegend.fontSize = '14px';
        myChart.draw();
    });

})();
