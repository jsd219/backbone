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

	tagName: "li",

	render: function() {
		this.$("#vehicleList").html("This is the home page");

		return this;
	}
});

var cars = new Cars([
	new Car({ 'title': 'Car1', 'regNum': '1234', 'color': 'red' }),
	new Car({ 'title': 'Car2', 'regNum': '1434' }),
	new Car({ 'title': 'Car3', 'regNum': '1564' }),
	new Car({ 'title': 'Car4', 'regNum': '1247' }),
]);

var boats = new Boats([
	new Boat({ 'title': 'Boat1', 'regNum': 'b1234', 'color' : 'blue' }),
	new Boat({ 'title': 'Boat2', 'regNum': 'b1434' }),
	new Boat({ 'title': 'Boat3', 'regNum': 'b1564' }),
	new Boat({ 'title': 'Boat4', 'regNum': 'b1247' }),
]);

var AppRouter = Backbone.Router.extend({
	routes: {
		"" : "viewHome",
		"cars" : "viewCars",
		"boats" : "viewBoats",
		"*other" : "defaultRoute"
	},

	viewHome: function() {
		var view = new HomeView();
		this.loadView(view);
	},

	viewCars: function() {
		var view = new VehiclesView({ model: cars });
		this.loadView(view);
	},

	viewBoats: function() {
		var view = new VehiclesView({ model: boats });
		this.loadView(view);
	},

	defaultRoute: function() {

	},

	loadView: function(newView) {
		
		if(this.currentView)
		this.currentView.remove();
		
		$("#container").html(newView.render().$el);
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


