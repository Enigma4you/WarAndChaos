#pragma strict

var score:GUIText;
var scoreTotal:int = 0;
var THEbullet: Transform;
var dir: Vector3;
var player1: PlayerMovement;
var currentPlayer: GameObject;

function OnTriggerEnter(collision:Collider)
{
	if (collision.CompareTag ("Player")) 
	{
		player1.isAlive = false;
		Destroy (collision.gameObject);
	}
	
	if (collision.CompareTag ("GrazeCircle"))
	{
		updateScore();
		//Destroy (collision.gameObject);
	}
	

}

function updateScore()
{
	scoreTotal = scoreTotal + 50;
	score.guiText.text = scoreTotal.ToString();
}

function updateBullets()
{
	THEbullet.position += dir;
}

function Start () {
	currentPlayer = GameObject.FindGameObjectWithTag("PlayerGroup");
	player1 = currentPlayer.GetComponent(PlayerMovement);
}

function Update ()
{
	updateBullets();
}
