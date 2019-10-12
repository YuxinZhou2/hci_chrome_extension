function displayUserInput(e) {
    let userInput = select('#userInput');
        document.getElementById('userInput') ='';
        localStorage['websites'] = userInput;
        return userInput;
    
}