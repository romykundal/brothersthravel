<?php

class ProductsController extends Zend_Controller_Action {

	public function init() {

		$this->view->controller = $instance = $this->getRequest()->getControllerName();
		$this->view->action = $this->getRequest()->getActionName();
		/*
		 * Initialize action controller here
		 */
	}

	public function indexAction() { 
		
		
		$params = $this->_getAllParams();
		$productslist = Products::showProducts($params);
		$this->view->procts = $productslist ;

// 		echo "<pre>";
// 		print_r($productslist);
// 		die;
		
	}

	public function showproductAction() {
		
		
		$params = $this->_getAllParams();
		$productId = $params["pId"]; 
		$productslist = Products::showProductdetailPage($productId);
		$gategory = Category::getfrontendCategories();
		//echo "<pre>"; print_r($productslist[0]); die;
		$this->view->showproduct = @$productslist[0] ;
		$this->view->categories = @$gategory ;
				
	}
}
