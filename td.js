var App = App || {};
(function(canvas, width, height, size, A, B, maxTowers, maxCreeps, startGold, towerCost, creepBounty){
	var	towers = [],
		toBuild = [],
		creeps = [],
		lastUpdated = 0,
		gameRunning = true,
		m = Math,
		ctx = canvas.getContext("2d"),
		counter = document.getElementById("counter");

	function getClosest(to, objects, initial){
		return objects.reduce(function(p, c, i){
			return m.sqrt(m.abs(to.x - c.x) + m.abs(to.y - c.y)) > m.sqrt(m.abs(to.x - p.x) + m.abs(to.y - p.y))? p: c;
		}, initial);
	}

	function extendByArgs(keys, args){
		for(var i=0, ii=keys.length; i<ii; this[keys[i]] = args[i++]){}
	}
	
	function Base(x, y, hp){
		extendByArgs.call(this, ["x", "y", "hp"], arguments);
		this.update = function(time){
			ctx.fillStyle = "blue";
			ctx.fillRect(this.x, this.y, 80, 50);
			ctx.fillStyle = "red";
			ctx.fillRect(this.x + 2, this.y + 2, (1-(500 - this.hp)/500)*80 - 4, 2);
		};
		this.changeHP = function(amount){
			if(amount){
				this.hp += amount;
			}

			return this.hp;
		};
	}

	function Tower(x, y, i, time){
		extendByArgs.call(this, ["x", "y", "i", "updated"], arguments);
		this.target = null;
		this.shootPoint = null;
		this.charged = 1;
		this.hp = 50;
		this.range = 50;
	}

	Tower.prototype.changeHP = function(amount){
		if(amount){
			this.hp += amount;
		}

		return this.hp;
	};

	Tower.prototype.update = function(time){
		if(time > this.updated + 700){
			this.attack();
			this.updated = time;
		}
		this.draw();
		this.charged += 0.15;
	};

	Tower.prototype.draw = function(time){
		var halfSize = m.floor(size/2);
		ctx.fillStyle = "#aaa";
		ctx.fillRect(this.x, this.y, size, size);
		ctx.fillStyle = "red";
		ctx.fillRect(this.x+1, this.y+1, (1-(50 - this.hp)/50)*size - 2, 3);
		if(this.shootPoint){
			ctx.strokeStyle = "rgba(255, 0, 0, " + (1 - this.charged).toFixed(2) + ")";
			ctx.beginPath();
			ctx.moveTo(this.x+halfSize, this.y+halfSize);
			ctx.lineTo(this.shootPoint.x + halfSize, this.shootPoint.y + halfSize);
			ctx.stroke();
		}
	};

	Tower.prototype.attack = function(){
		if(!this.target || this.target.hp<0){
				this.target = getClosest(this, creeps, {x: -1000, y: -1000});
			if(!this.target || this.target.x === -1000){
				this.target = null;
				return false;
			}
		}

		this.target.changeHP(-10);
		this.charged = 0;
		this.shootPoint = {x: this.target.x, y: this.target.y};

		return true;
	};

	function Creep(x, y, i){
		extendByArgs.call(this, ["x", "y", "i"], arguments);
		this.hp = 50;
		this.speed = 8;
		this.target = null;
		this.updated = 0;

		this.test = m.random();
	}

	Creep.prototype.changeHP = function(amount){
		if(amount){
			this.hp += amount;
		}
		if(this.hp<=0){
			startGold += creepBounty;
		}
		return this.hp;
	};

	Creep.prototype.near = function(target){
		return (m.abs(this.x - target.x) <= size) && (m.abs(this.y - target.y) <= size);
	};

	Creep.prototype.stepTo = function(target){
		if(!target || this.near(target)){
			return true;
		}
		var dx = target.x - this.x;
		var dy = target.y - this.y;
		var h = m.sqrt(dx*dx + dy*dy);
		this.x += dx/h * this.speed;
		this.y += dy/h * this.speed;
	};

	Creep.prototype.attack = function(){
		if(this.near(this.target)){
			this.target.changeHP(-5);
			return true;
		} else{
			return false;
		}
	};

	Creep.prototype.draw = function(time){
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, size, size);
		ctx.fillStyle = "red";
		ctx.fillRect(this.x+1, this.y+1, (1-(50 - this.hp)/50)*size - 2, 3);
	};

	Creep.prototype.update = function(time){
		if(time > this.updated + 300){
			this.target = getClosest(this, towers, base);
			this.stepTo(this.target);
			this.attack();
			this.updated = time;
		}
		this.draw(time);
	};

	var base = new Base(B[0], B[1], 500);

	var timeMark30 = 0;
	var timeMark500 = 0;
	var timeMark8000 = 0;
	var creepsInWave = 0;
	var relaxWave = false;
	var bg = ctx.createRadialGradient(150, 150, 30, 150, 150, 220);
	bg.addColorStop(0, "#ffef8d");
	bg.addColorStop(1, "white");

	window.requestAnimationFrame(function gameLoop(time){
		if(time - timeMark8000 > 8000){
			maxCreeps *= 1.4;
			maxTowers += 1;
			creepsInWave = 0;
			relaxWave = false;
			timeMark8000 = time;
		}
		if(creepsInWave < maxCreeps){
			if(time - timeMark500 > 300){
				creeps.push(new Creep(m.random()>0.5? width - size: 0, m.random()>0.5? height - size: 0, creeps.length));
				creepsInWave++;
				timeMark500 = time;
			}
		} else{
			relaxWave = true;
		}
		if(time - timeMark30 > 30){
			ctx.fillStyle = bg;
			ctx.fillRect(0, 0, width, height);
			for(var i=0, ii=toBuild.length; i<ii && ii<=maxTowers; i++){
				towers.push(new Tower(toBuild[i][0], toBuild[i][1], towers.length, time));
				startGold -= towerCost;
			}
			toBuild = [];

			if(base.hp > 0){
				base.update();
			} else{
				gameRunning = false;
			}
			for(i = 0, ii = towers.length; i<ii; towers[i++].update(time)){}

			for(i = 0, ii = creeps.length; i<ii; creeps[i++].update(time)){}


			for(i=0, ii=creeps.length, cleanedCreeps = []; i<ii; i++){
				if(creeps[i].hp>0){
					cleanedCreeps.push(creeps[i]);
				}
			}
			for(i=0, ii=towers.length, cleanedTowers = []; i<ii; i++){
				if(towers[i].hp>0){
					cleanedTowers.push(towers[i]);
				}
			}
			creeps = cleanedCreeps;
			towers = cleanedTowers;
			counter.innerHTML = startGold;

			timeMark30 = time;
		}

		if(gameRunning){
			window.requestAnimationFrame(gameLoop);
		} else{
			ctx.clearRect(0, 0, width, height);
			ctx.font = "bold 20px sans-serif";
			ctx.fillStyle = "red";
			ctx.fillText("Game over", width/2 - 50, height/2 - 10);
		}
	});
	canvas.addEventListener("click", function(e){
		startGold>=towerCost && towers.length < maxTowers && toBuild.push([e.offsetX, e.offsetY]);
	});

	// Export into App namespace
	App.Base = Base;
	App.Tower = Tower;
	App.Creep = Creep;
	App.towers = towers;
	App.creeps = creeps;
	App.base = base;
})(document.getElementById("canvas"), 300, 300, 20, [0, 0], [110, 115], 4, 1, 200, 100, 20);