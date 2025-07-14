// console.log('ok');
const form=$('#form');
const user=$('#user');
const email=$('#email');
const pass=$('#pass');
const pass2=$('#pass2');

function showerror(input,message){
     const formControl = input.closest('.form-control'); 
    formControl.addClass('error');
    const small=formControl.find('small');
    small.text(message);
}

function showok(input){
    const formControl = input.closest('.form-control');
    formControl.removeClass('error').addClass('success');
}

function checkEmail(input){
    const re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(input.val().trim())){
        showok(input);
    }else{
        showerror(input ,'ایمیل شما معتبر نیست!')
    }
}

function checkfr(inputArr){
    let isfr=false;
    inputArr.forEach(function (input) {
        if (input.val().trim() === ''){
            showerror(input, `${getFieldName(input)} پر کردن این فیلد اجباری است!`)
            isfr=true;
        }else{
            showok(input);
        }
    });

    return isfr;
}

function checkLength(input,min,max){
    if (input.val().length < min){
        showerror(input,`${getFieldName(input)} باید حداقل  ${min} کاراکتر باشد!`);
    }else if (input.val().length > max){
        showerror(input,`${getFieldName(input)} باید حداکثر ${max} کاراکتر باشد`)
    }else{
        showok(input)
    }
}

function checkPass(input1, input2) {
    if (input2.val() !== input1.val()){
        showerror(input2, 'رمز عبور مطاقبت ندارد!');
    }
}

function getFieldName(label){
    return label.val();
}

$('form').on('submit', function(e){
    e.preventDefault();


    if (checkfr([user,email,pass,pass2])){
        checkLength(user,3,15);
        checkLength(pass,6,25);
        checkEmail(email);
        checkPass(pass,pass2);
    }
});
