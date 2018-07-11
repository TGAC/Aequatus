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


import net.sf.ehcache.CacheManager;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import uk.ac.bbsrc.earlham.browser.core.store.EnsemblCoreStore;

import java.util.List;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: bianx
 * Date: 15-Sep-2011
 * Time: 11:10:23
 * To change this template use File | Settings | File Templates.
 */


public class SQLSequenceDAO implements EnsemblCoreStore {

    private static SQLEnsemblComparaDAO ensemblComparaDAO;

    protected static final Logger log = LoggerFactory.getLogger(SQLSequenceDAO.class);

    @Autowired
    private CacheManager cacheManager;

    public void setCacheManager(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    public JdbcTemplate getJdbcTemplate() {
        return template;
    }


    public static final String GET_SEQ_REGION_NAME_FROM_ID = "SELECT name FROM seq_region WHERE seq_region_id = ?";

    public static final String GET_EXON_per_Gene = "SELECT e.exon_id, e.seq_region_start, e.seq_region_end, e.seq_region_strand FROM exon e, exon_transcript et where et.exon_id = e.exon_id and et.transcript_id =  ?";
    public static final String GET_CDS_start_per_Gene = "SELECT start_exon_id, seq_start FROM translation where transcript_id =?";
    public static final String GET_CDS_end_per_Gene = "SELECT end_exon_id, seq_end FROM translation where transcript_id =?";

    public static final String GET_Gene_by_Gene_ID = "SELECT * FROM gene where gene_id =?";//AND ((seq_region_start > ? AND seq_region_end < ?) OR (seq_region_start < ? AND seq_region_end > ?) OR (seq_region_end > ? AND seq_region_end < ?) OR (seq_region_start > ? AND seq_region_start < ?))";
    public static final String GET_EXON_BY_ID = "SELECT seq_region_start,seq_region_end,seq_region_strand FROM exon where exon_id =?";

    public static final String GET_Transcript_by_stable_id = "select transcript_id from translation where stable_id = ?;";//"select * from gene_view where seq_region_id = ? and analysis_id = ?;";//
    public static final String GET_Transcript_by_Transcript_ID = "SELECT transcript_id,seq_region_id, seq_region_start,seq_region_end, description,seq_region_strand FROM transcript where transcript_id =?";//AND ((seq_region_start > ? AND seq_region_end < ?) OR (seq_region_start < ? AND seq_region_end > ?) OR (seq_region_end > ? AND seq_region_end < ?) OR (seq_region_start > ? AND seq_region_start < ?))";

    public static final String GET_Transcripts_per_Gene = "SELECT transcript_id,seq_region_id, seq_region_start,seq_region_end, description,seq_region_strand FROM transcript where gene_id =?";
    public static final String GET_Gene_by_transcript_id = "select gene_id from transcript where transcript_id = ?;";
    public static final String GET_Gene_by_stable_id = "select gene_id from gene where stable_id = ?;";//"select * from gene_view where seq_region_id = ? and analysis_id = ?;";//
    public static final String GET_Protein_by_id = "select stable_id from translation where translation_id = ?;";//"select * from gene_view where seq_region_id = ? and analysis_id = ?;";//
    public static final String GET_Protein_by_transcriptid = "select stable_id from translation where transcript_id = ?;";//"select * from gene_view where seq_region_id = ? and analysis_id = ?;";//
    public static final String GET_Following_Gene_by_position = "select * from gene where seq_region_id = ? and seq_region_start > ? and biotype = 'protein_coding' order by seq_region_start asc limit ?;";

    public static final String GET_Previous_Gene_by_position = "select * from gene where seq_region_id = ? and seq_region_end < ? and biotype = 'protein_coding' order by seq_region_start desc limit ?;";

    private static JdbcTemplate template;

    public void setJdbcTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public JSONObject getGene(String query, String genome, int member_id, String gene_stable_id) {
        return getGenebyStableid(query, genome, member_id, gene_stable_id);
    }

    public JSONObject getGene(String gene_stable_id, String genome) {
        log.info("\n\n\n\tget Gene "+gene_stable_id+"  "+genome);
        return getGenebyStableid(gene_stable_id, genome);
    }


    public static JSONObject getGenebyStableid(String query, String genome, int member_id, String gene_stable_id) {
        try {

            int length = 0;
            JSONObject gene = new JSONObject();

            JdbcTemplate new_Template = DatabaseSchemaSelector.getConnection(genome);

            int transcript_id = new_Template.queryForObject(GET_Transcript_by_stable_id, new Object[]{query}, Integer.class);
            int gene_id = new_Template.queryForObject(GET_Gene_by_transcript_id, new Object[]{transcript_id}, Integer.class);

            Map<String, Object> gene_info = new_Template.queryForMap(GET_Gene_by_Gene_ID, new Object[]{gene_id});
            List<Map<String, Object>> translation_start;
            List<Map<String, Object>> translation_end;
            int start = Integer.parseInt(gene_info.get("seq_region_start").toString());
            int end = Integer.parseInt(gene_info.get("seq_region_end").toString());
            String ref_id = gene_info.get("seq_region_id").toString();

            gene.put("gene_id", gene_id);
            gene.put("start", start);
            gene.put("end", end);
            gene.put("id", gene_stable_id);
            gene.put("member_id", member_id);
            gene.put("length", end - start + 1);
            gene.put("reference", new_Template.queryForObject(GET_SEQ_REGION_NAME_FROM_ID, new Object[]{ref_id}, String.class));

            gene.put("strand", gene_info.get("seq_region_strand"));
            gene.put("desc", "");//gene_info.get("description"));

            JSONArray transcripts_array = new JSONArray();
            Map<String, Object> map = new_Template.queryForMap(GET_Transcript_by_Transcript_ID, new Object[]{transcript_id});

            JSONObject transcript = new JSONObject();

            start = Integer.parseInt(map.get("seq_region_start").toString());
            end = Integer.parseInt(map.get("seq_region_end").toString());


            transcript.put("id", query);
            transcript.put("start", start);
            transcript.put("end", end);
            transcript.put("length", end - start + 1);
            transcript.put("id", query);
            transcript.put("member_id", member_id);
            transcript.put("reference", new_Template.queryForObject(GET_SEQ_REGION_NAME_FROM_ID, new Object[]{ref_id}, String.class));
            transcript.put("description", "");// map.get("description"));

            transcript.put("strand", map.get("seq_region_strand"));
            translation_start = new_Template.queryForList(GET_CDS_start_per_Gene, new Object[]{transcript_id});
            translation_end = new_Template.queryForList(GET_CDS_end_per_Gene, new Object[]{transcript_id});
            JSONObject translation = new JSONObject();
            translation.put("id", query);


            for (Map start_seq : translation_start) {
                int exon_start = Integer.parseInt(new_Template.queryForList(GET_EXON_BY_ID, new Object[]{start_seq.get("start_exon_id")}).get(0).get("seq_region_start").toString());
                int exon_end = Integer.parseInt(new_Template.queryForList(GET_EXON_BY_ID, new Object[]{start_seq.get("start_exon_id")}).get(0).get("seq_region_end").toString());

                if (gene_info.get("seq_region_strand").toString().equals("-1")) {
//                    transcript.put("transcript_start", exon_end - (Integer.parseInt(start_seq.get("seq_start").toString())-1));
                    translation.put("start", exon_end - (Integer.parseInt(start_seq.get("seq_start").toString()) - 1));
                } else {
//                    transcript.put("transcript_start", exon_start + (Integer.parseInt(start_seq.get("seq_start").toString())-1));
                    translation.put("start", exon_start + (Integer.parseInt(start_seq.get("seq_start").toString()) - 1));

                }
            }


            for (Map end_seq : translation_end) {
                int exon_start = Integer.parseInt(new_Template.queryForList(GET_EXON_BY_ID, new Object[]{end_seq.get("end_exon_id")}).get(0).get("seq_region_start").toString());
                int exon_end = Integer.parseInt(new_Template.queryForList(GET_EXON_BY_ID, new Object[]{end_seq.get("end_exon_id")}).get(0).get("seq_region_end").toString());

                if (gene_info.get("seq_region_strand").toString().equals("-1")) {
//                    transcript.put("transcript_end", exon_end - (Integer.parseInt(end_seq.get("seq_end").toString())-1));
                    translation.put("end", exon_end - (Integer.parseInt(end_seq.get("seq_end").toString()) - 1));

                } else {
//                    transcript.put("transcript_end", exon_start + (Integer.parseInt(end_seq.get("seq_end").toString())-1));
                    translation.put("end", exon_start + (Integer.parseInt(end_seq.get("seq_end").toString()) - 1));

                }
            }

            if (translation.getInt("start") > translation.getInt("end")) {
                int temp = translation.getInt("start");
//                transcript.put("transcript_start", transcript.getInt("transcript_end"));
//                transcript.put("transcript_end", temp);
                translation.put("start", translation.getInt("end"));
                translation.put("end", temp);


            }
            transcript.put("Translation", translation);

            transcript.put("desc", map.get("description") + ":" + query);
            JSONArray exons_array = new JSONArray();
            List<Map<String, Object>> exons = new_Template.queryForList(GET_EXON_per_Gene, new Object[]{transcript_id});
            for (Map map_temp : exons) {
                JSONObject exon = new JSONObject();
                start = Integer.parseInt(map_temp.get("seq_region_start").toString());
                end = Integer.parseInt(map_temp.get("seq_region_end").toString());

                exon.put("id", map_temp.get("exon_id"));
                exon.put("start", start);
                exon.put("_start", start);
                exon.put("end", end);
                exon.put("length", end - start + 1);

                length += (end - start + 1);
                exon.put("strand", map_temp.get("seq_region_strand"));

                exons_array.add(exon);
            }

            transcript.put("exon_length", length);
            transcript.put("Exon", exons_array);

            transcripts_array.add(transcript);
            gene.put("Transcript", transcripts_array);


            return gene;
        } catch (Exception e) {
            e.printStackTrace();
            log.info("Gene not found: " + e.getMessage() + " " + genome + " " + query + " " + gene_stable_id);
            return null;
        }
    }

    public static JSONObject getGenebyStableid(String gene_stable_id, String genome) {

        log.info("\n\n\n\tgetGenebyStableid "+gene_stable_id+"  "+genome);

        try {

            int length = 0;
            JSONObject gene = new JSONObject();

            JdbcTemplate new_Template = DatabaseSchemaSelector.getConnection(genome);

//            int transcript_id = new_Template.queryForObject(GET_Transcript_by_stable_id, new Object[]{query}, Integer.class);
            int gene_id = new_Template.queryForObject(GET_Gene_by_stable_id, new Object[]{gene_stable_id}, Integer.class);
            log.info("\n\n\n\tgetGenebyStableid gene id "+gene_id);

            Map<String, Object> gene_info = new_Template.queryForMap(GET_Gene_by_Gene_ID, new Object[]{gene_id});
            List<Map<String, Object>> translation_start;
            List<Map<String, Object>> translation_end;
            int start = Integer.parseInt(gene_info.get("seq_region_start").toString());
            int end = Integer.parseInt(gene_info.get("seq_region_end").toString());
            String ref_id = gene_info.get("seq_region_id").toString();

            gene.put("gene_id", gene_id);
            gene.put("start", start);
            gene.put("end", end);
            gene.put("id", gene_stable_id);
            gene.put("length", end - start + 1);
            gene.put("reference", new_Template.queryForObject(GET_SEQ_REGION_NAME_FROM_ID, new Object[]{ref_id}, String.class));

            gene.put("strand", gene_info.get("seq_region_strand"));
            gene.put("desc", "");//gene_info.get("description"));

            JSONArray transcripts_array = new JSONArray();

            List<Map<String, Object>> transcripts = new_Template.queryForList(GET_Transcripts_per_Gene, new Object[]{gene_id});
            for (Map map : transcripts) {
                long transcript_id = (long) map.get("transcript_id");
                log.info("\n\n\n\tgetGenebyStableid transcript_id "+transcript_id);

                JSONObject transcript = new JSONObject();

                start = Integer.parseInt(map.get("seq_region_start").toString());
                end = Integer.parseInt(map.get("seq_region_end").toString());


//            transcript.put("id", query);
                transcript.put("start", start);
                transcript.put("end", end);
                transcript.put("length", end - start + 1);
//            transcript.put("id", query);
//            transcript.put("member_id", member_id);
                transcript.put("reference", new_Template.queryForObject(GET_SEQ_REGION_NAME_FROM_ID, new Object[]{ref_id}, String.class));
                transcript.put("description", "");// map.get("description"));

                transcript.put("strand", map.get("seq_region_strand"));
                translation_start = new_Template.queryForList(GET_CDS_start_per_Gene, new Object[]{transcript_id});
                translation_end = new_Template.queryForList(GET_CDS_end_per_Gene, new Object[]{transcript_id});
                JSONObject translation = new JSONObject();
                List<Map<String, Object>> translations = new_Template.queryForList(GET_Protein_by_transcriptid, new Object[]{transcript_id});

                log.info("\n\n\n translation_end "+translation_end);
                log.info("\n\n\n translation_start "+translation_start);

                if(translations.size() > 0){
                    translation.put("id",  translations.get(0).get("stable_id"));
                    for (Map start_seq : translation_start) {
                        long exon_start = Long.parseLong(new_Template.queryForList(GET_EXON_BY_ID, new Object[]{start_seq.get("start_exon_id")}).get(0).get("seq_region_start").toString());
                        long exon_end = Long.parseLong(new_Template.queryForList(GET_EXON_BY_ID, new Object[]{start_seq.get("start_exon_id")}).get(0).get("seq_region_end").toString());

                        log.info("\n\n\n exon start end  1 "+exon_start+" "+exon_end);

                        if (gene_info.get("seq_region_strand").toString().equals("-1")) {
//                    transcript.put("transcript_start", exon_end - (Integer.parseInt(start_seq.get("seq_start").toString())-1));
                            translation.put("start", exon_end - (Long.parseLong(start_seq.get("seq_start").toString()) - 1));
                        } else {
//                    transcript.put("transcript_start", exon_start + (Integer.parseInt(start_seq.get("seq_start").toString())-1));
                            translation.put("start", exon_start + (Long.parseLong(start_seq.get("seq_start").toString()) - 1));

                        }
                    }


                    for (Map end_seq : translation_end) {
                        long exon_start = Long.parseLong((new_Template.queryForList(GET_EXON_BY_ID, new Object[]{end_seq.get("end_exon_id")}).get(0).get("seq_region_start").toString()));
                        long exon_end = Long.parseLong(new_Template.queryForList(GET_EXON_BY_ID, new Object[]{end_seq.get("end_exon_id")}).get(0).get("seq_region_end").toString());
                        log.info("\n\n\n exon start end 2 "+exon_start+" "+exon_end);

                        if (gene_info.get("seq_region_strand").toString().equals("-1")) {
//                    transcript.put("transcript_end", exon_end - (Integer.parseInt(end_seq.get("seq_end").toString())-1));
                            translation.put("end", exon_end - (Integer.parseInt(end_seq.get("seq_end").toString()) - 1));

                        } else {
//                    transcript.put("transcript_end", exon_start + (Integer.parseInt(end_seq.get("seq_end").toString())-1));
                            translation.put("end", exon_start + (Integer.parseInt(end_seq.get("seq_end").toString()) - 1));

                        }
                    }
                    log.info("\n\n\n exon "+translation.get("start")+" "+translation.get("end"));
                    if (translation.getLong("start") > translation.getLong("end")) {
                        int temp = translation.getInt("start");
//                transcript.put("transcript_start", transcript.getInt("transcript_end"));
//                transcript.put("transcript_end", temp);
                        translation.put("start", translation.getLong("end"));
                        translation.put("end", temp);


                    }
                    transcript.put("Translation", translation);
                }




//            transcript.put("desc", map.get("description") + ":" + query);
                JSONArray exons_array = new JSONArray();
                List<Map<String, Object>> exons = new_Template.queryForList(GET_EXON_per_Gene, new Object[]{transcript_id});
                for (Map map_temp : exons) {
                    JSONObject exon = new JSONObject();
                    start = Integer.parseInt(map_temp.get("seq_region_start").toString());
                    end = Integer.parseInt(map_temp.get("seq_region_end").toString());

                    exon.put("id", map_temp.get("exon_id"));
                    exon.put("start", start);
                    exon.put("_start", start);
                    exon.put("end", end);
                    exon.put("length", end - start + 1);

                    length += (end - start + 1);
                    exon.put("strand", map_temp.get("seq_region_strand"));

                    exons_array.add(exon);
                }

                transcript.put("exon_length", length);
                transcript.put("Exon", exons_array);

                transcripts_array.add(transcript);
            }

//            Map<String, Object> map = new_Template.queryForMap(GET_Transcript_by_Transcript_ID, new Object[]{transcript_id});


            gene.put("Transcript", transcripts_array);


            return gene;
        } catch (Exception e) {
            e.printStackTrace();
            log.info("Gene not found: " + e.getMessage() + " " + genome + " " + gene_stable_id);
            return null;
        }
    }

    public static Map<String, Object> getCondensedGenebyStableid(String query, String genome, long member_id, String gene_stable_id) {
        try {

            JSONObject gene = new JSONObject();

            JdbcTemplate new_Template = DatabaseSchemaSelector.getConnection(genome);

            int transcript_id = new_Template.queryForObject(GET_Transcript_by_stable_id, new Object[]{query}, Integer.class);

            int gene_id = new_Template.queryForObject(GET_Gene_by_transcript_id, new Object[]{transcript_id}, Integer.class);

            Map<String, Object> gene_info = new_Template.queryForMap(GET_Gene_by_Gene_ID, new Object[]{gene_id});

            return gene_info;
        } catch (Exception e) {
            e.printStackTrace();
            log.info("Gene not found: " + e.getMessage() + " " + genome + " " + query + " " + gene_stable_id);
            return null;
        }
    }


    public static JSONObject getOrderedGenebyStableid(String query, String genome, long member_id, String gene_stable_id, int delta) {
        try {

            JSONObject genes = new JSONObject();

            JdbcTemplate new_Template = DatabaseSchemaSelector.getConnection(genome);

            int transcript_id = new_Template.queryForObject(GET_Transcript_by_stable_id, new Object[]{query}, Integer.class);
            int gene_id = new_Template.queryForObject(GET_Gene_by_transcript_id, new Object[]{transcript_id}, Integer.class);

            Map<String, Object> gene_info = new_Template.queryForMap(GET_Gene_by_Gene_ID, new Object[]{gene_id});
            long start = (long) gene_info.get("seq_region_start");
            long end = (long) gene_info.get("seq_region_end");
            long id = (long) gene_info.get("seq_region_id");

            List<Map<String, Object>> following_gene_id = new_Template.queryForList(GET_Following_Gene_by_position, new Object[]{id, end, delta});
            List<Map<String, Object>> previous_gene_id = new_Template.queryForList(GET_Previous_Gene_by_position, new Object[]{id, start, delta});

            genes.put("before", previous_gene_id);
            genes.put("after", following_gene_id);

            return genes;
        } catch (Exception e) {
            e.printStackTrace();
            log.info("Gene not found: " + e.getMessage() + " " + genome + " " + query + " " + gene_stable_id);
            return null;
        }
    }


}
