$(document).ready(function(){
    $("#result").hide();
    $("#addBtn").click(function(){
        console.log("Submit button clicked!!!")
        var input1 = $("#input1").val();
        var input2 = $("#input2").val();
        var result = addNumber(input1,input2);
        console.log(result);
        $("#result").html("Result is :: "+result);

        $("#result").show();
    });
   

});

function addNumber(a,b)
{
    return a+b;
}