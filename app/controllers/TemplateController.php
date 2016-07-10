<?php

use Phalcon\Mvc\Model\Resultset;

class TemplateController extends BaseController
{
    public function listAction()
    {
        $categoryArray = Category::find(
            array(
                'columns'   => 'id, name, parent_id',
                'order'     => 'name ASC'
            )
        )->toArray();

        $this->view->setVar("categoryArray",    $categoryArray);
    }
}
