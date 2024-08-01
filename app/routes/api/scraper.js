const express = require('express'),
router = express.Router(),
axios = require('axios'),
cheerio = require('cheerio');

router.get('/scraper', async(req, res, next) => {
    try {
        const url = req.query.q;
        if (!url) {
            return res.status(400).json({ error: 'Query parameter q is required' });
        }

        // Validasi URL untuk memastikan format yang benar
        const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
        if (!validUrl) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const experiences = [];
        $('div.details-container:has(h2.experience-sub-title)').each((i, element) => {
            const category = $(element).find('h2.experience-sub-title').text().trim();
            $(element).find('article').each((j, article) => {
                const skill = $(article).find('h3').text().trim();
                const level = $(article).find('p').text().trim();
                experiences.push({ category, skill, level });
            });
        });
        res.json(experiences);
    } catch (error) {
        console.error(error.response);
        if (error.code === 'ECONNREFUSED') {
            res.status(500).json({ error: 'Connection refused. The server might be down or the URL is incorrect.' });
        } else {
            res.status(500).json({ error: 'An unknown error occurred while scraping the website.' });
        }
    }
})

module.exports = router