<?php

use yii\db\Migration;

/**
 * Class m200513_220136_drivers
 */
class m200513_220136_drivers extends Migration
{
    
    public function safeUp()
    {
        
        // $this->addForeignKey('fk-locations-drivers', 'locations', 'driver_id', 'drivers', 'id', 'cascade', 'cascade');
        // TODO: maybe drop fk index and make index
    }
    
    /**
     *
     * @return bool|void
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-drivers_locations-drivers', 'drivers_locations');
        // this->dropForeignKey('fk-locations-drivers', 'locations');
        $this->dropIndex('idx-locations-drivers', 'locations');
        $this->dropIndex('idx-drivers-status', 'drivers');
        $this->dropIndex('idx-drivers-updated_at', 'drivers');
        $this->dropTable('drivers');
        $this->dropTable('drivers_locations');
        $this->dropTable('locations');

    }

    // Use up()/down() to run migration code without a transaction.
    public function up()
    {
        $this->createTable('drivers', [
            'driver_id' => $this->primaryKey(),
            //'end_location' => $this->integer()
            //->null(),
            //'start_location' => $this->tinyInteger()
            //->defaultValue(0),
            'status' => $this->tinyInteger()
            ->defaultValue(0),
            'created_at' => $this->dateTime(),
            'updated_at' => $this->dateTime()
        ]);
        
        echo "drivers table created\n";
        $this->createTable('locations', [
            'location_id' => $this->primaryKey(),
            'driver_id' => $this->integer(),
            'lat' => $this->double(),
            'lng' => $this->double(),
            'status' => $this->tinyInteger()
            ->defaultValue(0),
        ]);
        /*
        echo "drivers_locations created\n";
        $this->createTable('locations', [
            'id' => $this->primaryKey(),
            'lat' => $this->double(),
            'lng' => $this->double(),
            'driver_id' => $this->integer()
            ->null()
        ]);*/
        
        echo "locations created\n";
        
        $this->createIndex('idx-drivers-status', 'drivers', 'status');
        $this->createIndex('idx-drivers-updated_at', 'drivers', 'updated_at');
        $this->createIndex('idx-locations-drivers', 'locations', 'driver_id');
    }
/*
    public function down()
    {
        echo "m200513_220136_drivers cannot be reverted.\n";

        return false;
    }
  */  
}
