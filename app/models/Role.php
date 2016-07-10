<?php

use Phalcon\Mvc\Model;

class Role extends Model
{
    public $id;
    public $guid;
    public $name;
    public $description;

    public $created_at;
    public $updated_at;

    public function initialize(){
        $this->hasManyToMany(
            "guid",
            "RoleUser",
            "role_guid", "user_guid",
            "User",
            "guid"
        );
    }
}
