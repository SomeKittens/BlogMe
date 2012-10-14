//Adds the listeners to the HTML
//Is there some way I could just do onClick()?
document.addEventListener("DOMContentLoaded", function () {
	var getel = document.getElementById("load");
	getel.addEventListener("click", load);
	var setel = document.getElementById("save");
	setel.addEventListener("click", addNew);
	//If localStorage vars aren't initalized, do so.
	if(!localStorage.blogs) {
		localStorage.blogs = "[]";
	}
	if(!localStorage.read) {
		localStorage.read = "[]";
	}
});

//Records the current tab in localStorage
function addNew() {
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	}, function (tabArray) {
		//There's only one possible tab that fits the above description
		var tab = tabArray[0];
		var blogArray = JSON.parse(localStorage.blogs);
		blogArray.push(tab.url);
		console.log(blogArray);
		localStorage.blogs = JSON.stringify(blogArray);
	});
}

//Gets a random blog, then loads it
function load() {
	var blogArray = JSON.parse(localStorage.blogs);
	//Pop random item from the array
	var blogUrl = blogArray.splice(~~(Math.random() * blogArray.length), 1)[0];
	//Get the current tab
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	}, function (tabArray) {
		//There's only one possible tab that fits the above description
		var tab = tabArray[0];
		//Set current tab to url
		chrome.tabs.update(
			tab.id,
			{"url" : blogUrl}
		);
		//Add url to read list
		var readArray = JSON.parse(localStorage.read);
		readArray.push(blogUrl);
		localStorage.read = JSON.stringify(readArray);
	});
	localStorage.blogs = JSON.stringify(blogArray);
}
