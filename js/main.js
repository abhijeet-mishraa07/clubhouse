(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');
        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

    // Dynamic year and section dropdown logic
    document.getElementById('branch').addEventListener('change', function () {
        const branch = this.value;
        const yearSelect = document.getElementById('year');
        yearSelect.innerHTML = '<option value="" disabled selected>Select a year</option>';
        const sectionSelect = document.getElementById('section');
        sectionSelect.innerHTML = '<option value="" disabled selected>Select a section</option>';

        let years = [];
        if (branch === 'BCA' || branch === 'BBA' || branch === 'B.PHARMA') {
            years = ['1', '2', '3'];
        } else if (branch === 'BTECH') {
            years = ['1', '2', '3', '4'];
        } else if (branch === 'MCA' || branch === 'MBA') {
            years = ['1', '2'];
        }

        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = `${year} Year`;
            yearSelect.appendChild(option);
        });
    });

    document.getElementById('year').addEventListener('change', function () {
        const year = this.value;
        const sectionSelect = document.getElementById('section');
        sectionSelect.innerHTML = '<option value="" disabled selected>Select a section</option>';

        const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        sections.forEach(section => {
            const option = document.createElement('option');
            option.value = `${year}${section}`;
            option.textContent = `${year}${section}`;
            sectionSelect.appendChild(option);
        });
    });

    // Form submission logic
    document.getElementById('registrationForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Registration Successful');
                this.reset();
            } else {
                alert('Failed to register. Try again!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

})(jQuery);
