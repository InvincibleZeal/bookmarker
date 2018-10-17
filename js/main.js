// Add EventListener

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateInput(siteName,siteUrl))
		return false;

	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	if(localStorage.getItem('bookmarks') === null) {
		var bookmarks = [];
		
	} else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	}
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	document.getElementById('myForm').reset();

	fetchBookmarks();
	e.preventDefault();
}

function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResults = document.getElementById('bookmarksResults');
	
	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++) { 
		bookmarksResults.innerHTML += '<li class="collection-item"><a href="'+ bookmarks[i].url + '" target="_blank">' + bookmarks[i].name + '</a><a href="#" onclick="deleteBookmark(\'' + bookmarks[i].url + '\');"><i class="material-icons grey-text right">delete_forever</i></a></li>';
	}
}

function deleteBookmark(url) {
	console.log(url);
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i=0; i<bookmarks.length; i++) {
		if(url == bookmarks[i].url){
			bookmarks.splice(i,1);
			break;
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
}

function validateInput(siteName, siteUrl) {
	if(!siteName || !siteUrl) {
		alert('Please fill in all the inputs');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {
		alert('Please fill in a valid URL');
		return false;
	}
	return true;
}