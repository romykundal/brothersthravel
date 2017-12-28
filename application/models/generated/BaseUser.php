<?php
Doctrine_Manager::getInstance()->bindComponent('User', 'doctrine');
/**
 * BaseUser
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property string $firstName
 * @property string $lastName
 * @property string $email
 * @property string $password
 * @property string $google
 * @property string $twitter
 * @property string $pinterest
 * @property string $likes
 * @property string $dislike
 * @property string $mainText
 * @property boolean $status
 * @property integer $roleId
 * @property integer $profileImageId
 * @property integer $createdBy
 * @property Role $role
 * @property timestamp $lastLogIn
 * @property ProfileImage $profileimage
 * @property User $user
 * @property Doctrine_Collection $website
 * @property Doctrine_Collection $refUserWebsite
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
abstract class BaseUser extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('user');
        $this->hasColumn('id', 'integer', 20, array(
             'primary' => true,
             'type' => 'integer',
             'autoincrement' => true,
             'comment' => 'PK',
             'length' => '20',
             ));
        $this->hasColumn('firstName', 'string', 50, array(
             'type' => 'string',
             'length' => '50',
             ));
        $this->hasColumn('lastName', 'string', 50, array(
             'type' => 'string',
             'length' => '50',
             ));
        $this->hasColumn('username', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('email', 'string', 255, array(
             //'unique' => true,
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('password', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('phoneNumber', 'integer', 20, array(
             'type' => 'integer',
             'length' => '20',
             ));
        
        $this->hasColumn('Address', 'string', 255, array(
        		'type' => 'string',
        		'length' => 255,
        
        ));
        	 
        $this->hasColumn('roleId', 'integer', 20, array(
             'type' => 'integer',
             'comment' => 'FK to role.id',
             'length' => '20',
             ));
        $this->hasColumn('usertype', 'enum', null, array(
        		'type' => 'enum',
        		'values' =>
        		array(
        				0 => '1',
        				1 => '2',
        		),
        ));
        $this->hasColumn('profileImageId', 'integer', 20, array(
        		'type' => 'integer',
        		'comment' => 'FK to profileimage.id',
        		'length' => '20',
        ));
               
    }

    public function setUp()
    {
        parent::setUp();
 
        $this->hasMany('Drawings', array(
        		'local' => 'id',
        		'foreign' => 'userId'));
        
        $softdelete0 = new Doctrine_Template_SoftDelete(array(
             'name' => 'deleted',
             'type' => 'boolean',
             'options' => 
             array(
              'default' => 0,
             ),
             ));
        $timestampable0 = new Doctrine_Template_Timestampable(array(
             'created' => 
             array(
              'name' => 'created_at',
             ),
             'updated' => 
             array(
              'name' => 'updated_at',
             ),
             ));
        $this->actAs($softdelete0);
        $this->actAs($timestampable0);
    }
}