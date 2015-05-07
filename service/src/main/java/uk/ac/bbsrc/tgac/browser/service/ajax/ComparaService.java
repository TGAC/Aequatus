package uk.ac.bbsrc.tgac.browser.service.ajax;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sourceforge.fluxion.ajax.Ajaxified;
import net.sourceforge.fluxion.ajax.util.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import uk.ac.bbsrc.tgac.browser.core.store.ComparaStore;
//import uk.ac.bbsrc.tgac.browser.core.store.EnsemblRestStore;

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

    @Autowired
//    private EnsemblRestStore ensemblRestStore;

    public void setComparaStore(ComparaStore comparaStore) {
        this.comparaStore = comparaStore;
    }

//    public void setEnsemblRestStore(EnsemblRestStore ensemblRestStore) {
//        this.ensemblRestStore = ensemblRestStore;
//    }
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
        String trackId = json.getString("trackid");
        String trackName = json.getString("trackname");

        long start = json.getInt("start");
        long end = json.getInt("end");
//        int delta = json.getInt("delta");
        response.put("trackname", trackName);
        int count;
        try {
            Integer queryid = comparaStore.getDnafragId(seqName, reference);
            if (trackId.indexOf("homology") >= 0) {
                log.info("\n\n\n\ntest" + trackId + ":" + trackId.replaceAll("homology", ""));
                response.put(trackName, comparaStore.getMember(seqName, start, end, trackId.replaceAll("homology", "")));
            } else if (trackId.indexOf("genomic_align") >= 0) {
                if (comparaStore.countGenomicAlign(queryid, start, end, trackId) < 1000) {
                    log.info("\n\n\n\ntest" + trackId + ":" + trackId.replaceAll("genomic_align", ""));
                    response.put("count", comparaStore.countGenomicAlign(queryid, start, end, trackId.replaceAll("genomic_align", "")));
                    response.put(trackName, comparaStore.getGenomicAlign(queryid, start, end, trackId.replaceAll("genomic_align", "")));
                } else {
//                response.put("type", "graph");
//                response.put("count", comparaStore.countGenomicAlign(queryid, start, end, trackId));
//                response.put(trackName, comparaStore.getGenomicAlignGraph(queryid, start, end));
                }
            } else {
                response.put("count", "babaji ka thulu");
                response.put("babaji ka thulu", "babaji ka thulu");
            }

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

    public JSONObject getMember(HttpSession session, JSONObject json) {
        String chr_name = json.getString("chr_name");
        JSONObject response = new JSONObject();
        String genome_id = json.getString("reference");


//        int delta = json.getInt("delta");
        response.put("trackname", "member");
        int count;
        try {

            response.put("chr_length", comparaStore.getChromosomeLength(chr_name, genome_id));
            response.put("member", comparaStore.getAllMember(chr_name, genome_id));
            response.put("overview", comparaStore.getOverviewAllMember(chr_name, genome_id));


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
        String reference = json.getString("reference");


//        int delta = json.getInt("delta");
        response.put("trackname", "member");
        int count;
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

    public JSONObject getCoreMember(HttpSession session, JSONObject json) {
        String query = json.getString("query");
        JSONObject response = new JSONObject();


//        int delta = json.getInt("delta");
        response.put("trackname", "member");
        int count;
        try {
            response.put("ref", comparaStore.getRefDetail(query));

            response.put("member", comparaStore.getGeneTreeforMember(query));

            response.put("tree", comparaStore.getGeneTree(query));


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
        JSONObject response = new JSONObject();


//        int delta = json.getInt("delta");
        response.put("trackname", "member");
        int count;
        try {
            return comparaStore.getInfoforMember(query);
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

        ref = comparaStore.getGenomeId(ref).getString("ref");
        response.put("ref", "member");
        try {
            return comparaStore.getChrId(query, ref);
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
            String member_id = comparaStore.getMemberId(query);
            String ref = comparaStore.getReferencefromStableId(query);
            String dnafrag = comparaStore.getDnafragIdfromStableId(query);
            response.put("member_id", member_id);
            response.put("ref", ref);
            response.put("dnafrag", dnafrag);


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
        String chr = json.getString("chr");

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

}
