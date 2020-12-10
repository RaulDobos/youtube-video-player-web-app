window.YoutubeVideoPlayer = {

    API_URL:"http://localhost:8082/links",

    createLink: function(){
        let linkValue = $("#link-input").val();
        let timeValue = $("#time-input").val();
        var requestBody = {
            link: linkValue,
            time: timeValue
        };

        $.ajax({
            url: YoutubeVideoPlayer.API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function (response) {
            console.log("succes");
            console.log(response);
        });
    },

    bindEvents: function () {
        $("add-link-form").submit(function () {
            YoutubeVideoPlayer.createLink();
        });
    }

};

YoutubeVideoPlayer.bindEvents();