# static-site-express

static-site-express is a simple Node.js based static-site generator that uses EJS and Markdown. Deploy your static site to Netlify or any platform to your liking. Suited for blogging, documentation sites, hobby projects, etc.

## Updates

### Generator update 2021
- All used npm modules will be updated to the newest versions. The code will be re-examined and improved too... DONE.
- Previously, I did not manage git very well (commit messages, semver, missing version tags etc.), so I decided to change version to 1.0.0 in the newest release... DONE.
- git flow will be used and proper semver usage from now on... DONE.
- Project will likely to be dockerized... DONE.
- Watch mode improvements... DONE.
- Possible breaking changes from the previous 2019 version will be documented... DONE.
- EJS templating, Netlify CMS, Netlify and Heroku support will be kept... DONE.
- I am planning to redesign the example website... IDEA DROPPED.
- I will create a minimalistic starter template without any styling and with a little dummy data... DONE.
- TODO: Documentation needs serious update.


## Changelog

### v1.0.0-alpha.2 (27 April 2021)

Incorrect configuration in docker-compose.yml
-fix: "generator" and "devserver" services share volume data. "devserver" is dependent on the "generator" service.

Under testing. I haven't experienced any errors in this version.

### v1.0.0-alpha.1 (25 April 2021)

- version re-started with *v1.0.0* (from *4.1.0*)
- Update npm dependencies to the newest versions
- Build script (partial) code refactoring, code styling

Correct EJS syntax error after EJS version update
- fix: From now on, EJS include directives should be in this format:

`<%- include ('partial/element-name') %>`

This is a **breaking change**, you should update your partials/templates!

Update build and watch scripts (using chokidar)
- update: build script content moved into a module (generator.js) to be used in a build and the chokidar-based watch scripts.

In 2019, chokidar was not watching file changes properly, thus the npm script was named "watch-exp". The default watch script is using nodemon. Both will be kept in the future.

Add flow types support and re-structure folders
- new: add Flow, a static type checker for JavaScript
- update: site generator source moved to src/, Babel will transpile the source into the lib/ folder where originally the source were
- update: website source is moved to website/ folder, necessary code changes are applied

Refactor site generator, code improvements, config changes
- update: package.json add dotenv package, update npm scripts
- update/add: refactor static site generator scripts, changes in methods, add types to code with flow, update/add comments to every method
- add: lang and month names options to site.config.js

Dockerize project
- new: read variables from .env file
- new: add Dockerfile, docker-compose file, .dockerignore

See: https://github.com/SalsaBoy990/static-site-express/releases



## Documentation


### Install static-site-express

You have to options:

a) Clone my repository:

````raw
git clone https://github.com/SalsaBoy990/static-site-express name-of-your-site
````

b) Use the 'Deploy to Netlify' button on the [example website](https://static-site-express.netlify.com/)


### Build your site locally

a) Build site from `./src` into `./public` folder:

````raw
npm run build
````

b) Serve website on `localhost:4000`:

````raw
npm run serve
````

c) Or you can watch for changes and trigger re-build with nodemon:

````raw
npm run watch
````

You need to add `sudo` before the commands on Linux system.

#### Important notes

- `nodemon` not trigger re-build on Linux on file changes (this behavior was experienced on Ubuntu 18.04 LTS Bionic Beaver)
- On Ubuntu, you can run `npm run watch-exp` command which uses the [chokidar](https://github.com/paulmillr/chokidar) package. *Experimental!*

Inspect `package.json` for more info. The `./lib` folder contains the JavaScript files used for building and serving the website. Check them out.

The `site.config.js` file contains some of the site properties (like site title, author, description, social media links etc.) that are used in the EJS partials.


### Register at Netlify and publish your website

- Register on [Netlify](https://www.netlify.com/), and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/) if you are unfamiliar with the procedure. You can publish your site in a minute.

- The `netlify.toml` configuration file contains important properties:

````raw
[build]
  base    = "/"
  publish = "public"
  command = "npm run build"
````

The base path, the build command, and the publish directory. You can keep those settings.

In the `_headers` file you can specify the HTTP headers and set Content Security Policy (CSP) rules for the Netlify server. Currently, CSP rules are not set because I don't know which domains you want to whitelist when you create your own website. I recommend you the [CSP Evaluator by Google](https://csp-evaluator.withgoogle.com/).

The `_redirects` file is currently empty. When you have a custom domain, you can make a redirect from *.netlify.com to your custom domain.

`sitemap.xml` is self-explanatory. Empty by default.
`robots.txt` is for search engines. Default settings:

```raw
# Disallow admin page
User-agent: *
Disallow: /admin/

# Disallow message-sent page
User-agent: *
Disallow: /message-sent/

# Rule 3
User-agent: *
Allow: /
````

For [Google Search Console](https://search.google.com/search-console/about) verification, you should have an HTML file from Google included in the root of your Netlify publish folder (in our case, public). The build script copies this file from `./src` to `./public`. Change line 87 in `./lib/build.js`: 

````javascript
ssg.copyRootFile('FILENAME.html', srcPath, distPath)
````

### Alternatively, you can use the Express server app on Heroku (not recommended)

A `Procfile` is already supplied for you with the command to build the site, and after that, to run the app server:

````raw
web: npm run heroku
````

You need improve security! I already set security headers with the `helmet` npm package, just 2 lines:

````javascript
// Set Security Headers.
const helmet = require('helmet')
app.use(helmet())
````

Also, you can set Content Security Policy (CSP) rules using the `helmet-csp` package.

Keep in mind that the contact form on the example site only works on Netlify!!

### Q&A

If you have a problem or a question about static-site-express, [open an issue here](https://github.com/SalsaBoy990/static-site-express/issues).


PS. The idea of making a static site generator in Node.js came from this good article by Douglas Matoso: [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22).

