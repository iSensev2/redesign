const numberCards = document.getElementsByClassName('button');
const resultBox = document.getElementById('display');

let result = "";

for(let i = 0; i < numberCards.length; i++){
    numberCards[i].addEventListener("click", function(){
        let value = this.getAttribute('data-value');

        if (value === 'C') {
            
            result = "";
            resultBox.value = result;
        } else if (value === 'Enter') {

            try {
                result = eval(result);
                resultBox.value = result;
                result = ""; 
            } catch (error) {
                resultBox.value = "Error";
                result = ""; 
            }
        } else if (value === 'Del') {
            
            result = result.slice(0, -1);
            resultBox.value = result;
        } else {
            
            result += value;
            resultBox.value = result;
        }
    });
}
