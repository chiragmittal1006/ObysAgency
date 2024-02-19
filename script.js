const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

var animate = function () {
  gsap.from(".loader-line1 h1,.loader-line2 h1,.loader-line3 h1", {
    y: "100%",
    duration: 0.8,
    delay: 0.2,
    opacity: 0,
    stagger: 0.2,
  });
  gsap.from(".loader p", {
    opacity: 0,
    delay: 0.8,
    duration: 0.5,
    onStart: () => {
      var a = 0;
      var intervalID = setInterval(() => {
        if (a <= 99) {
          a++;
          document.querySelector(".loader-line1-span").innerHTML = a;
        } else {
          clearInterval(intervalID);
        }
      }, 30);
    },
  });

  var tl = gsap.timeline();
  tl.to(
    ".loader",
    {
      opacity: 0,
      delay: 4.2,
      duration: 0.6,
    },
    "anim"
  );
  tl.from(
    ".page1",
    {
      y: "100%",
      delay: 4.3,
      duration: 1,
      ease: "power4.inOut",
    },
    "anim"
  );
  tl.from(".navbar", {
    opacity: 0,
  });
  tl.from(".page1-content-2-h1 h1", {
    y: "120%",
  });
  tl.to(".loader", {
    display: "none",
  });
};
animate();

var cursorAnimation = () => {
  gsap.to(".navbar-right,.navbar-left span", {
    opacity: 0,
    ease: "expo.inOut",
    scrollTrigger: {
      trigger: ".page1-image",
      scroller: ".main",
      start: "top 88%",
      end: "top 82%",
      scrub: true,
    },
  });

  document.addEventListener("mousemove", (dets) => {
    gsap.to(".cursor", {
      y: dets.y,
      x: dets.x,
    });
  });

  Shery.makeMagnet(
    ".navbar-left button , .navbar-right span" /* Element to target.*/,
    {
      //Parameters are optional.
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    }
  );
};
cursorAnimation();

var imageCursorFlag = () => {
  var flag = true;
  document
    .querySelector(".page1-image-content")
    .addEventListener("click", () => {
      if (flag === true) {
        document.querySelector(".page1-image .crsr").style.transform =
          "scale(0.5)";
        document.querySelector(".page1-image .crsr").innerHTML =
          '<i class="fa-solid fa-pause"></i>';
        document.querySelector(".page1-image-content img").style.display =
          "none";
        document.querySelector(".page1-image-content video").style.display =
          "block";
        document.querySelector(".page1-image-content video").play();
        flag = false;
      } else {
        document.querySelector(".page1-image .crsr").style.transform =
          "scale(1)";
        document.querySelector(".page1-image .crsr").innerHTML =
          '<i class="fa-solid fa-play"></i>';
        document.querySelector(".page1-image-content img").style.display =
          "block";
        document.querySelector(".page1-image-content video").style.display =
          "none";
        document.querySelector(".page1-image-content video").pause();
        flag = true;
      }
    });
};
imageCursorFlag();

var scrolltriggerEvents = () => {
  var t2 = gsap.timeline({
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page4",
      start: "top 60%",
      end: "top 10%",
    },
  });
  t2.from(".page4-part1-1", {
    transform: "scale(0)",
  });
  t2.from(".page4-part2 h3", {
    y: "120%",
    opacity: 0,
    stagger: 0.1,
  });

  gsap.from(".page5-part1-1", {
    transform: "scale(0)",
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top 50%",
      end: "top 30%",
    },
  });
};
scrolltriggerEvents();

var gsapAnim = () => {
  gsap.from(".page6-part1-conntent2-ul", {
    transform: "scale(0)",
    stagger: 0.5,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page6-part1-conntent2-ul",
      start: "top 60%",
      end: "top 30%",
    },
  });
  gsap.to(".page6-animate h1", {
    transform: "translateY(0)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page6-part1-conntent2-ul",
      start: "top 60%",
      end: "top 30%",
    },
  });
  gsap.to("#page1-content-2", {
    y: "-5vw",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2",
      start: "top 80%",
      end: "top 20%",
      scrub: 1,
    },
  });
};
gsapAnim();

var page3Anima = () => {
  var t3 = gsap.timeline({
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page3-part1-c2",
      start: "top 50%",
      end: "top 30%",
    },
  });
  t3.from(
    ".page3-part1-c2 h1",
    {
      y: "100%",
    },
    "hello"
  );
  t3.from(
    ".page3-part1-c1",
    {
      transform: "scale(0)",
    },
    "hello"
  );
  t3.from(".page3-part1-c3", {
    transform: "scale(0)",
  });
};
page3Anima();

var sheryAnimation = () => {
  Shery.imageEffect(".page3-part2-sec1-img1", {
    style: 5,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: "9996999", range: [-9999999, 9999999] },
      aspect: { value: 0.7915792178866664 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 10, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.27, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: false },
      onMouse: { value: 1 },
      noise_speed: { value: 0.61, range: [0, 10] },
      metaball: { value: 0.5, range: [0, 2], _gsap: { id: 39 } },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.37, range: [0, 2] },
      noise_scale: { value: 8.4, range: [0, 100] },
    },
    gooey: true,
  });
};
sheryAnimation();

var page1Image = () => {
  var mouse = document.querySelector(".page1-image-content");
  var crsr = document.querySelector(".page1-image .crsr");
  var cursor = document.querySelector(".cursor");

  mouse.addEventListener("mouseenter", () => {
    cursor.style.display = "none";
    mouse.addEventListener("mousemove", (dets) => {
      var topi = mouse.getBoundingClientRect().top;
      var vw = window.innerWidth * 0.05;
      gsap.to(crsr, {
        left: dets.x - vw,
        top: dets.y - topi - vw,
        ease: "power4.out",
      });
    });
  });

  mouse.addEventListener("mouseleave", () => {
    cursor.style.display = "block";
    gsap.to(crsr, {
      top: "-5vw",
      left: "80vw",
    });
  });
};
page1Image();

var page1KaFlag = () => {
  var flags = document.querySelector(".page1-content-2");
  var lefty = flags.getBoundingClientRect().left;
  var wi = window.innerWidth * 0.09;
  document
    .querySelector("#page1-ka-flag")
    .addEventListener("mousemove", (dets) => {
      document.querySelector(".flag").style.display = "block";
      gsap.to(".flag", {
        x: dets.x - lefty - wi,
      });
    });
  document
    .querySelector("#page1-ka-flag")
    .addEventListener("mouseleave", (dets) => {
      document.querySelector(".flag").style.display = "none";
    });
};
page1KaFlag();