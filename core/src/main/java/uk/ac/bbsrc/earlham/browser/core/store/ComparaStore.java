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

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.IOException;
import java.util.Map;


/**
 * Created by IntelliJ IDEA.
 * User: thankia
 * Date: 13-Aug-2013
 * Time: 11:10:23
 * To change this template use File | Settings | File Templates.
 */
public interface ComparaStore extends Store<String> {
    String getAllDnafragByGenomedbId(int query) throws IOException;
    JSONArray getAllGenomeId(String query) throws IOException;
    JSONArray setAllGenomeId(String[] query) throws IOException;
    JSONArray getGenomicAlignbyDnafragId(String query) throws IOException;
    JSONArray getGenomicAlignblockbyId(String query) throws IOException;
    int getReferenceLength(int query) throws IOException;
    String getReferenceName(int query) throws IOException;
    JSONArray getAllGenomeIdforReference(int query) throws IOException;
    int getDnafragearchsize(String query, int reference) throws IOException;
    int getDnafragId(String query, int reference) throws IOException;
    int getGenomeIdfromDnafragId(int query) throws IOException;
    String getGenomeNamefromId(int query) throws IOException;
    JSONArray getAllDnafragByName(String query, int reference) throws IOException;
    JSONArray getGenomicAlign(int query, long start, long end, String mlssid) throws IOException;
    int countGenomicAlign(int query, long start, long end, String mlssid) throws IOException;
    JSONArray getGenomicAlignGraph(int query, long start, long end) throws IOException;
    JSONArray getMember(String query, long start, long end, String trackId) throws IOException;
    JSONArray getHomologybyMLSSI(String query, long start, long end, String trackId) throws IOException;
    JSONArray getAllMember(int query, int genome_db) throws IOException;
    JSONArray getOverviewAllMember(int query, int genome_db) throws IOException;
    JSONArray getAllChromosome(int query) throws IOException;
    int getChromosomeLength(int chr_id, int genome_id) throws IOException;
    JSONObject getGeneTreeforMember(String query) throws IOException;
    JSONObject getRefMember(String query) throws IOException;
    JSONArray searchMember(String query) throws IOException;
    JSONArray searchMember(String query, String species) throws IOException;
    Map getGeneTree(String query) throws IOException;
    int countGeneTreeforMember(String query) throws IOException;
    JSONObject getInfoforMember(String query) throws IOException;
    boolean getInfoforHomolog(int ref, int hit) throws IOException;
    JSONObject getGenomeId(String query) throws IOException;
    JSONObject getChrId(String query, int ref) throws IOException;
    int getGeneMemberId(String query) throws Exception;
    int getSeqMemberId(String query) throws Exception;
    int getReferencefromStableId(String query) throws IOException;
    int getDnafragIdfromStableId(String query) throws IOException;
    String getDnafragnamefromId(int query) throws IOException;
    String getRefStableID(String query) throws Exception;
    Map<String, Object> getGeneMemberInfofromID(String query) throws Exception;
    JSONObject findSynteny (long query, int delta) throws Exception;
    String getRefPtnStableID(String query) throws Exception;
    JSONArray findHomology(String query) throws Exception;
    int getGeneMemberIDfromStableID(String query) throws Exception;
    int getSeqMemberIDfromGeneMemberID(int gene_member_id) throws Exception;
    int getSeqMemberIDfromStableID(String query) throws Exception;
    String getGenomefromSeqMemberID(int stable_id) throws Exception;
    String getGenomefromGeneMemberID(long gene_member_id) throws Exception;
    int getGeneMemberIDfromSeqMemberID(int seq_member_id) throws Exception;
    String getSeqStableIDfromSeqMemberID(int seq_member_id) throws Exception;
    JSONObject getPairwiseAlignment(int ref, int query) throws Exception;
    JSONObject getHomologyID(int ref, int query) throws Exception;
    String getHomologyType(long homology_id) throws Exception;
    String getSeq(int seq_member_id)  throws Exception;
    String getGeneStableIDfromGeneMemberID(long gene_member_id) throws Exception;
    long getCenralGeneMemberID(int genome_db_id, String chr,int start, int end) throws Exception;
    }
