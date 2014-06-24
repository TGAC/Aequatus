/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 06/06/2014
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */


var gene_list = [];
var string_tree = "";

var distance_matrix = [];
//
//var distance_matrix =
//    [
//        [100],
//        [6, 100],
//        [10, 10, 100],
//        [10, 10, 2, 100],
//        [10, 10, 6, 6, 100]
//    ];

//var distance_matrix =
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
    console.log(seq.length)
    console.log(cigar.replace(/D/g, "").length)
    for (var i = 0; i < cigar.length; i++) {
        if (cigar.charAt(i) == "M") {
            gapped_seq += seq.charAt(j)
            j++;
        } else {
            gapped_seq += "-"
        }
    }

    console.log(gapped_seq)
    return gapped_seq;
}
function calculateDNADistanceMatrix() {
    console.log("calculateDNADistanceMatrix()")
    var distance_matrix = [];
    var upgma_matrix = [];

    distance_matrix[0] = [];
    distance_matrix[0][0] = 1

    upgma_matrix[0] = []
    upgma_matrix[0][0] = 1
    for (var i = 1; i < gene_list_array.length; i++) {
        distance_matrix[i] = [];
        upgma_matrix[i] = []
        for (var j = 1; j < i; j++) {
            var score = 0;
            var dist_score = 0;
            for (var k = 0; k < gapped_seq_list[j].length; k++) {
                if (gapped_seq_list[j].charAt(k) == gapped_seq_list[0].charAt(k))// && homologous_cigar_string_array[j].charAt(k) == 'M')
                {
                    score++
                }
                else {
                    dist_score++;
                }
            }

            distance_matrix[i][j] = dist_score / gapped_seq_list[i].length;
            upgma_matrix[i][j] = score / gapped_seq_list[i].length;
        }

        score = 0;

        for (var k = 1; k < gapped_seq_list[i].length; k++) {
            if (gapped_seq_list[i].charAt(k) == gapped_seq_list[0].charAt(k))// && homologous_cigar_string_array[i].charAt(k) == 'M')
            {
                score++

            } else {
                dist_score++;
            }
        }
//
        distance_matrix[i][0] = dist_score / gapped_seq_list[i].length;
        upgma_matrix[i][0] = score / gapped_seq_list[i].length;

    }


    for (var j = 0; j < distance_matrix.length; j++) {
        console.log(distance_matrix[j])
    }


    console.log("=======")


    for (var j = 0; j < upgma_matrix.length; j++) {
        console.log(upgma_matrix[j])
    }

    console.log(gene_list)
    console.log(nj_gene_list)

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