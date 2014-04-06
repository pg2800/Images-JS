Images-JS
=========

JavaScript library that uses jQuery, Bootstrap and HoverCSS to display images dynamically.

v1.2 Released. [DEMO](http://garciamarin.github.io/wedding/#/about_us) All the way to the bottom.

Special Thanks: 

1. Twitter Bootstrap :: http://getbootstrap.com/css/#grid

2. Hover.css :: http://ianlunn.github.io/Hover/

3. jQuery :: http://jquery.com/

Creates:
A plug-in (function) in the global scope called ImagesJS.

What changed in v1.1.3?  
Improvements:  
1. There is a new method added to be able to destroy the container, which ~~empties the container and "unmemoizes" it~~ removes everything about the container (including the container).
2. Margin left and right are set to 'auto' to center the container correctly.  
3. Fragments are used when using multiple image containers, if one with the same number of cols is repeated, a fragment is used. This is to boost performance when inserting images.  

What is new in v1.2?
Improvements:
1. Prepend feature besides append. The default of append for the container and for every image separately can now be changed.  
2. Method destroy actually removes the everything of the container.
3. New method "clear" added, that unmemoizes and empties the container to be able to re-set it.

Future Improvements:
v2.0:  
1. Performance wise: Fragments are going to be added to insert the images to the DOM. The idea of this library is to actually add a lot of images dynamically, there is a good change that there are a lot of images, so this is going to be added to improve performance.  
2. Demo with github pages.  
3. Compatibility with AngularJS

Features not considered yet:  
1. Change the class (or add more) of the columns sizes. Currently forced to col-sm-x (this is because the calculation of columns are made with the number of columns set in the initialization). This means to be able to do class="col-sm-4, col-md-3" to the columns.  
Future Testing:  
2. A push service example.  
3. Adding elements other than images.  

Simple blueprint example:
========================

``` HTML
<html>
<head> 
	<!-- Bootstrap's compiled and minified CSS .. CDN -->
	<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
	<!-- HOVER CSS -->
	<link href="assets/Images-JS/assets/hoverCSS/hover-min.css" rel="stylesheet" />

</head>
<body>
	<div class="container">
		<div id="yourChoice"></div>
	</div>

	<!-- Libraries -->
	<!-- jQuery's CDN--> 
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<!-- Bootstrap's CDN --> 
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<!-- ImagesJS --> 
	<script type="text/javascript" src="src/js/images.js"></script>

	<!-- Your Scripts -->
	<script type="text/javascript">
		// if your site is dynamical, I recommend clearing the container before setting it.
		ImagesJS("#yourChoice").clear(); 
		ImagesJS("#yourChoice").set({
			cols: 4,
			prepend: false // by default it is set to false
		})
		.add({
			prepend: false, // by default it is set to false
			imgSrc:" ... ",
			imgDesc:"Some Description",
			link:true,
			imgAlt:"Some Alt",
			imgTitle:"Some Title",
			imgHoverCSS: "rotate" // and many more with HoverCSS
		})
		.add({
			prepend: true, // by default it is set to false
			imgSrc:" ... ",
			imgDesc:"Some Description",
			link:true,
			imgAlt:"Some Alt",
			imgTitle:"Some Title",
			imgHoverCSS: "rotate"
		})
		.add({
			imgSrc:" ... ",
			imgDesc:"Some Description",
			link:true,
			imgAlt:"Some Alt",
			imgTitle:"Some Title",
			imgHoverCSS: "rotate"
		});

		// Different approach:
		ImagesJS("#differentApproach").clear(); // In case we switch windows.
		ImagesJS("#differentApproach").set({
			cols: 4,
			prepend: false
		});
		
		["http://.../someImage.jpg", "http://.../someImage.jpg", "http://.../someImage.jpg", 
		"http://.../someImage.jpg", "http://.../someImage.jpg", "http://.../someImage.jpg", 
		"http://.../someImage.jpg", "http://.../someImage.jpg", "http://.../someImage.jpg", 
		"http://.../someImage.jpg", "http://.../someImage.jpg", "http://.../someImage.jpg", 
		"http://.../someImage.jpg"].forEach(function(v){
			ImagesJS("#differentApproach").add({
				imgSrc: v,
				imgHoverCSS: "rotate"
			});
		});
	</script>
</body>
```