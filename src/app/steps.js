;(function() {

    // $(".step:nth-child(1)").addClass("active");

    const selector = "#contact-form";
    console.log(1);
    $(".step textarea").on("keydown", (ev) => {
        if (ev.keyCode == 13) {
            ev.preventDefault();
            $(ev.target).blur();
            console.log(2);
        }
    })

    $(".path-step").on("click", (ev) => {
        const $current_circle = $(ev.target);
        console.log(3);
        focus_circle($current_circle);
        console.log(3);
        const posicion = $current_circle.index(".path-step") + 1;
        console.log(3);
        let $test = $(".step:nth-child(" + posicion + ")");
        console.log(3);
        siguiente($test);
    })

    $(selector).find(".input").on("change", (ev)=> {
        const $input = $(ev.target);
        const $next_step = $input.parent().next(".step");
        const is_form_valid = es_valido_formulario();

        if (!is_form_valid && $next_step.length > 0) {
            siguiente($next_step);
        } else {
            validar_formulario();
        }
        console.log(4);
    })

    //Helpers
    function validar_formulario() {
        if (es_valido_formulario()) {
            enviar_formulario();
        } else {
            let $fieldset_invalido = $(selector).find(".input:invalid").first().parent();
            siguiente($fieldset_invalido);
        }
        console.log(5);
    }

    function es_valido_formulario() {
        console.log(6);
        return document.querySelector(selector).checkValidity();
    }

    function siguiente($next_step) {
        $(".step.active").removeClass("active");
        $next_step.addClass("active");
        $next_step.find(".input").focus();

        //Coordinar los circulos
        const posicion = ($next_step.index(".step")) + 1;
        
        const $circle = $(".path-step:nth-child(" + posicion + ")").addClass("active");
        focus_circle($circle);
        console.log(7);
    }  

    function focus_circle($circle) {
        $(".path-step.active").removeClass("active");
        $circle.addClass("active");
        console.log(8);
    }

    function enviar_formulario() {
        const $form = $(selector);
        console.log(9);
        $.ajax({
            url: $form.attr("action"), 
            method: "POST",
            data: $form.formObject(),
            dataType: "json",
            success: function() {
                $form.slideUp();
                $("#info-contact").html("Enviamos tu mensaje, pronto nos pondremos en contacto contigo.");
            }
        })
    }

})()