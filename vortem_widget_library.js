(function(global) {
    const vortemWidgetLibrary = {
        widgetDefinitions:  {
            title: {
                htmlCode: `<h4>{{ label }}</h4>`,
                fieldType: "single",
            },
            subtitle: {
                htmlCode: `<h5>{{ label }}</h5>`,
                fieldType: "single",
            },
            label:  {
                htmlCode: `<span>{{ label }}</span>`,
                fieldType: "single",
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
            console.log('REMOTE LIBRARY CHECK');
            // const newWidgetDefinitions1 = Object.assign({}, widgetDefinitions);
            // const newWidgetDefinitions2 = Object.assign(newWidgetDefinitions1, customWidgets);
            const newWidgetDefinitions2 = Object.assign(this.widgetDefinitions, customWidgets);
        
            console.log('????', customWidgets);
            //console.log(newWidgetDefinitions1);
            console.log('¿¿¿¿¿¿', newWidgetDefinitions2);
            return newWidgetDefinitions2;
        }
    }
    global.vortemWidgetLibrary = vortemWidgetLibrary;
})(this);
