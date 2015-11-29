import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import static java.nio.file.StandardOpenOption.*;
import java.nio.file.*;
import java.io.*;
import java.util.List;
import java.util.ArrayList;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.List;
import java.util.concurrent.ExecutorService ;
import java.util.concurrent.Executors ;
import java.util.concurrent.TimeUnit ;

public class RSA{

	private static void runProcess(String command) throws Exception {
   		Process pro = Runtime.getRuntime().exec(command);
      		pro.waitFor();
  	}

	public static void encodeFile(BigInteger e, BigInteger n, String inFile, String outFile){
		// e = new BigInteger("27535779821683974469467919701058553153");
        // n = new BigInteger("45802681293869255473225777285933559761");
		File fileOut = new File(outFile);
		int fileSize = (int)new File(inFile).length();
		FileOutputStream fileOutputStream;
		try{
			fileOutputStream = new FileOutputStream(fileOut);
		try {

			byte[] fromFile = new byte[fileSize];
			FileInputStream fileInputStream = new FileInputStream(new File(inFile));
	        int readBytes=0, r=0;
	        try {

	            while((r=fileInputStream.read(fromFile))!=-1){
	                readBytes+=r;
	            }

	        } catch (FileNotFoundException ex) {
	            ex.printStackTrace();
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }


			int fileLength = fromFile.length;
			int l = n.bitLength()/8;
			int k = 0;
			byte[] tmp = new byte[l];
			byte[] result;

			for(int i=0; i<fileLength; i++){
				if( k < l ){
					tmp[k] = fromFile[i];
					k++;
				}
				else {
					k = 0;
					i--;
					result = ((new BigInteger(tmp)).modPow(e, n).toString() + ' ').getBytes();
					fileOutputStream.write(result);
					if(fileLength - i > l) {
						tmp = new byte[l];
					}
					else{
						tmp = new byte[fileLength % l];
					}
				}
			}

			result = ((new BigInteger(tmp)).modPow(e, n).toString()).getBytes();
			fileOutputStream.write(result);

		} catch (IOException x) { }

		} catch (FileNotFoundException f){}
	}

	public static void decodeFile(BigInteger d, BigInteger n, String inFile, String outFile){
		File fileOut = new File(outFile);
		int fileSize = (int)new File(inFile).length();
		byte[] fromFile;
		FileOutputStream fileOutputStream;
		try{
			fileOutputStream = new FileOutputStream(fileOut);
		try {

			fromFile = new byte[fileSize];
			FileInputStream fileInputStream = new FileInputStream(new File(inFile));
	        int readBytes=0;
	        int r=0;
	        try {

	            while((r=fileInputStream.read(fromFile))!=-1){
	                readBytes+=r;
	            }
	        } catch (FileNotFoundException ex) {
	            ex.printStackTrace();
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }

	    String[] readEncoded = new String(fromFile).split(" ");
	    for(String re: readEncoded){
	    	BigInteger result = (new BigInteger(re)).modPow(d, n);
	    	fileOutputStream.write(result.toByteArray());
	    }

		} catch (IOException x) { }

		} catch (FileNotFoundException f){}
	}

	public static BigInteger EulerFunction(BigInteger p, BigInteger q){
		
		return (p.subtract(BigInteger.ONE)).multiply(q.subtract(BigInteger.ONE));
	}

	public static BigInteger findE(BigInteger fi, int dbits){

		BigInteger random;

		do {
			SecureRandom seed = new SecureRandom(); 
			random = new BigInteger(dbits, seed);

		} while(!(random.gcd(fi).equals(BigInteger.ONE)) || random.compareTo(fi) >= 0);

		return random;
	}

