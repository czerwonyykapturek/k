import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.net.ssl.HttpsURLConnection;

public class TimeStamp {

	public static Site site;

	public static void main(String[] args) {
		site = new Site();
		String podpis = getSign(getFileHash());

		if (Site.validate(podpis) == true)
			System.out.println("Podpis poprawny!");
		else
			System.out.println("Podpis niepoprawny!");

		System.out.println("Koniec");

	}

	public static String getFileHash() {

		byte[] fileBytes = new byte[1024];
		byte[] mdBytes = new byte[1024];

		int nread = 0;

		StringBuffer hexString = new StringBuffer();
		try {
			FileInputStream fis = new FileInputStream("example.txt");
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			while ((nread = fis.read(fileBytes)) != -1)
				md.update(fileBytes, 0, nread);

			mdBytes = md.digest();

			String hex;
			for (int i = 0; i < mdBytes.length; i++) {
				hex = Integer.toHexString(0xff & mdBytes[i]);
				if (hex.length() == 1)
					hexString.append('0');
				hexString.append(hex);
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		site.hash = hexString.toString();
		return hexString.toString();
	}

	private static String getSign(String hash) {

		String beaconUrl = "https://beacon.nist.gov/rest/record/last";
		URL url;
		String podpis = null;
		try {

			url = new URL(beaconUrl);
			HttpsURLConnection con = (HttpsURLConnection) url.openConnection();

			// dump all the content
			String content = site.getContent(con);
			site.time = site.getTime(content);
			podpis = hash + site.time + site.getSeed(content);

			System.out.println("timeStamp = [" + podpis + ", " + site.time + "]");

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return podpis;
	}
}
