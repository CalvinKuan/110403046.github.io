
function readExchangeRates(callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlDoc = xmlhttp.responseXML;
            var rates = xmlDoc.getElementsByTagName("rate");
            var exchangeRates = {};
            for (var i = 0; i < rates.length; i++) {
                var currency = rates[i].getAttribute("currency");
                var rate = parseFloat(rates[i].textContent);
                exchangeRates[currency] = rate;
            }
            callback(exchangeRates);
        }
    };
    xmlhttp.open("GET", "rate.xml", true);
    xmlhttp.send();
}


function convert() {
    var amountInput = document.getElementById("amount");
    var amount = parseFloat(amountInput.value);
    if (isNaN(amount)) {
        alert("請輸入有效數值！");
        reset();
        return;
    }

    readExchangeRates(function(exchangeRates) {
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";
        var currencies = ["美金", "歐元", "日圓", "韓元", "澳幣"];
        for (var i = 0; i < currencies.length; i++) {
            var currency = currencies[i];
            var rate = exchangeRates[currency];
            var convertedAmount = (amount / rate).toFixed(2);
            var resultText = "換算成" + currency + "：" + convertedAmount + " " + currency;
            var resultP = document.createElement("p");
            resultP.innerHTML = resultText;
            resultDiv.appendChild(resultP);
        }
    });
}


function reset() {
    var amountInput = document.getElementById("amount");
    var resultDiv = document.getElementById("result");
    amountInput.value = "";
    resultDiv.innerHTML = "";
}
