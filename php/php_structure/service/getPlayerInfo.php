<?
	//web service 获取指定用户信息
	//@  userId  指定用户id

	$userId = $_REQUEST["userId"];

	//获取数据
	include_once "../core/func_player.php";
	$playerInfo = getPlayerInfo($userId);

	//返回Json数据
	$retJson = json_encode($playerInfo);
	echo $retJson;

?>