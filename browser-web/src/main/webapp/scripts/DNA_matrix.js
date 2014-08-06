/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 06/06/2014
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */


var gene_list = [];
var string_tree = "";

var nj_matrix = [];

var amino_acids = ["A", "R", "N", "D", "C", "Q", "E", "G", "H", "I", "L", "K", "M", "F", "P", "S", "T", "W", "Y", "V", "B", "Z", "X", "-"];

var blosum_62 = [
    [4, -1, -2, -2, 0, -1, -1, 0, -2, -1, -1, -1, -1, -2, -1, 1, 0, -3, -2, 0, -2, -1, 0, 1],
    [-1, 5, 0, -2, -3, 1, 0, -2, 0, -3, -2, 2, -1, -3, -2, -1, -1, -3, -2, -3, -1, 0, -1, 1],
    [-2, 0, 6, 1, -3, 0, 0, 0, 1, -3, -3, 0, -2, -3, -2, 1, 0, -4, -2, -3, 3, 0, -1, 1],
    [-2, -2, 1, 6, -3, 0, 2, -1, -1, -3, -4, -1, -3, -3, -1, 0, -1, -4, -3, -3, 4, 1, -1, 1],
    [0, -3, -3, -3, 9, -3, -4, -3, -3, -1, -1, -3, -1, -2, -3, -1, -1, -2, -2, -1, -3, -3, -2, 1],
    [-1, 1, 0, 0, -3, 5, 2, -2, 0, -3, -2, 1, 0, -3, -1, 0, -1, -2, -1, -2, 0, 3, -1, 1],
    [-1, 0, 0, 2, -4, 2, 5, -2, 0, -3, -3, 1, -2, -3, -1, 0, -1, -3, -2, -2, 1, 4, -1, 1],
    [0, -2, 0, -1, -3, -2, -2, 6, -2, -4, -4, -2, -3, -3, -2, 0, -2, -2, -3, -3, -1, -2, -1, 1],
    [-2, 0, 1, -1, -3, 0, 0, -2, 8, -3, -3, -1, -2, -1, -2, -1, -2, -2, 2, -3, 0, 0, -1, 1],
    [-1, -3, -3, -3, -1, -3, -3, -4, -3, 4, 2, -3, 1, 0, -3, -2, -1, -3, -1, 3, -3, -3, -1, 1],
    [-1, -2, -3, -4, -1, -2, -3, -4, -3, 2, 4, -2, 2, 0, -3, -2, -1, -2, -1, 1, -4, -3, -1, 1],
    [-1, 2, 0, -1, -3, 1, 1, -2, -1, -3, -2, 5, -1, -3, -1, 0, -1, -3, -2, -2, 0, 1, -1, 1],
    [-1, -1, -2, -3, -1, 0, -2, -3, -2, 1, 2, -1, 5, 0, -2, -1, -1, -1, -1, 1, -3, -1, -1, 1],
    [-2, -3, -3, -3, -2, -3, -3, -3, -1, 0, 0, -3, 0, 6, -4, -2, -2, 1, 3, -1, -3, -3, -1, 1],
    [-1, -2, -2, -1, -3, -1, -1, -2, -2, -3, -3, -1, -2, -4, 7, -1, -1, -4, -3, -2, -2, -1, -2, 1],
    [1, -1, 1, 0, -1, 0, 0, 0, -1, -2, -2, 0, -1, -2, -1, 4, 1, -3, -2, -2, 0, 0, 0, 1],
    [0, -1, 0, -1, -1, -1, -1, -2, -2, -1, -1, -1, -1, -2, -1, 1, 5, -2, -2, 0, -1, -1, 0, 1],
    [-3, -3, -4, -4, -2, -2, -3, -2, -2, -3, -2, -3, -1, 1, -4, -3, -2, 11, 2, -3, -4, -3, -2, 1],
    [-2, -2, -2, -3, -2, -1, -2, -3, 2, -1, -1, -2, -1, 3, -3, -2, -2, 2, 7, -1, -3, -2, -1, 1],
    [0, -3, -3, -3, -1, -2, -2, -3, -3, 3, 1, -2, 1, -1, -2, -2, 0, -3, -1, 4, -3, -2, -1, 1],
    [-2, -1, 3, 4, -3, 0, 1, -1, 0, -3, -4, 0, -3, -3, -2, 0, -1, -4, -3, -3, 4, 1, -1, 1],
    [-1, 0, 0, 1, -3, 3, 4, -2, 0, -3, -3, 1, -1, -3, -1, 0, -1, -3, -2, -2, 1, 4, -1, 1],
    [0, -1, -1, -1, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -2, 0, 0, -2, -1, -1, -1, -1, -1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
//
//var nj_matrix =
//    [
//        [100],
//        [6, 100],
//        [10, 10, 100],
//        [10, 10, 2, 100],
//        [10, 10, 6, 6, 100]
//    ];

//var nj_matrix =
//    [
//        [100],
//        [19, 100],
//        [27, 31, 100],
//        [8, 18, 26, 100],
//        [33, 36, 41, 31, 100],
//        [18, 1, 32, 17, 35, 100],
//        [13, 13, 29, 14, 28, 12, 100]
//    ];

function expand_DNA_seq(seq, cigar, stable) {
    var gapped_seq = ""

    cigar = expand_cigar(cigar, 1)

//    seq = convertPeptide(seq)
    var j = 0;


    for (var i = 0; i < cigar.length; i++) {
        if (cigar.charAt(i) == "M") {
            gapped_seq += seq.charAt(j)
            j++;
        } else {
            gapped_seq += "-"
        }
    }


    return gapped_seq;
}
function calculateDNADistanceMatrix(gene_list_array, gapped_seq_list) {

//    gene_list_array = ['A','B', 'C']
//    gapped_seq_list = ['ACHACTAG-DHCAH','ACHACTADYH-CAH','ACH-ACTAADHCAH']
    var nj_matrix = [];
    var upgma_matrix = [];

    nj_matrix[0] = [];
    nj_matrix[0][0] = 1

    upgma_matrix[0] = []
    upgma_matrix[0][0] = 1


    var gap = false;

    for (var i = 1; i < gene_list_array.length; i++) {

        nj_matrix[i] = [];
        upgma_matrix[i] = []
        for (var j = 1; j < i; j++) {

            var score = 0
            for (var k = 0; k < gapped_seq_list[j].length; k++) {

                var k_seq = gapped_seq_list[j].charAt(k)
                var l = amino_acids.indexOf(k_seq);
                var m = amino_acids.indexOf(gapped_seq_list[0].charAt(k))
                if (l >= 0 && m >= 0) {
                    if (k_seq == "-") {
                        if (gap) {
                            score += blosum_62[l][m];
                        } else {
                            gap = true;
                            score += 11;
                        }
                    } else {
                        gap = false;
                        score += -1 * blosum_62[l][m];
                    }
                }
            }


            nj_matrix[i][j] = score / gapped_seq_list[j].length;
            upgma_matrix[i][j] = score / gapped_seq_list[j].length;
        }


        var score = 0

        for (var k = 0; k < gapped_seq_list[i].length; k++) {
            var k_seq = gapped_seq_list[i].charAt(k)
            var l = amino_acids.indexOf(k_seq);
            var m = amino_acids.indexOf(gapped_seq_list[0].charAt(k))
            if (l >= 0 && m >= 0) {
                score += -1 * blosum_62[l][m];

            }
        }
        nj_matrix[i][0] = score / gapped_seq_list[i].length;
        upgma_matrix[i][0] = score / gapped_seq_list[i].length;
    }


//    for (var j = 0; j < nj_matrix.length; j++) {
//        console.log(gene_list_array[j] + " " + nj_matrix[j])
//    }
    return nj_matrix;

}

function expand_cigar(cigar, delimiter) {
    var cigar_string = "";
    cigar = cigar.replace(/([SIXMND])/g, ":$1,");
    var cigars_array = cigar.split(',');
    for (var i = 0; i < cigars_array.length - 1; i++) {

        var cigar = cigars_array[i].split(":");
        var key = cigar[1];
        var length = cigar[0] * delimiter;
        if (!length) {
            length = delimiter
        }
        while (length--) {
            cigar_string += key;
        }

        cigar_string += "";
    }

    return cigar_string;
}