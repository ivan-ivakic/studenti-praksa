<?php

use Phalcon\Mvc\Model;

class TemplateDetails extends Model
{
    public $id;
    public $guid;
    public $name;
    public $number;
    public $tag;
    public $mime;
    public $file;
    public $version;
    public $thumbnail;
    public $user_guid;
    public $template_guid;

    public $created_at;
    public $updated_at;

    public function initialize(){
        $this->hasMany("guid", "ResponsiblePerson", "template_details_guid");
        $this->hasMany("guid", "Category", "template_details_guid");
        $this->belongsTo("user_guid", "User", "guid");
        $this->belongsTo("template_guid", "Template", "guid");
    }
}