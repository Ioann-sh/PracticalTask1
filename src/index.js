window.onload = function (){
    let id = ''
    async function sendRequest(params={}){
        const query = Object.keys(params)
            .map(key => `${key}=${params[key]}`).join('&');
        const response = await fetch(`api/?${query}`);
        return await response.json();
    }
    //аутендефикация
    async function sendAuthentication(){

        function getEmail(){
            return document.getElementById('email').value;
        }

        function getPassword(){
            return document.getElementById('password').value;
        }

        const email = getEmail() || '';  //''
        const password = getPassword() || '';  //''
        const method = 'authentication';

        const answer = await sendRequest({method, email, password})
        console.log(answer);
        if (answer.data.id && answer.data.user){
            id = answer.data.id;
            document.getElementById('authentication').innerHTML = `Hello, ${answer.data.user}`;
        } else if (answer.data === 'User not found'){
            alert('User not found')
        }
    }
    //очистка формы
    function reset(){
        document.getElementById('form_input').value = '';
        document.getElementById('form_textarea').value = '';
        document.getElementById('select').selectedIndex = 0;
        document.querySelector('input[name="radioButton"]:checked').checked = false;
    }
    //отправить форму
    async function sendForm(){

        function getInput(){
            return document.getElementById('form_input').value
        }

        function getTextarea(){
            return document.getElementById('form_textarea').value
        }

        function getRadioButton(){
            let rad = document.getElementsByName('radioButton');
            for (let i=0;i<rad.length; i++) {
                if (rad[i].checked) {
                    return rad[i].value
                }
            }
        }

        function getSelect(){
            let sel = document.getElementById('select').selectedIndex;
            let opt = document.getElementById('select').options;
            return opt[sel].value;
        }

        function getFlag(){
            let flags = document.getElementsByName('flag');
            let checkedFlags = [];
            for (let i=0;i<flags.length; i++) {
                if (flags[i].checked) {
                    checkedFlags.push(flags[i].value);
                }
            }
            return checkedFlags;
        }

        if (id !== ''){
            const method = 'form';
            const input = getInput() || '';
            const textarea = getTextarea() || '';
            const radioButton = getRadioButton() || '';
            const select = getSelect() || '';
            const flag = getFlag() || '123';
            console.log({method, id, input, textarea, radioButton, select, flag })

            const answer = await sendRequest({method, id, input, textarea, radioButton, select, flag})
            console.log(answer);
            reset();
        } else {
            alert('You must authenticate first');
        }
    }

    document.getElementById('authentication_button').addEventListener('click', sendAuthentication);
    document.getElementById('form').addEventListener('click', sendForm);
    document.getElementById('reset').addEventListener('click', reset);
}