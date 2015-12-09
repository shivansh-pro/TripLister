var placesArr = [];
var placesLoc = [];
var placeTypes = [];
var all= "";
var all1 = "";
var all2 = "";
var startLoc = "";
var selectedMarkers = [];
var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': 'us' };
var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
var MARKER_PATH1 = 'https://maps.google.com/mapfiles/kml/shapes/capital_small_highlight.png';       //star from https://www.google.com/fusiontables/DataSource?docid=1BDnT5U1Spyaes0Nj3DXciJKa_tuu7CzNRXWdVA#map:id=3
var hostnameRegexp = new RegExp('^https?://.+?/');

function initialize() {
  document.getElementById("text1").innerHTML = "<span style='font-weight: bold; margin-left:2px;font-size: 1.15em;'>Step 1: </span>Enter each place you visited into the Trip List using the <span style='color:#0033CC'>dropdown list</span> OR the <span style='color:#D80000'>search box</span>. If you cannot remember the name of a place you visited, then just skip putting it on the list.  <div style = 'display:inline;' data-toggle = 'tooltip' data-placement = 'bottom' title = 'Use the drop down menu to select all the places that you visited during your trip. &#013;The menu is organized by place types, but if you can’t find what your looking for, then &#013;you can also use the search box. As you select places they will appear in the Trip List.'><img src='css/img/info.jpg' height='18px' width='18px'></div>";
  document.getElementById("text2").innerHTML = "<span style='font-weight: bold; margin-left:2px;font-size: 1.15em;'>Step 2: </span>Edit the order of the Trip List using the up, down or X button so that the first place is at the top of the list. Click the NEXT button when you are ready to continue.  <div style = 'display:inline;' data-toggle = 'tooltip' data-placement = 'bottom' title = 'You can change the order of the places you visited in the Trip List by using the up&#013; or down arrows, and you can remove a place from the list by clicking on the X button.&#013; Click on the next button when you have finished making your Trip List.'><img src='css/img/info.jpg' height='18px' width='18px'></div>";
  
  var mapOptions = {
    center: new google.maps.LatLng(39.80973, -98.55562),
    componentRestrictions: {country: "us"},
    zoom: 4,
    mapTypeControl: false,
    streetViewControl: false,
    styles : [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);                                                               //bounds to be driven by the current viewport of the map, not strict

  infowindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)                            
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();    
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      map.setCenter(place.geometry.location);
      map.setZoom(10);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setIcon(({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    //marker.setVisible(true);

    var address =  '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
    
    if(startLoc=="")
      startLoc = address;
    else
      startLoc=startLoc+"|"+address;    

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    var input1 = (document.getElementById('pac-input1'));
    var autocomplete1 = new google.maps.places.Autocomplete(input1);
    autocomplete1.bindTo('bounds', map); 
    google.maps.event.addListener(autocomplete1, 'place_changed', function() {
    var	infowindow1 = new google.maps.InfoWindow();
    var place1 = autocomplete1.getPlace();    
    if (!place1.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      map.setCenter(place.geometry.location);
      map.setZoom(10);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker1 = new google.maps.Marker({
    	map: map,
    	anchorPoint: new google.maps.Point(0, -29)                            
  	});
    marker1.setIcon(({
      url: place1.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker1.setPosition(place1.geometry.location);
    marker1.setVisible(true);
    var address1 =  '';
    if (place1.address_components) {
      address1 = (place1.address_components[0] && place.address_components[0].short_name || '');
    }

    infowindow.setContent('<div><strong>' + place1.name + '</strong><br>' + address1);
    //infowindow.open(map, marker1);
    selectResult(place1.name, marker1, place1.geometry.location, place1.types[0]);
    document.getElementById('pac-input1').value = "";
    }); 
  });

  /*google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });*/

  function placeMarker(location) {
    marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    infowindow.open(map,marker);
  }
}

try {
    google.maps.event.addDomListener(window, 'load', initialize);
}
catch(err) {
    console.log(err.message);
}




function search(typeOfPlace) {
  var search = {
    bounds: map.getBounds(),
    types: [typeOfPlace]
  };
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });
  places = new google.maps.places.PlacesService(map);
  places.nearbySearch(search, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      clearResults();
      clearMarkers();
      for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
      }
    }
  });
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}

function dropMarker(i) {
  return function() {
    try {
        markers[i].setMap(map);
    }
    catch(err) {
        console.log(err.message);
    }
  };
}

function dropSelectedMarker() {
  for (var i = selectedMarkers.length - 1; i >= 0; i--) {
    selectedMarkers[i].setIcon(MARKER_PATH1);
    selectedMarkers[i].setMap(map);
  }
    
}

function addResult(result, i) {
  var results = document.getElementById('results');
  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
  var markerIcon = MARKER_PATH + markerLetter + '.png';

  var tr = document.createElement('li');
  tr.style.backgroundColor = (i % 2 == 0 ? '#F0F0F0' : '#FFFFFF');
  tr.onclick = function() {
    google.maps.event.trigger(markers[i], 'click');
  };

  tr.innerHTML = result.name;
  results.appendChild(tr);
}

function clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

