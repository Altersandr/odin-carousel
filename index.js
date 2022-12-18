const buttons = document.querySelectorAll("[data-carousel-button]");

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

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
        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        updateArrows(newIndex, prevBtn, nextBtn)
    })
})


let activeDot = document.querySelector('[data-active-dot]');
const dotsContainer = document.querySelector('.nav-dots');
const slidesContainer = document.querySelector('[data-slides]')


dotsContainer.addEventListener('click', (e)=>{
    let activeSlide = slidesContainer.querySelector("[data-active]")
    const targetedDot = e.target.closest('.dot');
    const index = [...dotsContainer.children].indexOf(targetedDot);
    activeDot = document.querySelector('[data-active-dot]');
    if(!targetedDot) return
    updateActiveDot(targetedDot, activeDot)
    activeDot = document.querySelector('[data-active-dot]');
    slidesContainer.children[index].dataset.active = true
    delete activeSlide.dataset.active
    updateArrows(index, prevBtn, nextBtn)

})


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
}