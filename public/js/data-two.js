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

            let incidentDate = [];

            // loop thru all 2019 data & grab event descriptions
            for (let i = 0; i < response.features.length; i++) {
                
                // snag date
                //let date = new Date(response.features[i].attributes.DATE_REPT).toLocaleString().split(',')[0];

                let date = new Date(response.features[i].attributes.DATE_REPT).toString();

                console.log(date);

                // create new object
                let event = {
                    desc: date,
                    count: 1
                }

                // create new array of objects
                incidentDate.push(event);
            }

            // d3 chart taking an associative array
            data = d3.entries(incidentDate)
            console.log(data)

            // Set the dimensions of the canvas / graph
            var margin = {top: 30, right: 20, bottom: 30, left: 50},
                width = 600 - margin.left - margin.right,
                height = 270 - margin.top - margin.bottom;

            // Parse the date / time
            var parseDate = d3.time.format("%d-%b-%Y");

            // Set the ranges
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);

            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            // Define the line
            var valueline = d3.svg.line()
                .x(function(d) { return x(d.value.desc); })
                .y(function(d) { return y(d.value.key); });
                
            // Adds the svg canvas
            var svg = d3.select("#graphic")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", 
                        "translate(" + margin.left + "," + margin.top + ")");

            // Get the data

                data.forEach(function(d) {
                    d.value.desc = parseDate(d.value.desc);
                    d.value.key = +d.value.key;
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.value.desc; }));
                y.domain([0, d3.max(data, function(d) { return d.value.key; })]);

                // Add the valueline path.
                svg.append("path")
                    .attr("class", "line")
                    .attr("d", valueline(data));

                // Add the scatterplot
                svg.selectAll("dot")
                    .data(data)
                .enter().append("circle")
                    .attr("r", 3.5)
                    .attr("cx", function(d) { return x(d.value.desc); })
                    .attr("cy", function(d) { return y(d.value.key); });

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
            
    }
    )
});
