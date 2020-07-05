<?php

//header yang dibutuhkan
header("Access-Control-Allow-Origin");
header("Content-Type: application/json; charset=UTF-8");

//koneksi ke database, ngambil getConnection dr folder database
include_once '../config/database.php';
include_once '../objects/product.php';

//instansiasi database dan produks
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$product = new Product($db);

//query products
$stmt = $product->read();
$num = $stmt->rowCount(); //membaca apakah di $product ada data(records)

//buat ngecek kalo ada records lebih dr 0
if($num>0){

    //kalo lbh dari 0 dibuat arraynya wkwk
    // $products_arr=array();
    // $products_arr["records"]=array();

    // while($row = $stmt->fetchAll(PDO::FETCH_ASSOC)){

    //     $product_item=array(
    //         "id"=>$row['id'],
    //         "name"=>$row['name'],
    //         "description"=>html_entity_decode($row['description']),
    //         "category_id"=>$row['category_id'],
    //         "category_name"=>$row['category_name']
    //     );
    //     array_push($products_arr["records"], $product_item);
    // }
    //set response code - 200 OK
    http_response_code(200);
    //show product dlm bentuk json
    // echo json_encode($products_arr);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>