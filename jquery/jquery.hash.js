/*!
 * Copyright (c) 2009-2010 Andreas Blixt <andreas@blixt.org>
 * http://github.com/blixt/js-hash
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 * 
 * jQuery hash plugin (Depends on jQuery, Hash)
 * Plugin for detecting changes to the hash and for adding history support for
 * hashes to certain browsers.
 */
/* A blank HTML page (blank.html) is needed for Internet Explorer 7 and below
 * support.
 *
 * Example:
 *     // Add events before calling init to make sure they are triggered for
 *     // initial hash value.
 *     $('div#log').hashchange(function (e, newHash) {
 *         $(this).prepend('<p>New hash: <b>"' + newHash + '"</b></p>');
 *     });
 *     // Initialize. Here, the src of the iframe is passed in the init
 *     // function. If you've got multiple libraries using this plugin, so
 *     // the init function is called from them, you can also set the iframe
 *     // src in the iframeSrc variable in the beginning of the code in
 *     // jquery.hash.js.
 *     $.hash.init('blank.html');
 *     $.hash.go('abc123');
 *     // Changes hash when the anchor is clicked. Also automatically sets the
 *     // href attribute to "#def456", unless a second argument with a false
 *     // value is supplied.
 *     $('a#my-anchor').hash('def456');
 * 
 * WARNING for Internet Explorer 7 and below:
 * If an element on the page has the same ID as the hash used, the history will
 * get messed up.
 *
 * Does not support history in Safari 2 and below.
 */

(function (jQuery, Hash) {
var
// Plugin settings
iframeId = 'jquery-history',
iframeSrc = '/js/blank.html',
eventName = 'hashchange',
eventDataName = 'hash.fn',
init,
// Import globals
window = this,
documentMode = document.documentMode,

// Called whenever the hash changes.
callback = function (newHash) {
    jQuery.event.trigger(eventName, [newHash]);
};

jQuery.hash = {
    init: function (src) {
        // init can only be called once.
        if (init) return;
        init = 1;
        
        var iframe;
        if (window.ActiveXObject && (!documentMode || documentMode < 8)) {
            // Create an iframe for Internet Explorer 7 and below.
            jQuery('body').prepend(
                '<iframe id="' + iframeId + '" style="display:none;" ' +
                'src="' + (src || iframeSrc) + '"></iframe>');
            iframe = jQuery('#' + iframeId)[0];
        }
        
        Hash.init(callback, iframe);
    },

    go: Hash.go
};

jQuery.fn.hash = function (newHash, changeHref) {
    var fn = this.data(eventDataName);
    if (fn) this.unbind('click', fn);

    if (typeof newHash == 'string') {
        fn = function () { Hash.go(newHash); return false; };
        this.data(eventDataName, fn);
        this.click(fn);
        if (changeHref || changeHref === undefined)
            this.attr('href', '#' + newHash);
    }
    
    return this;
};

jQuery.fn[eventName] = function (fn) {
    return this.bind(eventName, fn);
};
})(jQuery, Hash);
