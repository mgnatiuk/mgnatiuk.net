document.addEventListener('click', event => {

    // Get the modal
    var modal = document.getElementById("modal-window");
    var home = document.getElementById("home");

    if (event.target.id == 'modal-window') {
        home.style.overflow = "auto";
        modal.style.display = "none";
    }

    if (event.target.classList.contains("modal-image")) {
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = event.target;

        var modalImg = document.getElementById("modal-content");
        var captionText = document.getElementById("caption");

        home.style.overflow = "hidden";
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
    }
});


