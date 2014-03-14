/*// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("mapPref");
  var mapPref = select.children[select.selectedIndex].value;
  localStorage["map_preference"] = mapPref;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["map_preference"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("mapPref");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);*/


'use strict';

var mapit_options = {

	saveSelection: function(id) {
		if (!document.getElementById(id).value ||
			document.getElementById(id).value ===
			mapit_options.getDefaultValue(id)) {
			localStorage.removeItem(id);
		} else {
			localStorage.setItem(id, document.getElementById(id).value);
		}
	},

	loadSelection: function(id) {
		if (!localStorage.getItem(id)) {
			document.getElementById(id).value = mapit_options.getDefaultValue(id);
		} else {
			document.getElementById(id).value = localStorage.getItem(id);
		}
	},

	save: function() {
		mapit_options.saveSelection('mapPref');
	},

	load: function() {
		mapit_options.loadSelection('mapPref');
	},

	init: function() {
		document.addEventListener('click', mapit_options.save);
		document.addEventListener('keydown', mapit_options.save);
		document.addEventListener('keyup', mapit_options.save);
		mapit_options.load();
	}

};

mapit_options.init();