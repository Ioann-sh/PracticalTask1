<?php

require("db/DB.php");
require("user/User.php");
require("form/Form.php");

class Application
{
    private $user;
    private $form;

    function __construct()
    {
        $config = json_decode(file_get_contents('./config/config.json'), true);
        $db = new DB($config["DataBase"]);
        $this->user = new User($db);
        $this->form = new Form($db);
    }

    public function authentication($params){
        if ($params['email'] && $params['password']){
            return $this->user->login($params['email'], $params['password']);
        }
    }

    public function submitForm($params){
        if ($params['id'] && ($params['input'] || $params['textarea'] || $params['radioButton'] || $params['select'] || $params['flag'])) {
            return $this->form->submitForm($params['id'], $params['input'], $params['textarea'], $params['radioButton'], $params['select'], $params['flag']);
        }
    }
}