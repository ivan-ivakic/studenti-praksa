<?php

use Phalcon\Forms\Form;
use Phalcon\Forms\Element\Text;
use Phalcon\Forms\Element\Password;
use Phalcon\Forms\Element\Check;
use Phalcon\Validation\Validator\PresenceOf;
use Phalcon\Validation\Validator\Email;

class UserForm extends Form{

    public function initialize(){

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
                    'message' => 'Ime je obavezno polje'
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


        $password = new Password("password", array(
            'class' =>  'form-control'
        ));

        $password->addValidator(
            new PresenceOf(
                array(
                    'message' => 'Email je obavezno polje'
                )
            )
        );

        $this->add($password);


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
