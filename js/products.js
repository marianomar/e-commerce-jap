var currentProductsArray = [];
var currentSortCriteria = undefined;
var orderByAscPrice = "Asc";
var orderByDescPrice = "Desc";
var orderByRelevance = "Rel";
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === orderByAscPrice) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === orderByDescPrice) {
    result = array.sort(function (a, b) {
      if (a.cost> b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === orderByRelevance) {
    result = array.sort(function (a, b) {
      if (a.soldCount > b.soldCount) {
        return -1;
      }
      if (a.soldCount < b.soldCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function showProductList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    if (((minPrice == undefined) || (minPrice != undefined && product.cost >= minPrice )) &&
            ((maxPrice == undefined) || (maxPrice != undefined && product.cost <= maxPrice))){

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.cost + ` USD</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <small class="text-muted">` + product.soldCount+ ` vendidos</small>
                    </div>
                </div>
            </a>
            `
        }

    document.getElementById("contenedor").innerHTML = htmlContentToAppend;
}
}
function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  showProductList();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(orderByAscPrice, resultObj.data);
     
    }
   
  });

document.getElementById("relevanceButton").addEventListener("click", function(){
    sortAndShowProducts(orderByRelevance);
});
document.getElementById("priceAsc").addEventListener("click", function(){
    sortAndShowProducts(orderByAscPrice);
});
document.getElementById("priceDesc").addEventListener("click", function(){
    sortAndShowProducts(orderByDescPrice);
});
document.getElementById("clearFilter").addEventListener("click", function(){
    document.getElementById("filterMin").value = "";
    document.getElementById("filterMax").value = "";

    minPrice  = undefined;
    maxPrice = undefined;

    
});
document.getElementById("filterPrice").addEventListener("click", function(){
    minPrice = document.getElementById("filterMin").value;
     maxPrice = document.getElementById("filterMax").value;
    

    if ((minPrice != undefined) && (minPrice != "") && (minPrice >= 0)){
        minPrice = minPrice;
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (maxPrice >= 0)){
        maxPrice = maxPrice;
    }
    else{
        maxPrice = undefined;
    }

    showProductList();
});
});





