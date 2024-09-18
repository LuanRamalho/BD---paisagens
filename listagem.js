let landscapes = JSON.parse(localStorage.getItem('landscapes')) || [];
        const tableBody = document.querySelector('#landscapeTable tbody');
        const searchInput = document.getElementById('searchInput');

        function renderTable(data) {
            tableBody.innerHTML = '';

            data.forEach((landscape, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${landscape.city}</td>
                    <td>${landscape.country}</td>
                    <td><img src="${landscape.imagem}" alt="${landscape.nome}"></td>
                    <td>
                        <button class="edit-button" onclick="enableEdit(${index}, this)">Editar</button>
                        <button class="delete-button" onclick="deleteLandscape(${index})">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        function enableEdit(index, editButton) {
            const row = editButton.parentNode.parentNode;
            const cells = row.querySelectorAll('td');

            // Tornar células editáveis
            cells[0].contentEditable = "true";
            cells[1].contentEditable = "true";
            cells[2].contentEditable = "true";

            // Alterar botão de "Editar" para "Salvar"
            editButton.textContent = "Salvar";
            editButton.classList.remove("edit-button");
            editButton.classList.add("save-button");

            editButton.onclick = function() {
                saveEdit(index, this);
            };
        }

        function saveEdit(index, saveButton) {
            const row = saveButton.parentNode.parentNode;
            const cells = row.querySelectorAll('td');

            // Atualizar os dados no array landscapes
            landscapes[index].city = cells[0].textContent;
            landscapes[index].country = cells[1].textContent;
            landscapes[index].url = cells[2].textContent;

            // Salvar os dados atualizados no localStorage
            localStorage.setItem('landscapes', JSON.stringify(landscapes));

            // Tornar células não editáveis
            cells[0].contentEditable = "false";
            cells[1].contentEditable = "false";
            cells[2].contentEditable = "false";

            // Alterar botão de "Salvar" para "Editar"
            saveButton.textContent = "Editar";
            saveButton.classList.remove("save-button");
            saveButton.classList.add("edit-button");

            saveButton.onclick = function() {
                enableEdit(index, this);
            };

            alert('Dados atualizados com sucesso!');
        }

        function deleteLandscape(index) {
            landscapes.splice(index, 1);
            localStorage.setItem('landscapes', JSON.stringify(landscapes));
            renderTable(landscapes);
            alert('Registro excluído com sucesso!');
        }

        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredLandscapes = landscapes.filter(landscape =>
                landscape.city.toLowerCase().includes(searchTerm) ||
                landscape.country.toLowerCase().includes(searchTerm)
            );
            renderTable(filteredLandscapes);
        });

        // Renderiza a tabela inicialmente com todos os dados
        renderTable(landscapes);