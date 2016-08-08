<?php

use Phalcon\Mvc\Controller;

class BaseController extends Controller
{
    public function initialize()
    {
       $this->assets
           ->addCss('css/app.css')
           ->addCss('css/framework.css')
           ->addCss('css/bootstrap.min.css');

       $this->assets
           ->addJs('js/jquery.min.js')
           ->addJs('js/bootstrap.min.js');
    }
}
