<?php

use Phalcon\Mvc\Model;

class User extends Model
{
    public $id;
    public $guid;
    public $name;
    public $email;
    public $password;

    public $created_at;
    public $updated_at;

    public function initialize(){
        $this->hasManyToMany(
            "guid",
            "RoleUser",
            "user_guid", "role_guid",
            "Role",
            "guid"
        );
        $this->hasManyToMany(
            "guid",
            "AlarmUser",
            "user_guid", "alarm_guid",
            "Alarm",
            "guid"
        );
        $this->hasMany("guid", "ResponsiblePerson", "user_guid");
        $this->hasMany("guid", "TemplateDetails", "user_guid");
    }
}
