window.onload = function () {
    var target = $(".cards");
    //const baseUrl = "http://localhost:7000/movies";
    const baseUrl = "https://localhost:7224/Movies"
    $.ajax({
        url: baseUrl,
        beforeSend: function (xhr) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
    })
        .done(function (data) {
            var arr = $.parseJSON(data);
            $.each(arr, fillMovieTemplate(baseUrl, target));

            $('.info.icon').each(function () {
                $(this).popup({
                    popup: $(this).parents('.card').find('.popup'),
                    on: 'click'
                });
            })

            $('.edit.icon').each(editMovie(baseUrl));

            $('.trash.icon').each(function () {
                $(this).click(function () {
                    var id = $(this).parents('.card').attr("data-movie-id");
                    $('.ui.modal.delete').modal("show");
                    $('.delete-movie').attr("data-movie-id", id);
                });
            });

            $("#add-card").click(function () {
                $('.ui.modal.add').modal("show");
            });

            $(".delete-movie").click(function() {
                var id = $(this).attr("data-movie-id");
                $.ajax({
                    type: "DELETE",
                    url: baseUrl + "/" + id,
                    success: function () {
                        $("#card-" + id).remove();
                    },
                    failure: function () {
                        console.log("fail");
                    },
                    dataType: "json",
                    contentType: "application/json"
                });
            })

        });
};
function fillMovieTemplate(baseUrl, target) {
    return function (key, value) {
        var template = $("#movieItemTemplate").clone();
        template.find(".card").attr("data-movie-id", value.id).attr("id", "card-" + value.id);
        template.find(".movie-title").text(value.title).attr("data-movie-title", value.title);
        template.find(".movie-poster").attr("src", value.posterUrl).attr("data-movie-poster", value.posterUrl);
        template.find(".movie-rating").text(value.imdbRating).attr("data-movie-rating", value.imdbRating);
        template.find(".movie-description").text(value.description).attr("data-movie-description", value.description);

        var genres = [];
        
        if (!!value.genres) {
            value.genres.forEach(e=>genres.push(e.name));
        }
        template.find(".movie-genre").text(genres.join(", "));
        

        const form = template.find("#update-movie-form");
        form.attr("id", "update-movie-form" + value.id);
        form.attr("action", baseUrl + "/" + value.id);
        template.find(".header").text(value.title);
        template.find(".movie-title-input").attr("value", value.title);
        template.find(".movie-poster-input").attr("value", value.posterUrl);
        template.find(".movie-rating-input").attr("value", value.imdbRating);
        template.find(".movie-description-input").text(value.description);
        target.append(template.html());
    };
}

function editMovie(baseUrl) {
    return function () {
        $(this).click(function () {
            const card = $(this).parents('.card');
            const id = card.attr("data-movie-id");
            const title = card.find(".movie-title").attr("data-movie-title");
            const poster = card.find(".movie-poster").attr("data-movie-poster");
            const rating = card.find(".movie-rating").attr("data-movie-rating");
            const description = card.find(".movie-description").attr("data-movie-description");

            const editModal = $('.ui.modal.edit');
            editModal.find(".movie-title-input").val(title);
            editModal.find(".movie-poster-input").val(poster);
            editModal.find(".movie-rating-input").val(rating);
            editModal.find(".movie-description-input").text(description);

            $('.ui.modal.edit').modal("show");

            $('.update-button').click(function (e) {
                var request = {
                    "id": id,
                    "title": editModal.find(".movie-title-input").val(),
                    "poster": editModal.find(".movie-poster-input").val(),
                    "rating": editModal.find(".movie-rating-input").val(),
                    "description": editModal.find(".movie-description-input").text()
                };
                console.log(request);
                $.ajax({
                    type: "PUT",
                    url: baseUrl + "/" + id,
                    data: request,
                    success: function () {
                    },
                    failure: function () {
                        console.log("fail");
                    },
                    dataType: "json",
                    contentType: "application/json"
                });
            });
        });
    };
}

