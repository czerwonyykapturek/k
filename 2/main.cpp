#include<iostream>
#include<cmath>
#include<cstring>

using namespace std;

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

char intToHex(int integer)
{
	if(integer < 10){
		char buff[255];
		itoa(integer, buff, 10);
		return buff[0];
	}
	switch(integer){
		case 10:
			return 'A';
			break;
		case 11:
			return 'B';
			break;
		case 12:
			return 'C';
			break;
		case 13:
			return 'D';
			break;
		case 14:
			return 'E';
			break;
		case 15:
			return 'F';
			break;
	}
}

void printDecoded(string key, int* msg, int lns)
{
    int ss[256];

    for(int i = 0; i < 256; i++)
    {
        ss[i] = i;
    }

    int a = 0;
    int b = 0;

    for(int i = 0; i < 256; i++)
    {
        a = (a + ss[i] + key[i % 16]) % 256;
        int rr = ss[i];
        ss[i] = ss[a];
        ss[a] = rr;
    }

    a = 0;
    b = 0;

    for(int i = 0; i<lns; i++)
    {
        a = (a + 1) % 256;
        b = (b + ss[a]) % 256;

        int t = ss[a];
        ss[a] = ss[b];
        ss[b] = t;

        int asd = ss[(ss[a] + ss[b]) % 256];
        int character = asd ^ msg[i];
        printf("%c", character);
    }
}

int checkSymbol(int s)
{
    if(isalpha(s) || isdigit(s) || s == ' ' || s == '.' || s == '\'' || s == '"' || s == ',' || s == ':')
    {
		return 1;
	}
	else
	{
		return 0;
	}
}

int main(int argc, int* argv)
{
	string partialKey = "aff1ea59";
	char* filename = "msg.txt";
	FILE* f = fopen(filename,"r");
	if(f == NULL)
	{
		cout<<"Blad podczas wczytywania pliku - "<<filename<<endl;
		return 1;
	}
	fseek(f, 0L, SEEK_END);
	int fileSize = ftell(f);
	fseek(f, 0L, SEEK_SET);

	int charCount = fileSize / 9;

	//char** encMsg = new char*[charCount];
	int* encMsg = new int[charCount];
    
	char buffer[10];

	int k = 0;
	while(fgets(buffer, 10, f))
    {
		//encMsg[k] = new char[10];
		buffer[strlen(buffer) - 1] = '\0';
		//strcpy(encMsg[k], buffer);
		encMsg[k] = bin2dec(buffer);
		k++;
    }
    fclose(f);

		string A = "", B = "", C = "", D= "", E = "", F = "", G = "", H = "";
		int it = 0;
		bool done = false;
		for (int a=0; a<16; a++){
		 for (int b=0; b<16; b++){
		  for (int c=0; c<16; c++){
		   for (int d=0; d<16; d++){
		    for (int e=0; e<16; e++){
		     for (int f=0; f<16; f++){
		      for (int g=0; g<16; g++){
	            for (int h=0; h<16; h++)
				{
						A=intToHex(a);
						B=intToHex(b);
						C=intToHex(c);
						D=intToHex(d);
						E=intToHex(e);
						F=intToHex(f);
						G=intToHex(g);
						H=intToHex(h);

						// klucz
						string part = A;
						part += B;
						part += C;
						part += D;
						part += E;
						part += F;
						part += G;
						part += H;
						part.append(partialKey);

//						part = "a6765a1eaff1ea59";
						
						if(it % 1000000 == 0)
						{
							cout<<"Badany klucz: "<<part.c_str()<<" (nr: "<<it<<")"<<endl;
						}

						// sprawdzanie klucza
						
						int states[256];

						for(int i = 0; i < 256; i++)
						{
							states[i] = i;
						}

						int a = 0;
						int b = 0;

						for(int i = 0; i < 256; i++)
						{
							a = (a + states[i] + part[i % 16]) % 256;

							int t = states[i];
							states[i] = states[a];
							states[a] = t;
						}

						a = 0;
						b = 0;

						int lp = 0;
						bool isKeyInvalid = false;
						while(!isKeyInvalid && (lp < charCount))
						{
							a = (a + 1) % 256;
							b = (b + states[a]) % 256;

							int t = states[a];

							states[a] = states[b];

							states[b] = t;

							int r = states[(states[a] + states[b]) % 256];

							int c = r ^ encMsg[lp++];

							// znaleziono prawidlowy klucz

							if(!checkSymbol(c))
							{
		    					isKeyInvalid = true;
							}

						}
						if(!isKeyInvalid)
						{
							cout<<"Znaleziono prawidlowy klucz: "<<part.c_str()<<endl;
					    	cout<<"Zdekodowana wiadomosc: "<<endl;
    						printDecoded(part, encMsg, charCount);
							done = true;
							break;
						}
						it++;
				if(done)
					break;
				}
				if(done)
					break;
			  }
				if(done)
					break;
			 }
				if(done)
					break;
			}
				if(done)
					break;
		   }
				if(done)
					break;
		  }
				if(done)
					break;
		 }
				if(done)
					break;
		 }

	system("pause");
	return 0;
}