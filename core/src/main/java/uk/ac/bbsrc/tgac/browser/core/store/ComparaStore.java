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

package uk.ac.bbsrc.tgac.browser.core.store;

import net.sf.json.JSONArray;

import java.io.IOException;
import java.util.List;
import java.util.Map;


/**
 * Created by IntelliJ IDEA.
 * User: thankia
 * Date: 13-Aug-2013
 * Time: 11:10:23
 * To change this template use File | Settings | File Templates.
 */
public interface ComparaStore extends Store<String> {
    public String getAllDnafragByGenomedbId(int query) throws IOException;
    public JSONArray getAllGenomeId(String query) throws IOException;
    public JSONArray getGenomicAlignbyDnafragId(String query) throws IOException;
    public JSONArray getGenomicAlignblockbyId(String query) throws IOException;
    public int getReferenceLength(int query) throws IOException;
    public String getReferenceName(int query) throws IOException;
    public JSONArray getAllGenomeIdforReference(int query) throws IOException;
    public int getDnafragearchsize(String query, int reference) throws IOException;
    public int getDnafragId(String query, int reference) throws IOException;
    public int getGenomeIdfromDnafragId(int query) throws IOException;
    public String getGenomeNamefromId(int query) throws IOException;
    public JSONArray getAllDnafragByName(String query, int reference) throws IOException;
    public JSONArray getGenomicAlign(int query, long start, long end, String mlssid) throws IOException;
    public int countGenomicAlign(int query, long start, long end, String mlssid) throws IOException;
    public JSONArray getGenomicAlignGraph(int query, long start, long end) throws IOException;
    public JSONArray getAllMember(String query, long start, long end) throws IOException;

}
