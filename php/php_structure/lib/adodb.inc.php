<?php

	$gs_adodb=1;

if (!defined("_ADODB_GENERAL_LAYER")) {

	define("_ADODB_GENERAL_LAYER", 1 );
	$ADODB_RootPath = "./php_class_lib";
	$ADODB_Database = "";
	$ADODB_vers = "";


	class ADODBConnection {
		var $databaseType = '';
		var $database = '';
		var $host = ''; 
		var $user = ''; 
		var $password = '';
		var $debug;
		var $concat_operator = '+';
		var $fmtDate = "'Y-m-d'";
		var $fmtTimeStamp = "'Y-m-d, h:i:s A'";
		var $true = '1';
		var $false = '0';
		var $replaceQuote = "\\'";

	var $_connectionID	= -1;

	var $_errorMsg = '';

	var $_queryID = -1;

	var $_isPersistentConnection = false;

	var $_bindInputArray = false;

	function ADODBConnection(){
		die("Virtual Class -- cannot instantiate");
	}

	function Connect($argHostname = "", $argUsername = "", $argPassword = "", $argDatabaseName = "") {
		if ($argHostname != "") $this->host = $argHostname;
		if ($argUsername != "") $this->user = $argUsername;
		//if ($argPassword != "") $this->password = $argPassword;
		if ($argDatabaseName != "") $this->database = $argDatabaseName;
		return $this->_connect($argHostname,$argUsername,$argPassword,$argDatabaseName);
	}

	function PConnect($argHostname = "", $argUsername = "", $argPassword = "", $argDatabaseName = "")
	{
		if ($argHostname != "") $this->host = $argHostname;
		if ($argUsername != "") $this->user = $argUsername;
		//if ($argPassword != "") $this->password = $argPassword;
		if ($argDatabaseName != "") $this->database = $argDatabaseName;

		if ( $this->_pconnect($argHostname, $argUsername, $argPassword, $argDatabaseName)) {
			$this->_isPersistentConnection = true;
			return true;
		}

		return false;
	}

	function Prepare($sql)
	{
		return $this->Execute($sql);
	}

	function &Execute($sql,$inputarr=false) {

		if (!$this->_bindInputArray && $inputarr) {
			$sqlarr = explode("?",$sql);
			$sql = "";
			for ($i=0, $zmax = sizeof($inputarr); $i < $zmax; $i++) {
				$sql .= $sqlarr[$i];
				$sql .= '\''.$inputarr[$i].'\'';
			}
			$sql .= $sqlarr[$i];
			if ($zmax+1 != sizeof($sqlarr))	print "Input Array does not match ?: $sql";
		}

		if ($this->debug) {
			print "<hr>($this->databaseType): $sql<hr>";
			$this->_queryID = $this->_query($sql,$inputarr);
		} else
			$this->_queryID =@$this->_query($sql,$inputarr);

		if ($this->_queryID === false){
			echo "============================<br>";
			echo $sql."<br>";
			echo mysql_error();
			echo "<br>";
			echo "============================<br>";
			return false;
		}

		$rsclass = "ADORecordSet_".$this->databaseType;
		$rs = new $rsclass($this->_queryID);
		//$this->_insertQuery(&$rs); PHP4 handles closing automatically
		$rs->sql = $sql;
		return $rs;
	}


	/*	Returns: true on success, false on failure
		Close the database connection.	*/
	function Close()
	{
		/*if ($this->_rsList && sizeof($this->_rsList) > 0) {
			while(list($_key, $_resultID) = each($this->_rsList)) {
				$_resultID->Close();
			}
		} PHP4 handles closing automatically */

		if ($this->_isPersistentConnection != true) $this->_close();
		else return true;

	}

	function Concat()
	{
		$first = true;
		$s = "";
		$arr = func_get_args();
		$concat = $this->concat_operator;
		foreach($arr as $a) {
			if ($first) {
				$s = (string) $a;
				$first = false;
			} else $s .= $concat.$a;
		}
		return $s;
	}
}

class ADORecordSet {
	var $fields;
	var $blobSize = 200;
	var $sql;
	var $EOF = null;
	var $_numOfRows = -1;
	var $_numOfFields = -1;
	var $_tempResult = '';
	var $_queryID = -1;
	var $_currentRow = -1;
	var $_closed = false;

	function ADORecordSet($queryID) {
		$this->_queryID = $queryID;
		if ($queryID) $this->_initrs();
		else {
			$this->_numOfRows = 0;
			$this->_numOfFields = 0;
		}
		if ($this->_numOfRows != 0 && $this->_currentRow == -1) {
			$this->_currentRow = 0;
			$this->EOF = $this->_fetch() == false;
		} else {
			$this->EOF = true;
		}

		return $this->_queryID;
	}

	function MoveFirst() {
		if ($this->_currentRow == 0) return true;
		return $this->Move(0);
	}

	function MoveLast() {
		if ($this->_numOfRows >= 0) return $this->Move($this->_numOfRows-1);
		return false;
	}

	function Fields($colname)
	{
		return $this->fields[$colname];
	}

	function Close() {

		if (!$this->_closed) {
			$this->_closed = true;
			return $this->_close();
		} else
			return true;
	}

	function MoveNext() {
		if ($this->_numOfRows != 0) {
			$this->_currentRow++;
			if ($this->_fetch()) return true;
		}
		$this->EOF = true;
		return false;
	}

	function Move($rowNumber = 0) {
		if ($rowNumber == $this->_currentRow) return true;

		if (0 <= $this->_numOfRows && $rowNumber < $this->_numOfRows || $this->_numOfRows==-1) {
			if ($this->_seek($rowNumber)) {
				$this->_currentRow = $rowNumber;
				if ($this->_fetch()) {
					$this->EOF = false;
					return true;
				}
			} else
				return false;
		}
		$this->fields = null;
		$this->EOF = true;
		return false;
	}


	function RecordCount() {
		return $this->_numOfRows;
	}
	function CurrentRow() {
		return $this->_currentRow;
	}

}
	function ADOLoadDB($dbType) {
	GLOBAL $ADODB_RootPath;
	GLOBAL $ADODB_Database;
		switch (strtolower($dbType)) {
			case 'mysql':
			case 'mssql':
			case 'odbc_mssql':
			default:
				$ADODB_Database = $dbType;
				include("$ADODB_RootPath/adodb-$dbType.inc.php");
				break;
		}
		return true;
	}

	function &ADONewConnection($db=""){
		
		GLOBAL $ADODB_Database;
		
		if (!$db) $db = $ADODB_Database;
		$cls = "ADODB_".$db;
		$obj =  new $cls();
		return $obj;
	}

}
?>