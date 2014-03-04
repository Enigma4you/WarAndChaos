#pragma strict

var player: GameObject;
var playerTransform: Transform;
var movementSpeed: float = 0.1f;
var isAlive = true;
    

function MovePlayer()
{
	var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var pos : Vector3 = ray.GetPoint(35);
	pos.x = Mathf.Clamp(pos.x, -(Screen.width/4), (Screen.width/4));
	pos.z = Mathf.Clamp(pos.z, -(Screen.height/4), (Screen.height/4));
	playerTransform.position.x = pos.x;
	playerTransform.position.z = pos.z;
}

function Start ()
{
	player = GameObject.FindGameObjectWithTag("Player");
	playerTransform = player.GetComponent(Transform);
}

function Update ()
{
	if (isAlive == true)
	{
		MovePlayer();
	}
	else
	{
		// end game
		Application.LoadLevel("GameOver");
	}
}