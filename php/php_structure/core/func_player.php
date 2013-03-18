<?
//公有的上层逻辑代码都在这里

include_once "PlayerMgr.php";
$playerMgr = new PlayerMgr();

//获取用户信息
//@ userId 所获取用户的id
function getPlayerInfo($userId)
{
	global $playerMgr;

	return $playerMgr->getPlayerInfo($userId);
}



?>