import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validator/auth.validator.js";
import { googleCallback, login, register } from "../controllers/auth.controller.js";
import passport from "passport";

const router=Router()

router.post('/register',validateRegisterUser,register)

router.post('/login',validateLoginUser,login)

router.get('/google',passport.authenticate("google",{scope:["profile","email"]}))

router.get('/google/callback',        //auth code came on this api and it will exchange it with user's data with google
    passport.authenticate("google",{session:false}),googleCallback,)       // and data came in googleCallback controller req.user
export default router;












// Frontend
//    │
//    │ User clicks "Continue with Google"
//    ▼
// GET /api/auth/google
//    │
//    ▼
// passport.authenticate("google", { scope: ["profile", "email"] })
//    │
//    ▼
// Passport redirects the browser to Google's login page
//    │
//    ▼
// User logs in and gives permission
//    │
//    ▼
// Google redirects to
// /api/auth/google/callback
//    │
//    ▼
// passport.authenticate("google", { session: false })
//    │
//    ▼
// Passport exchanges the authorization code for:
// • accessToken
// • refreshToken
// • profile
//    │
//    ▼
// GoogleStrategy verify callback executes
// (accessToken, refreshToken, profile, done)
//    │
//    ▼
// Backend checks:
// • Does this user already exist?
//       ├─ Yes → Fetch user
//       └─ No  → Create user
//    │
//    ▼
// done(null, user)
//    │
//    ▼
// Passport stores the user in req.user
//    │
//    ▼
// Generate JWT
//    │
//    ▼
// Set JWT in cookie (or return it in the response)
//    │
//    ▼
// Redirect user back to the frontend
//    │
//    ▼
// User is now logged in