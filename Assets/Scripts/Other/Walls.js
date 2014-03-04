#pragma strict

function OnTriggerEnter(collision:Collider)
{
	if (collision.CompareTag ("EnemyBullet"))
	{
		Destroy (collision.gameObject);
	}
	if (collision.CompareTag ("FriendlyBullet"))
	{
		Destroy (collision.gameObject);
	}
}
	
function Start () {

}

function Update () {

}