$(document).ready(function () {

    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-product-button', function () {
        var categories_options_html = `<select name='category_id' id="create-category" class='form-control'>`;
        $.each(categories, function (key, val) {
            categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
        });
        categories_options_html += `</select>`;
        var create_book_html = `
        <div id="read-book" class="read-products-button btn btn-primary mt-5 mb-3">
            Read Product
        </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="create-name" name="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" id="create-price" min="1" name="price" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" id="create-description" class="form-control" required></textarea>
            </div>
            <div class="form-group">
                <label>Category</label>
                ` + categories_options_html + `
            </div>
            <button type="submit" id="submit-create-book-form" class="btn btn-primary">Create Book</button>
        `;
        $("#page-content").html(create_book_html);
        changePageTitle("Create Book");
    });

    $(document).on('click', '#submit-create-book-form', function(e) {
        //ambil form datanya trs diubah ke bentuk json
        // var form_data = JSON.stringify($(this).serializeObject());
        var form_data = {
            'name' : $("#create-name").val(),
            'price' : $("#create-price").val(),
            'description' : $("#create-description").val(),
            'category_id' : $("#create-category").val(),
        };
        form_data = JSON.stringify(form_data);
        //masukin form datanya ke api
        $.ajax({
            url: "http://localhost:5000/product/create.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result){
                console.log(result)
                //buku ditambahkan, terus nunjukin list buku
                // showBooks(); Ini diganti sama methodmu
            }, 
            error: function(xhr, resp, text) {
                console.log(text);
            }
        });
    });
})