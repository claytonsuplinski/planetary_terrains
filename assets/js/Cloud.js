function Cloud(name){
	this.name = name;
	this.terrain_points = [];
	this.lat = 0;
	this.lon = 0;
	this.rad = 1;
	
	this.max = 0;
	this.min = 999;
	
	this.load_terrain();
	this.init_buffers();
	
	this.set_texture("./assets/textures/"+this.name.toLowerCase()+".png");
	this.set_shader(basic_shader);
};

Cloud.prototype = new GraphicsObject();

Cloud.prototype.load_terrain = function(){
	this.terrain_points = [];
	var self = this;
	$.ajax({
		url: './assets/terrain/'+this.name.toLowerCase()+'.txt',
		dataType: 'text',
		async: false,
		success: function(data){
			var lines = data.split('\n');
			lines.forEach(function (line){
				var line_arr = line.split(',').map(function (item){
					return parseInt(item)/500 + 5.4;
				});
				line_arr.pop();
				self.terrain_points.push(line_arr.reverse());
			});
			
			self.lat = self.terrain_points.length-1;
			self.lon = self.terrain_points[0].length;
			
			self.load_vertices();
		}
	});
};

Cloud.prototype.load_vertices = function(){
    var tmp_vertices = [];
    var tmp_normals = [];
    var tmp_textures = [];
    var tmp_indices = [];
    for (var latNumber = 0; latNumber <= this.lat; latNumber++) {
        var lat_delta = latNumber / this.lat;
        var theta = lat_delta * Math.PI;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);
        for (var longNumber = 0; longNumber <= this.lon; longNumber++) {
           var lon_delta = longNumber / this.lon;
           var phi = lon_delta * Math.PI * 2;
           var sinPhi = Math.sin(phi);
           var cosPhi = Math.cos(phi);
           var x = cosPhi * sinTheta;
           var y = cosTheta;
           var z = sinPhi * sinTheta;
           var u = 1 - lon_delta;
           var v = lat_delta;
           tmp_normals.push(x);
           tmp_normals.push(y);
           tmp_normals.push(z);
           tmp_textures.push(u);
           tmp_textures.push(v);
		   if(this.terrain_points[latNumber][longNumber%this.lon] > this.max){
				this.max = this.terrain_points[latNumber][longNumber%this.lon];
		   }
		   if(this.terrain_points[latNumber][longNumber%this.lon] < this.min){
				this.min = this.terrain_points[latNumber][longNumber%this.lon];
		   }
           tmp_vertices.push(this.terrain_points[latNumber][longNumber%this.lon] * x);
           tmp_vertices.push(this.terrain_points[latNumber][longNumber%this.lon] * y);
           tmp_vertices.push(this.terrain_points[latNumber][longNumber%this.lon] * z);

           if(latNumber < this.lat && longNumber < this.lon){
              var first = (latNumber * (this.lon + 1)) + longNumber;
              var second = first + this.lon + 1;
              tmp_indices.push(first);
              tmp_indices.push(second);
              tmp_indices.push(first + 1);
              tmp_indices.push(second);
              tmp_indices.push(second + 1);
              tmp_indices.push(first + 1);
           }
        }
    }
    this.v = tmp_vertices;
    //this.vertexNormals = tmp_normals;
    this.vt = tmp_textures;
    this.vertex_indices = tmp_indices;
};
