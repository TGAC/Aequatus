/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 06/06/2014
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */

var distance_matrix = [];
function calculateDistanceMatrix(reference, homologous) {
    var ref_cigar = reference.cigarline;
    var cigar_string = "";
    ref_cigar = ref_cigar.replace(/([SIXMND])/g, ":$1,");
    var cigars_array = ref_cigar.split(',');

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

    var homologous_cigar_string_array = [];

    for (var i = 0; i < homologous.length; i++) {
        var homologous_cigar = homologous[i].cigarline;
        var homologous_cigar_string = "";
        homologous_cigar = homologous_cigar.replace(/([SIXMND])/g, ":$1,");
        var homologous_cigars_array = homologous_cigar.split(',');

        for (var j = 0; j < homologous_cigars_array.length - 1; j++) {

            var cigar = homologous_cigars_array[j].split(":");
            var key = cigar[1];
            var length = cigar[0] * 3;
            if (!length) {
                length = 3
            }
            while (length--) {
                homologous_cigar_string += key;
            }

            homologous_cigar_string += "";
        }

        homologous_cigar_string_array[i] = homologous_cigar_string;
    }

    distance_matrix = new Array(homologous_cigar_string_array.length);

    distance_matrix[0] = [];
    distance_matrix[0][0] = 1
    for (var i = 0; i < homologous_cigar_string_array.length; i++) {
        distance_matrix[i+1]= [];
        for (var j = 0; j < homologous_cigar_string_array.length; j++) {
            var score = 0;
            for (var k = 0; k < homologous_cigar_string_array[j].length; k++) {
                if (homologous_cigar_string_array[i].charAt(k) == homologous_cigar_string_array[j].charAt(k))// && homologous_cigar_string_array[j].charAt(k) == 'M')
                {
                    score++;
                }
            }

            distance_matrix[parseInt(i)+1][parseInt(j)+1] = score/homologous_cigar_string_array[i].length;
        }

        score = 0;

        for (var k = 0; k < homologous_cigar_string_array[i].length; k++) {
            if (homologous_cigar_string_array[i].charAt(k) == cigar_string.charAt(k))// && homologous_cigar_string_array[i].charAt(k) == 'M')
            {
                score++;
            }
        }

        distance_matrix[i+1][0] = score/homologous_cigar_string_array[i].length;
        distance_matrix[0][i+1] = score/homologous_cigar_string_array[i].length;
    }


    for(var j = 0; j< distance_matrix.length; j++){
        console.log(distance_matrix[j])
    }
}