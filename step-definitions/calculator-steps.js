const chai = require('chai');
const { chaiImage } = require('chai-image');
var path = require('path');
chai.use(chaiImage);

const expect = require('chai').expect;

const fs = require("fs");


var webdriver=require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;

var imagePath;
var gotImg;
var localPath;

const delayTime = 1000;

module.exports = function () {
	this.Given(/^Open chrome browser and start application$/, function () {
		return driver.get('https://www.online-calculator.com/full-screen-calculator/');
	});
	
	this.When(/^I enter following values and operator$/, function (dataTable) {
        var strValue1=dataTable.raw()[0][1];
        var strValue2=dataTable.raw()[1][1];
        var strOperator=dataTable.raw()[2][1];
        
		elem = driver.findElement({ id: "fullframe" });
		elem.sendKeys(strValue1);		
		driver.sleep(delayTime);
		
		elem.sendKeys(strOperator);
		driver.sleep(delayTime);
		
		elem.sendKeys(strValue2);
		driver.sleep(delayTime);
		
		elem.sendKeys("=");
		driver.sleep(delayTime);
	});

	this.Then(/^I should be able to see result$/, function (table) {
		localPath = table.raw()[0][0];
		const now = new Date().getTime();
		const imgFileName = now + ".tiff";
		const imgFilePath = "./Reports/" + imgFileName;
		
		driver.manage().window().maximize();
		
		fullFrame = driver.manage().window().maximize();
		return  driver
	      .then(() => {
	          try {
	      		  fullFrame = driver.findElement({ id: "fullframe" });
	      		  takeScreenshot_verify(driver, fullFrame, imgFilePath, localPath);
	          }catch(e){return false}
	        })        
	    })
    
function takeScreenshot() {
    const fs = require("fs");
    var now = new Date().getTime();
   imagePath="./reports/"+now+".tiff";
   webElement=driver.findElement(By.id("canvas"));
    var base64Data = "";
    var location = {};
    var bulk = [];
    driver.then(_ => {
        webElement.getLocation().then(e => {
            location.x = e.x;
            location.y = e.y;
        });
        webElement.getSize().then(e => {
            location.height = e.height;
            location.width = e.width;
        });
        driver.manage().window().getSize().then(e => {
            location.browserHeight = e.height;
            location.broserWidth = e.width;
        });
    }).then(_ => {
        driver.takeScreenshot().then(data => {
            base64Data = data.replace(/^data:image\/png;base64,/, "");
        });
    }).then(_ => {
        const sizeLimit = 700000; // around 700kb
        const imgSize = base64Data.length;
        driver.executeScript(() => {
            window.temp = new Array;
        }).then(_ => {
            for (var i = 0; i < imgSize; i += sizeLimit) {
                bulk.push(base64Data.substring(i, i + sizeLimit));
            }
            bulk.forEach((element, index) => {
                driver.executeScript(() => {
                    window.temp[arguments[0]] = arguments[1];
                }, index, element);
            });
        });
    }).then(_ => {
        driver.executeScript(() => {
            var tempBase64 = window.temp.join("");
            var image = new Image();
            var location = arguments[0];
            image.src = "data:image/png;base64," + tempBase64;
            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.height = location.height;
                canvas.width = location.width;
                canvas.style.height = location.height + 'px';
                canvas.style.width  = location.width + 'px';
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, -location.x, -location.y);
                window.canvasData = canvas.toDataURL();
                window.temp = [];
            }
        }, location);
    }).then(_ => {
        return driver.executeScript(() => {
            var data = window.canvasData;
            window.canvasData = "";
            return data;
        }).then(data => {
            var tempData = data.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(imagePath, tempData, "base64");
        });
    });
}

function takeScreenshot_verify(driver, webElement, imagePath, localPath) {  
    var base64Data = "";
    var location = {};
    var bulk = [];
    driver.then(_ => {
        webElement.getLocation().then(e => {
            location.x = e.x;
            location.y = e.y;
        });
        webElement.getSize().then(e => {
            location.height = e.height;
            location.width = e.width;
        });
        driver.manage().window().getSize().then(e => {
            location.browserHeight = e.height;
            location.broserWidth = e.width;
        });
    }).then(_ => {
        driver.takeScreenshot().then(data => {
            base64Data = data.replace(/^data:image\/png;base64,/, "");
        });
    }).then(_ => {
        const sizeLimit = 700000; // around 700kb
        const imgSize = base64Data.length;
        driver.executeScript(() => {
            window.temp = new Array;
        }).then(_ => {
            for (var i = 0; i < imgSize; i += sizeLimit) {
                bulk.push(base64Data.substring(i, i + sizeLimit));
            }
            bulk.forEach((element, index) => {
                driver.executeScript(() => {
                    window.temp[arguments[0]] = arguments[1];
                }, index, element);
            });
        });
    }).then(_ => {
        driver.executeScript(() => {
            var tempBase64 = window.temp.join("");
            var image = new Image();
            var location = arguments[0];
            image.src = "data:image/png;base64," + tempBase64;
            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.height = location.height;
                canvas.width = location.width;
                canvas.style.height = location.height + 'px';
                canvas.style.width  = location.width + 'px';
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, -location.x, -location.y);
                window.canvasData = canvas.toDataURL();
                window.temp = [];
            }
        }, location);
    }).then(_ => {
        return driver.executeScript(() => {
            var data = window.canvasData;
            window.canvasData = "";
            return data;
        }).then(data => {
        	console.log(location);
            var tempData = data.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(imagePath, tempData, "base64");
            gotImg = fs.readFileSync(imagePath);
            verify_calculatedAmount('./Expected/'+localPath+'.tiff');
        });
    });
}
function verify_calculatedAmount(localFilePath) { 
	console.log(__dirname);
	
	const fs = require("fs");

	const expected = fs.readFileSync(localFilePath);
    
    return expect(gotImg).to.matchImage(expected);
    
}

}