<?php
namespace frontend\modules\map\controllers;

use yii\web\Response;
use yii\web\Controller;
use frontend\modules\map\models\Driver;
use frontend\modules\map\models\Locations;

class MapController extends Controller
{

    public function actionView()
    {}

    public function actionAddriver()
    {    
        \Yii::$app->response->format = Response::FORMAT_JSON;
        $driver = new Driver();
        $driver->status = 1;
        $driver->save();
        $id = $driver->driver_id; // todo: lastInsert id?
        $q = 0;
        for ( $i = 0 ; $i <  rand(3, 6); ++$i) {
            $locations[$i] = new Locations();
            if ($i <= 1) {
                $locations[$i]->status = $i + 2;
            } else {
                $locations[$i]->status = 1;
            }
            $locations[$i]->lat = '40.' . rand(5443325, 6845645);
            $locations[$i]->lng = '-73.' . rand(9245745, 9875674);
            $locations[$i]->driver_id = $id;
            $locations[$i]->save();
        }
            $data = [
                'driver' => $driver,
                'locations' => $locations
            ];
            
            return $data;
    }

    public function actionStopdriver()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        $request = \Yii::$app->request;
        $driver = Driver::findOne($request->get('driver_id')); // deleteall
        if ($driver) {
            $q[] = $driver->delete();
        }
        $q[] = Locations::deleteAll([
            'driver_id' => $request->get('driver_id')
        ]);
        return $q;
    }

    public function actionStoproute()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        $request = \Yii::$app->request;
        $driver = Driver::findOne($request->get('driver_id'));
        if ($request->get('status') == 1) {
            $driver->status = 2;
        } else {
            $driver->status = 1;
        }
        $driver->update();
        $status = $driver->status;

        return $status;
    }

    public function exchangeDriver()
    {}

    public function remooveDriver()
    {}

    /**
     *
     * @return string
     */
    public function actionIndex()
    {
        $drivers = Driver::find()->joinWith('locations')->all();
        $locations = new Locations();
        foreach ($drivers as $driver) {
            $k = $driver;
            $data[$driver->driver_id] = [
                'driver' => $driver,
                'locations' => $driver->locations
            ];
        }

        \Yii::$app->response->format = Response::FORMAT_JSON;

        return $data;
    }
}

