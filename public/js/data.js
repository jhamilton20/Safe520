// dependencies
//let d3 = require("d3");


// on load call api
$(window).load(function() {
    
    let queryUrl = 'https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/48/query?where=1%3D1&outFields=*&outSR=4326&f=json';


    $.ajax({
        url: queryUrl,
        method: 'GET',
        dataType: 'jsonp'
    }).then(function(response) {
            console.log(response);

            let incident = [];
            let incidentCount = [];
            
            // loop thru all 2019 data & grab event descriptions
            for (let i = 0; i < response.features.length; i++) {

                // create new object
                let event = {
                    desc: response.features[i].attributes.STATUTDESC
                }
                // create new array of objects
                incident.push(event);

                if (event.desc in incidentCount) {
                    incidentCount[event.desc] += 1;
                } else {
                    incidentCount[event.desc] = 1;
                }
            }

            // d3 chart taking an associative array
            data = d3.entries(incidentCount);
            console.log(data)

            // sort bars based on value
            data = data.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            // set up svg using margin conventions
            let margin = {
                top: 15,
                right: 25,
                bottom: 15,
                left: 250
            };

            let height = 3000 - margin.top - margin.bottom,
                width = .25 * height - margin.left - margin.right;
                //height = 3000 - margin.top - margin.bottom;

            let svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            let x = d3.scale.linear()
                .range([0, width])
                .domain([0, d3.max(data, function (d) {
                    return d.value;
                })]);

            let y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1)
                .domain(data.map(function (d) {
                    return d.key;
                }));

            // make y axis to show bar names
            let yAxis = d3.svg.axis()
                .scale(y)
                //no tick marks
                .tickSize(0)
                .orient("left");

            let gy = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            let bars = svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("g")

            // append rects
            bars.append("rect")
                .attr("class", "bar")
                .attr("y", function (d) {
                    return y(d.key);
                })
                .attr("height", y.rangeBand())
                .attr("x", 0)
                .attr("width", function (d) {
                    return x(d.value);
                });

            // add a value label to the right of each bar
            bars.append("text")
                .attr("class", "label")
                //y position of the label is halfway down the bar
                .attr("y", function (d) {
                    return y(d.key) + y.rangeBand() / 2 + 4;
                })
                // x position is 3 pixels to the right of the bar
                .attr("x", function (d) {
                    return x(d.value) + 3;
                })
                .text(function (d) {
                    return d.value;
                });    
              
        }
    )
});