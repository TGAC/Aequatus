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
 * Time: 10:10:33
 * To change this template use File | Settings | File Templates.
 */
public interface EnsemblCoreStore extends Store<String> {
    public String getSeqBySeqRegionId(int query) throws IOException;
    public Integer getSeqRegion(String query) throws IOException;
    public String getSeqLengthbyId(int query) throws IOException;
    public String getSeqRegionName(int query) throws IOException;
    public String getLogicNameByAnalysisId(int query) throws IOException;
    public String getDescriptionByAnalysisId(int query) throws IOException;
    public Map<String, Object> getStartEndAnalysisIdBySeqRegionId(int query) throws IOException;
    //  public Map<String,Object> getHit(int query) throws IOException;
    public JSONArray getGenesSearch(String query) throws IOException;
    public JSONArray getTranscriptSearch(String query) throws IOException;
    public JSONArray getGOSearch(String query) throws IOException;
    public List<Map<String, Object>> getHit(int query, String trackId, long start, long end) throws IOException;
    public JSONArray processHit(List<Map<String, Object>> maps, long start, long end, int delta, int id, String trackId) throws IOException;
    public JSONArray getHitGraph(int id, String trackId, long start, long end) throws IOException;
    public JSONArray getAnnotationId(int query) throws IOException;
    public JSONArray getAnnotationIdList(int query) throws IOException;
    public String getTrackDesc(String query) throws IOException;
    public List<Map> getTrackInfo() throws IOException;
    public List<Map<String, Object>> getGenes(int query, String trackId) throws IOException;
    public JSONArray processGenes(List<Map<String, Object>> maps, long start, long end, int delta, int id, String trackId) throws IOException;
    public JSONArray getGeneGraph(int id, String trackId, long start, long end) throws IOException;
    public JSONArray getTableswithanalysis_id() throws IOException;
    public JSONArray getdbinfo() throws IOException;
    public String getDomains(String geneid) throws IOException;
    public String getSeq(String query, int from, int to) throws IOException;
    public JSONArray getAssembly(int query, String trackId, int delta) throws IOException;
    public JSONArray getSeqRegionSearch(String query) throws IOException;
    public JSONArray getSeqRegionSearchMap(String query) throws IOException;
    public JSONArray getSeqRegionIdSearch(String query) throws IOException;
    public int getSeqRegionearchsize(String query) throws IOException;
    public Integer getSeqRegionforone(String searchQuery) throws IOException;
    public Integer getSeqRegionCoordId(String query) throws IOException;
    public String getGeneNamefromId(int geneID) throws IOException;
    public String getTranscriptNamefromId(int transcriptID) throws IOException;
    public String getTrackIDfromName(String trackName) throws IOException;
    public String getHitNamefromId(int hitID) throws IOException;
    public int countHit(int id, String trackId, long start, long end);
    public int countGene(int id, String trackId, long start, long end);
    public int countRepeat(int id, String trackId, long start, long end);
    public List<Map<String, Object>> getRepeat(int query, String trackId, long start, long end) throws IOException;
    public JSONArray processRepeat(List<Map<String, Object>> maps, long start, long end, int delta, int id, String trackId) throws IOException;
    public JSONArray getRepeatGraph(int id, String trackId, long start, long end) throws IOException;
    public JSONArray getMarker() throws IOException;
    public boolean checkChromosome() throws Exception;
    public String getCoordSys(String query) throws Exception;
    public int countAssembly(int id, String trackId, long start, long end);
    public JSONArray getAssemblyGraph(int id, String trackId, long start, long end) throws IOException;
}
