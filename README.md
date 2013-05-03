autotab
=======

A short javascript shim for enabling auto-tabbing from one input to the next. It is written in plain javascript (e.g. library-free).

This javascript file (autotab.js, found in the public_html folder) provides the following functionality to a web page:

--Specify the maximum length of text fields, so that when the user has typed the maximum number of characters, the focus automatically shifts to the next text field on the page.

--Any input element with type of text, e-mail or password may be included. All you have to do is add the class "autotab" to the element.

--You may subvert the natural order of tabbing by also specifying the tabindex attribute of the text fields. NOTE: If you wish to specify the tab order, you must give give ALL the input elements a tabindex, otherwise you may get aberrant behavior.

An HTML page and its accompanying CSS are provided just as a courtesy and to show some implementation possibilities.

---------------------------------------------------------------------------
My approach is this:

On page load we first get an array of all input elements, then iterate through that array in order to get an array of only the ones that have the class "autotab".

Now we sort the remaining elements using their autotab attributes. If the autotab attributes are not specified, the elements retain their original order.

Lastly we attach a listener to each of the elements' onkeyup event. That listener checks to see if the text-length in the element is equal to its maxlength attribute. If so, it advances focus to the next element in the array. It also checks first to see if the key pressed was tab or shift, because if the user did a shift+tab he presumably is coming back to this element in order to edit it, in which case we don't want to send the focus back to the element the user just came from.

The tricky part is this: the event binding happens immediately after page load, and the actual tab progression occurs at some undetermined time in the future, whenever the event fires and input element is full. But, we have to have some way of preserving the tab order, which is particularly problematic if the markup specifies a tabindex order other than the natural ordering of the markup.

There are a few ways to preserve this order. I chose to hold the actual DOM elements in memory. Another possibility might be to just hold the IDs of the element in a globally excessible array. I don't like that solution for at least two reasons: 1) it clutters the global scope, and 2) it necessitates future DOM loopkups at runtime.

Instead, I made use of a closure to preserve the state of the array for use at runtime. That way, when the event fires on an element, you simply have to figure out where that element is in the array, then call the focus() method on the next element in the array; no DOM lookups required. This takes up more memory, but that's not a real problem unless the markup has tens of thousands of input elements on a single page, in which case you have bigger fish to fry.
