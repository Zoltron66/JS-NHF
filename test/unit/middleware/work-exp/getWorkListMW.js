const expect = require('chai').expect;
const getWorkListMW = require('../../../../middleware/work-exp/getWorkListMW');

describe('getWorkListMW middleware test:', () => {
    // Test -- 1
    it('Sholud add work experience list to locals if the list exist.', async () => {
        const objectRepositoryMock = {
            work_expM: {
                find: async (obj) => {
                    return {
                        li1: 'li1',
                        li2: 'li2',
                        li3: 'li3'
                    };
                }
            }
        };

        const resMock = {
            locals: {}
        };

        let nextValue = undefined;
        const nextMock = (err) => {
            nextValue = err;
        };

        const mw = getWorkListMW(objectRepositoryMock);
        await mw({}, resMock, nextMock);

        expect(nextValue).to.be.undefined;
        expect(resMock.locals.workExpList).to.deep.equal({
            li1: 'li1',
            li2: 'li2',
            li3: 'li3'
        });
    });

    // Test -- 2
    it('Sholud call next with error if work_expList is undefined.', async () => {
        const objectRepositoryMock = {
            work_expM: {
                find: async (obj) => {
                    return undefined;
                }
            }
        };

        const resMock = {
            locals: {}
        };

        let nextValue = undefined;
        const nextMock = (err) => {
            nextValue = err;
        };

        const mw = getWorkListMW(objectRepositoryMock);
        await mw({}, resMock, nextMock);

        expect(nextValue).to.be.equal('Work-Exp model/getWorkListMW problem...');
        expect(resMock.locals.workExpList).to.be.undefined;
    });

    // Test -- 3
    it('Sholud call next with error if find throws an error.', async () => {
        const objectRepositoryMock = {
            work_expM: {
                find: async (obj) => {
                    throw new Error('MongoServerError');
                }
            }
        };

        const resMock = {
            locals: {}
        };

        let nextValue = undefined;
        const nextMock = (err) => {
            nextValue = err;
        };

        const mw = getWorkListMW(objectRepositoryMock);
        await mw({}, resMock, nextMock);

        expect(nextValue).to.be.an.instanceOf(Error);
        expect(nextValue.message).to.be.equal('MongoServerError');
        expect(resMock.locals.workExpList).to.be.undefined;
    });
});