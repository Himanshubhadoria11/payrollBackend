const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static getUser = async (req, res) => {
    try {
      const {id} = req.userdata;
      const data = await UserModel.findById(id)
      res.status(200).json(data)
    } catch (error) {
      //console.log(error)
      res.status(400).json({ status: "failed", message: error.message })
    }
  }

  static registerUser = async (req, res) => {
    try {
      const { name, email, password, confirmpassword, phone, role } = req.body;
      const user = await UserModel.findOne({ email: email });
      //console.log(user)
      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "Email Already Exists" });
      } else {
        if (name && email && password && confirmpassword && phone && role) {
          if (password === confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              role: role,
              phone: phone,
            });
            await result.save();
            //Generate Token

            const token = jwt.sign(
              { userId: result._id, email: result.email },
              process.env.JWT_SECRET
            );
            //console.log(token)
            res.status(201).cookie("token", token).json({
              status: "success",
              message: "Thanks for Registration",
              token: token,
            });
          } else {
            res
              .status(401)
              .json({
                status: "failed",
                message: "Password and Confirm password do not Match",
              });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "All Fields Are Required" });
        }
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "failed", message: "Internal server problem" });
    }
  };

  static login = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password, role } = req.body; //input name="email"
      if (email && password && role) {
        const user = await UserModel.findOne({ email: email });
        //console.log(user)
        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) {
            
            if (user.role == role) {
              const token = jwt.sign({ ID: user._id }, process.env.JWT_SECRET);
              // console.log(token)
              res.cookie("token", token);
              res
                .status(201)
                .json({
                  status: "success",
                  message: "Login Ok Report",
                  token: token,
                  user,
                });
            } else {
              res
                .status(401)
                .json({
                  status: "failed",
                  message: "User with this role not found",
                });
            }
          } else {
            res
              .status(401)
              .json({
                status: "failed",
                message: "Email or password are not same",
              });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "You are not a register user" });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "All field are required" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async (req, res) => {
    try {
        const { name, image, email,role } = req.Udata
        res.render("profile", { n: name, i: image, e: email,role:role })
    } catch (error) {
        console.log(error)
    }
}


static changePassword = async (req, res) => {
  try {
      const { id } = req.Udata;
      //console.log(req.body)
      const { op, np, cp } = req.body;
      if (op && np && cp) {
          const user = await UserModel.findById(id);
          const isMatched = await bcrypt.compare(op, user.password);
          //console.log(isMatched)
          if (!isMatched) {
              req.flash("error", "Current password is incorrect ");
              res.redirect("/profile");
          } else {
              if (np != cp) {
                  req.flash("error", "Password does not match");
                  res.redirect("/profile");
              } else {
                  const newHashPassword = await bcrypt.hash(np, 10);
                  await UserModel.findByIdAndUpdate(id, {
                      password: newHashPassword,
                  });
                  req.flash("success", "Password Updated successfully ");
                  res.redirect("/");
              }
          }
      } else {
          req.flash("error", "ALL fields are required ");
          res.redirect("/profile");
      }
  } catch (error) {
      console.log(error);
  }
};



// static updateProfile= async (req, res) => {
//   try {
//       const { name, email } = req.body
//       const data = await UserModel.findByIdAndUpdate(req.params.id, {
//           name: name,
//           email: email
         
//       })
//       res.status(200).json(data)

//   } catch (error) {
//       console.log(error)
//       res.status(500).json({error:error});
  
//   }
// }
static updateProfile = async (req, res) => {
  try {
    const { name, email} = req.body;
    const userId= req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing in request parameters" });
    }

    const data = await UserModel.findByIdAndUpdate(userId, { name, email });
    res.status(200).json({ message: "Profile updated successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal Server Error Occured" });
  }
};


  static logout = async (req, res) => {
    try {
      res
      .status(201)
      .cookie("token","", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success:true,
        message:"Logged Out Successfully.",

      });
    } catch (error) {
      // console.log(error)
      res.status(400).json({ status: "failed", message: error.message });
    }
  };
}

module.exports = UserController;
