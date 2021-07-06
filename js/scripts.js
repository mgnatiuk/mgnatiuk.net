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
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function sendForm(event)
{

    let name = getValueById("name");
    let from = getValueById("from");
    let subject = getValueById("subject");
    let text = getValueById("text");

    if(from != null){
        var xhr = new XMLHttpRequest();
        // xhr.open("GET", "https://mgnatiuk-functions.azurewebsites.net/api/ReciveEmailFunction?code=QzejLcV6D07GLg1puWfOuapleHrPYJ6Nea4aDXM8atPVC1eDXJP8Xw==&from="+from+"&subject="+subject+"&text="+text+"&name=" + name, true);
        // xhr.send();

    resetValueFor("name");
    resetValueFor("from");
    resetValueFor("subject");
    resetValueFor("text");
    
    swal({
        title: "Here's a title!",
      });
    }else{
        alert("Email is required.");
    }
    
    
}

 function resetValueFor(id) {
    var element = document.getElementById(id);
    element.value = "";
  }   
  
  function getValueById(id){
      var value = document.getElementById(id).value;
      return value;
  }
