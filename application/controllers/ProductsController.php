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
		
		$this->view->heading = "All Deals" ;
		$this->view->topTitle = "All Deals" ;
		$params = $this->_getAllParams();
		$hotProducts = Products::getProductsByCategory("DEAL");
		$this->view->hotProducts = $hotProducts ;

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
