object=[];
status="";
img="";
pic="";
var btn1 = document.getElementById("btn1");
var file_input = document.getElementById("file");
var back = document.getElementById("btn2");
back.addEventListener("click", function(){
document.location.href="/Index.html";
});
btn1.addEventListener("click", function(){

    file_input.click();
    }
);
file_input.addEventListener("change", function(){
    pic = file_input.files;
    var reader = new FileReader;
    reader.onload = function(e){
    console.log(e);
   var myImage = new Image(640,426);
   myImage.src=e.target.result;
   pic1 = myImage;
   myImage.onload = function (){
       img = loadImage(myImage.src);
   }
   
    }
    reader.readAsDataURL(pic[0]);
    setTimeout(function(){
        objectDetector.detect(pic1,gotResults);
    },5000);
    
});
function preload(){
   img= loadImage("pc.jpg")
}
function setup(){
    canvas=createCanvas(640,426);
    canvas.center();
   objectDetector=ml5.objectDetector("cocossd", modelLoaded);

}
function modelLoaded(){
    console.log("Model Is Loaded");
    status=true;
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("status").innerHTML="Status = Object Detected"  ; 
        object=results;

     }
}
function draw(){
    objectDetector.detect(img,gotResults);
    image(img , 0, 0, 640, 426);
     if(status !=""){
         
         for (i=0;i<object.length;i++){
             confidence = floor(object[i].confidence*100);
             fill("red");
             text(object[i].label + " "+confidence+"%",object[i].x+15,object[i].y+15);
             noFill();
             stroke("red")
             rect(object[i].x,object[i].y,object[i].width,object[i].height);
         }
     }
}