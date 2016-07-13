<?php

use Phalcon\Mvc\Router\Group as RouterGroup;

class TemplateRoutes extends RouterGroup
{
    public function initialize()
    {
        $this->setPaths(
            array(
                "controller"    => "template"
            )
        );

        $this->setPrefix('/template');

        $this->add(
            "/list/category/:int",
            array(
                "action"    => "list",
                "category"  => 1
            )
        )->setName("template-category");

        $this->add(
            "/list/page/:int",
            array(
                "action"    => "list",
                "page"      => 1
            )
        )->setName("template-page");

        $this->add(
            "/list/category/([0-9]{3})/page/:int",
            array(
                "action"    => "list",
                "category"  => 1,
                "page"      => 2
            )
        )->setName("template-category-page");
    }
}
