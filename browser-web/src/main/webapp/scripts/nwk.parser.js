/*
 * A generic Newick hand-rolled tokenizer and recursive descent parser with options tailored for OneZoom style nwk strings (see grammar/grammar.specialized.gram)
 *
 * This parser accepts all valid forms of Newick, including unnamed nodes, no distances, and partial distances
 * Author: Bremen Braun (konapun) for TimeTree (www.timetree.org), 2013
 */
var nwk = {};
nwk.parser = {
    tokenize: function(src, tokens) { // I'm going to reuse this tokenizer for OneZoom name parsing later on, so tokens can be specified for specific uses
        tokens = tokens || {
            '(': /\(/,
            ')': /\)/,
            ':': /:/,
            ';': /;/,
            ',': /,/,
            'NUMBER': /\d+\.*\d*|\.\d+/, // optional beginning 0 for decimal numbers
            'STRING': /[a-zA-Z_\+\.\\\-\d'\s\[\]\*\/{}]+/, // your mileage with this regex may vary
        };

        var
            classify = function(tkn) {
                var tokenClass;
                Object.keys(tokens).some(function(key) {
                    var classifier = new RegExp(tokens[key]);

                    if (tkn.match(classifier)) {
                        tokenClass = key;
                        return true;
                    }
                });

                return tokenClass;
            },
            index = 0,
            regex = "";

        // Build the regex
        Object.keys(tokens).forEach(function(key) {
            var tokenizer = tokens[key];

            if (index > 0) {
                regex += '|';
            }

            regex += '(' + tokenizer.source + ')'; // capture separating tokens for classification
            index++;
        });

        // Tokenize the source string
        var
            tokenized = src.split(new RegExp(regex)),
            named = [];
        for (var i = 0; i < tokenized.length; i++) {
            var token = tokenized[i];
            if (token) { // skip undef and empty string
                named.push({
                    symbol: token,
                    type: classify(token)
                });
            }
        }

        return named; // tokens as classified symbols
    },

    /* A recursive descent parser */
    parse: function(srcOrTokens) {
        var tokens;
        if (Object.prototype.toString.call(srcOrTokens) === '[object Array]') { // parsing tokens
            tokens = srcOrTokens;
        }
        else {
            tokens = this.tokenize(srcOrTokens); // parsing source string
        }

        var
            enumerator = 0, // assign unique node IDs
            node = function() {
                this.id = enumerator++; // for debugging
                this.data = "";
                this.branchlength = 0;
                this.children = [];
            },
            currnode = null, // created on ( or ,
            root = null,
            currtok = tokens.shift(),
            scope = [], // stack of parent nodes, initially contains only the unnamed root

        // Parser utils
            accept = function(symbol) {
                if (currtok.type === symbol) {
                    var returnSym = currtok.symbol;
                    currtok = tokens.shift();
                    return returnSym;
                }

                return false;
            },
            expect = function(type) {
                var returnSym = currtok.symbol;
                if (accept(type)) {
                    return returnSym;
                }

                throw new Error("Unexpected symbol " + returnSym + ", expected " + type);
            },

        // Begin production rules
            length = function() {
                if (accept(':')) {
                    var len = expect('NUMBER');
                    currnode.branchlength = parseFloat(len);
                }
                // EMPTY - optional length
            },
            name = function() {
                var
                    nodename = currtok.symbol,
                    name = "";
                if (accept('STRING') || accept('NUMBER')) {
                    name = nodename;
                }
                // Else, empty - name not required

                return name;
            },
            branch = function() {
                subtree();
                length();
            },
            branchset = function() {
                branch();
                while (accept(',')) {
                    branch();
                }
            },
            internal = function() {
                if (accept('(')) {
                    var scopeNode = new node();
                    scope.push(scopeNode);
                    if (!root) {
                        root = scopeNode;
                    }

                    branchset();
                    expect(')');

                    var
                        popped = scope.pop(),
                        nodename = name(),
                        parent = scope[scope.length-1] || root;
                    popped.data = nodename;

                    if (popped !== parent) parent.addChild(popped);
                    currnode = popped;
                }
                else {
                    throw new Error("Expected (");
                }
            },
            leaf = function() {
                var
                    nodename = name(),
                    child = new node();

                child.data = nodename;
                if (scope.length-1 >= 0) {
                    scope[scope.length-1].addChild(child);
                }
                else { // 1-element tree
                    root = child;
                }
                currnode = child;
            },
            subtree = function() {
                if (currtok.symbol === '(') {
                    internal();
                }
                else {
                    leaf();
                }
            },
            tree = function() { //FIXME: ambiguous... need a longer lookahead
                if (currtok.symbol === '(') {
                    subtree();
                }
                else {
                    branch();
                }

                expect(';');

                return root;
            },
            file = function() {
                return tree();
            };

        node.prototype.addChild = function(n) {
            this.children.push(n);
        };
        node.prototype.visit = function(callback) { // depth first traversal
            callback(this);
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].visit(callback) === false) {
                    break; // return false from your callback to end the traversal
                }
            }
        };
        node.prototype.clone = function(deep) {
            if (typeof deep === 'undefined') deep = false;

            var
                shallowCopy = function(n) {
                    var copy = new node();
                    for (property in n) {
                        if (n.hasOwnProperty(property)) {
                            copy[property] = n[property];
                        }
                    }

                    copy.id = enumerator++; // maintain unique IDs
                    return copy;
                },
                deepCopy = function(n) {
                    var copy = shallowCopy(n);
                    copy.children = [];
                    for (var i = 0; i < n.children.length; i++) {
                        copy.addChild(deepCopy(n.children[i]));
                    }

                    return copy;
                };

            if (deep) return deepCopy(this);
            return shallowCopy(this);
        };

        return file();
    }
};

