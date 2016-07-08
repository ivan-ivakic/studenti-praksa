<?php

use Phalcon\Mvc\Model;

class ResponsiblePerson extends Model
{
    public $user_guid;
    public $template_details_guid;
    public $status;
    public $comment;

    public $created_at;
    public $updated_at;

    public function initialize(){
        $this->belongsTo("user_guid", "User", "guid");
        $this->belongsTo("template_details_guid", "TemplateDetails", "guid");
    }
}
