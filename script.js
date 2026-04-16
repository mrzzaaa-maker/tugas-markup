$(document).ready(function () {

    $(".artikel").hide().each(function (i) {
        $(this).delay(i * 200).fadeIn(600);
    });

    $("#header input[type='text']").on("input", function () {
        var keyword = $(this).val().toLowerCase().trim();

        $(".artikel").each(function () {
            var judul = $(this).find("h2").text().toLowerCase();
            var deskripsi = $(this).find("p").text().toLowerCase();

            if (judul.includes(keyword) || deskripsi.includes(keyword)) {
                $(this).slideDown(300);
            } else {
                $(this).slideUp(300);
            }
        });

        if ($(".artikel:visible").length === 0) {
            if ($("#no-result").length === 0) {
                $("<p id='no-result' style='text-align:center; color:#fff; font-size:16px; padding:20px;'>Artikel tidak ditemukan.</p>")
                    .appendTo("#daftar-artikel");
            }
        } else {
            $("#no-result").remove();
        }
    });

    $("#menu-utama a").on("click", function (e) {
        var target = $(this).attr("href");
        if (target !== "#") {
            e.preventDefault();
            $("html, body").animate({ scrollTop: $(target).offset().top - 20 }, 500);
        }
    });

    $("#menu-utama a").on("click", function () {
        $("#menu-utama a").css({
            "background": "rgba(255,255,255,0.1)",
            "font-weight": "500"
        });
        $(this).css({
            "background": "rgba(255,255,255,0.35)",
            "font-weight": "700"
        });
    });

    $("body").append(`
        <div id="modal-overlay" style="
            display:none; position:fixed; top:0; left:0; width:100%; height:100%;
            background:rgba(0,0,0,0.6); z-index:9999; justify-content:center; align-items:center;">
            <div id="modal-box" style="
                background-color:rgba(255, 255, 255, 0.8);; padding:35px; max-width:480px;
                width:90%; box-shadow:0 20px 60px rgba(0,0,0,0.4); position:relative; text-align:center;">
                <button id="modal-close" style="
                    position:absolute; top:12px; right:16px; border:none; background:none;
                    font-size:22px; cursor:pointer; color:#36454f;">✕</button>
                <img id="modal-img" src="" alt="" style="
                    width:100%; height:200px; object-fit:cover; margin-bottom:18px;">
                <h3 id="modal-judul" style="color:#36454f; margin-bottom:10px; font-size:20px;"></h3>
                <p id="modal-meta" style="color:#999; font-size:13px; margin-bottom:10px;"></p>
                <p id="modal-desc" style="color:#555; line-height:1.8; font-size:14px;"></p>
            </div>
        </div>
    `);

    $(document).on("click", ".artikel a", function (e) {
        e.preventDefault();

        var artikel = $(this).closest(".artikel");
        var judul   = artikel.find("h2").text();
        var desc    = artikel.find("p").text();
        var meta    = artikel.find(".artikel-meta").text().trim();
        var imgSrc  = artikel.find("img").attr("src");

        $("#modal-judul").text(judul);
        $("#modal-desc").text(desc);
        $("#modal-meta").text(meta);
        $("#modal-img").attr("src", imgSrc);

        $("#modal-overlay").css("display", "flex").hide().fadeIn(300);
    });

    $("#modal-close, #modal-overlay").on("click", function (e) {
        if (e.target === this) {
            $("#modal-overlay").fadeOut(250);
        }
    });

    $(document).on("keydown", function (e) {
        if (e.key === "Escape") $("#modal-overlay").fadeOut(250);
    });

    $("body").append(`
        <button id="back-to-top" title="Kembali ke atas" style="
            display:none; position:fixed; bottom:30px; right:30px;
            background:#36454f; color:white; border:none;
            width:46px; height:46px; font-size:20px; cursor:pointer;
            box-shadow:0 6px 20px rgba(0,0,0,0.3); z-index:8888;
            transition:opacity 0.3s;">↑</button>
    `);

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 200) {
            $("#back-to-top").fadeIn(300);
        } else {
            $("#back-to-top").fadeOut(300);
        }
    });

    $("#back-to-top").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

    var totalFilm = $(".artikel").length;
    $("#sidebar").append(`
        <hr style="margin:18px 0; border-color:#eee;">
        <p style="font-size:13px; color:#777;">
            Total film: <strong style="color:#36454f;">${totalFilm}</strong>
        </p>
    `);

    $(".artikel").on("mouseenter", function () {
        $(this).find(".artikel-meta b").css("color", "#36454f");
    }).on("mouseleave", function () {
        $(this).find(".artikel-meta b").css("color", "#777");
    });

});