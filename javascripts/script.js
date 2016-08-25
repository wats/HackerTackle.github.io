$('.speakers li').click(function() {
    $('#overlay').css('display', 'block');
});
$('.cancel').click(function() {
    $('#overlay').css('display', 'none');
});
$(".h-lane-btn").click(function() {
    $(".timetable td").css('display', 'none');
    $(".timetable th").css('display', 'none');
    $(".timetable tr").css('display', 'block');
    $(".timetable tbody").attr( 'class', 'h-lane-body');
    $(".timetable th:nth-child(2)").css('display', 'block');
    $(".timetable td:nth-child(1)").css('display', 'block');
    $(".timetable td:nth-child(2)").css('display', 'block');
    $(".timetable .row-break td").css('display', 'block');
    $(".timetable .row-break td:empty").css('display', 'none');
    $(this).parent().find("a").css('display', 'block');
    $(this).css('display', 'none');
});
$(".k-lane-btn").click(function() {
    $(".timetable td").css('display', 'none');
    $(".timetable th").css('display', 'none');
    $(".timetable tr").css('display', 'block');
    $(".timetable tbody").attr( 'class', 'k-lane-body');
    $(".timetable th:nth-child(3)").css('display', 'block');
    $(".timetable td:nth-child(1)").css('display', 'block');
    $(".timetable td:nth-child(3)").css('display', 'block');
    $(".timetable .row-break td").css('display', 'block');
    $(".timetable .row-break td:empty").css('display', 'none');
    $(this).parent().find("a").css('display', 'block');
    $(this).css('display', 'none');
});
$(".t-lane-btn").click(function() {
    $(".timetable td").css('display', 'none');
    $(".timetable th").css('display', 'none');
    $(".timetable tr").css('display', 'block');
    $(".timetable tbody").attr( 'class', 't-lane-body');
    $(".timetable th:nth-child(4)").css('display', 'block');
    $(".timetable td:nth-child(1)").css('display', 'block');
    $(".timetable td:nth-child(4)").css('display', 'block');
    $(".timetable .row-break td").css('display', 'block');
    $(".timetable .row-break td:empty").css('display', 'none');
    $(this).parent().find("a").css('display', 'block');
    $(this).css('display', 'none');
});