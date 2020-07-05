$(document).ready(function () {

    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-product-button', function () {
        // get product id
        var id = $(this).attr('data-id');
        console.log(id);
        // baca datanya berdasarkan yg udh diambil di API
        $.getJSON("http://localhost:5000/product/read_one.php?id=" + id, function (data) {

            //ini datanya cuma sampe nama,dll selain pilihan category
            var name = data.name;
            var price = data.price;
            var description = data.description;
            var category_id = data.category_id;
            var category_name = data.category_name;

            //lha ini baru load dropdown categrynya
            $.getJSON("http://localhost:5000/category/read.php", function (data) {

                var categories_options_html = `<select name='category_id' class='form-control'>`;
                $.each(categories, function (key, val) {
                    if (val.id == category_id) { categories_options_html += `<option value='` + val.id + `' selected>` + val.name + `</option>`; }
                    else { categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`; }
                });
                categories_options_html += `</select>`;

                //setelah di update, trs ini html buat baca datanya.
                var update_product_html = `
                <div id='read-products' class='update-product-button btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Products
                </div>

                <!-- update produk html form-->
                <form id='update-product-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table-bordered'>
                
                        <!-- name field -->
                        <tr>
                            <td>Name</td>
                            <td><input value=\"` + name + `\" type='text' name='name' class='form-control' required /></td>
                        </tr>
                
                        <!-- price field -->
                        <tr>
                            <td>Price</td>
                            <td><input value=\"` + price + `\" type='number' min='1' name='price' class='form-control' required /></td>
                        </tr>
                
                        <!-- description field -->
                        <tr>
                            <td>Description</td>
                            <td><textarea name='description' class='form-control' required>` + description + `</textarea></td>
                        </tr>
                
                        <!-- categories 'select' field -->
                        <tr>
                            <td>Category</td>
                            <td>` + categories_options_html + `</td>
                        </tr>
                
                        <tr>
                
                            <!-- hidden 'product id' to identify which record to delete -->
                            <td><input value=\"` + id + `\" name='id' type='hidden' /></td>
                
                            <!-- button to submit form -->
                            <td>
                                <button type='submit' class='btn btn-info'>
                                    <span class='glyphicon glyphicon-edit'></span> Update Product
                                </button>
                            </td>
                
                        </tr>
                
                    </table>
                </form>`;

                $("#page-content").html(update_product_html);
                changePageTitle("Update Product");
            });
        });
    });

    //kalo udh masukin data di form, trs di handel sm script ini
    $(document).on('submit', '#update-product-form', function () {
        var form_data = JSON.stringify($(this).serializeObject()); // error disini 

        // submit form data ke api
        $.ajax({
            url: "http://localhost:5000/product/update.php",
            type: "POST",
            contentType: "application/json",
            data: form_data
        }).done(result => {
            console.log(result);
            showProducts();
            //buku ditambahkan, terus nunjukin list buku
            // showBooks(); Ini diganti sama methodmu 
        }).fail((xhr, resp, text) => {
            if (xhr.status !== 200) console.log(text);
        });
        return false;
    });
});