const { mongoose } = require("../Connect/mogoose_connect");
const validator = require("validator");
const jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail
    },
    unique: true
  },
  country: {
    type: String,
    required: true,
      },
  state: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6    
  },

  tokens: [
    {
        acess: {
        type: String,
        required: false
      },
      token: {
        type: String,
        required: false
      }
    }
  ]
});

userSchema.methods.generateAuthtoken = function() {
  var user = this;
  var acess = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),name:user.name ,acess:user.acess},process.env.JWT_SECRET).toString();

  user.tokens= user.tokens.concat({acess,token});

  return user.save().then(()=>{
      return token;
  });
};

userSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try{
        decoded= jwt.verify(token,process.env.JWT_SECRET);
    } 
    catch(e){
        return new Promise((resolve,reject)=>{
            reject(e);
        });
    }
    return User.findOne({
        '_id': decoded._id,
        'name': decoded.name
    });
  
    

  };



var User = mongoose.model("Userdata", userSchema);

module.exports = { User};
