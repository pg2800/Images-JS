/*!
 * Images.js
 * Version: 1.1.0
 * Author: Pablo Garcia C
 * Github: https://github.com/pg2800/Images-JS
 */

// FLY WEIGHT Pattern variation
var ImagesJS = (function($){
	if(!$) return/*throw*/ "You need jQuery to run Images JS";

	var imagesContainers = {}, imagesSingletons = {}, imagesContainersFragments = {},
	imageFragmentWithLink = (function(){
		var fragment = document.createDocumentFragment(),

		imageContainer = $("<div/>")
		.addClass("hoverAnimation"),

		image = $("<img/>")
		.addClass("img")
		.addClass("img-responsive")
		.addClass("img-thumbnail")
		.addClass("col-xs-12"); // Firefox && Bootstrap bug workaround for responsiveness

		var link = $(imageContainer).append("<a/>");
		$(link).append(image);

		var row = $("<div/>"), col = row.clone(true);
		$(col).addClass("col-sm-12")
		.append(imageContainer);
		$(row).addClass("row")
		.append(col);

		return fragment.appendChild(row[0]);
	})(),
	imageFragment = (function(){
		var fragment = document.createDocumentFragment(),

		imageContainer = $("<div/>")
		.addClass("hoverAnimation"),

		image = $("<img/>")
		.addClass("img")
		.addClass("img-responsive")
		.addClass("img-thumbnail")
		.addClass("col-xs-12") // Firefox && Bootstrap bug workaround for responsiveness
		.appendTo(imageContainer);

		var row = $("<div/>"), col = row.clone(true);
		$(col).addClass("col-sm-12")
		.append(imageContainer);
		$(row).addClass("row")
		.append(col);

		return fragment.appendChild(row[0]);
	})();

	// Appends fragment clone to code
	// Using fragments to improve performance
	function appendThisInto(imgRow, imagesContainerID){
		var imagesElement = imagesContainers[imagesContainerID];

		// In v1.3.2 from jQuery and later release all comma-separated selectors will be returned in document order.
		var columns = $(imagesContainerID).children("."+imagesElement.cols._identifier),
		column = columns[0], column_height = Number($(column).css("height").replace("px",""));

		columns.each(function (index, element){
			var element_height = Number($(element).css("height").replace("px",""));
			if(element_height < column_height) {
				column = element;
				column_height = element_height;
			}
		});

		$(column).append(imgRow.clone(true));
	}

	// This function returns a SINGLETON for each element to add images to.
	// Implements a variation of the REVEALING MODULE pattern
	function getObject(imagesContainerID){
		var parent = imagesContainers[imagesContainerID];
		return imagesSingletons[imagesContainerID] || (imagesSingletons[imagesContainerID] = {
			// Initializes the columns
			set: function (options){
				if(parent.cols._identifier != "col-sm-") return/*throw*/ "You can't set the images container more than once";
				parent.cols._num = options.cols || 4;
				if(parent.cols._num < 0 || parent.cols._num > 12 || 12 % parent.cols._num != 0) return/*throw*/ "Number of columns must be positive evenly divisor of 12";
				parent.cols._length = 12 / parent.cols._num;
				parent.cols._identifier += parent.cols._length;
				var index;

				// Creates and appends columns
				// Memoizing fragments to clone them if more than one container are added with the same number of columns
				var fragment = imagesContainersFragments[parent.cols._num];
				if(!fragment){
					fragment = imagesContainersFragments[parent.cols._num] = document.createDocumentFragment();
					for(index = 0; index<parent.cols._num; index++){
						var div = document.createElement("div");
						$(div).addClass(parent.cols._identifier)
						.addClass("text-center");
						fragment.appendChild(div);
					}
				}
				$(imagesContainerID).append(fragment.cloneNode(true));

				// returns the "API" to add chainability
				return imagesSingletons[imagesContainerID];
			},
			// Adds the image to the element
			add: function (options){
				if(!options || !options.imgSrc) return/*throw*/ "To add an image, you must specify options with at least imgSrc";
				// Attributes of the image
				var imgSrc = options.imgSrc, imgDesc = options.imgDesc, linkBoolean = options.link, 
				imgAlt = options.imgAlt, imgTitle = options.imgTitle, imgHoverCSS = options.imgHoverCSS;

				var fragment, hover = imgHoverCSS? "button " + imgHoverCSS : "";
				if(linkBoolean){
					fragment = $(imageFragmentWithLink);
					fragment.find(".hoverAnimation")
					.addClass(hover);

					fragment.find("img")
					.attr("src", imgSrc)
					.attr("alt", imgAlt || "");

					fragment.find("a")
					.attr("href", imgSrc)
					.attr("title", imgSrc || "");
				} else {
					fragment = $(imageFragmentWithLink);
					fragment.find(".hoverAnimation")
					.addClass(hover);

					fragment.find("img")
					.attr("src", imgSrc)
					.attr("alt", imgAlt || "");
				}

				(function(copy){
					fragment.find("img").one("load", function (){
						appendThisInto(copy, imagesContainerID);
					});
				})(fragment);

				//Remove classes from original fragment
				fragment.find(".hoverAnimation")
				.removeClass(hover);

				// returns the "API" to add chainability
				return imagesSingletons[imagesContainerID];
			}
		});
	}

	// FACADE that allows us to get the element to which we are going to add the images
	// returns the SINGLETON object for this element
	return  function (imagesContainerID) {
		if(!document.getElementById(imagesContainerID.slice(1))) return/*throw*/ "Id not recognized within the DOM tree";
		imagesContainers[imagesContainerID] = imagesContainers[imagesContainerID] || ($(imagesContainerID).addClass("row"), {
			cols:{
				_num:4,
				_identifier:"col-sm-",
				_length:3
			}
		});
		return getObject(imagesContainerID);
	};

})(jQuery);