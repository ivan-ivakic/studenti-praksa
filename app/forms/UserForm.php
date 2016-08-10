<?php

use Phalcon\Forms\Form;
use Phalcon\Forms\Element\Text;
use Phalcon\Forms\Element\Password;
use Phalcon\Forms\Element\Check;
use Phalcon\Forms\Element\Hidden;
use Phalcon\Validation\Validator\PresenceOf;
use Phalcon\Validation\Validator\Email;
use Phalcon\Validation\Validator\Confirmation;

class UserForm extends Form{

    public function initialize($user = null, $options = array()){

        if($options['edit']){
            $this->add(new Hidden("id"));
        }

        $name = new Text("name", array(
            'class' =>  'form-control'
        ));

        $name->addValidator(
            new PresenceOf(
                array(
                    'message' => 'Ime je obavezno polje'
                )
            )
        );

        $this->add($name);


        $email = new Text("email", array(
            'class' =>  'form-control'
        ));

        $email->addValidator(
            new PresenceOf(
                array(
                    'message' => 'Email je obavezno polje'
                )
            )
        );

        $email->addValidator(
            new Email(
                array(
                    'message' => 'Nevaljani email format'
                )
            )
        );

        $this->add($email);

        if($options['edit']){
            $password = new Password("password", array(
                'class' =>  'form-control',
                'disabled'  =>  'disabled'
            ));
        } else {
            $password = new Password("password", array(
                'class' =>  'form-control'
            ));

            $password->addValidator(
                new PresenceOf(
                    array(
                        'message' => 'Password je obavezno polje'
                    )
                )
            );

            $password->addValidator(
                new Confirmation(
                    array(
                        'message'   =>  'Password ne odgovara ponovljenom passwordu',
                        'with'      =>  'password_repeat'
                    )
                )
            );
        }   
        $this->add($password);


        if(!$options['edit']){
            $password_repeat = new Password("password_repeat", array(
                'class' =>  'form-control'
            ));

            $password_repeat->addValidator(
                new PresenceOf(
                    array(
                        'message' => 'Ponovi password je obavezno polje'
                    )
                )
            );
            $this->add($password_repeat);
        }   
        


        $this->add(new Check("add_templates", array(
            'value' =>  'Add templates'
        )));

        $this->add(new Check("add_users", array(
            'value' =>  'Add users'
        )));

        $this->add(new Check("add_alarms", array(
            'value' =>  'Add alarms'
        )));
    }
}
