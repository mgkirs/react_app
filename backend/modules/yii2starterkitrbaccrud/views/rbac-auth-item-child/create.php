<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model backend\modules\yii2starterkitrbaccrud\models\RbacAuthItemChild */

$this->title = Yii::t('frontend', 'Create Rbac Auth Item Child');
$this->params['breadcrumbs'][] = ['label' => Yii::t('frontend', 'Rbac Auth Item Children'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="rbac-auth-item-child-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>