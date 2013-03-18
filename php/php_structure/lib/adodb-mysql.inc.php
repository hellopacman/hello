<?php

class ADODB_mysql extends ADODBConnection{
	var $databaseType = 'mysql';

	function ADODB_mysql() {

	}

	// returns concatenated string
	function Concat()
	{
		$s = "";
		$arr = func_get_args();
		$first = true;

		foreach($arr as $a) {
			if ($first) {
				$s = $a;
				$first = false;
			} else $s .= ','.$a;
		}
		if (sizeof($s) > 0) return "CONCAT($s)";
		else return '';
	}
	// returns true or false
	function _connect($argHostname, $argUsername, $argPassword, $argDatabasename)
	{
		$this->_connectionID = mysql_connect($argHostname,$argUsername,$argPassword);
		if ($this->_connectionID === false) return false;
		if ($argDatabasename) return $this->SelectDB($argDatabasename);
		return true;
	}
	// returns true or false
	function _pconnect($argHostname, $argUsername, $argPassword, $argDatabasename)
	{
		$this->_connectionID = mysql_pconnect($argHostname,$argUsername,$argPassword);
		if ($this->_connectionID === false) return false;
		if ($argDatabasename) return $this->SelectDB($argDatabasename);
		return true;
	}


	// returns true or false
	function SelectDB($dbName) {
		$this->databaseName = $dbName;
		if ($this->_connectionID) {
			return @mysql_select_db($dbName,$this->_connectionID);
		}
		else return false;
	}

	// returns queryID or false
	function _query($sql,$inputarr)
	{
		return mysql_query($sql,$this->_connectionID);
	}


	/*	Returns: the last error message from previous database operation	*/
	function ErrorMsg() {
		$this->_errorMsg = @mysql_error($this->_connectionID);
	    return $this->_errorMsg;
	}

	// returns true or false
	function _close()
	{
		return @mysql_close($this->_connectionID);
	}

}

/*--------------------------------------------------------------------------------------
	 Class Name: Recordset
--------------------------------------------------------------------------------------*/

class ADORecordSet_mysql extends ADORecordSet{

	var $databaseType = "mssql";

	function ADORecordSet_mysql($queryID) {
		return $this->ADORecordSet($queryID);
	}

	function _initrs()
	{
		$this->_numOfRows = @mysql_num_rows($this->_queryID);
		$this->_numOfFields = @mysql_num_fields($this->_queryID);
	}



	function FetchField($fieldOffset = -1) {
		if ($fieldOffset != -1) {
			$o =  @mysql_fetch_field($this->_queryID, $fieldOffset);
			$o->max_length = -1; // mysql returns the max length less spaces -- so it is unrealiable
		}
		else if ($fieldOffset == -1) {	/*	The $fieldOffset argument is not provided thus its -1 	*/
			$o = @mysql_fetch_field($this->_queryID);// mysql returns the max length less spaces -- so it is unrealiable
			$o->max_length = -1;
		}
		return $o;
	}

	function _seek($row)
	{
		return @mysql_data_seek($this->_queryID,$row);
	}

	function _fetch()
	{
		$this->fields = @mysql_fetch_array($this->_queryID);
		return ($this->fields == true);
	}

	function _close() {
		return @mysql_free_result($this->_queryID);
	}

	function MetaType($t,$len=-1)
	{
		$len = -1; // mysql max_length is not accurate
		switch (strtoupper($t)) {
		case 'STRING':
		case 'CHAR':
		case 'VARCHAR':
		case 'TINYBLOB':
		case 'TINYTEXT':
		case 'BLOB':
		case 'ENUM':
		case 'SET':
			if ($len <= $this->blobSize) return 'C';

		case 'TEXT':
		case 'LONGBLOB':
		case 'LONGTEXT':
		case 'MEDIUMBLOB':
		case 'MEDIUMTEXT':
			return 'B';

		case 'DATE': return 'D';
		case 'DATETIME':
		case 'TIMESTAMP': return 'T';
		default: return 'N';
		}
	}

}
?>