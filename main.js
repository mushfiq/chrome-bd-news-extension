// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var NewsGenerator = {
	/**
	 * NewsCred API Used
	 *
	 * See http://newscred.com/developer/docs for
	 * details about the construction of this URL.
	 *
	 * @type {string}
	 * @private
	 */
	searchOnNewsCred_: 'http://api.newscred.com/articles?access_key=c4bcc3f7c9bf9ec159f51da0a86ca658&query=dhaka&format=json',

	/**
	 * Sends an XHR GET request to grab photos of lots and lots of kittens. The
	 * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
	 *
	 * @public
	 */
	requestNews: function() {
		var req = new XMLHttpRequest();
		req.open("GET", this.searchOnNewsCred_, true);
		req.onload = this.showNews_.bind(this);
		req.send(null);
	},

	/**
	 * Handle the 'onload' event of our news XHR request, generated in
	 * 'requestNews', by generating 'h2' elements, and stuffing them into
	 * the document for display.
	 *
	 * @param {ProgressEvent} e The XHR ProgressEvent.
	 * @private
	 */

	showNews_: function(e) {
		var articles = JSON.parse(e.target.response).article_set;
		for (var i = 0; i < articles.length; i++) {
			var headline = document.createElement('h2');
			var news = document.createTextNode(articles[i].title)
			document.body.appendChild(news);
			document.body.appendChild(document.createElement('br'));
			// console.log(articles[i].title);
		}
	}
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
	NewsGenerator.requestNews();
});
