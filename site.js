window.onload = function() {
    // TileJSON URL pointing to MapBox Hosting.
    var url = 'http://a.tiles.mapbox.com/v3/' +
        document.location.search.substr(1) +'.jsonp';

    // Reveal all dynamically populated elements.
    var reveal = function() {
        var elements = document.getElementsByClassName('dynamic');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 1;
        }
    };

    mapbox.load(document.location.search.substr(1), function(o) {
        var map = mapbox.map('map');
        map.addLayer(o.layer);
        map.interaction.auto();

        !document.location.hash &&
            map.zoom(o.zoom).center(o.center);

        map.ui.hash.add();
        map.ui.zoomer.add();
        map.ui.fullscreen.add();
        map.ui.zoombox.add();
        map.ui.legend.add();

        // Populate dynamic fields from tilejson.
        document.getElementById('title').innerHTML = o.name || '';
        document.getElementById('description').innerHTML = o.description || '';
        document.getElementById('attribution').innerHTML = o.attribution || '';

        // Hide instructions and display all dynamic elements.
        document.getElementById('instructions').style.display = 'none';
        reveal();
    });

    // Mapbox.js doesn't call us back if there's an error. Cheat.
    setTimeout(reveal, 750);
};
