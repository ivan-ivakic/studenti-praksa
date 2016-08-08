<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Url as UrlProvider;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Config\Adapter\Php;

require "../app/controllers/BaseController.php";

try {

    $config = new Php("../app/config/config.php");

    $loader = new Loader();
    $loader->registerDirs(array(
        $config->application->controllersDir,
        $config->application->modelsDir,
        $config->application->formsDir,
    ))->register();

    $di = new FactoryDefault();

    $di->set('view', function () use ($config) {
        $view = new View();
        $view->setViewsDir($config->application->viewsDir);
        $view->registerEngines(
            array(
                ".phtml" => function ($view, $di) use ($config) {
                    $volt = new Phalcon\Mvc\View\Engine\Volt($view, $di);
                    $volt->setOptions(array(
                        'compiledPath' => $config->application->cacheDir,
                        'compiledSeparator' => '_',
                        'compileAlways' => true // Development only
                    ));
                    return $volt;
                }
            )
        );
        return $view;
    });

    $di->set('url', function () use ($config) {
        $url = new UrlProvider();
        $url->setBaseUri($config->application->baseUri);
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
