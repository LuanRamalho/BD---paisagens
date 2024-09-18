const form = document.getElementById('landscapeForm');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const city = document.getElementById('city').value;
            const country = document.getElementById('country').value;
            const imagem = document.getElementById('imagem').value;

            // Recupera os dados existentes ou cria um array vazio
            let landscapes = JSON.parse(localStorage.getItem('landscapes')) || [];
            
            // Adiciona o novo dado
            landscapes.push({ city, country, imagem });

            // Armazena de volta no localStorage
            localStorage.setItem('landscapes', JSON.stringify(landscapes));

            // Limpa o formulário
            form.reset();

            // Redireciona para a página de listagem
            window.location.href = 'listagem.html';
        });