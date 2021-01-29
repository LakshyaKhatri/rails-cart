const BASE_URL = 'http://127.0.0.1:3000/api/v1/';

// Loads items for the very first time
loadItems($('#item-category-select').val());

// set respective listeners' callbacks
$('#item-category-select').change(function() {
  loadItems(this.value);
});

// Fetches items for given category and loads them using populate_table
function loadItems(category){
  const url = `${BASE_URL}items?category=${category}`;
  $.get(url, function(data){
    populateTable(data);
  });
}

// takes the input items data and creates table rows for them
function populateTable(items){
  const importTag = '<p class="import-tag">Imported</p>';
  const addBtn = '<button type="button" class="add-to-cart-btn">Add</button>';

  const itemsTableBody = document.getElementsByClassName('items-table')[0].children[1];
  itemsTableBody.innerHTML = '';

  items.forEach((item, index) => {
    const currentRow = itemsTableBody.insertRow(-1);

    currentRow.insertCell(-1).innerHTML = item.name;
    currentRow.insertCell(-1).innerHTML = item.taxed_price;
    currentRow.insertCell(-1).innerHTML = item.is_imported ? importTag : '';
    currentRow.insertCell(-1).innerHTML = addBtn;

    const hiddenCell = currentRow.insertCell(-1);
    hiddenCell.innerHTML = item.id;
    hiddenCell.style.display = 'none';
  });

  // Add click listeners on Add to Cart Buttons
  configAddToCartBtns();
}

function configAddToCartBtns(){
  $('.add-to-cart-btn').click(function() {
    const button = $(this);
    const itemID = button.parent().next().text();

    addItemToCart(itemID, 1, button);
  });
}

function addItemToCart(itemID, qty, elem){
  const url = `${BASE_URL}cart/add-item/`
  $.post(url,
    {
      item_id: itemID,
      qty: qty
    },
    function(data){
      elem.html('Remove');
  });
}