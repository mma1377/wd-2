
function isNumber(event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        return false;
    }
    return true;
}

function isPersian(event){
    console.log(event.charCode);
    if(event.charCode === 32 || event.charCode === 8204) //space check
        return true;
    if (event.charCode < 1570 || event.charCode > 1740) { //persian alphabet check
        return false;
    }
    return true;
}

function isEnglish(event){
    if(event.charCode === 32) //space check
        return true;
    if (event.charCode < 65 || event.charCode > 122) { //english alphabet check
        return false;
    }
    return true;
}

function englishToPersionNumChar(str){
    persianAlphabet = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    retStr = "";
    for(i = 0; i < str.length; ++i){
        char = str.charAt(i);
        if (!(char > '9' || char < '0')) {
            char = persianAlphabet[char - '0'];
        }
        retStr = retStr + char;
    }
    return retStr;
}

function persianToEnglishNumChar(str){
    englishAlphabet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    retStr = "";
    for(i = 0; i < str.length; ++i){
        char = str.charAt(i);
        if (!(char > '۹' || char < '۰')) {
            char = englishAlphabet[char.charCodeAt(0) - '۰'.charCodeAt(0)];
        }
        retStr = retStr + char;
    }
    return retStr;
}

function nameCheck(event) {
    return isPersian(event);
}

function lastNameCheck(event) {
    return isPersian(event);
}

function englishNameCheck(event) {
    return isEnglish(event);
}

function mailBlur(){
    document.getElementsByName("uiError")[0].innerHTML = "";
    mailValidate();
}

function passBlur(){
    document.getElementsByName("uiError")[0].innerHTML = "";
    passValidate();
}

function rPassBlur(){
    document.getElementsByName("uiError")[0].innerHTML = "";
    rPassValidate();
}

function mailValidate(){
    emailText = document.getElementsByName("uiMail")[0].value;
    //https://www.w3resource.com/javascript/form/email-validation.php
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailText)){
        return true;
    }
    document.getElementsByName("uiError")[0].innerHTML = "ایمیل وارد شده صحیح نمی‌باشد";
    return false;
}

