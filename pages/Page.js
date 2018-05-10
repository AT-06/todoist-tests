class Page{

    open(path){
       // browser.newWindow(path);
        browser.url(path)
    }
}

module.exports = Page;
