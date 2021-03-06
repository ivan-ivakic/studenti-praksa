<?php

use Phalcon\Mvc\Model;

class Alarm extends Model
{
    public $id;
    public $guid;
    public $name;
    public $date;
    public $comment;
    public $template_guid;

    public $created_at;
    public $updated_at;

    public function initialize(){
        $this->hasManyToMany(
            "guid",
            "AlarmUser",
            "alarm_guid", "user_guid",
            "User",
            "guid"
        );
        $this->belongsTo("template_guid", "Template", "guid");
    }
}
