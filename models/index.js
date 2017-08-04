var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging:false
});

const Page = db.define('page', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type:Sequelize.TEXT,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	},
	date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
	tags: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	}
}, {
	hooks: {
  		beforeValidate: function(page){
  			function generateUrlTitle (title) {
			  if (title) {
			    // Removes all non-alphanumeric characters from title
			    // And make whitespace underscore
			    return title.replace(/\s+/g, '_').replace(/\W/g, '');
			  } else {
			    // Generates random 5 letter string
			    return Math.random().toString(36).substring(2, 7);
			  }
			}
			function joinString(tags){
				return tags.split(' ');
			}
			page.urlTitle = generateUrlTitle(page.title);
			page.tags = joinString(String(page.tags));
  		},

  		afterUpdate: function(page){
  			function generateUrlTitle (title) {
			  if (title) {
			    // Removes all non-alphanumeric characters from title
			    // And make whitespace underscore
			    return title.replace(/\s+/g, '_').replace(/\W/g, '');
			  } else {
			    // Generates random 5 letter string
			    return Math.random().toString(36).substring(2, 7);
			  }
			}
			page.urlTitle = generateUrlTitle(page.title);
			console.log('updated--' +page)
  		}
  	},
	getterMethods: {
	    route() {
	      return '/wiki/' + this.urlTitle
	    }
  	}
})

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		},
		unique:true,
		allowNull: false
	}
})

Page.belongsTo(User, {as:'author'});

module.exports = {
  db,
  User,
  Page
};