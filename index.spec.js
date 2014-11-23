describe("MBATakeawayTests", function () {

    describe("index", function () {

    var ptor;

    function testSaveProfileChanges(){
            expect(ptor.getCurrentUrl()).toContain('profile/#');
            browser.sleep(1000);
            ptor.findElement(protractor.By.name('firstName')).clear();
            ptor.findElement(protractor.By.name('firstName')).sendKeys('firstNameTest');
            browser.sleep(4000);
            ptor.findElement(protractor.By.id('editSubmit')).click();
            browser.sleep(6000);
            expect(element(by.id('edit-profile-success')).isPresent()).toBe(true);
    }

    function getTime(){
        var d = new Date();
        var n = d.getTime();
        return n;
    }
    beforeEach(function(){
        ptor = protractor.getInstance();
        return browser.ignoreSynchronization = true;
    });

    it("should register to MBATakeaway", function () {
             browser.driver.get('http://localhost:8000/accounts/register/##school-stats');
             var x = getTime();
             browser.sleep(4000);
			 element.all(by.repeater('x in availableSchools')).get(1).click();
             browser.sleep(4000);
             browser.driver.findElement(by.name('firstname')).sendKeys('testUserFirstName'+x);
             browser.driver.findElement(by.name('lastname')).sendKeys('testUserLastName'+x);
             browser.driver.findElement(by.name('email')).sendKeys('testUser'+x+'@gmail.com');
             browser.driver.findElement(by.name('username')).sendKeys('testUser'+x);
             browser.driver.findElement(by.name('password1')).sendKeys('abc123');
             browser.driver.findElement(by.name('password2')).sendKeys('abc123');
             browser.driver.findElement(by.name('school')).sendKeys('testSchool');
             element(by.cssContainingText('option', 'Full Time MBA')).click();
             browser.sleep(4000);
             browser.driver.findElement(by.id('register-btn')).click();
             browser.sleep(4000);
             expect(browser.driver.getCurrentUrl()).toMatch(/\/profile/);
         });

        it("should login to MbaTakeaway", function () {
            browser.driver.get('http://localhost:8000');
            browser.driver.findElement(by.name('Username')).sendKeys('ravi');
            browser.driver.findElement(by.name('Password')).sendKeys('1234');
            browser.driver.findElement(by.id('signin')).click();
            expect(browser.driver.getCurrentUrl()).toMatch(/\/takeaways/);
        });

        it("edit the course name", function () {
            //edit the course name
            browser.sleep(4000);
            ptor.findElement(protractor.By.id('edit-session-link_1')).click();
            browser.sleep(4000);
            var editSession = ptor.findElement(protractor.By.id('editedSessionName'));
            editSession.clear();
            editSession.sendKeys('courseNameEdited');
            browser.sleep(4000);
            ptor.findElement(protractor.By.id('updateSession')).click();
            browser.sleep(6000);
        });



        it("should be able to select courses and view takeaway", function () {

            var list = element.all(by.repeater('courseInstance in availableCourses.results'));

            browser.sleep(4000);
            expect(element(by.id('takeaway-container')).isPresent()).toBe(true);
            expect(element(by.id('takeaway-list1')).isPresent()).toBe(true);
            /*browser.driver.findElement(by.id('newTakeaway')).click();
            browser.driver.findElement(by.id('takeAwayClose')).click();*/

            //expect the leaderboard
            expect(element(by.id('leaderBoardButton')).isPresent()).toBe(true);

        }); 

        it("edit the course name", function () {
            //add a comment
            browser.sleep(4000);
            ptor.findElement(protractor.By.id('commentButton')).click();
            browser.sleep(4000);
            browser.driver.findElement(by.id('comment')).sendKeys('testComment');
            browser.sleep(4000);
            browser.driver.findElement(by.id('saveComment')).click();
            browser.sleep(4000);
        });


        it("load the profile page and test the edit profile save option", function () {
            //do the login here
            browser.driver.get('http://localhost:8000/profile');
            expect(browser.element(by.id('edit-profile')).isPresent()).toBe(true);
            expect(element(by.id('change-password')).isPresent()).toBe(true);
            expect(element(by.id('selcet-classes')).isPresent()).toBe(true);
            //edit the profile and save changes
            var elem = ptor.findElement(protractor.By.id('edit-profile'));
            elem.click().then(
            testSaveProfileChanges()
            );
        }); 
  });
});