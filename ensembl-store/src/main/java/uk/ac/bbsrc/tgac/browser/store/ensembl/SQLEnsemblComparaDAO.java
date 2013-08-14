/*
#
# Copyright (c) 2013. The Genome Analysis Centre, Norwich, UK
# TGAC Browser project contacts: Anil Thanki, Xingdong Bian, Robert Davey, Mario Caccamo @ TGAC
# **********************************************************************
#
# This file is part of TGAC Browser.
#
# TGAC Browser is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# TGAC Browser is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with TGAC Browser.  If not, see <http://www.gnu.org/licenses/>.
#
# ***********************************************************************
#
 */

package uk.ac.bbsrc.tgac.browser.store.ensembl;


import net.sf.ehcache.CacheManager;
import net.sf.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import uk.ac.bbsrc.tgac.browser.core.store.ComparaStore;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: thankia
 * Date: 14-Aug-2013
 * Time: 11:10:23
 * To change this template use File | Settings | File Templates.
 */

public class SQLEnsemblComparaDAO implements ComparaStore {
    protected static final Logger log = LoggerFactory.getLogger(SQLEnsemblComparaDAO.class);


    public static final String GET_ALL_GENOMES = "select * from genome_db where name like ?";

    public static final String GET_DNAFRAG_FROM_GENOMEID = "select * from dnafrag where genome_db_id = ?";
    @Autowired
    private CacheManager cacheManager;

    public void setCacheManager(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    public JdbcTemplate getJdbcTemplate() {
        return template;
    }


    private JdbcTemplate template;

    public void setJdbcTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public String getAllDnafragByGenomedbId(int query) throws IOException {
        try {
            String str = template.queryForObject(GET_DNAFRAG_FROM_GENOMEID, new Object[]{query}, String.class);
            return str;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllDnafragByGenomedbId no result found");

        }
    }

    public JSONArray getAllGenomeId(String query) throws IOException {
        log.info("getAllGenomeId "+query);
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomeIDs = template.queryForList(GET_ALL_GENOMES, new Object[]{'%' +query + '%'});
            log.info("size "+genomeIDs.size());
            for(Map map:genomeIDs){
                log.info("map "+map.toString());
                genomes.add(map);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllGenomeId no result found");
        }
    }
}
