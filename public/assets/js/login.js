//signup
// grab user inputted username, email, and password, ajax to server
$("#submitNew").on("click", function(event){
    event.preventDefault();
    let rawUser = $("#signup-username").val()
    let rawEmail = $("#signup-email").val()
    let rawP = $("#signup-password").val()
    let queryURL = "/newUser?" + "u=" + rawUser + "&p=" + rawP + "&e=" + rawEmail
    console.log(rawUser)
    console.log(rawP)
    $.ajax(queryURL,{
        method:"POST",
        success: function(res){
            console.log("victory!")
            window.location.href = res
        }
    })
})

//signin

$("#submitVal").on("click", function(event){
    event.preventDefault();
    let rawUser = $("#signin-username").val()
    let rawP = $("#signin-password").val()
    console.log(rawUser)
    console.log(rawP)
    let queryURL = "/assess?" + "u=" + rawUser + "&p=" + rawP
    $.ajax(queryURL,{
        method:"POST",
        success: function(res){
            console.log("victory!")
            window.location.href = res; 
        }
    })
})