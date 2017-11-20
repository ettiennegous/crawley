# Crawley
A multi platform site crawler that can self discover your website and crawl pages.

# Features #
* Works on Windows & OSX
* Can crawl using Net Requests or PhantomJS headless browser - Phantom feature currently broken :]

# Can be used for #
* SEO Audits
* Performance testing
* Regression testing / Find 500 errors
* Finding broken links

# Todo #
* Implement overall progress indicator and a progress bar, use OS progress indicators, 
https://electronjs.org/docs/api/browser-window
win.setProgressBar(progress[, options])
https://electronjs.org/docs/api/app
app.dock.setBadge(text)
* Put scroll bars on the table
* Implement crawling of non pages like JS, CSS, images etc
* Implement a framework react, angular or vue
* Refactor logger class and rename it
* Implement Serialization of results
* Implement workspaces that save progress and results
* Add sidebar to manage workspaces 
* Making it prettier, it looks like a website :\
* Implement radio for different types of crawling
* Implement export to CSV report
* Add counter of outbound like on a page on the report
* Add Type column to the report to support different file extensions