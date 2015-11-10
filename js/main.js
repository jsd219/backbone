// var Vehicle = Backbone.Model.extend({

// 	idAttribute: "registrationNum",

// 	defaults: {
// 		color: "white"
// 	},

// 	validate: function(attrs) {
// 		if (!attrs.registrationNum) {
// 			return "Registration number required";
// 		}
// 	}
	
// });

// var Vehicles = Backbone.Collection.extend({
// 	model: Vehicle
// });

// var VehicleView = Backbone.View.extend({

// 	tagName: "li",

// 	className: "vehicle",

// 	initialize: function(options) {
// 		this.bus = options.bus;
// 	},

// 	attributes: function() {
// 		return {
// 			'data-color' : this.model.get('color')
// 		};
// 	},

// 	events: {
// 		"click button.delete": "onDelete"
// 	},

// 	onDelete: function() {
// 		//console.log('Deleting model', this.model);
// 		//vehicles.remove(this.model);
// 		this.remove();
// 	},

// 	render: function() {
// 		//console.log(this.model.get("title"));

// 		//this.$el.html(this.model.get("title") + '<button>Delete</button>');
// 		//this.$el.attr("id", this.model.get("registrationNum"));
// 		var template = _.template($("#vehiclesTemplate").html());
// 		var content = template(this.model.toJSON());
		
// 		this.$el.html(content);

// 		return this; 
// 	} 
// });

// var VehiclesView = Backbone.View.extend({

// 	tagName: "ul",

// 	initialize: function(options) {
// 		this.model.on("add", this.appendModel, this);
// 		//this.model.on("remove", this.onVehicleRemoved, this);
// 		this.bus = options.bus;
// 		this.bus.on('onAddModel', this.addModel, this);
		
// 	},

// 	addModel: function( vehicleRegNum ) {
// 		var newVehicle = new Vehicle({ registrationNum : vehicleRegNum });
// 		this.model.add(newVehicle);
// 	},

// 	appendModel: function(vehicle) {
// 		var newVehicleView = new VehicleView({ model: vehicle, bus: bus });

// 		this.$el.append(newVehicleView.render().$el);
// 	},

// 	// onVehicleRemoved: function(vehicle) {
// 	// 	console.log("li#" + vehicle.get("registrationNum"));
// 	// 	this.$("li#" + vehicle.get("registrationNum")).remove();
// 	// },

// 	render: function() {
// 		var self = this;

// 		this.model.each(function(vehicle){
// 			var vehicleView = new VehicleView({ model: vehicle, bus: bus });
// 			self.$el.append(vehicleView.render().$el);
// 		});
// 	} 
// });

// var NewVehicleView = Backbone.View.extend({

// 	className: "input",

// 	initialize: function(options) {
// 		this.bus = options.bus;
// 	},

// 	events: {
// 		'click input[type="submit"]' : 'onSubmit'
// 	},

// 	onSubmit: function() {
// 		var $input = this.$el.find('input[type="text"]');
// 		var newCar = $input.val();
// 		$input.val('');
// 		this.bus.trigger('onAddModel', newCar);

// 		//this.$el.append(vehicle.render().$el);
// 	},

// 	render: function() {
		
// 		var template = _.template($("#addNewVehicleTemplate").html());
// 		var content = template(this.model.toJSON());
// 		this.$el.html(content);
// 		//this.$el.html('<input type="text"><input type="submit" value="Add">');

// 		return this; 
// 	}
// });

// var bus = _.extend({}, Backbone.Events);

// var vehicles = new Vehicles([
// 	new Vehicle({ "registrationNum" : "XL1887", "color": "blue"}),
// 	new Vehicle({ "registrationNum" : "ZNP123", "color": "blue"}),
// 	new Vehicle({ "registrationNum" : "XUV456", "color": "red"})
// ]);

// var vehiclesView = new VehiclesView({ el: "#vehiclesList", model: vehicles, bus: bus });
// vehiclesView.render();

// var newVehicleView = new NewVehicleView({ el: "#addNewVehicleContainer", model: vehicles, bus: bus });
// newVehicleView.render();

var Vehicle = Backbone.Model.extend({
	idAttribute: "regNum",

	validate: function(attrs) {
		if(!attrs.regNum)
			return "Registration number required";
	}
});

var Car = Vehicle.extend({
	defaults: {
		color: "black"
	}
});

var Boat = Vehicle.extend({
	defaults: {
		color: "white"
	}
});

var Cars = Backbone.Collection.extend({
	model: Car,
});

var Boats = Backbone.Collection.extend({
	model: Boat,
});

var VehicleView = Backbone.View.extend({

	tagName: "li",

	className: "vehicle",

	attributes: function() {
		return {
			'data-color' : this.model.get('color')
		};
	},

	render: function() {
		var template = _.template($("#vehiclesTemplate").html());
		var content = template(this.model.toJSON());
		
		this.$el.html(content);

		return this; 
	} 
});

var VehiclesView = Backbone.View.extend({

	tagName: "ul",

	render: function() {
		var self = this;

		this.model.each(function(vehicle){
			var vehicleView = new VehicleView({ model: vehicle });
			self.$('#vehicleList').append(vehicleView.render().$el);
		});
	} 
});

var HomeView = Backbone.View.extend({
	render: function() {
		this.$el.html("<h1>This is the home page</h1>");

		return this;
	}
});

var cars = new Cars([
	new Car({ 'regNum': '1234', 'color': 'red' }),
	new Car({ 'regNum': '1434' }),
	new Car({ 'regNum': '1564' }),
	new Car({ 'regNum': '1247' }),
]);

var boats = new Boats([
	new Boat({ 'regNum': 'b1234', 'color' : 'blue' }),
	new Boat({ 'regNum': 'b1434' }),
	new Boat({ 'regNum': 'b1564' }),
	new Boat({ 'regNum': 'b1247' }),
]);

var AppRouter = Backbone.Router.extend({
	routes: {
		"" : "viewHome",
		"cars" : "viewCars",
		"boats" : "viewBoats",
		"*other" : "defaultRoute"
	},

	viewHome: function() {
		var view = new HomeView({ el: "#container" });
		view.render();
	},

	viewCars: function() {
		var view = new VehiclesView({ el: "#container", model: cars });
		view.render();
	},

	viewBoats: function() {
		var view = new VehiclesView({ el: "#container", model: boats });
		view.render();
	},

	defaultRoute: function() {

	}
});

var router = new AppRouter();
Backbone.history.start();

var NavView = Backbone.View.extend({
	events: {
		"click" : "onClick"
	},

	onClick: function(e){
		var $li = $(e.target);
		router.navigate($li.attr("data-url"), { trigger: true });
	}
});

var navView = new NavView({ el: "#nav" });


