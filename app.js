const apiKey = '37e2f57d7695edf23d537152dcb008f4';
const apiUrl = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`;


let dropdowns=document.querySelectorAll(".select_container select");
let btn=document.querySelector("button");
let amount=document.querySelector(".amount input");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");



for(select of dropdowns){
    for(countryCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=countryCode;
        newOption.value=countryCode;
        select.append(newOption)
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

let updateFlag=(element)=>{
    let curCode=element.value;
    console.log(curCode);
    let countryCode=countryList[curCode];
    console.log(countryCode);
    let newImgSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newImgSrc;
    
   
}

let updateExchangeRate= async ()=>{
    let amt=amount.value;
     if( amt==="" || amt<1 )
        amount.value="1";
    const url=`${apiUrl}`;
    let response=await fetch(url);
    let data= await response.json();
     let rate=data.rates[fromCurr.value];
    let exhAmount= rate*amt;

 msg.innerText=`${amt} ${fromCurr.value} = ${exhAmount} ${toCurr.value}`;

}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
});