$(window).load(function() {
    
    let queryUrl = 'https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/48/query?where=1%3D1&outFields=*&outSR=4326&f=json';


    $.ajax({
        url: queryUrl,
        method: 'GET',
        dataType: 'jsonp'
    }).then(function(response) {
            console.log('hit?');
            console.log(response);
            
            for (let i = 0; i < 100; i++) {
                // unix time stamp -- had to convert           
                let date = new Date(response.features[i].attributes.DATE_REPT);

                let realdate = $('<p>').text('Date: ' + date);

                // description of event
                let desc = $('<p>').text('Description: ' + response.features[i].attributes.STATUTDESC);

                // address of event
                let addy = $('<p>').text('Address: ' + response.features[i].attributes.ADDRESS_PUBLIC);
                
                $('.list-data').append(realdate,desc,addy);
                $('.list-data').append('<div class="liner"></div>')
            }
        }
    )
});

function myFunction1() {
    document.getElementById("myDropdown-1").classList.toggle("show");

    if($( "#myDropdown-2" ).is( ":visible" )){
        document.getElementById("myDropdown-2").classList.toggle("show"); 
    }
    // document.getElementById("myDropdownAmount").classList.toggle("show");
    
  }

  function myFunction2() {
    document.getElementById("myDropdown-2").classList.toggle("show");
    // document.getElementById("myDropdownAmount").classList.toggle("show");
    if($( "#myDropdown-1" ).is( ":visible" )){
        document.getElementById("myDropdown-1").classList.toggle("show"); 
    }
    
  }
  
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  