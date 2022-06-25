  //---------- side bar navigation ------------
  let secContent = $("#secContent").innerWidth();
  $("#secNav").css('left' , `-${secContent}px`);



  $("#secNav .sideBar .toggleBar").click(function(){
     
    if($("#secNav").css('left') == '0px'){
        $('#secNav').animate({left:`-${secContent}`},1000, function(){
            $('.item1').animate({'opacity': '0', 'paddingTop' : '500px'}, 500)
        });
        $("#open").attr('class' , 'fa-solid fa-bars');
    }
    else{
        $('#secNav').animate({left:'0px'},1000, function(){
            $('.item1').animate({'opacity': '1', 'paddingTop' : '25px'}, 1100)
            $('.item2').animate({'opacity': '1', 'paddingTop' : '25px'}, 1200)
            $('.item3').animate({'opacity': '1', 'paddingTop' : '25px'}, 1200)
            $('.item4').animate({'opacity': '1', 'paddingTop' : '25px'}, 1200)
            $('.item5').animate({'opacity': '1', 'paddingTop' : '25px'}, 1200)
            $('.item6').animate({'opacity': '1', 'paddingTop' : '25px'}, 1200)
        });
        $("#open").attr('class' , 'fa-solid fa-xmark');
    }
    
});


//------------ connect to api-------------------
let  apiResonse , responseDate;

let classname = document.getElementsByClassName("nav-category");
let category = 'popular';
 


for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', function(){
        category = this.getAttribute("value");
          getMovies(category);
    }, false);
}


getMovies(category);


async function getMovies(category){
    
    apiResonse = await  fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1`);
    responseDate = await apiResonse.json(); 

   console.log(responseDate.results);

    displayMovies();
}




async function displayMovies(){
    let movies = ``;
    for(let i = 0 ; i< responseDate.results.length ; i++){ 

        movies += `
        <div class="col-md-4">
        <div class="item">
            <img src="https://image.tmdb.org/t/p/w500${responseDate.results[i].poster_path}" alt="" class="w-100"/>
             <div class="overlay">
                 <div class="overlayContent">
                    <h4>${responseDate.results[i].title}</h4>
                    <p>${responseDate.results[i].overview}</p>
                    <h5>${responseDate.results[i].vote_average}</h5>
                    <h5>${responseDate.results[i].release_date}</h5>
                    </div>
                </div>
            </div>
        </div>
        `;  

    }
    document.getElementById('rowDate').innerHTML = movies;
} 



// ------------- contact us regx --------------------

let inputUserName = document.getElementById('inputUserName'),
    inputUserEmail = document.getElementById('inputUserEmail'),
    inputUserPhone = document.getElementById('inputUserPhone'),
    inputUserAge = document.getElementById('inputUserAge'),
    inputUserPassword = document.getElementById('inputUserPassword'),
    inputUserRepassword = document.getElementById('inputUserRepassword');


let sendMessage = document.getElementById('sendMessage');
let errorMsg = document.getElementById('error');
let errorEmail = document.getElementById('errorEmail');

sendMessage.addEventListener('click', function(){
   if(inputUserName.value == '' || inputUserEmail.value == '' || 
     inputUserPhone.value == '' || inputUserAge.value == '' ||
     inputUserPassword.value == '' || inputUserRepassword == ''){ 
        errorMsg.innerHTML = "all data are required ... ";
   }
   else if(validateEmail() == false){
       errorEmail.innerHTML = " this email is invalid..";
   }
   else if(validatePassword() == false){
       errorPassword.innerHTML = " this password is invalid...";
   }
   else{
       errorMsg.innerHTML = " ";
       errorEmail.innerHTML = "";
       errorPassword.innerHTML = "";
   }
});



function validateEmail(){
    var regex = /^[A-Za-z]{1,8}[1-9]{0,10}.[A-Za-z]{1,8}[1-9]{0,10}@gmail.com$/;
    if(regex.test(inputUserEmail.value) == true){ 
        return true;
    }
    else{ 
        return false;
    }
}

function validatePassword(){
    var regex = /^[A-Z][a-z]{1,3}[1-9]{1,8}$/;
    if(regex.test(inputUserPassword.value) == true && (inputUserPassword.value == inputUserRepassword.value)){ 
        return true;
    } 
    else{ 
        return false;
    }
}
 