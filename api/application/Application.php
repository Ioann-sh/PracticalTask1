<?php

require("db/DB.php");
require("user/User.php");

class Application
{
    private $user;

    function __construct()
    {
        $config = json_decode(file_get_contents('./config/config.json'), true);
        $db = new DB($config["DataBase"]);
        $this->user = new User($db);
    }

    public function authentication($params){
        if ($params['email'] && $params['password']){
            return $this->user->login($params['email'], $params['password']);
        }
    }

    public function form($params){
        if ($params['input'] && $params['textarea']){
            return 'form';
        }
    }
}