	public static void main(String[] args){

		if(args.length != 5){
			System.out.println("Wywolanie: gen/e/d k d in out");
		} 
		else {

			String param = args[0];
			String fileIn = args[3];
			String fileOut = args[4];
			int k = Integer.parseInt(args[1]);
			int dbits = Integer.parseInt(args[2]);
			List<BigInteger> primeList = new ArrayList<BigInteger>(); // kolejno e d n	

			BigInteger e;
			BigInteger d;
			BigInteger n;
			BigInteger fi;
			BigInteger p;
			BigInteger q;

			BigInteger dp;
			BigInteger dq;
			BigInteger c2;

			if(param.equals("gen")){
				try {
				     runProcess("javac zadanie1.java");
     				     runProcess("java zadanie1 "+k+" "+dbits);
    				} catch (Exception ex) { ex.printStackTrace(); }

				Path file = Paths.get("./prime.txt");
				try (InputStream in = Files.newInputStream(file);
   					BufferedReader reader = new BufferedReader(new InputStreamReader(in))) {
    					String line = null;
   					 while ((line = reader.readLine()) != null) {
					       primeList.add(new BigInteger(line));
						
					}
				} catch (IOException x) { 
					System.out.println("Nie wygenerowano liczb! uzyj parametru gen!");
				}	

				p = primeList.get(0);
				q = primeList.get(1);
				
				n = p.multiply(q);
				fi = EulerFunction(p, q);
				e = findE(fi, dbits);
				d = e.modInverse(fi);

		        dp = d.remainder(p.subtract(BigInteger.ONE));
		        dq = d.remainder(q.subtract(BigInteger.ONE));
		        c2  = p.modInverse(q);

				//System.out.println(p+" "+q+" "+n+" "+fi+" "+e+" "+d);
				
				try (PrintStream outPublic = new PrintStream(new FileOutputStream("publickey.txt"))) {
					outPublic.println(e);
					outPublic.println(n);
			
				} catch(FileNotFoundException ex){ };

				try (PrintStream outPrivate = new PrintStream(new FileOutputStream("privatekey.txt"))) {
					outPrivate.println(d);
					outPrivate.println(n);
					outPrivate.println(dp);
					outPrivate.println(dq);
					outPrivate.println(c2);
					outPrivate.println(p);
					outPrivate.println(q);
			
				} catch(FileNotFoundException ex){ };
				
				
			}

			else if(param.equals("e")){
        		
        		e = new BigInteger("1");
        		n = new BigInteger("1");

				Path file = Paths.get("./prime.txt");
				Path filePublicKey = Paths.get("./publickey.txt");
				Path filePrivateKey = Paths.get("./privatekey.txt");
				try (InputStream in = Files.newInputStream(file)){  					

				}catch (IOException x) { 
					System.out.println("Nie wygenerowano liczb! uzyj parametru gen!");
				};

				try (InputStream in2 = Files.newInputStream(filePublicKey)){
   					BufferedReader reader = new BufferedReader(new InputStreamReader(in2));
					String line = null;
					int l = 0;
				 	while ((line = reader.readLine()) != null) {
			       		if(l == 0)
			       			e = new BigInteger(line);
			       		else
			       			n = new BigInteger(line);
			       		l++;
					}

					double startTime = System.nanoTime();

					encodeFile(e, n, fileIn, fileOut);
					
					double endTime = System.nanoTime();
					double duration = (endTime - startTime) / 1000000000;
					System.out.println("Czas szyfrowania: " + duration + "s");
				}
				catch (IOException x2) { 
					System.out.println("Nie wygenerowano klucza publicznego! uzyj parametru gen!");
				};

				try (InputStream in3 = Files.newInputStream(filePrivateKey)){

				}
				catch (IOException x3) { 
					System.out.println("Nie wygenerowano klucza prywatnego! uzyj parametru gen!");
				};
			}

			else if(param.equals("d")){
        		
        		d = new BigInteger("1");
        		n = new BigInteger("1");

				Path file = Paths.get("./prime.txt");
				Path filePublicKey = Paths.get("./publickey.txt");
				Path filePrivateKey = Paths.get("./privatekey.txt");
				try (InputStream in = Files.newInputStream(file)){ }
   					
				catch (IOException x) { 
					System.out.println("Nie wygenerowano liczb! uzyj parametru gen!");
				}
				try (InputStream in2 = Files.newInputStream(filePublicKey)){ }
				catch (IOException x2) { 
					System.out.println("Nie wygenerowano klucza publicznego! uzyj parametru gen!");
				};
				try (InputStream in3 = Files.newInputStream(filePrivateKey)){
   					BufferedReader reader = new BufferedReader(new InputStreamReader(in3));
					String line = null;
					int l = 0;
				 	while ((line = reader.readLine()) != null) {
			       		if(l == 0)
			       			d = new BigInteger(line);
			       		else if(l == 1)
			       			n = new BigInteger(line);
			       		l++;
					}

					double startTime = System.nanoTime();

					decodeFile(d, n, fileIn, fileOut);

					double endTime = System.nanoTime();
					double duration = (endTime - startTime) / 1000000000;
					System.out.println("Czas deszyfrowania: " + duration + "s");
				}
				catch (IOException x3) { 
					System.out.println("Nie wygenerowano klucza prywatnego! uzyj parametru gen!");
				};
			}

			else if(param.equals("dcrt")){
        		
        		d = new BigInteger("1");
        		n = new BigInteger("1");
        		dp = new BigInteger("1");
        		dq = new BigInteger("1");
        		c2 = new BigInteger("1");
        		p = new BigInteger("1");
        		q = new BigInteger("1");

				Path file = Paths.get("./prime.txt");
				Path filePublicKey = Paths.get("./publickey.txt");
				Path filePrivateKey = Paths.get("./privatekey.txt");
				try (InputStream in = Files.newInputStream(file)){ }
   					
				catch (IOException x) { 
					System.out.println("Nie wygenerowano liczb! uzyj parametru gen!");
				}
				try (InputStream in2 = Files.newInputStream(filePublicKey)){ }
				catch (IOException x2) { 
					System.out.println("Nie wygenerowano klucza publicznego! uzyj parametru gen!");
				};
				try (InputStream in3 = Files.newInputStream(filePrivateKey)){
   					BufferedReader reader = new BufferedReader(new InputStreamReader(in3));
					String line = null;
					List<BigInteger> list = new ArrayList<BigInteger>();
					int l = 0;
				 	while ((line = reader.readLine()) != null) {
			       		if(l == 0)
			       			d = new BigInteger(line);
			       		else if(l == 1)
			       			n = new BigInteger(line);
			       		else if(l == 2)
			       			dp = new BigInteger(line);
			       		else if(l == 3)
			       			dq = new BigInteger(line);
			       		else if(l == 4)
			       			c2 = new BigInteger(line);
			       		else if(l == 5)
			       			p = new BigInteger(line);
			       		else if(l == 6)
			       			q = new BigInteger(line);
			       		l++;
					}

					double startTime = System.nanoTime();

					// decodeFile(d, n, fileIn, fileOut);

					// decodeCT(d, n, list, fileIn, fileOut);
					decodeCT(dp, dq, c2, p, q, fileIn, fileOut);

					double endTime = System.nanoTime();
					double duration = (endTime - startTime) / 1000000000;
					System.out.println("Czas deszyfrowania CRT: " + duration + "s");
				}
				catch (IOException x3) { 
					System.out.println("Nie wygenerowano klucza prywatnego! uzyj parametru gen!");
				};
			}
		}

	}

