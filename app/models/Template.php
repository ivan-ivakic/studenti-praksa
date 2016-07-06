<?php

use Phalcon\Mvc\Model;

class Template extends Model
{
    public $id;
    public $guid;
    public $current_version;

    public $created_at;
    public $updated_at;

    public function initialize(){
		$this->hasMany("guid", "TemplateDetails", "template_guid");
		$this->hasMany("guid", "Alarm", "template_guid");
	}
}