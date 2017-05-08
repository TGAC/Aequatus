/**
 * Created by thankia on 13/04/2017.
 */
function drawDomain(id, domains){
    jQuery("#domainStructure").svg()
    var svg = jQuery("#domainStructure").svg("get")
    var maxLentemp = jQuery("#domainStructure").width();
    var stopposition = maxLentemp;

    svg.rect(0, 1, stopposition, 20, {
        'id': 'domainline',
        fill: 'lightgray'
    });

    var g = svg.group({class: 'style1'});

    dispEachDomain(g, svg, domains, stopposition, syntenic_data.sequence[id].length);
}


function dispEachDomain(g, svg, domains, width, max_len) {


    if (domains.length > 0) {

        var domain_len = domains.length;

        domains.sort(sort_by('START', true, parseInt));

        var end = 0;

        for (var i=0; i<domain_len; i++) {
            if(domains[i].STATUS.split("|")[0] == "visible"){
                end = domains[0].END;
                break;
            }
        }
        console.log(end)
        var layer = 0
        domains[0].layer = layer;
        for (var i=1; i<domain_len; i++) {
            if(domains[i].STATUS.split("|")[0] == "visible"){
                console.log("layer "+layer)

                if(parseInt(domains[i].START) < parseInt(end))
                {
                    console.log(domains[i].START+" < "+end);
                    layer++;
                    domains[i].layer = layer;
                    console.log("if "+i+" "+layer)
                } else {
                    console.log(domains[i].START+" => "+end);
                    layer = 0;
                    domains[i].layer = layer;
                    console.log("else "+i+" "+layer)
                    end = domains[i].END
                }
            }
        }

        var domain_len = domains.length;

        while (domain_len--) {
            var dom_class=domains[domain_len].TYPE;

            if(domains[domain_len].TYPE.split("|")[0]){

            }
            if(domains[domain_len].STATUS.split("|")[0] == "visible"){
                var domain_start;
                var domain_stop;

                if (parseInt(domains[domain_len].START) < parseInt(domains[domain_len].END)) {
                    domain_start = parseInt(domains[domain_len].START);
                    domain_stop = parseInt(domains[domain_len].END);
                }
                else {
                    domain_start = parseInt(domains[domain_len].END);
                    domain_stop = parseInt(domains[domain_len].START);
                }

                var startposition = (domain_start) * parseFloat(width) / (max_len);
                var stopposition = ((domain_stop - domain_start) + 1) * parseFloat(width) / (max_len);

                stopposition -= 1

                if (stopposition < 1) {
                    stopposition = 1
                }
                startposition += 1

                var top = domains[domain_len].layer * 22;
                console.log(top)

                svg.rect(g, startposition, top, stopposition, (20), {
                    'id': "domain" + domains[domain_len].DOMAIN,
                    'class':dom_class,
                    strokeWidth: 1
                });

                // svg.line(parseInt(startposition), 20, parseInt(startposition), 45, {stroke: 'gray', strokeWidth: 1});
                // svg.line(parseInt(startposition+stopposition), 20, parseInt(startposition+stopposition), 45, {stroke: 'gray', strokeWidth: 1});

                // svg.text(parseInt(startposition), 55, domains[domain_len].START, {
                //     fontFamily: 'Verdana',
                //     fontSize: 10,
                //     textAnchor: 'middle',
                //     fill: "black",
                //     class: "domain position"
                // });

                // svg.text(parseInt(startposition+stopposition), 55, domains[domain_len].END, {
                //     fontFamily: 'Verdana',
                //     fontSize: 10,
                //     textAnchor: 'middle',
                //     fill: "black",
                //     class: "domain position"
                // });

                var text = "";

                if(dom_class == "PFAM"){
                    text = domains[domain_len].DOMAIN.split(":")[1]
                }
                else if(dom_class == "SMART"){
                    text = domains[domain_len].DOMAIN
                }

                var top = (parseInt(domains[domain_len].layer)+parseFloat(0.5)) * 22;

                console.log(top)

                var textPosition = startposition + (stopposition)/2
                svg.text(parseInt(textPosition), top, text, {
                    fontFamily: 'Verdana',
                    fontSize: 10,
                    textAnchor: 'middle',
                    fill: "white",
                    class: "domain label"
                });
            }
        }
    }
}
