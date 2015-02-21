// get a reference to the house icon in the toolbar
// hide the icon until its image has loaded
$(window).load(function() {
// JqueryUI accordion
    if (document.documentElement.clientWidth < 500) { // For mobile devices
        $("#accordion").accordion({
            heightStyle: "auto",
            collapsible: true,
            active: false
        });
    } else {
        $("#accordion").accordion({
            heightStyle: "auto",
            collapsible: true
        });
    }

// Sets the width and height of the canvas
    var $width = document.getElementById('container').clientWidth;
// var $height = document.getElementById('content').clientHeight - 14;
    var $height = 400;

// get the offset position of the Konva container
    var $stageContainer = $("#container");
    var stageOffset = $stageContainer.offset();
    var offsetX = stageOffset.left;
    var offsetY = stageOffset.top;

//initialize counter for image IDs
    var imageCount = -1;

    var imageSrc = [
        "images/sensor.jpeg",
        "images/sensor2.jpeg"
    ];

//loop through imageSrc list
    for (var i = 0; i < imageSrc.length; i++) {
        //use a closure to keep references clean
        (function () {
            var $house, image;
            $house = $("#sensor" + i);
            $house.hide();
            image = new Image();
            image.onload = function () {
                $house.show();
            };
            image.src = imageSrc[i];
            // start loading the image used in the draggable toolbar element
            // this image will be used in a new Konva.Image
            // make the toolbar image draggable
            $house.draggable({helper: 'clone'});
            $house.data("url", "house.png"); // key-value pair
            $house.data("width", 60); // key-value pair
            $house.data("height", 40); // key-value pair
            $house.data("image", image); // key-value pair
        })();
    }
// create the Konva.Stage and layer
    var stage = new Konva.Stage({
        container: 'container',
        width: $width,
        height: $height
    });
    var layer = new Konva.Layer();
    stage.add(layer);

// make the Konva Container a dropzone
    $stageContainer.droppable({
        drop: dragDrop
    });

// handle a drop into the Konva container
    function dragDrop(e, ui) {

        // get the drop point
        var x = parseInt(ui.offset.left - offsetX);
        var y = parseInt(ui.offset.top - offsetY);

        // get the drop payload (here the payload is the image)
        var element = ui.draggable;
        var data = element.data("url");
        var theImage = element.data("image");
        var imgWidth = element.data("width");
        var imgHeight = element.data("height");

        // create a new Konva.Image at the drop point
        // be sure to adjust for any border width (here border==1)
        var image = new Konva.Image({
            name: data,
            id: "image" + (imageCount++),
            x: x,
            y: y,
            image: theImage,
            width: imgWidth,
            height: imgHeight,
            draggable: true
        });
        image.on('dblclick', function () {
            image.remove();
            layer.draw();
        });
        layer.add(image);
        layer.draw();
        stage.add(layer);
    }


    $("#save").click( function(){
        




    });

});