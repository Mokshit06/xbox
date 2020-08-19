class NavBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <nav>
        <div class="hamburger">
          <div class="line-1"></div>
          <div class="line-2"></div>
          <div class="line-3"></div>
        </div>
        <div class="avatar">
          <img src="./assets/avatar.png" alt="avatar"/>
          <div class="avatar-info">
            <p>Mokshit Jain</p>
            <p><span class="gold">G</span> 10030</p>
          </div>
        </div>
        <div class="nav-links">
          <a href="#">Home</a>
          <a href="/library.html">Library</a>
          <a href="#">Community</a>
          <a href="#">Entertainment</a>
          <i class="far fa-moon toggle"></i>
        </div>
        <div class="nav-info">
          <i class="fas fa-microphone-slash"></i>
          <i class="fas fa-battery-three-quarters"></i>
          <p class="nav-time"></p>
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
          <div class="overlay ${full ? 'full' : ''} ${wide ? 'wide' : ''}">
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

const navBar = document.querySelector('nav');
let isScrolledDown = false;
const handleScroll = () => {
  const navHeight = navBar.clientHeight;
  if (window.scrollY > navHeight) {
    navBar.classList.add('scrolled-down');
    isScrolledDown = true;
  } else {
    navBar.classList.remove('scrolled-down');
    isScrolledDown = false;
  }
};

window.addEventListener('scroll', handleScroll);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  links.forEach(link => {
    link.classList.toggle('fade');
  });
  if (isScrolledDown) {
    navBar.classList.toggle('scrolled-down');
  }
  hamburger.classList.toggle('nav-toggle');
});

const time = document.querySelector('.nav-time');

const setTime = () => {
  const today = new Date();
  let _hours = today.getHours();
  let timePeriod;

  if (_hours > 12) {
    timePeriod = 'PM';
    _hours = _hours - 12;
  } else {
    timePeriod = 'AM';
  }

  const hours = _hours.toString().length < 2 ? `0${_hours}` : _hours;
  let _minutes = today.getMinutes();
  const minutes = _minutes.toString().length < 2 ? `0${_minutes}` : _minutes;
  time.innerText = `${hours}:${minutes} ${timePeriod}`;
};

setTime();

setInterval(setTime, 5000);

const likeBtn = document.querySelector('.far.fa-heart');

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('fas');
  likeBtn.classList.toggle('liked');
});

const toggleTheme = document.querySelector('.toggle');

toggleTheme.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('light');
  toggleTheme.classList.toggle('fa-sun');
});
