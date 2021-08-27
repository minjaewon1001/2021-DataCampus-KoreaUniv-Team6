        var slider = new Swiper($("#modal_detail [data-slider='type02']"), {
            slidesPerView: '1',
            centeredSlides: true,
            loop: true,
            loopAdditionalSlides: 1,
            grabCursor: true,
            observer: true,
            observeParents: true,
            effect: 'coverflow',       
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 199,
                modifier: 1,
                slideShadows : true,
            },
            navigation: {
                nextEl: $slider.find('.swiper-button-next'),
                prevEl: $slider.find('.swiper-button-prev'),
            },             
        });
        $('[data-js="modalDetail"]').on('click', function(){
            slider.slideTo($(this).data('slide')+1, 1000);
        });