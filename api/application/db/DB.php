<?php

class DB
{
    private $db;

    function __construct($config){
        $host = $config["host"];
        $port = $config["port"];
        $name = $config["name"];
        $user = $config["user"];
        $password = $config["password"];
        /////////////////
        try {
            $this->db = new PDO(
            //"mysql:host=$host;port=$port;dbname=$name",
                'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $name,
                $user,
                $password
            );
        } catch (PDOException $e) {
            die('Failed to connect: ' . $e->getMessage());
        }
    }

    function __destruct()
    {
        $this->db = null;
    }

    public function getUser($email) {
        $query = '
            SELECT * 
            FROM users 
            WHERE email="' . $email . '"';
        return $this->db->query($query)->fetchObject();
    }

//INSERT INTO название_таблицы (столбец1, столбец2, столбецN) VALUES ( значение1, значение2, значениеN)
    public function submitForm($id, $input, $textarea, $radioButton, $select, $flag){ //ADD FLAG
        $query= '
            INSERT INTO form
            (id, input, textarea, radioButton, selector, flag)
            VALUES
            ("' . $id . '","' . $input . '","' . $textarea . '","' . $radioButton . '","' . $select . '","' . $flag . '")';
        return $this->db->query($query)->fetchObject();
    }
}