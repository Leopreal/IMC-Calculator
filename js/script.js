// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

  //--------------------------------------Seleção de elementos---------------------------------------------

  const imcTable = document.querySelector("#imc-table");

  const heightInput = document.querySelector("#height");

  const weightInput = document.querySelector("#weight");

  const calcBtn = document.querySelector("#calc-btn");

  const calccontainer = document.querySelector("#calc-container")

  const resultcontainer = document.querySelector("#result-container")

  const clearbtn = document.querySelector("#clear-btn");

  const imcnumber = document.querySelector("#imc-number span")

  const imcinfo = document.querySelector("#imc-info span")

  const backbtn = document.querySelector("#back-btn")

  // -----------------------------------------FUNÇÕES-------------------------------------------------------
function creatTable(data){
    data.forEach((item) => {
        const div = document.createElement("div")
        div.classList.add("table-data")

        const classification = document.createElement("p")
        classification.innerText = item.classification;

        const info = document.createElement("p")
        info.innerText = item.info;

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);

    });
}

function cleanInputs(){
    heightInput.value = "";
    weightInput.value = "";
    imcnumber.classList = "";
    imcinfo.classList = "";
}

function validDigites(text){
    return text.replace(/[^0-9,]/g, "")
}

function calcIMC(weight, height){
    const imc = (weight / (height * height)).toFixed(1);

    return imc;
}

function showorhidescreen() {
    calccontainer.classList.toggle("hide");
    resultcontainer.classList.toggle("hide");

}

  //---------------------------------------Inicializações-------------------------------------------
    creatTable(data);

  //------------------------------------------EVENTOS-----------------------------------------------

  [heightInput, weightInput].forEach((el) => {
        el.addEventListener("input", (e) => {
            const updatevalue = validDigites(e.target.value)

            e.target.value = updatevalue;
        });
        
  });

  calcBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const weight = +weightInput.value.replace(",",".");
        const height = +heightInput.value.replace(",", ".");

        if(!weight || !height) return;

    const imc = calcIMC(weight, height)

    let info

    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max){
            info = item.info;
        }
    });

    

    if (!info) return;

    imcnumber.innerText = imc;
    imcinfo.innerText = info;

    switch(info) {

        case "Magreza": 
        imcnumber.classList.add("low");
        imcinfo.classList.add("low");
        break

        case "Normal": 
        imcnumber.classList.add("good");
        imcinfo.classList.add("good");
        break

        case "Sobrepeso": 
        imcnumber.classList.add("low");
        imcinfo.classList.add("low");
        break

        case "Obesidade": 
        imcnumber.classList.add("medium");
        imcinfo.classList.add("medium");
        break

        case "Obesidade grave": 
        imcnumber.classList.add("high");
        imcinfo.classList.add("high");
        break

    }

    showorhidescreen();
  })

  clearbtn.addEventListener("click", (e) =>{
    e.preventDefault();

    cleanInputs();
  });


  backbtn.addEventListener("click", () => {

    cleanInputs();
    showorhidescreen();
  })