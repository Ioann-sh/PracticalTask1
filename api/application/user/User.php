<?php

class User
{
    private $db;

    function __construct($db){
        $this->db = $db;
    }

    public function login($email, $password){
        $user = $this->db->getUser($email);
        if ($user && $password === $user->password) {
            return array(
                'user' => $user->name,
                'id' => $user->id
            );
        } else {
            return 'User not found';
        }
    }

}