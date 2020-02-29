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
                let date = new Date(response.features[i].attributes.DATE_REPT * 1000);

                console.log('modified date?');
                console.log(date)

                // create new object
                let event = {
                    desc: date,
                    count: 1
                }

                // create new array of objects
                incidentDate.push(event);
            }
            console.log('array of dates - fingas crossed');
            console.log(incidentDate);

            // d3 chart
            // data = d3.entries(incidentCount);
            // console.log(data)

              
        }
    )
});

// burner code

// format dates 
// let day = date.getDay();
// let month = date.getMonth();
// let year = date.getFullYear();
// let dater = day + ' ' + month + ' ' + ' ' + year;