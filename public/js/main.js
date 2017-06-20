$(document).ready(function() {

    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
    //console.log(pgurl);
    $(".nav li a").each(function(){
        if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
            $(this).parent().addClass("active");
    })

    /*$("button.pushCart").click(function () {
        alert(this.val);
    })*/
    /*var elements = document.forms["signup-form"].getElementsByTagName("input");
    console.log("init " )
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.preventDefault()
            console.log("IN " + e.target + " " + i);
            e.target.setCustomValidity("Please enter Room Topic Title");
        };
    }*/

    //$('#signup-form *').filter(':input:not([type=hidden])').each(function(){
    //$('#signup-form :input').not(':button').not(':hidden').each(function(){
/*

    $('#signup-form *').filter(':input').not(':button').not('input[type=hidden]').each(function(){

        var $form = $('input[id="' + this.id + '"]').closest("form");
        var $formId = $('input[id="' + this.id + '"]').closest("form").attr('id');
        //console.log(form);

        var $jqform = $('form#' + $formId);

        var $element = this;
        var $myClass = $(this).attr("class");

        if($element.checkValidity()) {
            console.log("VALID " + $myClass)
        } else {
            console.log("IN--VALID " + $myClass)
            $(this).removeClass('invalid');
        }


        $(this).bind('keyup', clearCustumeMsg);
        $(this).bind('input', attachMsg);

        //console.log("SET_UP _ " + $element);
        if ($element.length > 0) {
            console.log($element.length)
        }
        console.log("$element Setup: ");
        console.log($element);

   /!*     $(this)
            .attr('title', newTitle)
            .tooltip('fixTitle')
            .tooltip('setContent')*!/
        var msg = '';
        switch($element.id) {
            case 'email':
                msg = 'אנא הזינו כתובת מייל תקינה';
                $element.setCustomValidity(msg);
                $(this).attr('title', msg)
                //$element.attr('title', 'אנא הזינו כתובת דואר אלקטרוני');
                console.log('ELEMENT ' + this.id)
                break;
            case 'password':
                msg = 'יש להזין סיסמה';
                $element.setCustomValidity(msg);
                $(this).attr('title', msg);
                console.log('ELEMENT ' + this.id)
                break;
            case 'confirmPassword':
                msg = 'יש לאשרר את הסיסמה';
                $element.setCustomValidity(msg);
                $(this).attr('title', msg);
                console.log('ELEMENT ' + this.id)
                break;
            default:
                msg = 'קרתה תקלה. אנא בדקו אם הנתונים שהזנתם נכונים.';
                $element.setCustomValidity('קרתה תקלה. אנא בדקו אם הנתונים שהזנתם נכונים.');
                $(this.target).attr('title', msg);
                console.log('DEFAULT')
                break;
        }
    });

*/
    function clearCustumeMsg() {
        console.log('This length is ' + $(this).val().length);
        console.log("BINDING");

        var $input = $(this);
        this.setCustomValidity('');
        console.log("BINDING EMPTIED custom MSG ");
        //$input.preventDefault();
        //if (!$.nodeName($input, 'input')) return;
        console.log("$input : " + $(this).val().length + " " + $(this).attr('id'));
        attachMsg($(this));
    }

    function attachMsg(elem) {

        //alert(JSON.stringify($(elem).parent()));
        console.log("Attaching msgs... " + $(elem).parent());
        var $elem = $(elem);
        console.log("$elem:  " + $elem.parent().context);
        var id = $(elem).attr('id');
        var len = $(elem).val().length;
        console.log("LEN Attaching msgs... " + len);
        if (len <= 0) {
            switch(id) {
                case 'email':
                    $elem.attr('title', 'אנא הזינו כתובת דואר אלקטרוני');
                    //$elem.parent().context.setCustomValidity('אנא השלימו @ או את החלק שלאחריו');
                    console.log('ELEMENT ' + id)
                    break;
                case 'password':
                    $elem.setCustomValidity('יש להזין סיסמה');
                    console.log('ELEMENT ' + id)
                    break;
                case 'confirmPassword':
                    $elem.setCustomValidity('יש לאשרר את הסיסמה');
                    console.log('ELEMENT ' + id)
                    break;
                default:
                    $elem.setCustomValidity('קרתה תקלה. אנא בדקו אם הנתונים שהזנתם נכונים.');
                    console.log('DEFAULT')
                    break;
            }

        } else {
            console.log("LEN BIIGER THEN ZERO = " + len)
            switch(id) {
                case 'email':
                    $elem.parent().context.setCustomValidity('אנא השלימו @ או את החלק שלאחריו');
                    console.log('ELEMENT ' + id)
                    break;
                case 'password':
                    $elem.setCustomValidity('יש להזין סיסמה');
                    console.log('ELEMENT ' + id)
                    break;
                case 'confirmPassword':
                    $elem.setCustomValidity('יש לאשרר את הזסיסמה');
                    console.log('ELEMENT ' + id)
                    break;
                default:
                    $elem.setCustomValidity('קרתה תקלה. אנא בדקו אם הנתונים שהזנתם נכונים.');
                    console.log('DEFAULT')
                    break;
            }
        }
    }
    $("button.shownextrow").click(function() {
        //$(this).closest("tr").next().slideToggle("slow");
        var id = $(this).attr('id');
        //alert(id);
        //$('.details' + id).slideToggle("slow");
        /*.toggler {
            width: 500px;
            height: 200px;
        }*/
        var options = { to: { width: 200, height: 60 } };
        $('.details' + id).toggle("fade", 500);

            /*console.log(id);
            if ($('.details' + id).is(":visible")) {
                console.log("SHOWN")
                $('.details' + id).hide("fade", {direction: "down"}, 500);
            } else {
                console.log("HIDEEN")
                $('.details' + id).show("fade", {direction: "up"}, 500);
            }*/

        //$('#effect').toggle("fold");
        //$(this).closest("tr").next().next().slideToggle("slow");
    });
/*
    document.addEventListener('input', function(e) {
        $.each($(e.target).parent().attributes, function() {
            // this.attributes is not a plain object, but an array
            // of attribute nodes, which contain both the name and value
            if(this.specified) {
                console.log(this.name, this.value);
            }
        });
        var $input = e.target;
        $input.setCustomValidity('');
        console.log("EMPTIED custom MSG ");
        e.preventDefault();
        if (!$.nodeName($input, 'input')) return;
        console.log("$input : " + $input.eq(0).val());

        //var $element = $input.parent();
        //var $_e = $element.context.id;
        //console.log("_e " + $_e + " " + $element + " " + $input);
        //$input.preventDefault()
    });*/

    /*document.addEventListener('input', function(e) {
        e.preventDefault();
        var input = e.target;
        if (!$.nodeName(input, 'input')) return;
        console.log("INPUT " + input + " " + input.checkValidity());
        console.log("PARENT " + input.parent().checkValidity());
    }, true);*/

    // This seems to work only when submit button is pressed
    //if (document.addEventListener) {
        /*document.addEventListener('invalid', function(e) {
            var _e = $(e.target);
            //console.log(" $.nodename " + $.nodeName.toString() + " " + $.nodeType);
            var element = _e.parent();
            console.log("_E " + element.context);
            console.log("_E FORM " + element.context.form + " - " + element.context.form.id);
            element.addClass("invalid");
            console.log("INVALID " + element.context.id);
            if (element.context.id === 'email') {
                element.context.setCustomValidity('אנא הזינו כתובת מייל תקינה');
                element.parent().removeClass('invalid');
            } else if (element.context.id === 'password') {
                element.context.setCustomValidity('יש להזין סיסמה');
                element.parent().removeClass('invalid');
            } else if (element.context.id === 'confirmPassword') {
                element.context.setCustomValidity('יש לאשרר את הזסיסמה');
                element.parent().removeClass('invalid');
            }
        }, true);
*/

        function doSomething(e) {
            if (e.target !== e.currentTarget) {
                var input = e.target;
                var clickedItem = input.id;
                var input = e.target;
                if(!input.validity.valid) {
                    console.log("Hello " + clickedItem);
                    setErrorMsg(input);
                } else {
                    input.setCustomValidity('');
                    console.log("VALID " + clickedItem);
                }
            }
        }

});