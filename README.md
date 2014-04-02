Images-JS
=========

JavaScript library that uses jQuery, Bootstrap and HoverCSS to display images dynamically.

v1.1.3 Released. [DEMO](http://garciamarin.github.io/wedding/#/about_us) All the way to the bottom.

Special Thanks: 

1. Twitter Bootstrap :: http://getbootstrap.com/css/#grid

2. Hover.css :: http://ianlunn.github.io/Hover/

3. jQuery :: http://jquery.com/

Creates:
A plug-in (function) in the global scope called ImagesJS.

What is new in v1.1.3?  
Bugs fixed:  
1. Adding images into the markup after they are loaded.  
	This allows ImagesJS to correctly display the images in the right collumns, because it uses the actualy height of the column to calculate where the next image goes in.  
	Also this helps the browser insert images as they are loaded so we don't se empty spaces.  
2. The container is modified to contain a class of row, a max-width (set to a 100%) for responsiveness sake. It used to go over the boundaries of the document.  
Improvements:  
3. Margin left and right are set to 'auto' to center the container correctly.  
4. Fragments are used when using multiple image containers, if one with the same number of cols is repeated, a fragment is used. This is to boost performance when inserting images.  

Future improvements:  
v1.2:  
1. Feature; prepend besides append. The default of append will be able to change for the container and for every image separately.  
v2.0:  
2. Performance wise: Fragments are going to be added to insert the images to the DOM. The idea of this library is to actually add a lot of images dynamically, there is a good change that there are a lot of images, so this is going to be added to improve performance.  
3. Demo with github pages.  

Features not considered yet:  
1. Change the class (or add more) of the columns sizes. Currently forced to col-sm-x (this is because the calculation of columns are made with the number of columns set in the initialization). This means to be able to do class="col-sm-4, col-md-3" to the columns.  
Future Testing:  
3. How to make it work with AngularJS  
4. A push service example.  

Features: Adding something else than images, maybe.  

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
		ImagesJS("#yourChoice").set({cols: 4})
		.add({
			imgSrc:" ... ",
			imgDesc:"Some Description",
			link:true,
			imgAlt:"Some Alt",
			imgTitle:"Some Title",
			imgHoverCSS: "rotate" // and many more with HoverCSS
		})
		.add({
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
	</script>
</body>
```