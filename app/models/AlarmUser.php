<?php

use Phalcon\Mvc\Model;

class AlarmUser extends Model
{
    public $alarm_guid;
    public $user_guid;

    public $created_at;
    public $updated_at;

    public function initialize(){
        $this->belongsTo("user_guid", "User", "guid");
        $this->belongsTo("alarm_guid", "Alarm", "guid");
    }
}
