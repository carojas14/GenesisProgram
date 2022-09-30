(() => {

    window.addEventListener('DOMContentLoaded', (e) => {

        let form = document.querySelector('[data-js-form]'),
            building = document.getElementById('building-type'),
            divResidential = document.querySelector('[data-js-type="residential"]'),
            divCommercial = document.querySelector('[data-js-type="commercial"]'),
            divCorporate = document.querySelector('[data-js-type="corporate"]'),
            divHybrid = document.querySelector('[data-js-type="hybrid"]'),
            inputResidential = divResidential.querySelectorAll('[data-js-input]'),
            inputCommercial = divCommercial.querySelectorAll('[data-js-input]'),
            inputCorporate = divCorporate.querySelectorAll('[data-js-input]'),
            inputHybrid = divHybrid.querySelectorAll('[data-js-input]'),
            productLine = document.querySelectorAll('[data-js-input="radio"]'),
            elevatorsNeed = document.getElementById('elavators-need'),
            price = document.querySelector('[data-js-type="price"]'),
            inputElevatorsNeed = elevatorsNeed.querySelector('input'),
            priceElevator = document.getElementById('priceElevator'),
            elevatorCost = document.getElementById('serviceValue'),
            installation = document.getElementById('installation'),
            totalCost = document.getElementById('totalCost');


        /**
         * validation select and show input for each type of building
         * code find https://stackoverflow.com/questions/24875414/addeventlistener-change-and-option-selection
         */

        building.addEventListener('click', () => {

            building.addEventListener('change', () => {
                form.reset('input');

                switch (building.value) {
                    case "select":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "none";
                        inputElevatorsNeed.value = '';
                    break;
                    case "residential":
                        divResidential.style.display = "block";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "block";
                        inputElevatorsNeed.value = '';

                        for (let i = 0, l = inputResidential.length; i < l; i++) {

                            inputResidential[i].addEventListener("input", estimateNumElevatorResidential);

                        }

                    break;
                    case "commercial":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "block";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "block";
                        inputElevatorsNeed.value = '';

                        for (let i = 0, l = inputCommercial.length; i < l; i++) {

                            inputCommercial[i].addEventListener("input", estimateNumElevatorCommercial);
                        }
                    break;
                    case "corporate":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "block";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "block";
                        inputElevatorsNeed.value = '';

                        for (let i = 0, l = inputCorporate.length; i < l; i++) {

                            inputCorporate[i].addEventListener("input", estimateNumElevatorCorp);
                        }
                    break;
                    case "hybrid":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "block";
                        elevatorsNeed.style.display = "block";
                        inputElevatorsNeed.value = '';

                        for (let i = 0, l = inputHybrid.length; i < l; i++) {

                            inputHybrid[i].addEventListener("input", estimateNumElevatorHybrid);
                        }
                    break;
                }
            });
        });

        /**
         * Calculation for estimate the number of lift cages for Residential building
         */


        function estimateNumElevatorResidential() {

            if(isValid(inputResidential)){

                for (let i = 0, l = inputResidential.length; i < l; i++) {


                    let numApt = inputResidential[0].value,
                    numFloors = inputResidential[1].value;

                    let estimate = Math.ceil(numApt / (numFloors * 6));

                    let columns = Math.ceil(numFloors / 20);

                    let numResidentialElevators = estimate * columns;

                    inputElevatorsNeed.value = numResidentialElevators || 0;

                }
            } else {
                inputElevatorsNeed.value = 0;

            }

        }


        /**
         * Calculation for estimate the number of lift cages for Commercial building
         */


        function estimateNumElevatorCommercial() {

            let numCommercialElevators = 0;

            if(isValid(inputCommercial)){
                for (let i = 0, l = inputCommercial.length; i < l; i++) {

                    let numElevators = inputCommercial[4].value;

                    inputElevatorsNeed.value = numElevators || 0;
                    numCommercialElevators = numElevators;
                }
            } else {
                //msgError.innerHTML = 'Required';
                inputElevatorsNeed.value = 0;
            }

            return numCommercialElevators;
        }


        /**
         * Calculation for estimate the number of lift cages for Corporative building
         */


        function estimateNumElevatorCorp() {

            if(isValid(inputCorporate)){
                estimateNumElevatorCorpOrHyb(inputCorporate);
            }
        }


        /**
         * Calculation for estimate the number of lift cages for Hybrid building
         */


        function estimateNumElevatorHybrid() {

            if(isValid(inputHybrid)){
                estimateNumElevatorCorpOrHyb(inputHybrid);
            }
        }



        function estimateNumElevatorCorpOrHyb(input) {


            let numCorpOrHybElevators = 0;

                for (let i = 0, l = input.length; i < l; i++) {

                    //console.log(input[0].value)

                    let numFloors = parseInt(input[1].value),
                        numBasement = parseInt(input[2].value);
                        numParking = input[3].value;
                        numOccupants = parseInt(input[4].value);

                    let totalOccupants = numOccupants*(numFloors + numBasement);

                    let elevatorReq = Math.ceil(totalOccupants/1000);

                    let columns = Math.ceil((numFloors + numBasement) / 20);

                    let elevatorByColumns = Math.ceil(elevatorReq / columns);

                    let totalElevators = Math.ceil(elevatorByColumns * columns);

                    inputElevatorsNeed.value = totalElevators;
                    numCorpOrHybElevators = totalElevators;
                }

            return numCorpOrHybElevators;
        }


        /**
         * Inputs validation
         */
        isValid = (inputs) => {
            let isValid = true;

            for (let i = 0, l = inputs.length; i < l; i++) {

                let values = inputs[i].value,
                    msgError = inputs[i].nextElementSibling;


                if (inputs[i].type == 'number') {
                    if (values != '') {
                        let values = inputs[i].value,
                        numValue = parseInt(values);

                        if (numValue < 0) {
                            msgError.innerHTML = 'Must be positive number';
                            inputElevatorsNeed.value = 0;
                            priceElevator.value = 0;
                            elevatorCost.value = 0;
                            installation.value = 0;
                            totalCost.value = 0;
                            isValid = false;
                        } else {
                            if (values.length > 1 && values.charAt(0) == 0) {
                                msgError.innerHTML = 'First character can not be 0';
                                inputElevatorsNeed.value = 0;
                                priceElevator.value = 0;
                                elevatorCost.value = 0;
                                installation.value = 0;
                                totalCost.value = 0;
                                isValid = false;
                            } else {
                                msgError.innerHTML = '';
                            }
                        }
                    }
                }
            }
            return isValid;
        }



         /**
         * Calculation for price according to product line
         */

        for(const product of productLine){

            product.addEventListener('change', showProduct);
        }


        function showProduct() {


            if (this.checked) {
                //console.log(this.value)

                let resElevators = elevatorsNeed.querySelector('input').value;

            switch (this.value) {
                case "standard":
                    price.style.display = "block";
                    priceElevator.value = (7565*1).toFixed(2);
                    elevatorCost.value = (7565*resElevators).toFixed(2);
                    installation.value = (7565*0.10*resElevators).toFixed(2);
                    totalCost.value = (7565*1.10*resElevators).toFixed(2);
                break;
                case "premium":
                    price.style.display = "block";
                    priceElevator.value = (12345*1).toFixed(2);
                    elevatorCost.value = (12345*resElevators).toFixed(2);
                    installation.value = (12345*0.13*resElevators).toFixed(2);
                    totalCost.value = (12345*1.13*resElevators).toFixed(2);
                break;
                case "excelium":
                    price.style.display = "block";
                    priceElevator.value = (15400*1).toFixed(2);
                    elevatorCost.value = (15400*resElevators).toFixed(2);
                    installation.value = (12345*0.16*resElevators).toFixed(2);
                    totalCost.value = (12345*1.16*resElevators).toFixed(2);
                break;
            }
            }
        }

    });
})();