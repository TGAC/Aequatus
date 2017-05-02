package uk.ac.bbsrc.earlham.browser.service.ajax;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sourceforge.fluxion.ajax.Ajaxified;
import net.sourceforge.fluxion.ajax.util.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;
import java.io.DataInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by thankia on 11/04/2017.
 */
@Ajaxified

public class SmartDomain {

    private Logger log = LoggerFactory.getLogger(getClass());

    public JSONObject smartSearchSequence(HttpSession session, JSONObject json) throws IOException {
        try {
            String sequence = json.getString("sequence");

            Map<String, Object> params = new LinkedHashMap<>();
            params.put("SEQUENCE", sequence);
            params.put("TEXTONLY", 1);
            params.put("DO_PFAM", "DO_PFAM");

            StringBuilder postData = new StringBuilder();
            for (Map.Entry<String, Object> param : params.entrySet()) {
                if (postData.length() != 0) postData.append('&');
                postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
                postData.append('=');
                postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
            }
            byte[] postDataBytes = postData.toString().getBytes("UTF-8");

            URL url = new URL("http://smart.embl.de/smart/show_motifs.pl");

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setInstanceFollowRedirects(false);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestProperty("charset", "utf-8");
            connection.setRequestProperty("Content-Length", "" + String.valueOf(postDataBytes.length));
            connection.setUseCaches(false);
            connection.getOutputStream().write(postDataBytes);

            DataInputStream input = new DataInputStream(connection.getInputStream());

            JSONObject response = new JSONObject();

            String firstLine = input.readLine();
            if (firstLine.indexOf("RESULT") > 0) {
                response = parseDomain(input);
                response.put("status", "finished");
            } else {
                String str;
                StringBuilder sb = new StringBuilder();
                sb.append(firstLine);

                while (null != (str = input.readLine())) {
                    sb.append(str);
                }

                String pattern = "(job_status\\.pl\\?jobid=)(\\d+.+?)\"";
                response.put("jobid", "queued");
                Pattern r = Pattern.compile(pattern);
                Matcher m = r.matcher(sb.toString());
                if (m.find()) {
                    response.put("status", "queued");
                    response.put("jobid", m.group(2));
                } else {
                    response.put("status", "error");
                    response.put("error", "SMART returned an error page");
                    response.put("string", firstLine);
                }
            }

            String str;
            StringBuilder sb = new StringBuilder();

            while (null != (str = input.readLine())) {
                sb.append(str);
            }

            response.put("html", sb.toString());

            input.close();
            connection.disconnect();

            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }
    }


    private JSONObject parseDomain(DataInputStream input) throws IOException {
        String str;
        StringBuilder sb = new StringBuilder();
        JSONObject response = new JSONObject();

        JSONArray domains = new JSONArray();
        JSONObject domain = new JSONObject();

        while (null != (str = input.readLine())) {
            sb.append(str);
            if (str.contains("=")) {
                if (str.split("=")[0].equals("DOMAIN")) {
                    domain = new JSONObject();
                }

                domain.put(str.split("=")[0], str.split("=")[1]);

                if (str.split("=")[0].equals("STATUS")) {
                    domains.add(domain);
                }
            }
        }

        response.put("domains", domains);

        return response;
    }

    public JSONObject jobStatus(HttpSession session, JSONObject json) throws IOException {
        String jobid = json.getString("jobid");

        URL url = new URL("http://smart.embl.de/smart/job_status.pl?jobid=" + jobid);

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setInstanceFollowRedirects(false);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        connection.setRequestProperty("charset", "utf-8");
        connection.setUseCaches(false);

        DataInputStream input = new DataInputStream(connection.getInputStream());
        StringBuffer sb = new StringBuffer();

        String firstLine = input.readLine();

        JSONObject response = new JSONObject();


        response.put("firstLine", firstLine);

        if (firstLine.indexOf("HTML") > 0) {
            response.put("status", "queued");
        } else {
            response = parseDomain(input);
            response.put("status", "finished");
        }

        String str;

        while (null != (str = input.readLine())) {
            sb.append(str);
        }

        response.put("html", sb.toString());


        input.close();

        return response;
    }
}
