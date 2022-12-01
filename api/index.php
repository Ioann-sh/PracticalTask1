<?php

error_reporting();
//header("Access-Control-Allow-Origin: *");
require 'application/Application.php';

function router($params){
    $method = $params['method'];
    if ($method){
        $app = new Application();
        switch ($method){
            case 'check': return true;

            case 'authentication': return $app -> authentication($params);
            case 'form': return $app -> form($params);
        }
    }
    return false;
}

function answer($data){
    if ($data){
        return array(
            'result' => 'ok',
            'data' => $data
        );
    }
    return array(
        'result' => 'error'
    );
}

echo json_encode(answer(router($_GET)));