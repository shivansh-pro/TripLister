$(function() {
    $("form input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('button[type=submit] .default').click();
            setdays();nextpage1();//return false;
        } else {
            return true;
        }
    });
});