/**
 * Global Variables
 */

var json_obj,_svg,_height,_width,_items_loaded = false;
var men_vs_women,continet_wise;
var current_time = 0;


/**
 * Do the following when the browser window loads
 */



/**
 * Load data from a CSV file as JSON objects
 * @param path the location of the CSV file to load
 */
function loadData(data,containername,sectionid,year,tooltip){
  json_obj = data;
draw_items(containername, json_obj, 600, 800, sectionid,tooltip, "block",year);
}


function draw_items(containername,json_obj,height,width,section,tooltip,display_param,year) {
    var year_str = year.toString();
    var countries = Object.keys(json_obj);
    console.log(json_obj);


    var full_data = Object.keys(json_obj).map(function (d,i) {
        return {
            id: i,
            petals: [{'size': json_obj[d]['data'][year_str]['L_percent'] / 100}, {'size': 1 - json_obj[d]['data'][year_str]['L_percent'] / 100}],
            flag: "https://www.countryflags.io/" + d + "/flat/64.png",
            vase: d3.range(petals).map(function (d) {
                return {size_1: 0.5};
            }),
            c_id: d,
            country_name: json_obj[d]['name'],
            nodes: [].concat(
                d3.range(json_obj[d]['data'][year_str]['L_total_women']).map(function () {
                    return {type: "a",data:json_obj[d]['data'][year_str]  };
                }),
                d3.range(json_obj[d]['data'][year_str]['L_total_seats'] - json_obj[d]['data'][year_str]['L_total_women']).map(function () {
                    return {type: "b",data:json_obj[d]['data'][year_str] };
                })
            )

        }
    });
    function flowerSum(d) {
        return d.petals[0].size;
    }
    full_data.sort(function (a, b) {
        return d3.descending(flowerSum(a), flowerSum(b));
    });
if (section == 0) {
    data = full_data.slice(0, 20);
}
else if (section == 1){
    data = full_data.reverse().slice(0, 20);
}



    var window_svg = '<path d="m388.363281 201.671875v-179.652344c0-12.121093-10.292969-22.019531-22.914062-22.019531h-321.972657c-12.59375 0-22.917968 9.898438-22.917968 22.019531v364.703125h.058594c2.363281 0 26.296874-.203125 26.5625-.144531l163.300781 40.386719 177.882812-40.242188zm0 0" fill="#a66d30"/><path d="m37.382812 386.636719v-364.617188c0-12.121093 10.292969-22.019531 22.917969-22.019531h-16.824219c-12.59375 0-22.917968 9.898438-22.917968 22.019531v364.703125h16.824218zm0 0" fill="#6e3e0b"/><path d="m402.417969 426.964844-193.917969-20.121094-193.507812 20.121094 11.046874 65.730468c1.75 10.425782 9.710938 19.304688 22.160157 19.304688h321.011719c12.417968 0 20.40625-8.878906 22.15625-19.304688zm0 0" fill="#b3adad"/><path d="m396.382812 386.722656h-384.832031c-6.09375 0-11.050781 4.996094-11.050781 11.066406v18.136719c0 6.074219 4.957031 11.039063 11.050781 11.039063h393.898438c6.09375 0 11.046875-4.964844 11.046875-11.039063v-18.136719c0-6.070312-4.957032-11.066406-11.046875-11.066406zm0 0" fill="#e6e6e6"/><path d="m45.285156 492.695312-4.113281-24.441406c0-4.964844 3.558594-9.140625 8.253906-10.101562h347.742188l4.957031-29.4375.292969-1.75c-126.859375 0-259.808594 0-387.425781 0l11.046874 65.730468c1.75 10.425782 9.710938 19.304688 22.160157 19.304688h19.242187c-12.417968 0-20.410156-8.878906-22.15625-19.304688zm0 0" fill="#757a85"/><path d="m339.351562 362.28125c-3.234374-11.59375-13.875-20.089844-26.472656-20.089844-12.390625 0-22.828125 8.175782-26.300781 19.417969-1.078125-.144531-2.183594-.203125-3.292969-.203125-15.21875 0-27.523437 12.320312-27.523437 27.535156 0 10.046875 5.335937 18.808594 13.324219 23.625-2.304688 4.03125-3.613282 8.703125-3.613282 13.667969 0 15.214844 12.332032 27.566406 27.519532 27.566406 4.257812 0 8.28125-.992187 11.898437-2.714843 3.003906-1.433594 5.683594-3.417969 7.988281-5.8125 2.304688 2.425781 5.042969 4.410156 8.074219 5.871093 3.585937 1.695313 7.582031 2.65625 11.808594 2.65625 15.191406 0 27.496093-12.351562 27.496093-27.566406 0-4.730469-1.195312-9.199219-3.296874-13.082031 7.875-4.847656 13.121093-13.550782 13.121093-23.507813 0-15.214843-12.304687-27.539062-27.523437-27.539062-1.078125 0-2.15625.058593-3.207032.175781zm0 0" fill="#ff698f"/><path d="m311.859375 376.210938c-14.226563 0-25.773437 11.5625-25.773437 25.8125 0 14.253906 11.546874 25.785156 25.773437 25.785156s25.746094-11.535156 25.746094-25.785156c-.003907-14.25-11.519531-25.8125-25.746094-25.8125zm0 0" fill="#f5df87"/><path d="m312.878906 342.191406c-12.390625 0-22.828125 8.175782-26.300781 19.417969-1.078125-.144531-2.183594-.203125-3.292969-.203125-15.21875 0-27.523437 12.320312-27.523437 27.535156 0 10.046875 5.335937 18.808594 13.324219 23.625-2.304688 4.03125-3.613282 8.703125-3.613282 13.667969 0 15.214844 12.332032 27.566406 27.519532 27.566406 4.257812 0 8.28125-.992187 11.898437-2.714843.523437-.265626 1.078125-.527344 1.574219-.820313-17.875-9.3125-30.003906-27.246094-30.003906-47.859375 0-28.648438 23.472656-52.183594 53.296874-54.402344-4.664062-3.652344-10.523437-5.8125-16.878906-5.8125zm0 0" fill="#cf4b82"/><path d="m311.859375 376.210938c-14.226563 0-25.773437 11.5625-25.773437 25.8125 0 14.253906 11.546874 25.785156 25.773437 25.785156 2.886719 0 5.683594-.464844 8.28125-1.371094-10.148437-3.445312-17.4375-13.082031-17.4375-24.414062 0-11.359376 7.289063-20.996094 17.4375-24.441407-2.597656-.875-5.394531-1.371093-8.28125-1.371093zm0 0" fill="#d9a13f"/><path d="m133.832031 358.921875c-3.355469-12-14.375-20.820313-27.464843-20.820313-12.800782 0-23.648438 8.46875-27.234376 20.121094-1.136718-.148437-2.273437-.203125-3.4375-.203125-15.746093 0-28.515624 12.789063-28.515624 28.558594 0 10.394531 5.539062 19.476563 13.820312 24.472656-2.390625 4.175781-3.761719 9.019531-3.761719 14.160157 0 15.800781 12.769531 28.589843 28.515625 28.589843 4.429688 0 8.628906-1.023437 12.359375-2.804687 3.09375-1.515625 5.890625-3.5625 8.253907-6.015625 2.390624 2.484375 5.246093 4.558593 8.394531 6.074219 3.703125 1.753906 7.84375 2.746093 12.21875 2.746093 15.773437 0 28.542969-12.789062 28.542969-28.589843 0-4.90625-1.253907-9.519532-3.441407-13.550782 8.164063-5.019531 13.617188-14.042968 13.617188-24.351562 0-15.769532-12.769531-28.5625-28.515625-28.5625-1.136719 0-2.246094.058594-3.351563.175781zm0 0" fill="#ff698f"/><path d="m105.316406 373.378906c-14.753906 0-26.707031 11.972656-26.707031 26.75 0 14.746094 11.953125 26.746094 26.707031 26.746094s26.707032-12 26.707032-26.746094c0-14.777344-11.953126-26.75-26.707032-26.75zm0 0" fill="#f5df87"/><path d="m106.367188 338.101562c-12.800782 0-23.648438 8.46875-27.234376 20.121094-1.136718-.148437-2.273437-.203125-3.4375-.203125-15.746093 0-28.515624 12.789063-28.515624 28.558594 0 10.394531 5.539062 19.476563 13.820312 24.472656-2.390625 4.175781-3.761719 9.019531-3.761719 14.160157 0 15.800781 12.769531 28.589843 28.515625 28.589843 4.429688 0 8.628906-1.023437 12.359375-2.804687.554688-.289063 1.109375-.554688 1.632813-.875-18.542969-9.636719-31.109375-28.238282-31.109375-49.585938 0-29.726562 24.347656-54.109375 55.253906-56.417968-4.8125-3.765626-10.90625-6.015626-17.523437-6.015626zm0 0" fill="#cf4b82"/><path d="m105.316406 373.378906c-14.753906 0-26.707031 11.972656-26.707031 26.75 0 14.773438 11.953125 26.746094 26.707031 26.746094 3.003906 0 5.917969-.523438 8.601563-1.429688-10.527344-3.59375-18.078125-13.578124-18.078125-25.316406 0-11.769531 7.550781-21.757812 18.078125-25.347656-2.683594-.90625-5.597657-1.402344-8.601563-1.402344zm0 0" fill="#d9a13f"/>'


    var width_cluster = 10,
        height_cluster = 10,
        petals = 2;

    var padding = 1, // separation between same-color nodes
        clusterPadding = 1; // separation between different-color nodes
    // maxRadius = d3.select(".innerrect").node().getBoundingClientRect().width/4;

    var gridding = d3.gridding()
        .size([width, height])
        .mode("grid");




    d3.select("."+containername)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + " " + height)
        // Class to make it responsive.
        .classed("svg-content-responsive", true)
        // Fill with a rectangle for visualization.
        .append("rect")
        .classed("rect", true)
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none");

    // var width = d3.select(".svg-content-responsive").node().getBoundingClientRect().width;
    // var height = d3.select(".svg-content-responsive").node().getBoundingClientRect().height;

    var gridding = d3.gridding()
        .size([width, height])
        .mode("grid");
    var griddingData = gridding(data);

    var svg = d3.select("."+containername).select(".svg-content-responsive");

    svg.selectAll(".square")
        .data(griddingData)
        .enter().append("g").append("rect")
        .classed("innerrect", true)
        .style("fill", "none")
        .attr("width", function (d) {
            return d.width;
        })
        .attr("height", function (d) {
            return d.height;
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })


    var halfRadius = d3.select(".innerrect").node().getBoundingClientRect().height / 7;

    var size = d3.scaleSqrt()
        .domain([0, 1])
        .range([0, halfRadius]);

    var size_1 = d3.scaleSqrt()
        .domain([0, 1])
        .range([0, halfRadius]);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.size;
        });


    var flower = svg.selectAll('g').append('g')
        .attr("class", "flower")
        .attr("transform", function (d, i) {
            return "translate(" + ((d.x) + (d.width) / 2) + "," + (d.y + d.height-15) + ")";
        });
    ;

    flower.selectAll(".male")
        .data(function (d) {
            return pie([1]);
        }).enter()
        .append("circle").attr("r", function (d) {
        return (griddingData[d.index].height) / 4;
    })
        .attr("class", "male")
        .attr("cx", function (d) {
            return griddingData[d.index].cx - (griddingData[d.index].width) / 2;
        })
        .attr("cy", function (d) {
            return griddingData[d.index].cy - (griddingData[d.index].height);
        })
        .style("stroke", "#56AAE6")
        .style("stroke-opacity", "0.5")
        .style("fill", "none");

    flower.selectAll(".female")
        .data(function (d) {
            return pie([1]);
        }).enter()
        .append("circle").attr("r", function (d) {
        return (griddingData[d.index].height) / 6;
    })
        .attr("class", "female")
        .attr("cx", function (d) {
            return griddingData[d.index].cx - (griddingData[d.index].width) / 2;
        })
        .attr("cy", function (d) {
            return griddingData[d.index].cy - (griddingData[d.index].height);
        })
        .style("stroke", "#E591C2")
        .style("stroke-opacity", "0.5")
        .style("fill", "none");





    //setInterval(update, 10000)

    function petalPath(d) {
        var angle = (d.endAngle - d.startAngle) / 6,
            s = polarToCartesian(-angle, halfRadius),
            e = polarToCartesian(angle, halfRadius),
            r = size(d.data.size),
            m = {x: halfRadius + r, y: 0},
            c1 = {x: halfRadius + r / 2, y: s.y},
            c2 = {x: halfRadius + r / 2, y: e.y};
        return "M0,0L" + s.x + "," + s.y + "Q" + c1.x + "," + c1.y + " " + m.x + "," + m.y + "L" + m.x + "," + m.y + "Q" + c2.x + "," + c2.y + " " + e.x + "," + e.y + "Z";
    };

    function petalFill(d, i) {
        colors = ['#E591C2', "#56AAE6"]
        return colors[i];
    };

    function petalStroke(d, i) {
      colors = ['#E591C2', "#56AAE6"]
        return colors[i];
    };

    function flowerSum(d) {
        return d.petals[0].size;
    }

    function r(angle) {
        return "rotate(" + (angle / Math.PI * -90) + ")";
    }

    function polarToCartesian(angle, radius) {
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };


    let scaling = d3.scaleLinear().domain([0, 10])
        .range([0, 1])
    var _class_1 = 15
    var _class_2 = 50

    var nodes = [].concat(
        d3.range(_class_1).map(function () {
            return {type: "a"};
        }),
        d3.range(_class_2).map(function () {
            return {type: "b"};
        })
    );


    var node = flower.selectAll('.cluster')
        .data(function (d,i) {
            if (d) {
                return d.nodes;
            }
        }).enter()
        .append("circle")
        .attr("r", function (d) {
            return 2;
        })
        .attr("class", "cluster")
        .attr("fill", function (d) {
            return d.type === "a" ? '#E591C2' : "#56AAE6";
        })
        .attr("fill-opacity","0.2")
        .attr("class", function (d) {
            return d.type === "a" ? "female_dot" : "male_dot";
        })
        .style("stroke", function (d) {
            return d.type === "a" ? '#E591C2' : "#56AAE6";
        }).style("stroke-width", "0.6")
    ;
    var simulation =
        data.map(d =>
            d3.forceSimulation(d.nodes)
                .force("charge", d3.forceCollide().radius(2))
                .force("r", d3.forceRadial(function (d) {
                    return d.type === "a" ? ((griddingData[0].height) / 7) : ((griddingData[0].height) / 4);
                }))
                .on("tick", ticked));

    function ticked() {
        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y - 75;
            });
    }

    var petal = flower.selectAll(".petal")
        .data(function (d) {
            return pie(d.petals);
        })
        .enter().append("path")
        .attr("class", function (d, i) {
            return "petal_" + i;
        })
        .attr("transform", function (d) {
            return r((d.startAngle + d.endAngle) / 2);
        })
        .attr("d", petalPath)
        .style("stroke", petalStroke)
        .style("fill", petalFill)
        .attr("fill-opacity","0.2")
        .style("stroke-width", "1.5");

    svg.selectAll('.flower').data(griddingData).append("svg:image")
        .attr('x', function (d) {
            return -15;
        })
        .attr('y', function (d) {
            return -16 - (d.height / 2);
        })
        .attr('width', 30)
        .attr('height', 34)
        .attr("xlink:href", function (d, i) {
            return d.flag;
        });


  //  svg.selectAll('.flower').append('rect').attr('x', function (d) {
    //      return -d.width+(d.width/2)+25;
  //    })
      //    .attr('y', function (d) {
      //        return 0;
    //      })
    //      .attr('width',function (d) {
    //          return d.width-50;
    //      })
    //      .attr('height',function (d) {
    //          return 15;
    //      })
      //    .attr('fill', "black")
      //    .attr("fill-opacity","0.6");;
