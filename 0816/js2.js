/**
 * Created by Administrator on 2016/8/16 0016.
 */
(function () {
    var carouselContent = document.querySelector("#carousel .carousel-content");
    var imageIndex=0;
    var switchImageTimerId=-1;
    var switchImageAnimationPlaying=false;

    function moveTo(target, fromX, toX, fromY, toY, duration, completeHandler) {
        var fps=50;
        var frameDuration=Math.round(1000/fps);
        var frames =Math.round(duration/1000*fps);
        var frameIndex=0;
        var x=fromX,y=fromY;
        var speedX=(toX-fromX)/frames;
        var speedY=(toY-fromY)/frames;

        var id=setInterval(function () {
            x+=speedX;
            y+=speedY;

            frameIndex++;
            if (frameIndex >= frames) {
                clearInterval(id);
                x = toX;
                y = toY;

                if (completeHandler) {
                    completeHandler(target);
                }
            }

            target.style.left = x + "px";
            target.style.top = y + "px";
            target.style.opacity(0.5*y);
        }, frameDuration);
    }
    function createImageContainer(imgSrc) {
        var div = document.createElement("div");
        div.className = "image-container";

        var img = document.createElement("img");
        img.src = imgSrc;
        div.appendChild(img);
        return div;
    }
    var carouselImagesArray = [
        createImageContainer("images/1.jpg"),
        createImageContainer("images/2.jpg"),
        createImageContainer("images/3.jpg")
    ];
    var currentVisibleImage;

    function showNextCarouselImage() {
        if (!switchImageAnimationPlaying) {
            switchImageAnimationPlaying = true;
            imageIndex++;
            if (imageIndex >= carouselImagesArray.length) {
                imageIndex = 0;
            }

            if (currentVisibleImage) {
                moveTo(currentVisibleImage, 0, -800, 0, 0, 500, function (target) {
                    carouselContent.removeChild(target);
                });
            }

            currentVisibleImage = carouselImagesArray[imageIndex];
            carouselContent.appendChild(currentVisibleImage);
            currentVisibleImage.style.left = "800px";
            moveTo(currentVisibleImage, 800, 0, 0, 0, 500, function () {
                switchImageAnimationPlaying = false;
            });
        }
    }

    function showPreCarouselImage() {
        if (!switchImageAnimationPlaying) {
            switchImageAnimationPlaying = true;
            imageIndex--;

            if (imageIndex < 0) {
                imageIndex = carouselImagesArray.length - 1;
            }

            if (currentVisibleImage) {
                moveTo(currentVisibleImage, 0, 800, 0, 0, 500, function (target) {
                    carouselContent.removeChild(target);
                });
            }

            currentVisibleImage = carouselImagesArray[imageIndex];
            carouselContent.appendChild(currentVisibleImage);
            currentVisibleImage.style.left = "-800px";
            moveTo(currentVisibleImage, -800, 0, 0, 0, 500, function () {
                switchImageAnimationPlaying = false;
            });
        }
    }

    function addInitCarouselImage() {
        imageIndex = 0;
        currentVisibleImage = carouselImagesArray[imageIndex];
        carouselContent.appendChild(currentVisibleImage);
    }

    function addListeners() {
        document.querySelector("#carousel .btn-pre").onclick = function () {
            showPreCarouselImage();
            restartSwitchImageTimer();
        };

        document.querySelector("#carousel .btn-next").onclick = function () {
            showNextCarouselImage();
            restartSwitchImageTimer();
        };
    }


    function showdownCarouselImage() {
        if (!switchImageAnimationPlaying) {
            switchImageAnimationPlaying = true;
            imageIndex++;
            if (imageIndex >= carouselImagesArray.length) {
                imageIndex = 0;
            }

            if (currentVisibleImage) {
                moveTo(currentVisibleImage, 0, 0, 0, 600, 500, function (target) {
                    carouselContent.removeChild(target);


                });
            }
            currentVisibleImage = carouselImagesArray[imageIndex];
            carouselContent.appendChild(currentVisibleImage);
            currentVisibleImage.style.left = "800px";
            moveTo(currentVisibleImage, 0, 0, 600, 0, 500, function () {
                switchImageAnimationPlaying = false;
            });
        }
    }
    function showupCarouselImage() {
        if (!switchImageAnimationPlaying) {
            switchImageAnimationPlaying = true;
            imageIndex++;
            if (imageIndex >= carouselImagesArray.length) {
                imageIndex = 0;
            }

            if (currentVisibleImage) {
                moveTo(currentVisibleImage, 0, 0, 0,-600 , 500, function (target) {
                    carouselContent.removeChild(target);


                });
            }
            // currentVisibleImage.style.filter="Alpha(Opacity="+0.5+")"
            currentVisibleImage = carouselImagesArray[imageIndex];
            carouselContent.appendChild(currentVisibleImage);
            currentVisibleImage.style.left = "800px";
            moveTo(currentVisibleImage, 0, 0, -600 ,0, 500, function () {
                switchImageAnimationPlaying = false;
            });
        }
    }


    function restartSwitchImageTimer() {
        if (switchImageTimerId != -1) {
            clearInterval(switchImageTimerId);
        }

        switchImageTimerId = setInterval(function () {
            // showNextCarouselImage();
            // showPreCarouselImage();
            // showdownCarouselImage();
            showupCarouselImage();
            // if(switchImageTimerId=1){
            //     showNextCarouselImage();
            // }else if(switchImageTimerId=2){
            //     showPreCarouselImage();
            // }else if(switchImageTimerId=3){
            //     showdownCarouselImage();
            // }else(switchImageTimerId=4){
            //     showupCarouselImage();
            // };

        }, 3000);
    }



    function init() {

        addListeners();

        addInitCarouselImage();
        restartSwitchImageTimer();
    }

    init();
})();