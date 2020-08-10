class NavBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <nav>
        <div class="avatar">
          <img src="./assets/avatar.png" alt="avatar"/>
          <div class="avatar-info">
            <p>Mokshit Jain</p>
            <p><span class="gold">G</span> 10030</p>
          </div>
        </div>
        <div class="nav-links">
          <a href="#">Home</a>
          <a href="#">Mixer</a>
          <a href="#">Community</a>
          <a href="#">Entertainment</a>
          <a href="#">Store</a>
        </div>
        <div class="nav-info">
          <i class="fas fa-microphone-slash"></i>
          <i class="fas fa-battery-three-quarters"></i>
          <p class="time"></p>
        </div>
      </nav>
    `;
  }
}

class GridItem extends HTMLElement {
  constructor() {
    super();

    const image = this.getAttribute('image') || 'my-games-icon.png';
    const text = this.getAttribute('text');
    const full = this.getAttribute('full');
    const wide = this.getAttribute('wide');

    this.innerHTML = `
      <div class="wrapper">
        <img src="./assets/${image}" alt="">
        ${
          text
            ? `
          <div class="overlay ${full && 'full'} ${wide && 'wide'}">
            <div class="content">
              ${text}
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;
  }
}

window.customElements.define('nav-bar', NavBar);
window.customElements.define('game-item', GridItem);

const time = document.querySelector('.time');

const setTime = () => {
  const today = new Date();
  const _hours = today.getHours();
  const hours = _hours.toString().length < 2 ? `0${_hours}` : _hours;
  const _minutes = today.getMinutes();
  const minutes = _minutes.toString().length < 2 ? `0${_minutes}` : _minutes;
  const timePeriod = hours > 12 ? 'PM' : 'AM';
  time.innerText = `${hours}:${minutes} ${timePeriod}`;
};

setTime();

setInterval(setTime, 5000);

const navBar = document.querySelector('nav');
const handleScroll = () => {
  const navHeight = navBar.clientHeight;
  console.log(navHeight);
  if (window.scrollY > navHeight) {
    navBar.classList.add('scrolled-down');
  } else {
    navBar.classList.remove('scrolled-down');
  }
};

window.addEventListener('scroll', handleScroll);
