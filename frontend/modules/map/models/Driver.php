<?php 
namespace frontend\modules\map\models;
use yii\db\ActiveRecord;

class Driver extends ActiveRecord
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE = 1;
    
    /**
     * @return string название таблицы, сопоставленной с этим ActiveRecord-классом.
     */
    public static function tableName()
    {
        return '{{drivers}}';
    }
    
    public function getLocations()
    {
        return $this->hasMany(Locations::className(), ['driver_id' => 'driver_id'])->inverseOf('driver');
    }
}