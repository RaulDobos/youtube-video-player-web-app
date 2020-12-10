window.YoutubeVideoPlayer = {

    API_URL:"http://localhost:8082/links",

    createLink: function(){
        let linkValue = $("#link-input").val();
        let titleValue = $('#title-input').val();
        let timeValue = $("#time-input").val();

        var requestBody = {
            link: linkValue,
            title: titleValue,
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

    deleteLink: function (id) {
        $.ajax({
            url: YoutubeVideoPlayer.API_URL + '?id=' + id,
            method: 'DELETE'
        }).done(function () {
            YoutubeVideoPlayer.getLinks();
        })
    },

    getLinks: function (){
        $.ajax({
            url: YoutubeVideoPlayer.API_URL,
        }).done(function (response) {
            console.log(response);
            YoutubeVideoPlayer.displayLinks(response.content);
        });
    },

    displayLinks: function(links){
        let rowsHtml = '';

        links.forEach(link => rowsHtml += YoutubeVideoPlayer.getLinkRowHtml(link));

        $('#links-table tbody').html(rowsHtml);
    },

    getLinkRowHtml: function (LINK){

        let newLink = LINK.link.replace('watch?v=', 'embed/');

        return `<tr>
                <td>   
                        <iframe id="ytplayer" type="text/html" width="420" height="315"
                            src=${newLink}>
                        </iframe>
                    
                </td>

                <td>
                    <a href="#" class="remove-link" data-id=${LINK.id}>
                        <i class="fas fa-trash"></i>
                    </a>
                </td>

            </tr>`
    },

    bindEvents: function () {
        $("add-link-form").submit(function (event) {
            event.preventDefault();
            YoutubeVideoPlayer.createLink();
        });

        $('#links-table tbody').delegate('.remove-link', 'click', function(event){
            event.preventDefault();

            let id = $(this).data('id');

            YoutubeVideoPlayer.deleteLink(id);

        })
    }

};

YoutubeVideoPlayer.getLinks();

YoutubeVideoPlayer.bindEvents();