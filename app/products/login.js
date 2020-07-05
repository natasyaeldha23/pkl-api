$(document).ready(function () {
    if (getCookie('user_id')) {
        showProducts();
    } else {
        login();
    }
})

function login() {
    var login_html = `<section class="container-fluid bg">
    <section class="row justify-content-center">
        <section class="col-12 col-sm-6 col-md-3">
            <h1>Login dulu bos</h1>
            
                <form class="form-container">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" name="username" id="username" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password">
                    </div>
                    <button type="submit" class="btn col-auto btn-primary submit-button">Submit</button>
                </form>
                <br>
            
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </section>
    </section>
</section>`;
$("#page-content").html(login_html);
        // gapi.g-signin2.render();
}

$(document).ready(function (){
    $(document).on('click', '.submit-button', function(e){
    e.preventDefault();
    var form_data = {
        'username' : $("#username").val(),
        'password' : $("#password").val(),
    };
    form_data = JSON.stringify(form_data);
    $.ajax({
        url: "http://localhost:5000/test.php",
        type: "POST",
        contentType: "application/json",
        data: form_data,
        success: function(result, status, xhr){
            if (xhr.status == 200) {
                setCookie('user_id', result, 1);
                showProducts();
            }
        }, 
        error: function(xhr, resp, text) {
            console.log(text);
        }
    });
    })
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function onSignIn(googleUser) {
    console.log('User is' + JSON.stringify(googleUser.getBasicProfile()))
    const userData = googleUser.getBasicProfile();
    if (!userData) {
        // ininanti error ya
    }

    //window.location.href = 'index.html';
    showProducts();
    window.localStorage.setItem('google_sign_in', true);
}

