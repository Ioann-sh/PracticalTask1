<?php

class Form
{
    private $db;

    function __construct($db){
        $this->db = $db;
    }

    public function submitForm($id, $input, $textarea, $radioButton, $select){
        return array(
            'id' => $id,
            'input' => $input,
            'textarea' => $textarea,
            'radioButton' => $radioButton,
            'select' => $select
        );
    }
}