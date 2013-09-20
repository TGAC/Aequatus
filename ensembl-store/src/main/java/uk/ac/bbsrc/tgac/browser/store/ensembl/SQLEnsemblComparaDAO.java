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
import net.sf.json.JSONObject;
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

    public static final String GET_ALL_GENOMES_EXCEPT_ONE = "select * from genome_db where genome_db_id <> ?";

    public static final String GET_DNAFRAG_FROM_GENOMEID = "select * from dnafrag where genome_db_id = ?";

    public static final String GET_GENOMIC_ALIGN_BLOCK_BY_DNAFRAG_ID = "select genomic_align_id as id, genomic_align_block_id, dnafrag_id as ref_id, dnafrag_start as start, dnafrag_end as end, dnafrag_strand as strand, cigar_line from genomic_align where dnafrag_id = ? AND method_link_species_set_id = ? AND ((dnafrag_start > ? AND dnafrag_end < ?) OR (dnafrag_start < ? AND dnafrag_end > ?) OR (dnafrag_end > ? AND dnafrag_end < ?) OR (dnafrag_start > ? AND dnafrag_start < ?))";

    public static final String GET_GENOMIC_ALIGN_BY_DNAFRAG_ID = "select * from genomic_align where dnafrag_id = ? AND method_link_species_set_id = ? AND ((dnafrag_start > ? AND dnafrag_end < ?) OR (dnafrag_start < ? AND dnafrag_end > ?) OR (dnafrag_end > ? AND dnafrag_end < ?) OR (dnafrag_start > ? AND dnafrag_start < ?))";

    public static final String COUNT_GENOMIC_ALIGN_BY_DNAFRAG_ID = "select count(*) from genomic_align where dnafrag_id = ? AND method_link_species_set_id = ? AND (dnafrag_start >= ? AND dnafrag_end <= ?)";

    public static final String GET_GENOMIC_ALIGN_BLOCK_BY_ID = "select * from genomic_align_block where genomic_align_block_id = ?";

    public static final String GET_METHOD_LINK_SPECIES_SET_BY_GENOME_ID = "select * from method_link_species_set ms, species_set ss where ss.species_set_id = ms.species_set_id and ss.genome_db_id = ?";

    public static final String GET_REFERENCE_LENGTH = "select length from dnafrag where dnafrag_id = ?";

    public static final String GET_REFERENCE_NAME = "select name from dnafrag where dnafrag_id = ?";

    public static final String  GET_DNAFRAG_ID_SEARCH = "select dnafrag_id from dnafrag where name = ? and genome_db_id = ?";

    public static final String  GET_DNAFRAGS_ID_SEARCH = "select dnafrag_id from dnafrag where name like ? and genome_db_id = ?";

    public static final String  GET_DNAFRAG_BY_NAME = "select * from dnafrag where name like ? and genome_db_id = ?";

    public static final String GET_GENOME_ID_FROM_DNAFRAG = "select genome_db_id from dnafrag where dnafrag_id = ?";

    public static final String GET_GENOME_NAME_FROM_ID = "select name from genome_db where genome_db_id = ?";

    public static final String GET_GENOMIC_ALIGN_BLOCK_BY_GENOMIC_ALIGN_BLOCK_ID = "select genomic_align_id as id, genomic_align_block_id, dnafrag_id as ref_id, dnafrag_start as start, dnafrag_end as end, dnafrag_strand as strand, cigar_line  from genomic_align where genomic_align_block_id = ? AND dnafrag_id <> ?";

    public static final String GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_MEMBER_ID = "select member_id from homology_member where homology_id = ? AND member_id <> ?";

    public static final String GET_HOMOLOGY_ID_BY_MEMBER_ID = "select homology_id from homology_member where member_id = ?";

    public static final String GET_MEMBER_BY_CHROMOSOME_NAME = "select member_id as id, chr_start as start, chr_end as end, chr_strand as strand, chr_name, genome_db_id from member where chr_name = ? and ((chr_start > ? AND chr_end < ?) OR (chr_start < ? AND chr_end > ?) OR (chr_end > ? AND chr_end < ?) OR (chr_start > ? AND chr_start < ?))";

    public static final String GET_MEMBER_BY_MEMBER_ID = "select member_id as id, chr_start as start, chr_end as end, chr_strand as strand, chr_name, genome_db_id from member where member_id = ?";

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

    public JSONArray getGenomicAlignbyDnafragId(String query) throws IOException {
        log.info("getGenomocAlignbyDnafragId "+query);
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomic_align = template.queryForList(GET_GENOMIC_ALIGN_BY_DNAFRAG_ID, new Object[]{query});
            log.info("size "+genomic_align.size());
            for(Map map:genomic_align){
                log.info("map "+map.toString());
                genomes.add(map);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getGenomocAlignbyDnafragId no result found");
        }
    }

    public JSONArray getGenomicAlignblockbyId(String query) throws IOException {
        log.info("getGenomocAlignbyDnafragId "+query);
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomic_align = template.queryForList(GET_GENOMIC_ALIGN_BLOCK_BY_ID, new Object[]{query});
            log.info("size "+genomic_align.size());
            for(Map map:genomic_align){
                log.info("map "+map.toString());
                genomes.add(map);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getGenomocAlignblockbyId no result found");
        }
    }

    public JSONArray getAllGenomeIdforReference(int query) throws IOException {
        log.info("getAllGenomeIdforreference "+query);
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomeIDs = template.queryForList(GET_ALL_GENOMES_EXCEPT_ONE, new Object[]{query});
            log.info("size "+genomeIDs.size());
            for(Map map:genomeIDs){
                JSONObject species = new JSONObject();
                JSONArray tracks_list =  new JSONArray();
                List<Map<String, Object>> method_link_ids = template.queryForList(GET_METHOD_LINK_SPECIES_SET_BY_GENOME_ID, new Object[]{map.get("genome_db_id").toString()});

                for(Map maps:method_link_ids){
                    JSONObject track = new JSONObject();
                    track.put("species_set_id",maps.get("species_set_id").toString());
                    track.put("method_link_species_set_id",maps.get("method_link_species_set_id").toString());
                    track.put("method_link_id",maps.get("method_link_id").toString());
                    track.put("name",maps.get("name").toString().replaceAll("\\(","_").replaceAll("\\)","_"));
                    tracks_list.add(track);
                }
                String name = template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{map.get("genome_db_id").toString()}, String.class);
                species.put("name",name);
                species.put(name,tracks_list);
                log.info("map " + map.toString());
                genomes.add(species);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllGenomeIdforreference no result found");
        }
    }

    public int getReferenceLength(int query) throws IOException {
        log.info("getReferenceLength "+query);
        try {
            JSONArray genomes = new JSONArray();
            int length = template.queryForObject(GET_REFERENCE_LENGTH, new Object[]{query}, Integer.class);
            return length;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getReferenceLength no result found");
        }
    }

    public String getReferenceName(int query) throws IOException {
        log.info("getReferenceName "+query);
        try {
            JSONArray genomes = new JSONArray();
            String name = template.queryForObject(GET_REFERENCE_NAME, new Object[]{query}, String.class);
            return name;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getReferenceName no result found");
        }
    }


    public int getDnafragearchsize(String query, int reference) throws IOException {
        log.info("getDnafragearchsize "+query);
        try {
            List<Map<String, Object>> maps = template.queryForList(GET_DNAFRAGS_ID_SEARCH, new Object[]{'%' + query + '%', reference});
            return maps.size();
        }
        catch (EmptyResultDataAccessException e) {
//     return getGOSearch(searchQuery);
//      throw new IOException("result not found");
            return 0;
    }
    }

    public int getDnafragId(String query, int reference) throws IOException {
        log.info("getDnafragId  "+query);
        try {
            return template.queryForObject(GET_DNAFRAG_ID_SEARCH, new Object[]{ query, reference}, Integer.class);
        }
        catch (EmptyResultDataAccessException e) {
//     return getGOSearch(searchQuery);
//      throw new IOException("result not found");
            return 0;
        }
    }

    public int getGenomeIdfromDnafragId(int query) throws IOException {
        log.info("getGenomeIdfromDnafragId  "+query);
        try {
            int genome_id = template.queryForObject(GET_GENOME_ID_FROM_DNAFRAG, new Object[]{'%' + query + '%'}, Integer.class);

            return genome_id;

        }
        catch (EmptyResultDataAccessException e) {
//     return getGOSearch(searchQuery);
//      throw new IOException("result not found");
            return 0;
        }
    }

    public String getGenomeNamefromId(int query) throws IOException {
        log.info("getGenomeIdfromDnafragId  "+query);
        try {
            String genome_name = template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{query}, String.class);

            return genome_name;

        }
        catch (EmptyResultDataAccessException e) {
//     return getGOSearch(searchQuery);
//      throw new IOException("result not found");
            return "";
        }
    }

    public JSONArray getAllDnafragByName(String query, int reference) throws IOException {
        try {
            JSONArray dnafrags =  new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_DNAFRAG_BY_NAME, new Object[]{'%'+query+'%', reference});
            for(Map map: maps){
                map.put("genome_db_name",getGenomeNamefromId(reference));
                dnafrags.add(map);
            }
            return dnafrags;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllDnafragByGenomedbId no result found");

        }
    }

    public int countGenomicAlign(int query, long start, long end, int mlssid) throws IOException {
        try {
            int size = template.queryForObject(COUNT_GENOMIC_ALIGN_BY_DNAFRAG_ID, new Object[]{query, mlssid, start, end}, Integer.class);

            return size;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" countGenomicAlign no result found");

        }
    }

    public JSONArray getGenomicAlign(int query, long start, long end, int mlssid) throws IOException {
        try {
            JSONArray aligns =  new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_GENOMIC_ALIGN_BLOCK_BY_DNAFRAG_ID, new Object[]{query, mlssid, start, end, start, end, start, end, start, end});
            for(Map map: maps){
                List<Map<String, Object>> align_blocks = template.queryForList(GET_GENOMIC_ALIGN_BLOCK_BY_GENOMIC_ALIGN_BLOCK_ID, new Object[]{map.get("genomic_align_block_id"), query});
//                for(Map map_two: align_blocks){
//                    map.put("align_block", map_two);
//                }
                map.put("child", align_blocks);

                aligns.add(map);
            }
            return aligns;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getGenomicAlign no result found");

        }
    }

    public JSONArray getGenomicAlignGraph(int query, long start, long end) throws IOException {
        try {
            JSONArray trackList = new JSONArray();
            long from = start;
            long to = 0;
            int no_of_tracks = 0;//template.queryForObject(COUNT_GENOMIC_ALIGN_BY_DNAFRAG_ID, new Object[]{query, start, end, start, end, start, end, start, end}, int.class);
                for (int i = 1; i <= 200; i++) {
                    log.info("i "+i+" "+from+" "+to);
                    JSONObject eachTrack = new JSONObject();
                    to = start + (i * (end - start) / 200);
                    no_of_tracks = template.queryForObject(COUNT_GENOMIC_ALIGN_BY_DNAFRAG_ID, new Object[]{query, from, to}, Integer.class);
                    eachTrack.put("start", from);
                    eachTrack.put("end", to);
                    eachTrack.put("graph", no_of_tracks);
                    eachTrack.put("id", query);
                    trackList.add(eachTrack);
                    from = to;
                }
            return trackList;

        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" countGenomicAlign no result found");

        }
    }

    public JSONArray getAllMember(String query, long start, long end) throws IOException {
        try {
            JSONArray members =  new JSONArray();
            log.info("\n\ngetallmember query "+query);
            List<Map<String, Object>> maps = template.queryForList(GET_MEMBER_BY_CHROMOSOME_NAME, new Object[]{query,start, end, start, end, start, end, start, end});
            log.info("\n\n\nmaps size\t"+maps.size());

            for(Map map: maps){
                JSONArray homologouses = new JSONArray();

                log.info("\n\nid"+map.toString());
                List<Map<String, Object>> homology_member_id = template.queryForList(GET_HOMOLOGY_ID_BY_MEMBER_ID, new Object[]{map.get("id")});
                log.info("\n\nhomology_member_id size\t"+homology_member_id.size());
                for( Map map_two: homology_member_id){
                    log.info("map_two"+map_two.toString());
                    int member = template.queryForInt(GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_MEMBER_ID, new Object[]{map_two.get("homology_id"), map.get("id")});
                    Map<String, Object> homologous = template.queryForMap(GET_MEMBER_BY_MEMBER_ID, new Object[]{member});
                    homologous.put("ref_id",getDnafragId(homologous.get("chr_name").toString(),Integer.parseInt(homologous.get("genome_db_id").toString())));
                    homologous.put("length",getReferenceLength(Integer.parseInt(homologous.get("ref_id").toString())));
                    homologouses.add(homologous);
                }
                map.put("ref_id",getDnafragId(map.get("chr_name").toString(),Integer.parseInt(map.get("genome_db_id").toString())));

               if(homologouses.size() > 0){
                   map.put("child", homologouses);
                    members.add(map);}
            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }

}
