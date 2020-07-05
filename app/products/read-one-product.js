$(document).ready(function () {

    // handle 'read one' button click
    $(document).on('click', '.read-one-product-button', function () {
        var id = $(this).attr('data-id');
        console.log(id);
        $.getJSON("http://localhost:5000/product/read_one.php?id=" + id, function (data) {

            var read_one_product_html = `
            <!-- nampilin produk list kalo buttonnya udh di klik -->
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Read Products
            </div>

            <!-- product data will be shown in this table -->
            <table class='table table-bordered table-hover'>
            
                <!-- product name -->
                <tr>
                    <td class='w-30-pct'>Name</td>
                    <td class='w-70-pct'>` + data.name + `</td>
                </tr>
            
                <!-- product price -->
                <tr>
                    <td>Price</td>
                    <td>` + data.price + `</td>
                </tr>
            
                <!-- product description -->
                <tr>
                    <td>Description</td>
                    <td>` + data.description + `</td>
                </tr>
            
                <!-- product category name -->
                <tr>
                    <td>Category</td>
                    <td>` + data.category_name + `</td>
                </tr>
            
            </table>`;
            console.log(data);
            $("#page-content").html(read_one_product_html);
        });
        changePageTitle("Read One Project");
    });

});