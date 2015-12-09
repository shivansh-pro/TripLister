var data=[];
var places=[];
var names=[];
var responses;

function init()
{
	data=data.replace('[','');
	data=data.replace(']','');
	data=data.replace(/\"/g, '');
	data=data.trim();
	places = data.split('|');
	tabler();
}

function tabler(){
	var table = document.getElementById("myTable");
	var cnt = 1;
	var temp;
	for(var i=0;i<places.length;i++){
		var row = table.insertRow();
		if(i%2==0)
			row.style.backgroundColor = "#E6E6E6";
		else
			row.style.backgroundColor = "#F2F2F2";
		row.insertCell(0).innerHTML = places[i];
		row.insertCell(1).innerHTML = 
            "<input type='radio' name='pre"+cnt+"' value='Yes' /> Yes \n\
            <input type='radio' name='pre"+cnt+"' value='No'/> No";
        temp = $("input[name=pre"+cnt+"]");
        names.push(temp);
        row.insertCell(2).innerHTML = 
            "<input type='radio' name='satisfaction"+cnt+"' value='Satisfied' /> Good\n\
            <input type='radio' name='satisfaction"+cnt+"' value='Neutral' /> Neutral\n\
            <input type='radio' name='satisfaction"+cnt+"' value='Dissatisfied'/> Dissatisfied";
        temp = $("input[name=satisfaction"+cnt+"]");
        names.push(temp);
        cnt++;
	}
	$('input[type="radio"]').on('change', function() {
	    responses = $('input[type="radio"]:checked').map(function() {
	        return this.value;
	    }).get();
	});
	validate();
	$("input[type='radio']").change(validate);

}

function nextday(){
	submitter();
}

function post(path, params, method) {
    method = method || "post"; 

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    //form.setAttribute("name", "insert");

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function submitter(){
	var responses_string="";
	var temp;
	for(i=0;i<responses.length;i++){
		if(i%2==0)
			temp="("+responses[i]+",";
		else{
			temp=temp+responses[i]+")";
			responses_string=responses_string+temp+"|";
		}
	}
	responses_string=responses_string.slice(0,-1);
	var timeSpent = TimeMe.getTimeOnCurrentPageInSeconds();
	post("qinsert.php",{responses: responses_string,timeOnQuestions: timeSpent});
}

$(document).ready(function() {
    data = origins;
});

function validate() {
	var check=true;
	for(i=0;i<names.length;i++){
		if(!$(names[i]).is(':checked'))
			check=false;
	}
    if (check==true) {
        $("#btn1").removeAttr("disabled", false);
    } else {
        $("#btn1").attr("disabled", true);
    }
}

