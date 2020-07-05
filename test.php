<?php
    require_once 'config/database.php';

    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $password = $data->password;

    if ($username == null || $password == null) {
        echo "ga boleh null ya";
        header("HTTP/1.1 400 Bad Request");
        exit();
    }

    $database = new Database();
    $db = $database->getConnection();

    $query = "select * from user where username = '$username' and password = '$password' limit 1";
  
    $stmt = $db->prepare($query) or die("Failed to query database ".mysqli_error());
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row['username'] == $username && $row['password'] == $password){
        echo $row['id'];
        header("HTTP/1.1 200 OK");
    } else {
        echo "Failed to login!";
        header("HTTP/1.1 403 Forbidden");
    }

    exit();
?>