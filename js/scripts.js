window.addEventListener('DOMContentLoaded', event => {

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

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

document.getElementById("btnSendForm").addEventListener("click", function () {
    sendForm();
});

function getValueById(id) {
    var value = document.getElementById(id).value;
    return value;
}

function sendForm() {

    var formData = {
        name: getValueById("name"),
        from: getValueById("from"),
        subject: getValueById("subject"),
        text: getValueById("text")
    }

    if (validteForm(formData))
        return false;

    sendEmail(formData);
}

function sendEmail(formData) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", atob("aHR0cHM6Ly9tZ25hdGl1ay1mdW5jdGlvbnMuYXp1cmV3ZWJzaXRlcy5uZXQvYXBpL1JlY2l2ZUVtYWlsRnVuY3Rpb24/Y29kZT1RemVqTGNWNkQwN0dMZzFwdVdmT3VhcGxlSHJQWUo2TmVhNGFEWE04YXRQVkMxZURYSlA4WHc9PSZmcm9tPQ==") + formData.from + "&subject=" + formData.subject + "&text=" + formData.text + "&name=" + formData.name, true);
    xhr.send();
    resetValues("contact-form");
    swal("Success", "Email was sent", "success");
}

function validteForm(formData) {
    if (!formData.name || !formData.from || !formData.subject || !formData.text) {
        swal("Warning", "Some fields of this form are empty.", "warning");
        return true;
    }

    if (!validateEmail(formData.from)) {
        swal("Warning", "Email is not valid.", "warning");
        return true;
    }

    return false;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function resetValues(fieldid) {
    var container = document.getElementById(fieldid);
    var fields = container.getElementsByClassName('form-field');
    for (var index = 0; index < fields.length; ++index) {
        fields[index].value = '';
    }
}