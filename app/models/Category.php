<?php

use Phalcon\Mvc\Model;

class Category extends Model
{
    public $id;
    public $guid;
    public $name;
    public $parent_id;
    public $template_details_guid;

    public $created_at;
    public $updated_at;

    public function initialize(){
		$this->belongsTo("template_details_guid", "TemplateDetails", "guid");
	}
}