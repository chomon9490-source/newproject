<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>signupform</title>
</head>

<body>
    <h1>SignUp Form</h1>
    <form action="" method="post">
        Username: <input type="text" name="name"><br><br>
        Email:<input type="email" name="email"><br><br>
        Password: <input type="password" name="password"><br><br>
        <input type="submit" name="submit" value="SignUp">
    </form>

</body>

</html>

<?php
include("connect.php");
if (isset($_POST['submit'])) {

    $username = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $sql = "insert into users(username, email, password) values ('$username', '$email', '$password')";
    $conn->exec($sql);
    echo "Insert Data Successful!";


}

?>