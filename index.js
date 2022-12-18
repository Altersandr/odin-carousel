const buttons = document.querySelectorAll("[data-carousel-button]");

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const dotsContainer = document.querySelector('.nav-dots');
const slidesContainer = document.querySelector('[data-slides]');

let activeSlide = slidesContainer.querySelector("[data-active]")

const updateActiveDot = (targetedDot, activeDot) => {
    targetedDot.dataset.activeDot  = true;
    delete activeDot.dataset.activeDot;
};

const updateArrows = (index, prevBtn, nextBtn)=>{
    
    if(index===0) {
        nextBtn.classList.remove('hidden');
        prevBtn.classList.add('hidden');
    }else if (index ===slidesContainer.children.length -1){
        prevBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
    }else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
};

const updateSlide = (slidesContainer, activeSlide, index)=>{
    slidesContainer.children[index].dataset.active = true
    delete activeSlide.dataset.active
};

const automaticSlideUpdate = ()=>{
    activeSlide = slidesContainer.querySelector("[data-active]");
    let newIndex = [...slidesContainer.children].indexOf(activeSlide) + 1
    if(newIndex < 0) newIndex = slidesContainer.children - 1
    if(newIndex >=slidesContainer.children.length) newIndex = 0

    updateSlide(slidesContainer, activeSlide, newIndex);
    updateArrows(newIndex, prevBtn, nextBtn);
    let activeDot = document.querySelector('[data-active-dot]');
    let nextDot = activeDot.nextElementSibling;
    if(!nextDot) {
        nextDot =  dotsContainer.querySelector('.dot');}
    updateActiveDot(nextDot, activeDot);
};





buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if(newIndex < 0) newIndex = slides.children - 1
        if(newIndex >=slides.children.length) newIndex = 0
        let activeDot = document.querySelector('[data-active-dot]');
        const nextDot = activeDot.nextElementSibling;
        const prevDot = activeDot.previousElementSibling;
        if(offset ===1) updateActiveDot(nextDot, activeDot)
        if(offset ===-1) updateActiveDot(prevDot, activeDot)
        updateSlide(slides, activeSlide, newIndex)
        updateArrows(newIndex, prevBtn, nextBtn)
    })
});


dotsContainer.addEventListener('click', (e)=>{
    let activeDot = document.querySelector('[data-active-dot]');
    activeSlide = slidesContainer.querySelector("[data-active]")
    const targetedDot = e.target.closest('.dot');
    const index = [...dotsContainer.children].indexOf(targetedDot);
    if(!targetedDot) return
    updateActiveDot(targetedDot, activeDot)
    updateSlide(slidesContainer, activeSlide, index)
    updateArrows(index, prevBtn, nextBtn)

});

const myInterval = window.setInterval(automaticSlideUpdate, 5000);


const clearMyInterval = ()=>{
    clearInterval(myInterval)
}

document.addEventListener('click', clearMyInterval);