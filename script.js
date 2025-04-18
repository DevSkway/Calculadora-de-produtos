//  TODO: preço dos produtos ficarem vermelhos se o saldo não for compatível
//  TODO: sistema de pesquisa ao clicar qualquer tecla alfabética

const OnClickColor = "rgb(200, 200, 200)";
const input = document.getElementById("balance");

const TotalLabel = document.getElementById("total");
const RestLabel = document.getElementById("rest");

let Products = {};
let Money = 0, Total = 0;

function CreateProduct(ProductName, Price) {
    let Product = {};

    const Button = document.createElement("button");
    const Bold = document.createElement("b");
    const PriceText = document.createTextNode(` - R$ ${Price.toFixed(2)}`);

    Product["Button"] = Button;
    Product["Price"] = Price;
    
    Button.className = "itemSlot";

    Bold.textContent = ProductName;
    Bold.className = "productName";

    const itemCanvas = document.getElementsByClassName("itemCanvas")[0];

    Button.appendChild(Bold);
    Button.appendChild(PriceText);

    itemCanvas.appendChild(Button);

    Products[ProductName] = Product;

    const DefaultColor = Button.style.backgroundColor;
    let Active = false;

    Button.addEventListener("click", function() {
        Active = !Active
        Button.style.backgroundColor = Active ? OnClickColor : DefaultColor;

        if (Active) {
            Total += Price;
        } else {
            Total -= Price
        }

        UpdateLabel();
    })
}

function UpdateLabel() {
    const Rest = Money - Total

    TotalLabel.textContent = Total.toFixed(2);
    RestLabel.textContent = "R$ " + Rest.toFixed(2);;


    if (Total == 0 && Money != 0) {
        RestLabel.textContent = "Insira um produto"
        RestLabel.style.color = "rgb(141, 141, 141)"
    } else if (Rest < 0) {
        RestLabel.style.color = "rgb(255, 87, 87)"
    } else if (Rest > 0) {
        RestLabel.style.color = "rgb(32, 131, 62)"
    } else {
        RestLabel.style.color = null;
    }
}

// Default-products {

CreateProduct("Pulseira", 2);
CreateProduct("Massagem", 5)
CreateProduct("Realidade Virtual", 7)
CreateProduct("Slime", 4)
CreateProduct("Chaveiro", 2)

// }

input.addEventListener("focus", function() {
    input.value = ''
})

input.addEventListener("input", function() {
    const FloatCurrent = parseFloat(input.value);

    Money = !isNaN(FloatCurrent) && FloatCurrent || 0;

    UpdateLabel();
})

input.addEventListener("blur", function() {
    const FloatCurrent = parseFloat(input.value);

    if (!isNaN(FloatCurrent)) {
        input.value = FloatCurrent.toFixed(2);
    }
})

document.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        input.value = '';
    } else if (event.key == "Enter" && document.activeElement == input) {
        input.blur();
    } else if (document.activeElement != input) {
        input.value = '';
        input.focus();
    }
})