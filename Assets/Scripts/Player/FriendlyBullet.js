#pragma strict
var dir: Vector3;
var THEbullet: Transform;
var score:GUIText;
var scoreTotal:int = 0;

function OnTriggerEnter(collision:Collider)
{
	if (collision.CompareTag ("Enemy")) 
	{
		scoreTotal = scoreTotal + 50;
		score.guiText.text = scoreTotal.ToString();
		// instantiate sparks on collide
		//Destroy (collision.gameObject);
	}
	
	if (collision.CompareTag ("Wall"))
	{
		//Destroy(this);
		//Destroy (collision.gameObject);
	}
}

function updateBullets()
{
	THEbullet.position += dir;
}


function Start () {

}

function Update () 
{
	updateBullets();
}