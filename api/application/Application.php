<?php

class Application
{

    public function authentication($params){
        if ($params['email'] && $params['password']){
            return 'login';
        }
    }

    public function form($params){
        if ($params['input'] && $params['textarea']){
            return 'form';
        }
    }
}