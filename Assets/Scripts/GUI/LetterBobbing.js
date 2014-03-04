#pragma strict


// "Bobbing" animation from 1D Perlin noise.
// Range over which height varies.
var heightScale = 0.1;
var sideScale = 0.1;

// Distance covered per second along X axis of Perlin plane.
var xScale = 1.0;
var yScale = 1.0;

var wiggleAmt = 10.0;

var letterTransform : Transform;

function Start () {

}

function Update () 
{
	var pos = letterTransform.position;
	var height = heightScale * Mathf.PerlinNoise(Time.time * xScale, 0.0);
	var side = sideScale * Mathf.PerlinNoise((Time.time-1) * yScale, 0.0);
	pos.y = ((Mathf.Sin(Time.time-1)*height)/wiggleAmt)+pos.y;
	pos.x = ((Mathf.Sin(Time.time)*side)/wiggleAmt)+pos.x;
	letterTransform.position = pos;
}