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

package uk.ac.bbsrc.earlham.browser.service.ajax;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sourceforge.fluxion.ajax.Ajaxified;
import net.sourceforge.fluxion.ajax.util.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import uk.ac.bbsrc.earlham.browser.core.store.ComparaStore;
import uk.ac.bbsrc.earlham.browser.core.store.EnsemblCoreStore;

import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 14/08/2013
 * Time: 13:58
 * To change this template use File | Settings | File Templates.
 */

@Ajaxified
public class ComparaService {

    protected static final Logger log = LoggerFactory.getLogger(ComparaService.class);
    @Autowired
    private ComparaStore comparaStore;

    public void setComparaStore(ComparaStore comparaStore) {
        this.comparaStore = comparaStore;
    }

    @Autowired
    private EnsemblCoreStore ensemblCoreStore;

    public void setEnsemblCoreStore(EnsemblCoreStore ensemblCoreStore) {
        this.ensemblCoreStore = ensemblCoreStore;
    }


    /**
     * @param session an HTTPSession comes from ajax call
     * @param json    json object with key parameters sent from ajax call
     * @return JSONObject with one result or list of result
     */

    public JSONObject searchGenomeid(HttpSession session, JSONObject json) {
        log.info("search_genome_id");
        String query = json.getString("query");
        JSONObject response = new JSONObject();
        try {
            response.put("html", "genomes");
            response.put("genomes", comparaStore.getAllGenomeId(query));
            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    /**
     * Returns a JSONObject that can be read as single reference or a list of results
     * <p/>
     * This calls the methods in sequenceStore class
     * and search through database for the keyword
     * first look for seq_region table
     * then gene, transcript and gene_attrib and transcript_attrib
     *
     * @param session an HTTPSession comes from ajax call
     * @param json    json object with key parameters sent from ajax call
     * @return JSONObject with one result or list of result
     */

    public JSONObject searchDnafrags(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        int reference = json.getInt("reference");

        JSONObject response = new JSONObject();
        try {

            Integer queryid = comparaStore.getDnafragearchsize(query, reference);

//      if more than one results
            if (queryid > 1) {
                response.put("html", "genomes");
                response.put("genomes", comparaStore.getAllDnafragByName(query, reference));
            }
//      if no result from seq_region
            else if (queryid == 0) {
                response.put("html", "gene");
//                response.put("gene", sequenceStore.getGenesSearch(seqName));
//                response.put("transcript", sequenceStore.getTranscriptSearch(seqName));
//                response.put("GO", sequenceStore.getGOSearch(seqName));
//                response.put("chromosome", sequenceStore.checkChromosome());
            }
//      if only one result from seq_region
            else {
                Integer query_id = comparaStore.getDnafragId(query, reference);
                String seqRegName = comparaStore.getReferenceName(query_id);
                int length = comparaStore.getReferenceLength(query_id);
                response.put("length", length);
                response.put("html", "");
                response.put("seqname", "<p> <b>Dnafrag ID:</b> " + query + ",<b> Name: </b> " + seqRegName);//+", <b>cds:</b> "+cds+"</p>");
                response.put("seqregname", seqRegName);
                int parent_id = comparaStore.getGenomeIdfromDnafragId(query_id);
                response.put("parent", comparaStore.getGenomeNamefromId(parent_id));
                response.put("tracklists", comparaStore.getAllGenomeIdforReference(parent_id));
//                response.put("coord_sys", sequenceStore.getCoordSys(seqName));
            }
            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    /**
     * Returns a JSONObject that can be read as single reference or a list of results
     * <p/>
     * This calls the methods in sequenceStore class
     * and search through database for the keyword
     * first look for seq_region table
     * then gene, transcript and gene_attrib and transcript_attrib
     *
     * @param session an HTTPSession comes from ajax call
     * @param json    json object with key parameters sent from ajax call
     * @return JSONObject with one result or list of result
     */

    public JSONObject searchDnafrag(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        int reference = json.getInt("reference");

        JSONObject response = new JSONObject();
        try {

            Integer query_id = comparaStore.getDnafragId(query, reference);
            String seqRegName = comparaStore.getReferenceName(query_id);
            int length = comparaStore.getReferenceLength(query_id);
            response.put("length", length);
            response.put("html", "");
            response.put("seqname", "<p> <b>Dnafrag ID:</b> " + query + ",<b> Name: </b> " + seqRegName);//+", <b>cds:</b> "+cds+"</p>");
            response.put("seqregname", seqRegName);
            int parent_id = comparaStore.getGenomeIdfromDnafragId(query_id);
            response.put("parent", comparaStore.getGenomeNamefromId(parent_id));
            response.put("tracklists", comparaStore.getAllGenomeIdforReference(parent_id));
            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }


    /**
     * Returns a JSONObject that can be read as single reference or a list of results
     * <p/>
     * This calls the methods in sequenceStore class
     * and search through database for the keyword
     * first look for seq_region table
     * then gene, transcript and gene_attrib and transcript_attrib
     *
     * @param session an HTTPSession comes from ajax call
     * @param json    json object with key parameters sent from ajax call
     * @return JSONObject with one result or list of result
     */

    public JSONObject searchMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");

        JSONObject response = new JSONObject();
        try {

            response.put("html", comparaStore.searchMember(query));

            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }


    public JSONObject setGenomes(HttpSession session, JSONObject json) {

        JSONObject response = new JSONObject();
        try {
            JSONArray genomes = new JSONArray();
            genomes = comparaStore.setAllGenomeId("");
            response.put("genomes", genomes);
            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }
    /**
     * Returns a JSONObject that can be read as single reference or a list of results
     * <p/>
     * This calls the methods in sequenceStore class
     * and search through database for the keyword
     * first look for seq_region table
     * then gene, transcript and gene_attrib and transcript_attrib
     *
     * @param session an HTTPSession comes from ajax call
     * @param json    json object with key parameters sent from ajax call
     * @return JSONObject with one result or list of result
     */

    public JSONObject getGenomes(HttpSession session, JSONObject json) {

        JSONObject response = new JSONObject();
        try {
            JSONArray genomes = new JSONArray();
            genomes = comparaStore.getAllGenomeId("");

            response.put("genomes", genomes);
//            response.put("test", ensemblRestStore.listSpecies());

            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    public JSONObject getMember(HttpSession session, JSONObject json) {
        int chr_id = json.getInt("chr_name");
        JSONObject response = new JSONObject();
        int genome_id = json.getInt("reference");


        response.put("trackname", "member");
        int count;
        try {

            response.put("chr_length", comparaStore.getChromosomeLength(chr_id, genome_id));
            response.put("member", comparaStore.getAllMember(chr_id, genome_id));
            response.put("overview", comparaStore.getOverviewAllMember(chr_id, genome_id));


        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getMemberbyChrName(HttpSession session, JSONObject json) {
        String chr_name = json.getString("chr_name");
        JSONObject response = new JSONObject();
        String reference = json.getString("reference");

        try {
            int genome_id = comparaStore.getGenomeId(reference).getInt("ref");
            int chr_id = comparaStore.getChrId(chr_name, genome_id).getInt("chr");
            response.put("chr_id", chr_id);

            response.put("trackname", "member");
            int count;
            log.info(" \n\n\n " + genome_id + "\t " + chr_id);
            response.put("chr_length", comparaStore.getChromosomeLength(chr_id, genome_id));
            response.put("member", comparaStore.getAllMember(chr_id, genome_id));
            response.put("overview", comparaStore.getOverviewAllMember(chr_id, genome_id));


        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }


    public JSONObject getChromosome(HttpSession session, JSONObject json) {
        JSONObject response = new JSONObject();
        int reference = json.getInt("reference");


        response.put("trackname", "member");
        try {

            response.put("member", comparaStore.getAllChromosome(reference));


        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getChromosomebyGenomeName(HttpSession session, JSONObject json) {
        JSONObject response = new JSONObject();
        String reference = json.getString("reference");


        response.put("trackname", "member");
        try {
            int genome_db_id = comparaStore.getGenomeId(reference).getInt("ref");
            response.put("member", comparaStore.getAllChromosome(genome_db_id));


        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getCoreMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        JSONObject response = new JSONObject();


        response.put("trackname", "member");
        try {
            response.put("ref", comparaStore.getRefStableID(query));

            response.put("member", comparaStore.getGeneTreeforMember(query));

            response.put("tree", comparaStore.getGeneTree(query));
            response.put("protein_id", comparaStore.getRefPtnStableID(query));


        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getRefMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        int query_int = json.getInt("query");
        JSONObject response = new JSONObject();


        response.put("trackname", "member");
        try {



            response.put("ref", comparaStore.getRefStableID(query));
            response.put("chr_length", comparaStore.getRefStableID(query));

            response.put("member", comparaStore.getRefMember(query));

            String genome = comparaStore.getGenomefromGeneMemberID(query_int);
            int seq_member_id = comparaStore.getSeqMemberIDfromGeneMemberID(query_int);
            String stable_id = comparaStore.getSeqStableIDfromSeqMemberID(seq_member_id);
            int chr_id = comparaStore.getDnafragIdfromStableId(stable_id);
            int genome_id = comparaStore.getGenomeId(genome).getInt("ref");
            response.put("chr_length", comparaStore.getChromosomeLength(chr_id, genome_id));

            response.put("protein_id", comparaStore.getRefPtnStableID(query));

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getHomologyForMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        JSONObject response = new JSONObject();

        response.put("trackname", "homology");
        try {
            response.put("ref", comparaStore.getGeneMemberInfofromID(query));
            response.put("homology", comparaStore.findHomology(query));
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject countForCoreMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        JSONObject response = new JSONObject();


//        int delta = json.getInt("delta");
        response.put("trackname", "member");
        int count;
        try {
            response.put("member", comparaStore.countGeneTreeforMember(query));
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getInfoForCoreMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        String ref = json.getString("ref");
        String protein_id = json.getString("protein_id");

        JSONObject response = new JSONObject();


        try {
            int ref_seq_member_id = comparaStore.getSeqMemberIDfromStableID(ref);
            int hit_seq_member_id = comparaStore.getSeqMemberIDfromStableID(protein_id);

            response.put("info", comparaStore.getInfoforMember(query).get("info"));
            response.put("homology", comparaStore.getInfoforHomolog(hit_seq_member_id, ref_seq_member_id));

            return response;
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }
    }


    public JSONObject getGenomeId(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        JSONObject response = new JSONObject();

        response.put("ref", "member");
        try {
            return comparaStore.getGenomeId(query);
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }
    }

    public JSONObject getChrId(HttpSession session, JSONObject json) throws IOException {
        String query = json.getString("query");
        String ref = json.getString("ref");
        JSONObject response = new JSONObject();

        int genome_id = comparaStore.getGenomeId(ref).getInt("ref");
        response.put("ref", "member");
        try {
            return comparaStore.getChrId(query, genome_id);
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }
    }

    public JSONObject getMemberfromURL(HttpSession session, JSONObject json) throws IOException {
        String query = json.getString("query");

        JSONObject response = new JSONObject();


        response.put("ref", "member");
        try {
            int gene_member_id = comparaStore.getGeneMemberId(query);
            int seq_member_id = comparaStore.getSeqMemberId(query);
            if (gene_member_id == 0 && seq_member_id == 0) {
                response.put("html", comparaStore.searchMember(query));
            } else{
                if(seq_member_id == 0){
                    gene_member_id = comparaStore.getGeneMemberIDfromStableID(query);
                    seq_member_id = comparaStore.getSeqMemberIDfromGeneMemberID(gene_member_id);
                    query = comparaStore.getSeqStableIDfromSeqMemberID(seq_member_id);

                }
                if(gene_member_id == 0){
                    seq_member_id = comparaStore.getSeqMemberIDfromStableID(query);
                    gene_member_id = comparaStore.getGeneMemberIDfromSeqMemberID(seq_member_id);

                }
                log.info("\n\n\t after    else iff "+query);
                int ref = comparaStore.getReferencefromStableId(query);
                int dnafrag = comparaStore.getDnafragIdfromStableId(query);
                response.put("member_id", gene_member_id);
                response.put("ref", ref);
                response.put("dnafrag", dnafrag);
                response.put("html", comparaStore.searchMember(query));

            }

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

        return response;
    }


    public JSONObject getGenomeName(HttpSession session, JSONObject json) throws IOException {
        int query = json.getInt("query");

        JSONObject response = new JSONObject();


        response.put("ref", "member");
        try {
            String genome_name = comparaStore.getGenomeNamefromId(query);
            response.put("genome_name", genome_name);

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

        return response;
    }

    public JSONObject getGenomeAndChrName(HttpSession session, JSONObject json) throws IOException {
        int query = json.getInt("query");
        int chr = json.getInt("chr");

        JSONObject response = new JSONObject();


        response.put("ref", "member");
        try {
            String genome_name = comparaStore.getGenomeNamefromId(query);
            String chr_name = comparaStore.getDnafragnamefromId(chr);
            response.put("genome_name", genome_name);
            response.put("chr_name", chr_name);

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

        return response;
    }

    public JSONObject getPairwiseAlignment(HttpSession session, JSONObject json) throws Exception {
        String ref = json.getString("ref");
        String hit = json.getString("hit");

        JSONObject response = new JSONObject();

        JSONObject ref_object = new JSONObject();
        JSONObject hit_object = new JSONObject();


        int ref_seq_member_id = comparaStore.getSeqMemberIDfromStableID(ref);
        int hit_seq_member_id = comparaStore.getSeqMemberIDfromStableID(hit);

        int ref_gene_member_id = comparaStore.getGeneMemberIDfromSeqMemberID(ref_seq_member_id);
        int hit_gene_member_id = comparaStore.getGeneMemberIDfromSeqMemberID(hit_seq_member_id);

        ref_object.put("gene_id", comparaStore.getGeneStableIDfromGeneMemberID(ref_gene_member_id));
        ref_object.put("protein_id", ref);

        hit_object.put("gene_id", comparaStore.getGeneStableIDfromGeneMemberID(hit_gene_member_id));
        hit_object.put("protein_id", hit);
        try {
            JSONObject alignment =  comparaStore.getPairwiseAlignment(ref_seq_member_id, hit_seq_member_id);
            long homology_id = comparaStore.getHomologyID(ref_seq_member_id, hit_seq_member_id).getLong("homology_id");

            ref_object.put("alignment", alignment.get("ref"));
            hit_object.put("alignment", alignment.get("hit"));

            ref_object.put("sequence", comparaStore.getSeq(ref_seq_member_id));
            hit_object.put("sequence",comparaStore.getSeq(hit_seq_member_id));;

            response.put("ref", ref_object);
            response.put("hit", hit_object);

            response.put("homology", comparaStore.getHomologyType(homology_id));

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

        return response;
    }

    public JSONObject getPairwiseAlignmentWithGenes(HttpSession session, JSONObject json) throws Exception {
        String ref = json.getString("ref");
        String hit = json.getString("hit");

        JSONObject response = new JSONObject();

        JSONObject ref_object = new JSONObject();
        JSONObject hit_object = new JSONObject();


        int ref_seq_member_id = comparaStore.getSeqMemberIDfromStableID(ref);
        int hit_seq_member_id = comparaStore.getSeqMemberIDfromStableID(hit);

        String ref_genome = comparaStore.getGenomefromSeqMemberID(ref_seq_member_id);
        String hit_genome = comparaStore.getGenomefromSeqMemberID(hit_seq_member_id);

        int ref_gene_member_id = comparaStore.getGeneMemberIDfromSeqMemberID(ref_seq_member_id);
        int hit_gene_member_id = comparaStore.getGeneMemberIDfromSeqMemberID(hit_seq_member_id);


        String ref_gene_stable_id = comparaStore.getGeneStableIDfromGeneMemberID(ref_gene_member_id);
        String hit_gene_stable_id = comparaStore.getGeneStableIDfromGeneMemberID(hit_gene_member_id);




        ref_object.put("gene_id", ref_gene_stable_id);
        ref_object.put("protein_id", ref);

        hit_object.put("gene_id", hit_gene_stable_id);
        hit_object.put("protein_id", hit);
        try {
            JSONObject alignment =  comparaStore.getPairwiseAlignment(ref_seq_member_id, hit_seq_member_id);
            long homology_id = comparaStore.getHomologyID(ref_seq_member_id, hit_seq_member_id).getLong("homology_id");

            ref_object.put("alignment", alignment.get("ref"));
            hit_object.put("alignment", alignment.get("hit"));

            ref_object.put("gene", ensemblCoreStore.getGene(ref, ref_genome, ref_seq_member_id, ref_gene_stable_id));
            hit_object.put("gene", ensemblCoreStore.getGene(hit, hit_genome, hit_seq_member_id, hit_gene_stable_id));

            ref_object.put("sequence", comparaStore.getSeq(ref_seq_member_id));
            hit_object.put("sequence",comparaStore.getSeq(hit_seq_member_id));;

            response.put("ref", ref_object);
            response.put("hit", hit_object);

            response.put("homology", comparaStore.getHomologyType(homology_id));

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

        return response;
    }


}