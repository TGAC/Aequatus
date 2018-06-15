/*
#
# Copyright (c) 2013.  Earlham Institute, Norwich, UK
# Aequatus project contacts: Anil Thanki, Xingdong Bian, Robert Davey, Mario Caccamo @ Earlham Institute
# **********************************************************************
#
# This file is part of Aequatus.
#
# Aequatus is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Aequatus is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Aequatus.  If not, see <http://www.gnu.org/licenses/>.
#
# ***********************************************************************
#
 */

package uk.ac.bbsrc.earlham.browser.store.ensemblDAO;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.SAXException;
import uk.ac.bbsrc.earlham.browser.core.store.EnsemblRestStore;

import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by IntelliJ IDEA.
 * User: thankia
 * Date: 14-Aug-2013
 * Time: 11:10:23
 * To change this template use File | Settings | File Templates.
 */


public class EnsemblRestAPI implements EnsemblRestStore {

    protected static final Logger log = LoggerFactory.getLogger(EnsemblRestAPI.class);

    String server = "https://rest.ensembl.org";
    protected URL url;

    @Override
    public JSONObject getSpecies() throws IOException {
        String ext = "/info/species?";
        url = new URL(server + ext);
        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection) connection;

        httpConnection.setRequestProperty("Content-Type", "application/json");


        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was " + responseCode);
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
        } finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }


        JSONObject result = new JSONObject();
        result.put("result", output);
        return result.getJSONObject("result");
    }

    public JSONObject testRestAPI() throws IOException{
        String ext = "/info/ping?";
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
        JSONObject status = JSONObject.fromObject(output);

        return status;
    }


    public JSONObject getRestAPIversion() throws IOException{
        String ext = "/info/rest?";
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
        JSONObject version = JSONObject.fromObject(output);

        return version;
    }


    public JSONObject getReleaseversion() throws IOException{
        String ext = "/info/software?";
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
        JSONObject release = JSONObject.fromObject(output);

        return release;
    }

    public JSONObject searchGenes(String keyword, String species) throws IOException {
        String ext = "/xrefs/symbol/" + species + "/" + keyword + "%25?object_type=gene";
        URL url = new URL(server + ext);

        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection) connection;

        httpConnection.setRequestProperty("Content-Type", "application/json");


        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was " + responseCode);
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
        } finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }

        JSONObject result = new JSONObject();

        JSONArray genes = JSONArray.fromObject(output);

        for (int i = 0; i < genes.size(); i++) {
            String gene_id = genes.getJSONObject(i).getString("id");
            genes.getJSONObject(i).put(gene_id, getGene(gene_id, false));
        }


        result.put("result", genes);
        return result;

    }

    public JSONObject getGeneTree(String id, String species) throws IOException, ParserConfigurationException, SAXException {
        JSONObject result = new JSONObject();

        String ext = "/genetree/member/id/" + id + "?cigar_line=1;sequence=protein";//prune_species=cow;prune_taxon=9526";

//        String species = "human,pig,rat,mouse,dog,chimpanzee";

        String[] species_list = species.split(",");

        String[] prune = new String[species_list.length];

        for (int i = 0; i < species_list.length; i++) {
            prune[i] = "prune_species=" + species_list[i];
        }

        URL url = new URL(server + ext + ";" + StringUtils.join(prune, ";"));

        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection) connection;

        httpConnection.setRequestProperty("Content-Type", "application/json");

        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was " + responseCode);
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
        } finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }

        JSONObject tree = JSONObject.fromObject(output);
        result.put("member", getMembers(id, species).getJSONObject("members"));
//        result.put("memberssss", getMembers(id, species).get("members"));
        result.put("tree", tree.getJSONObject("tree"));
        result.put("ref", id);
        result.put("protein_id", id);

        return result;
    }

    public JSONObject getMembers(String id, String species) throws IOException, ParserConfigurationException, SAXException {
        JSONObject result = new JSONObject();

        String ext = "/genetree/member/id/" + id + "?";//prune_species=cow;prune_taxon=9526";

//        String species = "human,pig,rat,mouse,dog,chimpanzee";

        String[] species_list = species.split(",");

        String[] prune = new String[species_list.length];

        for (int i = 0; i < species_list.length; i++) {
            prune[i] = "prune_species=" + species_list[i];
        }

        URL url = new URL(server + ext + ";" + StringUtils.join(prune, ";"));

        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection) connection;

        httpConnection.setRequestProperty("Content-Type", "text/x-orthoxml+xml");

