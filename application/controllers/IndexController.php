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
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		
		
		$topProducts = Products::getProductsByCategory("TOP");
		$hotProducts = Products::getProductsByCategory("HOT");
		$pageWhatWeAre = Page::getPageById(31);
		$this->view->whatweare = $pageWhatWeAre ;
		$this->view->topProducts = $topProducts ;
		$this->view->hotProducts = $hotProducts ;
	}
	
	public function contactAction() {
		$this->view->topTitle = "Contact Us" ;
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		
		/*echo "<h1 style='text-align:center;'><strong style='color:red;'>Under Construction.</strong> Coming Soon ...</h1>";
		die;*/
		///$this->view->controller = $instance = $this->getRequest()->getControllerName();
		//$this->view->action = $this->getRequest()->getActionName();
	}	

	public function aboutusAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		$this->view->topTitle = "About Us" ;
		$pageObj = new Page();
		$pageInfo = $pageObj->getPageInfo(29);
		$this->view->pageInfo = @$pageInfo[0];
		
	}

	public function privatepolicyAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$pageObj = new Page();
		$pageInfo = $pageObj->getPageInfo(32);
		$this->view->pageInfo = @$pageInfo[0];
	}
	
	public function termscondAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$pageObj = new Page();
		$pageInfo = $pageObj->getPageInfo(33);
		$this->view->pageInfo = @$pageInfo[0];
	}

	public function booknowAction() {
		$this->view->topTitle = "Book Now" ;
		$user = new Zend_Session_Namespace('user');

		$flash = $this->_helper->getHelper('FlashMessenger');
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		$message = $flash->getMessages();
		$this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
		$this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';

		$userINfo =  User::getuserDetails($user->userId); 
		//$airports =  Airport::getAirportForFront(); 

		//$category = Category::getCategoryForFront();
/*echo "<pre>";
print_r($airports);
echo "</pre>";
die;*/
		$this->view->user = $userINfo;
		//$this->view->airports = $airports;

	}

	/**
	 * search top file category for predictive search
	 * 
	 * @author Rohit kumar
	 * @version 1.0
	 */
	public function searchtoptenAction() {
		
		$srh = $this->getRequest ()->getParam ( 'keyword' );
		$data = Airport::searchToTen ( $srh);
		$ar = array ();
		if (sizeof ( $data ) > 0) {
			foreach ( $data as $d ) {
				
				$ar [] = $d ['name'] . ', ' .$d ['airport'];
			}
		} else {
			$msg = $this->view->translate ( 'No Record Found' );
			$ar [] = $msg;
		}
		echo Zend_Json::encode ( $ar );
		die ();
		
		// action body
	}

	 /**
     * save page detail in the dadtabase
     * @return array $data
     * @author romykundal
     * @version 1.0
     */
    
    public function bookingAction() {

    	$params = $this->_getAllParams();
		$user = new Zend_Session_Namespace('user');
		$params["user_id"] = $user->userId ;
/*echo "<pre>";
print_r($params);
echo "</pre>";
die;*/
    	$InquiriesObj = new Inquiries();
    	$InquiriesObj->saveInquiry($params); 		
    	

    	/*$to = "romykundal@gmail.com";
    	$frm = "info@mailinator.com";
    		$mail = new Zend_Mail();
			$mail->setBodyHtml("DEAR ,<br> Your new order / Inquiry as below:<br><br> User name and email : ".$params["name"]." <br> Email is : ".$params["email"]."<br> Phone is : ".$params["phone"]."<br><br> <a href='".HTTP_PATH."/admin/' >Click here</a> to find more detail in your admin panel.  <br><br>Thank You,<br>".$params["email"]."<br>".$params["phone"]."");
			$mail->setFrom($frm, 'The brothers travel');
			$mail->addTo($to, "Mr. Lovely");
			$mail->setSubject('Your new Order');
			$mail->send();*/
			

	    	$flash = $this->_helper->getHelper('FlashMessenger');
	    	$message = $this->view->translate('You has been request submitted successfully.');
	    	$flash->addMessage(array('success' => $message ));
	    	$this->_redirect(HTTP_PATH.'index/booknow');
	    	exit;
    }
	
	public function serviceAction() {
		
		$this->view->action = $this->getRequest()->getParam('action') ;
	}

}

