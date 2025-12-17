class simplePendulum{
	constructor(cx,cy,angle,l,m,g=10){
		this.center=createVector(cx,cy);
		// Længde (px)
		this.length=l;
    // Masse
		this.mass=m;

		// Vinkel (rad)
		this.A=angle;
		// Vinkelhastighed (rad/s)
		this.Avel=0;
		// Vinkelacceleration (rad/s^2)
		this.Aacc=0;

    // position sidste frame (px)
		this.p_pos=createVector(0,0)
		// position (px)
		this.pos=createVector(sin(this.A)*this.length+this.center.x,cos(this.A)*this.length+this.center.y);
		// hastighed (px/s)
		this.vel=createVector(0,0);
		// acceleration (px/s^2)
		this.acc=createVector(0,0);

    //Kinetisk energi
		this.KE=0;
    //Potentiel energi
		this.PE=0;
    //Mekanisk energi
		this.E=0;

		
    // Tyngdekraft
		this.G=g;
	}

	getX(){
		return this.pos.x;
	}
	getY(){
		return this.pos.y;
	}
	getA(){
		return this.A;
	}
	getAVel(){
		return this.Avel;
	}
	
	getMass(){
		return this.mass
	}
	getG(){
		return this.G
	}


	setCX(X){
		this.center.x=X;
	}
	setCY(Y){
		this.center.y=Y;
	}

  //Hastighedens komposant som står vinkelret på snoren/stagnen
	getLVel(){
		let r=createVector(this.pos.x-this.center.x,this.pos.y-this.center.y);

		return createVector(-this.Avel*r.y,this.Avel*r.x)
	}

  //Tegner pendulet med en farve
	show(c="Black"){
		line(this.center.x,this.center.y,this.pos.x,this.pos.y);
		fill(c)
		ellipse(this.pos.x, this.pos.y, this.mass*10);
	}

  //Beregner potentiel energi
	calc_PE(){

		this.PE=this.mass*this.G*(this.pos.y-height)*-1

		return this.PE
	}
  //Beregner kinetisk energi
	calc_KE(){
		this.KE=0.5*this.getMass()*(this.getLVel().mag()**2)
		
		return this.KE
	}
  //Beregner mekanisk energi
	calc_E(){
		return this.calc_PE()+this.calc_KE()
	}


	updateEuler(){

		
		this.Aacc=-(this.G/this.length)*sin(this.A)
		
		this.A+=this.Avel*dt;
		this.Avel+=this.Aacc*dt;
		
		this.pos.x=sin(this.A)*this.length+this.center.x;
		this.pos.y=cos(this.A)*this.length+this.center.y;

		
	}
	updateSemiImplicitEuler(){

		
		this.Aacc=-(this.G/this.length)*sin(this.A)
		this.Avel+=this.Aacc*dt;
		this.A+=this.Avel*dt;
		
		
		this.pos.x=sin(this.A)*this.length+this.center.x;
		this.pos.y=cos(this.A)*this.length+this.center.y;

		
	}
	
	updateRK4(){

    // ----- k1 -----
    let A1 = this.A;
    let Avel1 = this.Avel;

    let Aacc1 = -(this.G / this.length) * sin(A1);

    let k1_A = Avel1;
    let k1_w = Aacc1;


    // ----- k2 -----
    let A2 = this.A + 0.5 * k1_A * dt;
    let Avel2 = this.Avel + 0.5 * k1_w * dt;

    let Aacc2 = -(this.G / this.length) * sin(A2);

    let k2_A = Avel2;
    let k2_w = Aacc2;


    // ----- k3 -----
    let A3 = this.A + 0.5 * k2_A * dt;
    let Avel3 = this.Avel + 0.5 * k2_w * dt;

    let Aacc3 = -(this.G / this.length) * sin(A3);

    let k3_A = Avel3;
    let k3_w = Aacc3;


    // ----- k4 -----
    let A4 = this.A + k3_A * dt;
    let Avel4 = this.Avel + k3_w * dt;

    let Aacc4 = -(this.G / this.length) * sin(A4);

    let k4_A = Avel4;
    let k4_w = Aacc4;


    // ----- beregner hældning -----
    this.A += (dt / 6) * (k1_A + 2*k2_A + 2*k3_A + k4_A);
    this.Avel += (dt / 6) * (k1_w + 2*k2_w + 2*k3_w + k4_w);


    // ----- position -----
    this.pos.x = sin(this.A) * this.length + this.center.x;
    this.pos.y = cos(this.A) * this.length + this.center.y;

		
	}



}