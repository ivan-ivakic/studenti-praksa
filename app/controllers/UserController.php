<?php

use Phalcon\Paginator\Adapter\Model as PaginatorModel;

class UserController extends BaseController{   

    public function listAction(){
        // Current page to show
        $currentPage = 1;
        $currentPage = $this->request->getQuery('page', 'int');

        $users = User::find(
            array(
                'order' =>  'created_at DESC'
            )
        );

        $paginator = new PaginatorModel(
            array(
                "data"  => $users,
                "limit" => 5,
                "page"  => $currentPage
            )
        );

        $page = $paginator->getPaginate();

        $this->view->setVar('page', $page);
    }
}