/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/



//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});


window.onload = () => {
    const formContact = document.getElementById("contactForm")
    formContact.onsubmit = handlersubmit

}

const handlersubmit = (arg) => {
    arg.preventDefault()
    arg.stopPropagation()
    const load = new FormData(document.getElementById("contactForm"))
    bodyRequest = {
        name: load.get("name"), 
        email: load.get("email"),
        phone: load.get("phone"),
        message: load.get("message")
    }//new FormData(document.getElementById("formContact"))
    fetch('/user/msg', {
        method: "post",
        body: JSON.stringify(bodyRequest),
        headers: {
            "Content-Type": "application/JSON"
        }
    })
        .then(res => res.json())
        .then(data => {
            if(data.msg=="success"){
                const  dltpending   = document.getElementsByClassName("dltpending")
                for(let  i=0;i<dltpending.length;i++){
                    dltpending[i].value = ""
                }
                document.getElementById("submitSuccessMessage").classList.remove("d-none")
                setTimeout(()=>{
                    document.getElementById("submitSuccessMessage").classList.add("d-none")
                } , 5000)
            }
            if(data.msg=="wrong"){
                document.getElementById("submitErrorMessage").classList.remove("d-none")
                const  dltpending   = document.getElementsByClassName("dltpending")
                for(let  i=0;i<dltpending.length;i++){
                    dltpending[i].value = ""
                }
                setTimeout(()=>{
                    document.getElementById("submitErrorMessage").classList.add("d-none")
                } , 5000)
            }
        })
}
