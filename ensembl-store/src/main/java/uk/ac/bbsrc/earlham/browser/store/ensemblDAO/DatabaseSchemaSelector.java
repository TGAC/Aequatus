package uk.ac.bbsrc.earlham.browser.store.ensemblDAO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.io.IOException;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 03/11/14
 * Time: 10:57
 * To change this template use File | Settings | File Templates.
 */


public final class DatabaseSchemaSelector {


    protected static final Logger log = LoggerFactory.getLogger(DatabaseSchemaSelector.class);
    private static Map<String, JdbcTemplate> templates = null;
    private static Properties ppconfig;

    public DatabaseSchemaSelector(Properties ppconfig) {
        this.ppconfig = ppconfig;
    }

    public static JdbcTemplate getConnection(String genome) throws IOException {
        if (templates == null) {
            templates = new HashMap<String, JdbcTemplate>();
            if (createConnection(genome)) {
                return templates.get(genome);
            } else {
                return null;
            }
        } else {
            return templates.get(genome);
        }
    }

    public static boolean createConnection(String genome) throws IOException {
        if (templates == null) {
            templates = new HashMap<String, JdbcTemplate>();
        }

        if (ppconfig.containsKey(genome + ".url") && ppconfig.containsKey(genome + ".username") && ppconfig.containsKey(genome + ".password")) {
            String url = ppconfig.getProperty(genome + ".url");
            String username = ppconfig.getProperty(genome + ".username");
            String password = ppconfig.getProperty(genome + ".password");
            if ((url == null && "".equals(url)) || (username == null && "".equals(username))) {
                return false;
            } else {
                JdbcTemplate temp_template = new JdbcTemplate(getDataSource("com.mysql.jdbc.Driver", url, username, password));
                templates.put(genome, temp_template);
                return true;
            }

        } else {
            return false;
        }
    }

    public static boolean defaultDatabase(String genome) throws IOException {
        if (templates == null) {
            templates = new HashMap<String, JdbcTemplate>();
        }

        if (ppconfig.containsKey(genome + ".url") && ppconfig.containsKey(genome + ".username") && ppconfig.containsKey(genome + ".password")) {
            String isDefault = ppconfig.getProperty(genome + ".isDefault");
            if(isDefault.toLowerCase().equals("true")){
                return true;
            }else{
                return false;
            }
        } else {
            return false;
        }
    }

    private static DriverManagerDataSource getDataSource(String driverClassName, String url, String dbUsername, String dbPassword) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(dbUsername);
        dataSource.setPassword(dbPassword);
        return dataSource;
    }
}
