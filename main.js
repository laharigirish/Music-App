song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftWrist=0;
score_rightWrist=0;

function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}


function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    posenet= ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Pose net initialized");
}

function draw(){
    image(video, 0, 0, 600, 500);
    var song1_status= song1.isPlaying();
    var song2_status= song2.isPlaying();
    
    if(score_leftWrist > 0.2){
        fill("red");
        stroke("red");
        circle(leftWristX, leftWristY, 20);
         song2.stop();
        
        if(song1_status==false){
            song1.play();
            document.getElementById("name_of_song").innerHTML="Name:Harry Potter song";
        }}
        
        if(score_rightWrist > 0.2){
            fill("red");
            stroke("red");
            circle(rightWristX, rightWristY, 20);
            song1.stop();
        
        if(song2_status==false){
            song2.play();
            document.getElementById("name_of_song").innerHTML="Name: Peter Pan song";
        }}

}

function gotPoses(results){
if(results.length>0){
    console.log(results);
    score_leftWrist= results[0].pose.keypoints[9].score;
    console.log("Score left wrist =" + score_leftWrist);
    score_rightWrist=results[0].pose.keypoints[10].score;
    console.log("Score right wrist =" + score_rightWrist);

    leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;
     console.log("leftWristX ="+ leftWristX + "leftWristY ="+ leftWristY);
   
     rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log("leftWristX ="+ rightWristX + "leftWristY ="+ rightWristY);
}
}

