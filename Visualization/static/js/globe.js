

function loadData(world,actual_data,year){
var projection = d3.geo.orthographic().scale(245).translate([400,300]).clipAngle(90);
var path = d3.geo.path().projection(projection);
var countries = topojson.feature(world, world.objects.countries1).features;
// var color = d3.scale.category20();
console.log(actual_data)
    var color = d3.scale.linear()
        .domain([0, 65])
        .range(["#56AAE6", "#E75D87"]);

    var colorLegend = d3.legend.color()
        .labelFormat(d3.format(".0f"))
        .scale(color)
        .shapePadding(5)
        .shapeWidth(50)
        .shapeHeight(20)
        .labelOffset(12);


console.log(countries);

//var polygon = d3.select("#svg").selectAll("path").data(countries)
 // .enter().append("path").attr({"d":path,"fill":function(d){return color(d.id);}
 // }).style("stroke", "black").style("stroke-width", "20");
    var tooltip = d3.select("div.tooltip");
    var polygon = d3.select("#svg").selectAll("path").data(countries)
        .enter().append("path")
        .attr({"d":path,
        })
        .style("fill", function(d,i){

            if  ((d.properties["Alpha-2"] == null) || (actual_data[d.properties["Alpha-2"].toLowerCase()] == null)){
                return "#56AAE6"
            }
            else{
                var per_value = color(actual_data[d.properties["Alpha-2"].toLowerCase()].data[year].L_percent)
                return per_value
            }
        })
        .attr("fill-opacity","0.4")

        .style("stroke", function(d,i){
            if ((d.properties["Alpha-2"] == null) || (actual_data[d.properties["Alpha-2"].toLowerCase()] == null)) {
                return "#56AAE6"
            }
            else{
                var per_value = color(actual_data[d.properties["Alpha-2"].toLowerCase()].data[year].L_percent)
                return per_value
            }
}).style("stroke-width", "1")
        .on("mouseover",function(d,i){
            d3.select(this).attr("stroke-width",2).attr("fill-opacity","0.8");
            var per_value = 0
            if ((d.properties["Alpha-2"] != null) && (actual_data[d.properties["Alpha-2"].toLowerCase()] != null)) {
                per_value = actual_data[d.properties["Alpha-2"].toLowerCase()].data[year].L_percent
            }
            return tooltip.style("hidden", false).html(d.properties.name+" : "+ per_value+" %");
        })
        .on("mousemove",function(d){
            var per_value = 0
            if ((d.properties["Alpha-2"] != null) && (actual_data[d.properties["Alpha-2"].toLowerCase()] != null)) {
                per_value = actual_data[d.properties["Alpha-2"].toLowerCase()].data[year].L_percent
            }
            tooltip.classed("hidden", false)
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX + 10) + "px")
                .html(d.properties.name+" : "+ per_value+" %");
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill-opacity","0.5");
            tooltip.classed("hidden", true);
        });;

    d3.select("#svg").append("g")
        .attr("transform", "translate(100, 60)")
        .call(colorLegend);
d3.select("#svg").call(d3.behavior.drag()
    .origin(function() {
      r = projection.rotate();
      return {x: r[0], y: -r[1]};
    })
    .on("drag", function() {
    rotate = projection.rotate();
    projection.rotate([d3.event.x, -d3.event.y, rotate[2]]);
    d3.select("#svg").selectAll("path").attr("d", path);
  })


);}