//        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was " + responseCode);
        }

        List<String> output = new ArrayList<>();
        BufferedReader in = new BufferedReader(
                new InputStreamReader(httpConnection.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            Pattern p = Pattern.compile("<gene.*geneId=\"(.*)\" protId=.*>");
            Matcher matcher_comment = p.matcher(inputLine);
            if (matcher_comment.find()) {
                output.add(matcher_comment.group(1));
            }
        }
        in.close();
        JSONObject genes = new JSONObject();
        for (int i = 0; i < output.size(); i++) {
            genes.put(output.get(i), getGene(output.get(i), true));
        }

        result.put("members", genes);

        return result;
    }

    public JSONObject getHomologous(String id, String species) throws IOException {
        JSONObject result = new JSONObject();

        JSONArray homologies = getHomology(id, species).getJSONArray("homology");

        String[] members = new String[homologies.size() + 1];

        for (int i = 0; i < homologies.size(); i++) {
            members[i] = homologies.getJSONObject(i).getJSONObject("target").getString("id");
        }

        members[homologies.size()] = id;

        JSONObject ids = new JSONObject();

        ids.put("ids", members);

        result = getGenes(ids, true);

        return result;
    }

    public JSONObject getGenes(JSONObject ids, Boolean expand) throws IOException {
        JSONObject result = new JSONObject();

        String server = "https://rest.ensembl.org";
        String ext = "/lookup/id";
        URL url = new URL(server + ext);

        if (expand == true) {
            ids.put("expand", "1");
        }

        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection) connection;

        String postBody = ids.toString();
        httpConnection.setRequestMethod("POST");
        httpConnection.setRequestProperty("Content-Type", "application/json");
        httpConnection.setRequestProperty("Accept", "application/json");
        httpConnection.setRequestProperty("Content-Length", Integer.toString(postBody.getBytes().length));
        httpConnection.setUseCaches(false);
        httpConnection.setDoInput(true);
        httpConnection.setDoOutput(true);

        DataOutputStream wr = new DataOutputStream(httpConnection.getOutputStream());
        wr.writeBytes(postBody);
        wr.flush();
        wr.close();


        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was " + responseCode);
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
        } finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }


        result.put("members", output);


        return result;
    }

    public JSONObject getGene(String id, Boolean expand) throws IOException {

        String ext = "/lookup/id/" + id;

        if (expand == true) {
            ext += "?expand=1";
        }
        URL url = new URL(server + ext);

        URLConnection connection = url.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection) connection;

        httpConnection.setRequestProperty("Content-Type", "application/json");


        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was " + responseCode);
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
        } finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }

        JSONObject gene = JSONObject.fromObject(output);

        return gene;
    }


    public JSONObject getHomology(String id, String species) throws IOException {
        JSONObject result = new JSONObject();

        String ext = "/homology/id/" + id + "?";//prune_species=cow;prune_taxon=9526";
//        String species = "human,pig,rat,mouse,dog,chimpanzee";

        String[] species_list = species.split(",");

        String[] prune = new String[species_list.length];

        for (int i = 0; i < species_list.length; i++) {
            prune[i] = "target_species=" + species_list[i];
        }

        String prune_str = StringUtils.join(prune, ";");
        URL url = new URL(server + ext + "" + prune_str);

        URLConnection connection = url.openConnection();

        HttpURLConnection httpConnection = (HttpURLConnection) connection;

        httpConnection.setRequestProperty("Content-Type", "application/json");

        InputStream response = connection.getInputStream();
        int responseCode = httpConnection.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Response code was not 200. Detected response was " + responseCode);
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
        } finally {
            if (reader != null) try {
                reader.close();
            } catch (IOException logOrIgnore) {
                logOrIgnore.printStackTrace();
            }
        }

        JSONObject homology = JSONObject.fromObject(output);


        JSONArray homologies = homology.getJSONArray("data").getJSONObject(0).getJSONArray("homologies");

        result.put("homology", homologies);

        return result;
    }

}