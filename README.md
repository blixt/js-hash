# Hash handler

## Information

A JavaScript library that keeps track of the history of changes to the hash
part in the address bar.

A callback function, "handler", is used to handle changes. The function will
be called once when the library is initialized (usually when the page has
finished loading) and then whenever the hash changes.

**Warning** for Internet Explorer 7 and below: If an element on the page has
the same ID as the hash used, the history will get messed up.

Does not support history in Safari 2 and below.

## Example

    function handler(newHash, initial) {
        if (initial)
            alert('Hash is "' + newHash + '"');
        else
            alert('Hash changed to "' + newHash + '"');
    }
    Hash.init(handler, document.getElementById('hidden-iframe'));
    Hash.go('abc123');

The `initial` argument is a boolean that indicates whether the handler was
called for initial state by `Hash.init` (value will be `true`), or due to
an actual change to the hash (`false`).

The `hidden-iframe` element referenced in the example should be an `<iframe>`
element that has loaded a page on the server (a completely empty page is
sufficient).

### jQuery plugin

Also included is a jQuery plugin that simplifies the use of the Hash library.

A blank HTML page (/js/blank.html) is needed for Internet Explorer 7 and below
support. The path can be customized by editing `jquery.hash.js`.

#### Example

    // Add events before calling init to make sure they are triggered for
    // initial hash value.
    $('div#log').hashchange(function (e, newHash) {
        $(this).prepend('<p>New hash: <b>"' + newHash + '"</b></p>');
    });
    // Initialize. Here, the src of the iframe is passed in the init
    // function. If you've got multiple libraries using this plugin, so
    // the init function is called from them, you can also set the iframe
    // src in the iframeSrc variable in the beginning of the code in
    // jquery.hash.js.
    $.hash.init('blank.html');
    $.hash.go('abc123');
    // Changes hash when the anchor is clicked. Also automatically sets the
    // href attribute to "#def456", unless a second argument with a false
    // value is supplied.
    $('a#my-anchor').hash('def456');

## MIT license

This project is licensed under an MIT license.

Copyright (c) 2009-2010 Andreas Blixt <andreas@blixt.org>

http://www.opensource.org/licenses/mit-license.php
