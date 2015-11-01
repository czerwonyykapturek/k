#include<iostream>
#include<cstdio>
#include<cstring>

using namespace std;

bool checkCharacter(int xorResult)
{
	if((xorResult > 64 && xorResult < 91) || (xorResult > 96 && xorResult < 123))
		return true;
	else
		return false;
}

int bin2dec(char* str) {
	int n = 0;
	int size = strlen(str) - 1;
	int count = 0;
	while ( *str != '\0' ) {
		if ( *str == '1' ) 
			n = n + pow((double)2, size - count );
		count++; 
		str++;
	}
	return n;
}

void getIntCharsFromLine(char* line, char* lineOfInts, int count)
{
	for(int j=0;j<count;j++)
	{
		int number = 0;
		char str[9];

		for(int i=0;i<8;i++)
		{
			str[i] = line[i + (j*9)];
		}
		str[8] = '\0';
		//cout<<str;
		//lineOfInts[j] = (char)bin2dec(str);
		lineOfInts[j] = bin2dec(str);
		//cout<<lineOfInts[j];
		//cout<<bin2dec(str);
		//cout<<(int)(char)bin2dec(str)<<" ";
	}
	//cout<<line<<" : "<<encMsgs[i]<<endl;
	//system("pause");
}

int main(int argc, char** argv)
{
	int messagesCount = 21;

	char** encMsgs = new char*[messagesCount];
	//string** encMsgs = new string*[21];

	int* msgLengths = new int[21];

	for(int i=0;i<21;i++)
	{
		msgLengths[i] = 0;
		//encMsgs[i] = "";
	}

	int maxEncMsgLen = 0;
	for(int i=0;i<21;i++)
	{
		char* ext = ".txt";
		char filename[10];
		itoa(i+1, filename, 10);
		strcat(filename, ext);
		FILE* f = fopen(filename,"r");

		fseek(f, 0L, SEEK_END);
		int fileSize = ftell(f);
		fseek(f, 0L, SEEK_SET);
		int charsInMsg = fileSize / 9;
		encMsgs[i] = new char[charsInMsg];

		if(f == NULL)
		{
			cout<<"Blad podczas wczytywania pliku - "<<filename<<endl;
			return 1;
		}
		char encChar[10];
		int l = 0;

		char* line = new char[fileSize];

		while(fgets(line, fileSize+1, f))
		{
			//encMsgs[i][l] = new char[10];
			//strcpy(encMsgs[i][l], encChar);
			//encMsgs[i][l] = encChar;
			getIntCharsFromLine(line, encMsgs[i], charsInMsg);
			l++;
		}

		msgLengths[i] = charsInMsg;
		if(charsInMsg > maxEncMsgLen)
			maxEncMsgLen = charsInMsg;

		fclose(f);
	}

	string x,y;
	bool f = false;
	int* occurences = new int[127];
	int xorResult = 0;
	int xChar, yChar;
	int xKey, yKey;
	int decryptedX, decryptedY;
	int encCharacter;

	int spaceInt = 32; //00010000

	for(int i=0;i<msgLengths[20];i++)
	{
		f = false;
		for(int j=0;j<messagesCount;j++)
		{
			for(int k=j+1;k<messagesCount;k++)
			{
				x = "";
				y = "";
				for(int p=0;p<msgLengths[j];p++)
				{
					x += encMsgs[j][p];
				}
				for(int p=0;p<msgLengths[k];p++)
				{
					y += encMsgs[k][p];
				}
				xChar = (int)x[i];
				yChar = (int)y[i];
				xorResult = xChar ^ yChar;
				if(checkCharacter(xorResult))
				{
					encCharacter = (int)encMsgs[20][i];

					// xor ze spacja
					xKey = xChar ^ spaceInt;
					yKey = yChar ^ spaceInt;

					decryptedX = xKey ^ encCharacter;
					decryptedY = yKey ^ encCharacter;

					if(decryptedX < 127 && decryptedX >= 20)
						occurences[decryptedX]++;
					if(decryptedY < 127 && decryptedY >= 20)
						occurences[decryptedY]++;
					f = true;
				}
			}
		}
		if(f)
		{
			int max = 20;
			for(int l = messagesCount; l<127; l++)
			{
				if(occurences[l] > occurences[max])
				{
					max = l;
				}
			}
			cout<<(char)max;
		}
		else
		{
			cout<<"X";
		}
		for(int l = messagesCount; l<127; l++)
		{
			occurences[l] = 0;
		}
	}

	//system("pause");
	return 0;
}