/*!
 * Start Bootstrap - Scrolling Nav v5.0.2 (https://startbootstrap.com/template/scrolling-nav)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
 */
//
// Scripts
// 
window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function(responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function sendForm(event) {

    var formData = {
        name: getValueById("name"),
        from: getValueById("from"),
        subject: getValueById("subject"),
        text: getValueById("text")
    }

    if (!formData.name && !formData.from && !formData.subject && !formData.text) {
        swal("Warning", "Some fields of this form are empty.", "warning");
        event.preventDefault();
    }

    if (!validateEmail(formData.from)) {
        swal("Warning", "Email is not valid.", "warning");
        event.preventDefault();
    }

    sendEmail(formData);
}

function sendEmail(formData) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://mgnatiuk-functions.azurewebsites.net/api/ReciveEmailFunction?code=QzejLcV6D07GLg1puWfOuapleHrPYJ6Nea4aDXM8atPVC1eDXJP8Xw==&from=" + formData.from + "&subject=" + formData.subject + "&text=" + formData.text + "&name=" + formData.name, true);
    xhr.send();
    resetValues();
    swal("Success", "Email was sent", "success");
}

function resetValues() {
    resetValueFor("name");
    resetValueFor("from");
    resetValueFor("subject");
    resetValueFor("text");
}

function resetValueFor(id) {
    var element = document.getElementById(id);
    element.value = "";
}

function getValueById(id) {
    var value = document.getElementById(id).value;
    return value;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}