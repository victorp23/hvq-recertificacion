/**
 * Define a function to navigate betweens form steps.
 * It accepts one parameter. That is - step number.
 */
const navigateToFormStep = (stepNumber) => {
    /**
     * Hide all form steps.
     */
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });
    /**
     * Mark all form steps as unfinished.
     */
    document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
    /**
     * Show the current form step (as passed to the function).
     */
    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
    /**
     * Select the form step circle (progress bar).
     */
    const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
    /**
     * Mark the current form step as active.
     */
    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");
    /**
     * Loop through each form step circles.
     * This loop will continue up to the current step number.
     * Example: If the current step is 3,
     * then the loop will perform operations for step 1 and 2.
     */
    for (let index = 0; index < stepNumber; index++) {
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector('li[step="' + index + '"]');
        /**
         * Check if the element exist. If yes, then proceed.
         */
        if (formStepCircle) {
            /**
             * Mark the form step as completed.
             */
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
};
/**
 * Select all form navigation buttons, and loop through them.
 */
document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
    /**
     * Add a click event listener to the button.
     */
    formNavigationBtn.addEventListener("click", () => {
        /**
         * Get the value of the step.
         */
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
        /**
         * Call the function to navigate to the target form step.
         */
        navigateToFormStep(stepNumber);
    });
});

// ---------------------------- STEP 1 --------------------------------------------------------------------

step1_cont = 1;

function addRow() {
	step1_cont = step1_cont + 1;
	html = `<div id="creado"><br>
				<div class="mt-3">
					<label for="step1_titulo`+step1_cont+`" class="form-label">Nombre del Título:</label>
					<input id="step1_titulo`+step1_cont+`" name="step1_titulo`+step1_cont+`" class="form-control" type="text" value=""/>
				</div>
				<div class="mt-3">
                    <label class="form-label" for="step1_titulo`+step1_cont+`">Nombre de la Sesión:</label>
                    <input id="step1_sesion`+step1_cont+`" name="step1_sesion`+step1_cont+`" class="form-control" type="text" value=""/>
                </div>
                <div class="mt-3">
                    <label for="step1_tema`+step1_cont+`" class="form-label">Tema de la Sesión:</label>
                    <input id="step1_tema`+step1_cont+`" name="step1_tema`+step1_cont+`" class="form-control" type="text" value=""/>
                </div>
                <div class="mt-3">
                    <label for="step1_fecha`+step1_cont+`" class="form-label">Fecha de la Sesión:</label>
                    <input id="step1_fecha`+step1_cont+`" name="step1_fecha`+step1_cont+`" class="form-control form-control-sm" type="date"/>
                </div>
				<div class="input-group-append">
					<br>
					<button id="removeRow" type="button" class="btn btn-danger">Borrar</button>
				</div>
			</div>
	`;

	$('#newRow').append(html);
};

// borrar registro
$(document).on('click', '#removeRow', function () {
	step1_cont = step1_cont - 1;
	$(this).closest('#creado').remove();
});