//
    svg.selectAll('.flower').append("text")
        .style("fill", "white")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("transform", (d, i) => {
            return "translate("+(0)+","+(12)+") rotate(0)";
        }).text(function(d) { return d.country_name.slice(0,15); });

    function update() {
        year_str = year.toString();
        data.forEach(function (d) {
            d.petals[0].size = json_obj[d.c_id]['data'][year_str]['L_percent'] / 100;
            d.petals[1].size = 1 - d.petals[0].size;
        });
        year = year - 1;

        data.sort(function (a, b) {
            return d3.descending(flowerSum(a), flowerSum(b));
        });
        ordered_country = [];
        Object.keys(data).forEach(function (key, idx) {
            ordered_country.push(data[key].id);
        });
        flower.data(gridding(data), function (d) {
            return d.id;
        }).transition().delay(function (d, i) {
            return 1000 + i * 20;
        }).duration(1000)
            .attr("transform", function (d, i) {
                return "translate(" + ((d.x) + (d.width) / 2) + "," + (d.y + d.height) + ")";
            });


        petal.data(function (d) {
            return pie(d.petals);
        }).transition().duration(1000)
            .attr("transform", function (d) {
                return r((d.startAngle + d.endAngle) / 2);
            })
            .attr("d", petalPath);
    }


    var cx = 600 / 2,
        cy = 650 / 2,
        duration = 60000,
        timer;

    var rainbow = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, 10000]);

    var angle = d3.scaleLinear()
        .domain([0, 1])
        .range([(Math.sqrt(5) - 1) / 2, 0])
        .clamp(true);

    d3.select("div#chartId2")
        .append("div")
        // Container class to make it responsive.
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 330")
        // Class to make it responsive.
        .classed("svg-content-responsive_1", true)
        // Fill with a rectangle for visualization.
        .append("rect")
        .classed("rect", true)
        .attr("width", 600)
        .attr("height", 330);
    var width = 600;
    var height = 330;
    // var width = d3.select(".svg-content-responsive").node().getBoundingClientRect().width;
    // var height = d3.select(".svg-content-responsive").node().getBoundingClientRect().height;


    female_rep = d3.selectAll(".female_dot")._groups[0].length
    male_rep = d3.selectAll(".male_dot")._groups[0].length
    var newarr = [].concat.apply([], [].concat(d3.range(20).map(d => data[d].nodes))).map(d => d.type).sort();
    var griddingData_2 = gridding(d3.range(newarr.length));

    var svg = d3.select(".svg-content-responsive_1");

    svg.selectAll(".square")
        .data(griddingData_2)
        .enter().append("g").append("circle")
        .classed("innerrect", true)
        .attr("fill", function (d) {
            return newarr[d.__index] === "a" ? "#E591C2" : "#56AAE6";
        })
        .style("stroke", "black")
        .attr("r", function (d) {
            return d.width / 3;
        })
        .attr("cx", function (d) {
            return d.cx;
        })
        .attr("cy", function (d) {
            return d.cy;
        });


    d3.selectAll(".male_dot").on("mouseover",function(d,i){
        d3.select(this).attr("stroke-width",2).attr("fill-opacity","0.8");
        return tooltip.style("hidden", false).html(
          "Seats represented by male: "+(d.data.L_total_seats - d.data.L_total_women));
    })
    .on("mousemove",function(d){
        tooltip.classed("hidden", false)
            .style("top", (d3.event.pageY) + "px")
            .style("left", (d3.event.pageX + 10) + "px")
            .html(
              "Seats represented by male: "+(d.data.L_total_seats - d.data.L_total_women));
    })
    .on("mouseout",function(d,i){
        d3.select(this).attr("fill-opacity","0.2");
        tooltip.classed("hidden", true);
    });

    d3.selectAll(".female_dot").on("mouseover",function(d,i){
        d3.select(this).attr("stroke-width",2).attr("fill-opacity","0.8");
        return tooltip.style("hidden", false).html(
          "Seats represented by female: "+(d.data.L_total_women));
    })
    .on("mousemove",function(d){
        tooltip.classed("hidden", false)
            .style("top", (d3.event.pageY) + "px")
            .style("left", (d3.event.pageX + 10) + "px")
            .html(
              "Seats represented by female: "+( d.data.L_total_women));
    })
    .on("mouseout",function(d,i){
        d3.select(this).attr("fill-opacity","0.2");
        tooltip.classed("hidden", true);
    });


      d3.selectAll(".petal_0").on("mouseover",function(d,i){
        d3.select(this).attr("stroke-width",2).attr("fill-opacity","0.8");
        return tooltip.style("hidden", false).html(
          "Female: "+(d.value*100)+" %");
    })
    .on("mousemove",function(d){
        tooltip.classed("hidden", false)
            .style("top", (d3.event.pageY) + "px")
            .style("left", (d3.event.pageX + 10) + "px")
            .html(
              "Female: "+(d.value*100)+" %");
    })
    .on("mouseout",function(d,i){
        d3.select(this).attr("fill-opacity","0.2");
        tooltip.classed("hidden", true);
    });

    d3.selectAll(".petal_1").on("mouseover",function(d,i){
      d3.select(this).attr("stroke-width",2).attr("fill-opacity","0.8");
      return tooltip.style("hidden", false).html(
        "Male: "+ (d.value*100)+" %");
  })
  .on("mousemove",function(d){
      tooltip.classed("hidden", false)
          .style("top", (d3.event.pageY) + "px")
          .style("left", (d3.event.pageX + 10) + "px")
          .html(
            "Male: "+ (d.value*100)+" %");
  })
  .on("mouseout",function(d,i){
      d3.select(this).attr("fill-opacity","0.2");
      tooltip.classed("hidden", true);
  });


}



