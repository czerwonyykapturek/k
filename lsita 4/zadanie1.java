import java.util.List;
import java.util.ArrayList;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.List;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.io.FileNotFoundException;

class generatingNumbers implements Runnable{
	
	int d;
	int number;
	List<Integer> primeSmallList;
	SecureRandom randomNumber;	

	generatingNumbers(int d, List<Integer> primeSmallList) {
		this.primeSmallList = primeSmallList;
		this.d = d;
	}

	public static boolean testPrime(int n){

		for(int i = 2; i <= (int)Math.sqrt(n); i++){
			if(n % i != 0) continue;
			else return false;
		}
		return true;
	}


	public static boolean RabinMiller(int n, int precision){

		int poverty = 0;
		int sum = 0;
		int x = 0;
		int factor = n-1;
		
		while(factor % 2 == 0){
			poverty = poverty++;
			factor = factor/2;
		}
		
		for(int i = 1; i <= precision; i++){

			SecureRandom seed = new SecureRandom(); 
			int base = seed.nextInt(n-4) + 2;

			/*while((base.compareTo(n.subtract(BigInteger.ONE)) >= 0) || base.compareTo(BigInteger.ONE) <=0){
				base = new BigInteger(n.bitLength(), seed);
			}*/

			x = (int) (Math.pow(base, factor) % n);

			if(x == 1 || x == n-1) continue;
				
			sum = 1;
				
			while(sum < poverty && x!= n-1) {

				x = (int) (Math.pow(x, 2) % n);

				if(x == 1) return false;
				sum = sum++;
			}

			if(!(x== n-1)) return false;
			
		}
		
		return true;				

	}
	

	public void run() {
		
		do {
			randomNumber = new SecureRandom();
			number = randomNumber.nextInt((int)Math.pow(2, d));
		} while(!testPrime(number) || primeSmallList.contains(number) || number < 3);
		
		primeSmallList.add(number);

		try (PrintStream out = new PrintStream(new FileOutputStream("prime.txt"))) {
   			for(int j: primeSmallList)
   			out.println(j);
		} catch(FileNotFoundException ex){ };

		System.out.println(number);	
	}

}

class generatingBigNumbers implements Runnable{
	
	int d;
	BigInteger number;
	List<BigInteger> primeList;
	SecureRandom randomNumber;	

	generatingBigNumbers(int d, List<BigInteger> primeList) {
		this.primeList = primeList;
		this.d = d;
	}
	
	public static boolean RabinMiller(BigInteger n, int precision){

		BigInteger poverty = new BigInteger("0");  
		BigInteger two = new BigInteger("2");
		BigInteger sum = new BigInteger("0"); 
		BigInteger x = new BigInteger("0");
		BigInteger factor = n.subtract(BigInteger.ONE);
		
		while(factor.mod(two).equals(BigInteger.ZERO)){

			poverty = poverty.add(BigInteger.ONE);
			factor = factor.divide(two);
		}
	
		for(int i = 1; i <= 30; i++){

			SecureRandom seed = new SecureRandom(); 
			BigInteger base = new BigInteger(n.bitLength(), seed);

			while((base.compareTo(n.subtract(BigInteger.ONE)) >= 0) || base.compareTo(BigInteger.ONE) <=0){
				base = new BigInteger(n.bitLength(), seed);
			}

			x = base.modPow(factor, n);

			if(x.equals(BigInteger.ONE) || x.equals(n.subtract(BigInteger.ONE))) continue;
	
			sum = sum.add(BigInteger.ONE);
				
			while((sum.compareTo(poverty) < 0) && !(x.equals(n.subtract(BigInteger.ONE)))) {

				x = x.modPow(two, n);

				if(x.equals(BigInteger.ONE)) return false;
				sum = sum.add(BigInteger.ONE);
			}

			if(!(x.equals(n.subtract(BigInteger.ONE)))) return false;
			if(sum.equals(poverty)) return false;
		}
		
		return true; 


	}
	
	public void run() {
		randomNumber = new SecureRandom();
		number = new BigInteger(d, randomNumber);
		int i = 0;

		while(!(RabinMiller(number, 100)) || primeList.contains(number)) {
			randomNumber = new SecureRandom();
			number = new BigInteger(d, randomNumber);
		}
		
		primeList.add(number);
 
		try (PrintStream out = new PrintStream(new FileOutputStream("prime.txt"))) {
			for(BigInteger j: primeList)
   			out.println(j);
			
		} catch(FileNotFoundException ex){ };

		System.out.println(number);	
	}

}

public class zadanie1{

	static List<BigInteger> primeList = new ArrayList<BigInteger>();
	static List<Integer> primeSmallList = new ArrayList<Integer>();

	public static void main(String[] args){

		if(args.length != 2) {
			System.out.println("Uzycie: nazwa k d");
		}
		else {
			int k = Integer.parseInt(args[0]);
			int d = Integer.parseInt(args[1]);

			if(d < 3){
				System.out.println("Liczba pierwsza musi mieć co najmniej 3 bity");
			}
			else if(d < 20) {
				Runnable[] runners = new Runnable[k];
				Thread[] threads = new Thread[k];

				for(int i = 0; i < k; i++){
					runners[i] = new generatingNumbers(d, primeSmallList);
					threads[i] = new Thread(runners[i]);
					threads[i].start();
				}
			}
			else {
				Runnable[] runners = new Runnable[k];
				Thread[] threads = new Thread[k];

				for(int i = 0; i < k; i++){
					runners[i] = new generatingBigNumbers(d, primeList);
					threads[i] = new Thread(runners[i]);
					threads[i].start();
				}
			}		
		}	
	}
}
