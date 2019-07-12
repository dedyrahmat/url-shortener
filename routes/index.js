const express = require('express'),
Url = require("../models/Url")

const router = express.Router()

router.get("/:urlCode", async (request, response) => {
    try {
        const url = await Url.findOne({urlCode: request.params.urlCode})
        if(url) {
            return response.redirect(url.longUrl)
        } else {
            return response.status(404).json("No valid URL found")
        }
    } catch (error) {
        console.error(error.message)
        response.status(500).json("Server error.")
    }
})

module.exports = router