function draw_barchart(containername,svg,json_obj,height,width,section,display_param) {
    var year = 2018;
    var year_str = year.toString();
    var countries = Object.keys(json_obj);
    console.log(json_obj);

    var full_data = d3.range(193).map(function (d) {
        return {
            id: d,
            percent: json_obj[countries[d]]['data'][year_str]['L_percent']/100,
            flag: "https://www.countryflags.io/"+countries[d]+"/flat/64.png",
            c_id: countries[d],
            country_name: json_obj[countries[d]]['name']

        }
    });
    function areaSize(d) {
        return d.percent;
    }
    full_data.sort(function (a, b) {
        return d3.descending(areaSize(a), areaSize(b));
    });






    svg
        .append("div")
        // Container class to make it responsive.
        .classed(containername, true)
        .style("display",display_param)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + " " + height)
        // Class to make it responsive.
        .classed("svg-content-responsive", true);

    // var width = d3.select(".svg-content-responsive").node().getBoundingClientRect().width;
    // var height = d3.select(".svg-content-responsive").node().getBoundingClientRect().height;

    var svg = d3.select("."+containername).select(".svg-content-responsive");

    var numPerRow = 193
    var size= width/193;
    var scale = d3.scaleLinear() // <-A
        .domain([0, numPerRow -1])
        .range([0, size * numPerRow])

    sel = svg
    // Fill with a rectangle for visualization.

    sel.selectAll('circle')
        .data(d3.range(19300)) // <-B
        .enter().append('circle')
        .attr('cx', (d, i) => {
            const n = i % numPerRow  // <-C
            return scale(n)+size/2
        })
        .attr('cy', (d, i) => {
            const n = Math.floor(i / 193) // <-D
            return scale(n)+size/2
        })
        .attr('r', size/2)
        .attr('fill', (d, i) => {

            if (full_data[i%193].percent<=0){
                return "#56AAE6"
            }
            else{
                full_data[i%193].percent = full_data[i%193].percent -0.01 ;
                return "#E591C2"
            }
        });

   var rect = sel.selectAll('g')
        .data(full_data) // <-B
        .enter().append('g')





    rect.append('rect').attr('x', (d, i) => {
            return i*size;
        })
        .attr('y', size*100+(size/2))
        .attr('width', size)
        .attr('height',height-(size*100))
        .attr('fill', "green");

    rect.append("text")
        .style("fill", "black")
        .style("font-size", "6px")
        .attr("text-anchor", "middle")
        .attr("transform", (d, i) => {
        return "translate("+(i*size)+","+(size*100+(size/2)+15)+") rotate(90)";
    }).text(function(d) { return d.country_name; });


}


