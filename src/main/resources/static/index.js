$(document).ready(getUsers());
var allRoles = ["ROLE_USER", "ROLE_ADMIN"];
//User Table
function getUsers() {
    $("#table").empty();
    $.ajax({
        type: 'GET',
        url: '/admin/list',
        timeout: 3000,
        success: function (data) {
            console.log(data);
            $.each(data, function (key, user) {
                let roleAss = [];
                for (let i = 0; i < user.roles.length; i++) {
                    roleAss.push(user.roles[i].name);
                }
                $("#tableAllUsers").append($('<tr>').append(
                    $('<td>').text(user.id),
                    $('<td>').text(user.username),
                    $('<td>').text(user.lastname),
                    $('<td>').text(user.age),
                    $('<td>').text(user.email),
                    $('<td>').text(roleAss.join(', ')),
                    $('<td>').append("<button type='button' data-toggle='modal' class='btn-info btn'" +
                        " data-target='#editUserModal' data-user-id='" + user.id + "'>Edit</button>"),
                    $('<td>').append("<button type='button' data-toggle='modal' class='btn btn-danger'" +
                        " data-target='#deleteUserModal' data-user-id='" + user.id + "'>Delete</button>")
                    )
                );
            });
        }
    });
}
$('[href="#admin"]').on('show.bs.tab', (e) => {
    // getUsers()
    location.reload();
})

//Edit form
$("#editUserModal").on('show.bs.modal', (e) => {
    let userId = $(e.relatedTarget).data("user-id");

    $.ajax({
        url: "/admin/" + userId,
        type: "GET",
        dataType: "json"
    }).done((msg) => {

        let user = JSON.parse(JSON.stringify(msg));

        $("#id").empty().val(user.id);
        $("#editName").empty().val(user.username);
        $("#editName2").empty().val(user.lastname);
        $("#editAge").empty().val(user.age);
        $("#editEmail").empty().val(user.email);
        $("#editPassword").empty().val(user.password);
        $("#editRoles").empty();
        $.each(allRoles , (i, role) => {
            $("#editRoles").append(
                $("<option>").text(role)
            )
        });
        $("#editRoles").val(user.roles);

    });
})
//after press Edit in Modal window
$("#buttonEditSubmit").on('click', (e) => {
    e.preventDefault();

    let editUser = {
        id: $("#id").val(),
        username: $("#editName").val(),
        lastname: $("#editName2").val(),
        age: $("#editAge").val(),
        email: $("#editEmail").val(),
        password: $("#editPassword").val(),
        roles: $("#editRoles").val()
    }

    $.ajax({
        url: "/admin",
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(editUser)
    })

        $("#editUserModal").modal('hide'),
        location.reload();
    getUsers();
})
//Delete form
$("#deleteUserModal").on('show.bs.modal', (e) => {
    let userId = $(e.relatedTarget).data("user-id");

    $.ajax({
        url: "/admin/" + userId,
        type: "GET",
        dataType: "json"
    }).done((msg) => {
        let user = JSON.parse(JSON.stringify(msg));

        $("#delId").empty().val(user.id);
        $("#delName").empty().val(user.username);
        $("#delName2").empty().val(user.lastname);
        $("#delAge").empty().val(user.age);
        $("#delEmail").empty().val(user.email);
        $("#delPas").empty().val(user.password);


        $("#buttonDel").on('click', (e) => {
            e.preventDefault();

            $.ajax({
                url: "/admin/" + userId,
                type: "DELETE",
                dataType: "text"
            }).done((deleteMsg) => {
                $("#deleteUserModal").modal('hide');
                location.reload();
                // getUsers();
            })
        })
    });
})

$('[href="#new"]').on('show.bs.tab', (e) => {
    $(() => {
        $("#name").empty().val("");
        $("#name2").empty().val("");
        $("#age").empty().val("");
        $("#email").empty().val("");
        $("#password").empty().val("");
        $("#rolesNew").empty().val("");
        $.each(allRoles, (i, role) => {
            $("#rolesNew").append(
                $("<option>").text(role)
            )
        });
    })
})

$("#buttonNew").on('click', (e) => {
    e.preventDefault();

    let newUser = {
        username: $("#name").val(),
        lastname: $("#name2").val(),
        age: $("#age").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        roles: $("#rolesNew").val()
    }

    $.ajax({
        url: "/admin",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(newUser)
    })
        getUsers(),
        $('#testTab a[href="#usersTable"]').tab('show')
        location.reload();
})

$('[href="#userss"]').on('show.bs.tab', (e) => {
    $("#change-tabContent").hide(),
        getCurrent();
})

function getCurrent() {
    $.ajax({
        url: '/getUser',
        type: 'GET',
        dataType: 'json'
    }).done((msg) => {
        let user = JSON.parse(JSON.stringify(msg));
        $("#current-user-table tbody").empty().append(
            $('<tr>').append(
                $('<td>').text(user.id),
                $('<td>').text(user.username),
                $('<td>').text(user.lastname),
                $('<td>').text(user.age),
                $('<td>').text(user.email),
                $('<td>').text(user.roles)
            ));
    }).fail(() => {
        alert("Error Get All Users!")
    })
}