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
        var container = $('#surveyProgress');
        
        var totalQuestions = $('#surveyQuestions .form-group').length;
        var totalAnswered = 0;
        
        // Loop over all our questions if a value is entered for any of our fields.
        // mark it as an asnwered question
        $('#surveyQuestions .form-group').each(function(group) {
            // Loop over inputs to see if any one is selected
            var inputs = $(group).find('input');
            for (var x in inputs) {
                var ele = $(inputs[x]);
                
                // Test input to see if it has a value or is selected
                switch (ele.attr('type')) {
                    case "checkbox":
                    case "radio":
                      if (ele.is(":checked")) {
                        totalAnswered++;
                        break 2;
                      };
                      break;
                    default:
                        if (ele.val()) {
                            totalAnswered++;
                            break 2;
                        }
                        break;
                }
            }
        });
        
        var percentComplete = 30;
        
        // Loop over the progress labels and set the ones where value <= percentComplete
        container.find('.progress-labels div').each(function(key, ele){
            var ele = $(ele);
            
            ele.toggleClass('completed',parseFloat(ele.data('value')) <= percentComplete);
        });
        
        container.find('.progress-bar').css('width', percentComplete+'%').attr('aria-valuenow', percentComplete);    
        
    }