Images-JS
=========

JS library that uses jQuery, Bootstrap, HoverCSS to create a type of pinterest displayable images.

V1.0 DEPLOYED.

Special Thanks: 
1. Twitter Bootstrap :: http://getbootstrap.com/css/#grid
2. Hover.css :: http://ianlunn.github.io/Hover/
3. jQuery

CREATES:
A function in the global scope called IL (ImagesLibrary).

Stuff that is planed to be fixed on version 2.0:
BUGS: Calculating where the image goes directly from the markup, the browser might add the images asynchronous (because it need to load them from the internet), so it might seem that height of a column is smaller than another and add it there.

Features: Adding something else than images, maybe.

I still need to refactor the code. To add patterns and best practices.



Simple blueprint example:
========================

<html>
<head> 
	<!-- Bootstrap's latest compiled and minified CSS -->
	<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
	<!-- HOVER CSS -->
	<link href="assets/Images-JS/assets/hoverCSS/hover-min.css" rel="stylesheet" />

</head>
<body>
	<div class="container">
		<div id="yourChoise"></div>
	</div>

	<!-- Libraries -->
	<!-- jQuery --> 
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<!-- Bootstrap --> 
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<!-- IL JS --> 
	<script type="text/javascript" src="assets/Images-JS/src/js/IL.js"></script>

	<!-- Your Scripts -->
	<script type="text/javascript">
		IL("#testingILJS").set({cols: 4});
		IL("#testingILJS").add({
			imgSrc:" ... ",
			imgDesc:"Some Description",
			link:true,
			imgAlt:"Some Alt",
			imgTitle:"Some Title",
			imgHoverCSS: "rotate"
		});

		IL("#testingILJS").add({
			imgSrc:" ... ",
			imgDesc:"Some Description",
			link:true,
			imgAlt:"Some Alt",
			imgTitle:"Some Title",
			imgHoverCSS: "rotate"
		});
		IL("#testingILJS").add({
			imgSrc:" ... ",
			imgDesc:"Some Description",
			link:true,
			imgAlt:"Some Alt",
			imgTitle:"Some Title",
			imgHoverCSS: "rotate"
		});
	</script>
</body>