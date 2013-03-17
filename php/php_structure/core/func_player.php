<?
//如果有哪些功能不能封装到mgr，又要在不同的位置重用，那就放到这里

include_once "PlayerMgr.php";
$playerMgr = new PlayerMgr();

//比如
//获得用户信息
function getPlayerInfo($userId)
{
	golbal $playerMgr;

	return $playerMgr->getPlayerInfo($userId);
}


	

?>