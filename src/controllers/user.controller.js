import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    // get user details from frontend 
    // validation - not empty || check all form information
    // check a user not already exists.
    // email || username is unique.
    // avatar is required or check for images.
    // upload them to cloudinary, avatar.
    // create user object - create entry in db.
    // remove password and refresh token field from response.
    // check for user creation.
    // return response.

    const { username, fullName, password, email } = req.body;
    console.log(`email data ${email}`);

    if ([fullName, username, password, email].some((field) => field?.trim() === "")) {
        throw new ApiError(404, "All field are required")
    }
    const existeduser = User.findOne({
        $or: ({ username }, { email })
    });

    if (existeduser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user.id).select("-password -refreshToken")

    if (!createUser) {
        throw ApiError(500, "Something Went wrong while Registring the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "user Registerd Successfully")
    )
})

export { registerUser };