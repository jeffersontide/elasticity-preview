function copyToClipboard(s) {
    const el = document.createElement('textarea');
    el.value = s;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function copyCaption() {
    var caption = document.getElementById("caption");
    copyToClipboard(caption.innerHTML);
}

function rc2str(r, c) {
    return ("00" + r).slice (-3) + "_" + ("00" + c).slice(-3);
};

function setModal(id, show=true) {
    var img = document.getElementById(id);
    if (img == null) {
        return;
    }

    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");

    modalImg.text = id;
    modalImg.src = img.src;

    var caption = document.getElementById("caption");
    caption.innerHTML = img.alt;

    modal.style.display = show ? "block" : "none";
};


window.onload = function() {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");

    // all images should open a modal when clicked
    images = document.getElementsByTagName("img");
    for (i = 0; i < images.length; i++) {
        // skip the modal image itself
        if (images[i].id == "img01") {
            continue;
        }

        images[i].addEventListener('click', function(e) {
            setModal(this.id);
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

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    modal.addEventListener("click", function(e) {
        if (modal.style.display == "block" && e.target != modalImg && e.target != caption) {
            modal.style.display = "none";
        }

        // copy caption
        if (e.target == caption) {
            copyCaption();
        }
    });
}
