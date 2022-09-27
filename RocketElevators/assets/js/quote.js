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
            elevatorsNeed = document.getElementById('elavators-need'),
            inputElevatorsNeed = elevatorsNeed.querySelector('input');


        /**
         * validation select and show input for each type of building
         */

        // code find https://stackoverflow.com/questions/24875414/addeventlistener-change-and-option-selection
        building.addEventListener('click', (e) => {
            e.preventDefault();

            building.addEventListener('change', () => {

                switch (building.value) {
                    case "select":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "none";
                    break;
                    case "residential":
                        divResidential.style.display = "block";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "block";
                    break;
                    case "commercial":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "block";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "block";
                    break;
                    case "corporate":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "block";
                        divHybrid.style.display = "none";
                        elevatorsNeed.style.display = "block";
                    break;
                    case "hybrid":
                        divResidential.style.display = "none";
                        divCommercial.style.display = "none";
                        divCorporate.style.display = "none";
                        divHybrid.style.display = "block";
                        elevatorsNeed.style.display = "block";
                    break;
                }
            });
        });

        /**
         * Calculation for estimate the number of lift cages for Residential building
         */

        for (let i = 0, l = inputResidential.length; i < l; i++) {

            inputResidential[i].addEventListener("change", estimateNumElevatorResidential);
        }

        function estimateNumElevatorResidential() {

            let numResidentialElevators = 0;

            for (let i = 0, l = inputResidential.length; i < l; i++) {

                let values = inputResidential[i].value,
                    msgError = inputResidential[i].nextElementSibling;


                if (inputResidential[i].type == 'number') {
                    if (values != '') {
                        let values = inputResidential[i].value,
                        numValue = parseInt(values);

                        if (numValue < 0) {
                            msgError.innerHTML = 'Must be positive number';
                        } else {
                            if (values.length > 1 && values.charAt(0) == 0) {
                                msgError.innerHTML = 'First character can not be 0';
                            } else {
                                msgError.innerHTML = '';
                            }
                        }
                        let numApt = inputResidential[0].value
                        numFloors = inputResidential[1].value,
                        numBasements = inputResidential[2].value;

                        let estimate = Math.ceil(numApt / (numFloors * 6));

                        let columns = Math.ceil(numFloors / 20);

                        let numResidentialElevators = estimate * columns;

                        inputElevatorsNeed.value = numResidentialElevators;
                    } else {
                        inputElevatorsNeed.value = 0;
                    }
                }
            }

            return numResidentialElevators;
        }


        /**
         * Calculation for estimate the number of lift cages for Commercial building
         */

         for (let i = 0, l = inputCommercial.length; i < l; i++) {

            inputCommercial[i].addEventListener("click", estimateNumElevatorCommercial);
        }


        function estimateNumElevatorCommercial() {

            let numCommercialElevators = 0;


            for (let i = 0, l = inputCommercial.length; i < l; i++) {

                let values = inputCommercial[i].value,
                    msgError = inputCommercial[i].nextElementSibling;


                if (inputCommercial[i].type == 'number') {
                    if (values != '') {
                        let values = inputCommercial[i].value,
                        numValue = parseInt(values);

                        if (numValue < 0) {
                            msgError.innerHTML = 'Must be positive number';
                        } else {
                            if (values.length > 1 && values.charAt(0) == 0) {
                                msgError.innerHTML = 'First character can not be 0';
                            } else {
                                msgError.innerHTML = '';
                            }
                        }
                        let numBus = inputCommercial[0].value
                            numFloors = inputCommercial[1].value,
                            numBasement = inputCommercial[2].value;
                            numParking = inputCommercial[3].value;
                            numElevators = inputCommercial[4].value;

                        inputElevatorsNeed.value = numElevators;
                        numCommercialElevators = numElevators;
                    } else {
                        //msgError.innerHTML = 'Required';
                        inputElevatorsNeed.value = 0;
                    }
                }
            }

            return numCommercialElevators;
        }


        /**
         * Calculation for estimate the number of lift cages for Corporative building
         */

        for (let i = 0, l = inputCorporate.length; i < l; i++) {

            inputCorporate[i].addEventListener("change", estimateNumElevatorCorpOrHyb);
        }


        function estimateNumElevatorCorpOrHyb() {

            let numCorpElevators = 0;
            console.log (inputCorporate[i]);


            for (let i = 0, l = inputCommercial.length; i < l; i++) {

                let values = inputCommercial[i].value,
                    msgError = inputCommercial[i].nextElementSibling;


                if (inputCommercial[i].type == 'number') {
                    if (values != '') {
                        let values = inputCommercial[i].value,
                        numValue = parseInt(values);

                        if (numValue < 0) {
                            msgError.innerHTML = 'Must be positive number';
                        } else {
                            if (values.length > 1 && values.charAt(0) == 0) {
                                msgError.innerHTML = 'First character can not be 0';
                            } else {
                                msgError.innerHTML = '';
                            }
                        }
                        let numBus = inputCommercial[0].value
                            numFloors = inputCommercial[1].value,
                            numBasement = inputCommercial[2].value;
                            numParking = inputCommercial[3].value;
                            numElevators = inputCommercial[4].value;

                        inputElevatorsNeed.value = numElevators;
                        numCommercialElevators = numElevators;
                    } else {
                        //msgError.innerHTML = 'Required';
                        inputElevatorsNeed.value = 0;
                    }
                }
            }

            return numCommercialElevators;

        }





    });
})();