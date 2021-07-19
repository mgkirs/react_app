<?php 

namespace frontend\modules\map\models;

use yii\db\ActiveRecord;

class Locations extends ActiveRecord
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE = 1;
    
    /**
     * @return string название таблицы, сопоставленной с этим ActiveRecord-классом.
     */
    
    public static function tableName()
    {
        return '{{locations}}';
    }
    
    public function getDriver()
    {
        return $this->hasOne(Driver::className(), ['driver_id' => 'driver_id']);
    }
    
}