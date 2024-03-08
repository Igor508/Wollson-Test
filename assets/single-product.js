// Init swiper slider


const initSwiper = () => {
  let sp_swiper = new Swiper('.single-product .swiper-main', {
    loop: true,
    loopedSlides: 10,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  
  let sp_swiper_thumb = new Swiper('.single-product .swiper-thumb', {
    loop: true,
    loopedSlides: 10,
    spaceBetween: 10,
    slideToClickedSlide: true,
    slidesPerView: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  
  sp_swiper.controller.control = sp_swiper_thumb;
  sp_swiper_thumb.controller.control = sp_swiper;  
}


// Init quatity event listener

const initQtySelector = () => {
  const el = {
    wrapper: '.single-product-qty',
    btn_plus: '.qty-plus',
    btn_minus: '.qty-minus',
    qty_input: '[name="quantity"]'
  }

  const wrapper = document.querySelector(el.wrapper);
  if(wrapper) {
    wrapper.querySelector(el.btn_plus).addEventListener('click', (e) => {
      e.preventDefault();
      updateQty(1);
    })
    wrapper.querySelector(el.btn_minus).addEventListener('click', (e) => {
      e.preventDefault();
      updateQty(-1);
    })
  }

  function updateQty(offset) {
    let input = wrapper.querySelector(el.qty_input);
    if(Number(input.value) + offset > 0) {
      input.value = Number(input.value) + offset;
    }
  }
}


// Init variant swatch

const initVariantSwatch = () => {
  const el = {
    swatch: '.swatch-button input',
    activeSwatch: '.swatch-button input:checked',
    v_selector: 'select[name="id"]',
    p_selector: '.single-product-price'
  }

  let v_selector = document.querySelector(el.v_selector);

  if(!v_selector) {
    return;
  }

  document.querySelectorAll(el.swatch).forEach((swatch) => {
    swatch.addEventListener('change', () => {

      let opt_selector = '';
      document.querySelectorAll(el.activeSwatch).forEach((active_swatch) => {
        opt_selector += `[data-${active_swatch.dataset.option}="${swatch.value}"]`;
      })

      let new_variant = v_selector.querySelector(`option${opt_selector}`);
      v_selector.value = new_variant.value;

      updatePrice(new_variant.dataset.price, new_variant.dataset.comparePrice);
    })
  })

  function updatePrice(price, c_price) {
    let p_selector = document.querySelector(el.p_selector);
    let price_str = `<span class="single-product-price">${price}${c_price ? ' <s class="compare-price">' + c_price + '</s>' : ''}</span>`;

    if(p_selector) {
      p_selector.outerHTML = price_str;
    }
  }

}


initSwiper();
initQtySelector();
initVariantSwatch();