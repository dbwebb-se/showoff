const helpers = {
    createInput: function createInput(type, value="", classList=[], id="") {
        let element = document.createElement("input");

        element.setAttribute("type", type);

        if (value) {
            element.setAttribute("value", value);
        }

        if (classList.length) {
            element.classList.add(...classList);
        }

        if (id) {
            element.setAttribute("id", id);
        }

        return element;
    },
    createLabel: function createLabel(text, labelFor, classList=[]) {
        let element = document.createElement("label");
        element.textContent = text;
        element.setAttribute("for", labelFor);

        if (classList.length) {
            element.classList.add(...classList);
        }
        return element;
    }
};

export default helpers;