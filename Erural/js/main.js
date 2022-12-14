const init = () => {
    const validateEmail = (event) => {
        const input = event.currentTarget;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTest = regex.test(input.value);

        if(!emailTest){
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        }else{
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }

    }

    const validatePassword = (event) =>{
        const input = event.currentTarget;

        if(input.value.length < 8){
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        }else{
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }

    }

    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.login__submit');

    inputEmail.addEventListener('input', validateEmail);
    inputPassword.addEventListener('input', validatePassword);

    const errorHandler = () =>{
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = "Error :(";

    }

    const sucessHandler = () =>{
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "Sent! :)";
        window.location = "./transmissao.html"

    }


    if(submitButton){
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            submitButton.textContent = "...loading"

            fetch('https://reqres.in/api/register', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })

            }).then((response) => {
                if (response.status !== 200) {
                    return errorHandler();
                }
                sucessHandler();
            }).catch(() => {
                errorHandler();
            })
            
        });
    }
}



window.onload = init;


function appendTheFile (url) {     
    url = new URL(url)
        if (url.pathname.match(/\.(jpe?g|png|svg|webp|gif)/)) { 
        let img = document.createElement('img')       
        img.src = url.toString()       
        document.getElementById('container').appendChild(img)     
    } else {
    let iframe = document.createElement('iframe') 
    iframe.src = url.toString()      
    document.getElementById('container').appendChild(iframe) 
    }     

}
document.getElementById('add-file-btn').addEventListener('click', event => {
        let answer = window.prompt('Qual o endere??o?')
        if (answer.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/im)) {     
        appendTheFile(url)   } 
}) 