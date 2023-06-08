<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");

$dsn = 'mysql:host=localhost;dbname=id19521974_estudo';
$username = 'id19521974_admin';
$password = 'senhas%Toke21';

if(!empty($_POST["acao"]) == "GET" || !empty($_POST["acao"]) == "POST"){

    if ($_POST["acao"] == "GET") {
        $nome =  $_POST["Jogador"];
    
        try {
            $conn = new PDO($dsn, $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            //fazer consulta no banco se o nome do jogador atual já tem na base de dados
            $sele = $conn->prepare("SELECT * FROM jogador WHERE jogador = :nome");
            $sele->bindParam(':nome', $nome);
            $sele->execute();
            $result = $sele->fetch(PDO::FETCH_ASSOC); //se tiver o nome ele vai colocar o resultad aq
           if($result){
            echo json_encode('true');
           }else{
            echo json_encode('false');
           }
    
        } catch (PDOException $e) {
            echo json_encode("Erro ao inserir dados: " . $e->getMessage());
        }
    } else if ($_POST["acao"] == "POST") {
    
        $nome =  $_POST["Jogador"];
        $acertos = (int) $_POST["Acertos"];
        $erros = (int) $_POST["Erros"];
        $duracao =  $_POST["Duracao"];
    
    
    
        try {
            $conn = new PDO($dsn, $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            //fazer consulta no banco se o nome do jogador atual já tem na base de dados
            $sele = $conn->prepare("SELECT * FROM jogador WHERE jogador = :nome");
            $sele->bindParam(':nome', $nome);
            $sele->execute();
            $result = $sele->fetch(PDO::FETCH_ASSOC); //se tiver o nome ele vai colocar o resultad aq
    
            //SQL para inserir na base de dados 
    
    
            //se não tiver nome atual ele vai colocar um novo nome no banco
            if (!$result) {
                $sql = "INSERT INTO jogador (jogador, acertos, erros, duracao ) VALUES (:nome, :acertos, :erros, :duracao)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':nome', $nome);
                $stmt->bindParam(':acertos', $acertos);
                $stmt->bindParam(':erros', $erros);
                $stmt->bindParam(':duracao', $duracao);
                $stmt->execute();
            } else {
                $stmt = $conn->prepare('UPDATE jogador SET acertos = :acertos, erros = :erros, duracao = :duracao WHERE id = :id');
                $stmt->execute(array(
                    ':id'   => $result['id'],
                    ':acertos' => $acertos,
                    ':erros' => $erros,
                    ':duracao' => $duracao
                ));
            }
    
            //parte responsável para da o retorno do json para o front End
            //selecionar todas as linhas da t abela e da o retorno 
            $sele = $conn->prepare("SELECT * FROM jogador");
            $sele->execute();
    
            $arr = array();
            foreach ($sele->fetchAll() as $data) {
                $arre = array(
                    "Jogador" => $data['jogador'],
                    "Acertos"  =>  $data['acertos'],
                    "Erros"  =>  $data['erros'],
                    "Duracao"  =>  $data['duracao']
                );
    
                array_push($arr, $arre);
            }
    
            echo json_encode($arr);
        } catch (PDOException $e) {
            echo json_encode("Erro ao inserir dados: " . $e->getMessage());
        }
    } else {
        echo json_encode("Erro ao obter dados");
    }
}else{
    echo json_encode("Acesso negado");
}
