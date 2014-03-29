// REVELAING MODULE variation
var IL = (function($){
	if(!$) return/*throw*/ "You need jQuery to run IL";

	// Elements are were ImagesJS is going to insert the images (images container).
	// Objects is the object's FACADE returned for each element.
	// Losing performance with closures.
	// But because of the memoization of the elements and objects, we don't have to search nor create them every time.
	var imagesElements = {}, imagesObjects = {}, elementsFragments = {};

	// Appends fragment clone to code
	// Using fragments to improve performance
	var imagesFragment;
	function appendToCol(element, imagesElementID){
		var imagesElement = imagesElements[imagesElementID],
		arr = $(imagesElementID).children("."+imagesElement.cols._identifier);

		arr = arr.sort(function(a, b){
			var aHeight = Number($(a).css("height").replace("px","")), bHeight = Number($(b).css("height").replace("px",""));
			return ((aHeight < bHeight) ? -1 : ((aHeight > bHeight) ? 1 : 0));
		});

		$(arr[0]).append(element);
	}

	// This function returns a SINGLETON for each element to add images to.
	// Implements a variation of the REVEALING MODULE pattern
	function getObject(imagesElementID){
		var parent = imagesElements[imagesElementID];
		return imagesObjects[imagesElementID] || (imagesObjects[imagesElementID] = {
			// Organizes that element into the correct display
			set: function (options){
				if(parent.cols._identifier != "col-sm-") return/*throw*/ "You can't set the images container more than once";
				parent.cols._num = options.cols || 4;
				if(parent.cols._num < 0 || parent.cols._num > 12 || 12 % parent.cols._num != 0) return/*throw*/ "Number of columns must be positive evenly divisor of 12";
				parent.cols._length = 12 / parent.cols._num;
				parent.cols._identifier += parent.cols._length;
				var index;
				for(index = 0; index<parent.cols._num; index++){
					var div = document.createElement("div");
					$(div).addClass(parent.cols._identifier);
					$(div).addClass("text-center");
					$(imagesElementID).append(div);
				}
				return imagesObjects[imagesElementID];
			},
			// Adds the image to the element
			add: function (options){
				if(!options || !options.imgSrc) return/*throw*/ "To add an image, you must specify options with at least imgSrc";
				// Attributes of the image
				var imgSrc = options.imgSrc, imgDesc = options.imgDesc, linkBoolean = options.link, 
				imgAlt = options.imgAlt, imgTitle = options.imgTitle, imgHoverCSS = options.imgHoverCSS;

				// Actual element that will hold the images
				var imageContainer = $("<div/>")
				.addClass(imgHoverCSS? "button " + imgHoverCSS : ""), 

				// The image
				image = $("<img/>")
				.attr("src", imgSrc)
				.attr("alt", imgAlt || "")
				.addClass("img")
				.addClass("img-responsive")
				.addClass("img-thumbnail")
				.addClass("col-xs-12"); // Firefox && Bootstrap bug workaround for responsiveness

				// This variable is created just in case there is a link
				// In case there isn't, this variable will point to the image container itself.
				var link = imageContainer;
				if(!linkBoolean){
					link = $(imageContainer).append("<a/>")
					.find("a")
					.attr("href", imgSrc)
					.attr("title", imgSrc || "");
				} 
				$(link).append(image);

				var row = $("<div/>"), col = $("<div/>");
				$(col).addClass("col-sm-12")
				.append(imageContainer);
				$(row).addClass("row")
				.append(col);

				appendToCol(row, imagesElementID);
				return imagesObjects[imagesElementID];
			}
			//addElement: function (el){/*This functionality was deprecated*/}
			//addMany: function ([images]){/*This functionality will be implemented in version 2.0*/}
		});
	}
	// FACADE that allows us to get the element to which we are going to add the images
	// returns the SINGLETON object for this element
	return  function (imagesElementID) {
		if(!document.getElementById(imagesElementID.slice(1))) return/*throw*/ "Id not recognized within the DOM tree";
		imagesElements[imagesElementID] = imagesElements[imagesElementID] || ($(imagesElementID).addClass("row"), {
			cols:{
				_num:4,
				_identifier:"col-sm-",
				_length:3
			}
		});
		return getObject(imagesElementID);
	};

})(jQuery);