const iconBars = document.querySelector(".menu-bars");
const menu = document.querySelector(".items");
const cover = document.querySelector(".cover");
iconBars.addEventListener("click", function () {
  this.classList.toggle("menu-bars__bar--toggle");
  menu.classList.toggle("items--toggle");
  cover.classList.toggle("cover--show");
});

const portfolioListItems = document.querySelectorAll(".portfolio-list__item");
const resumeListItems = document.querySelectorAll(".resume-list__item");
const menuItems = document.querySelectorAll(".items__item");
let darkModeChanger =  document.querySelector('.btn-theme-change');
const darkModeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5S7 9.2 7 12zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S10.3 9 12 9zM13 5V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1S13 5.6 13 5zM19.1 4.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4C19.5 6 19.5 5.3 19.1 4.9zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1S21.6 11 21 11zM17.7 16.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.7 16.2zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1S11 18.4 11 19zM4.9 19.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4C4.5 18 4.5 18.7 4.9 19.1zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3C2.4 11 2 11.4 2 12zM6.3 4.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4C6.5 8 6.8 8.1 7.1 8.1S7.6 8 7.8 7.8c.4-.4.4-1 0-1.4L6.3 4.9z"/></svg>`
const lightModeIcon = `<svg viewBox="0 0 24 24"><path d="M12.3,4.9c0.4-0.2,0.6-0.7,0.5-1.1S12.2,3,11.7,3C6.8,3.1,3,7.1,3,12c0,5,4,9,9,9c3.8,0,7.1-2.4,8.4-5.9c0.2-0.4,0-0.9-0.4-1.2c-0.4-0.3-0.9-0.2-1.2,0.1c-1,0.9-2.3,1.4-3.7,1.4c-3.1,0-5.7-2.5-5.7-5.7C9.4,7.8,10.5,5.9,12.3,4.9zM15.1,17.4c0.5,0,1,0,1.4-0.1C15.3,18.4,13.7,19,12,19c-3.9,0-7-3.1-7-7c0-2.5,1.4-4.8,3.5-6c-0.7,1.1-1,2.4-1,3.8C7.4,14,10.9,17.4,15.1,17.4z"/></svg>`


if(window.localStorage.getItem('theme') === 'dark-mode') {
  document.documentElement.classList.add('dark-theme');
  darkModeChanger.innerHTML = darkModeIcon
}
               




function navigationHander(
  listItems,
  listItemActiveClass,
  contentShowClass,
  attributeName
) {
  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      removeClass(listItemActiveClass);
      removeClass(contentShowClass);

      this.classList.add(listItemActiveClass);
      let target = item.getAttribute(attributeName);
      document.querySelector(target).classList.add(contentShowClass);
    });
  });
}
navigationHander(
  resumeListItems,
  "resume-list__item--active",
  "resume-content--show",
  "data-resume-id"
);
navigationHander(
  portfolioListItems,
  "portfolio-list__item--active",
  "protfolio-content--show",
  "data-portfolio-name"
);

function removeClass(className) {
  document.querySelector(`.${className}`).classList.remove(className);
}

menuItems.forEach(function (item) {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    removeClass("items__item-link--active");
    item.classList.add("items__item-link--active");
    let sectionDataAttr = item.getAttribute("data-section");
    let sectionClass = document.querySelector(`.${sectionDataAttr}`).offsetTop;

    window.scrollTo({
      top: sectionClass - 85,
      behavior: "smooth",
    });
  });
});

const sections = document.querySelectorAll("main > section");
const interSectionObserver = new IntersectionObserver(obServerHandler, {
  threshold: 0.5,
});

function obServerHandler(allSections) {
  allSections.map((section) => {
   
    if (section.isIntersecting) {
      let sectionClassName = section.target.className;
      removeClass("items__item-link--active");
      document
        .querySelector(`.items__item[data-section = ${sectionClassName}]`)
        .classList.add("items__item-link--active");
    }
  });
}

sections.forEach((section) => {
  interSectionObserver.observe(section);
});




darkModeChanger.addEventListener('click' , function() {
  document.documentElement.classList.toggle('dark-theme');
  if(document.documentElement.classList.contains("dark-theme")){
    window.localStorage.setItem('theme' , 'dark-mode');
    this.innerHTML = darkModeIcon;
  }
  else{
    this.innerHTML = lightModeIcon;
    window.localStorage.setItem('theme' , 'light-mode');

  }
    
}) 




 