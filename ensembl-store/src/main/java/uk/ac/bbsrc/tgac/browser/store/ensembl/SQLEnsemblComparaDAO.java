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
import java.sql.SQLException;
import java.util.*;

/**
 * Created by IntelliJ IDEA.
 * User: thankia
 * Date: 14-Aug-2013
 * Time: 11:10:23
 * To change this template use File | Settings | File Templates.
 */

public class SQLEnsemblComparaDAO implements ComparaStore {
    protected static final Logger log = LoggerFactory.getLogger(SQLEnsemblComparaDAO.class);

    public static final String TABLE = "";
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

    public static final String GET_DNAFRAG_ID_SEARCH = "select dnafrag_id from dnafrag where name = ? and genome_db_id = ?";

    public static final String GET_DNAFRAGS_ID_SEARCH = "select dnafrag_id from dnafrag where name like ? and genome_db_id = ?";

    public static final String GET_DNAFRAG_BY_NAME = "select * from dnafrag where name = ? and genome_db_id = ?";

    public static final String GET_CHR_DNAFRAG_BY_NAME = "select * from dnafrag where name = ? and genome_db_id = ? and coord_system_name like \"%chr%\"";
    public static final String COUNT_CHR_DNAFRAG_BY_NAME = "select count(*) from dnafrag where name = ? and genome_db_id = ? and coord_system_name like \"%chr%\"";

    public static final String GET_GENOME_ID_FROM_DNAFRAG = "select genome_db_id from dnafrag where dnafrag_id = ?";

    public static final String GET_GENOME_NAME_FROM_ID = "select name from genome_db where genome_db_id = ?";

    public static final String GET_GENOMIC_ALIGN_BLOCK_BY_GENOMIC_ALIGN_BLOCK_ID = "select genomic_align_id as id, genomic_align_block_id, dnafrag_id as ref_id, dnafrag_start as start, dnafrag_end as end, dnafrag_strand as strand, cigar_line  from genomic_align where genomic_align_block_id = ? AND dnafrag_id <> ?";

    public static final String GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_MEMBER_ID = "select member_id from homology_member where homology_id = ? AND member_id <> ?";

    public static final String GET_HOMOLOGY_ID_BY_MEMBER_ID = "select homology_id from homology_member where member_id = ?";

    public static final String GET_MEMBER_BY_CHROMOSOME_NAME = "select member_id as id, chr_start as start, chr_end as end, chr_strand as strand, chr_name, genome_db_id from member where chr_name = ? and ((chr_start > ? AND chr_end < ?) OR (chr_start < ? AND chr_end > ?) OR (chr_end > ? AND chr_end < ?) OR (chr_start > ? AND chr_start < ?))";

    public static final String GET_ALL_MEMBER_BY_CHROMOSOME_NAME = "select member_id as id, stable_id, chr_start as start, chr_end as end from member where chr_name = ? and genome_db_id = ?";

    public static final String GET_ALL_MEMBER_BY_CHROMOSOME_NAME_AND_SLICE = "select count(member_id) from member where chr_name = ? and genome_db_id = ? AND chr_start >= ? and chr_end <= ?";

    public static final String GET_MEMBER_BY_MEMBER_ID = "select member_id as id, chr_start as start, chr_end as end, chr_strand as strand, chr_name, genome_db_id, display_label as 'desc', stable_id from member where member_id = ?";


    public static final String GET_CHROMOSOME_BY_GENOME_ID = "select distinct chr_name as name from member where genome_db_id = ?";


    public static final String GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID = "select cigar_line from homology_member where member_id = ? and homology_id = ?";

    public static final String GET_MLSSID_PER_HOMOLOGY = "select count(method_link_species_set_id) from homology where method_link_species_set_id = ?";

    public static final String GET_MLSSID_PER_GENOMIC_ALIGN = "select count(method_link_species_set_id) from genomic_align where method_link_species_set_id = ?";

    public static final String GET_MLSSID_PER_TABLE = "select count(method_link_species_set_id) from homology where method_link_species_set_id = ?";


//    public static final String GET_MLSSID_PER_TABLE = "select count(method_link_species_set_id) from homology where method_link_species_set_id = ?";
//
//    public static final String GET_MLSSID_PER_TABLE = "select count(method_link_species_set_id) from homology where method_link_species_set_id = ?";

    public static final String GET_HOMOLOGY_ID_BY_MLSSI = "select homology_id from homology where method_link_species_set_id = ?";

    public static final String GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_ID = "select * from homology_member where homology_id = ?";

