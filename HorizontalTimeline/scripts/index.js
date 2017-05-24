const timeline = document.querySelector('.timeline ol'),
	  elH = document.querySelectorAll('.timeline ol div'),
	  arrows = document.querySelectorAll('.arrows .arrow'),
	  arrowPrev = document.querySelector('.timeline .arrows .arrow-pre'),
	  arrowNext = document.querySelector('.timeline .arrows .arrow-next'),
	  firstItem = document.querySelector('.timeline li:first-child'),
	  lastItem = document.querySelector('.timeline ol li:last-child'),
	  xScrolling = 280,
	  disabledClass = 'disabled';

window.addEventListener('load', init, false);

function init() {
	setEqualHeight(elH);
	arrowPrev.disabled = true;
	animateTl(xScrolling, arrows, timeline);
	setSwipeFn(timeline, arrowPrev, arrowNext);
	setKeyboardFn(arrowPrev, arrowNext);
}

function setEqualHeight(el) {
	var largestHeight = (el[0] && el[0].offsetHeight) || 0,
		length = el.length;

	for(var i = 1; i < length; i++) {
		if (el[i].offsetHeight > largestHeight) {
			largestHeight = el[i].offsetHeight;
		}
	}

	for(var i = 0; i < length; i++) {
		el[i].style.height = largestHeight + 'px';
	}
}

function animateTl(scrolling, el, tl) {
	for(var i = 0; i < el.length; i++) {
		var count = 0;
		el[i].addEventListener('click', function() {

			if (!arrowPrev.disabled) {
				arrowPrev.disabled = true;
			}

			if (!arrowNext.disabled) {
				arrowNext.disabled = true;
			}

			var sign = (this.classList.contains('arrow-pre')) ? "" : "-";

			if (count === 0) {
				tl.style.transform = "translateX( -" + scrolling + 'px )';
			} else {
				var tlStyle = getComputedStyle(tl),
					values = parseInt(tlStyle.getPropertyValue('transform').split(',')[4]) + 
							 parseInt(sign + scrolling);
				tl.style.transform = 'translateX(' + values + 'px )';
			}
			count += 1;

			setTimeout(()=> {
				isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
				isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
			}, 1100);
		}, false);
	}
}

function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function setBtnState(el, flag = true) {
	if (flag) {
		el.classList.add(disabledClass);
	} else {
		if (el.classList.contains(disabledClass)) {
			el.classList.remove(disabledClass);
		}
		el.disabled = false;
	}
}

function setSwipeFn(tl, prev, next) {
	const hammer = new Hammer(tl);
	hammer.on('swipeleft', ()=>{ next.click(); });
	hammer.on('swiperight', ()=>{ prev.click(); });
}

function setKeyboardFn(prev, next) {
	document.addEventListener('keydown', (e)=> {
		if (e.which === 37 || e.which === 39) {
			var timelineOffsetTop = timeline.offsetTop,
				y = window.pageYOffset;

			if (timelineOffsetTop !== y) {
				window.scrollTo(0, timelineOffsetTop);
			}

			if (e.which === 37) {
				prev.click();
			}

			if (e.which === 39) {
				next.click();
			}
		}
	});
}
