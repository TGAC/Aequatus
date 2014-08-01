/**
 * Created with IntelliJ IDEA.
 * User: thankia
 * Date: 06/06/2014
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */

var nj_string_tree = ""
//var nj_matrix =
//    [
//        [100],
//        [0.23, 100],
//        [0.16, 0.23, 100],
//        [0.20, 0.17, 0.15, 100],
//        [0.17, 0.24, 0.11, 0.21, 100]
//    ];

function findFurthestNode(nj_matrix, gene_list_main) {

//    console.log("findfurthestnode")
//
//    console.log(nj_matrix)

    var q_matrix = [];
//
//
//    console.log("q matrix")
    for (var i = 0; i < nj_matrix.length; i++) {
        q_matrix[i] = [];

        for (var j = 0; j < i; j++) {
            q_matrix[i][j] = (nj_matrix.length - 2) * nj_matrix[i][j] - sigma(nj_matrix, i) - sigma(nj_matrix, j)
        }
    }

//    console.log("Q \n ===================")
//    for (var j = 0; j < q_matrix.length; j++) {
//        console.log(q_matrix[j])
//    }
//
//    console.log(" ===================")



    var nj_gene_list = gene_list_main.slice(0);

    var min_score = null;
    var min_i = null;
    var min_j = null;
    for (var i = 1; i < q_matrix.length; i++) {
        for (var j = 1; j < i; j++) {
            if (parseFloat(q_matrix[i][j]) > parseFloat(min_score)){}else {
                min_score = q_matrix[i][j];
                min_i = i;
                min_j = j;
            }
        }
    }

    if( min_score != null){
        var new_node = "(" + nj_gene_list[min_i] + "," + nj_gene_list[min_j] + ")"
    nj_gene_list[nj_gene_list.length] = new_node

    nj_gene_list.splice(min_i, 1)

    nj_gene_list.splice(min_j, 1)

    nj_string_tree = new_node + ";"

    console.log(nj_string_tree)
//
////

    }
    else{
        console.log("gene list");

        console.log(nj_gene_list)

        var new_node = "(" + nj_gene_list[0] + "," + nj_gene_list[1] + ")"
        nj_string_tree = new_node + ";"

    }

    if (q_matrix.length > 2) {
    calculateNJMatrix(nj_matrix, min_i, min_j, nj_gene_list);
    } else {
        console.log("Newick");

        console.log(nj_string_tree);


        var tree = nwk.parser.parse(nj_string_tree);

        var json_tree = nwk.converter.toJSON(tree)

//        console.log("here")

        json_tree = json_tree.replace(/\\/g,"")

        json_tree = json_tree.replace(/"\[/g,"[")
        json_tree = json_tree.replace(/]"/g,"]")
//        json_tree = json_tree..split(', "children": []').join(""); //replace(/, "children": \[]"/g,"")

        console.log(json_tree)

        drawTree(JSON.parse(json_tree))

//        console.log("here2")

//        var dataObject = { newick: nj_string_tree };
//
//
//        var width = jQuery(document).width()/5;
//
//        var height = 1000
//
//        var phylocanvas = new Smits.PhyloCanvas(
//            dataObject,
//            'gene_tree_nj',
//            100, 500
//
//        );
        return nj_string_tree;
    }
}
//
function calculateQMatrix(nj_matrix, gene_list) {
    var q_matrix = [];

    console.log("q matrix")
    for (var i = 0; i < nj_matrix.length; i++) {
        q_matrix[i] = [];

        for (var j = 0; j < i; j++) {
            q_matrix[i][j] = (nj_matrix.length - 2) * nj_matrix[i][j] - sigma(nj_matrix, i) - sigma(nj_matrix, j)
        }
    }

//    console.log("print q matrix")
//
//    for (var i = 0; i < nj_matrix.length; i++) {
//
//        console.log(q_matrix[i]);
//    }

    return findFurthestNode(nj_matrix, q_matrix, gene_list)
}

function sigma(nj_matrix, a) {
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

function calculateNJMatrix(nj_matrix, a, b, gene_list) {

//    console.log("calculate nj matrix "+a+" "+b)
    var temp_nj_matrix = nj_matrix.slice(0);
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

//    console.log("NJ \n ===================")
//    for (var j = 0; j < nj_matrix.length; j++) {
//        console.log(nj_matrix[j])
//    }
//
//    console.log(" ===================")

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

//    console.log("final NJ \n ===================")
//    for (var j = 0; j < nj_matrix.length; j++) {
//        console.log(nj_matrix[j])
//    }
//
//    console.log(" ===================")
//
//    console.log(gene_list)

//    var r = confirm("Press a button");
//    if (r == true) {
        findFurthestNode(nj_matrix, gene_list);
//    } else {
//    }
}