    public static final String GET_MLSSID_FOR_HOMOLOGY = "select method_link_species_set_id from homology where homology_id = ?";

    public static final String GET_GENE_TREE_FOR_REFERENCE = "SELECT m1.stable_id AS Ref, m1.canonical_member_id AS peptide_id, m2.stable_id AS Ref_stable_id, m3.*, gam.cigar_line, gtr.method_link_species_set_id " +
            "FROM member m1 " +
            "JOIN member m2 ON (m1.canonical_member_id = m2.member_id) " +
            "JOIN gene_tree_node gtn1 ON (m2.member_id = gtn1.member_id) " +
            "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
            "JOIN gene_align_member gam USING (gene_align_id) " +
            "JOIN member m3 ON (gam.member_id = m3.member_id) " +
            "WHERE gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" AND  m1.member_id = ?  AND m2.stable_id <> m3.stable_id;";

    public static final String GET_GENE_TREE_REFERENCE = "SELECT m1.stable_id AS Ref, m1.canonical_member_id AS peptide_id, m2.stable_id AS Ref_stable_id, m3.*, gam.cigar_line, gtr.method_link_species_set_id " +
            "FROM member m1 " +
            "JOIN member m2 ON (m1.canonical_member_id = m2.member_id) " +
            "JOIN gene_tree_node gtn1 ON (m2.member_id = gtn1.member_id) " +
            "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
            "JOIN gene_align_member gam USING (gene_align_id) " +
            "JOIN member m3 ON (gam.member_id = m3.member_id) " +
            "WHERE gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" AND  m1.member_id = ? AND m2.stable_id = m3.stable_id;";

    public static final String GET_ROOT_ID_FROM_STABLE_ID = "SELECT gtr.root_id " +
            "FROM member m1 \n" +
            "JOIN member m2 ON (m1.canonical_member_id = m2.member_id) " +
            "JOIN gene_tree_node gtn1 ON (m2.member_id = gtn1.member_id) " +
            "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
            "WHERE gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" AND m1.member_id = ?;";

    public static final String GET_CHILDREN_NODE = "SELECT * FROM gene_tree_node WHERE parent_id = ?;";


    public static final String GET_GENE_MEMBER_ID_FOR_REFERENCE = "SELECT m3.member_id, gtr.root_id,  m3.gene_member_id " +
            "FROM member m1 " +
            "JOIN member m2 ON (m1.canonical_member_id = m2.member_id) " +
            "JOIN gene_tree_node gtn1 ON (m2.member_id = gtn1.member_id) " +
            "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
            "JOIN gene_align_member gam USING (gene_align_id) " +
            "JOIN member m3 ON (gam.member_id = m3.member_id) " +
            "WHERE gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" AND  m1.member_id = ?  AND m2.stable_id <> m3.stable_id;";


    public static final String GET_GENE_NODE_WITH_MEMBER = "SELECT * FROM gene_tree_node WHERE member_id = ? AND root_id = ?;";

    public static final String GET_NODE_INFORMATION = "SELECT * FROM gene_tree_node WHERE node_id = ?;";

    public static final String GET_SEQUENCE_ID = "SELECT sequence_id FROM member where member_id = ?";

    public static final String SEARCH_MEMBER = "SELECT * " +
            "FROM member m1 " +
            "where description like ? OR display_label = ? OR stable_id = ? limit 100";

