const apiUrl = 'http://localhost:3000/api/v1/clothes'; // Ruházati API URL

// Ruhák adatainak a betöltése a táblázat soraiba.
async function loadClothes() {
    try {
        const response = await fetch(apiUrl);
        const clothes = await response.json();

        const table = document.getElementById('clothesTable');
        table.innerHTML = '';
        clothes.forEach(clothing => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${clothing.id}</td>
            <td>${clothing.brand}</td>
            <td>${clothing.material}</td>
            <td>${clothing.size}</td>
            <td>${clothing.color}</td>
            <td>${clothing.price}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-primary" onClick="editClothing(${clothing.id}, '${clothing.brand}', '${clothing.material}', '${clothing.size}', '${clothing.color}', '${clothing.price}')">Módosítás</button>
                    <button class="btn btn-danger" onClick="deleteClothing(${clothing.id})">Törlés</button>
                </div>
            </td>
            `;
            table.appendChild(row);
        });
    }
    catch (error) {
        console.error('Hiba történt az adatok betöltésekor!');
    }
}

// Új ruházati termék felvitele az adatbázisba
document.getElementById('clothesForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Az űrlap viselkedés letiltása

    const brand = document.getElementById('brand').value;
    const material = document.getElementById('material').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const price = document.getElementById('price').value;
    const inputError = document.getElementById('error').value;

    if ((!brand || !material || !size || !color || !price)) {
        console.log('Hiányos adatok!');
        inputError.innerHTML = 'Hiányos adatok';
    }
    // Az adatok elküldés az API-nak.
    else {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brand, material, size, color, price })
            });

            if (response.ok) {
                alert(`Sikeres adatrögzítés: ${brand}, ${material}`);
                loadClothes();
                e.target.reset(); // Az űrlap alaphelyzetbe hozása
            }
            else {
                console.error('Hiba történt a ruházati termék hozzáadása során:', await response.json());
            }
        }
        catch (error) {
            console.error('Nem sikerült az adatokat rögzíteni:', error);
        }
        inputError.innerHTML = '';
    }
});

// Aszinkron függvény a ruházati adatok módosítására
async function editClothing(id, brand, material, size, color, price) {
    const newBrand = prompt('Add meg az új márkát:', brand);
    const newMaterial = prompt('Add meg az új anyagot:', material);
    const newSize = prompt('Add meg az új méretet:', size);
    const newColor = prompt('Add meg az új színt:', color);
    const newPrice = prompt('Add meg az új árat:', price);

    if (newBrand && newMaterial && newSize && newColor && newPrice) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brand: newBrand, material: newMaterial, size: newSize, color: newColor, price: newPrice })
            });
            // Ha minden rendben ment.
            if (response.ok) {
                loadClothes();
            } else {
                console.error('Hiba történt a ruházati adatainak a frissítése során!', await response.json());
            }
        } catch (error) {
            console.error('Nem sikerült a ruházati adatait frissíteni', error);
        }
    }
}

// Aszinkron függvény a ruházati adatok törlésére
async function deleteClothing(id) {
    if (confirm('Valóban törölni akarod a ruházati adatokat?')) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadClothes();
            } else {
                console.error('Hiba történt a ruházati adatok törlése során:', await response.json());
            }
        } catch (error) {
            console.error('Az adatok törlése sikertelen volt:', error);
        }
    }
}

window.onload = function() {
    loadClothes();
}
