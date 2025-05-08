describe("UBC Campus Explorer tests (FHD desktop)", () => {
    let numOfRooms = 0;
    let roomsPerPage = 0;
    const getRoomIndices = () => {
        return cy
            .get('[data-testid="room-index-box"]')
            .invoke("text")
            .then(text => text.split(" ")
            .map(word => Number(word))
            .filter(num => !isNaN(num)));
    };
    const getSearchBar = () => {
        return cy
            .get('[data-testid="search-bar"]')
            .find('input[type="text"]')
            .first();
    };
    before(() => {
        cy.visit("/");
        // num. of rooms is presumed to be the last number in the text of room-index-box
        // num. of rooms per page is the number before that (i.e pattern is always "x - y of z", "from x to y of z", etc.)
        // if invalid then:
        //     - it will be very apparent
        //     - most likely a server issue
        getRoomIndices().then(([x, y, z]) => {
            roomsPerPage = Number(y);
            numOfRooms = Number(z);
        });
    });
    beforeEach(() => {
        cy.viewport(1920, 1080); // most pp use this
        cy.visit("/");
    });
    it("check critical elements exist", () => {
        cy.get('[data-testid="header-icon"]'); // ubc logo
        cy.get('[data-testid="header-title"]').contains(/^UBC Campus Explorer$/i); // title
        // cy.get('[data-testid="header-github-link"]'); // github icon
        cy.get('[data-testid="ubcmap"]'); // map
        cy.get('[data-testid="search-bar"]'); // search bar
        cy.get('[data-testid="order-button"]').contains("⇅"); // order button
        for (const sign of ["<<", "<", ">", ">>"]) {
            cy.get(`[data-testid="change-display-button-${sign}"]`).contains(sign); // pagination buttons
        }
        cy.get('[data-testid="room-index-box"]').then((text) => {
            cy.get('[data-testid="room-info-box"]').should("have.length", roomsPerPage);
        });
    });
    // will break if the number of pages is less than 2 (which means that something else is wrong anyway)
    it("check pagination buttons", () => {
        const verifyRoomIndices = (expectedFirstIndex, expectedLastIndex) => {
            getRoomIndices().then(([x, y, z]) => {
                const firstIndex = Number(x);
                const lastIndex = Number(y);
                expect(x).to.equal(expectedFirstIndex);
                expect(y).to.equal(expectedLastIndex);
                expect(Number(z)).to.equal(numOfRooms); // check if on last page
                expect(lastIndex - firstIndex + 1).to.be.at.most(roomsPerPage); // check if on last page
                cy.get('[data-testid="room-info-box"]').should("have.length", lastIndex - firstIndex + 1);
            });
        };
        cy.get('[data-testid="change-display-button-<<"]').click(); // go to first page
        verifyRoomIndices(1, roomsPerPage);
        cy.get('[data-testid="change-display-button-<"]').click(); // still on first page
        verifyRoomIndices(1, roomsPerPage);
        cy.get('[data-testid="change-display-button->"]').click(); // go to second page
        verifyRoomIndices(roomsPerPage + 1, 2 * roomsPerPage);
        let lastPageIndex = Math.floor(numOfRooms / roomsPerPage) * roomsPerPage + 1;
        if (lastPageIndex > numOfRooms) {
            lastPageIndex = Math.max(1, lastPageIndex - roomsPerPage); // adjust for 1-index
        }
        cy.get('[data-testid="change-display-button->>"]').click(); // go to last page
        verifyRoomIndices(lastPageIndex, numOfRooms);
        cy.get('[data-testid="change-display-button->"]').click(); // still on last page
        verifyRoomIndices(lastPageIndex, numOfRooms);
        cy.get('[data-testid="change-display-button-<"]').click(); // second-to-last page
        verifyRoomIndices(lastPageIndex - roomsPerPage, lastPageIndex - 1);
    });
    it("check impossible building name", () => {
        getSearchBar().type("no building have this name kek");
        getRoomIndices().then(([x, y, z]) => {
            expect(Number(x)).to.equal(1); // check if on last page
            expect(Number(y)).to.equal(0); // check if on last page
            expect(Number(z)).to.equal(0); // check if on last page
        });
        cy.get('[data-testid="room-info-box"]').should("not.exist");
    });
    it('sorts rooms by capacity descending', () => {
        cy.get('[data-testid="order-button"]').click();
        cy.contains('capacity (descending)').click();
        const capacities = [];
        const collectCapacities = (page = 1) => {
            cy.get('[data-testid="room-capacity"]').each((text) => {
                const capacity = (text.text()).split(' ').map((word) => Number(word)).filter((num) => !isNaN(num))[0];
                expect(capacity !== undefined);
                capacities.push(capacity);
            }).then(() => {
                if (page * roomsPerPage < numOfRooms) {
                    cy.get('[data-testid="change-display-button->"]').click(); // go to next page
                    collectCapacities(page + 1);
                }
                else {
                    expect(capacities.length).to.equal(numOfRooms);
                    for (let i = 0; i < numOfRooms - 1; i++) {
                        expect(capacities[i]).to.be.at.least(capacities[i + 1]);
                    }
                }
            });
        };
        collectCapacities();
    });
    it('sorts rooms by building name ascending', () => {
        cy.get('[data-testid="order-button"]').click();
        cy.contains('building (ascending)').click();
        const buildings = [];
        const collectBuildings = (page = 1) => {
            cy.get('[data-testid="room-name"]').each((elem) => {
                buildings.push(elem.text());
            }).then(() => {
                if (page * roomsPerPage < numOfRooms) {
                    cy.get('[data-testid="change-display-button->"]').click(); // go to next page
                    collectBuildings(page + 1);
                }
                else {
                    expect(buildings.length).to.equal(numOfRooms);
                    for (let i = 0; i < numOfRooms - 1; i++) {
                        expect(buildings[i] < buildings[i + 1]).to.be.true;
                    }
                }
            });
        };
        collectBuildings();
    });
    it("searches by shortname", () => {
        getSearchBar().type("CIRS");
        cy.contains(/CIRS/i).should("exist");
    });
    it("searches by fullname", () => {
        getSearchBar().type("Interactive Research");
        cy.contains(/CIRS/i).should("exist");
    });
    it("select & delete rooms in first page", () => {
        cy.get('[data-testid="select-room-button"]')
            .each(($el) => {
            const elem = cy.wrap($el);
            elem.click().then(() => {
                cy.get('[data-testid="selected-room-box"]') // then check for box
                    .find('[data-testid="selected-room-delete-button"]')
                    .click() // then delete box
                    .then(() => {
                    cy.get('[data-testid="selected-room-box"]').should("not.exist"); // then check that it is indeed gone
                });
            });
        });
    });
    it('draws a route on the map between selected rooms', () => {
        cy.get('[data-testid="select-room-button"]').eq(0).click();
        cy.get('[data-testid="select-room-button"]').eq(1).click();
        // Leaflet adds .leaflet-routing-container when routes render
        cy.get('.leaflet-routing-container').should('exist');
    });
});
export {};
