autotab
=======

A short javascript shim for enabling auto-tabbing from one input to the next.

This javascript file (autotab.js) provides the following functionality to a web page:

--Specify the maximum length of text fields, so that when the user has typed the maximum number of characters, the focus automatically shifts to the next text field on the page.

--Any input element with type of text, e-mail or password may be included. All you have to do is add the class "autotab" to the element.

--You may subvert the natural order of tabbing by also specifying the tabindex attribute of the text fields. NOTE: If you wish to specify the tab order, you must give give ALL the input[type:text] elements a tabindex, otherwise you may get aberrant behavior.