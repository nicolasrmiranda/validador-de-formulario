class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.isValid();
        const senhasValidas = this.senhasValidas();

        if(isValid && senhasValidas) {
            alert('Formulario enviado');
            this.formulario.submit();
        }
    }

    isValid() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        
        for(let campo of this.formulario.querySelectorAll('.valid')) {
            const label = campo.previousElementSibling.innerText;
            if(!campo.value) {
                this.createError(campo, `Campo "${label}" não pode estar vazio.`);
                valid = false;
            }
            
            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false;
            }
        }

        return valid;
    }

    senhasValidas() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value) {
            this.createError(senha, 'Campos senha e repetir senha precisam ser iguals.');
            this.createError(repetirSenha, 'Campos senha e repetir senha precisam ser iguals.');
            valid = false;
        }

        if(senha.value.length < 6 || senha.value.length > 12) {
            this.createError(senha, 'Senha precisa conter entre 6 e 12 caracteres.');
        }

        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'O usuário deve conter entre 3 e 12 caracteres.');
            valid = false;
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Usuário só poderá conter letras e/ou números')
            valid = false;
        }

        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.createError(campo, 'CPF inválido.');
            return false;
        }

        return true;
    }

    createError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);

    }
}

const valida = new ValidaFormulario();