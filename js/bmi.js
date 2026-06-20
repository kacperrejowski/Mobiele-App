function calculateBMI() {
    let weight = parseFloat(document.getElementById('Weight').value);
    let height = parseFloat(document.getElementById('Height').value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById('heading').innerHTML = 'ENTER "CREDIT CARD" NUMBERS NOW';
        document.getElementById('bmi-output').innerHTML = '--';
        document.getElementById('message').innerHTML = '';
        document.getElementById('message').className = '';
        return;
    }

    let heightInMeters = height / 100;
    let bmi = weight / (heightInMeters * heightInMeters);

    document.getElementById('heading').innerHTML = 'Your BMI is:';
    document.getElementById('bmi-output').innerHTML = bmi.toFixed(1);

    let messageElement = document.getElementById('message');
    if (bmi < 18.5) {
        messageElement.innerHTML = 'Eat more';
        messageElement.className = "status underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        messageElement.innerHTML = 'Good';
        messageElement.className = "status normal";
    } else if (bmi >= 25 && bmi <= 50) {
        messageElement.innerHTML = 'FAT';
        messageElement.className = "status obese";
    } else if (bmi >= 50 && bmi <= 100) {
        messageElement.innerHTML = 'DAMN';
        messageElement.className = "status DAMN";
    } else if (bmi >= 100 && bmi <= 150) {
        messageElement.innerHTML = 'You are a BMW 1 SERIES DIESEL and fat';
        messageElement.className = "status BMW_1_SERIES_DIESEL";
    } else {
        messageElement.innerHTML = 'You are a BMW XM';
        messageElement.className = "status BMW_XM";
    }
}

function clearFields() {
    document.getElementById('Weight').value = '';
    document.getElementById('Height').value = '';
    document.getElementById('heading').innerHTML = 'Please enter "credit card" information';
    document.getElementById('bmi-output').innerHTML = '--';
    document.getElementById('message').innerHTML = '';
    document.getElementById('message').className = '';
}
