<?php

use Phalcon\Db;
use Phalcon\Paginator\Adapter\NativeArray as PaginatorArray;

class TemplateController extends BaseController
{
    public function listAction()
    {
        // Fetch URL params
        $categoryId     = $this->dispatcher->getParam("category");
        $currentPageNr    = $this->dispatcher->getParam("page");

        // Find all categories for sidebar
        $categories = Category::find(
            array(
                'columns'   => 'id, name, parent_id',
                'order'     => 'name ASC'
            )
        )->toArray();

        $templates = $this->getTemplatesForCategory($categoryId);

        // Initialize pagination
        $paginator = new PaginatorArray(
            array(
                "data"  => $templates,
                "limit" => 5,
                "page"  => $currentPageNr
            )
        );
        $page = $paginator->getPaginate();

        // Pass params to view
        $this->view->setVar("categories",       $categories);
        $this->view->setVar("templates",        $templates);
        $this->view->setVar("categoryId",       $categoryId);
        $this->view->setVar("currentPageNr",    $currentPageNr);
        $this->view->setVar("page",             $page);
    }

    public function getTemplatesForCategory($categoryId)
    {
        // Build find template query
        $sql = "SELECT t.id, td.name, td.tag, td.number, td.updated_at
                FROM template AS t, template_details AS td
                WHERE (t.current_version = td.version
                      AND t.guid = td.template_guid ";

        if(isset($categoryId))
        {
            $catAndSubcats = $this->getCategoryAndSubcategories($categoryId);

            if(!empty($catAndSubcats))
            {
                foreach($catAndSubcats as $c) {
                    if ($c == reset($catAndSubcats)) {
                        $sql .= ' AND (';
                    }
                    $sql .= " td.category_guid = '" . $c['guid'] . "' ";
                    if ($c != end($catAndSubcats)) {
                        $sql .= ' OR ';
                    } else
                    {
                        $sql .= " ) ";
                    }
                }

                $sql .= " ) ORDER BY t.updated_at DESC";

                $result = $this->db->query($sql);
                $result->setFetchMode(Db::FETCH_OBJ);
                return $result->fetchAll();
            }
            else {
                return array();
            }
        }
    }

    public function getCategoryAndSubcategories($categoryId)
    {
        $sql = "SELECT id, name, guid FROM category WHERE id = $categoryId
                UNION
                SELECT id, name, guid FROM (SELECT * FROM category ORDER BY parent_id, id) categories_sorted,
                (SELECT @pv := $categoryId) initialisation
                WHERE find_in_set(parent_id, @pv) > 0
                    AND @pv := concat(@pv, ',', id)";
        $result = $this->db->query($sql);
        $result->setFetchMode(Db::FETCH_ASSOC);
        return $result->fetchAll();
    }
}
