/**
 * Created by Administrator on 2016/8/10 0010.
 */


(function () {

    var eyeballPositionY = 88;//eyeball本身的定位距离
    var leftEyeballGlobalPositionX = 57;
    var rightEyeballGlobalPositionX = 157;
    var R = 15;//可以偏移的半径
    var eyeBallStartX = 20;//eyeball本身占得位置，xy各20px；
    var eyeBallStartY = 20;//起始位置
    var leftEye = document.querySelector(".left .eyeball");
    var rightEye = document.querySelector(".right .eyeball");


    function setEyeballPosition(eye, dx, dy) {
        var angle = Math.atan(dy / dx);//对边比临边得出，是一个角度
        var direction = dx > 0 ? 1 : -1;
        var eyeX = eyeBallStartX + R * Math.cos(angle) * direction;//math,cos(angle)得出是一个值，再乘半径就得出了水平方向偏移多少
        var eyeY = eyeBallStartY + R * Math.sin(angle) * direction;
        eye.style.left = eyeX + "px";
        eye.style.top = eyeY + "px";
    }


    document.addEventListener("mousemove", function (event) {
        setEyeballPosition(leftEye, event.pageX - leftEyeballGlobalPositionX, event.pageY - eyeballPositionY);
        setEyeballPosition(rightEye, event.pageX - rightEyeballGlobalPositionX, event.pageY - eyeballPositionY);
    });

})();
