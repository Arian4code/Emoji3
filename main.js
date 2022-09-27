prediction = ""

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)  {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5  version:', ml5.version);


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NVMGjJ4VJ/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Ok")
        {
            document.getElementById("update_emoji").innerHTML = "👌"
        }
        if(results[0].label == "Good job")
        {
            document.getElementById("update_emoji").innerHTML = "👍"
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "✌️"
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
