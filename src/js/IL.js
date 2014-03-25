var IL = (function($){
	if(!$) return "You need jQuery to run IL";
	var imagesElements = {}, imagesObjects = {};

	function appendToCol(element, imagesElementID){
		var imagesElement = imagesElements[imagesElementID],
		arr = $(imagesElementID).children("."+imagesElement.cols._identifier);
		arr = arr.sort(function(a, b){
			var aHeight = Number($(a).css("height").replace("px","")), bHeight = Number($(b).css("height").replace("px",""));
			return ((aHeight < bHeight) ? -1 : ((aHeight > bHeight) ? 1 : 0));
		});
		$(arr[0]).append(element);
	}
	function getObject(imagesElementID){
		var parent = imagesElements[imagesElementID];
		return imagesObjects[imagesElementID] || (imagesObjects[imagesElementID] = {
			set: function (options){
				if(parent.cols._identifier != "col-sm-") return "You can't set a image element more than once";
				parent.cols._num = options.cols || 4;
				if(parent.cols._num < 0 || parent.cols._num > 12 || 12 % parent.cols._num != 0) return "Number of columns must be positive evenly divisor of 12";
				parent.cols._length = 12 / parent.cols._num;
				parent.cols._identifier += parent.cols._length;
				var index;
				for(index = 0; index<parent.cols._num; index++){
					var div = document.createElement("div");
					$(div).addClass(parent.cols._identifier);
					$(div).addClass("text-center");
					$(imagesElementID).append(div);
				}
			},
			add: function (options){
				if(!options || !options.imgSrc) return "To add an image, you must specify options with at least imgSrc";
				var imgSrc = options.imgSrc, imgDesc = options.imgDesc, linkBoolean = options.link, 
				imgAlt = options.imgAlt, imgTitle = options.imgTitle, imgHoverCSS = options.imgHoverCSS,
				link, image;
				if(linkBoolean){
					link = document.createElement("a");
					$(link).attr("href", imgSrc);
					$(link).attr("title", imgSrc || "");
					$(link).addClass(imgHoverCSS? "button " + imgHoverCSS : "");
				} 
				image = document.createElement("img");
				$(image).attr("src", imgSrc);
				$(image).attr("alt", imgAlt || "");
				$(image).addClass("img");
				$(image).addClass("img-responsive");
				$(image).addClass("img-thumbnail");
				if(link) $(link).append(image);						
				else link = image;

				var row = document.createElement("div"), col = document.createElement("div");
				$(row).addClass("row");
				$(col).addClass("col-sm-12");
				$(col).append(link);
				$(row).append(col);

				appendToCol(row, imagesElementID);
			},
			addElement: function (el){

			}
		});
	}
	return  function (imagesElementID) {
		if(!document.getElementById(imagesElementID.slice(1))) return "Id not recognized within the DOM tree";
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