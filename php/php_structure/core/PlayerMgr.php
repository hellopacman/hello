<?
class PlayerMgr
{
	//构造函数
	function __construct()
	{
		//初始构造
	}

	//----获取指定用户信息------
	function getPlayerInfo($userId)
	{
		//查询指定用户数据
		//.....


		$ret["name"] = "张三";
		$ret["sex"] = "男";

		return $ret;
	}



}

?>