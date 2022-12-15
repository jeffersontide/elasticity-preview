function copyToClipboard(s) {
    const el = document.createElement('textarea');
    el.value = s;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function setupAnimation() {
    var sprites = document.getElementsByClassName("animation");
    var scrolls = document.getElementsByClassName("scroll");

    // copy filenames of PVD files
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].addEventListener('contextmenu', function(e) {
            copyToClipboard("open " + this.getAttribute('alt') + ";");
            e.preventDefault();
        });
    }

    window.scrollPosition = 0;
    var val_text = document.getElementsByTagName("h3")[0];

    function updateScrollPosition(position, frames) {
        if (position < 0) {
            result = 0;
        }
        else if (position >= frames) {
            result = frames - 1;
        }
        else {
            result = position;
        }

        window.scrollPosition = result;

        // update text
        val_text.innerHTML = window.scrollPosition;

        // update sprites
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].style.backgroundPosition = "0px -" + window.scrollPosition * 200 + 'px';
        }

        // update scrolls
        for (let i = 0; i < scrolls.length; i++) {
            scrolls[i].value = window.scrollPosition;
        }

        return window.scrollPosition;
    }

    // callbacks
    for (let i = 0; i < sprites.length; i++) {
        frames = sprites[i].getAttribute('frames');
        sprites[i].onwheel = function(event) {
            updateScrollPosition(window.scrollPosition + (event.deltaY > 0.0 ? 1 : -1), frames);
            event.preventDefault();
        };
    }

    for (let i = 0; i < scrolls.length; i++) {
        scrolls[i].oninput = function(event) {
            updateScrollPosition(parseInt(event.target.value));
        }
    }
};


function setupModal() {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("");

    function rc2str(r, c) {
        return ("00" + r).slice (-3) + "_" + ("00" + c).slice(-3);
    };

    function setModal(id, show=true) {
        var img = document.getElementById(id);
        if (img == null) {
            return;
        }

        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("modalImg");

        modalImg.text = id;
        modalImg.src = img.src;
        modalImg.title = img.title;

        var caption = document.getElementById("caption");
        caption.innerHTML = img.alt;

        modal.style.display = show ? "block" : "none";
    };

    // all images should open a modal when clicked, and display args when right-clicked
    var images = document.getElementsByTagName("img");
    for (i = 0; i < images.length; i++) {
        // skip the modal image itself
        if (images[i].id == "modalImg") {
            continue;
        }

        images[i].addEventListener('click', function(e) {
            setModal(this.id);
        });

        images[i].addEventListener('contextmenu', function(e) {
            copyToClipboard("open " + this.title + ";");
            e.preventDefault();
        });
    }

    // navigate modal
    window.addEventListener('keydown', function (event) {
        if (document.getElementById("myModal").style.display == "none") {
            return;
        }

        var current_trace = modalImg.text;
        var r = parseInt(current_trace.slice(0, 3));
        var c = parseInt(current_trace.slice(4, 7));

        if (event.key === "ArrowLeft" && c - 1 >= 0) {
            setModal(rc2str(r, c - 1));
            event.preventDefault();
        }
        else if (event.key === "ArrowRight") {
            setModal(rc2str(r, c + 1));
            event.preventDefault();
        }
        else if (event.key === "ArrowUp" && r - 1 >= 0) {
            setModal(rc2str(r - 1, c));
            event.preventDefault();
        }
        else if (event.key === "ArrowDown") {
            setModal(rc2str(r + 1, c));
            event.preventDefault();
        }
    });

    // close modal
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });

    // var span = document.getElementsByClassName("close")[0];
    // span.onclick = function() {
    //     modal.style.display = "none";
    // }

    modal.addEventListener("click", function(e) {
        if (modal.style.display == "block" && e.target != modalImg && e.target != caption) {
            modal.style.display = "none";
        }

        // copy caption
        if (e.target == caption) {
            copyToClipboard("open " + caption.innerHTML + ";");
        }
    });
};


window.onload = function() {
    setupAnimation();
    setupModal();
}
