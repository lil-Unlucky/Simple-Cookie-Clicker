const app = document.querySelector('.clicker-app');

if (app !== null) {
    // VARS
    let clicks = 0;
    let lvl = 0;
    let perClick = 1;
    let needToUp = 10;
    let isAuto = false;

    // COOKIE LOGIC
    const cookie = document.querySelector('.click-item');
    cookie.addEventListener('click', () => {
        clickEvent();
        
        const clickX = event.clientX;
        const clickY = event.clientY;
        const newElement = document.createElement('p');
        newElement.classList.add('magic-click-number');
        newElement.textContent = `+${perClick}`;
        newElement.style.position = 'absolute';
        newElement.style.top = `${clickY}px`;
        newElement.style.left = `${clickX}px`;
        newElement.style.fontSize = '28px';
        newElement.style.color = 'white';
        newElement.style.pointerEvents = 'none';
        newElement.style.transition = '0.5s linear';
        newElement.style.opacity = '1';
        newElement.style.transform = 'translateY(0)';
        document.body.appendChild(newElement);
      
        setTimeout(() => {
            newElement.style.opacity = '0';
            newElement.style.transform = 'translateY(-50px)';
          }, 100);
          
          setTimeout(() => {
            newElement.remove();
          }, 1000);
    });

    // BUTTON ACTIONS
    // UPGRADE
    const upgradeBtn = document.querySelector('.upgrade-button');
    upgradeBtn.addEventListener('click', () => {upgradeClick()});

    // AUTO-MODE
    const activeAutoModeBtn = document.querySelector('.auto-button');
    const lamp = document.querySelector('.lamp');
    const lampImg = lamp.querySelector('.lighter');
    let automode = null;
    activeAutoModeBtn.addEventListener('click', () => {
        activeAutoModeBtn.classList.toggle('active-btn');
        if(activeAutoModeBtn.classList.contains('active-btn')) {
            lampImg.classList.add('active-lamp');
            lampImg.src = 'assets/img/full lamp.png';
            isAuto = true;
            automode = setInterval(() => {
                clicks++;
                document.querySelector('.clicks-counter span').innerHTML = clicks;
            }, 1000);
        }
        else {
            lampImg.classList.remove('active-lamp');
            lampImg.src = 'assets/img/empty lamp.png';
            isAuto = false;
            clearInterval(automode);
        }
    });

    function clickEvent() {
        // CLICK LOGIC
        clicks += perClick;
        document.querySelector('.clicks-counter span').innerHTML = clicks;
    }

    function upgradeClick() {
        // UPGRADE LOGIC
        if(clicks >= needToUp) {
            clicks -= needToUp;
            lvl++;
            needToUp *= 2;
            (lvl % 3 == 0) ? perClick += 2 : perClick++;
            document.querySelector('.clicks-counter span').innerHTML = clicks;
        }
    }
} else {
    body.remove();
    alert('Ошибка инициализации приложения!\nОтсутствует основной компонент');
    console.error('Объект "clicker-app" был не найден!', 404);
}