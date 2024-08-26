import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

// Protect route, token-based authentication
export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    req.user = decoded // Assign the decoded token payload to req.user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      message: 'Authentication failed, token is invalid or expired',
    })
  }
}

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    // Fetch the user from the database using the decoded user ID from req.user
    const user = await userModel.findById(req.user._id)

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      })
    }

    if (user.role !== 1) {
      // Assuming 1 represents the admin role
      return res.status(403).send({
        success: false,
        message: 'Unauthorized access, admin only',
      })
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in admin middleware',
    })
  }
}
