#pragma strict


// Variable definitions
var ENEMY: GameObject;
var thisEnemy: Transform;
var healthStageText: GUIText;
var enemyHealthBar: Transform;
var healthParticle1: ParticleEmitter;
var healthParticle2: ParticleEmitter;
var bullets = new Array();
var bullet: EnemyBullet;
var displacementXAmmt: float = 100.0f;
var displacementSpeed: float = 2.0f;
var displacementDistance: float = 100.0f;
var bulletSpeed: float = 0.1f;
var totalDelay: float = 0.0f;
var S1health: int = 10;
var S2health: int = 15;
var S3health: int = 20;
var totalS1health: int;
var totalS2health: int;
var totalS3health: int;
var healthRatio1: float;
var healthRatio2: float;
var healthRatio3: float;
var bossHealthScale: float = 285.0f;
var currentBossHealth: float;
var DEAD = false;


enum BOSSSTAGE { STAGE1, STAGE2, STAGE3 };
var currentStage = BOSSSTAGE.STAGE1;

function OnTriggerEnter(collision:Collider)
{
	if (collision.CompareTag ("FriendlyBullet")) 
	{
		Destroy (collision.gameObject);
		if (currentStage == BOSSSTAGE.STAGE1){S1health = S1health - 1;}
		if (currentStage == BOSSSTAGE.STAGE2){S2health = S2health - 1;}
		if (currentStage == BOSSSTAGE.STAGE3){S3health = S3health - 1;}
	}
	
}


// ----------------------------------------------------------
// Function definitions


// ------ENEMY BEHAVIORS------

// shoots the bullets outwards in a circle around the enemy
function ShootBulletsCircle(numBullets:int, times:int, delay:float, twist:int)
{

	// calculate angles
	var acc:float = 360.0f/parseFloat(numBullets);
	var twistAmt = (twist/360);
	for (var j:int = 0; j < times; j++)
	{
	
		// instance all bullets in circle simultaneously
		for (var i:int = 0; i < numBullets; i++)
		{
			// create instance
			var thisBullet = Instantiate(bullet, thisEnemy.position, Quaternion.identity);
			
				// assign vector based on direction of circle
				var dirX:double = Mathf.Sin((parseFloat(i)*acc)+twistAmt);
				var dirY:double = Mathf.Cos((parseFloat(i)*acc)+twistAmt);
				//print(dirX);
				//print(dirY);
				thisBullet.dir = Vector3(dirX*bulletSpeed, 0.0f, dirY*bulletSpeed);
				
				// add bullets to the array
				bullets.Add(thisBullet);
				twistAmt += twist;
				
		}
		
		totalDelay += delay;
		yield WaitForSeconds(delay);
	}
	print ("end wave");
}


// shoots directly at the play


//-------ENEMY UPDATES-------

function ClearBullets()
{
	// clear the array
	bullets.Clear();
}

function CheckHealth()
{


	// Manage boss health bar
	if (currentStage ==	BOSSSTAGE.STAGE1)
	{
		healthStageText.text = "STAGE 1";
		healthRatio1 = bossHealthScale/totalS1health;
		currentBossHealth = healthRatio1 * S1health;
		enemyHealthBar.localScale.x = currentBossHealth;
		Debug.Log("Current boss health: " + currentBossHealth);
	}
	if (currentStage ==	BOSSSTAGE.STAGE2)
	{
		healthStageText.text = "STAGE 2";
		healthRatio2 = bossHealthScale/totalS2health;
		currentBossHealth = healthRatio2 * S2health;
		enemyHealthBar.localScale.x = currentBossHealth;
	}
	if (currentStage ==	BOSSSTAGE.STAGE3)
	{
		healthStageText.text = "STAGE 3";
		healthRatio3 = bossHealthScale/totalS3health;
		currentBossHealth = healthRatio3 * S3health;
		enemyHealthBar.localScale.x = currentBossHealth;
	}
	else
	{ Debug.Log("not entering loop");}
	
	
	// Manage the attack stages
	if (S1health <= 0)
	{
		currentStage = BOSSSTAGE.STAGE2;
		StopAllCoroutines();
		//DEAD = true;
	}
	if (S2health <= 0)
	{
		
		currentStage = BOSSSTAGE.STAGE3;
	}
	if (S3health <= 0)
	{
		DEAD = true;
		healthParticle1.emit = false;
		healthParticle2.emit = false;
	}	
}

	

function MoveEnemy()
{
	thisEnemy.position.x += ((Mathf.Cos((Time.time*Mathf.Deg2Rad)*90/displacementSpeed)/displacementXAmmt)*displacementDistance);
	//transform.position += totalDisplacement;
}


// ------------------------------------------------------------
// Runtime functions
function Start () {

	totalS1health = S1health;
	totalS2health = S2health;
	totalS3health = S3health;


while (DEAD == false) {
	while (BOSSSTAGE.STAGE1) yield;
	
	// ------ STAGE 1 -------
	// make the Stage 1 attacks loop
	print("S1: Starting Wave 1 original");
	ShootBulletsCircle(20, 10, .1, 0);
	totalDelay += 1;
	yield WaitForSeconds(totalDelay);
	
	print("S1: Starting Wave 1");
	ShootBulletsCircle(20, 10, .1, 10);
	totalDelay += 1;
	yield WaitForSeconds(totalDelay);
	
	print("S1: Starting Wave 2");
	ShootBulletsCircle(20, 30, .2, 0);
	totalDelay += 1;
	yield WaitForSeconds(totalDelay);
	
	print("S1: Starting Wave 3");
	ShootBulletsCircle(50, 40, .5, -15);
	totalDelay += 2;
	yield WaitForSeconds(totalDelay);
	
	print("S1: Starting Wave 4");
	ShootBulletsCircle(20, 30, .5, 0);

	
	// ------ STAGE 2 -------
	while (BOSSSTAGE.STAGE2) yield;
	
	print("S2: Starting Wave 1");
	ShootBulletsCircle(20, 50, .2, -30);
	totalDelay += 1;
	yield WaitForSeconds(totalDelay);
	
	//yield WaitForSeconds(2.0);
		
		
	// ------ STAGE 3 -------
	while (BOSSSTAGE.STAGE3) yield;
	
	print("S2: Starting Wave 1");
	ShootBulletsCircle(20, 50, .2, 30);
	totalDelay += 1;
	yield WaitForSeconds(totalDelay);

}


}
function FixedUpdate()
{
	CheckHealth();
	if (DEAD == false)
	{
		MoveEnemy();
	}
	else
	{
		GameObject.Destroy(ENEMY);
		Application.LoadLevel("GameOver");
	}
}

function Update () 
{


}