/* Format Conversions */
nwk.converter = {};
nwk.converter.toBinary = function(tree) { // modify tree by adding unnamed ancestors and modifying branchlengths thus producing a binary tree with the same meaning
    var
        findNearestChild = function(node) { // the nearest node will be retained, while others are rerooted on an unnamed node
            var nearest;
            if (node.children.length > 0) nearest = node.children[0];
            for (var i = 1; i < node.children.length; i++) {
                var curr = node.children[i];
                if (curr.branchlength < nearest.branchlength) {
                    nearest = curr;
                }
            }

            return nearest;
        },
        convertToBinary = function(node) {
            if (node.children.length < 3) { // already binary
                return node;
            }

            var
                children = node.children,
                nearest = findNearestChild(node),
                toReroot = [];

            for (var i = 0; i < children.length; i++) {
                var child = children[i];

                if (child !== nearest) {
                    child.branchlength -= nearest.branchlength;
                    toReroot.push(child);
                }
            }

            var unnamedRoot = node.clone();
            unnamedRoot.data = "";
            unnamedRoot.branchlength = nearest.branchlength;
            unnamedRoot.children = toReroot;
            node.children = [nearest, unnamedRoot];
        };

    var binary = tree.clone(true); // deep clone
    binary.visit(function(node) {
        convertToBinary(node);
    });

    return binary;
};
nwk.converter.toOneZoom = function(tree, allowNonbinary) {
    allowNonbinary = allowNonbinary || false;

    var ozNode = function() { // node structure as used by OneZoom
            this.cname = null; // common name
            this.name1 = null; // genus
            this.name2 = null; // species
            this.hasname1 = false;
            this.hasname2 = false;
            this.lengthbr = null; // branch length (Mya)
            this.phylogenetic_diversity = 0.0;
            this.richness_val = 0;
            this.child1 = null;
            this.child2 = null;
            this.popstab = "U";  // One of U, I, S, D
            this.redlist = "NE"; // One of EX, EW, CR, EN, VU, NT, LC, DD, NE
        },

        parseName = function(cplname) {
            /*
             * A name is given in the format:
             * 	name1_name2{cname_popstab_redlist}
             * [ is replaced by (
             * ] is replaced by )
             * * is replaced by a comma
             */
            cplname = cplname.replace(/\[/g, '(').replace(/\]/g, ')').replace(/\*/g, ',');
            var tokenize = function(srcString) {
                    var tokens = {
                        '{': /{/,
                        '}': /}/,
                        '_': /_/,
                        'CONS_SYM': /^EX|EW|CR|EN|VU|NT|LC|DD|NE$/,
                        'STAB_SYM': /^[U|I|S|D]$/,
                        'STRING': /[a-zA-Z\+\.\(\),\\\-\d'\s\/]+/
                    };

                    return nwk.parser.tokenize(srcString, tokens);
                },

                tokens = tokenize(cplname),
                currtok = tokens.shift(),
                nameObj = {
                    commonName: "",
                    genus: "",
                    species: "",
                    stability: "U", // unknown by default
                    conservationStatus: "NE" // not evaluated by default
                },

                accept = function(symbol) {
                    if (currtok) {
                        if (currtok.type === symbol) {
                            var returnSym = currtok.symbol;
                            currtok = tokens.shift();
                            return returnSym;
                        }
                    }

                    return false;
                },
                fuzzyExpect = function(type) {
                    if (currtok) {
                        var returnSym = currtok.symbol;
                        if (accept(type)) {
                            return returnSym;
                        }
                    }

                    return false;
                },
                expect = function(type) {
                    var ret = fuzzyExpect(type);
                    if (ret === false) {
                        throw new Error("Unexpected symbol in \"" + cplname + "\", expected " + type);
                    }
                },

                popstats = function() { // population statistics
                    if (accept('_')) {
                        nameObj.conservationStatus = accept('CONS_SYM');
                        expect('_');
                        nameObj.stability = accept('STAB_SYM');
                    }
                    // EMPTY
                },
                commonName = function() {
                    var comm = accept('STRING');
                    if (comm) nameObj.commonName = comm;

                    // OR EMPTY
                },
                infoPart = function() {
                    if (accept('{')) {
                        commonName();
                        popstats();
                        expect('}');
                    }
                    // EMPTY
                },
                latinName = function() {
                    var genus = accept('STRING');
                    if (genus) nameObj.genus = genus;
                    if (fuzzyExpect('_')) {
                        nameObj.species = accept('STRING');
                    }
                },
                complexName = function() {
                    latinName();
                    infoPart();
                };

            complexName();
            return nameObj;
        },
        convertNode = function(node) { // convert a generic node into a OneZoom node
            var oz = new ozNode(),
                name = node.data,
                complexName = parseName(name);

            oz.cname = complexName.commonName;
            oz.name1 = complexName.genus;
            oz.name2 = complexName.species;
            oz.popstab = complexName.stability;
            oz.redlist = complexName.conservationStatus;
            oz.lengthbr = node.branchlength;
            oz.phylogenetic_diversity = 0.0;
            oz.richness_val = 0;

            if (oz.name1) oz.hasname1 = true;
            if (oz.name2) oz.hasname2 = true;

            return oz;
        },
        convert = function(n) {
            var recurse = function(gn) { // recurse over a generic node
                var currnode = convertNode(gn);
                for (var i = 0; i < gn.children.length; i++) {
                    currnode.addChild(recurse(gn.children[i]));
                }

                return currnode;
            };

            return recurse(n);
        };

    ozNode.prototype.addChild = function(node) {
        if (this.child1 == null) {
            this.child1 = node;
        }
        else if (this.child2 == null) {
            this.child2 = node;
        }
        else {
            if (!allowNonbinary) {
                throw new Error("Can't convert tree to OneZoom - not a binary tree");
            }
            else {
                this.child2 = node;
            }
        }
    };
    ozNode.prototype.visit = function(callback) {
        callback(this);
        if (this.child1) this.child1.visit(callback);
        if (this.child2) this.child2.visit(callback);
    };

    return convert(tree);
};
nwk.converter.toJSON = function(tree, opts) {
    return JSON.stringify(tree);
};

/* Debugging Utilities */
nwk.debugger = {};
nwk.debugger.findNonbinaryNodes = function(tree) {
    var targets = [];
    tree.visit(function(node) {
        if (node.children.length > 2) targets.push(node);
    });

    return targets;
};
nwk.debugger.findUnnamedNodes = function(tree) {
    var targets = [];
    tree.visit(function(node) {
        if (node.data === "") targets.push(node);
    });

    return targets;
};
nwk.debugger.findUnlengthedNodes = function(tree) {
    var targets = [];
    tree.visit(function(node) {
        if (node.branchlength == 0) targets.push(node);
    });

    return targets;
};
nwk.debugger.findLeaves = function(tree) {
    var targets = [];
    tree.visit(function(node) {
        if (node.children.length == 0) targets.push(node);
    });

    return targets;
};

/* For node */
exports = typeof exports !== 'undefined' ? exports : {};
exports.parser = nwk.parser;
exports.converter = nwk.converter;
exports.debugger = nwk.debugger;