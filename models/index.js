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
		validate: {
			isUrl: true
		},
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
    }
}, {
	getterMethods: {
	    route() {
	      return '/wikie/' + this.urlTitle
	    }
  	}/*,
  	hooks: {
  		beforeValidate: function generateUrlTitle (this.title) {
		  if (title) {
		    // Removes all non-alphanumeric characters from title
		    // And make whitespace underscore
		    return this.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
		  } else {
		    // Generates random 5 letter string
		    return this.urlTitle = Math.random().toString(36).substring(2, 7);
		  }
		}
  	}*/
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

module.exports = {
  db,
  User,
  Page
};