// Global touch events

var onDevice = 'ontouchend' in window,
    downEvent = (onDevice) ? 'touchstart ' : 'mousedown ',
    moveEvent = (onDevice) ? 'touchmove ' : 'mousemove ',
    upEvent = (onDevice) ? 'touchend ' : 'mouseup ';
