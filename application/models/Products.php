<?php

/**
 * Products
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
class Products extends BaseProducts
{

	/*
	 * Insert Product with image 
	 * Author : rohit
	 */
	public static function addProducts($params, $imgfiles)
	{
/*		echo "<pre>";
		print_r($params);
		print_r($imgfiles);
		die;
*/	  $productObj = new Products();
	  $productObj->title = BackEnd_Helper_viewHelper::stripSlashesFromString($params['Title']);
	  $productObj->category = BackEnd_Helper_viewHelper::stripSlashesFromString($params['category']);
	  $productObj->price = BackEnd_Helper_viewHelper::stripSlashesFromString($params['Price']);
	  $productObj->image = BackEnd_Helper_viewHelper::stripSlashesFromString($imgfiles[0]);
	  $productObj->description = BackEnd_Helper_viewHelper::stripSlashesFromString(@$params['Description']);
		  $productObj->save();

	return $productObj->id ;
	}
	
	/*
	 * Insert Product with image
	* Author : rohit
	*/
	
	public static function editProducts($params, $imgfiles)
	{

		$productObj = Doctrine_Core::getTable("Products")->find($params['id']);
		$productObj->title = BackEnd_Helper_viewHelper::stripSlashesFromString($params['Title']);
		$productObj->category = BackEnd_Helper_viewHelper::stripSlashesFromString($params['category']);
		$productObj->price = BackEnd_Helper_viewHelper::stripSlashesFromString($params['Price']);
		if($imgfiles){
			$productObj->image = BackEnd_Helper_viewHelper::stripSlashesFromString($imgfiles[0]);
		}
		$productObj->description = BackEnd_Helper_viewHelper::stripSlashesFromString(@$params['Description']);
		
		$productObj->save();
		$lid = $productObj->id;
			
		return $lid ;
	}
	
	
//Get Products List
	
	public static function getProductsList($params){
		
	
		$srh = isset($params["searchtext"]) ? $params["searchtext"] : '';

		$data = Doctrine_Query::create()
		->select("p.*")
		->from("Products p")
		->where("p.title LIKE ?", "$srh%")
		->orderBy('p.id DESC');
		
	
		return Zend_Json::encode(
				DataTable_Helper::generateDataTableResponse($data,
						$params,
						array("__identifier" => 'p.name', 'p.price', 'p.category', 'p.created_at','p.updated_at,c.name as catname'),
						array(),
						array()
				));
		exit();
	}
	
	
	/**
	 * detail of editable product
	 * @param integer $id
	 * @return array $data
	 * @author Er.kundal
	 * @version 1.0
	 */
	public static function getproduct($id) {
	
		$data = Doctrine_Query::create()->select("p.*")
		->from('Products p')
		->where("p.id = ?", $id)
		->fetchArray();
		return $data;
	
	}
	
	/**
	 * delete product and product images
	 * @param integer $id
	 * @return array true and false
	 * @author Er.kundal
	 * @version 1.0
	 */	
	public static function deleteProduct($id){
		
		$qry =Doctrine_Query::create()
		->delete()
		->from('Products p')
		->where('id='."'$id'")
		->execute();
		return true ;
	}
	
	/**
	 * get to five category
	 * @param string $keyword
	 * @return array $data
	 * @author er.kundal
	 * @version 1.0
	 */
	public static function searchKeyword($keyword) {
	
		$data = Doctrine_Query::create()->select('p.title as title')
		->from("Products p")
		->where("p.title LIKE ?", "$keyword%")->orderBy("p.title ASC")
		->limit(5)->fetchArray();
		return $data;
	}
	

	/******************************************* Start Front End*************************************************************/
	
	
	public static function showProducts($params){
	
	
		$pId = @$params["id"];
	
		$qry = Doctrine_Query::create()
		->select("p.*,i.*")
		->from("Products p")
		->leftJoin("p.images i");
		if(isset($params["id"]) && @$params["id"] != ''){
			$qry->where("p.categoryId= ?",$pId);
		}
		
		$data = $qry->orderBy('p.id DESC')->fetchArray();
		
		return $data;
		exit();
	}
	
	/**
	 * detail of Show product
	 * @param integer $id
	 * @return array $data
	 * @author Er.kundal
	 * @version 1.0
	 */
	public static function showProductdetailPage($id) {
	
		$data = Doctrine_Query::create()->select("p.*,i.*")
		->from('Products p')
		->LeftJoin("p.images i")
		->where("p.id = ?", $id)
		->fetchArray();
		
		return $data;
	
	}
	
	
// End class
}