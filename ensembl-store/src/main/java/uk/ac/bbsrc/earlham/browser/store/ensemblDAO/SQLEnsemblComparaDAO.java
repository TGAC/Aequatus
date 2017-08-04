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


import com.googlecode.ehcache.annotations.Cacheable;
import com.googlecode.ehcache.annotations.KeyGenerator;
import com.googlecode.ehcache.annotations.Property;
import net.sf.ehcache.CacheManager;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import uk.ac.bbsrc.earlham.browser.core.store.ComparaStore;

import java.io.IOException;
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

    private static String genome_ids = "(";

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

    public static final String GET_DNAFRAG_BY_ID = "select * from dnafrag where dnafrag_id = ? and genome_db_id = ?";

    public static final String GET_CHR_DNAFRAG_BY_NAME = "select * from dnafrag where dnafrag_id = ? and genome_db_id = ? and coord_system_name like \"%chr%\"";

    public static final String COUNT_CHR_DNAFRAG_BY_NAME = "select count(*) from dnafrag where dnafrag_id = ? and genome_db_id = ? and coord_system_name like \"%chr%\"";

    public static final String COUNT_GENE_MEMBER_FOR_DNAFRAG = "select count(*) from gene_member where dnafrag_id = ?;";

    public static final String GET_GENOME_ID_FROM_DNAFRAG = "select genome_db_id from dnafrag where dnafrag_id = ?";

    public static final String GET_GENOME_NAME_FROM_ID = "select name from genome_db where genome_db_id = ?";

    public static final String GET_GENOME_ID_FROM_NAME = "select genome_db_id from genome_db where name = ?";
    public static final String GET_GENOME_NAME_FROM_TAXON_ID = "select name from genome_db where taxon_id = ?";
    public static final String GET_GENOMIC_ALIGN_BLOCK_BY_GENOMIC_ALIGN_BLOCK_ID = "select genomic_align_id as id, genomic_align_block_id, dnafrag_id as ref_id, dnafrag_start as start, dnafrag_end as end, dnafrag_strand as strand, cigar_line  from genomic_align where genomic_align_block_id = ? AND dnafrag_id <> ?";

    public static final String GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_MEMBER_ID = "select gene_member_id from homology_member where homology_id = ? AND gene_member_id <> ?";

    public static final String GET_HOMOLOGY_ID_BY_MEMBER_ID = "select homology_id from homology_member where member_id = ?";

    public static final String GET_MEMBER_BY_CHROMOSOME_NAME = "select gene_member_id as id, dnafrag_start as start, dnafrag_end as end, dnafrag_strand as strand, dnafrag_id, genome_db_id from gene_member where dnafrag_id = ? and ((dnafrag_start > ? AND dnafrag_end < ?) OR (dnafrag_start < ? AND dnafrag_end > ?) OR (dnafrag_end > ? AND dnafrag_end < ?) OR (dnafrag_start > ? AND dnafrag_start < ?))";

    public static final String GET_ALL_MEMBER_BY_CHROMOSOME_NAME = "select s.seq_member_id, g.gene_member_id as id, g.stable_id, g.dnafrag_start as start, g.dnafrag_end as end from gene_member g, seq_member s where g.gene_member_id = s.gene_member_id and g.genome_db_id = ? and g.dnafrag_id = ?";

    public static final String GET_ALL_MEMBER_BY_CHROMOSOME_NAME_AND_SLICE = "select count(gene_member_id) from gene_member where genome_db_id = ? AND dnafrag_id = ? and dnafrag_start >= ? and dnafrag_end <= ?";

    public static final String GET_MEMBER_BY_MEMBER_ID = "select gene_member_id as id, dnafrag_start as start, dnafrag_end as end, dnafrag_strand as strand, dnafrag_id, genome_db_id, display_label as 'desc', stable_id from gene_member where gene_member_id = ?";


    public static final String GET_CHROMOSOME_BY_GENOME_ID = "select *  from dnafrag where genome_db_id = ? and coord_system_name like '%chr%'";


    public static final String GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID = "select cigar_line from homology_member where member_id = ? and homology_id = ?";

    public static final String GET_MLSSID_PER_HOMOLOGY = "select count(method_link_species_set_id) from homology where method_link_species_set_id = ?";

    public static final String GET_MLSSID_PER_GENOMIC_ALIGN = "select count(method_link_species_set_id) from genomic_align where method_link_species_set_id = ?";

    public static final String GET_MLSSID_PER_TABLE = "select count(method_link_species_set_id) from homology where method_link_species_set_id = ?";


    public static final String GET_HOMOLOGY_ID_BY_MLSSI = "select homology_id from homology where method_link_species_set_id = ?";

    public static final String GET_HOMOLOGY_MEMBER_BY_HOMOLOGY_ID = "select * from homology_member where homology_id = ?";

    public static final String GET_MLSSID_FOR_HOMOLOGY = "select method_link_species_set_id from homology where homology_id = ?";


    public static final String GET_GENE_MEMBER_ID_FROM_STABLE_ID = "select gene_member_id from gene_member where stable_id = ?";
    public static final String GET_Referece_ID_FROM_STABLE_ID = "select genome_db_id from seq_member where stable_id = ?";
    public static final String GET_dnafrag_ID_FROM_STABLE_ID = "select dnafrag_id from seq_member where stable_id = ?";
    public static final String GET_STABLE_ID_FROM_SEQ_MEMBER_ID = "select stable_id from seq_member where seq_member_id = ?";
    public static final String GET_SOURCE_FROM_SEQ_MEMBER_ID = "select source_name from seq_member where seq_member_id = ?";
    public static final String GET_TAXON_FROM_SEQ_MEMBER_ID = "select taxon_id from seq_member where seq_member_id = ?";
    public static final String GET_dnafrag_Name_FROM_ID = "select name from dnafrag where dnafrag_id = ?";
    public static final String GET_GENE_LABEL_WITH_MEMBER = "select display_label from seq_member where seq_member_id = ?";
    public static final String GET_GENE_MEMBER_ID_FROM_SEQ_MEMBER_ID = "select gene_member_id from seq_member where seq_member_id = ?";
    public static final String GET_SEQ_MEMBER_ID_FROM_GENE_MEMBER_ID = "select s.seq_member_id from gene_member g, seq_member s where s.gene_member_id = ? and s.gene_member_id = g.gene_member_id and s.seq_member_id = g.canonical_member_id";
    public static final String GET_CANONICAL_MEMBER_ID_FROM_GENE_MEMBER_ID = "select canonical_member_id from gene_member where gene_member_id = ?";
    public static final String GET_STABLE_ID_FROM_GENE_MEMBER_ID = "select stable_id from gene_member where gene_member_id = ?";
    public static final String GET_SOURCE_FROM_GENE_MEMBER_ID = "select source_name from gene_member where gene_member_id = ?";

    public static final String GET_CIGAR_LINE = "select cigar_line from gene_align_member where seq_member_id = ? and gene_align_id = ?";

    public static final String GET_GENOME_NAME_FROM_SEQ_MEMBER_ID = "select name from genome_db where genome_db_id in (select genome_db_id from seq_member where seq_member_id = ?)";

    public static final String GET_PAIRWISE_ALIGNMENT = "select hm1.cigar_line as ref, hm2.cigar_line as hit from homology_member hm1, homology_member hm2 where hm1.seq_member_id = ? and hm2.seq_member_id = ? and  hm1.homology_id = hm2.homology_id;";

    public static final String IS_PAIRWISE_ALIGNMENT =  "select count(*) from homology_member hm1, homology_member hm2 where hm1.seq_member_id = ? and hm2.seq_member_id = ? and  hm1.homology_id = hm2.homology_id;";
    public static final String GET_SEQ_MEMBER_ID_FROM_STABLE_ID = "select seq_member_id from seq_member where stable_id = ?";

    public static final String GET_GENE_STABLE_ID_FROM_GENE_MEMBER_ID = "select stable_id from gene_member where gene_member_id = ?";
    public static final String GET_GENE_TREE_REFERENCE = "select m1.stable_id AS Ref, m1.canonical_member_id AS peptide_id, m2.stable_id AS Ref_stable_id, m3.*, gam.cigar_line, gtr.method_link_species_set_id, m4.gene_member_id,  m4.display_label as 'desc'   " +
            "from gene_member m1 " +
            "JOIN seq_member m2 ON (m1.canonical_member_id = m2.seq_member_id) " +
            "JOIN gene_tree_node gtn1 ON (m2.seq_member_id = gtn1.seq_member_id) " +
            "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
            "JOIN gene_align_member gam USING (gene_align_id) " +
            "JOIN seq_member m3 ON (gam.seq_member_id = m3.seq_member_id) " +
            "JOIN gene_member m4 on (m4.canonical_member_id = m3.seq_member_id) " +
            "WHERE gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" " +
            "AND  m1.gene_member_id = ? " +
            "AND m2.stable_id = m3.stable_id";

    public static final String GET_ROOT_ID_FROM_STABLE_ID = "SELECT gtr.root_id " +
            "FROM member m1 \n" +
            "JOIN member m2 ON (m1.canonical_member_id = m2.member_id) " +
            "JOIN gene_tree_node gtn1 ON (m2.member_id = gtn1.member_id) " +
            "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
            "WHERE gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" AND m1.member_id = ?;";

    public static final String GET_CHILDREN_NODE = "SELECT * FROM gene_tree_node WHERE parent_id = ?;";


    public static final String GET_GENE_NODE_WITH_MEMBER = "SELECT * FROM gene_tree_node WHERE seq_member_id = ? AND root_id = ?;";

    public static final String GET_NODE_INFORMATION = "SELECT * FROM gene_tree_node LEFT JOIN gene_tree_node_attr USING (node_id) WHERE node_id = ?;";

    public static final String GET_MEMBER_ID_FROM_NODE = "SELECT member_id FROM gene_tree_node WHERE node_id = ?;";

    public static final String GET_GENOME_ID_FROM_MEMBER_ID = "SELECT m.genome_db_id FROM gene_tree_node gtn, member m WHERE gtn.node_id = ? AND gtn.member_id = m.member_id;";

    public static final String GET_NODE_TYPE = "SELECT node_type from gene_tree_node_attr where node_id = ?";

    public static final String GET_SEQUENCE_ID = "SELECT sequence_id FROM seq_member where seq_member_id = ?";

    public static final String GET_SEQUENCE = "SELECT sequence FROM sequence where sequence_id = ?";
    //
    public static final String GET_MEMBER_FROM_ID = "SELECT * FROM gene_member where gene_member_id = ?";


    public static final String SEQUENCE_FROM_ID = "SELECT sequence from sequence where sequence_id = ?";

    public static final String GET_LOCATION_FOR_GENOME = "select locator from genome_db where genome_db_id = ?";


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

    public JSONArray setAllGenomeId(String query) throws IOException {
        try {
            genome_ids = "(";
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomeIDs = template.queryForList(GET_ALL_GENOMES, new Object[]{'%' + query + '%'});

            int i = 0;
            for (Map map : genomeIDs) {
                if (DatabaseSchemaSelector.createConnection(map.get("name").toString())) {
                    genomes.add(map);
                    if (i == 0) {
                        genome_ids += (map.get("genome_db_id").toString());
                    } else {
                        genome_ids += "," + (map.get("genome_db_id").toString());
                    }
                    i++;
                }
            }

            genome_ids += ")";

            return genomes;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllGenomeId no result found");
        }
    }

    public JSONArray getAllGenomeId(String query) throws IOException {
        try {
            JSONArray genomes = new JSONArray();
            List<Map<String, Object>> genomeIDs = template.queryForList(GET_ALL_GENOMES, new Object[]{'%' + query + '%'});

            for (Map map : genomeIDs) {
                if (DatabaseSchemaSelector.createConnection(map.get("name").toString())) {
                    genomes.add(map);
                }
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
                    Map<String, Object> homologous = template.queryForMap(GET_MEMBER_BY_MEMBER_ID, new Object[]{member});
                    homologous.put("ref_id", getDnafragId(homologous.get("chr_name").toString(), Integer.parseInt(homologous.get("genome_db_id").toString())));
                    homologous.put("length", getReferenceLength(Integer.parseInt(homologous.get("ref_id").toString())));
                    homologous.put("cigarline1", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{map.get("id"), map_two.get("homology_id")}, String.class));
                    homologous.put("cigarline2", template.queryForObject(GET_HOMOLOGY_MEMBER_CIGAR_BY_MEMBER_ID, new Object[]{member, map_two.get("homology_id")}, String.class));
                    homologous.put("mlssi", mlssi);
                    homologouses.add(homologous);
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


    public String getRefStableID(String query) throws Exception {

        return template.queryForObject(GET_STABLE_ID_FROM_GENE_MEMBER_ID, new Object[]{query}, String.class);

    }


    public int getGeneMemberIDfromStableID(String query) throws Exception {
        int gene_member_id = template.queryForInt(GET_GENE_MEMBER_ID_FROM_STABLE_ID, new Object[]{query});
        return gene_member_id;
    }

    public int getSeqMemberIDfromGeneMemberID(int gene_member_id) throws Exception {
        int seq_member_id = template.queryForInt(GET_SEQ_MEMBER_ID_FROM_GENE_MEMBER_ID, new Object[]{gene_member_id});
        return seq_member_id;
    }

    public String getSeqStableIDfromSeqMemberID(int seq_member_id) throws Exception {
        String Stable_ID = template.queryForObject(GET_STABLE_ID_FROM_SEQ_MEMBER_ID, new Object[]{seq_member_id}, String.class);
        return Stable_ID;
    }

    public String getRefPtnStableID(String query) throws Exception {
        String canonical_id = template.queryForObject(GET_CANONICAL_MEMBER_ID_FROM_GENE_MEMBER_ID, new Object[]{query}, String.class);
        return template.queryForObject(GET_STABLE_ID_FROM_SEQ_MEMBER_ID, new Object[]{canonical_id}, String.class);
    }

    public JSONObject getPairwiseAlignment(int ref, int query) throws Exception{
        JSONObject alignment = new JSONObject();

        Map<String, Object> pairwise_alignemnt = template.queryForMap(GET_PAIRWISE_ALIGNMENT, new Object[]{ref, query});
        alignment.put("ref", pairwise_alignemnt.get("ref"));
        alignment.put("hit", pairwise_alignemnt.get("hit"));
        return alignment;
    }

    public int getSeqMemberIDfromStableID(String stableID) throws Exception{
        int gene_member_id;

        gene_member_id = template.queryForInt(GET_SEQ_MEMBER_ID_FROM_STABLE_ID, new Object[]{stableID});

        return gene_member_id;

    }

    public String getSeq(int seq_member_id)  throws Exception{
        String sequence;

        String sequence_id = template.queryForObject(GET_SEQUENCE_ID, new Object[]{seq_member_id}, String.class);

        sequence = template.queryForObject(GET_SEQUENCE, new Object[]{sequence_id}, String.class);

        return sequence;
    }

    public String getGeneStableIDfromGeneMemberID(int gene_member_id) throws Exception{
        return template.queryForObject(GET_GENE_STABLE_ID_FROM_GENE_MEMBER_ID, new Object[]{gene_member_id}, String.class);
    }

    public int getGeneMemberIDfromSeqMemberID(int seq_member_id) throws Exception {
        return template.queryForInt(GET_GENE_MEMBER_ID_FROM_SEQ_MEMBER_ID, new Object[]{seq_member_id});
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
            homology_members.put("dnafrag", homologous.get("dnafrag_id"));

            JSONObject gene = getGenefromCore(homologous.get("stable_id").toString(), homologous.get("genome_db_id").toString(), homologous.get("seq_member_id").toString(), homologous.get("genome_db_id").toString(), homologous.get("desc").toString());
            homology_members.put("genes", gene);
            if (gene.getJSONObject("gene").containsKey("gene_id")) {
                homologouses.add(homology_members);
            }
        }

        return homologouses;

    }

    public JSONArray getAllMember(int query, int genome_db) throws IOException {
        try {
            JSONArray members = new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_ALL_MEMBER_BY_CHROMOSOME_NAME, new Object[]{genome_db, query});

            for (Map map : maps) {

                members.add(map);
            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }

    public JSONArray getOverviewAllMember(int query, int genome_db) throws IOException {
        try {
            JSONArray members = new JSONArray();
            Map<String, Object> maps_2 = null;
            int count = template.queryForInt(COUNT_CHR_DNAFRAG_BY_NAME, new Object[]{query, genome_db});
            if (count > 0) {
                maps_2 = template.queryForMap(GET_CHR_DNAFRAG_BY_NAME, new Object[]{query, genome_db});
            } else {
                maps_2 = template.queryForMap(GET_DNAFRAG_BY_ID, new Object[]{query, genome_db});

            }
            int length = Integer.parseInt(maps_2.get("length").toString());
            int start = 0;
            int end = length;
            int from = start;
            int to = 0;

            int count_member = template.queryForInt(COUNT_GENE_MEMBER_FOR_DNAFRAG, new Object[]{query});


            if (length > 0 && count_member > 1000) {
                for (int i = 1; i <= 200; i++) {
                    JSONObject eachTrack = new JSONObject();
                    to = (i * Math.round(length / 200));
                    int no_of_tracks = template.queryForObject(GET_ALL_MEMBER_BY_CHROMOSOME_NAME_AND_SLICE, new Object[]{genome_db, query, from, to}, Integer.class);
                    eachTrack.put("start", from);
                    eachTrack.put("end", to);
                    eachTrack.put("graph", no_of_tracks);

                    members.add(eachTrack);
                    from = to;
                }
            } else {
                List<Map<String, Object>> maps = template.queryForList(GET_ALL_MEMBER_BY_CHROMOSOME_NAME, new Object[]{genome_db, query});
                for (Map map : maps) {
                    map.put("graph", 1);
                    members.add(map);
                }


            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getOverviewAllMember no result found");

        }
    }


    public JSONArray getAllChromosome(int query) throws IOException {
        try {
            JSONArray members = new JSONArray();
            List<Map<String, Object>> maps = template.queryForList(GET_CHROMOSOME_BY_GENOME_ID, new Object[]{query});


            for (Map map : maps) {
                map.put("length", map.get("length"));
                map.put("id", map.get("dnafrag_id"));
                map.put("chr_name", map.get("name"));
                members.add(map);
            }
            return members;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }

    public int getChromosomeLength(int chr_id, int genome_id) throws IOException {
        try {
            int length = 0;
            Map<String, Object> maps_2 = template.queryForMap(GET_DNAFRAG_BY_ID, new Object[]{chr_id, genome_id});
            length = Integer.parseInt(maps_2.get("length").toString());

            return length;
        } catch (EmptyResultDataAccessException e) {
            throw new IOException(" getAllMember no result found");

        }
    }

    public JSONObject getGenefromCore(String query, String genome, String member_id, String gene_stable_id, String desc) throws IOException {
        try {

            genome = template.queryForObject(GET_GENOME_NAME_FROM_ID, new Object[]{genome}, String.class);

            JSONObject gene = SQLSequenceDAO.getGenebyStableid(query, genome, member_id, gene_stable_id);

            gene.put("display_name", desc);
            gene.put("species", genome);
            return gene;
        } catch (Exception e) {
            e.printStackTrace();
            throw new IOException("Gene from core not found: " + e.getMessage());
        }
    }

    @Cacheable(cacheName = "getGeneTreeforMemberCache",
            keyGenerator = @KeyGenerator(
                    name = "HashCodeCacheKeyGenerator",
                    properties = {
                            @Property(name = "includeMethod", value = "false"),
                            @Property(name = "includeParameterTypes", value = "false")
                    }
            )
    )

    public JSONObject getGeneTreeforMember(String query) throws IOException {

        JSONObject member = new JSONObject();

        final String GET_GENE_TREE_FOR_REFERENCE = "select m1.stable_id AS Ref, m1.canonical_member_id AS peptide_id, m2.stable_id AS Ref_stable_id, m3.*, gam.cigar_line, gtr.method_link_species_set_id, m4.gene_member_id, m4.display_label as 'desc'  " +
                "from gene_member m1 " +
                "JOIN seq_member m2 ON (m1.canonical_member_id = m2.seq_member_id) " +
                "JOIN gene_tree_node gtn1 ON (m2.seq_member_id = gtn1.seq_member_id) " +
                "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
                "JOIN gene_align_member gam USING (gene_align_id) " +
                "JOIN seq_member m3 ON (gam.seq_member_id = m3.seq_member_id) " +
                "JOIN gene_member m4 on (m4.canonical_member_id = m3.seq_member_id) " +
                "WHERE m1.gene_member_id = ? AND m3.genome_db_id in " + genome_ids + " and gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" ";

        List<Map<String, Object>> homology_member_id = template.queryForList(GET_GENE_TREE_FOR_REFERENCE, new Object[]{query});

        for (Map map_two : homology_member_id) {
            if (map_two.get("desc") == null) {
                map_two.put("desc", "");
            }
            String gene_member_id = template.queryForObject(GET_GENE_MEMBER_ID_FROM_SEQ_MEMBER_ID, new Object[]{map_two.get("seq_member_id")}, String.class);
            String gene_stable_id = template.queryForObject(GET_STABLE_ID_FROM_GENE_MEMBER_ID, new Object[]{gene_member_id}, String.class);
            member.put(gene_stable_id, getGenefromCore(map_two.get("stable_id").toString(), map_two.get("genome_db_id").toString(), map_two.get("seq_member_id").toString(), gene_stable_id, map_two.get("desc").toString()));

        }

        return member;

    }

    public Long[] getOrthologsforMember(String query) throws IOException {


        List<Long> members = new ArrayList<>();

        final String GET_GENE_TREE_FOR_REFERENCE = "select m1.stable_id AS Ref, m1.canonical_member_id AS peptide_id, m2.stable_id AS Ref_stable_id, m3.*, gam.cigar_line, gtr.method_link_species_set_id, m4.gene_member_id, m4.display_label as 'desc'  " +
                "from gene_member m1 " +
                "JOIN seq_member m2 ON (m1.canonical_member_id = m2.seq_member_id) " +
                "JOIN gene_tree_node gtn1 ON (m2.seq_member_id = gtn1.seq_member_id) " +
                "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
                "JOIN gene_align_member gam USING (gene_align_id) " +
                "JOIN seq_member m3 ON (gam.seq_member_id = m3.seq_member_id) " +
                "JOIN gene_member m4 on (m4.canonical_member_id = m3.seq_member_id) " +
                "WHERE m1.gene_member_id = ? AND m3.genome_db_id in " + genome_ids + " and gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" ";

        List<Map<String, Object>> homology_member_id = template.queryForList(GET_GENE_TREE_FOR_REFERENCE, new Object[]{query});

        for (Map map_two : homology_member_id) {

            members.add((Long) map_two.get("seq_member_id"));
        }

        return members.toArray(new Long[members.size()]);

    }

    @Cacheable(cacheName = "countGeneTreeforMemberCache",
            keyGenerator = @KeyGenerator(
                    name = "HashCodeCacheKeyGenerator",
                    properties = {
                            @Property(name = "includeMethod", value = "false"),
                            @Property(name = "includeParameterTypes", value = "false")
                    }
            )
    )

    public int countGeneTreeforMember(String query) throws IOException {
        final String GET_GENE_TREE_FOR_REFERENCE = "select count(m3.seq_member_id) " +
                "from gene_member m1 " +
                "JOIN seq_member m2 ON (m1.canonical_member_id = m2.seq_member_id) " +
                "JOIN gene_align_member gam USING (seq_member_id) " +
                "JOIN gene_tree_root gtr using (gene_align_id) " +
                "JOIN gene_tree_node gtn1 using (root_id) " +
                "JOIN seq_member m3 ON (gtn1.seq_member_id = m3.seq_member_id) " +
                "WHERE m1.gene_member_id = ? AND m3.genome_db_id in " + genome_ids + " and gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" ";

        int homology_member_id = template.queryForInt(GET_GENE_TREE_FOR_REFERENCE, new Object[]{query});

        return homology_member_id;

    }

    public JSONObject getInfoforMember(String query) throws IOException {

        JSONObject gene_info = new JSONObject();
        final String GET_GENE_INFO = "select m1.*, df.* " +
                "from gene_member m1, dnafrag df " +
                "WHERE m1.stable_id = ? AND m1.genome_db_id in " + genome_ids + " and m1.dnafrag_id = df.dnafrag_id;";

        Map<String, Object> geneinfo = template.queryForMap(GET_GENE_INFO, new Object[]{query});
        gene_info.put("info", geneinfo);
        return gene_info;

    }

    public boolean getInfoforOrtholog(int ref, int hit) throws IOException{
        boolean response = false;

        int pairwise_alignemnt = template.queryForInt(IS_PAIRWISE_ALIGNMENT, new Object[]{ref, hit});

        if(pairwise_alignemnt >=1)
        {
            response = true;
        }else{
            response = false;
        }

        return response;

    }

    public JSONObject getGenomeId(String query) throws IOException {

        JSONObject genome_info = new JSONObject();

        String genome_db_id = template.queryForObject(GET_GENOME_ID_FROM_NAME, new Object[]{query}, String.class);
        genome_info.put("ref", genome_db_id);
        return genome_info;

    }


    public JSONObject getChrId(String query, int ref) throws IOException {

        JSONObject chr_info = new JSONObject();

        String chr_id = template.queryForObject(GET_DNAFRAG_ID_SEARCH, new Object[]{query, ref}, String.class);
        chr_info.put("ref", ref);

        chr_info.put("chr", chr_id);
        return chr_info;

    }


    public int getGeneMemberId(String query) throws Exception {
        try {
            int member_id = template.queryForInt(GET_GENE_MEMBER_ID_FROM_STABLE_ID, new Object[]{query});
            return member_id;
        } catch (EmptyResultDataAccessException s) {
            return 0;
        } catch (Exception e) {
            throw new Exception("Search result not found");
        }
    }

    public int getSeqMemberId(String query) throws Exception {
        try {
            int member_id = template.queryForInt(GET_SEQ_MEMBER_ID_FROM_STABLE_ID, new Object[]{query});
            return member_id;
        } catch (EmptyResultDataAccessException s) {
            return 0;
        } catch (Exception e) {
            throw new Exception("Search result not found");
        }
    }

    public String getReferencefromStableId(String query) throws IOException {

        String ref_id = template.queryForObject(GET_Referece_ID_FROM_STABLE_ID, new Object[]{query}, String.class);
        return ref_id;

    }

    public String getDnafragIdfromStableId(String query) throws IOException {

        String dnafrag_id = template.queryForObject(GET_dnafrag_ID_FROM_STABLE_ID, new Object[]{query}, String.class);
        return dnafrag_id;

    }

    public String getDnafragnamefromId(String query) throws IOException {

        String dnafrag_id = template.queryForObject(GET_dnafrag_Name_FROM_ID, new Object[]{query}, String.class);
        return dnafrag_id;

    }

    public Map getGeneTree(String query) throws IOException {
        JSONObject homology_members = new JSONObject();

//        final String GET_GENE_MEMBER_ID_FOR_REFERENCE = "select  m3.seq_member_id, gtr.root_id,  m3.gene_member_id, gam.gene_align_id   " +
//                "from gene_member m1 " +
//                "JOIN seq_member m2 ON (m1.canonical_member_id = m2.seq_member_id) " +
//                "JOIN gene_tree_node gtn1 ON (m2.seq_member_id = gtn1.seq_member_id) " +
//                "JOIN gene_tree_root gtr ON (gtr.root_id = gtn1.root_id) " +
//                "JOIN gene_align_member gam USING (gene_align_id) " +
//                "JOIN seq_member m3 ON (gam.seq_member_id = m3.seq_member_id) " +
//                "JOIN gene_member m4 on (m4.canonical_member_id = m3.seq_member_id) " +
//                "WHERE m1.gene_member_id = ? AND m3.genome_db_id in " + genome_ids + " and gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\" ";

        final String GET_GENE_MEMBER_ID_FOR_REFERENCE = "select  m3.seq_member_id, gtr.root_id,  m3.gene_member_id, gam.gene_align_id " +
                "from gene_member m1" +
                " JOIN seq_member m2 ON (m1.canonical_member_id = m2.seq_member_id)" +
                " JOIN gene_align_member gam USING (seq_member_id)" +
                " JOIN gene_tree_root gtr using (gene_align_id)" +
                " JOIN gene_tree_node gtn1 using (root_id)" +
                " JOIN seq_member m3 ON (gtn1.seq_member_id = m3.seq_member_id)" +
                " WHERE m1.gene_member_id = ? AND m3.genome_db_id in " + genome_ids + " and gtr.clusterset_id = \"default\" AND m1.source_name = \"ENSEMBLGENE\"";
//        gets all intermediate nodes for each gene from root to node
        List<Map<String, Object>> root_id = template.queryForList(GET_GENE_MEMBER_ID_FOR_REFERENCE, new Object[]{query});
        List<List<Map>> trees = new ArrayList<List<Map>>();
        for (Map map_two : root_id) {
            List<Map> homologouses = new ArrayList<Map>();
            Map<String, Object> children_node = template.queryForMap(GET_GENE_NODE_WITH_MEMBER, new Object[]{map_two.get("seq_member_id"), map_two.get("root_id")});
            children_node.put("children", new JSONArray());
            recursive_children_node(children_node.get("node_id").toString(), children_node.get("root_id").toString(), homologouses, map_two.get("gene_align_id").toString());
            trees.add(homologouses);
            Collections.reverse(homologouses);
            homology_members.put(map_two.get("gene_member_id"), homologouses);
        }


        trees = sortListByValue(trees);

        JSONObject test_tree = new JSONObject();
        JSONArray test_array = new JSONArray();

//        takes unique node IDs

        for (int i = 0; i < trees.size(); i++) {
            for (int k = 1; k < trees.get(i).size(); k++) {
                if (!test_array.contains(trees.get(i).get(k))) {
                    test_array.add(trees.get(i).get(k));
                }
            }
        }

        List<JSONObject> tree_list = new ArrayList<JSONObject>();

        for (int i = test_array.size() - 1; i >= 0; i--) {
            JSONObject temp = test_array.getJSONObject(i);

            JSONObject temp2 = new JSONObject();
            String parent = temp.getString("parent_id");
            for (int j = test_array.size() - 1; j >= 0; j--) {
                JSONObject temp3 = test_array.getJSONObject(j);
                String child = temp3.getString("node_id");

                if (parent.equals(child)) {
                    JSONArray temp4 = temp3.getJSONArray("children");
                    temp4.add(temp);
                    test_array.remove(i);
                    break;
                }
            }
        }

        Map<String, Object> super_node = template.queryForMap(GET_NODE_INFORMATION, new Object[]{test_array.getJSONObject(0).get("parent_id")});
        super_node.put("children", test_array);

        return super_node;
    }

    public JSONArray recursive_children_node(String node_id, String root_id, List<Map> homologouses, String gene_align_id) throws IOException {
        JSONArray homologouses_temp = new JSONArray();

        List<Map<String, Object>> children_node = template.queryForList(GET_NODE_INFORMATION, new Object[]{node_id});


        for (Map map_two : children_node) {
            if (map_two.get("seq_member_id") == null) {
                JSONObject event = new JSONObject();
                event.put("type", map_two.get("node_type"));
                map_two.put("events", event);
                map_two.remove("node_type");

            } else {
                JSONObject id = new JSONObject();
                String gene_member_id = template.queryForObject(GET_GENE_MEMBER_ID_FROM_SEQ_MEMBER_ID, new Object[]{map_two.get("seq_member_id")}, String.class);
                id.put("accession", template.queryForObject(GET_STABLE_ID_FROM_GENE_MEMBER_ID, new Object[]{gene_member_id}, String.class));
                id.put("source", template.queryForObject(GET_SOURCE_FROM_GENE_MEMBER_ID, new Object[]{gene_member_id}, String.class));
                map_two.put("id", id);

                JSONObject taxonomy = new JSONObject();
                taxonomy.put("id", template.queryForObject(GET_TAXON_FROM_SEQ_MEMBER_ID, new Object[]{map_two.get("seq_member_id")}, String.class));

                taxonomy.put("scientific_name", template.queryForObject(GET_GENOME_NAME_FROM_SEQ_MEMBER_ID, new Object[]{map_two.get("seq_member_id")}, String.class));

                map_two.put("taxonomy", taxonomy);

                JSONObject sequence = new JSONObject();
                JSONArray seq_id = new JSONArray();
                JSONObject new_seq_id = new JSONObject();

                new_seq_id.put("accession", template.queryForObject(GET_STABLE_ID_FROM_SEQ_MEMBER_ID, new Object[]{map_two.get("seq_member_id")}, String.class));
                new_seq_id.put("source", template.queryForObject(GET_SOURCE_FROM_SEQ_MEMBER_ID, new Object[]{map_two.get("seq_member_id")}, String.class));
                seq_id.add(new_seq_id);
                sequence.put("id", seq_id);


                String sequence_id = template.queryForObject(GET_SEQUENCE_ID, new Object[]{map_two.get("seq_member_id")}, String.class);

                JSONObject mol_seq = new JSONObject();

                mol_seq.put("cigar_line", template.queryForObject(GET_CIGAR_LINE, new Object[]{map_two.get("seq_member_id"), gene_align_id}, String.class));
                mol_seq.put("seq", template.queryForObject(GET_SEQUENCE, new Object[]{sequence_id}, String.class));
                mol_seq.put("is_aligned", 0);

                sequence.put("mol_seq", mol_seq);
                map_two.put("sequence", sequence);


            }
            map_two.put("branch_length", map_two.get("distance_to_parent"));
            map_two.remove("distance_to_parent");


            map_two.put("children", new JSONArray());
            homologouses.add(map_two);
            if (!map_two.get("parent_id").toString().equals(root_id)) {
                homologouses_temp.addAll(recursive_children_node(map_two.get("parent_id").toString(), root_id, homologouses, gene_align_id));
            }
        }
        return homologouses_temp;
    }

    public static List<List<Map>> sortListByValue(List<List<Map>> list) {

        Collections.sort(list, new Comparator<List<Map>>() {


            @Override
            public int compare(List<Map> maps, List<Map> maps2) {
                return Integer.valueOf(maps.size()).compareTo(maps2.size());  //To change body of implemented methods use File | Settings | File Templates.
            }
        });

        return list;
    }


    public JSONArray searchMember(String query) throws IOException {

        final String SEARCH_MEMBER = "SELECT m1.*, df.*, g.name " +
                "FROM gene_member m1, dnafrag df, genome_db g " +
                "where m1.genome_db_id in " + genome_ids + " and " +
                "(m1.display_label like ? OR m1.stable_id like ? or m1.description like ?) and  " +
                "g.genome_db_id = m1.genome_db_id and " +
                "df.dnafrag_id = m1.dnafrag_id limit 100";


        final String SEARCH_SEQ_MEMBER = "SELECT s1.*, df.*, g.name " +
                "FROM  seq_member s1, dnafrag df, genome_db g " +
                "where s1.genome_db_id in " + genome_ids + " and " +
                "(s1.display_label like ? OR s1.stable_id like ? OR s1.description like ?) and " +
                "g.genome_db_id = s1.genome_db_id and " +
                "df.dnafrag_id = s1.dnafrag_id limit 100;";

        JSONArray homologouses = new JSONArray();
        List<Map<String, Object>> homology_member_id = template.queryForList(SEARCH_MEMBER, new Object[]{"%" + query + "%", "%" + query + "%", "%" + query + "%"});

        if (homology_member_id.size() == 0) {
            homology_member_id = template.queryForList(SEARCH_SEQ_MEMBER, new Object[]{"%" + query + "%", "%" + query + "%", "%" + query + "%"});
        }

        for (Map map_two : homology_member_id) {
                map_two.put("genome", map_two.get("name"));
                map_two.put("homologous", countGeneTreeforMember(map_two.get("gene_member_id").toString()));
                homologouses.add(map_two);
        }

        return homologouses;

    }


    public JSONObject findHomology(String query) throws Exception {

//        Long ids[] = getOrthologsforMember(query);
        List<Long> homology_ids = new ArrayList<>();

        int seq_member_id = template.queryForInt(GET_SEQ_MEMBER_ID_FROM_GENE_MEMBER_ID, new Object[]{query});
        JSONObject homologies = new JSONObject();

        final String SEARCH_HOMOLOGY_IDs = "SELECT homology_id FROM homology_member WHERE seq_member_id = ?;";


        List<Map<String, Object>> homology_id = template.queryForList(SEARCH_HOMOLOGY_IDs,  new Object[]{seq_member_id});

        log.info(String.valueOf(homology_id));

        for (Map map_two : homology_id) {
            homology_ids.add((Long) map_two.get("homology_id"));
        }

        final String SEARCH_HOMOLOGY_INFO = "select h.*, hm.* " +
                "from homology_member hm, homology h " +
                "where h.homology_id = hm.homology_id  and h.homology_id in ("+StringUtils.join(homology_ids, ",")+");";
//
        List<Map<String, Object>> homology_member_id = template.queryForList(SEARCH_HOMOLOGY_INFO);

        for (Map map_two : homology_member_id) {
            String temp_homology_id = map_two.get("homology_id").toString();
            int temp_seq_member_id = Integer.parseInt(map_two.get("seq_member_id").toString());

            log.info("\ttemp_seq_member_id "+temp_seq_member_id + " \t "+seq_member_id);
            if(!homologies.containsKey(temp_homology_id)){
                log.info("\ttemp_seq_member_id if ");
                homologies.put(temp_homology_id, new JSONObject());
            }

            if(temp_seq_member_id != seq_member_id)
            {
                log.info("\tif ");

                homologies.getJSONObject(temp_homology_id).put("method_link_species_set_id", map_two.get("method_link_species_set_id"));
                homologies.getJSONObject(temp_homology_id).put("description", map_two.get("description"));
                homologies.getJSONObject(temp_homology_id).put("is_tree_compliant", map_two.get("is_tree_compliant"));
                homologies.getJSONObject(temp_homology_id).put("seq_member_id", map_two.get("seq_member_id"));
                homologies.getJSONObject(temp_homology_id).put("cigar_line", map_two.get("cigar_line"));

            }
            else{
                log.info("\telse ");
                homologies.getJSONObject(temp_homology_id).put("ref_seq_member_id", map_two.get("seq_member_id"));
                homologies.getJSONObject(temp_homology_id).put("ref_cigar_line", map_two.get("cigar_line"));
            }

        }

        return  homologies;

    }
}
