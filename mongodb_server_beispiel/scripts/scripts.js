const btnApple = document.getElementById("btnApple");
const btnBanana = document.getElementById("btnBanana");
const amount = document.getElementById("amount");

async function sendJSONStringWithPOST(url, jsonString) {
    const response = await fetch(url, {
        method: "post",
        body: jsonString
    });
    content = await response.text();
    console.log(content);
}


async function getFromServer(url) {
    const response = await fetch(url);
    const content = await response.json();
    console.log(content);
}


btnBanana.addEventListener("click", () => {
    sendJSONStringWithPOST(
        "http://localhost:3000/banana",
        JSON.stringify({ amount: amount.value })
    );
});

btnApple.addEventListener("click", () => {
    sendJSONStringWithPOST(
        "http://localhost:3000/apple",
        JSON.stringify({ amount: amount.value })
    );
});

console.log("Bananas:");
getFromServer("http://localhost:3000/banana");
console.log("Apples:");
getFromServer("http://localhost:3000/apple");