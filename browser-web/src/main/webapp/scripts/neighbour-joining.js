/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 06/06/2014
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */

var tree = [];
var nj_matrix = [];
//

var nj_gene_list = []
var nj_string_tree = ""
//var nj_matrix =
//    [
//        [100],
//        [0.23, 100],
//        [0.16, 0.23, 100],
//        [0.20, 0.17, 0.15, 100],
//        [0.17, 0.24, 0.11, 0.21, 100]
//    ];

var q_matrix = [];
function findFurthestNode() {

    var max_score = 0;
    var max_i = 0;
    var max_j = 0;
    for (var i = 0; i < q_matrix.length; i++) {
        for (var j = 0; j < i; j++) {
            if (parseFloat(q_matrix[i][j]) < parseFloat(max_score)) {
                max_score = q_matrix[i][j];
                max_i = i;
                max_j = j;
            }
        }
    }

//
    console.log(nj_gene_list)

    var new_node = "(" + nj_gene_list[max_i] + "," + nj_gene_list[max_j] + ")"
    nj_gene_list[nj_gene_list.length] = new_node

    console.log(nj_string_tree)


    console.log(nj_gene_list)

    nj_gene_list.splice(max_i, 1)

    nj_gene_list.splice(max_j, 1)

    nj_string_tree = new_node + ";"

    console.log(nj_gene_list)

    console.log(nj_string_tree)
    if (q_matrix.length > 2) {
        calculateNJMatrix(max_i, max_j);
    } else {
        var dataObject = { newick: nj_string_tree };


        var width = jQuery(document).width()/5;

        var height = 1000

        var phylocanvas = new Smits.PhyloCanvas(
            dataObject,
            'gene_tree_nj',
            1000, 500

        );
    }
}

function calculateQMatrix() {
   q_matrix = [];

    console.log("q matrix")
    for (var i = 0; i < nj_matrix.length; i++) {
        q_matrix[i] = [];

        for (var j = 0; j < i; j++) {
            q_matrix[i][j] = (nj_matrix.length - 2) * nj_matrix[i][j] - sigma(i) - sigma(j)
        }
    }

    console.log("print q matrix")

    for (var i = 0; i < nj_matrix.length; i++) {

        console.log(q_matrix[i]);
    }

    findFurthestNode()
}

function sigma(a) {
    var sigma = 0;
    for (var i = 0; i < nj_matrix.length; i++) {
        if (a != i) {
            if (nj_matrix[a][i]) {
                sigma += nj_matrix[a][i];
            }
            else {
                sigma += nj_matrix[i][a];

            }
        }
    }


    return sigma
}

function calculateNJMatrix(a, b) {

    console.log("calculate nj matrix")
    var temp_nj_matrix = nj_matrix;
    nj_matrix = [];
    var k = 0;
    for (var i = 0; i < temp_nj_matrix.length; i++) {
        if (i == a || i == b) {

        }
        else {
            nj_matrix[k] = [];
            var l = 0;
            for (var j = 0; j < i; j++) {
                if (j == a || j == b) {

                }
                else {
                    nj_matrix[k][l] = temp_nj_matrix[i][j]
                    l++;
                }
            }
            k++;

        }
    }

    nj_matrix[nj_matrix.length] = [];

    k = 0;
    for (var i = 0; i < temp_nj_matrix.length; i++) {
        var x, y;
        if (i == a || i == b) {
        } else {

            if (temp_nj_matrix[i][a]) {
                x = temp_nj_matrix[i][a]
            } else {
                x = temp_nj_matrix[a][i]
            }


            if (temp_nj_matrix[i][b]) {
                y = temp_nj_matrix[i][b]
            } else {
                y = temp_nj_matrix[b][i]
            }


            var z = temp_nj_matrix[a][b]

            nj_matrix[nj_matrix.length - 1][k] = (x + y - z) / 2;
            k++;
        }
    }

    console.log("final NJ \n ===================")
    for (var j = 0; j < nj_matrix.length; j++) {
        console.log(nj_matrix[j])
    }

    console.log(" ===================")

calculateQMatrix();
}




