//signup
// grab user inputted username, email, and password, ajax to server
$("#submitNew").on("click", function(){
    let rawUser = $("#signup-username").val()
    let rawEmail = $("#signup-email").val()
    let rawP = $("#signup-password").val()
    let url = "/newUser"
    console.log(rawUser)
    console.log(rawP)
    $.ajax({
        url:url,
        type:"POST",
        data:{
            username: rawUser,
            email: rawEmail,
            password: rawP
        }
    }).then(function(res){
        window.location.href = res; 
    })
})

//signin

$("#submitVal").on("click", function(){
    let rawUser = $("#signin-username").val()
    let rawP = $("#signin-password").val()
    let url = "/assess"
    console.log(rawUser)
    console.log(rawP)
    $.ajax({
        url:url,
        type:"POST",
        data:{
            username: rawUser,
            password: rawP
        }
    }).then(function(res){
        window.location.href = res; 
    })
})