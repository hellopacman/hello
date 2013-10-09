// ConsoleApplication1.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include <iostream>
#include <climits>
using namespace std;

int _tmain(int argc, _TCHAR* argv[])
{
	int maxInt = INT_MAX;
	short maxShort = SHRT_MAX;
	long maxLong = LONG_MAX;

	cout << "int is " << sizeof(int) << "bytes." << endl;
	cout << "short is " << sizeof(short) << "bytes." << endl;
	cout << "long is " << sizeof(long) << "bytes." << endl;

	cout << "Max values:" << endl;
	cout << "int: " << maxInt << endl;
	cout << "short: " << maxShort << endl;
	cout << "long: " << maxLong << endl;

	cout << "Min int value = " << INT_MIN << endl;
	cout << "Bits per byte = " << CHAR_BIT	<< endl;

	cin.get();

	return 0;
}

