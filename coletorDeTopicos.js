document.querySelectorAll('.glide__slides:not(.glide__slide--clone)')
    .forEach(function (slide, i) {
        slide.addEventListener('change', function () {
            var trueView = slide.classList.contains('glide__slide--active')
                && checkVisible(slide)
                && !slide.dataset.jaVizualizado;

            if (trueView) {
                var slideLink = slide.querySelector('a').href;
                dataLayer.push({
                    event: 'gaSendEvent',
                    gaEventCategory: '',
                    gaEventCategory: 'True View',
                    gaEventLabel: 'Banner ' + (i + 1) + " | Link: " + slideLink
                });
                slide.dataset.jaVizualizado = true;
            }
        })
    })

function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}