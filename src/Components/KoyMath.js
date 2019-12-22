//Vectors
var Vector2 = function(x, y)
{
    this.x = x;
	this.y = y;
}

var Vector3 = function(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}
var Vector4 = function(x, y, z, m)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.m = m;
}

var Calc = 
{
	bComp(A, B){ if(A === B)	{return true;} return false; },
	bInRange(Dist, Range)	{if( Dist <= (Range*Range) ){ return true; } return false; },
	VAdd(Target, Add)		{Target.x += Add.x; Target.y += Add.y; return Target;},
	VSub(Target, Sub)		{Target.x -= Sub.x; Target.y -= Sub.y; return Target;},
	VMult(Target, Mult)		{Target.x *= Mult.x; Target.y *= Mult.y; return Target;},
	VDiv(Target, Div)		{ if(Div.x !== 0){Target.x /= Div.x;} if(Div.y !== 0){Target.y /= Div.y;} return Target;},

	VAdd(Target, Add)		{Target.x += Add.x; Target.y += Add.y; Target.z += Add.z; return Target;},
	VSub(Target, Sub)		{Target.x -= Sub.x; Target.y -= Sub.y; Target.z -= Sub.z; return Target;},
	VMult(Target, Mult)		{Target.x *= Mult.x; Target.y *= Mult.y; Target.z *= Mult.z; return Target;},	
	VDiv(Target, Div)		{ if(Div.x !== 0){Target.x /= Div.x;} if(Div.y !== 0){Target.y /= Div.y;} if(Div.z !== 0){Target.z /= Div.z;}  return Target;},

	bComp(A, B)				{ if((A.x === B.x)&&(A.y === B.y)&&(A.z === B.z)){return true;} return false; },

	fDist(A, B)				{ return( Math.pow( (Math.pow(A.x - B.x,2) + Math.pow(A.y - B.y,2) + Math.pow(A.z - B.z,2)), (1.0/3.0) ) ); }
}

var Deg = 
{
	//Normalizing Functions
	V2Normalize(Vector)
	{
		//get magnitude
		var fMag = (Math.abs(Vector.x) + Math.abs(Vector.y));
		//check magnitude
		if(!fMag)//if magnitude is zero, end fucntion
		{return;}
		//normalize
		Vector.x /= fMag;
        Vector.y /= fMag;
        return Vector;
	},
	V3Normalize(Vector)
	{
		//get magnitude
		var fMag = (Math.abs(Vector.x) + Math.abs(Vector.y) + Math.abs(Vector.z));
		//check magnitude
		if(!fMag)//if magnitude is zero, end fucntion
		{return;}
		//normalize
		Vector.x /= fMag;
		Vector.y /= fMag;
        Vector.z /= fMag;
        return Vector;
	},
	fNormalizeDegrees(Angle)
	{	 
		if(Angle > 360){Angle -= 360;}
        else if(Angle < 0){Angle += 360;}
        return Angle;
	},
	fNormalizeRadians(Angle)
	{	 
		if(Angle > 6.28){Angle -= 6.28;}
        else if(Angle < 0){Angle += 6.28;}
        return Angle;
	},
    fGetPitchAngle(Self, Target)
	{
		//get pitch angle
		var fAngle = Math.atan2(Self.x - Target.x, Self.y - Target.y);
		return Deg.fNormalizeRadians(fAngle);
	},
	fGetPitchAngle(Self, Target)
	{
		//get pitch angle
		var fAngle = Math.atan2(Self.x - Target.x, Self.z - Target.z);
		return Deg.fNormalizeRadians(fAngle);
	},
	fGetYawAngle(Self, Target)
	{
		//get yaw angle
		var fDistance = Math.sqrt(Math.pow(Self.z - Target.z,2) + Math.pow(Self.x - Target.x,2));
		var fAngle = Math.atan2(Self.y - Target.y, fDistance);
		return -Deg.fNormalizeRadians(fAngle);
	},

	fDownToZero(Value, Range){if((Value > -Range)&&(Value < Range)){Value = 0;}}
}

