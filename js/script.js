function cl(argument) {
	console.log(argument);
}

		// -------Media Queries for JS-----
var screenLess1024px = window.matchMedia( "(max-device-width: 1023px)" );
var screenLess640px = window.matchMedia( "(max-device-width: 639px)" );


// ------------блок "Обратная связь"----------
function showFeedBack() {
	var container = document.querySelector('.feedback-container'),
	wrapper = document.querySelector('.background-wrapper');
    
    container.style.visibility = "visible"; //обратная связь
    container.style.opacity = "1";
    wrapper.style.display = 'block'; //полупрозрачный фон
}

function closeFeedBack() {
	var container = document.querySelector('.feedback-container'),
	wrapper = document.querySelector('.background-wrapper');
    
    container.style.visibility = "hidden"; //обратная связь
    container.style.opacity = "0";
    wrapper.style.display = 'none'; //полупрозрачный фон
}

// ============================================
// ----------------Left Menu---------------

function openCloseLeftMenu(elem) {
	var element = elem;
	var menuItem = element.nextElementSibling;
	// var menuItem = document.querySelector('.' + element + ' + ul');

	if (menuItem.style.display != 'block') {
			
			menuItem.style.display = 'block';

		setTimeout(function() {
			if (screenLess1024px.matches) {
				menuItem.style.height = (menuItem.children.length) * 35 + "px";
			} else {
				if (screenLess640px.matches) {
				menuItem.style.height = (menuItem.children.length) * 50 + "px";
			} else menuItem.style.height = (menuItem.children.length) * 24 + "px";
		}
			
		},20);
		
		setTimeout(function() {
			menuItem.style.opacity = '1';
		},100);
		
		
		menuItem.style.transition = "all .7s";
		
	} else {
		menuItem.style.transition = "all .7s";
		menuItem.style.opacity = '0';
		
		setTimeout(function() {
			menuItem.style.height = "0";
		},20);
		setTimeout(function() {
			menuItem.style.display = 'none';
		},700);
	};
}

// ============================================
// ----------------Slider---------------
// назвать это слайдером - язык не поворачивается,
// это первая попытка на пути в этом направлении
// ----------------------------------------

var SlidesQuantity = 4,  //Количество слайдов (константа)
		currentSlide = 1; //текущий слайд (изменяющаяся глобальная переменная)

var prevSliderArrow = document.querySelector('.slider-arrow > button[name="prev"]'),
	  nextSliderArrow = document.querySelector('.slider-arrow > button[name="next"]');

prevSliderArrow.onclick = prevSliderImage;
nextSliderArrow.onclick = nextSliderImage;


   // -----Стрелки слайдера-----
function prevSliderImage() {   	//Предыдущий слайд
	var sliderElement = document.querySelector('.slider-background');

	clearCurrentSliderButton(currentSlide) //очистка текущего положения слайдера на нав. панели
	
	sliderElement.style.opacity = '0';

	setTimeout(function() {
	sliderElement.classList.remove('slider-background-' + currentSlide);

		if (currentSlide > 1) {			//изменение номера текущего слайда
			currentSlide--;
		} else {
			currentSlide = SlidesQuantity;
		};

		highlightCurrentSliderButton(currentSlide); //подсветка текущего положения слайдера на нав. панели
	},580);

	
	setTimeout(function() {
		sliderElement.classList.add('slider-background-' + currentSlide);
	},600);

	setTimeout(function() {
			sliderElement.style.opacity = '1';
		},700);	
}

function nextSliderImage() {  				//Следующий слайд
	var sliderElement = document.querySelector('.slider-background');

	clearCurrentSliderButton(currentSlide) //очистка текущего положения слайдера на нав. панели

	sliderElement.style.opacity = '0';

	setTimeout(function() {
		sliderElement.classList.remove('slider-background-' + currentSlide);

		if (currentSlide < SlidesQuantity) {  //изменение номера текущего слайда
			currentSlide++;	
		} else {
			currentSlide = 1;
		};

		highlightCurrentSliderButton(currentSlide); //подсветка текущего положения слайдера на нав. панели
	},580);

	setTimeout(function() {
		sliderElement.classList.add('slider-background-' + currentSlide);
	},600);

	setTimeout(function() {
			sliderElement.style.opacity = '1';
		},700);	
}

			// -----------------------
// --------Навигатор слайдера-----------
(function navSliderButtonsCreate(SlidesQuantity) {

	for (var i = 1; i < SlidesQuantity + 1; i++) {
		var newElement = document.createElement('div');
		newElement.className = 'slider-nav-button slider-nav-button-' + i;
		sliderButtonsContainer.appendChild(newElement);
	};

	highlightCurrentSliderButton(currentSlide); //подсветка текущего слайдера на нав. панели

})(SlidesQuantity);

// --------Функциональность кнопок навигатора слайдера-----------
var sliderNavContainer = document.getElementById('sliderButtonsContainer');

sliderNavContainer.onclick = function(event) {
	var targetElement = event.target;
	var sliderElement = document.querySelector('.slider-background');
	var newCurrentSlide = targetElement.className.slice(-1);

	sliderElement.style.opacity = '0';

	clearCurrentSliderButton(currentSlide) //очистка текущего положения слайдера на нав. панели
	
	setTimeout(function() {
		sliderElement.classList.remove('slider-background-' + currentSlide);

		currentSlide = newCurrentSlide; //изменение номера текущего слайда

		highlightCurrentSliderButton(currentSlide); //подсветка текущего положения слайдера на нав. панели
	},580);

	setTimeout(function() {
		sliderElement.classList.add('slider-background-' + currentSlide);
	},600);

	setTimeout(function() {
			sliderElement.style.opacity = '1';
		},700);	
}


     // ------подсветка и очистка фона нав. кнопок слайдера----
function highlightCurrentSliderButton(currentSlide) {
	var element = document.querySelector('.slider-nav-button-' + currentSlide);
		element.classList.add('active');
}

function clearCurrentSliderButton(currentSlide) {
	var element = document.querySelector('.slider-nav-button-' + currentSlide);
		element.classList.remove('active');
}

// ============================================
// ----------------Price format---------------
(function priceFormat() {
	var itemContainer = document.querySelector('.goods-list');
	var elementsCount = 0;
	var itemElement, price, resultElement;
	
	if (!itemContainer) {return} else {
		for (var i = 0; i < itemContainer.children.length; i++) {
			elementsCount++;
			itemElement = document.querySelector('.goods-item-' + elementsCount + ' .product-price');

			price = itemElement.innerHTML;
			price = +price;
			resultElement = document.querySelector('.goods-item-' + elementsCount + ' .formated-product-price');
			resultElement.innerHTML = formatedPrice(price);

			function formatedPrice(val) {
				var strVal = val + "";
				var res = "";

				if (isNaN(val)) {
					resultElement.className = 'formated-product-price smaller-font'
					return res = "цена не указана";
				} 
				else {
					if (strVal.length > 3) {
						var count = 1 - (strVal.length % 3); //установка счетчика позиции пробелов
						for (var i = 0; i < strVal.length; i++) {
							res = res + strVal[i];
							if (count == 0 || count == 3 && i + 1 < strVal.length) {
								res = res + " ";
								count = 0;
							};
							count++;
						};
					} else {
						res = strVal;
					};
				};

				return res + " p.";
			}
		};
	};
	
})();

