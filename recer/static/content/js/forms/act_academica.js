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
					<label for="step1_titulo`+step1_cont+`" class="form-label">Nombre del Titulo:</label>
					<input id="step1_titulo`+step1_cont+`" name="step1_titulo`+step1_cont+`" class="form-control" type="text" value=""/>
				</div>
				<div class="mt-3">
					<label for="step1_file`+step1_cont+`" class="form-label">Nombramiento</label>
					<input id="step1_file`+step1_cont+`"  name="step_file`+step1_cont+`" class="form-control" required multiple="" size="6000" type="file" accept="application/pdf,image/x-png,image/gif,image/jpeg,image/jpg,image/tiff">
				</div>
				<div class="mt-3">
                    <label for="step1_desde`+step1_cont+`" class="form-label">Desde:</label>
                    <input id="step1_desde`+step1_cont+`" name="step1_desde`+step1_cont+`" class="form-control form-control-sm" type="date"/>
                    <br>
                    <label for="step1_hasta`+step1_cont+`" class="form-label">Hasta:</label>
                    <input id="step1_hasta`+step1_cont+`" name="step1_hasta`+step1_cont+`" class="form-control form-control-sm" type="date"/>
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


// --------------------- STEP 2 -----------------------------------------------

step2_cont = 1;

function addRow2() {
	step2_cont = step2_cont + 1;
	html = `<div id="creado2"><br>
				<div class="mt-3">
					<label for="step2_titulo`+step2_cont+`" class="form-label">Nombre del Titulo:</label>
					<input id="step2_titulo`+step2_cont+`" name="step2_titulo`+step2_cont+`" class="form-control" type="text" value=""/>
				</div>
				<div class="mt-3">
					<label for="step2_file`+step2_cont+`" class="form-label">Nombramiento</label>
					<input id="step2_file`+step2_cont+`"  name="step2_file`+step2_cont+`" class="form-control" required multiple="" size="6000" type="file" accept="application/pdf,image/x-png,image/gif,image/jpeg,image/jpg,image/tiff">
				</div>
				<div class="mt-3">
                    <label for="step2_desde`+step2_cont+`" class="form-label">Desde:</label>
                    <input id="step2_desde`+step2_cont+`" name="step2_desde`+step2_cont+`" class="form-control form-control-sm" type="date"/>
                    <br>
                    <label for="step1_hasta`+step2_cont+`" class="form-label">Hasta:</label>
                    <input id="step2_hasta`+step2_cont+`" name="step2_hasta`+step2_cont+`" class="form-control form-control-sm" type="date"/>
                </div>
				<div class="input-group-append">
					<br>
					<button id="removeRow2" type="button" class="btn btn-danger">Borrar</button>
				</div>
			</div>

	`;

	$('#newRow2').append(html);
};

// borrar registro
$(document).on('click', '#removeRow2', function () {
	step2_cont = step2_cont - 1;
	$(this).closest('#creado2').remove();
});


// --------------------- STEP 3 -----------------------------------------------

step3_cont = 1;

function addRow3() {
	step3_cont = step3_cont + 1;
	html = `<div id="creado3"><br>
				<div class="mt-3">
					<label for="step3_titulo`+step3_cont+`" class="form-label">Nombre del Titulo:</label>
					<input id="step3_titulo`+step3_cont+`" name="step3_titulo`+step3_cont+`" class="form-control" type="text" value=""/>
				</div>
				<div class="mt-3">
					<label for="step3_file`+step3_cont+`" class="form-label">Nombramiento</label>
					<input id="step3_file`+step3_cont+`"  name="step3_file`+step3_cont+`" class="form-control" required multiple="" size="6000" type="file" accept="application/pdf,image/x-png,image/gif,image/jpeg,image/jpg,image/tiff">
				</div>
				<div class="mt-3">
                    <label for="step3_desde`+step3_cont+`" class="form-label">Desde:</label>
                    <input id="step3_desde`+step3_cont+`" name="step3_desde`+step3_cont+`" class="form-control form-control-sm" type="date"/>
                    <br>
                    <label for="step3_hasta`+step3_cont+`" class="form-label">Hasta:</label>
                    <input id="step3_hasta`+step3_cont+`" name="step3_hasta`+step3_cont+`" class="form-control form-control-sm" type="date"/>
                </div>
				<div class="input-group-append">
					<br>
					<button id="removeRow3" type="button" class="btn btn-danger">Borrar</button>
				</div>
			</div>

	`;

	$('#newRow3').append(html);
};

// borrar registro
$(document).on('click', '#removeRow3', function () {
	step3_cont = step3_cont - 1;
	$(this).closest('#creado3').remove();
});


// --------------------- STEP 4 -----------------------------------------------

step4_cont = 1;

