let dt=0.01;

let p_length=150;
let g=10000;
let m=1;
let start_angle=1;

let p_data;
let start_total_e=0;


function setup() 
{
	createCanvas(400, 400);

	p_Euler=new simplePendulum(200,200,start_angle,p_length,m,g);
	p_RK4=new simplePendulum(200,200,start_angle,p_length,m,g);
	p_data=new data();


	start_total_e=p_RK4.calc_E()
	
	
	p_data.saveData(p_Euler,p_RK4);

}

function draw()
{
	
	background(220);
	p_Euler.updateEuler();
	p_Euler.show("Blue");
	p_RK4.updateRK4();
	p_RK4.show("Green");
	
	p_data.saveData(p_Euler,p_RK4);


	
	

	fill("Black")
	text("Start mekanisk energi: "+start_total_e,10,10)
	text("Frame: "+frameCount,10,60);
  
	fill("blue")
	text("Mekanisk energi: " + p_Euler.calc_E(),10,20)
	text("Kinetisk energi: " + p_Euler.calc_KE(),10,30)
	text("Potentiel energi: " + p_Euler.calc_PE(),10,40)

	fill("Green")
	text("Mekanisk energi: " + p_RK4.calc_E(),10,370)
	text("Kinetisk energi: " + p_RK4.calc_KE(),10,380)
	text("Potentiel energi: " + p_RK4.calc_PE(),10,390)
	
	
  // Hvis den har gemt data 2000 gange
	if(frameCount==1999){
    // så skal simuleringen stoppe
		noLoop();

    // lave alt data til text
		p_data.dataToText();

		p_data.downloadData();
	}
}