function clearSelected() {
  var results = document.getElementById('selected-results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

var color = true;

function selectResult(mname, i, location, ptype){
  var fname = mname;
  placesArr.push(mname);
  if(mname.length>20){
    mname = mname.substring(0,20) + "...";
  }
  var results = document.getElementById('selected-results');
  var tr = document.createElement('li');
  
  selectedMarkers.push(i);
  
  tr.innerHTML = mname + '<span id = "sp"><a href="#" class="reorder-up" STYLE="text-decoration: none">&uArr;&nbsp;</a> <a href="#" class="reorder-down" STYLE="text-decoration: none">&dArr;&nbsp;&nbsp;</a><a href="#" class="delete" style = "color:red;text-decoration: none">X</a></span>';
  tr.setAttribute('title',fname);
  tr.setAttribute('draggable',true);
  tr.setAttribute('style','cursor:move');
  color = !color;
  results.appendChild(tr);
  
  placesLoc.push(location);
  placeTypes.push(ptype);
  clearMarkers();
  clearResults();
  dropSelectedMarker();
}

function showInfoWindow() {
  var marker = this;
  places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        selectResult(place.name, marker,place.geometry.location, place.types[0]);
      });

}

function deleteItem(mname){
  for (var i = 0; i < placesArr.length; i++) {
    if(placesArr[i].startsWith(mname))
      break;
  };
  if(i<placesArr.length){
    placesArr.splice(i, 1);
    placesLoc.splice(i, 1);
    placeTypes.splice(i,1);
    selectedMarkers[i].setMap(null);
    selectedMarkers.splice(i,1);
  }
}

function moveItem(mname, shiftBy){
  for (var i = 0; i < placesArr.length; i++) {
    if(placesArr[i].startsWith(mname))
      break;
  };
  if(i<placesArr.length && i+shiftBy>=0 && i+shiftBy<placesArr.length){
    var tmpStr = placesArr[i];
    placesArr[i] = placesArr[i+shiftBy];
    placesArr[i+shiftBy] = tmpStr;

    var tmpLoc = placesLoc[i];
    placesLoc[i] = placesLoc[i+shiftBy];
    placesLoc[i+shiftBy] = tmpLoc;

    var tmpType = placeTypes[i];
    placeTypes[i] = placeTypes[i+shiftBy];
    placeTypes[i+shiftBy] = tmpType;

    var tmpMarker = selectedMarkers[i];
    selectedMarkers[i] = selectedMarkers[i+shiftBy];
    selectedMarkers[i+shiftBy] = tmpMarker;

  }
}

function post(path, params, method) {
    method = method || "post"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    //form.setAttribute("name", "insert");

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }
    document.body.appendChild(form);
    form.submit();
}

function nextday() {
  clearResults();
  clearSelected();
  clearMarkers();
  for(var i = 0;i<selectedMarkers.length;i++){
    selectedMarkers[i].setMap(null);
  }
  selectedMarkers = [];
  var temp = placesArr.join("|");
  all = all.concat(temp);
  placesArr = [];
  temp="";
  temp = placesLoc.join("|");
  all1 = all1.concat(temp);
  placesLoc = [];
  temp="";
  temp = placeTypes.join("|");
  all2 = all2.concat(temp);
  placeTypes = [];
  var timeSpent = TimeMe.getTimeOnCurrentPageInSeconds();
  var d = new Date();
  post("/triplister/pages/insert.php",{start_location:startLoc,placesVisited:all, placesLocation:all1, place_types: all2, timeOnMap: timeSpent, date: d.toUTCString()});
}

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   DRAGGING    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function selectedResultsMouseEnter(){
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');     // this / e.target is the current hover target.
  }

  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }

  function handleDrop(e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
      // Set the source column's HTML to the HTML of the column we dropped on.
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }

  function handleDragEnd(e) {
    // this/e.target is the source node.

    [].forEach.call(cols, function (col) {
      col.classList.remove('over');
    });
  }

  var list_items = document.querySelectorAll('#selected-results .li');
  [].forEach.call(list_items, function(list_item) {
    list_item.addEventListener('dragstart', handleDragStart, false);
    list_item.addEventListener('dragenter', handleDragEnter, false);
    list_item.addEventListener('dragover', handleDragOver, false);
    list_item.addEventListener('dragleave', handleDragLeave, false);
    list_item.addEventListener('drop', handleDrop, false);
    list_item.addEventListener('dragend', handleDragEnd, false);
  });
}

$("#listing_selected").mouseenter(function(){
    selectedResultsMouseEnter();
});

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   JQUERY    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
$(function() {
    $(document.body).on("click", ".delete", function (evt) {
        evt.preventDefault();
        mytext = $(this).closest("li").text();
        mytext = mytext.substring(0,mytext.length-7);
        if(mytext.length>20)
          mytext = mytext.substring(0,20);
        deleteItem(mytext);
        $(this).closest("li").remove();

    });

    $(document.body).on("click", ".reorder-up", function (evt){
      var $current = $(this).closest('li');
      mytext = $current.text();
      mytext = mytext.substring(0,mytext.length-7);
      if(mytext.length>20)
        mytext = mytext.substring(0,20);
      moveItem(mytext, -1);
      var $previous = $current.prev('li');
      if($previous.length !== 0){
        $current.insertBefore($previous);
      }
      return false;
    });

    $(document.body).on("click", ".reorder-down", function (evt){
      var $current = $(this).closest('li')
      mytext = $current.text();
      mytext = mytext.substring(0,mytext.length-7);
      if(mytext.length>20)
        mytext = mytext.substring(0,20);
      moveItem(mytext, 1);
      var $next = $current.next('li');
      if($next.length !== 0){
        $current.insertAfter($next);
      }
      return false;
    });
    
    try {
        $('[data-toggle="tooltip"]').tooltip();
    }
    catch(err) {
        console.log(err.message);
    }
  });