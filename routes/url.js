const express = require("express"),
  validUrl = require("valid-url"),
  shortID = require("shortid"),
  config = require("config");
Url = require("../models/Url");

const router = express.Router();

// @route POST to api/url/shorten
router.post("/shorten", async (request, response) => {
  let { longUrl } = request.body;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    return response.status(401).json("Invalid base URL");
  }

  const urlCode = shortID.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        response.json(url);
      } else {
        let shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        response.json(url);
      }
    } catch (error) {
      console.error(error.message);
      response.status(500).json("Server error");
    }
  } else {
    response.status(401).json("Invalid url");
  }
});

module.exports = router;
