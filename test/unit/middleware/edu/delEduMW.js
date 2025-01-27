const expect = require('chai').expect;
const delEduMW = require('../../../../middleware/edu/delEduMW');

describe('delEduMW middleware test:', () => {
    //Test -- 1
    it('Sholud delete education and redirect to /admin if highest_title exists.', async () => {
        const objectRepositoryMock = {
            eduM: {
                findByIdAndDelete: async (id) => {
                    return {highest_title: 'Dr.'};
                }
            }
        };

        const reqMock = {
            params: {
                edu_id: '1234'
            }
        };

        const resMock = {
            url: null,
            redirect: (url)=> {
                resMock.url = url;
            }
        };

        let nextValue = undefined;
        const nextMock = (err) => {
            nextValue = err;
        };

        const mw = delEduMW(objectRepositoryMock);
        await mw(reqMock, resMock, nextMock);
        
        expect(nextValue).to.be.undefined;
        expect(resMock.url).to.be.equal('/admin');
    });

    // Test -- 2
    it('Sholud call next with error if highest_title is undefied.', async () => {
        const objectRepositoryMock = {
            eduM: {
                findByIdAndDelete: async (id) => {
                    return {highest_title: undefined};
                }
            }
        };

        const reqMock = {
            params: {
                edu_id: '1234'
            }
        };

        const resMock = {
            url: null,
            redirect: (url)=> {
                resMock.url = url;
            }
        };

        let nextValue = undefined;
        const nextMock = (err) => {
            nextValue = err;
        };

        const mw = delEduMW(objectRepositoryMock);
        await mw(reqMock, resMock, nextMock);
        
        expect(nextValue).to.be.equal('Edu model/delEduMW problem...');
        expect(resMock.url).to.be.null;
    });

    // Test -- 3
    it('Sholud call next with error if findByIdAndDelete throws an error.', async () => {
        const objectRepositoryMock = {
            eduM: {
                findByIdAndDelete: async (id) => {
                    throw new Error('MongoNetworkError');
                }
            }
        };

        const reqMock = {
            params: {
                edu_id: '1234'
            }
        };

        const resMock = {
            url: null,
            redirect: (url)=> {
                resMock.url = url;
            }
        };

        let nextValue = undefined;
        const nextMock = (err) => {
            nextValue = err;
        };

        const mw = delEduMW(objectRepositoryMock);
        await mw(reqMock, resMock, nextMock);
        
        expect(nextValue).to.be.an.instanceOf(Error);
        expect(nextValue.message).to.be.equal('MongoNetworkError');
        expect(resMock.url).to.be.null;
    });
});