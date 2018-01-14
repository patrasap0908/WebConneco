var i;
var spaces = [];

$( "#ShowSpaces" ).click(
    function() {
        $( "#spaces" ).toggle(200);
    }
);

$.getJSON("./data/spaces.json", function(data) {
    data.forEach(function(org) {
        for (i = 0; i < org.spaces.length; i++)
            spaces.push(org.spaces[i].name);
    });
});

$( window ).on("load", function() {
    var engine = new Bloodhound({
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        local: spaces,
    });

    console.log(spaces);

    function spacesWithDefaults(q, sync) {
        if (q === '') {
          sync(engine.get( spaces ));
        }

        else {
          engine.search(q, sync);
        }
    }

    $( "#search" ).typeahead({
        highlight: true,
        hint: false,
        minLength: 0,
        cache: false,
        offset: true
    },
    {
        name: "spaces",
        limit: 150,
        source: spacesWithDefaults
    });
});
