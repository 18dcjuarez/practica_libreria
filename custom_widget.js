var customWidgets = {
    otp: {
        htmlCode: `
        <div style="width: 100%; float: center; text-align: center;">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="sendOtpButton">
        Oprime aquí para enviar código
      </button>
      <h1 style="color:red" >MENSAJE</h1>
        <div id="otpInputContainer" style="display: none; width: 50%; float: left; text-align: left;">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched">
            <input class="mdl-textfield__input vordynform__input" type="text" id="{{ field_name }}" name="{{ field_name }}">
            <label class="mdl-textfield__label" for="otpInput">Ingrese el Código OTP</label>
          </div>

        </div>
        <div style="width: 50%; float: left; text-align: left;">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="resendOtpButton"  style="display: none;">
            Enviar Nuevo Código
          </button>
        </div>
        <div style="clear: both;"></div>

      </div>

    `,
    },
    title : {
        htmlCode: `<h1>{{label}}</h1>`,
        fieldType: "single",
    },
    paragraph : {
        htmlCode: `
            <h1>{{label}}</h1>
            <p> This is a text</p>
        `,
        fieldType: "single",
    }

}

// module.exports =  {customWidgets};
export {customWidgets};
