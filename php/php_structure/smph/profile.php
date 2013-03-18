<?
	//h5页面组装者

	//导入类库
	include_once "../php_class_lib/template.inc.php";		//模板类库


	//加载html模板
	$t = new Template("./");
	$t->set_file("page","profile.html");


	//解析输出页面
	$t->pparse("ZIMOBAN","page");


?>