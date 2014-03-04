#pragma strict


var thisGun: Transform;
var bullets = new Array();
var bullet: FriendlyBullet;
//var displamentXAmmt: float = 1000.0f;
var bulletSpeed: float = 2.5f;
//var totalDelay: float = 0;
var bulletDamage: int = 3;
var shootSound: AudioClip;


function shootBullets()
{
	var thisBullet = Instantiate(bullet, thisGun.position, thisGun.rotation * Quaternion.Euler(new Vector3(90.0f, 0.0f, 0.0f)));
	thisBullet.dir = thisGun.rotation * Vector3(0.0f, 0.0f, 1*bulletSpeed);
	
	// add bullets to the array
	bullets.Add(thisBullet);
	audio.PlayOneShot(shootSound);
}


function Start () 
{


}

function Update () 
{
	// if player dies, go to game over screen
	
	
	if (Input.GetMouseButtonDown(0))
	{
		shootBullets();
		Debug.Log("Pressed left click.");
	}

}