    public static final String SEQUENCE_FROM_ID = "SELECT sequence from sequence where sequence_id = ?";

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
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomeIDs = template.queryForList(GET_ALL_GENOMES, new Object[]{'%' + query + '%'});
            for (Map map : genomeIDs) {
                genomes.add(map);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllGenomeId no result found");
        }
    }

    public JSONArray getGenomicAlignbyDnafragId(String query) throws IOException {
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomic_align = template.queryForList(GET_GENOMIC_ALIGN_BY_DNAFRAG_ID, new Object[]{query});
            for (Map map : genomic_align) {
                genomes.add(map);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getGenomocAlignbyDnafragId no result found");
        }
    }

    public JSONArray getGenomicAlignblockbyId(String query) throws IOException {
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomic_align = template.queryForList(GET_GENOMIC_ALIGN_BLOCK_BY_ID, new Object[]{query});
            for (Map map : genomic_align) {
                genomes.add(map);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getGenomocAlignblockbyId no result found");
        }
    }

    public JSONArray getAllGenomeIdforReference(int query) throws IOException {
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomeIDs = template.queryForList(GET_ALL_GENOMES_EXCEPT_ONE, new Object[]{query});


            for (Map map : genomeIDs) {
                JSONObject species = new JSONObject();
                JSONArray tracks_list = new JSONArray();
                List<Map<String, Object>> method_link_ids = template.queryForList(GET_METHOD_LINK_SPECIES_SET_BY_GENOME_ID, new Object[]{map.get("genome_db_id").toString()});

                for (Map maps : method_link_ids) {
                    JSONObject track = new JSONObject();
                    track.put("species_set_id", maps.get("species_set_id").toString());

                    if (template.queryForObject(GET_MLSSID_PER_HOMOLOGY, new Object[]{maps.get("method_link_species_set_id")}, Integer.class) > 0) {
                        track.put("method_link_species_set_id", "homology" + maps.get("method_link_species_set_id").toString());
                    } else if (template.queryForObject(GET_MLSSID_PER_GENOMIC_ALIGN, new Object[]{maps.get("method_link_species_set_id")}, Integer.class) > 0) {
                        track.put("method_link_species_set_id", "genomic_align" + maps.get("method_link_species_set_id").toString());
                    } else {
                        track.put("method_link_species_set_id", "else" + maps.get("method_link_species_set_id").toString());
                    }

                    track.put("method_link_id", maps.get("method_link_id").toString());
                    track.put("name", maps.get("name").toString().replaceAll("\\(", "_").replaceAll("\\)", "_").replaceAll("\\.", "_").replaceAll("\\s+", "_"));
                    tracks_list.add(track);
                }
                String name = template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{map.get("genome_db_id").toString()}, String.class);
                species.put("name", name);
                species.put(name, tracks_list);
                genomes.add(species);
            }
            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllGenomeIdforreference no result found");
        }
    }

    public int getReferenceLength(int query) throws IOException {
        try {
            JSONArray genomes = new JSONArray();
            int length = template.queryForObject(GET_REFERENCE_LENGTH, new Object[]{query}, Integer.class);
            return length;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getReferenceLength no result found");
        }
    }

    public String getReferenceName(int query) throws IOException {
        try {
            JSONArray genomes = new JSONArray();
            String name = template.queryForObject(GET_REFERENCE_NAME, new Object[]{query}, String.class);
            return name;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getReferenceName no result found");
        }
    }


    public int getDnafragearchsize(String query, int reference) throws IOException {
        try {
            List<Map<String, Object>> maps = template.queryForList(GET_DNAFRAGS_ID_SEARCH, new Object[]{'%' + query + '%', reference});
            return maps.size();
        } catch (EmptyResultDataAccessException e) {
            return 0;
        }
    }

    public int getDnafragId(String query, int reference) throws IOException {
        try {
            return template.queryForObject(GET_DNAFRAG_ID_SEARCH, new Object[]{query, reference}, Integer.class);
        } catch (EmptyResultDataAccessException e) {
            return 0;
        }
    }

    public int getGenomeIdfromDnafragId(int query) throws IOException {
        try {
            int genome_id = template.queryForObject(GET_GENOME_ID_FROM_DNAFRAG, new Object[]{'%' + query + '%'}, Integer.class);

            return genome_id;

        } catch (EmptyResultDataAccessException e) {
            return 0;
        }
    }

    public String getGenomeNamefromId(int query) throws IOException {
        try {
            String genome_name = template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{query}, String.class);

            return genome_name;

        } catch (EmptyResultDataAccessException e) {
//     return getGOSearch(searchQuery);
//      throw new IOException("result not found");
            return "";
        }
    }

    public JSONArray getAllDnafragByName(String query, int reference) throws IOException {
        try {
            JSONArray dnafrags = new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_DNAFRAG_BY_NAME, new Object[]{'%' + query + '%', reference});
            for (Map map : maps) {
                map.put("genome_db_name", getGenomeNamefromId(reference));
                dnafrags.add(map);
            }
            return dnafrags;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllDnafragByGenomedbId no result found");

        }
    }

    public int countGenomicAlign(int query, long start, long end, String mlssid) throws IOException {
        try {
            int size = template.queryForObject(COUNT_GENOMIC_ALIGN_BY_DNAFRAG_ID, new Object[]{query, mlssid, start, end}, Integer.class);

            return size;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" countGenomicAlign no result found");

        }
    }

    public JSONArray getGenomicAlign(int query, long start, long end, String mlssid) throws IOException {
        try {
            JSONArray aligns = new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_GENOMIC_ALIGN_BLOCK_BY_DNAFRAG_ID, new Object[]{query, mlssid, start, end, start, end, start, end, start, end});
            for (Map map : maps) {
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

    public JSONArray getMember(String query, long start, long end, String trackId) throws IOException {
        try {
            JSONArray members = new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_MEMBER_BY_CHROMOSOME_NAME, new Object[]{query, start, end, start, end, start, end, start, end});

            for (Map map : maps) {
                JSONArray homologouses = new JSONArray();

                List<Map<String, Object>> homology_member_id = template.queryForList(GET_HOMOLOGY_ID_BY_MEMBER_ID, new Object[]{map.get("id")});
                for (Map map_two : homology_member_id) {
                    int member = template.queryForInt(GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_MEMBER_ID, new Object[]{map_two.get("homology_id"), map.get("id")});
                    String mlssi = template.queryForObject(GET_MLSSID_FOR_HOMOLOGY, new Object[]{map_two.get("homology_id")}, String.class);
//                    if(trackId.equalsIgnoreCase(mlssi)){
                    Map<String, Object> homologous = template.queryForMap(GET_MEMBER_BY_MEMBER_ID, new Object[]{member});
                    homologous.put("ref_id", getDnafragId(homologous.get("chr_name").toString(), Integer.parseInt(homologous.get("genome_db_id").toString())));
                    homologous.put("length", getReferenceLength(Integer.parseInt(homologous.get("ref_id").toString())));
                    homologous.put("cigarline1", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{map.get("id"), map_two.get("homology_id")}, String.class));
                    homologous.put("cigarline2", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{member, map_two.get("homology_id")}, String.class));
                    homologous.put("mlssi", mlssi);
                    homologouses.add(homologous);
//                    }
                }
                map.put("ref_id", getDnafragId(map.get("chr_name").toString(), Integer.parseInt(map.get("genome_db_id").toString())));

                if (homologouses.size() > 0) {
                    map.put("child", homologouses);
                    members.add(map);
                }
            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }

    public JSONArray getHomologybyMLSSI(String query, long start, long end, String mlssi) throws IOException {
        try {
            JSONArray members = new JSONArray();
            Map<String, Object> test = null;
            List<Map<String, Object>> maps = template.queryForList(GET_HOMOLOGY_ID_BY_MLSSI, new Object[]{mlssi});

            for (Map map : maps) {
                JSONArray homologouses = new JSONArray();
                List<Map<String, Object>> homology_members = template.queryForList(GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_ID, new Object[]{map.get("homology_id")});

                for (Map map_two : homology_members) {
                    int member = Integer.parseInt(map_two.get("member_id").toString());
                    Map<String, Object> homologous = template.queryForMap(GET_MEMBER_BY_MEMBER_ID, new Object[]{member});
                    if (!homologous.get("chr_name").toString().equalsIgnoreCase(query)) {
                        homologous.put("ref_id", getDnafragId(homologous.get("chr_name").toString(), Integer.parseInt(homologous.get("genome_db_id").toString())));
                        homologous.put("length", getReferenceLength(Integer.parseInt(homologous.get("ref_id").toString())));
                        homologous.put("cigarline2", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{member, map_two.get("homology_id")}, String.class));
                        homologouses.add(homologous);
                    }
                    if (homologous.get("chr_name").toString().equalsIgnoreCase(query)) {
                        homologous.put("cigarline1", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{homologous.get("id"), map_two.get("homology_id")}, String.class));
                        test = map;
                        test.put("ref_id", getDnafragId(homologous.get("chr_name").toString(), Integer.parseInt(homologous.get("genome_db_id").toString())));
                    }
                }

                if (homologouses.size() > 0) {
                    test.put("child", homologouses);
                    members.add(test);
                }
            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }


    public JSONObject getRefDetail(String query) throws IOException {


        JSONObject homology_members = new JSONObject();

        Map<String, Object> homologous = template.queryForMap(GET_GENE_TREE_REFERENCE, new Object[]{query});

        homology_members.put("cigarline", homologous.get("cigar_line"));

        homology_members.put("genome", homologous.get("genome_db_id"));
        homology_members.put("method", homologous.get("method_link_species_set_id"));
        homology_members.put("genome_name", template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{homologous.get("genome_db_id")}, String.class));
        homology_members.put("genes", getGenefromCore(homologous.get("stable_id").toString(), homologous.get("genome_db_id").toString(), homologous.get("gene_member_id").toString()));
        String sequence_id = template.queryForObject(GET_SEQUENCE_ID, new Object[]{homologous.get("peptide_id")}, String.class);
        homology_members.put("seq", template.queryForObject(SEQUENCE_FROM_ID, new Object[]{sequence_id}, String.class));
        return homology_members;

    }

    public JSONArray getHomologyforMember(String query) throws IOException {

        JSONArray homologouses = new JSONArray();
        JSONObject homology_members = new JSONObject();
        List<Map<String, Object>> homology_member_id = template.queryForList(GET_HOMOLOGY_ID_BY_MEMBER_ID, new Object[]{query});

        for (Map map_two : homology_member_id) {
            int member = template.queryForInt(GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_MEMBER_ID, new Object[]{map_two.get("homology_id"), query});
            Map<String, Object> homologous = template.queryForMap(GET_MEMBER_BY_MEMBER_ID, new Object[]{member});

            homology_members.put("cigarline1", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{query, map_two.get("homology_id")}, String.class));
            homology_members.put("cigarline2", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{member, map_two.get("homology_id")}, String.class));
            homology_members.put("genome", homologous.get("genome_db_id"));
            homology_members.put("genome_name", template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{homologous.get("genome_db_id")}, String.class));
            homology_members.put("genes", getGenefromCore(homologous.get("stable_id").toString(), homologous.get("genome_db_id").toString(), homologous.get("gene_member_id").toString()));
            homologouses.add(homology_members);
        }

        return homologouses;

    }

    public JSONArray getAllMember(String query, String genome_db) throws IOException {
        try {
            JSONArray members = new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_ALL_MEMBER_BY_CHROMOSOME_NAME, new Object[]{query, genome_db});

            for (Map map : maps) {

                members.add(map);
            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }

    public JSONArray getOverviewAllMember(String query, String genome_db) throws IOException {
        try {
            JSONArray members = new JSONArray();
            Map<String, Object> maps_2 = template.queryForMap(GET_CHR_DNAFRAG_BY_NAME, new Object[]{query, genome_db});
            int length = Integer.parseInt(maps_2.get("length").toString());
            int start = 0;
            int end = length;
            int from = start;
            int to = 0;
            if (length > 0) {
                for (int i = 1; i <= 200; i++) {
                    JSONObject eachTrack = new JSONObject();
                    to = (i * Math.round(length / 200));
                    int no_of_tracks = template.queryForObject(GET_ALL_MEMBER_BY_CHROMOSOME_NAME_AND_SLICE, new Object[]{query, genome_db, from, to}, Integer.class);
                    eachTrack.put("start", from);
                    eachTrack.put("end", to);
                    eachTrack.put("graph", no_of_tracks);

                    members.add(eachTrack);
                    from = to;
                }
            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }


    public JSONArray getAllChromosome(String query) throws IOException {
        try {
            JSONArray members = new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_CHROMOSOME_BY_GENOME_ID, new Object[]{query});

            for (Map map : maps) {

                if (template.queryForObject(COUNT_CHR_DNAFRAG_BY_NAME, new Object[]{map.get("name").toString(), query}, Integer.class) > 0) {
                    Map<String, Object> maps_2 = template.queryForMap(GET_CHR_DNAFRAG_BY_NAME, new Object[]{map.get("name").toString(), query});
                    map.put("length", maps_2.get("length"));
                    map.put("id", maps_2.get("dnafrag_id"));

                    members.add(map);
                }

            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }

    public int getChromosomeLength(String chr_name, String genome_id) throws IOException {
        try {
            int length = 0;
            Map<String, Object> maps_2 = template.queryForMap(GET_DNAFRAG_BY_NAME, new Object[]{chr_name, genome_id});
            length = Integer.parseInt(maps_2.get("length").toString());

            return length;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }


    public JSONObject getGenefromCore(String query, String genome, String member_id) throws IOException {
        try {
            JSONObject gene = new JSONObject();

            gene.put("gene", SQLSequenceDAO.getGenebyStableid(query, genome, member_id));
            return gene;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new IOException("Gene from core not found: " + e.getMessage());
        }
    }

    public JSONArray getGeneTreeforMember(String query) throws IOException {

        JSONArray homologouses = new JSONArray();
        JSONObject homology_members = new JSONObject();
        List<Map<String, Object>> homology_member_id = template.queryForList(GET_GENE_TREE_FOR_REFERENCE, new Object[]{query});

        for (Map map_two : homology_member_id) {
            homology_members.put("cigarline", map_two.get("cigar_line"));
            homology_members.put("genome", map_two.get("genome_db_id"));
            homology_members.put("method", map_two.get("method_link_species_set_id"));
            homology_members.put("stable_id", map_two.get("stable_id").toString());
            homology_members.put("genome_name", template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{map_two.get("genome_db_id")}, String.class));
            homology_members.put("genes", getGenefromCore(map_two.get("stable_id").toString(), map_two.get("genome_db_id").toString(), map_two.get("gene_member_id").toString()));
            String sequence_id = map_two.get("sequence_id").toString();
            homology_members.put("seq", template.queryForObject(SEQUENCE_FROM_ID, new Object[]{sequence_id}, String.class));
            homologouses.add(homology_members);
        }

        return homologouses;

    }

    public JSONObject getGeneTree(String query) throws IOException {
        log.info("\n\n\ngetgenetree " + query);
        JSONObject homology_members = new JSONObject();
        List<Map<String, Object>> root_id = template.queryForList(GET_GENE_MEMBER_ID_FOR_REFERENCE, new Object[]{query});
        List<List<Integer>> trees = new ArrayList<List<Integer>>();
        for (Map map_two : root_id) {
            List<Integer> homologouses = new ArrayList<Integer>();
            Map<String, Object> children_node = template.queryForMap(GET_GENE_NODE_WITH_MEMBER, new Object[]{map_two.get("member_id"), map_two.get("root_id")});

            homologouses.add(Integer.parseInt(children_node.get("node_id").toString()));
            if (!children_node.get("root_id").toString().equals(children_node.get("node_id").toString())) {
                recursive_children_node(children_node.get("node_id").toString(), children_node.get("root_id").toString(), homologouses);
                trees.add(homologouses);
            }
            Collections.reverse(homologouses);
            homology_members.put(map_two.get("gene_member_id"), homologouses);
        }
        log.info("afgert " + trees);

        trees = sortListByValue(trees);

        log.info("afgert " + trees);



        log.info("afgert after  " + trees);



        return homology_members;

    }

    public JSONArray recursive_children_node(String node_id, String root_id, List<Integer> homologouses) throws IOException {
        log.info("\n\n\nrecursive_children_node " + node_id);

        JSONArray homologouses_temp = new JSONArray();
        JSONObject homology_members = new JSONObject();

        JSONObject node = new JSONObject();

        List<Map<String, Object>> children_node = template.queryForList(GET_NODE_INFORMATION, new Object[]{node_id});

        for (Map map_two : children_node) {
            if (!map_two.get("parent_id").toString().equals(root_id)) {
                homologouses.add(Integer.parseInt(map_two.get("parent_id").toString()));
                homologouses_temp.addAll(recursive_children_node(map_two.get("parent_id").toString(), root_id, homologouses));
            }
        }
        log.info("\n\n\tarray " + homologouses);
        log.info("\n\n\tarray " + homologouses_temp);

        return homologouses_temp;
    }

    public static List<List<Integer>> sortListByValue(List<List<Integer>> list) {

        Collections.sort(list, new Comparator<List<Integer>>() {


            @Override
            public int compare(List<Integer> o1, List<Integer> o2) {
                //return Integer.compare(o1.size(), o2.size()); //JDK7

                //Use this if you're using a version prior to 1.7.
                return Integer.valueOf(o1.size()).compareTo(o2.size());
            }
        });

        return list;
    }


//    public JSONObject children_node(String parent_id, String root_id) throws IOException {
//        log.info("\n\n\nrecursive_children_node "+parent_id);
//
//        JSONArray homologouses = new JSONArray();
//        JSONObject homology_members = new JSONObject();
//
//        List<Map<String, Object>> children_node = template.queryForList(GET_GENE_NODE_WITH_MEMBER, new Object[]{parent_id, root_id});
//
//        for (Map map_two : children_node) {
//            homologouses.addAll(recursive_children_node(map_two.get("parent_id").toString(), root_id));
//        }
//
//        homology_members.put("child", homologouses);
//
//        return homologouses;
//
//    }

    public JSONArray searchMember(String query) throws IOException {

        JSONArray homologouses = new JSONArray();
        JSONObject homology_members = new JSONObject();
        List<Map<String, Object>> homology_member_id = template.queryForList(SEARCH_MEMBER, new Object[]{"%" + query + "%", "%" + query + "%", "%" + query + "%"});

        for (Map map_two : homology_member_id) {
            homologouses.add(map_two);
        }

        return homologouses;

    }

}
