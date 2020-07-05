var categories = [];

function init() {
    getCategory();
}
function getCategory() {
    $.getJSON("http://localhost:5000/category/read.php", function (data) {
        categories = data;
    });
}

init();

//function utk ganti judul
function changePageTitle(page_title) {
    $('#page-title').text(page_title);
    document.title = page_title;
}

// function to make form values to json format
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// //pindah halaman
let pathName = window.location.pathname.split('/');
let page = pathName[1] == "" ? "home" : pathName[1]; // home itu file html home

var app_html = `
        <div class="container">
            <div class="page-header mt-5">
                <h1 id="page-title"></h1>
            </div>
            <div id="page-content"></div> 
        </div>    
    `;
    $('#app').html(app_html);

// $.ajax({
//     url: `http://localhost:5000/test.php?page=${page}`,
//     type: "GET",
//     "content-type": "application/json; charset=utf-8",
//     data: {},
//     success: function (res) {
//         let data = JSON.parse(res)
//         console.log(data)
//         // $('#page').html(data.header)
//         $('#page').append(data.content)
//     }, error: function (data) {
//         console.log(data.responseText)
//     },
// });