	public static void decodeCT(BigInteger dp, BigInteger dq, BigInteger c2, BigInteger p, BigInteger q, String inFile, String outFile){
		File fileOut = new File(outFile);
		int fileSize = (int)new File(inFile).length();
		byte[] fromFile;
		FileOutputStream fileOutputStream;
		try{
			fileOutputStream = new FileOutputStream(fileOut);
		try {

			fromFile = new byte[fileSize];
			FileInputStream fileInputStream = new FileInputStream(new File(inFile));
	        int readBytes=0;
	        int rrr=0;
	        try {

	            while((rrr=fileInputStream.read(fromFile))!=-1){
	                readBytes+=rrr;
	            }
	        } catch (FileNotFoundException ex) {
	            ex.printStackTrace();
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }

	    String[] readEncoded = new String(fromFile).split(" ");
    	String part = "";
	    for(String re: readEncoded){
	    	

	    	BigInteger c = new BigInteger(re);

	        ExecutorService pool = Executors.newFixedThreadPool(factors.length) ;
	        
	        for(int i=0;i<factors.length;i++)
	        {
	            pool.submit(new Runnable()
	            {
	                public void run()
	                {
	                    long id = Thread.currentThread().getId()%factors.length ;
	                    r[(int)id] = d.mod(factors[(int)id].
	                            subtract(BigInteger.valueOf(1))) ;
	                    m[(int)id] = fileBI.modPow(r[(int)id],factors[(int)id]) ;
	                }
	            }) ;
	        }

	        BigInteger cDp = c.modPow(dp, p);
	        BigInteger cDq = c.modPow(dq, q);
	        BigInteger u = ((cDq.subtract(cDp)).multiply(c2)).remainder(q);
	        if (u.compareTo(BigInteger.ZERO) < 0) {
	            u = u.add(q);
	        }
	        part += new String(cDp.add(u.multiply(p)).toByteArray());




	    	//BigInteger result = (new BigInteger(re)).modPow(d, n);
	    }
    	fileOutputStream.write(part.getBytes());
    	// System.out.println(part);

		} catch (IOException x) { }

		} catch (FileNotFoundException f){}
	}

}
