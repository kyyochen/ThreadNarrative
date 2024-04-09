const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const customSuggestions = document.getElementById('custom-suggestions');

const brands = [
  { name: 'Yohji Yamamoto', url: 'yy.html' },
  { name: 'Enfants Riches Deprimes', url: 'ERD.html' },
  { name: 'Maison Margiela', url: 'mm.html' },
  { name: 'Rick Owens', url: 'ro.html' },
  { name: 'Balenciaga', url: 'bb.html' }
];

function populateSuggestions() {
  customSuggestions.innerHTML = ''; // Clear previous suggestions
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm.length > 0) {
    const matchedBrands = brands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm)
    );

    if (matchedBrands.length > 0) {
      customSuggestions.style.display = 'block';
    } else {
      customSuggestions.style.display = 'none';
    }

    matchedBrands.forEach(brand => {
      const div = document.createElement('div');
      div.textContent = brand.name;
      div.className = 'custom-suggestion-item';
      div.addEventListener('click', () => {
        searchInput.value = brand.name; // Fill input with selection
        customSuggestions.style.display = 'none'; // Hide suggestions
        searchBrand(); // Optionally trigger search
      });
      customSuggestions.appendChild(div);
    });
  } else {
    customSuggestions.style.display = 'none';
  }
}

function searchBrand() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const matchedBrand = brands.find(brand => brand.name.toLowerCase() === searchTerm);
  if (matchedBrand) {
    window.location.href = matchedBrand.url;
  } else {
    alert('Brand not found. Please try again.');
  }
}

searchInput.addEventListener('input', populateSuggestions);
searchButton.addEventListener('click', searchBrand);
