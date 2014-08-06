/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 06/06/2014
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */

function findNearestNode(upgma_matrix, gene_list_main) {
    var string_tree = "";

    var gene_list = gene_list_main.slice(0);
    var min_score = 100;
    var min_i = 0;
    var min_j = 0;
    for (var i = 0; i < upgma_matrix.length; i++) {
        for (var j = 0; j < i; j++) {
            if (parseFloat(upgma_matrix[i][j]) < parseFloat(min_score)) {
                min_score = upgma_matrix[i][j];
                min_i = i;
                min_j = j;
            }
        }
    }

    var new_node = "(" + gene_list[min_i] + "," + gene_list[min_j] + ")"
    gene_list[gene_list.length] = new_node

    gene_list.splice(min_i, 1)

    gene_list.splice(min_j, 1)

    string_tree = new_node + ";"


    if (upgma_matrix.length > 2) {
        calculateUPGMAMatrix(upgma_matrix, min_i, min_j, gene_list);
    } else {

        var dataObject = { newick: string_tree };


        var width = jQuery(document).width() / 5;

        var height = 1000

        var phylocanvas = new Smits.PhyloCanvas(
            dataObject,
            'gene_tree_upgma',
            1000, 500);

        return string_tree;
    }
}

function calculateUPGMAMatrix(upgma_matrix, a, b, gene_list) {
    var temp_upgma_matrix = upgma_matrix;
    upgma_matrix = [];
    var k = 0;
    for (var i = 0; i < temp_upgma_matrix.length; i++) {
        if (i == a || i == b) {

        }
        else {
            upgma_matrix[k] = [];
            var l = 0;
            for (var j = 0; j < i; j++) {
                if (j == a || j == b) {

                }
                else {
                    upgma_matrix[k][l] = temp_upgma_matrix[i][j]
                    l++;
                }
            }
            k++;

        }
    }


    upgma_matrix[upgma_matrix.length] = [];

    k = 0;
    for (var i = 0; i < temp_upgma_matrix.length; i++) {
        var x, y;
        if (i == a || i == b) {
        } else {
            if (temp_upgma_matrix[i][a]) {
                x = temp_upgma_matrix[i][a]
            } else {
                x = temp_upgma_matrix[a][i]

            }

            if (temp_upgma_matrix[i][b]) {
                y = temp_upgma_matrix[i][b]
            } else {
                y = temp_upgma_matrix[b][i]
            }
            upgma_matrix[upgma_matrix.length - 1][k] = (x + y) / 2
            k++;
        }
    }

    findNearestNode(upgma_matrix, gene_list);
}




