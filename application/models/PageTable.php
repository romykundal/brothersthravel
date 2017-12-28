<?php

/**
 * PageTable
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 */
class PageTable extends Doctrine_Table
{
    /**
     * Returns an instance of this class.
     *
     * @return object PageTable
     */
    public static function getInstance()
    {
        return Doctrine_Core::getTable('Page');
    }
    
    public static function getPageData($offerId)
    {
    	$shopDetail = Doctrine_Query::create()
    	->select('o.*,s.name,s.notes,s.accountManagerName,a.name as affname,p.id,tc.*,cat.id,img.*')
    	->from("Offer o")
    	->leftJoin('o.shop s')
    	->leftJoin('s.affliatenetwork a')
    	->leftJoin('o.page p')
    	->leftJoin('o.termandcondition tc')
    	->leftJoin('o.category cat')
    	->leftJoin('o.logo img')
    	->andWhere("o.id =$offerId")->andWhere("o.userGenerated = '0'")->fetchArray();
    	return $shopDetail;
    	 
    	
    }
}