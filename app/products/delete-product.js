$(document).ready(function () {

    $(document).on('click', '#yes-button', function () { //buat event buat manggil id button dari index.html
        var product_id = $('.delete-product-button').attr('data-id');
        console.log(product_id);

        var form_data = { //ngambil dr update.js buat ngambil idnya aja
            id: product_id,
        };
        form_data = JSON.stringify(form_data); //mengubah json ke stringnya

        // send delete request to api / remote server
        $.ajax({
            url: "http://localhost:5000/product/delete.php",
            type: "POST",
            dataType: 'json',
            data: form_data,
            success: function (result) {
                console.log(result)
                //buat ngereload data biar kembali halaman read
                $('#exampleModal').modal('hide'); //dicari modalnya apa, trs di hide. 
                showProducts();
            },
            error: function (xhr, resp, text) { //xhr itu function ajaxnya, resp itu responnya
                if (xhr.status !== 200) {
                    console.log(xhr, resp, text);
                }
            }
        });
    });
});