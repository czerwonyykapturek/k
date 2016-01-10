#include <openssl/conf.h>
#include <openssl/evp.h>
#include <openssl/err.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <termios.h>
#include "openssl.h"
#include <iostream>
#include <fstream>
#include <time.h>


// uruchomienie programu:
//
// szyfrowanie kluczy: ./zad1 plik_z_kluczami ilosc_kluczy
// (de)szyfrowanie plikow: ./zad1 plik_z_kluczami id_klucza [e]/[d] plik_wejscia plik_wyjscia
//

using namespace std;

int main (int argc, char *argv[])
{
	unsigned char keyKey[] = "74401203966928409729753059415094";
	unsigned char keyIV[] = "9729753059415094";
	char keyPass[] = "akinhcetilop";
  
	// generujemy klucze
	if(argc == 4)
	{
	    int n = atoi(argv[2]);
	    char keyFileContent[(33+17) * n];
	    for(int i=0;i<(33+17)*n;i++) keyFileContent[i] = '\0';
	    srand(time(NULL));
	    if(strcmp(argv[1], "-g") == 0)
	    {
		for(int i=0;i<n;i++)
		{
		    // klucz
		    char key[33];
		    for(int i=0;i<32;i++) key[i] = '\0';
		    for(int j=0;j<32;j++)
		    {
		       char k[2];
		       snprintf(k, 2, "%d", rand() % 10);
		       key[j] = k[0];
		    }
		    key[32] = ' ';
		    key[33] = '\0';

		    //printf(">%s<", key);
		    strcat(keyFileContent, key);
		    
		    // generujemy IV
		    char iv[17];
		    for(int i=0;i<16;i++) iv[i] = '\0';
		    for(int j=0;j<16;j++)
		    {
		       char k[2];
		       snprintf(k, 2, "%d", rand() % 10);
		       iv[j] = k[0];
		    }
		    iv[16] = '\n';
		    iv[17] = '\0';
		    strcat(keyFileContent, iv);
		    //printf(">%s<", keyFileContent);
		}
		
		// szyfrowanie kluczy+iv
		
		//printf("%s", keyFileContent);
		
		unsigned char* encryptedKey = (unsigned char*)malloc((33+17) * n * sizeof(unsigned char));
		int encrypted_len = encrypt((unsigned char*)keyFileContent, strlen(keyFileContent), keyKey, keyIV, encryptedKey);
		
		//int key_len = decrypt(encryptedKey, 1150, keyKey, keyIV, encryptedKey2);
		
		//printf("%s", encryptedKey2);
		
		FILE* fk = fopen(argv[3], "w");
		fwrite(encryptedKey, sizeof(char), encrypted_len, fk);
		fclose(fk);
		
		printf("Wygenerowano plik keystore: %s\n", argv[3]);
		return 0;
	    }
	    else
	    {
		printf("Zla liczba parametrow.\nParametry: keystore_file key_id [e]ncrypt/[d]crypt input_file output_file\n");
		printf("Generowanie keystore: ./zad1 -g number_of_keys keystore_file\n");
		return 1;
	    }
	}
	
  
	if(argc != 6 && argc != 4)
	{
		printf("Zla liczba parametrow.\nParametry: keystore_file key_id [e]ncrypt/[d]crypt input_file output_file\n");
		printf("Generowanie keystore: ./zad1 -g number_of_keys keystore_file\n");
		return 1;
	}

	//wczytujemy klucz z zaszyfrowanego keystore'a

	unsigned char key[33];
	unsigned char iv[18];

	unsigned char* keyBuff;
	unsigned char* encKeyBuff;
	
	FILE* fKey = fopen(argv[1], "r");
	FILE* fInput;
	FILE* fOutput;

	int keyId = atoi(argv[2]);
	//strcpy(ivBuff, argv[2]);

	if(fKey == NULL)
	{
	    printf("Problem podczas wczytywania pliku: %s\n", argv[1]);
	    return 1;
	}

	fInput = fopen(argv[4], "rb");

	if(fInput == NULL)
	{
	    printf("Problem podczas wczytywania pliku: %s\n", argv[4]);
	    return 1;
	}

	fOutput = fopen(argv[5], "wb");

	if(fOutput == NULL)
	{
	    printf("Problem podczas wczytywania pliku: %s\n", argv[5]);
	    return 1;
	}

	fseek(fKey, 0L, SEEK_END);
	int sz = ftell(fKey);
	fseek(fKey, 0L, SEEK_SET);
	encKeyBuff = (unsigned char*)malloc(sz * sizeof(unsigned char));
	keyBuff = (unsigned char*)malloc(sz * sizeof(unsigned char));
	
	// wczytujemy zaszyfrowany klucz
	
	fread((char*)encKeyBuff, sizeof(char), sz, fKey);
	
	char password[255];
	int ok = 0;
	do
	{
	    if(ok != 0)
	    {
		printf("\nBledne haslo. Wprowadz ponownie: ");
	    }
	    else
	    {
		printf("Podaj haslo do klucza: ");
	    }
	    // ustawianie terminala do wczytania hasla
	    struct termios oldTc, newTc;
	    tcgetattr(STDIN_FILENO, &newTc);
	    oldTc = newTc;
	    newTc.c_lflag &= ~ECHO;
	    tcsetattr(STDIN_FILENO, TCSANOW, &newTc);
	    scanf("%s", password);
	    tcsetattr(STDIN_FILENO, TCSANOW, &oldTc);
	    
	    ok = strcmp(password, keyPass);
	    
	}while(ok != 0);

	// inicjalizacja biblioteki openssl
	
	ERR_load_crypto_strings();
	OpenSSL_add_all_algorithms();
	OPENSSL_config(NULL);
	
	// deszyfrowanie pliku z kluczami i iv
	
	int key_len = decrypt((unsigned char*)encKeyBuff, sz, keyKey, keyIV, (unsigned char*)keyBuff);
	
	// wypisz wszystkie klucze
	
// 	for(int i=0;i<sz/50;i++)
// 	{
// 	    char a[33];
// 	    char b[17];
// 	    memcpy(a, (char*)&keyBuff[i * 50], 32);
// 	    memcpy(b, (char*)&keyBuff[i * 50 + 33], 16);
// 	    a[32] = '\0';
// 	    b[16] = '\0';
// 	    printf("key %d: %s, IV: %s\n", i+1, a, b);
// 	}
	
 	memcpy(key, (char*)&keyBuff[keyId * 50], 32);
 	memcpy(iv, (char*)&keyBuff[keyId * 50 + 33], 16);
	
	key[32] = '\0';
	iv[16] = '\0';

	//czytanie pliku do zaszyfrowania/odszyfrowania

	unsigned char* buffer = (unsigned char*)malloc(128 * sizeof(unsigned char));
	unsigned char* encryptedBuffer = (unsigned char*)malloc(128 * sizeof(unsigned char));
	unsigned char* decryptedBuffer = (unsigned char*)malloc(128 * sizeof(unsigned char));

	int decrypted_len, encrypted_len;
	
	// szyfrowanie / deszyfrowanie
	int read = 0;
	int written = 0;
	
	do
	{
		// wczytaj blok danych i zaszyfruj albo odszyfruj go
		// po czym zapisz go do pliku wyjsciowego
	  
		read = fread((char*)buffer, sizeof(char), 128, fInput);
		if(argv[3][0] == 'e')
		{
			encrypted_len = encrypt(buffer,read, key, iv,encryptedBuffer);
			fwrite(encryptedBuffer, sizeof(char), encrypted_len, fOutput);
		}
		else if(argv[3][0] == 'd')
		{
			decrypted_len = decrypt(buffer,read, key, iv, decryptedBuffer);
			decryptedBuffer[decrypted_len] = '\0';
			fwrite(decryptedBuffer, sizeof(char), read, fOutput);
		}
 	}while(!feof(fInput));

	EVP_cleanup();
	ERR_free_strings();
	
	fclose(fKey);
	fclose(fInput);
	fclose(fOutput);

	return 0;
}