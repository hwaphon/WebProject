function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
  	rect.top >= 0 &&
   rect.left >= 0 &&
   rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

var items = document.querySelectorAll('.timeline li');
function callbackFunc() {
  var length = items.length;
  for(var i = 0; i < length; i++) {
    if(isElementInViewport(items[i])) {
      items[i].classList.add('in-view');
    }
  }
}

window.addEventListener('load', callbackFunc);
window.addEventListener('scroll', callbackFunc);