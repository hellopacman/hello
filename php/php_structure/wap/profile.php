<?
	//wap页面组装者

	//导入类库
	include_once "../php_class_lib/template.inc.php";		//模板类库

	//加载html模板
	$t = new Template("./");
	$t->set_file("page","profile.html");

	//获取页面相关数据
	include_once "../core/func_player.php";
	$playerInfo = getPlayerInfo(10086);


	//注入数据到html页面
	$t->set_var("NAME",$playerInfo["name"]);
	$t->set_var("SEX",$playerInfo["sex"]);

	//解析输出页面
	$t->pparse("ZIMOBAN","page");


?>