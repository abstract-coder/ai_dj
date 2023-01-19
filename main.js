audio = "";
left_x = 0;
left_y = 0;
right_x = 0;
right_y = 0;
leftwrist_score = 0;
rightwrist_score = 0;


function preload() {
    audio = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 370);
    canvas.position(460, 200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose',gotPoses);
}


function modelLoaded(){
    console.log("Model is loaded.");
    
}

function gotPoses(results){

    if (results.length > 0){
        
        left_x = results[0].pose.leftWrist.x;
        left_y = results[0].pose.leftWrist.y;
       
        //console.log("LEFT X & Y : " + left_x + " & " + left_y + ". RIGHT X & Y : " + right_x + " & " + right_y );
        //console.log(results);
        leftwrist_score  = results[0].pose.keypoints[9].score;
        
        //console.log(leftwrist_score);

        right_x = results[0].pose.rightWrist.x;
        right_y = results[0].pose.rightWrist.y;
        

    }
   
}

function draw() {
    image(video, 0, 0, 600, 370);
    fill("red");


    if (leftwrist_score >= 0.2){

        circle(left_x, left_y, 20);
        lefty_num = Number(left_y);
        volume = (lefty_num / 500).toFixed(2);
        document.getElementById("volume").innerHTML = "Volume: "+ volume;
        audio.setVolume(volume);

    }


   
  
}

/*
 variable for soundfile = song

 song.setVolume(vol_value)

    song.setVolume(1) - Full Volume
    song.setVolume(0.9) - High Volume 
    song.setVolume(0.7) - Little High
    song.setVolume(0.5) - Medium 
    song.setVolume(0.3) - Little Low
    song.setVolume(0.1) - Low
    song.setVolume(0) - Silence

 Speed - Rate 
 song.rate(rate_value)

 song.rate(0.5) - Slow
 song.rate(1) - Normal
 song.rate(1.5)  - Little Fast
 song.rate(2) - Twice as fast
 song.rate(2.5) - Very Fast

*/


function play_music() {
    audio.play();
    audio.rate(1);
    audio.setVolume(0.7);
}

function pause_music() {
    audio.pause();
}