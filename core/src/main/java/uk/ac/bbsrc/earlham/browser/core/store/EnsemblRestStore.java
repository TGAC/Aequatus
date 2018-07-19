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

package uk.ac.bbsrc.earlham.browser.core.store;

import net.sf.json.JSONObject;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

/**
 * Created by IntelliJ IDEA.
 * User: thankia
 * Date: 13-Aug-2013
 * Time: 10:10:33
 * To change this template use File | Settings | File Templates.
 */
public interface EnsemblRestStore extends Store<String> {
    JSONObject getSpecies() throws IOException;
    JSONObject searchGenes(String keyword, String species) throws IOException, InterruptedException;
    JSONObject getGeneTree(String id, String species) throws IOException, ParserConfigurationException, SAXException, InterruptedException;
    JSONObject getHomology(String id, String species) throws IOException;
    JSONObject getGenes(JSONObject ids, Boolean expand) throws IOException, InterruptedException;
    JSONObject getGene(String id, Boolean expand) throws IOException, InterruptedException;
    JSONObject testRestAPI() throws IOException;
    JSONObject getRestAPIversion() throws IOException;
    JSONObject getReleaseversion() throws IOException;
    boolean getInfoforHomolog(String query, String ref) throws IOException;
    JSONObject getPairwiseAlignment(String query, String hit) throws IOException;
    }
