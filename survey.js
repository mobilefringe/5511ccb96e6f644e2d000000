$(document).ready(function(){
    // var host = "http://twinpines.lvh.me:3000/";
    var host = "https://twinpines.mallmaverickstaging.com/";
    // var host = "http://merivale.mallmaverick.com"
    // var contest = "twinpines-contest-2";
    var contest = "merivale-survey";
    
    $('form[name="survey_form"]').validator().on('submit', function(e){
        e.preventDefault();
        
        var data = {};
        data['json'] = JSON.stringify($('form[name="survey_form"]').serializeArray());
        submitContest(data);
    });
    
    function isValidForm() {
        return true;
    }
    
    function submitContest(data) {
        if (!isValidForm(data)) {
            return false;
        };
        
        var propertyDetails = getPropertyDetails();
        // var host = propertyDetails.mm_host
        
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