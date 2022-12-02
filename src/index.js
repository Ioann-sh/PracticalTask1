window.onload = function (){
    let flag = false
    async function sendRequest(params={}){
        const query = Object.keys(params)
            .map(key => `${key}=${params[key]}`).join('&');
        const response = await fetch(`api/?${query}`);
        return await response.json();
    }

    async function sendAuthentication(){
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const method = 'authentication';
        const answer = await sendRequest({method, email, password})
        console.log(answer.data.name);
        if (answer.data.name){
            flag = true;
            document.getElementById('authentication').innerHTML = `Hello, ${answer.data.name}`;
        }
    }

    async function sendForm(){
        if (flag){
            const input = document.getElementById('form_input').value;
            const textarea = document.getElementById('form_textarea').value;
            const method = 'form';
            const answer = await sendRequest({method, input, textarea})
            console.log(answer);
            console.log('form sent');
            document.getElementById('form_input').value = '';
            document.getElementById('form_textarea').value = '';
        } else {
            alert('You must authenticate first')
        }
    }

    function reset(){
        document.getElementById('form_input').value = '';
        document.getElementById('form_textarea').value = '';
    }

    document.getElementById('authentication_button').addEventListener('click', sendAuthentication);
    document.getElementById('form').addEventListener('click', sendForm)
    document.getElementById('reset').addEventListener('click', reset)
}