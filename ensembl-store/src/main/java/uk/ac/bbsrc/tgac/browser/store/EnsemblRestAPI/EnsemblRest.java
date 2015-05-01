package uk.ac.bbsrc.tgac.browser.store.EnsemblRestAPI;

import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import uk.ac.bbsrc.tgac.browser.core.store.*;
import uk.ac.bbsrc.tgac.browser.store.ensemblDAO.SQLEnsemblComparaDAO;

import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.Reader;


public class EnsemblRest implements EnsemblRestStore{
    protected static final Logger log = LoggerFactory.getLogger(SQLEnsemblComparaDAO.class);

    public void getGene() throws Exception {

        log.info("\n\n\n\t getGene");
        String server = "http://rest.ensemblDAO.org";
        String ext = "/lookup/symbol/homo_sapiens/BRCA2?expand=1";
        URL url = new URL(server + ext);

        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection)connection;

        httpConnection.setRequestProperty("Content-Type", "application/json");


        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if(responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was "+responseCode);
        }

        String output;
        Reader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(response, "UTF-8"));
            StringBuilder builder = new StringBuilder();
            char[] buffer = new char[8192];
            int read;
            while ((read = reader.read(buffer, 0, buffer.length)) > 0) {
                builder.append(buffer, 0, read);
            }
            output = builder.toString();
        }
        finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }

       log.info(output);
    }

    public  JSONObject listSpecies() throws Exception {

        log.info("\n\n\n\t getSpecies");

        JSONObject species = new JSONObject();
        String server = "http://rest.ensemblDAO.org";
        String ext = "/info/species.json";
        URL url = new URL(server + ext);

        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection)connection;

//        httpConnection.setRequestProperty("Content-Type", "application/json");


        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        log.info("\n\n\n\t\t\t resposnse code "+responseCode);

//        if(responseCode != 200) {
//            throw new RuntimeException("Response code was not 200. Detected response was "+responseCode);
//        }

        String output;
        Reader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(response, "UTF-8"));
            StringBuilder builder = new StringBuilder();
            char[] buffer = new char[8192];
            int read;
            while ((read = reader.read(buffer, 0, buffer.length)) > 0) {
                builder.append(buffer, 0, read);
            }
            output = builder.toString();
            species = JSONObject.fromObject(output);

        }
        finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }

        log.info(output);
        return species;
    }
}

