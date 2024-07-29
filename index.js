Allarraey = [];
let copiedPin;
let used = false;
let data1 = JSON.parse(localStorage.getItem("salesLists"));
if (data1) {
  Allarraey = data1;
}

let code;
function handleValue() {
  if (network.value == "GLO") {
    code = "*123*";
  } else if (network.value == "MTN") {
    code = "*555*";
  } else if (network.value == "AIRTEL") {
    code = "*131*";
  } else if (network.value == "9 MOBILE") {
    code = "*244*";
  }
  console.log(code);
}
function show() {
  display.innerHTML = "";
  Allarraey?.forEach((ele, i) => {
    display.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${ele.net}</td>
            <td>${ele.date1}</td>
            <td>${ele.amt}</td>
            <td>${ele.time1}</td>
            <td>${ele.pin}</td>
            <td>${ele.status1 ? "used" : "unuse"}</td>
            <td> <button onclick="deleteDetails(${i})">Delete</button></td>
        </tr>
        `;
  });
}
show();
function handlePin() {
  const getDate = new Date();
  const date = getDate.toDateString("en-us", {
    month: "long",
    day: "long",
    year: "numeric",
  });
  let hours = getDate.getHours();
  let minutes = getDate.getDate();
  let time = `${hours}:${minutes}`;
  if (network.value == "select Network") {
    error1.innerHTML = "Please Select a Network";
    modal.style.display = "block";
  } else if (amount.value == "select Amount") {
    error1.innerHTML = "Please Select a Amount";
    modal.style.display = "block";
  } else {
    let random = Math.floor(1 + Math.random() * 99999999999999999);
    inputrandom.value = `${code}${random}#`;
    obj = {
      net: network.value,
      amt: amount.value,
      pin: `${code}${random}#`,
      date1: date,
      status1: false,
      time1: time,
    };

    Allarraey.push(obj);

    localStorage.setItem("salesLists", JSON.stringify(Allarraey));

    show();
    console.log(Allarraey);
  }
}
function deleteDetails(index) {
  Allarraey.splice(index, 1);
  show();
  localStorage.setItem("salesLists", JSON.stringify(Allarraey));
}
function copyPin() {
  if (inputrandom.value == "") {
    error1.innerHTML = "empty pin";
    modal.style.display = "block";
  } else {
    copiedPin = inputrandom.value;
    error1.innerHTML = "Copied";
    modal.style.display = "block";
    console.log(copiedPin);
  }
  inputrandom.value = "";
}
function pastePin1() {
  if (copiedPin) {
    pastePin.value = copiedPin;
    error1.innerHTML = "Pasted";
    modal.style.display = "block";
    console.log(copiedPin);
  } else {
    error1.innerHTML = "error";
    modal.style.display = "block";
  }
}
function rechargeCard() {
  // alert(pastePin.value)

  data1?.forEach((elem, i) => {
    if (pastePin.value.trim() == elem.pin && elem.status1 == false) {
      elem.status1 = true;
      error1.innerHTML = "Recharge successful";
      modal.style.display = "block";
    } else if (pastePin.value != elem.pin) {
      error1.innerHTML = "invalid pin";
      modal.style.display = "block";
    } else {
      error1.innerHTML = "Aready been used by you";
      modal.style.display = "block";
    }
    localStorage.setItem("salesLists", JSON.stringify(Allarraey));
  });
  //   pastePin.value=''

  show();
}
function popup() {
  modal.style.display = "none";
}
