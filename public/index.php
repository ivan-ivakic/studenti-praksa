<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Url as UrlProvider;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Config\Adapter\Php;

try {

    $config = new Php("../app/config/config.php");

    $loader = new Loader();
    $loader->registerDirs(array(
        $config->phalcon->controllersDir,
        $config->phalcon->modelsDir,
    ))->register();

    $di = new FactoryDefault();

    $di->set('view', function () use ($config) {
        $view = new View();
        $view->setViewsDir($config->phalcon->viewsDir);
        return $view;
    });

    $di->set('url', function () use ($config) {
        $url = new UrlProvider();
        $url->setBaseUri($config->phalcon->baseUri);
        return $url;
    });

    $di->set('db', function() use ($config){
        try {
            $db = new \Phalcon\Db\Adapter\Pdo\Mysql(
                array(
                    "host" => $config->database->host,
                    "username" => $config->database->username,
                    "password" => $config->database->password,
                    "dbname" => $config->database->dbname
                )
            );
        } catch (Exception $e) {
            die("<b>Error initializing database connection:</b> " . $e->getMessage());
        }
        return $db;
    });

    $application = new Application($di);

    echo $application->handle()->getContent();

} catch (\Exception $e) {
     echo "Exception: ", $e->getMessage();
}
