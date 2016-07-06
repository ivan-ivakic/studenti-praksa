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
		$this->hasMany("guid", "AlarmUser", "user_guid");
		$this->hasMany("guid", "RoleUser", "user_guid");
		$this->hasMany("guid", "ResponsiblePerson", "user_guid");
		$this->hasMany("guid", "TemplateDetails", "user_guid");
	}
}