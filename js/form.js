document.getElementById("btnSendForm").addEventListener("click", function () {
    sendForm();
});

function getValueById(id) {
    var value = document.getElementById(id).value;
    return value;
}

function sendForm() {

    var form = {
        name: getValueById("name"),
        email: getValueById("email"),
        subject: getValueById("subject"),
        message: getValueById("message")
    }

    if (validteForm(form))
        return false;

    sendEmail(form);
}

function sendEmail(form) {
    var xhr = new XMLHttpRequest();
    var base = "aHR0cHM6Ly9tZ25hdGl1ay5uZXQvc2VuZD9uYW1lPQ==";
    xhr.open("POST", atob(base) + form.name + "&email=" + form.email + "&subject=" + form.subject + "&message=" + form.message, true);
    xhr.send();
    resetValues("contact-form");
    swal("Success", "Email was sent", "success");
}

function validteForm(form) {
    if (!form.name || !form.email || !form.subject || !form.message) {
        swal("Warning", "Some fields of this form are empty.", "warning");
        return true;
    }

    if (!validateEmail(form.email)) {
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