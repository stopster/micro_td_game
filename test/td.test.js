test("Canvas support", function(){
	var canvas = document.createElement("canvas");
	ok(canvas.getContext("2d"), "Canvas context should be available");
});

test("App namespace exists", function(){
	ok(window.App, "Namespace should be created");
});

test("Tower test", function(){
	var tower = new App.Tower(10, 12, 2);

	ok(tower, "tower isn't empty");
	equal(tower.target, null, "tower have no target yet.");

	var tower2 = new App.Tower(10, 12, 2);
	deepEqual(tower, tower2, "tower has no random values/methods.");

	var creep = new App.Creep(10, 12, 2);
	var creep2 = new App.Creep(10, 12, 2);
	notDeepEqual(creep, creep2);
});