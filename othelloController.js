//------------------------(Discs Array)--------------------------------
//Array for store the Discs on board
let discs = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 1, 0, 0, 0],
	[0, 0, 0, 1, 2, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

//----------------------------------------------------------------------

//-------------------------(View)---------------------------------------
var dot1;
var dot2;
var dot3;
var AIInput;
var AIInput1;
var AIInput2;

var globalDepth;
var globalDepth1;
var globalDepth2;

let scoreLabel;
let canMoveLayer;
let blackBackground;
let discLayer;
let gap = 3;
let cellWidth = 65;
let turn = 1;
let Turn = 'Black';
var gameMode;

//initial function for load the App in Browser.
window.onload = function () {
    
              dot1 = document.getElementById('dot-1'); // human vs human
              dot2 = document.getElementById('dot-2'); // human vs AI
              dot3 = document.getElementById('dot-3'); // AI vs AI
              var inputBox1 = document.getElementById('input-box-1'); 
              var inputBox2 = document.getElementById('input-box-2'); 
              var inputBox3 = document.getElementById('input-box-3'); 
              AIInput = document.getElementById('AI');  // level human vs AI
              
              AIInput1 = document.getElementById('AI1');// level AI1
              AIInput2 = document.getElementById('AI2');// level AI2

              //making sure user can't force input value more than 4
              AIInput.addEventListener('input', function() {
                  if (parseFloat(AIInput.value) > 5) {
                    
                        AIInput.value = '5';
                        
                                        }});
              AIInput1.addEventListener('input', function() {
                  if (parseFloat(AIInput1.value) > 8) {
                        AIInput1.value = '8';
                                        }});
              AIInput2.addEventListener('input', function() {
                  if (parseFloat(AIInput2.value) > 8) {
                        AIInput2.value = '8';
                                        }});

              // greater number to be displayed is 5
              function toggleInputBoxes() {
                if (dot1.checked) {
                  inputBox1.style.display = 'none';
                  inputBox2.style.display = 'none';
                  inputBox3.style.display = 'none';
				  
                } 
                if(dot2.checked) {
                  inputBox1.style.display = 'none';
                  inputBox2.style.display = 'none';
                  inputBox3.style.display = 'block';
				  
                }
                if(dot3.checked)
                {
                  inputBox1.style.display = 'block';
                  inputBox2.style.display = 'block';
                  inputBox3.style.display = 'none';
				  
                }
              }
            
              dot1.addEventListener('change', toggleInputBoxes);
              dot2.addEventListener('change', toggleInputBoxes);
              dot3.addEventListener('change', toggleInputBoxes);
            
              // Initial state
              toggleInputBoxes();
             
            
	scoreLabel = document.getElementById('score');
	canMoveLayer = document.getElementById('canMoveLayer');
	blackBackground = document.getElementById('blackBackground');
	discLayer = document.getElementById('discLayer');
	drawGreenSquares();
	drawDiscs();
	drawCanMoveLayer();
	// showing overlay to disable clicks untill user adjust setting and press play
	Overlayshow(); 
};

function Overlayhide() { //hides the overlay that prevent the user to click on the board
	var overlay = document.querySelector('.Overlay');
	overlay.style.display = 'none';
	  }
	function Overlayshow() { //Shows the overlay that prevent the user to click on the board
	var overlay = document.querySelector('.Overlay');
	overlay.style.display = 'block';
	  }
