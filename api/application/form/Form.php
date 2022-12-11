<?php

class Form
{
    private $db;

    function __construct($db){
        $this->db = $db;
    }

    public function submitForm($id, $input, $textarea, $radioButton, $select, $flag){
        return $this->db->submitForm($id, $input, $textarea, $radioButton, $select, $flag);
    }
}