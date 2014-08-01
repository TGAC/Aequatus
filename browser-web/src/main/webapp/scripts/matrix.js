/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 06/06/2014
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */



var distance_matrix =  [];
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
function calculateDistanceMatrix(gene_list_array, cigar_list_array) {

//    console.log("calculateDistanceMatrix")

    var cigar_list = []
    for (var i = 0; i < cigar_list_array.length; i++) {
     cigar_list.push(expand_cigar(cigar_list_array[i]))
    }

    var distance_matrix = [];

    distance_matrix[0] = [];
    distance_matrix[0][0] = 1
    for (var i = 1; i < gene_list_array.length; i++) {
        distance_matrix[i] = [];
        for (var j = 1; j < i; j++) {
            var score = 0;
            for (var k = 0; k < cigar_list[j].length; k++) {
                if (cigar_list[i].charAt(k) == cigar_list[j].charAt(k))// && homologous_cigar_string_array[j].charAt(k) == 'M')
                {
                    score++;
                }
            }

            distance_matrix[i][j] = score / cigar_list[i].length;
        }

        score = 0;

        for (var k = 0; k < cigar_list[i].length; k++) {
            if (cigar_list[i].charAt(k) == cigar_list[0].charAt(k))// && homologous_cigar_string_array[i].charAt(k) == 'M')
            {
                score++;
            }
        }

        distance_matrix[i][0] = score / cigar_list[i].length;
    }

//    console.log("=======")
//
//    for (var j = 0; j < distance_matrix.length; j++) {
//        console.log(distance_matrix[j])
//    }


    return distance_matrix;

}