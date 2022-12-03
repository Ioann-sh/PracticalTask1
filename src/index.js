window.onload = function (){
    let flag = false
    let id = ''
    async function sendRequest(params={}){
        const query = Object.keys(params)
            .map(key => `${key}=${params[key]}`).join('&');
        const response = await fetch(`api/?${query}`);
        return await response.json();
    }
    //аутендефикация
    async function sendAuthentication(){
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const method = 'authentication';
        const answer = await sendRequest({method, email, password})
        console.log(answer);
        if (answer.data.id && answer.data.name){
            id = answer.data.id;
            flag = true;
            document.getElementById('authentication').innerHTML = `Hello, ${answer.data.name}`;
        }
    }
    //очищение формы
    function reset(){
        document.getElementById('form_input').value = '';
        document.getElementById('form_textarea').value = '';
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

        if (flag){
            const method = 'form';
            const input = getInput() || '';
            const textarea = getTextarea() || '';
            const radioButton = getRadioButton() || '';
            const select = getSelect() || '';
            console.log({method, input, textarea, radioButton, select})

            const answer = await sendRequest({method, id, input, textarea, radioButton, select})
            console.log(answer);
            document.getElementById('form_input').value = '';
            document.getElementById('form_textarea').value = '';
            //document.getElementsByName('radioButton') = ;
        } else {
            alert('You must authenticate first')
        }
    }

    document.getElementById('authentication_button').addEventListener('click', sendAuthentication);
    document.getElementById('form').addEventListener('click', sendForm)
    document.getElementById('reset').addEventListener('click', reset)
}