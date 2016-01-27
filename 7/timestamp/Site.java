import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class Site {

	public static String time = null;
	public static String hash = null;

	public static String getContent(HttpsURLConnection con) {
		String input = "";
		if (con != null) {
			try {

				BufferedReader br = new BufferedReader(new InputStreamReader(
						con.getInputStream()));

				String temp = "";

				while ((temp = br.readLine()) != null) {
					input += temp;
				}
				br.close();

			} catch (IOException e) {
				e.printStackTrace();
			}

		}
		try {
			FileOutputStream confOut = new FileOutputStream("output.xml");

			confOut.write(input.getBytes());

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return input;
	}

	
	public static String getTime(String cont) {
		String time = "";

		File xmlFile = new File("output.xml");
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder;
		try {
			dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(xmlFile);
			doc.getDocumentElement().normalize();

			NodeList nList = doc.getElementsByTagName("record");
			Node nNode = nList.item(0);

			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
				Element eElement = (Element) nNode;
				time = eElement.getElementsByTagName("timeStamp").item(0)
						.getTextContent();
			}

		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return time;
	}

	public static String getSeed(String cont) {
		String seed = "";

		File xmlFile = new File("output.xml");
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder;
		try {
			dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(xmlFile);
			doc.getDocumentElement().normalize();

			NodeList nList = doc.getElementsByTagName("record");
			Node nNode = nList.item(0);

			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
				Element eElement = (Element) nNode;
				seed = eElement.getElementsByTagName("seedValue").item(0)
						.getTextContent();
			}

		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return seed;
	}

	public static boolean validate(String sign) {

		String https_url = "https://beacon.nist.gov/rest/record/" + time;
		URL url;
		String tempHash = hash;

		try {
			url = new URL(https_url);
			HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
			String content = getContent(con);

			System.out.println("Getting seedValue...");

			String actualSign = null;
			String actualSeed = null;

			File xmlFile = new File("output.xml");
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder dBuilder;
			try {
				dBuilder = dbFactory.newDocumentBuilder();
				Document doc = dBuilder.parse(xmlFile);
				doc.getDocumentElement().normalize();

				NodeList nList = doc.getElementsByTagName("record");
				Node nNode = nList.item(0);

				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;
					actualSeed = eElement.getElementsByTagName("seedValue")
							.item(0).getTextContent();
				}

			} catch (ParserConfigurationException e) {
				e.printStackTrace();
			} catch (SAXException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			actualSign = tempHash + time + actualSeed;
			System.out.println("timeStamp 2 = [" + actualSign + ", " + time + "]");
			if (!sign.equals(actualSign))
				return false;

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return true;
	}
}
