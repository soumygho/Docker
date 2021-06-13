var contacts = [];
const getAllApiUrl = "/api/contacts";
const postApiUrl = "/api/contact";
var editindex = -1; 
$(document).ready(function(){
    refreshData();
    $("#submitBtn").click(function(event){
        event.preventDefault();
        var contact = {
            firstname : $("#firstName").val(),
            lastname : $("#lastName").val(),
            mobileno : $("#mobileNumber").val()
        };
        //console.log(contact);
        if(editindex === -1)
        {
            createContact(contact).then(function(){
                contacts.push(contact);
                console.log(contacts);
                refreshData();
            });
        }
        else
        {
            contact.id = contacts[editindex].id;
            editContact(contact).then(function(){
                contacts.push(contact);
                console.log(contacts);
                refreshData();
                editindex = -1;
            });
        }
        
        $("#firstName").val("");
        $("#lastName").val("");
        $("#mobileNumber").val("");
    });

}
);

function refreshData(){
    getContactList().then(function(){
        console.log(contacts);
        noDataCheck(contacts);
    if(contacts instanceof Array)
    {
        if(contacts.length > 0)
        {
            $("#dataContainer").empty();
            for(var i = 0; i < contacts.length; i++)
            {
                var elem = document.createElement("tr");
                var thElem = document.createElement("th");
                thElem.setAttribute("scope","row");
                thElem.innerHTML = i+1;
                var fnElem = document.createElement("td");
                fnElem.innerHTML = contacts[i].firstname;
                var lnElem = document.createElement("td");
                lnElem.innerHTML = contacts[i].lastname;
                var mobElem = document.createElement("td");
                mobElem.innerHTML = contacts[i].mobileno;
                var actionTrElem = document.createElement("td");
                var actionElem = document.createElement("div");
                actionElem.setAttribute("class","row");
                var editColElem = document.createElement("div");
                editColElem.setAttribute("class","col");
                var editElem = document.createElement("button");
                editElem.innerText = "Edit";
                editElem.setAttribute("index",i);
                editElem.setAttribute("class","btn btn-primary");
                var resetColElem = document.createElement("div");
                resetColElem.setAttribute("class","col");
                var resetElem = document.createElement("button");
                resetElem.innerText = "Delete";
                resetElem.setAttribute("index",i);
                resetElem.setAttribute("class","btn btn-danger");
                editElem.onclick = editClick;
                resetElem.onclick = deleteClick;
                $("#dataContainer").append(elem);
                elem.append(thElem);
                elem.append(fnElem);
                elem.append(lnElem);
                elem.append(mobElem);
                editColElem.append(editElem);
                resetColElem.append(resetElem);
                actionElem.append(editColElem);
                actionElem.append(resetColElem);
                actionTrElem.append(actionElem);
                elem.append(actionTrElem);
            }
        }
    }
    });
}

function noDataCheck(contacts){
    if(contacts instanceof Array)
    {
        if(contacts.length > 0)
        {
            $("#tableContainer").show();
            $("#noDataMsg").hide();
        }
        else
        {
            $("#tableContainer").hide();
            $("#noDataMsg").show();
        }
    }
}

function editClick(event){
    var index = event.target.getAttribute("index");
    editindex = index;
    var contact = contacts[index];
    $("#firstName").val(contact.firstname);
    $("#lastName").val(contact.lastname);
    $("#mobileNumber").val(contact.mobileno);
    console.log(contact);
}

function deleteClick(event){
    var index = event.target.getAttribute("index");
    deleteContact(contacts[index].id).then(function(){
        console.log("Delete btn clicked for "+contacts[index]);
        refreshData();
    });
}

//fetch contactlist from server
async function getContactList()
{
    await $.get(getAllApiUrl,function(data,status,xhr){
        if(status === 'success')
        {
            contacts = [];
            console.log(data);
            for(d in data)
            {
                var contact = {
                    firstname : data[d].first_name,
                    lastname : data[d].last_name,
                    mobileno : data[d].phone,
                    id : data[d]._id
                };
                console.log(data[d]);
                contacts.push(contact);
            }
            $("#toastHeader").innerText = "success";
            $("#toastBody").innerText = "Successfully Fetched!!!";
            $('.toast').toast('show');
        }
        else
        {
            $("#toastHeader").val("failed");
            $("#toastBody").val(status);
            $('.toast').toast('show');
        }
    });
}

//fetch contactlist from server
async function editContact(contact)
{
    var newContact = {
        first_name : contact.firstname,
        last_name : contact.lastname,
        phone : contact.mobileno,
        _id : contact.id
    };
    await $.ajax({
        type: "POST",
        url: postApiUrl,
        data: JSON.stringify(newContact),
        success: function(data,status,xhr){
            if(status === 'success')
            {
                console.log(data);
                $("#toastHeader").innerText = "success";
                $("#toastBody").innerText = "Successfully Fetched!!!";
                $('.toast').toast('show');
            }
            else
            {
                console.log(data);
                $("#toastHeader").val("failed");
                $("#toastBody").val(status);
                $('.toast').toast('show');
            }
        },
        contentType: "application/json"
      });
}

async function createContact(contact)
{
    var newContact = {
        first_name : contact.firstname,
        last_name : contact.lastname,
        phone : contact.mobileno
    };
    await $.ajax({
        type: "POST",
        url: postApiUrl,
        data: JSON.stringify(newContact),
        success: function(data,status,xhr){
            if(status === 'success')
            {
                console.log(data);
                $("#toastHeader").innerText = "success";
                $("#toastBody").innerText = "Successfully Fetched!!!";
                $('.toast').toast('show');
            }
            else
            {
                console.log(data);
                $("#toastHeader").val("failed");
                $("#toastBody").val(status);
                $('.toast').toast('show');
            }
        },
        contentType: "application/json"
      });
}

async function deleteContact(id)
{
    await $.ajax({
        type: "DELETE",
        url: postApiUrl+"/"+id,
        success: function(data,status,xhr){
            if(status === 'success')
            {
                console.log(data);
                $("#toastHeader").innerText = "success";
                $("#toastBody").innerText = "Successfully Fetched!!!";
                $('.toast').toast('show');
            }
            else
            {
                console.log(data);
                $("#toastHeader").val("failed");
                $("#toastBody").val(status);
                $('.toast').toast('show');
            }
        },
        contentType: "application/json"
      });
}