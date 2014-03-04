#pragma strict

function ExitGame()
{
	if ( Input.GetKeyDown("escape"))
	{
		Application.Quit();
	}
}

function Start () 
{

}

function Update ()
{
ExitGame();
}