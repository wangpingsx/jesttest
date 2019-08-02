jest.mock('mongodb'); // this is the only magic to let the classloader to load my implementation.
import { MongoClient } from 'mongodb';
import { MockData } from '../mocks/mockData';

//manaul mock, i am not using jest.fn to mock a function. 
//i still use just pure typescript to overrite the function and 
//let the classloader to pick my implementation, not the original one.
//when i need to change the implmenetation to fit the test, then i just change it here/
// this solution just use pure typescript . not jest.fn() magic.

const mockCollection = {
    findOneAndUpdate: {}
};

const mockDB = {
    collection: {}
};

const mockDBclient = {
    db: {},
    close: () => {}
};

const resetMongoMock = () => {
    mockCollection.findOneAndUpdate = async filter => {
        return { value: { issueId: filter.issueId as string } };
    };

    mockDB.collection = (collectionName: string) => {
        return mockCollection;
    };

    mockDBclient.db = (dbName: string) => {
        return mockDB;
    };

    MongoClient.connect = async (dbString: string) => {
        return mockDBclient;
    };
};

const mockupjson = MockData.mockupSupplierIssusjson;

describe('connectToDB', () => {
    beforeEach(() => {
        resetMongoMock();
    });

    it('should throw error, when database server connection error', async () => {
        MongoClient.connect = async (dbString: string) => {
            throw new Error('cannot connect to db server!');
        };
        let err;
        try {
            await xxx();
        } catch (error) {
            err = error;
        }
        expect(err.message).toEqual('cannot connect to db server!');
    });

    it('should throw error, when database connection error', async () => {
        mockDBclient.db = (dbName: string) => {
            throw new Error('cannot connect to db');
        };
        let err;
        try {
            await xxxx();
        } catch (error) {
            err = error;
        }
        expect(err.message).toEqual('cannot connect to db');
    });
});