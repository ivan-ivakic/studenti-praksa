<?php

use Phalcon\Paginator\Adapter\QueryBuilder as PaginatorModel;
use Phalcon\Security\Random;

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

        // get form instance
        $form = new UserForm();

        $this->view->setVar('page', $page);
        $this->view->setVar('form', $form);
    }


    public function createAction(){
        $form = new UserForm();
        $random = new Random();

        // check if method is post
        if($this->request->isPost()){

            // get submited request
            $req = $this->request->getPost();

                // check if the form is valid
                if($form->isValid($req)){

                    // check if email already exists
                    if(!User::findFirstByEmail($req['email'])){

                            $roles = array();

                            // assign roles
                            if (isset($req['add_templates'])){
                                $role = Role::findFirstByName("Add templates");
                                $roles[] = $role;
                            }

                            if (isset($req['add_users'])){
                                $role = Role::findFirstByName("Add users");
                                $roles[] = $role;
                            }

                            if (isset($req['add_alarms'])){
                                $role = Role::findFirstByName("Add alarms");
                                $roles[] = $role;
                            }


                            // create new user
                            $user = new User();
                            $user->guid = $random->uuid();
                            $user->name = $req['name'];
                            $user->email = $req['email'];
                            $user->password =$this->security->hash($req['password']);
                            $user->role = $roles;

                            $user->save();

                            // flash messages to be implemented after login
                            $this->response->redirect('user/list', false, 200);
                            
                    }
                    // email already exists
                    // flash messages to be implemented after login
                }
                // not valid
                foreach ($form->getMessages() as $message) {
                    // flash messages to be implemented after login
                }
        }
        // not POST method
        // // flash messages to be implemented after login
    }
}
