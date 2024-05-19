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
async function assign(event){
	event.preventDefault();
	Overlayhide();
	AIInput = document.getElementById('AI');  // level human vs AI          
    AIInput1 = document.getElementById('AI1');// level AI1
    AIInput2 = document.getElementById('AI2');// level AI2
	
	if(AIInput.value == "")
	AIInput.value =1;
	if(AIInput1.value == "")
	AIInput1.value =1;
	if(AIInput2.value == "")
	AIInput2.value =1;

	console.log("asdas",AIInput.value);
    if (dot1.checked) gameMode='H2H';
    if (dot2.checked){
        gameMode='H2A';
        globalDepth=AIInput.value;
    } 
    if (dot3.checked){
        gameMode='A2A';
        globalDepth1=AIInput1.value;
        globalDepth2=AIInput2.value;
    } 
		if(gameMode=="A2A")
		{
			[b,w]=reWriteScore();
			let i=1;
			showPopupMessage("The Code is delayed by 1 sec ,To See Turns")
			while(b+w != 64)
			{
				(function() {
				
					if(canMove(1) ||canMove(2))
					{
						if(canMove(1))
								{makeAIMove2();console.log("Entered turn =%d canMove(1)=%d",turn,canMove(1))}
						if(canMove(2))
							{makeAIMove1(); console.log("Entered turn =%d canMove(2)=%d",turn,canMove(2))}
						console.log("Entered");
					}
				  })();
				console.log("iteration",i);
				 await delay(1000);
				 [b,w]=reWriteScore();
				 i++;
			}

		}

}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function showPopupMessage(winnerName) {
	var popupMessage = document.querySelector('.popup-message');
	var winnerMessage = document.querySelector('#winnerMessage');
	winnerMessage.textContent = winnerName;
	popupMessage.classList.add('show');

	setTimeout(function() {
	  popupMessage.classList.remove('show');
   }, 2000); // Hide the popup message after 4 seconds 
  }
  function ResetGamingboard() {
	
	discs = [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 1, 0, 0, 0],
		[0, 0, 0, 1, 2, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	];
	drawGreenSquares();
	drawDiscs();
	drawCanMoveLayer();
	Overlayshow();
	turn =1;
	reWriteScore();
  }