function passValidate(){
    passText = document.getElementsByName("uiPass")[0].value;
    if(passText.length < 8){
        document.getElementsByName("uiError")[0].innerHTML = "پسورد باید حداقل 8 حرف باشد";
        return false;
    }
    if(/^[a-zA-Z0-9#$*=!+-]*$/.test(passText)){
        return true;
    }
    document.getElementsByName("uiError")[0].innerHTML = "رمز عبور باید ترکیبی از الفبای انگلیسی، اعداد و حروف خاص باشد";
    return false;
}

function rPassValidate(){
    passText = document.getElementsByName("uiPass")[0].value;
    rPassText = document.getElementsByName("uiPassr")[0].value;
    if(passText == rPassText){
        return true;
    }
    document.getElementsByName("uiError")[0].innerHTML = "تکرار پسورد صحیح نمی‌باشد";
    return false;
}

function phoneNumValidate(){
    phoneNumText = document.getElementsByName("uiPhone")[0].value;
    if(phoneNumText.length == 11){
        return true;
    }
    document.getElementsByName("uiError")[0].innerHTML = "شماره‌ی تلفن را به درستی وارد کنید";
    return false;
}

function phoneNumCheck(event) {
    return isNumber(event);
}

function onPhoneNumChange(){
    phoneNumText = document.getElementsByName("uiPhone")[0].value;
    phoneNumText = englishToPersionNumChar(phoneNumText);
    if(phoneNumText.charAt(0) !== "۰")
        phoneNumText = "۰" + phoneNumText;
    if(phoneNumText.charAt(1) !== "۹")
        phoneNumText = "۰۹" + phoneNumText.substring(2, 11);
    if(phoneNumText.length > 11)
        phoneNumText = phoneNumText.substring(0, 11);
    document.getElementsByName("uiPhone")[0].value = phoneNumText;
}

function ssnCheck(event) {
    return isNumber(event);
}

function onSsnChange(){
    ssnText = document.getElementsByName("uiSsn")[0].value;
    ssnText = englishToPersionNumChar(ssnText);
    for(i = 0; i < ssnText.length; ++i){
        if(ssnText.charAt(i) == "-")
            ssnText = ssnText.substring(0, i) + ssnText.substring(i + 1, ssnText.length);
    }
    if(ssnText.length > 3){
        ssnText = ssnText.substring(0, 3) + '-' + ssnText.substring(3, ssnText.length)
    }
    if(ssnText.length > 10){
        ssnText = ssnText.substring(0, 10) + '-' + ssnText.substring(10, ssnText.length)
    }
    if(ssnText.length > 12)
        ssnText = ssnText.substring(0, 12);
    document.getElementsByName("uiSsn")[0].value = ssnText;
}

function addressCheck(event) {
    return isPersian(event);
}

function birthdateCheck(event) {
    return isNumber(event);
}

function onBirthdateChange(){
    birthdateText = document.getElementsByName("uiBirthdate")[0].value;
    birthdateText = englishToPersionNumChar(birthdateText);
    for(i = 0; i < birthdateText.length; ++i){
        if(birthdateText.charAt(i) == "/")
            birthdateText = birthdateText.substring(0, i) + birthdateText.substring(i + 1, birthdateText.length);
    }
    if(birthdateText.length > 4){
        year = parseInt(persianToEnglishNumChar(birthdateText.substring(0, 4)));
        if(year > 1390)
            birthdateText = "۱۳۹۰" + birthdateText.substring(4, birthdateText.length);
        else if(year < 1310)
            birthdateText = "۱۳۱۰" + birthdateText.substring(4, birthdateText.length);
        birthdateText = birthdateText.substring(0, 4) + "/" + birthdateText.substring(4, birthdateText.length);
    }
    if(birthdateText.length > 7){
        birthdateText = birthdateText.substring(0, 7) + "/" + birthdateText.substring(7, birthdateText.length);
    }
    if(birthdateText.length > 10)
        birthdateText = birthdateText.substring(0, 10);
    document.getElementsByName("uiBirthdate")[0].value = birthdateText;
}

function firstNameValidate(){
    nameText = document.getElementsByName("uiName")[0].value;
    if(nameText.length >= 3){
        return true;
    }
    document.getElementsByName("uiError")[0].innerHTML = "نام باید بیشتر از 3 حرف باشد";
    return false;
}

function lastNameValidate(){
    nameText = document.getElementsByName("uiLastName")[0].value;
    if(nameText.length >= 3){
        return true;
    }
    document.getElementsByName("uiError")[0].innerHTML = "نام خانوادگی باید بیشتر از 3 حرف باشد";
    return false;
}

function ssnValidate(){
    sText = document.getElementsByName("uiSsn")[0].value;
    if(sText.length != 0 && sText != 12){
        document.getElementsByName("uiError")[0].innerHTML = "کدملی را به طور کامل وارد کنید";
        return false;
    }
    return true;
}

function birthdateValidate(){
    bText = document.getElementsByName("uiBirthdate")[0].value;
    if(bText.length != 0 && bText != 10){
        document.getElementsByName("uiError")[0].innerHTML = "تاریخ تولد را به طور کامل وارد کنید";
        return false;
    }
    return true;
}

function maritalStatusValidate(){
    mStatus = document.getElementsByName("uiMaritalStatus")[0].value;
    if(mStatus == 1 || mStatus == 2){
        return true;
    }
    document.getElementsByName("uiError")[0].innerHTML = "وضعیت تاهل را وارد کنید";
    return false;
}

function formValidation() {
    
    if(!firstNameValidate())
        return false;
   
    if(!lastNameValidate())
        return false;

    if(!mailValidate())
        return false;

    if(!phoneNumValidate())
        return false;

    if(!passValidate())
        return false;

    if(!rPassValidate())
        return false;
  
    if(!ssnValidate())
        return false;
   
    if(!birthdateValidate())
        return false;
    
    if(!maritalStatusValidate()())
        return false;

    return true;
}
