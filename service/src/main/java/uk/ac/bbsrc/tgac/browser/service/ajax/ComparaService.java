package uk.ac.bbsrc.tgac.browser.service.ajax;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sourceforge.fluxion.ajax.Ajaxified;
import net.sourceforge.fluxion.ajax.util.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import uk.ac.bbsrc.tgac.browser.core.store.ComparaStore;

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
                response.put("parent",comparaStore.getGenomeNamefromId(parent_id));
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
                response.put("parent",comparaStore.getGenomeNamefromId(parent_id));
                response.put("tracklists", comparaStore.getAllGenomeIdforReference(parent_id));
//                response.put("coord_sys", sequenceStore.getCoordSys(seqName));
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
             JSONArray genomes =  new JSONArray();
            genomes = comparaStore.getAllGenomeId("");

             response.put("genomes", genomes);

            return response;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    /**
     * Returns JSONObject as first key track name and second key with tracks detail
     * <p>
     * It checks for the trackId
     * if it contains keyword like .sam or .bam call method getSamBam
     * if it contains keyword like .wig call method getWig
     * if it contains keyword like cs then call method getAssembly
     * if it contains keyword like repeat then call method getRepeat
     * if it contains keyword like gene then call method getGene
     * or last it call method getHit
     * </p>
     * <p>
     * for genes if result is more than 1000 it will return result in form of graphs
     * for repeats and hits if result is more than 5000 it will return result in form of graphs
     * </p>
     *
     * @param session an HTTPSession comes from ajax call
     * @param json    json object with key parameters sent from ajax call
     * @return JSONObject as first key track name and second key with tracks detail
     */

    public JSONObject loadTrack(HttpSession session, JSONObject json) {
        String seqName = json.getString("query");
        JSONObject response = new JSONObject();
        int reference = json.getInt("reference");
        int trackId = json.getInt("trackid");
        String trackName = json.getString("trackname");

        long start = json.getInt("start");
        long end = json.getInt("end");
//        int delta = json.getInt("delta");
        response.put("trackname", trackName);
        int count;
        try {
            Integer queryid = comparaStore.getDnafragId(seqName, reference);
            response.put(trackName,comparaStore.getAllMember(seqName, start, end));
//            if(comparaStore.countGenomicAlign(queryid, start, end, trackId)  < 1000){
//                response.put("count", comparaStore.countGenomicAlign(queryid, start, end, trackId));
//                response.put(trackName, comparaStore.getGenomicAlign(queryid, start, end, trackId));
//            }else{
//                response.put("type", "graph");
//                response.put("count", comparaStore.countGenomicAlign(queryid, start, end, trackId));
//                response.put(trackName, comparaStore.getGenomicAlignGraph(queryid, start, end));
//            }

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

}