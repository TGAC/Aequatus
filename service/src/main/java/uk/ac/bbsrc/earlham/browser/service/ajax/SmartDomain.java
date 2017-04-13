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

            String str;
            StringBuilder sb = new StringBuilder();
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

            input.close();
            connection.disconnect();

            String result = null;
            result = sb.toString();

            JSONObject response = new JSONObject();
            response.put("domains", domains);
            response.put("html", result);

            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }
    }
}
