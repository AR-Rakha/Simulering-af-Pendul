class data{
	constructor(){
		
		this.frame=[];
		this.time=[];
		this.A_euler=[];
		this.A_vel_euler=[];

		this.A_RK4=[];
		this.A_vel_RK4=[];

		this.frame_t="";
		this.time_t="";
		this.A_euler_t="";
		this.A_vel_euler_t="";

		this.A_RK4_t="";
		this.A_vel_RK4_t="";

    this.data_list=[]
	}
	
  //Gemmer tid og frame
	saveDataTime(){
		this.frame.push(frameCount);
		this.time.push(frameCount*dt);
	}

  //Gemmer info omkring pendulet simuleret af Eulers metode
	saveDataEuler(simplePendulum){
		this.A_euler.push(simplePendulum.getA());
		this.A_vel_euler.push(simplePendulum.getAVel());
	}

  //Gemmer info omkring pendulet simuleret af Runge kutta metode af 4. orden
	saveDataRK4(simplePendulum){

		this.A_RK4.push(simplePendulum.getA());
		this.A_vel_RK4.push(simplePendulum.getAVel());
	}

  //Gemmer alt
	saveData(Euler_pendulum,RK4_pendulum){
		this.saveDataTime()
		this.saveDataEuler(Euler_pendulum)
		this.saveDataRK4(RK4_pendulum)
	}

  //Conveterer alt info til en sting så den kan nemt sættes ind i maple
	dataToText(){
		this.frame_t=this.frame.toString();
		this.time_t=this.time.toString();
		this.A_euler_t=this.A_euler.toString();
		this.A_vel_euler_t=this.A_vel_euler.toString();

		this.A_RK4_t=this.A_RK4.toString();
		this.A_vel_RK4_t=this.A_vel_RK4.toString();
	}

  // Downloader alt i en txt fil
  downloadData(){
    this.data_list=["g["+g+"]",
      "m["+m+"]","l["+p_length+"]",
      "delta time["+dt+"]","frame["+p_data.frame_t+"]",
      "time["+p_data.time_t+"]","A_euler["+p_data.A_euler_t+"]",
      "A_vel_euler["+p_data.A_vel_euler_t+"]","A_RK4["+p_data.A_RK4_t+"]",
      "A_vel_RK4["+p_data.A_vel_RK4_t+"]"
    ]

    //Downloader datalisten i en fil med navnet data.txt
		saveStrings(this.data_list, 'data.txt');
  }
}
