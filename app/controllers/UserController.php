<?php

use Phalcon\Paginator\Adapter\QueryBuilder as PaginatorModel;

class UserController extends BaseController{   

    public function listAction(){
        // Current page to show
        $currentPage = $this->request->getQuery('page', 'int', 1);

        
        $builder = $this->modelsManager->createBuilder()
                        ->from('User')
                        ->join('RoleUser', 'User.guid = RoleUser.user_guid')
                        ->join('Role', 'Role.guid = RoleUser.role_guid')
                        ->distinct(true)
                        ->orderBy('User.created_at');


        $paginator = new PaginatorModel(
            array(
                "builder"  => $builder,
                "limit" => 5,
                "page"  => $currentPage
            )
        );

        $page = $paginator->getPaginate();

        $this->view->setVar('page', $page);
    }
}
