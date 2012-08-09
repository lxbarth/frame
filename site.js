window.onload = function() {

    // Reveal all dynamically populated elements.
    var reveal = function() {
        var elements = document.getElementsByClassName('dynamic');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 1;
        }
    };

    mapbox.load(document.location.search.substr(1), function(o) {
        // Create map, set location.
        var map = mapbox.map('map');
        map.addLayer(o.layer);
        !document.location.hash &&
            map.zoom(o.zoom).center(o.center);

        // Set up map.
        map.interaction.auto();
        map.ui.hash.add();
        map.ui.zoomer.add();
        map.ui.fullscreen.add();
        map.ui.zoombox.add();
        map.ui.legend.add();
        map.ui.refresh();

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
