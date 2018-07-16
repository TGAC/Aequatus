package uk.ac.bbsrc.earlham.browser.service.ajax;

import net.sf.json.JSONObject;
import net.sourceforge.fluxion.ajax.Ajaxified;
import net.sourceforge.fluxion.ajax.util.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import uk.ac.bbsrc.earlham.browser.core.store.EnsemblRestStore;

import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by thankia on 14/05/2018.
 */

@Ajaxified
public class EnsemblRestServices {

    String species = null;

    protected static final Logger log = LoggerFactory.getLogger(ComparaService.class);
    @Autowired

    private EnsemblRestStore ensemblRestStore;

    public void setEnsemblRestStore(EnsemblRestStore ensemblRestStoreStore) {
        this.ensemblRestStore = ensemblRestStoreStore;
    }

    public boolean setGenomes(HttpSession session, JSONObject json) {
        try {
            species = json.getString("species");
            return true;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return false;
        }
    }

    public JSONObject getGenomes(HttpSession session, JSONObject json) {

        try {
            JSONObject genomes = ensemblRestStore.getSpecies();
            return genomes;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }
    }


    public JSONObject searchGenes(HttpSession session, JSONObject json) {

        log.info("\n\n\n restservices searchGenes");
        String keyword = json.getString("keyword");
        String species = json.getString("species");

        JSONObject response = new JSONObject();
        try {
            JSONObject genomes = ensemblRestStore.searchGenes(keyword, species);

            return genomes;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    public JSONObject getGeneTree(HttpSession session, JSONObject json) {

        log.info("\n\n\n restservices searchGenes");
        String id = json.getString("id");
//        String species = json.getString("species");

        JSONObject response = new JSONObject();
        try {
            JSONObject genetree = new JSONObject();

            genetree = ensemblRestStore.getGeneTree(id, species);

            return genetree;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    public JSONObject getHomologyForMember(HttpSession session, JSONObject json) {
        String id = json.getString("id");
//        String species = json.getString("species");
        JSONObject response = new JSONObject();



        response.put("trackname", "homology");
        try {
            response.put("ref", ensemblRestStore.getGene(id, false));
//            response.put("refSpecies", comparaStore.getGeneMemberInfofromID(query));
            response.put("homology", ensemblRestStore.getHomology(id, species).getJSONArray("homology"));
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getPairwiseAlignmentWithGenes(HttpSession session, JSONObject json) throws Exception {
        String ref = json.getString("ref");
        String hit = json.getString("hit");

        String ref_ptn = json.getString("ref_ptn");
        String hit_ptn = json.getString("hit_ptn");

        JSONObject response = new JSONObject();

        JSONObject ref_object = new JSONObject();
        JSONObject hit_object = new JSONObject();


//        int ref_seq_member_id = ensemblRestStoreStore.getSeqMemberIDfromStableID(ref);
//        int hit_seq_member_id = ensemblRestStoreStore.getSeqMemberIDfromStableID(hit);

//        String ref_genome = ensemblRestStoreStore.getGenomefromSeqMemberID(ref_seq_member_id);
//        String hit_genome = ensemblRestStoreStore.getGenomefromSeqMemberID(hit_seq_member_id);

//        int ref_gene_member_id = ensemblRestStoreStore.getGeneMemberIDfromSeqMemberID(ref_seq_member_id);
//        int hit_gene_member_id = ensemblRestStoreStore.getGeneMemberIDfromSeqMemberID(hit_seq_member_id);
//
//
//        String ref_gene_stable_id = ensemblRestStoreStore.getGeneStableIDfromGeneMemberID(ref_gene_member_id);
//        String hit_gene_stable_id = ensemblRestStoreStore.getGeneStableIDfromGeneMemberID(hit_gene_member_id);




        ref_object.put("gene_id", ref);
        ref_object.put("protein_id", ref_ptn);

        hit_object.put("gene_id", hit);
        hit_object.put("protein_id", hit_ptn);
        try {
//            JSONObject alignment =  ensemblRestStoreStore.getPairwiseAlignment(ref_seq_member_id, hit_seq_member_id);
//            long homology_id = ensemblRestStoreStore.getHomologyID(ref_seq_member_id, hit_seq_member_id).getLong("homology_id");

//            ref_object.put("alignment", alignment.get("ref"));
//            hit_object.put("alignment", alignment.get("hit"));

            ref_object.put("gene", ensemblRestStore.getGene(ref, true));
            hit_object.put("gene", ensemblRestStore.getGene(hit, true));

//            ref_object.put("sequence", ensemblRestStoreStore.getSeq(ref_seq_member_id));
//            hit_object.put("sequence",ensemblRestStoreStore.getSeq(hit_seq_member_id));;

            response.put("ref", ref_object);
            response.put("hit", hit_object);

//            response.put("homology", ensemblRestStoreStore.getHomologyType(homology_id));

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

        return response;
    }

    public JSONObject testRestAPI(HttpSession session, JSONObject json) {

        try {
            JSONObject status = ensemblRestStore.testRestAPI();
            return status;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    public JSONObject getRestInfo(HttpSession session, JSONObject json) {

        try {
            JSONObject info = new JSONObject();
            info.put("version", ensemblRestStore.getRestAPIversion().get("release"));
            info.put("release", ensemblRestStore.getReleaseversion().get("release"));

            return info;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    public JSONObject getInfoForCoreMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        String ref = json.getString("ref");
        String protein_id = json.getString("protein_id");

        JSONObject response = new JSONObject();


        try {
//            int ref_seq_member_id = comparaStore.getSeqMemberIDfromStableID(ref);
//            int hit_seq_member_id = comparaStore.getSeqMemberIDfromStableID(protein_id);

            response.put("info", ensemblRestStore.getGene(query, false));
//            response.put("info", comparaStore.getInfoforMember(query).get("info"));
            response.put("homology", ensemblRestStore.getInfoforHomolog(query, ref));

            return response;
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }
    }

    public JSONObject getPairwiseAlignment(HttpSession session, JSONObject json) throws Exception {
        String ref_gene = json.getString("ref_gene");
        String hit_gene = json.getString("hit_gene");

        String ref = json.getString("ref");
        String hit = json.getString("hit");


        JSONObject response = new JSONObject();

        JSONObject ref_object = new JSONObject();
        JSONObject hit_object = new JSONObject();



        ref_object.put("gene_id", ref_gene);
        ref_object.put("protein_id", ref);

        hit_object.put("gene_id", hit_gene);
        hit_object.put("protein_id", hit);
        try {
            JSONObject alignment =  ensemblRestStore.getPairwiseAlignment(ref_gene, hit);
//            long homology_id = comparaStore.getHomologyID(ref_seq_member_id, hit_seq_member_id).getLong("homology_id");

            ref_object.put("alignment", alignment.get("ref"));
            hit_object.put("alignment", alignment.get("hit"));
//
            ref_object.put("sequence", alignment.get("ref_seq"));
            hit_object.put("sequence", alignment.get("hit_seq"));
//
            response.put("ref", ref_object);
            response.put("hit", hit_object);

            response.put("homology", alignment.get("type"));

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
