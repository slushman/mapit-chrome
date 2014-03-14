/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler(info, tab) {

	var selected 	= info.selectionText;
  
	// Join multiple lines into one separated with comma
	selected 		= selected.replace(/\n/g, ', ');
	var url 		= '';
	var favorite 	= localStorage["map_preference"];

	if (!favorite || favorite == "google") {
		url = "http://maps.google.com/maps?q=" + selected;
	} else if (favorite == "mapquest") {
		url = "http://www.mapquest.com/?q=" + selected;
	} else if (favorite == "bing") {
		url = "http://www.bing.com/maps/default.aspx?rtp=adr." + selected;
	} else if ( favorite == "zillow" ) {
		formatted = selected.replace( /\s/g, "-" );
		url = "http://www.zillow.com/homes/" + formatted + "_rb/";
	}

	// Create a new tab to the info page.
	chrome.tabs.create({url: url});
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
	"title" : chrome.i18n.getMessage("map_it"),
	"type" : "normal",
	"contexts" : ["selection"],
	"onclick" : getClickHandler
});
