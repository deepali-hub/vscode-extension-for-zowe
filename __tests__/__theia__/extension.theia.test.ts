/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as driverFirefox from "../../src/theia/extension.theiaFirefox";
import * as driverChrome from "../../src/theia/extension.theiaChrome";
import { sleep } from "@zowe/cli";

const TIMEOUT = 45000;
const SLEEPTIME = 10000;
const SHORTSLEEPTIME  = 2000;
declare var it: any;
const expect = chai.expect;
chai.use(chaiAsPromised);

describe("Add Default Profile", () => {

    before(async () => {
        await driverFirefox.openBrowser();
        await sleep(SHORTSLEEPTIME);
        await driverFirefox.OpenTheiaInFirefox();
        await sleep(SLEEPTIME);
        await driverFirefox.clickOnZoweExplorer();
    });

    it("should open Zowe Explorer and find the Favorites node", async () => {
        const favoriteLink = await driverFirefox.getFavouritesNode();
        expect(favoriteLink).to.equal("Favorites");
    }).timeout(TIMEOUT);

    it("should find the Data Sets node", async () => {
        const datasetLink = await driverFirefox.getDatasetNode();
        expect(datasetLink).to.equal("DATA SETS");
    }).timeout(TIMEOUT);

    it("should find the USS node", async () => {
        const ussLink = await driverFirefox.getUssNode();
        expect(ussLink).to.equal("UNIX SYSTEM SERVICES (USS)");
    }).timeout(TIMEOUT);

    it("should find the Jobs node", async () => {
        const jobsLink = await driverFirefox.getJobsNode();
        expect(jobsLink).to.equal("JOBS");
    }).timeout(TIMEOUT);

    it("Should Add Default Profile in DATA SETS", async () => {
        await driverFirefox.clickOnDatasetsPanel();
        await driverFirefox.clickOnAddSessionInDatasets();
        await driverFirefox.addProfileDetails("DefaultProfile");
        const datasetProfile = await driverFirefox.getDatasetsDefaultProfilename();
        expect(datasetProfile).to.equal("DefaultProfile");
    });

    it("Should Default profile visible in USS", async () => {
        await driverFirefox.refreshBrowser();
        await sleep(SLEEPTIME);
        await driverFirefox.clickOnDatasetsTab();
        await driverFirefox.clickOnUssTab();
        const ussProfile = await driverFirefox.getUssDefaultProfilename();
        expect(ussProfile).to.equal("DefaultProfile");
    });

    it("Should Default profile visible in JOBS", async () => {
        await driverFirefox.clickOnUssTabs();
        await driverFirefox.clickOnJobsTab();
        const jobsProfile = await driverFirefox.getJobsDefaultProfilename();
        expect(jobsProfile).to.equal("DefaultProfile");
    });

    after(async () => driverFirefox.closeBrowser());
});

describe("Add Profiles", () => {

    before(async () => {
        await driverFirefox.openBrowser();
        await sleep(SHORTSLEEPTIME);
        await driverFirefox.OpenTheiaInFirefox();
        await sleep(SLEEPTIME);
        await driverFirefox.clickOnZoweExplorer();
    });

    it("Should Add Profile in DATA SETS", async () => {
        await driverFirefox.clickOnDatasetsPanel();
        await driverFirefox.clickOnAddSessionInDatasets();
        await driverFirefox.addProfileDetails("TestSeleniumProfile");
        await sleep(SHORTSLEEPTIME);
        const datasetProfile = await driverFirefox.getDatasetsProfilename();
        expect(datasetProfile).to.equal("TestSeleniumProfile");
    });

    it("Should Add Existing Profile in USS", async () => {
        await driverFirefox.clickOnDatasetsTab();
        await driverFirefox.clickOnUssTab();
        await driverFirefox.clickOnUssPanel();
        await driverFirefox.clickOnAddSessionInUss();
        await driverFirefox.addProfileDetailsInUss("TestSeleniumProfile");
        const ussProfile = await driverFirefox.getUssProfilename();
        expect(ussProfile).to.equal("TestSeleniumProfile");
    });

    it("Should Add Existing Profile in JOBS", async () => {
        await driverFirefox.clickOnUssTabs();
        await driverFirefox.clickOnJobsTab();
        await driverFirefox.clickOnJobsPanel();
        await driverFirefox.clickOnAddSessionInJobs();
        await driverFirefox.addProfileDetailsInJobs("TestSeleniumProfile");
        const jobsProfile = await driverFirefox.getJobsProfilename();
        expect(jobsProfile).to.equal("TestSeleniumProfile");
    });

    after(async () => driverFirefox.closeBrowser());
});

