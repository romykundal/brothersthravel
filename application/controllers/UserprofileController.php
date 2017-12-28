<?php

class UserprofileController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    	$user = new Zend_Session_Namespace('user');
    	if(!isset($user->userId))
    	{
    		@$path = HTTP_PATH . 'user/login';
    		$this->_redirect($path);
    	}
    }

    public function indexAction()
    {
    	
    	$user = new Zend_Session_Namespace('user');
    	
        // action body
        // echo $user->userId;
    	//die("Here");
    	
    	$getdrawing =  User::getuserdrawings($user->userId); 
    	
    	
//     	echo "<pre>";
//     	print_r($getdrawing);
    	
    	$this->view->username = $getdrawing["firstName"]. " " .$getdrawing["lastName"] ;
    	$this->view->userdrawings = $getdrawing["Drawings"] ;
    	
    }
    
    


}

