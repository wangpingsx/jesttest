
import { MockData } from '../mocks/mockData';
import { MongoClient } from 'mongodb';
// still load the original implemenation.
//but use jest.fn to replace the original implementation (only replace functions we call.)
// this change will apply to the whole project, which means,....,
// if the code you are testing doesn't directly touch MongoClient
// and you cannot pass it to the place your actual code is using, 
//then just change it here,
// this change here is global. 



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
    
    MongoClient.connect = jest.fn(function(url, options, callback) {
        console.log('aaaa');
        return mockDBclient;
    });
    // MongoClient.connect = jest.fn();
    // MongoClient.connect.mockReturnValueOnce(mockDBclient);
    mockDBclient.db = jest.fn((dbName: string) => {
        return mockDB;
    });
    mockDB.collection = jest.fn((collectionName: string) => {
        return mockCollection;
    });
    mockCollection.findOneAndUpdate = jest.fn(async filter => {
        return { value: { issueId: filter.issueId as string } };
    });
};

describe('connectToDB', () => {
    beforeAll(() => {
        resetMongoMock();
    });
    beforeEach(() => {
        // resetMongoMock();
        // jest.resetAllMocks();
    });

    
    it('shoud get an error, when db connection throws error', async () => {
        // MongoClient.connect = async (dbString: string) => {
        //     throw new Error('cannot connect to db server!');
        // };
        MongoClient.connect.mockImplementationOnce(function(url, options, callback) {
            throw new Error('cannot connect to db server!');
        });
        const generator = xx().catch(e => {
            expect(e.message).toEqual('cannot connect to db server!');
        });
    });
    it('should update all issues successfully', async () => {
        const result = await xx();
        expect all good here 
        previous mock , just mock once and it will rool back to previous mock once it called so no impact here.
    });

    it('should fail on all issues update', async () => {
        mockCollection.findOneAndUpdate.mockImplementationOnce(async filter => {
            throw new Error('Upsert failed');
        });
        const result = await xxx();
        expect(console.error).toHaveBeenCalledWith(new Error('Upsert failed'));
    });
});