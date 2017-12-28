<?php
/**
 * this class is used for index (home ) of the site 
 * get value from database and display on home page
 * 
 *
 */
class IndexController extends Zend_Controller_Action {

	public function init() {

		/*
		 * Initialize action controller here
		 */
	}

	public function indexAction() {
		//die("<h1>Comming Soon</h1>");
		$this->view->action = $this->getRequest()->getParam('action');
		
		//die("Stopper");
	}
	
	public function contactAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		
		/*echo "<h1 style='text-align:center;'><strong style='color:red;'>Under Construction.</strong> Coming Soon ...</h1>";
		die;*/
		///$this->view->controller = $instance = $this->getRequest()->getControllerName();
		//$this->view->action = $this->getRequest()->getActionName();
	}	

	public function aboutusAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		
	}

	public function booknowAction() {


		$flash = $this->_helper->getHelper('FlashMessenger');
		$this->view->action = $this->getRequest()->getParam('action');
		$message = $flash->getMessages();
		$this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
		$this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';

		$category = Category::getCategoryForFront();
/*echo "<pre>";
print_r($category);
echo "</pre>";*/
		$this->view->category = $category;

	}

	 /**
     * save page detail in the dadtabase
     * @return array $data
     * @author rkumar
     * @version 1.0
     */
    
    public function bookingAction() {

    	$params = $this->_getAllParams();

/*echo "<pre>";
print_r($params);
echo "</pre>";
die;*/
    	$InquiriesObj = new Inquiries();
    	$InquiriesObj->saveInquiry($params); 		
    	$raftaar = "kumaryogesh399@gmail.com";
    	//$raftaar = "romykundal@gmail.com";
    	$frm = "raftaartour@raftaartourandtravel.com";
    		$mail = new Zend_Mail();
			$mail->setBodyHtml("DEAR ,<br> Your new order / Inquiry as below:<br><br> User name and email : ".$params["name"]." <br> Email is : ".$params["email"]."<br> Phone is : ".$params["phone"]."<br><br> <a href='".HTTP_PATH."/admin/' >Click here</a> to find more detail in your admin panel.  <br><br>Thank You,<br>".$params["email"]."<br>".$params["phone"]."");
			$mail->setFrom($frm, 'Raftaar tour and travel');
			$mail->addTo($raftaar, "Mr. Yogesh");
			$mail->setSubject('Your new Order');
			$mail->send();
			

		    	$flash = $this->_helper->getHelper('FlashMessenger');
		    	$message = $this->view->translate('You has been booked car successfully. Raftaar agent will contact you and You will have driver/car contacts details');
		    	$flash->addMessage(array('success' => $message ));
		    	$this->_redirect(HTTP_PATH.'index/booknow');
		    	exit;
    }
	
	public function serviceAction() {
		
		$this->view->action = $this->getRequest()->getParam('action') ;
	}

}

