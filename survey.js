$(document).ready(function(){
    // var host = "http://twinpines.lvh.me:3000/";
    // var host = "https://twinpines.mallmaverickstaging.com";
    // var contest = "twinpines-contest-2";
    var propertyDetails = getPropertyDetails();

    var host = propertyDetails.mm_host
    var contest = "merivale-survey";
    
    $('form[name="survey_form"]').validator().on('submit', function(e){
        if (e.isDefaultPrevented()) {
            alert("Please ensure that all marked fields are properly completed.");
        } else {
            e.preventDefault();
            var data = {};
            data['json'] = JSON.stringify($('form[name="survey_form"]').serializeArray());
            submitContest(data);
            return false;
        }
    });
    
    function isValidForm() {
        return true;
    }
    
    function submitContest(data) {
        if (!isValidForm(data)) {
            return false;
        };
        

        
        $.ajax({
            url: [host, "contests", contest, "json_entry"].join("/"),
            type: "POST",
            dataType: "json",
            data: data,
            success: function(data) {
                window.location.href="/survey_thank_you";
            },
            error: function(data){
                alert("There was an issue with submitting the contest entry. Please try again at a later time.")
            }
        });
    }

});

    function updateProgress() {
        var percentComplete = 30;
        $('#surveyProgress .progress-bar').css('width', percentComplete+'%').attr('aria-valuenow', percentComplete);    
        
    }