describe("Add Profile to Favorites", () => {
    before(async () => {
        await driverChrome.openBrowser();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.OpenTheiaInChrome();
        await sleep(SLEEPTIME);
        await driverChrome.clickOnZoweExplorer();
    });

    it("Should Add Profile to Favorites under DATA SETS", async () => {
        await driverChrome.addProfileToFavoritesInDatasets();
        await driverChrome.clickOnFavoriteTabInDatasets();
        const favoriteProfile = await driverChrome.getFavoritePrfileNameFromDatasets();
        expect(favoriteProfile).to.equal("TestSeleniumProfile");
    });

    it("Should Add Profile to Favorites under USS", async () => {
        await driverChrome.clickOnDatasetsTab();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnUssTabs();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.addProfileToFavoritesInUss();
        await driverChrome.clickOnFavoriteTabInUss();
        await sleep(SHORTSLEEPTIME);
        const favoriteProfile = await driverChrome.getFavoritePrfileNameFromUss();
        expect(favoriteProfile).to.equal("TestSeleniumProfile");
    });

    it("Should Add Profile to Favorites under JOBS", async () => {
        await driverChrome.clickOnUssTabs();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnJobsTab();
        await driverChrome.addProfileToFavoritesInJobs();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnFavoriteTabInJobs();
        await sleep(SHORTSLEEPTIME);
        const favoriteProfile = await driverChrome.getFavoritePrfileNameFromJobs();
        expect(favoriteProfile).to.equal("TestSeleniumProfile");
    });

    after(async () => driverChrome.closeBrowser());
});

describe("Remove Profile from Favorites", () => {
    before(async () => {
        await driverChrome.openBrowser();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.OpenTheiaInChrome();
        await sleep(SLEEPTIME);
        await driverChrome.clickOnZoweExplorer();
    });

    it("Should Remove Profile from Favorites under DATA SETS", async () => {
        await driverChrome.clickOnFavoriteTabInDatasets();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnFavoriteProfileInDatasets();
        await driverChrome.removeFavoriteProfileFromDatasets();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.refreshBrowser();
        await sleep(SLEEPTIME);
        const favoriteProfile = await driverChrome.verifyRemovedFavoriteProfileInDatasets();
        expect(favoriteProfile).to.equal(true);
    });

    it("Should Remove Profile from Favorites under USS", async () => {
        await driverChrome.clickOnDatasetsTab();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnUssTabs();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnFavoriteTabInUss();
        await driverChrome.clickOnFavoriteProfileInUss();
        await driverChrome.removeFavoriteProfileFromUss();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.refreshBrowser();
        await sleep(SLEEPTIME);
        const favoriteProfile = await driverChrome.verifyRemovedFavoriteProfileInUss();
        expect(favoriteProfile).to.equal(true);
    });

    after(async () => driverChrome.closeBrowser());
});

describe("Hide Profile", () => {
    before(async () => {
        await driverChrome.openBrowser();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.OpenTheiaInChrome();
        await sleep(SLEEPTIME);
        await driverChrome.clickOnZoweExplorer();
    });

    it("Should Hide Profile from USS", async () => {
        await driverChrome.clickOnDatasetsTab();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnUssTabs();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.hideProfileInUss();
        await sleep(SHORTSLEEPTIME);
        const hiddenProfile = await driverChrome.verifyProfileIsHideInUss();
        expect(hiddenProfile).to.equal(true);
    });
    it("Should Hide Profile from JOBS", async () => {
        await driverChrome.clickOnUssTabs();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.clickOnJobsTab();
        await driverChrome.hideProfileInJobs();
        await sleep(SHORTSLEEPTIME);
        const hiddenProfile = await driverChrome.verifyProfileIsHideInJobs();
        expect(hiddenProfile).to.equal(true);
    });

    after(async () => driverChrome.closeBrowser());
});

describe("Delete Profiles", () => {
    before(async () => {
        await driverChrome.openBrowser();
        await sleep(SHORTSLEEPTIME);
        await driverChrome.OpenTheiaInChrome();
        await sleep(SLEEPTIME);
        await driverChrome.clickOnZoweExplorer();
    });

    it("Should Delete Default Profile from DATA SETS", async () => {
        const deleteConfrmationMsg = await driverChrome.deleteDefaultProfileInDatasets();
        expect(deleteConfrmationMsg).to.equal("Profile DefaultProfile was deleted.");
    });

    it("Should Delete Profile from DATA SETS", async () => {
        await driverChrome.closeNotificationMessage();
        const deleteConfrmationMsg = await driverChrome.deleteProfileInDatasets();
        expect(deleteConfrmationMsg).to.equal("Profile TestSeleniumProfile was deleted.");
    });

    after(async () => driverChrome.closeBrowser());
});
