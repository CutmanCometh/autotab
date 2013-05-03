(function() {
    window.onload = function(evt) {//use window.onload because so that this can be used in the head of the html page if necessary. window.onload is the closest thing to $(document).ready()
	//get an array of all the input elements with class "autotab"
	var inputs = document.getElementsByTagName("input");

	//only keep the ones with class "autotab"
	var autotabInputs = Array();
	var autotabPattern = /autotab/;
	for (var i = 0; i < inputs.length; i++) {
	    var input = inputs[i];
	    if (autotabPattern.test(input.className)) {
		autotabInputs.push(input);
	    }
	}

	//sort them according to tabindex
	autotabInputs.sort(function(element1, element2) {
	    var tabindex1 = element1.tabIndex;
	    var tabindex2 = element2.tabIndex;
	    if (tabindex1 == undefined || tabindex2 == undefined)
		return 0;
	    else
		return tabindex1.valueOf() - tabindex2.valueOf();
	});

	//attach listener to each element so that it autotabs to the next element in the array.
	//this somewhat squirly use of closures exposes the autotabInputs array for later runtime use, in order to preserve the tab order
	//come to think of it, there's not really any non-squirly use of closures
	for (i = 0; i < autotabInputs.length - 1; i++) {//this outer loop get run at page load time in order to attach the listener to all the input element
	    autotabInputs[i].onkeyup = function(evt) {
		var kc = evt.keyCode;
		if (kc != 9 && kc != 16) {//if the user tabbed of shift-tabbed into the field, we should not engage auto-tabbing functionality

		    var elem = evt.target;//cache the element so we can refer to it multiple times
		    var max = elem.maxLength.valueOf();//explicity cast to number to avoid possible confusion
		    if (elem.value.length == max) {
			//we need to find out where this element is in the chain, so we can go to the next place
			for (var j = 0; j < autotabInputs.length; j++) {//this loop happens at run-time, when the has filled up the text box
			    if (autotabInputs[j] == elem)
				break;
			}
			//j is currently set to this element's location in the array
			autotabInputs[j + 1].focus();
		    }
		}
	    };
	}
    };
})();