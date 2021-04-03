class Appform {
    constructor() {
    this.form = [];
    this.step = 0;
    this.currentGroup = null;       
     
    this.setListeners();
    this.getForm();
    document.getElementById("next-button").disabled = true;
    this.refresh();
    this.check();
    }

    submit = () => console.log("SUBMIT");

    currentInput = () => this.form[this.step - 1].input;
    previousInput = () => this.form[this.step - 2].input;

    check = () => this.currentInput().addEventListener("keyup", () => this.enableDisable());

    enableDisable = () => {
        if (this.valid(this.currentInput())) {
            this.currentInput().classList.remove(".invalid");
            this.setListeners();
            document.getElementById("next-button").disabled = false;
        } else {
            this.currentInput.classList.add(".invalid");
            this.removeListeners();
            document.getElementById("next-button").disabled = true; 
        }
    }

    valid = (input) => true; /*{
        const formType = input.id;
        const value = input.value;
        const empty = (str) => !str.split("").every(_char => _char !== "");
    
        if (!value || empty(value)) return false;

        switch(formType) {
            case "email-input":
                return /\S+@\S+\,\S+/.test(value);

            case "email-verification-input":
                return this.previousInput().value === value;

            case "password-input":
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@$&!]{8,}/.test(value);

            case "password-verification-input":
                return this.previousInput().value === value;

            default:
                return false;
        }
    };*/ 

    refresh = () => {
        this.step++;
        if(this.step <= this.form.length)
            this.displayStep();    
        else 
            this.submit();
    }

    getForm = () => {
        const groups = Array.from(document.getElementsByClassName('form-group'));
        groups.forEach(_group => {
            const children =Array.from(_group.children);
            this.form.push({
                "step": Number.parseInt(_group.dataset.step),
                "element": _group,
                "input": children.find(_el => _el.nodeName === "INPUT")
                
            });
        });
        console.log(this.form);
    }

    displayStep = () => {
        if(this.currentGroup)
            this.currentGroup.style.display = "none";
        this.currentGroup = this.form.find(_group => _group.step === this.step).element;
        this.currentGroup.style.display = "block";
    }

    setListeners = () => {
        document.getElementById("next-button").addEventListener("click", this.refresh);
    }
    removeListeners = () => {
        document.getElementById("next-button").removeEventListener("click", this.refresh);
    }
}

new Appform();