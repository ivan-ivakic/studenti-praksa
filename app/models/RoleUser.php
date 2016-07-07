<?php

use Phalcon\Mvc\Model;

class RoleUser extends Model
{
    public $role_guid;
    public $user_guid;

    public $created_at;
    public $updated_at;

    public function initialize(){
    	$this->belongsTo("role_guid", "Role", "guid");
    	$this->belongsTo("user_guid", "User", "guid");
    }
}
