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

    protected static final Logger log = LoggerFactory.getLogger(ComparaService.class);
    @Autowired
    private EnsemblRestStore ensemblRestStoreStore;

    public void setEnsemblRestStore(EnsemblRestStore ensemblRestStoreStore) {
        this.ensemblRestStoreStore = ensemblRestStoreStore;
    }
    public JSONObject getGenomes(HttpSession session, JSONObject json) {

        log.info("\n\n\n restservices getGenomes");

        JSONObject response = new JSONObject();
        try {
            JSONObject genomes = new JSONObject();

            genomes = ensemblRestStoreStore.getSpecies();

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
            JSONObject genomes = new JSONObject();

            genomes = ensemblRestStoreStore.searchGenes(keyword, species);

            return genomes;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    public JSONObject getGeneTree(HttpSession session, JSONObject json) {

        log.info("\n\n\n restservices searchGenes");
        String id = json.getString("id");
        String species = json.getString("species");

        JSONObject response = new JSONObject();
        try {
            JSONObject genetree = new JSONObject();

            genetree = ensemblRestStoreStore.getGeneTree(id, species);

            return genetree;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        }

    }

    public JSONObject getHomologyForMember(HttpSession session, JSONObject json) {
        String id = json.getString("id");
        String species = json.getString("species");
        JSONObject response = new JSONObject();



        response.put("trackname", "homology");
        try {
            response.put("ref", ensemblRestStoreStore.getGene(id, false));
//            response.put("refSpecies", comparaStore.getGeneMemberInfofromID(query));
            response.put("homology", ensemblRestStoreStore.getHomology(id, species).getJSONArray("homology"));
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return JSONUtils.SimpleJSONError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        return response;
    }

}
