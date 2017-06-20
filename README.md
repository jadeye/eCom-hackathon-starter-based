# eCom-hackathon-starter-based<br />
This is a working `MEAN Stack` eCommerce shop based on <a>https://github.com/sahat/hackathon-starter</a>.<br />
The shop can be seen functional online:<br />
<a>http://www.eatorganicvegetable.com/</a>.<br />
This is a free <a href="https://www.heroku.com/">heroku</a> app so it might take a few seconds to load....

In order for this app to work either localy or online,<br />
An `.env.configs` must be created at the root of the project with all your config params, eg:.<br />
<ul>
<li>MONGODB_URI=mongodb://localhost:27017/test - for a local mongodb only (unless specified otherwise by host)</li>
<li>Each social login you wish to use needs to have the following:</li>
<ol style="list-style-position: outside;">
<li>FACEBOOK_ID= (your fb app id)</li></li>
<li>FACEBOOK_SECRET= (your app secret)</li>
<li>FACEBOOK_CALLBACK_URL=/auth/facebook/callback</li>
</ol>
</ul>
