// Global touch events

if(!navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry)/)){
    var downEvent = 'mousedown ',
        moveEvent = 'mousemove ',
        upEvent = 'mouseup ';
} else {
    var onDevice = 'ontouchend' in window,
        downEvent = (onDevice) ? 'touchstart ' : 'mousedown ',
        moveEvent = (onDevice) ? 'touchmove ' : 'mousemove ',
        upEvent = (onDevice) ? 'touchend ' : 'mouseup ';
}