function addRow4() {
	step4_cont = step4_cont + 1;
	html = `<div id="creado4"><br>
		<div class="mt-3">
			<label for="step4_nombramiento`+step4_cont+`" class="form-label">Nombramiento:</label>
			<select id="step4_nombramiento`+step4_cont+`" name="step4_nombramiento`+step4_cont+`" class="form-control">
				<option selected disabled value="">Seleccione..</option>
				<option>Autor</option>
				<option>Coautor</option>
			</select>
			</div>
		<div class="mt-3">
			<label for="step4_nombre`+step4_cont+`" class="form-label">Titulo del libro, revista o publicacion</label>
			<input id="step4_nombre`+step4_cont+`" name="step4_nombre`+step4_cont+`" class="form-control" required multiple="" type="text">
		</div>
		<div class="mt-3">
			<label for="step4_isbn`+step4_cont+`" class="form-label">Isbn</label>
			<input id="step4_isbn`+step4_cont+`" name="step4_isbn`+step4_cont+`" class="form-control" type="text"/>
			<br>
			<label for="step4_fecha`+step4_cont+`" class="form-label">Fecha de publicacion:</label>
			<input id="step4_fecha`+step4_cont+`" name="step4_fecha`+step4_cont+`" class="form-control form-control-sm" type="date"/>
		</div>
		<div class="input-group-append">
			<br>
			<button id="removeRow4" type="button" class="btn btn-danger">Borrar</button>
		</div>
	</div>
	`;

	$('#newRow4').append(html);
};

// borrar registro
$(document).on('click', '#removeRow4', function () {
	step4_cont = step4_cont - 1;
	$(this).closest('#creado4').remove();
});



// --------------------- STEP 5 -----------------------------------------------

step5_cont = 1;

function addRow5() {
	step5_cont = step5_cont + 1;
	html = `<div id="creado5"><br>
		<div class="mt-3">
			<label for="step5_nombramiento`+step5_cont+`" class="form-label">Nombramiento:</label>
			<select id="step5_nombramiento`+step5_cont+`" name="step5_nombramiento`+step5_cont+`" class="form-control">
				<option selected disabled value="">Seleccione..</option>
				<option>Edittor</option>
				<option>Coeditor</option>
			</select>
		</div>
		<div class="mt-3">
			<label for="step5_nombre`+step5_cont+`" class="form-label">Titulo:</label>
			<input id="step5_nombre`+step5_cont+`" name="step5_nombre`+step5_cont+`" class="form-control" required multiple="" type="text">
		</div>
		<div class="mt-3">
			<label for="step5_grupo`+step5_cont+`" class="form-label">Grupo de trabajo:</label>
			<input id="step5_gupo`+step5_cont+`" name="step5_grupo`+step5_cont+`" class="form-control" type="text"/>
			<br>
			<label for="step5_fecha`+step5_cont+`" class="form-label">Fecha de participacion:</label>
			<input id="step5_fecha`+step5_cont+`" name="step5_fecha`+step5_cont+`" class="form-control form-control-sm" type="date"/>
		</div>
		<div class="input-group-append">
			<br>
			<button id="removeRow5" type="button" class="btn btn-danger">Borrar</button>
		</div>
	</div>
	`;

	$('#newRow5').append(html);
};

// borrar registro
$(document).on('click', '#removeRow5', function () {
	step5_cont = step5_cont - 1;
	$(this).closest('#creado5').remove();
});



// --------------------- STEP 6 -----------------------------------------------

step6_cont = 1;

function addRow6() {
	step6_cont = step6_cont + 1;
	html = `<div id="creado6"><br>
	<div class="mt-3">
		<label for="step6_nombramiento`+step5_cont+`" class="form-label">Nombramiento:</label>
		<select id="step6_nombramiento`+step5_cont+`" name="step6_nombramiento`+step5_cont+`" class="form-control">
			<option selected disabled value="">Seleccione..</option>
			<option>Autor</option>
			<option>Coautor</option>
		</select>
		</div>
		<div class="mt-3">
			<label for="step6_nombre`+step5_cont+`" class="form-label">Titulo del libro:</label>
			<input id="step6_nombre`+step5_cont+`" name="step6_nombre`+step5_cont+`" class="form-control" required multiple="" type="text">
		</div>
		<div class="mt-3">
			<label for="step6_cap`+step5_cont+`" class="form-label">Capitulos:</label>
			<input id="step6_cap`+step5_cont+`" name="step6_cap`+step5_cont+`" class="form-control" type="text"/>
			<br>
			<label for="step6_fecha1" class="form-label">Fecha de publicacion:</label>
			<input id="step6_fecha`+step5_cont+`" name="step6_fecha`+step5_cont+`" class="form-control form-control-sm" type="date"/>
		</div>
		<div class="input-group-append">
			<br>
			<button id="removeRow6" type="button" class="btn btn-danger">Borrar</button>
		</div>
	</div>
	`;

	$('#newRow6').append(html);
};

// borrar registro
$(document).on('click', '#removeRow6', function () {
	step6_cont = step6_cont - 1;
	$(this).closest('#creado6').remove();
});