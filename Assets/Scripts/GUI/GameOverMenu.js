#pragma strict

Screen.showCursor = true;
var btnTexture : Texture;
var hover : String;
var hoverSound : AudioClip;
var playedSound = false;
var STARTparticle1 : ParticleEmitter;

function OnGUI() 
{


	if (!btnTexture) {
		Debug.LogError("Please assign a texture on the inspector");
		return;
	}

	//if (GUI.Button(Rect(10,10,50,50),btnTexture))
	//	Debug.Log("Clicked the button with an image");
	if (GUI.Button(Rect((Screen.width/2)-100,(Screen.height/2-50),200,50), GUIContent ("", ""),GUIStyle.none))
		Application.LoadLevel ("MainGame");
		Debug.Log("Main Game");
		
	if (GUI.Button(Rect((Screen.width/2)-150,(Screen.height/2),300,50), GUIContent ("", ""),GUIStyle.none))
		Application.LoadLevel ("Title");
		Debug.Log("Title Screen");
		
		
	// for standalone PC build only
	/*
	if (GUI.Button(Rect((Screen.width/2)-75,(Screen.height/2)+50,150,50),GUIContent("EXIT", "EXIT")))
		Application.Quit();
		Debug.Log("Exit Button"); 	
	*/
		
	var button1 = Rect ((Screen.width/2)-100,(Screen.height/2),200,45);
	var button2 = Rect ((Screen.width/2)-150,(Screen.height/2)-50,300,45);
	
	if (button1.Contains(Input.mousePosition))
	{
		if(playedSound==false)
		{
			//STARTparticle1 = GetComponent(ParticleEmitter);
			print("Inside");
			audio.PlayOneShot(hoverSound);
			//STARTparticle1.emit = true;
			playedSound = true;
		}	
	}
	
	else if (button2.Contains(Input.mousePosition))
	{
		if(playedSound==false)
		{
			print("Inside");
			audio.PlayOneShot(hoverSound);
			playedSound = true;
		}	
	}
	
	else
	{
		playedSound = false;
		//STARTparticle1.emit = false;
	}
}


function Start () {
	//STARTparticle1 = GetComponent(ParticleEmitter);
}

function Update () {


}