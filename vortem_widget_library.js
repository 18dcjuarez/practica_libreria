(function(global) {
    const vortemWidgetLibrary = {
        widgetDefinitions:  {
            otp: {
                htmlCode: `
                <div style="width: 100%; float: center; text-align: center;">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="sendOtpButton">
                Oprime aquí para enviar código
              </button>
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
                fieldType: "single",
                init: function (container, model_data, properties, divNavigation) {
                    const currentUrl = new URL(window.location.href);
                    const processToken = currentUrl.searchParams.get("ProcessId");
        
                    divNavigation.style.display = "none";
                    function solicitarOTP() {
                        console.log("===", URL_BACKEND);
                        console.log(processToken);
                        fetch(URL_BACKEND + "/otp/generar", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                field_name: properties.campo_relacionado,
                                token: processToken,
                            }),
                        })
                            .then((response) => {
                                console.log("====", response);
                                return response.json();
                            })
                            .then((data) => {
                                if (data.success) {
                                    divNavigation.style.display = "block";
                                    console.log("Código OTP enviado con éxito.");
                                    mostrarSnackbar("El código fue enviado satisfactoriamente");
                                    // Aquí puedes implementar lógica adicional en caso de éxito
                                } else {
                                    mostrarSnackbar(
                                        "Error al enviar código OTP, favor de intentar nuevamente"
                                    );
                                    console.error(
                                        "Error al solicitar el código OTP:",
                                        data.error
                                    );
                                    // Manejo de errores
                                }
                            })
                            .catch((error) => {
                                console.error("Error en la solicitud:", error);
                            });
                    }
                    const sendOtpButton = container.querySelector("#sendOtpButton");
                    const resendOtpButton = container.querySelector("#resendOtpButton");
                    const otpInputContainer =
                        container.querySelector("#otpInputContainer");
                    const field_name = container.querySelector(
                        ".mdl-textfield__input"
                    ).id;
        
                    sendOtpButton.onclick = function () {
                        console.log("Solicitando OTP para el campo: ", field_name);
                        otpInputContainer.style.display = "block";
                        sendOtpButton.style.display = "none";
                        resendOtpButton.style.display = "block";
                        solicitarOTP();
                    };
        
                    resendOtpButton.onclick = function () {
                        solicitarOTP();
                    };
                },
            },
            title: {
                htmlCode: `<h4>{{ label }}</h4>`,
                fieldType: "single",
            },
            subtitle: {
                htmlCode: `<h5>{{ label }}</h5>`,
                fieldType: "single",
            },
            label: {
                htmlCode: `<span>{{ label }}</span>`,
                fieldType: "single",
            },
            char: {
                htmlCode: `
                                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched ">
                                    <input class="mdl-textfield__input vordynform__input {{ additionalClasses }}" type="text" id="{{ field_name }}" name="{{ field_name }}"  value="{{ value }}">
                                    <span  class="mdl-textfield__error">{{ errorMsg }}</span>
                                    <label class="mdl-textfield__label" for="{{ field_name }}">{{ label }}</label>
        
                                  </div>`,
                fieldType: "single",
            },
            password: {
                htmlCode: `
                                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched ">
                                    <input class="mdl-textfield__input vordynform__input {{ additionalClasses }}" type="password" id="{{ field_name }}" name="{{ field_name }}"  value="{{ value }}">
                                    <span  class="mdl-textfield__error">{{ errorMsg }}</span>
                                    <label class="mdl-textfield__label" for="{{ field_name }}">{{ label }}</label>
                                  </div>`,
                fieldType: "single",
            },
            numeric: {
                htmlCode: `
                                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched ">
                                    <input class="mdl-textfield__input vordynform__input {{ additionalClasses }}" type="text" id="{{ field_name }}" name="{{ field_name }}"  value="{{ value }}">
                                    <span  class="mdl-textfield__error">{{ errorMsg }}</span>
                                    <label class="mdl-textfield__label" for="{{ field_name }}">{{ label }}</label>
        
                                  </div>`,
                fieldType: "single",
            },
            date: {
                htmlCode: `
                                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched ">
                                    <input class="mdl-textfield__input vordynform__input {{ additionalClasses }}" type="date" id="{{ field_name }}" name="{{ field_name }}"  value="{{ value }}" min="{{ minVal }}" max="{{ maxVal }}">
                                    <span class="mdl-textfield__error">{{ errorMsg }}</span>
                                    <label class="mdl-textfield__label" for="{{ field_name }}">{{ label }}</label>
        
                                  </div>`,
                fieldType: "single",
            },
            many2one: {
                htmlCode: `
                                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched ">
                                    <select class="mdl-textfield__input vordynform__input {{ additionalClasses }}" id="{{ field_name }}" name="{{ field_name }}"  style="cursor: pointer;">
                                      <option value="" disabled selected>-</option>
                                      {{ options }}
                                    </select>
                                    <span class="mdl-textfield__error">{{ errorMsg }}</span>
                                    <label class="mdl-textfield__label" for="{{ field_name }}">{{ label }}</label>
        
                                  </div>`,
                fieldType: "single",
            },
            checkbox: {
                htmlCode: `
                <div class="form-group">
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="{{ field_name }}">
                        <input type="checkbox" id="{{ field_name }}" name="{{ field_name }}" class="mdl-checkbox__input vordynform__input {{ additionalClasses }}">
                        <span class="mdl-checkbox__label">{{ label }}</span>
                        <span class="mdl-textfield__error">{{ errorMsg }}</span>
                    </label>
                </div>
        `,
                fieldType: "single",
            },
            /*
                            <div class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-touched">
                    <label class="mdl-checkbox__label" for="{{ field_name }}">
                      <input type="checkbox" id="{{ field_name }}" name="{{ field_name }}" class="mdl-checkbox__input vordynform__input vor-required {{ additionalClasses }}">
                      <span class="mdl-checkbox__focus-helper"></span>
                      <span class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></span>
                      <span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" data-upgraded=",MaterialRipple"><span class="mdl-ripple"></span></span>
                    </label>
                    <span class="mdl-checkbox__label-text">{{ label }}</span>
                    <span class="mdl-checkbox__error"></span>
                  </div>
                   */
            numericSlider: {
                htmlCode: `
                              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched">
                                <input class="mdl-textfield__input vordynform__input_slider {{ additionalClasses }}" type="range" id="{{ field_name }}_slider" name="{{ field_name }}_slider" value="{{ value }}" min="{{ minVal }}" max="{{ maxVal }}" oninput="document.getElementById('{{ field_name }}').value = this.value" {{ attributes }}>
                                <input class="mdl-textfield__input vordynform__input" type="number" id="{{ field_name }}" name="{{ field_name }}" value="{{ value }}" min="{{ minVal }}" max="{{ maxVal }}" oninput="document.getElementById('{{ field_name }}').value = this.value">
                                <span class="mdl-textfield__error">{{ errorMsg }}</span>
                                <label class="mdl-textfield__label" for="{{ field_name }}">{{ label }}</label>
                              </div>`,
                fieldType: "single",
                init: function (container, model_data, properties, divNavigation) {
                    const userInput = container.querySelector(`.vordynform__input`);
                    const userInputSlider = container.querySelector(
                        `.vordynform__input_slider`
                    );
                    if (userInput && userInputSlider) {
                        userInputSlider.addEventListener("change", function (event) {
                            const inputs = document.querySelectorAll(`.vordynform__input`);
                            validateField(userInput, inputs);
                        });
                    }
                },
            },
            simuladorCompuesto: {
                htmlCode: `
                    <div class="widget-simulador">
                      <p>Esta es una simulación y no representa un compromiso por parte de la institución financiera.</p>
                      <table style="width: 100%;">
                  <tr>
                    <td style="width: 80%;">
                      {{montoSubwidget}}
                    </td>
                      <td style="width: 20%; text-align: right;">
                      <span>Leyenda 1</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 80%;">
                        {{plazoSubwidget}}
                    </td>
                      <td style="width: 20%; text-align: right;">
                      <span>Leyenda 2</span>
                    </td>
                  </tr>
                </table>
                      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched">
                        <input class="mdl-textfield__input vordynform__input" type="text" id="pago_calculado" name="pago_calculado" readonly>
                        <label class="mdl-textfield__label" for="pago_calculado">Pago Calculado</label>
                      </div>
                    </div>`,
                fieldType: "special",
            },
            char_displayonly: {
                htmlCode: `
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-touched display-only">
                      <div class="display-only-label" style="width: 75%; float: left; text-align: left;">{{ label }}</div>
                      <div class="display-only-value" style="width: 25%; float: right; text-align: right;">{{ value }}</div>
                    </div>
                    <div style="clear: both;"></div>`,
                fieldType: "single",
            },
            archivo: {
                htmlCode: `
                <div class="widget-archivo">
                  <div class="file-upload-container">
                    <h5>{{ label }}</h5>
                    <p class="file-upload-instructions">{{ instrucciones }}</p>
                    <label class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect file-upload-label">
                      Seleccionar Archivo
                      <input type="file" accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png,.gif" multiple class="file-input" style="display: none;" />
                    </label>
        
                    <div class="uploaded-files"></div>
                    <input type="hidden" id="fileType" name="{{ field_name }}" value="{{ field_name }}">
                  </div>
                </div>
              `,
                fieldType: "archivo",
                init: function (container, model_data, properties, divNavigation) {
                    container
                        .querySelector(".file-input")
                        .addEventListener("change", function () {
                            const files = Array.from(this.files);
                            const fileType = container.querySelector("#fileType").value;
                            let count = 0;
        
                            files.forEach((file) => {
                                count += 1;
                                const formData = new FormData();
                                formData.append("file", file);
                                const currentUrl = new URL(window.location.href);
                                const processToken = currentUrl.searchParams.get("ProcessId");
                                formData.append("token", processToken);
        
                                const fileDiv = document.createElement("div");
                                fileDiv.classList.add("file-item");
        
                                const fileNameSpan = document.createElement("span");
                                fileNameSpan.textContent = file.name;
                                fileDiv.appendChild(fileNameSpan);
        
                                const progressIndicator = document.createElement("progress");
                                progressIndicator.value = 0;
                                progressIndicator.max = 100;
                                fileDiv.appendChild(progressIndicator);
        
                                const removeButton = document.createElement("button");
                                removeButton.innerHTML =
                                    '<i class="material-icons">close</i>';
                                removeButton.classList.add("remove-file-button");
                                fileDiv.appendChild(removeButton);
        
                                const tokenInput = document.createElement("input");
                                tokenInput.type = "hidden";
                                tokenInput.id = fileType + "_" + count;
                                tokenInput.name = fileType;
                                tokenInput.classList.add("vordynform__input", "file-token");
                                fileDiv.appendChild(tokenInput);
        
                                container
                                    .querySelector(".uploaded-files")
                                    .appendChild(fileDiv);
                                try {
                                    const xhr = new XMLHttpRequest();
                                    xhr.open("POST", URL_BACKEND + "/file_upload", true);
        
                                    xhr.upload.onprogress = function (event) {
                                        if (event.lengthComputable) {
                                            const percentComplete =
                                                (event.loaded / event.total) * 100;
                                            progressIndicator.value = percentComplete;
                                        }
                                    };
        
                                    xhr.onload = function () {
                                        if (xhr.status === 200) {
                                            const response = JSON.parse(xhr.responseText);
                                            const tokens = response.tokens;
                                            if (tokens && tokens.length > 0) {
                                                const token = tokens[0]; // Asumiendo que la respuesta incluye un token por archivo
                                                tokenInput.value = token;
                                            }
                                            progressIndicator.style.display = "none";
                                        } else {
                                            console.error("Error al subir archivo");
                                            fileDiv.remove(); // Opcional: eliminar el elemento si la subida falla
                                        }
                                    };
        
                                    xhr.send(formData);
                                } catch (error) {
                                    mostrarSnackbar("Error al subir archivo: " + error.message);
                                    return WidgetDefinitions; // Devolver las definiciones base en caso de error
                                }
        
                                removeButton.addEventListener("click", function () {
                                    fileDiv.remove();
                                    // Aquí puedes agregar lógica adicional para manejar la eliminación del archivo en el servidor si es necesario
                                });
                            });
                        });
                },
            },
            pasarela_identidad: {
                htmlCode: `
                          <div id="pasarela_identidad">
                  <div id="etapa1" class="etapa" style="display: grid">
                  <div class="title">Valida tu identidad</div>
                  <p>Completa el proceso de validación tomando una selfie con tu identificación.</p>
                  <div class="recommendations">
                      <p>✔️ Mantén tu rostro en primer plano y visible.</p>
                      <p>✔️ Evita usar lentes o cubrebocas.</p>
                      <p>✔️ Asegúrate de que tu identificación no cubra tu rostro.</p>
                      <p>✔️ Realiza la foto en un lugar bien iluminado.</p>
                  </div>
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="iniciarPasarela()">Iniciar</button>
                  </div>
                  <div id="etapa2" class="etapa" style="display: none">
                    <div id="face_component"></div>
                  </div>
                  <div id="etapa3" class="etapa" style="display: none">
                    <div id="id_component"></div>
                  </div>
                  <div id="etapa4" class="etapa" style="display: none">
                    <p>Proceso completado con éxito.</p>
                    <button onclick="finalizarPasarela()">Finalizar</button>
                  </div>
                  <div id="checklist" style="display: none">
                    {{valida_faceSubwidget}}
                    {{valida_idSubwidget}}
                  </div>
        
                </div>
                  `,
                fieldType: "special",
            },        
            selfie: {
                htmlCode: `
                                        <div style="text-align: center;">
                                            <label for="video_{{ field_name }}">{{ label }}</label>
                                            <button type="button" onclick="initCamera('{{ field_name }}')" style="display: block; margin: auto;">Iniciar Cámara</button>
                                            <div id="cameraUI_{{ field_name }}" style="display:none; position: relative; margin: auto;">
                                                <video id="video_{{ field_name }}" width="320" height="240" autoplay style="background-color: black;"></video>
                                                <button id="snap_{{ field_name }}" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); border: none; border-radius: 50%; padding: 15px; background-color: red; color: white;"></button>
                                            </div>
                                            <div id="photo_{{ field_name }}" style="display:none; position: relative; margin: auto;">
                                                <img id="photo_img_{{ field_name }}" src="" style="width: 320px; height: 240px;">
                                            </div>
                                            <div id="retakeContainer_{{ field_name }}" style="display:none;">
                                                <button type="button" onclick="retakePhoto('{{ field_name }}')">Tomar Nueva Foto</button>
                                            </div>
                                        </div>
                                    `,
                fieldType: "single",
            },
            liveProof: {
                htmlCode: `
                                        <div style="text-align: center;">
                                            <label>{{ label }}</label>
                                            <video id="video_{{ field_name }}" width="320" height="240" autoplay style="background-color: black;"></video>
                                            <button id="start_{{ field_name }}" onclick="startStreaming('{{ field_name }}')">Iniciar Prueba de Vida</button>
                                        </div>
                                    `,
                fieldType: "single",
            },
            pantalla_rechazo: {
                htmlCode: `
                <div class="widget-pantalla-rechazo">
                  <h2>{{ titulo }}</h2>
                  <p>{{ mensaje }}</p>
                </div>
              `,
                fieldType: "single",
            },
            fin: {
                htmlCode: `
                          <div class="mdl-cell" style="width: max-content;>
                              <div class="mdl-card mdl-shadow--2dp">
                                  <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
                                      <h2 class="mdl-card__title-text">{{ label }}</h2>
                                  </div>
                                  <div class="mdl-card__supporting-text">
                                      <p>El proceso ha finalizado correctamente.</p>
                                      <p>Serás contactado en las próximas horas con más información.</p>
                                      <p>¡Gracias por tu paciencia!</p>
                                      <p>Vuelve pronto</p>
                                  </div>
                              </div>
                          </div>
              `,
                fieldType: "single",
            }
        },

        widgetclass: class Widget {
            constructor(type, properties, data) {
                this.type = type;
                this.properties = properties;
                this.data = data;
                this.definition = WidgetDefinitions[type];
            }
        
            render() {
                const widgetDefinition = WidgetDefinitions[this.type];
                if (!widgetDefinition) {
                    console.error(
                        `No se encontró la definición para el tipo de widget: ${this.type}`
                    );
                    return "";
                }
                let htmlWidget = widgetDefinition.htmlCode;
                let widget = this;
                if (this.type === "many2one") {
                    let optionsHtml = Object.entries(this.properties.fValues)
                        .map(([value, label]) => {
                            const isSelected =
                                this.data && this.data.id === value ? "selected" : "";
                            return `<option value="${value}" ${isSelected}>${label}</option>`;
                        })
                        .join("");
        
                    // Realizar el reemplazo de {{ options }} antes de cualquier otro reemplazo
                    htmlWidget = htmlWidget.replace("{{ options }}", optionsHtml);
                }
                let additionalClasses =
                    this.properties.input_level === "required" ? "vor-required" : "";
                if (this.type === "checkbox" && this.data) {
                    additionalClasses += " checked"; // Asume que 'data' contiene un valor verdadero para marcar como checked
                }
        
                // Preparar datos para reemplazo en la plantilla
                const props = {
                    field_name: this.properties.field_name,
                    label: this.properties.label || "",
                    required:
                        this.properties.input_level === "required" ? "required" : "",
                    value: this.data || this.properties.default_value || "",
                    errorMsg: this.properties.errorMsg || "",
                    minVal: this.properties.minVal || "",
                    maxVal: this.properties.maxVal || "",
                    placeholder: this.properties.placeholder || "",
                    additionalClasses: additionalClasses,
                    instrucciones: this.properties.instrucciones || "",
                    validationUrl: this.properties.validationUrl || "",
                    // No incluir options aquí ya que ya se manejó arriba
                };
                fieldProperties[this.properties.field_name] = {
                    // Agrega aquí todas las propiedades relevantes para la validación
                    input_level: this.properties.input_level,
                    minVal: this.properties.minVal,
                    maxVal: this.properties.maxVal,
                    pattern: this.properties.pattern,
                    validationUrl: this.properties.validationUrl,
                    // Cualquier otra propiedad que necesites
                };
                for (const prop in props) {
                    const regex = new RegExp(`{{ \\s*${prop}\\s* }}`, "g");
                    htmlWidget = htmlWidget.replace(regex, props[prop]);
                }
                // Generar cadena de atributos adicionales
                // let additionalAttributes = "";
                // for (const key in widget) {
                //   if (!props.hasOwnProperty(key) && key === "required") {
                //     additionalAttributes += `vor-required" `;
                //   }
                // }
                // Reemplazar variables en el html_code
                // htmlCode = htmlCode.replace(
                //   "{{ attributes }}",
                //   additionalAttributes.trim()
                // );
                if (
                    this.properties.funcionActualizar &&
                    funcionesCatalogo[this.properties.funcionActualizar]
                ) {
                    // Define la nueva acción a agregar
                    const nuevaAccion = `funcionesCatalogo['${this.properties.funcionActualizar}'](this);`;
        
                    // Verifica si ya existe un atributo oninput
                    const regex = /oninput="([^"]*)"/;
                    const match = htmlWidget.match(regex);
        
                    if (match) {
                        // Si ya existe, concatena la nueva acción con la existente
                        const accionesCombinadas = `${match[1]}; ${nuevaAccion}`;
                        htmlWidget = htmlWidget.replace(
                            regex,
                            `oninput="${accionesCombinadas}"`
                        );
                    } else {
                        // Si no existe, agrega el atributo oninput con la nueva acción
                        htmlWidget = htmlWidget.replace(
                            "<input ",
                            `<input oninput="${nuevaAccion}" `
                        );
                    }
                }
        
                return htmlWidget;
            }
        
            init(container, model_data, properties, divNavigation) {
                const widgetDefinition = WidgetDefinitions[this.type];
                if (this.definition && typeof this.definition.init === "function") {
                    this.definition.init(container, model_data, properties, divNavigation);
                }
                const userInput = container.querySelector(`.vordynform__input`);
                if (this.properties.input_level === "readonly") {
                    userInput.setAttribute("readonly", "readonly");
                    userInput.setAttribute("disabled", "True");
                    userInput.parentNode.classList.add("readonly");
                    userInput.parentNode.classList.add("is-disabled");
                } else if (this.properties.input_level === "hidden") {
                    userInput.classList.add("is-dyn-hidden");
                    userInput.parentNode.style.display = "none";
                }
                if (userInput) {
                    userInput.addEventListener("blur", function (event) {
                        const inputs = document.querySelectorAll(`.vordynform__input`);
                        validateField(event.target, inputs);
                    });
                }
            }
        },


        testingLoadWidgetDefinitions: async function() {
            var isFileExist;
            var customWidgets;
            try {
                ({customWidgets} = await import ('https://18dcjuarez.github.io/practica_libreria/custom_widget.js'));
                isFileExist = true;
            } catch (error) {
               isFileExist =  false; 
            }
        
            console.log('En FUNCION1', isFileExist, customWidgets);
            const newWidgetDefinitions1 = Object.assign({}, WidgetDefinitions);
            const newWidgetDefinitions2 = Object.assign(newWidgetDefinitions1, customWidgets);
        
            console.log('????', customWidgets);
            console.log(newWidgetDefinitions1);
            console.log('¿¿¿¿¿¿', newWidgetDefinitions2);
            return newWidgetDefinitions2;
        },

        parseWidgetDefinition: function(widgetDef) {
            const { type, ...restProps } = widgetDef;
            const baseWidget = Object.assign({}, WidgetDefinitions[type]);
        
            return Object.assign(baseWidget, restProps);
        }
    }
    global.vortemWidgetLibrary = vortemWidgetLibrary;
})(this);
