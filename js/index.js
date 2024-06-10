


var productName = document .getElementById("productName")
var productPrice = document .getElementById("productPrice")
var productCategory = document .getElementById("productCategory")
var productDesc = document .getElementById("productDesc")
var productImage = document.getElementById("productImage")


var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var currentIndex;


var productList = []
if (localStorage.getItem("productList") != null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList)
}


// function addProduct()
// {


//     var product = {
//         Name: productName.value,
//         Price:productPrice.value  ,
//         Category:productCategory.value ,
//         Desc:productDesc.value ,
//         Image:`images/${productImage.files[0]?.name}`,
//     }
//     productList.push(product);
//      updateLocalStorage();

//     validateForm()
//    removeValidation();
// console.log(product);
// if (validateForm() == true) {
//     displayProduct(productList);

// }

// }


function addProduct() {
    // Validate all inputs
    var isValidName = validateInput(productName);
    var isValidPrice = validateInput(productPrice);
    var isValidCategory = validateInput(productCategory);
    var isValidDesc = validateInput(productDesc);

    // Check if all inputs are valid
    if (isValidName && isValidPrice && isValidCategory && isValidDesc) {
        var product = {
            Name: productName.value,
            Price: productPrice.value,
            Category: productCategory.value,
            Desc: productDesc.value,
            Image: `images/${productImage.files[0]?.name}`,
        };

        productList.push(product);
        updateLocalStorage();
        displayProduct(productList); // Display the product

        // Clear form fields and remove validation
        updateInputValue();
        removeValidation();
    } else {
        return false
        // // If any input is invalid, display error message to the user
        // var errorMessage = "Please fill in all fields with valid inputs.";
        // document.getElementById('error-message').textContent = errorMessage;
    }
}



function displayProduct(list) {
    var storage = ``;
     
    for (var i = 0; i < list.length; i++){
        storage += `
        <div class="col-md-4">
    <div class="item text-white border border-white rounded-3 overflow-hidden">

        <img src="${list[i].Image}"   class="w-100 mb-3  "       alt="">
        <div class="p-3">


            <h2 class="h4">Title: ${list[i].Name}</h2>
        <h3 class="h5">dec: ${list[i].Category}</h3>
        <h3 class="h5">Price: ${list[i].Price}</h3>
        <h3 class="h5 mb-3">Category: ${list[i].Desc}</h3>
          <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 mb-2"> Delete </button>
          <button   onclick="getDataToUpdate(${i})" class="btn btn-outline-warning w-100"> update</button>
        </div>
    

    </div>
</div>
`
    }
    
    document.getElementById('myData').innerHTML = storage
}



function updateInputValue(config) {
    productName.value = config ? config.Name : null;
    productCategory.value = config ? config.Category : null;
    productDesc.value = config ? config.Desc : null;
    productPrice.value = config ? config.Price: null;
    // productImage.value = config ? config.Image: null;

}

function deleteProduct(index) {
    


    productList.splice(index, 1)
    updateLocalStorage();
    displayProduct(productList)
    


}

function getDataToUpdate(index) {
    currentIndex = index;
    updateInputValue(productList[currentIndex]);

    updateBtn.classList.remove('d-none');
    addBtn.classList.add("d-none");

}


function updateProduct() {
    productList[currentIndex].Name = productName.value;
    productList[currentIndex].Price = productPrice.value;
    productList[currentIndex].Category = productCategory.value;
    productList[currentIndex].Desc = productDesc.value;
    displayProduct(productList);


    updateLocalStorage();

    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    updateInputValue();
    removeValidation()
}


function updateLocalStorage() {
    localStorage.setItem("productList", JSON.stringify(productList));
}




function search(searchValue) {
    var searchItem = [];
    for (var i = 0; i < productList.length; i++) {
        var item = productList[i];
        if (item.Name.toLowerCase().includes(searchValue.toLowerCase())) {
            searchItem.push(item);
        }
    }
    displayProduct(searchItem);
}


function validateInput(element) {
    var regex = {
        productName: /^[A-Za-z]{3,30}$/,
        productPrice: /^[1-9][0-9]{0,7}$/,
        productDesc: /^.{10,300}$/,
        productCategory: /^(Tv|Mobile|Laptop|Screens|Other)$/
    };
    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        element.nextElementSibling.classList.remove("d-block");
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");
        element.nextElementSibling.classList.add("d-block");
        return false;
    }
}







function removeValidation() {
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productDesc.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
}


function validateForm() {
    var isValidName = validateInput(productName);
    var isValidPrice = validateInput(productPrice);
    var isValidCategory = validateInput(productCategory);
    var isValidDesc = validateInput(productDesc);

    // Enable add button only if all inputs are valid
    if (!(isValidName && isValidPrice && isValidCategory && isValidDesc)) {
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
   
}