var Coll =
{
    b2DAABBTest: function(aMin, aMax, bMin, bMax)
    {
        var bColliding = true;

		if(aMax.x <= bMin.x || aMin.x >= bMax.x)
		{
			bColliding = false;
		}
		if(aMax.y <= bMin.y|| aMin.y >= bMax.y) 
		{
			bColliding = false;
		}
		return (bColliding);
    },
    i2DAABBTest(aMin,aMax, bMin, bMax)
	{		
		var bColliding = 1;

		if(aMax.x <= bMin.x || aMin.x >= bMax.x)
		{
			bColliding = 0;
		}
		if(aMax.y <= bMin.y|| aMin.y >= bMax.y) 
		{
			bColliding = 0;
		}

		//Check for Perfect Collision
		if((aMin.x === bMax.x)||(aMax.x === bMin.x))
		{bColliding = 2;}
		if((aMin.y === bMax.y)||(aMax.y === bMin.y))
		{bColliding = 3;}

		return (bColliding);
    },
    bBBTest(xA, yA, zA, xB, yB, zB)
	{
		var bColliding = true;

		if(xA <= xB || xA >= xB)
		{
			bColliding = false;
		}
		if(yA <= yB || yA >= yB) 
		{
			bColliding = false;
		}
		if(zA <= zB || zA >= zB) 
		{
			bColliding = false;
		}
		return (bColliding);
    },
    bVBBTest(aMin, aMax, bMin, bMax)
	{
		var bColliding = true;

		if(aMax.x <= bMin.x || aMin.x >= bMax.x)
		{
			bColliding = false;
		}
		if(aMax.y <= bMin.y || aMin.y >= bMax.y) 
		{
			bColliding = false;
		}
		if(aMax.z <= bMin.z || aMin.z >= bMax.z) 
		{
			bColliding = false;
		}
		return (bColliding);
    },
    b2DRangeTest(APos, ARadius, BPos, BRadius)
	{
		//get distance
		var distance;
		distance = Math.pow(APos.x-BPos.x,2)+Math.pow(APos.y-BPos.y,2);

		if( Math.pow(ARadius + BRadius,2) >= (distance))
		{return true;}
		else
		{return false;}
    },
    b3DRangeTest(APos, ARadius, BPos, BRadius)
	{
		//get distance
		var distance;
		distance = Math.pow(APos.x-BPos.x,2)+Math.pow(APos.y-BPos.y,2)+Math.pow(APos.z-BPos.z,2);

		if( Math.pow(ARadius + BRadius,2) >= (distance))
		{return true;}
		else
		{return false;}
    },
    b2DBoxToCircleTest(aMin, aMax, CirclePos, Radius)
	{
		//Get Box Corners
		var TL = new Vector2();
		var TR = new Vector2(aMax);
		var BL = new Vector2(aMin);
		var BR = new Vector2();
		TL.New(aMin.x,aMax.y); BR.New(aMax.x,aMin.y);

		//Use distance check against each corner against the circle Range
		//TL
		if(Calc.fDist(TL,CirclePos) <= Radius*Radius) 
		{return true;}
		//TR
		if(Calc.fDist(TR,CirclePos) <= Radius*Radius) 
		{return true;}
		//BR
		if(Calc.fDist(BR,CirclePos) <= Radius*Radius) 
		{return true;}
		//BL
		if(Calc.fDist(BL,CirclePos) <= Radius*Radius) 
		{return true;}

		return false;
    },
    b2DPntToCircle(Point, TargetPos, Radius)
	{
		//Test Distance
		if(Calc.fDist(Point,TargetPos) <= Radius*Radius)
		{return true;}
		return false;
    },
    b2DPntToBox(Point, Min, Max)
	{
		//Check x
		if((Point.x >= Min.x)&&(Point.x <= Max.x))
		{
			//Check y
			if((Point.y >= Min.y)&&(Point.y <= Max.y))
			{return true;}
		}

		return false;
    },
    b3DPntToBox(Point, Min, Max)
	{
		//Check x
		if((Point.x >= Min.x)&&(Point.x <= Max.x))
		{
			//Check y
			if((Point.y >= Min.y)&&(Point.y <= Max.y))
			{
				if((Point.z >= Min.z)&&(Point.z <= Max.z))
				{return true;}			
			}
		}
		return false;
    },
    bRayCircleTest(Ray, RayPos, CirclePos, Radius)
	{
		//Test if Ray Angle Lies between the Circles Min and Max Angle
		var fRayAngle = Deg.fGetPitchAngle(RayPos, Ray);
		//Get Max
		var v2Radius = new Vector2(); v2Radius.New(-Radius/2,Radius/2);
		var TempCircle = Vector2(CirclePos); Calc.vAdd(TempCircle,v2Radius);
		var fMaxAngle = Deg.fGetPitchAngle(RayPos,TempCircle);
		//Get Min
		v2Radius.New(Radius/2,-Radius/2);
		TempCircle.New(CirclePos); Calc.vSub(TempCircle,v2Radius);
		var fMinAngle = Deg.fGetPitchAngle(RayPos,TempCircle);

		//Test Ray
		if((fRayAngle <= fMaxAngle)&&(fRayAngle >= fMinAngle))
		{return true;}

		return false;
    },
    v2Rotate2D(Target, Center, Angle)
    {
        var tempVector = new Vector2();

        tempVector.x = Target.x;
        tempVector.y = Target.y;
        tempVector.x -= Center.x;
        tempVector.y -= Center.y;		

        //getting the sin and cos of the angle
        var sinAngle = Math.sin(Angle*(3.141592653/180.0)/*radians*/);
        var cosAngle = Math.cos(Angle*(3.141592653/180.0)/*radians*/);

        Target.x = (tempVector.x * cosAngle) - (tempVector.y * sinAngle);		
        Target.y = (tempVector.x * sinAngle) + (tempVector.y * cosAngle);	

        Target.x += Center.x;
        Target.y += Center.y;	

        return Target;
    },
    v2Rotate2D2(TargetX, TargetY, CenterX, CenterY, Angle)
    {	
        var tempVector = new Vector2();

        tempVector.x = TargetX;
        tempVector.y = TargetY;
        tempVector.x -= CenterX;
        tempVector.y -= CenterY;		

        //getting the sin and cos of the angle
        var sinAngle = Math.sin(Angle*(3.141592653/180.0)/*radians*/);
        var cosAngle = Math.cos(Angle*(3.141592653/180.0)/*radians*/);

        TargetX = (tempVector.x * cosAngle) - (tempVector.y * sinAngle);		
        TargetY = (tempVector.x * sinAngle) + (tempVector.y * cosAngle);	

        TargetX += CenterX;
        TargetY += CenterY;	

        return (TargetX,TargetY);
    },
    v2GetSlope(A, B)
    { 
        Calc.vSub(A,B);
        Deg.V2Normalize(A);
        return A; 
    },
    v2GetSlope2(Ax, Ay, Bx, By)
    { 
        var A = new Vector2(Ax,Ay); var B = new Vector2(Bx,By);
        Calc.vSub(A,B);
        Deg.V2Normalize(A);
        return A; 
    },
    v3GetSlope(A, B)
    { 
        Calc.vSub(A,B);
        Deg.V3Normalize(A);
        return A; 
    }
}

export {Vector2, Vector3, Deg, Coll, Calc};