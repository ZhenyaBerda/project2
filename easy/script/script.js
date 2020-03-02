window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        let clockId;

        const getTimeRemaining = () => {

            const addZero = (number) => {
                let strNumber = number.toString();

                if (strNumber.length === 1) {
                    return `0` + strNumber;
                } else {
                    return strNumber;
                }
            };

            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = addZero(Math.floor(timeRemaining % 60)),
                minutes = addZero(Math.floor((timeRemaining / 60) % 60)),
                hours = addZero(Math.floor(timeRemaining / 60 / 60));
            // day = Math.floor(timeRemaining / 60 / 60 / 24);

            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining <= 0) {
                clearInterval(clockId);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        };

        clockId = setInterval(updateClock, 1000);
    };

    countTimer('12 mar 2020');


    // menu
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            body = document.querySelector('body');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        body.addEventListener('click', (event) => {

            let target = event.target;

            if (target.closest('.menu')) {
                handlerMenu();
                return;
            }

            if (target.closest('menu') && target.matches('a')) {
                event.preventDefault();
                handlerMenu();
                const href = target.getAttribute('href');

                if (href !== '#close') {
                    document.querySelector(`${href}`).scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
                return;
            }

            if (!target.closest('menu') && menu.classList.contains('active-menu')) {
                handlerMenu();
            }
        });
    };

    toggleMenu();

    // кнопка scroll
    const scroll = () => {
        const scrollBtn = document.querySelector('a');
        scrollBtn.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#service-block').scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });

    };

    scroll();

    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        let moveId, count;

        const movePopup = () => {
            moveId = requestAnimationFrame(movePopup);

            count += 5;

            if (popupContent.style.top !== '10%') {
                popupContent.style.top = `${count}%`;
            } else {
                cancelAnimationFrame(moveId);
            }

        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (document.documentElement.clientWidth > 768) {
                    popupContent.style.top = `-100%`;
                    count = -100;
                    popup.style.display = 'block';
                    movePopup();
                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });

    };

    togglePopup();

    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // add dots in slider



    // slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const addDots = () => {
            const dotsConteiner = document.querySelector('.portfolio-dots');

            for (let i = 0; i < slide.length; i++) {
                const li = document.createElement('li');
                li.classList.add('dot');

                if (i === 0) {
                    li.classList.add('dot-active');
                }
                dotsConteiner.appendChild(li);
            }
        };

        addDots();
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide(1500);
            }
        });


        startSlide(1500);

    };

    slider();

    // смена картинок в "Наша команда"
    const switchImg = () => {
        const container = document.querySelector('.command');

        const switcher = (target) => {
            const src = target.src;
            target.src = target.dataset.img;
            target.dataset.img = src;
        };

        container.addEventListener('mouseover', (event) => {
            const target = event.target;

            if (target.matches('img')) {
                switcher(target);
            }

        });

        container.addEventListener('mouseout', (event) => {
            const target = event.target;
            if (target.matches('img')) {
                switcher(target);
            }
        });

    };

    switchImg();

    // calculator
    const calculator = (price) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        calcBlock.addEventListener('input', (event) => {
            const target = event.target;

            if (target.matches('input')) {
                target.value = target.value.replace(/[^\d,]/g, '');
            }
        });


        const countSum = (price = 100) => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (+calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('.calc-type') || target.matches('.calc-square') ||
                target.matches('.calc-day') || target.matches('.calc-count')) {
                countSum();
            }

        });
    };
    calculator(100);

    //send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...';
        let animateId, count;

        const statusMessage = document.createElement('div');


        const postData = (body) => {

            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {

                    if (request.readyState !== 4) {
                        return;
                    }
                    clearInterval(animateId);
                    if (request.status === 200) {

                        resolve();
                    } else {
                        reject(request.statusText);
                    }
                });


                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');


                request.send(JSON.stringify(body));

            });
        };

        // запрет ввода неккоректных данных 
        document.body.addEventListener('input', (event) => {
            const target = event.target;

            if (target.closest('input')) {
                if (target.getAttribute('name') === 'user_name' || target.matches('.mess')) {
                    target.value = target.value.replace(/[^а-яё ]/ig, '');
                }

                if (target.getAttribute('type') === 'email') {
                    target.value = target.value.replace(/[^a-z@\.]/ig, '');
                }

                if (target.getAttribute('type') === 'tel') {
                    target.value = target.value.replace(/[^+0-9]/ig, '');
                }
            }
        });

        const successData = () => {
            statusMessage.textContent = '';
            const img = document.createElement('img');
            img.setAttribute('src', './images/done.png');
            img.style.cssText = 'height: 6rem;';
            statusMessage.appendChild(img);
        };

        const errorData = () => {
            statusMessage.style.cssText = `font-size: 2rem; color: #fff`;
            statusMessage.textContent = errorMessage;
        };

        // отправка формы
        document.body.addEventListener('submit', (event) => {
            statusMessage.textContent = '';
            const target = event.target;
            if (target.closest('form')) {
                event.preventDefault();
                const form = target.closest('form');

                form.appendChild(statusMessage);

                // анимация
                count = 0;
                statusMessage.style.cssText = `font-size: 6rem; color: #fff`;
                animateId = setInterval(() => {
                    count = ++count % 3;
                    statusMessage.textContent = `.${Array(count+1).join('.')}`;
                }, 500);


                const formData = new FormData(form);

                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                postData(body)
                    .then(successData)
                    .catch(errorData);

                form.reset();

            }
        });


    };

    sendForm();
});