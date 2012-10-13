//Adds the listeners to the HTML
//Is there some way I could just do onClick()?
document.addEventListener("DOMContentLoaded", function () {
	var el = document.getElementById("get")
	el.addEventListener("click", addNew);
	var el = document.getElementById("set")
	el.addEventListener("click", loadOld);
});

function addNew() {
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	}, function (tabArray) {
		//There's only one possible tab that fits the above description
		var tab = tabArray[0];
		localStorage.blogs.push(tab.url);
		console.log(localStorage.blogs);
	}
}
