<?php

$serividor="localhost";
$banco="petshopdb";
$senha="";
$usuario="root";

try {
    $pdo = new PDO("mysql:dbname=$banco host=$servidor charset=utf8","$usuario","$senha");
    echo "conectado com sucesso ao banco de dados";
} catch (Exception $e) {

    echo "<h1>Falha ao conectar ao servidor (entre em contato com admin)</h1>";
    echo $e; 
}











?>