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
    console.log("matrix")
    console.log(stable)
    var gapped_seq = ""

    cigar = expand_cigar(cigar)

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
    console.log("calculateDNADistanceMatrix")
    var nj_matrix = [];
    var upgma_matrix = [];

    nj_matrix[0] = [];
    nj_matrix[0][0] = 1

    upgma_matrix[0] = []
    upgma_matrix[0][0] = 1

    var match = 0;
    var missmatch = 0;
    var gap = 0;
    for (var i = 1; i < gene_list_array.length; i++) {
        nj_matrix[i] = [];
        upgma_matrix[i] = []
        for (var j = 1; j < i; j++) {
            match = 0;
            missmatch = 0;
            gap = 0;
            for (var k = 0; k < gapped_seq_list[j].length; k++) {
                if (gapped_seq_list[j].charAt(k) == gapped_seq_list[0].charAt(k) && gapped_seq_list[j].charAt(k) != '-')
                {
                    match++
                }
                else if (gapped_seq_list[j].charAt(k) == gapped_seq_list[0].charAt(k))
                {
                    gap++
                }
                else {
                    missmatch++;
                }
            }



            nj_matrix[i][j] = missmatch / (match+missmatch);
            upgma_matrix[i][j] = missmatch / (match+missmatch);
        }

         match = 0;
         missmatch = 0;
         gap = 0;

        for (var k = 1; k < gapped_seq_list[i].length; k++) {
            if (gapped_seq_list[i].charAt(k) == gapped_seq_list[0].charAt(k) && gapped_seq_list[i].charAt(k) == '-')
            {
                match++

            } else if (gapped_seq_list[i].charAt(k) == gapped_seq_list[0].charAt(k))
            {
                gap++

            } else {
                missmatch++;
            }
        }
//

        nj_matrix[i][0] = missmatch / (match+missmatch);
        upgma_matrix[i][0] = missmatch / (match+missmatch);

    }


    for (var j = 0; j < nj_matrix.length; j++) {
        console.log(nj_matrix[j])
    }


    console.log("=======")




    return nj_matrix;

}

function expand_cigar(cigar) {
    var cigar_string = "";
    cigar = cigar.replace(/([SIXMND])/g, ":$1,");
    var cigars_array = cigar.split(',');
    for (var i = 0; i < cigars_array.length - 1; i++) {

        var cigar = cigars_array[i].split(":");
        var key = cigar[1];
        var length = cigar[0] * 3;
        if (!length) {
            length = 3
        }
        while (length--) {
            cigar_string += key;
        }

        cigar_string += "";
    }

    return cigar_string;
}