function cluster_creation(data,containername,svg,json_obj,stageH,stageW,section,display_param){


    //
    // simulation parameters
    //

    const nodeRadius = 4;
    const nDots = men_vs_women["2018"]["L_total_seats"]/50;

    const moodColor = (mood) => ({
        female: '#E591C2',
        ok: 'gray',
        male: '#56AAE6'}[mood]);

    const continentColor = (mood) => ({
        male: '#56AAE6',
        female: '#E591C2',
        whole: 'gray',

        Africa:   '#E74C3C',
        Asia:   '#CA2C68',
        Europe:  '#6E248D',
        "North America":'#009B90',
        Oceania:  '#009C41',
        "South America": '#E67E22'}[mood]);

    // start with all nodes gray
    let curMoodColor = (mood) => 'gray';

    const nodeColor = (n) => n.controlId ? 'transparent' : curMoodColor(n.mood);

    // 'fake data' - ratios per 'dept'
    const depts =  {};

    for (const [key, value_1] of Object.entries(continet_wise["2018"])) { depts[key] = {}; depts[key]["female"] = Math.round(value_1["L_total_women"]/50);
        depts[key]["male"] = Math.round((value_1["L_total_seats"] - value_1["L_total_women"]) /50);
    };

    _depts = depts;

    // positions of the control points
    const marginX = 120;
    const deptWidth = stageW;
    const controlPos = {
        init: [            0, 0],

        male:  [-stageW/4,             0],
        female: [ stageW/4,             0],

        "South America":   [stageW/3,        1/10 * stageW],
        Europe:   [stageW/3,        -1/10 * stageW],
        Asia:   [ 0,          -1/10 * stageW],
        Oceania:   [0,        1/10 * stageW],
        Africa:   [ -stageW/3,        -1/10 * stageW],
        "North America":   [-stageW/3,        1/10 * stageW]};

    // control node template
    const mkControlNode = (name) => {
        const [x, y] = controlPos[name];
        return {fx: x, fy: y, controlId: name};
    }

    // normal node template
    // random position around 'init' point
    const mkNode = (dept, mood) => {
        const dist = Math.random() * 1/4 * stageW;
        const angle = Math.random() * Math.PI * 2;
        return {
            mood: mood,
            dept: dept,
            x: Math.cos(angle) * dist + controlPos['init'][0],
            y: Math.sin(angle) * dist + controlPos['init'][1]
        }
    }

    // return a function which samples from discrete distribution
    // defined by `table`
    function discreteSampler(table, format) {

        // repeat value returned by `what()` `n` times
        // need to make copies of the objects (via return value)
        const repeat = (n, what) => Array(n).fill(undefined).map(() => what());

        // pick random element from array
        const randElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // `table` is 2 attributes, dept and mood
        // {dept: {mood: count}}
        // flat table is inverted, so it can be sampled uniformly
        // we need to keep the call, not the result to get separate instances
        const flatTable = [];
        Object.keys(table).forEach((k1) => {
            Object.keys(table[k1]).forEach((k2) => {
                flatTable.push(...repeat(table[k1][k2], () => () => format(k1, k2)));
            });
        });

        // call the element 'constructor'
        return () => randElement(flatTable)();
    }



    // create_headers(Object.keys(continet_wise["2018"]).slice(0,3))
    // size the canvas

    svg
        .append("div")
        // Container class to make it responsive.
        .classed(containername, true)
        .style("display",display_param).append("canvas").attr("id","stage");
    const stage = setupCanvas("#stage", stageW, stageH-100);
    create_headers(["complete world"],"top")
    //

    const controlNodes = Object.keys(controlPos).map(mkControlNode);

    const sampleOne = discreteSampler(depts, mkNode);
    const nodes = controlNodes.concat(d3.range(nDots).map(sampleOne));

    // every non-control node is supposed to be linked to exactly
    // one control node
    // that is there is 1-to-1 correspondence between links and nodes
    // (after skipping the control nodes)
    const nodeIdx = (i) => i + controlNodes.length;

    const links = nodes.slice(controlNodes.length)
        .map((n, i) => ({source: nodeIdx(i), target: 'init'}))

    //
    // prepare simulation
    //
    const simulation = d3.forceSimulation(nodes)

    // separate link force, so the links can be updated at runtime
    // use id for most of the nodes, but use controlId for the control nodes
    const linkForce = d3.forceLink(links)
        .strength(.2)
        .distance(1)
        .id((node) => node.controlId || node.index)

    // separate charge, so we can change distanceMax later
    const chargeForce = d3.forceManyBody()
        .strength((n, i) => i < controlNodes.length ? 0 : -4)

    // need to apply force only after node.id is defined by forcesiulation
    simulation
        .force("links", linkForce)
        .force("charge", chargeForce)

    // on every tick redraw with current colors
    simulation.on("tick.draw", () => stage.drawDots(nodes, nodeColor));

    // debug outputs
    // simulation.on("tick.dump", () => {
    //   console.log('tick',
    //     simulation.alpha(),
    //     simulation.alphaMin()
    //   );
    // });
    // simulation.on("end.log", () => console.log("end"))

    //
    // top level animation control
    //
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    const simulationEnd = () => new Promise((resolve) => simulation.on(`end.${+new Date}`, resolve));

    // we're happy with quite short simulations
    simulation
        .alphaMin(.1)
        .velocityDecay(.6);

    chargeForce.distanceMax(1/3 * stageW);

    simulationEnd()
        .then(() => {
            curMoodColor = moodColor;
            chargeForce.distanceMax(1/6 * stageW)
            return targetAnimation((n) => n.mood)})
        .then(() => {
            chargeForce.distanceMax(1/8 * stageW);
            simulation.velocityDecay(.5);
            return targetAnimation((n) => n.dept)})

    // retarget each node to `newTarget(node)`
    // animate in batches
    function targetAnimation(newTarget) {

        // animate nodes from bottom to top
        // collect the order only once, this will give a little
        // randomness when the simulation is running
        const inds = d3.range(links.length)
            .sort((A, B) => nodes[nodeIdx(A)].y > nodes[nodeIdx(B)].y ? -1 : 1)

        const changeBatches = batches(inds, 10);

        const updateSimulation = () => {
            linkForce.links(links);
            simulation.alpha(1);
        }

        // wake if the simulation is already over
        simulation.alpha(1).restart();


        // process a batch every time timer ticks
        const timer = d3.interval(() => {
            const {value, done} = changeBatches.next();
            if (!done) {
                // update current batch
                for (let i of value) {
                    links[i].target = newTarget(nodes[nodeIdx(i)]);
                }



                updateSimulation();
            } else {
                d3.select('.svg-container-3').select("svg").remove();
                current_time = current_time +1;
                if (current_time == 1){
                    create_headers(["male","female"],"top")
                }
                else if (current_time == 2){
                    create_headers(Object.keys(continet_wise["2018"]).slice(0,3),"top")
                    create_headers(Object.keys(continet_wise["2018"]).slice(3,6),"bottom")
                }

                console.log(current_time);

                timer.stop();
            }
        }, 10);

        return simulationEnd();
    }


    function create_headers(data,loc){
        if(loc=="top")
        {
            var elem = d3.select('.svg-container-3').append("svg").lower().attr("width", stageW)
                .attr("height", 40);
        }
        else {
            var elem = d3.select('.svg-container-3').append("svg").attr("width", stageW)
                .attr("height", 40);
        }



        var bar = elem.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * stageW/data.length + ",0)"; });

        bar.append("rect")
            .attr("x", function(d,i) { return (stageW/(data.length*4)) })
            .attr("y", 0)
            .attr("width", (stageW/(data.length*2)))
            .attr("height", 40)
            .style('fill', function(d) { return continentColor(d); });

        bar.append("text")
            .attr("x", function(d) { return (stageW/data.length)/2; })
            .attr("y", 0)
            .attr("dy", "1.5em")
            .style('fill', 'white')
            .style("text-anchor", "middle")
            .text(function(d) { return d; });

    }
    //
    // graphical output
    //
    function setupCanvas(selector, W, H) {
        d3.select(selector)
            .attr("width", W)
            .attr("height", H)
            .style("width", W + "px")
            .style("height", H + "px");

        const stage = document.querySelector(selector).getContext("2d");
        stage.translate(W / 2, H / 2);

        // we're keeping <0, 0> in the middle of the stage
        const stageTop = - H / 2;
        const stageLeft = - W / 2;

        function drawDots(_nodes, getColor) {
            var stoke_color = "white"
            var icon_obj = empty_imageObj;
            stage.clearRect(stageLeft, stageTop, W, H),
                _nodes.forEach(n => {
                    if (n["dept"]) {

                        stoke_color = continentColor(n["dept"])
                    }
                    if (n["mood"] == "male"){
                        var ind = n.index%2;
                        icon_obj = all_male_imageObj[0];
                    }
                    else if (n["mood"] == "female"){
                        var ind = n.index%2;
                        icon_obj = all_female_imageObj[0];

                    }



                    //stage.arc(n.x, n.y, nodeRadius, 0, 2 * Math.PI, 0),
                    stage.imageSmoothingEnabled = false,
                        stage.mozImageSmoothingEnabled = false,
                        stage.webkitImageSmoothingEnabled = false,
                        stage.msImageSmoothingEnabled = false,
                        stage.drawImage(icon_obj, n.x, n.y,16 * window.devicePixelRatio,16 * window.devicePixelRatio);


                    // stage.fillStyle = getColor(n),
                   //     stage.beginPath(),
                   //     stage.arc(n.x, n.y, nodeRadius, 0, 2 * Math.PI, 0),
                   //     stage.fill(),
                    //    stage.strokeStyle = stoke_color,
                     //   stage.lineWidth = 2;
                    // stage.stroke();
                });
        }

        return {drawDots: drawDots};
    }

    //
    // utils
    //

    // subsequently yield iterators of given `size`
    // these have to be fully consumed
    function *batches(iterable, size) {
        const it = iterable[Symbol.iterator]();
        let value, done = false;
        do {
            // this is for the case when batch ends at the end of iterable
            // (we don't want to yield empty batch)
            ({value, done} = it.next());
            if (done) return value;

            let currBatch = 1;
            yield function*() {
                yield value;
                while(currBatch < size) {
                    ({value, done} = it.next());
                    if (done) return value;

                    yield value;
                    currBatch += 1;
                }
            }();
        } while (true);
    }
}
